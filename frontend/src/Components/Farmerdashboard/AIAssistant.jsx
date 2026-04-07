import { useState, useRef, useEffect, useCallback } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  Send,
  Mic,
  MicOff,
  ImagePlus,
  X,
  Leaf,
  Bot,
  Volume2,
  VolumeX,
  Camera,
  Sprout,
  Droplets,
  Sun,
  Wind,
  AlertTriangle,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Loader2,
  RefreshCw,
  Lightbulb,
} from "lucide-react";

/* ─── GEMINI SETUP ─────────────────────────────────── */
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
let genAI = null;
let model = null;
let visionModel = null;
if (API_KEY) {
  genAI = new GoogleGenerativeAI(API_KEY);
  model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: {
      parts: [{ text: "" }],
    },
  });
  visionModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
}

/* ─── SYSTEM PROMPT ────────────────────────────────── */
const SYSTEM_PROMPT = `You are KisanAI, an expert AI farming assistant for Indian farmers integrated into the KisanSathi platform. 

Your role:
- Help farmers with crop selection, disease diagnosis, pest control, fertilizer recommendations, irrigation advice
- Give advice based on Indian farming practices, seasons (Kharif/Rabi/Zaid), soil types
- Be friendly, simple, and practical — avoid heavy jargon
- Keep responses concise but actionable (use bullet points when helpful)
- Always prioritize organic/natural solutions first, then chemical if needed
- If unsure, recommend consulting local agricultural extension officer (KVK)
- Format responses with emojis for better readability
- Support both English and Hindi queries (respond in the same language)
- Focus on regions: Punjab, Haryana, UP, MP, Maharashtra, Karnataka, AP, Tamil Nadu, etc.

Current season context: ${getCurrentSeason()}
`;

function getCurrentSeason() {
  const month = new Date().getMonth() + 1;
  if (month >= 6 && month <= 9) return "Kharif season (June-September) — rainy season crops like Rice, Maize, Cotton, Soybean";
  if (month >= 10 && month <= 3) return "Rabi season (October-March) — winter crops like Wheat, Mustard, Gram, Peas";
  return "Zaid season (April-June) — summer crops like Watermelon, Cucumber, Fodder crops";
}

/* ─── QUICK SUGGESTIONS ────────────────────────────── */
const QUICK_PROMPTS = [
  { icon: "🌾", text: "Best crop for this season?" },
  { icon: "💧", text: "Irrigation tips for wheat" },
  { icon: "🐛", text: "How to control aphids organically?" },
  { icon: "🌱", text: "Fertilizer schedule for paddy" },
  { icon: "☁️", text: "Rain forecast impact on crops" },
  { icon: "📈", text: "How to increase crop yield?" },
];

const SMART_TIPS = [
  { icon: Sprout, color: "#16a34a", title: "Kharif Crops", text: "Sow Rice, Maize & Soybean before June 15 for best yield" },
  { icon: Droplets, color: "#0284c7", title: "Irrigation", text: "Use drip irrigation to save 40% water & improve yield" },
  { icon: Sun, color: "#d97706", title: "Soil Health", text: "Test soil pH every 2 years. Ideal: 6.0–7.5 for most crops" },
  { icon: Wind, color: "#7c3aed", title: "Pest Alert", text: "Monitor crops every 7 days during monsoon for early pest detection" },
];

/* ─── IMAGE TO BASE64 ──────────────────────────────── */
async function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result.split(",")[1];
      resolve({ base64, mimeType: file.type });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/* ─── SPEECH SYNTHESIS ─────────────────────────────── */
function speakText(text, onEnd) {
  window.speechSynthesis.cancel();
  const clean = text.replace(/[*_#`~>\[\]]/g, "").replace(/\n+/g, " ").trim();
  const utterance = new SpeechSynthesisUtterance(clean);
  utterance.lang = "en-IN";
  utterance.rate = 0.92;
  utterance.pitch = 1.05;
  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find(
    (v) => v.lang.startsWith("en-IN") || v.name.includes("India") || v.name.includes("Ravi") || v.name.includes("Veena")
  );
  if (preferred) utterance.voice = preferred;
  if (onEnd) utterance.onend = onEnd;
  window.speechSynthesis.speak(utterance);
}

/* ─── RETRY LOGIC ──────────────────────────────────── */
async function callGeminiWithRetry(fn, retries = 3) {
  try {
    return await fn();
  } catch (err) {
    const isRateLimit =
      err.status === 429 ||
      (err.message && err.message.includes("429")) ||
      (err.message && err.message.toLowerCase().includes("quota"));
    if (isRateLimit && retries > 0) {
      const waitSec = (4 - retries) * 15 + 15;
      console.warn(`Gemini rate limited. Retrying in ${waitSec}s... (${retries} retries left)`);
      await new Promise((res) => setTimeout(res, waitSec * 1000));
      return callGeminiWithRetry(fn, retries - 1);
    }
    throw err;
  }
}

/* ─── MAIN COMPONENT ───────────────────────────────── */
export default function AIAssistant() {
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "ai",
      text: "🌿 Namaste! I'm **KisanAI**, your smart farming assistant.\n\nI can help you with:\n• 🔍 **Crop diagnosis** from photos\n• 💬 **Farming advice** & recommendations\n• 🎤 **Voice queries** in Hindi & English\n• 📊 **Season-specific** crop guidance\n\nAsk me anything or upload a crop photo! 🌾",
      time: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(false);
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState("");
  const [activeTab, setActiveTab] = useState("chat");
  const [chatHistory, setChatHistory] = useState([]);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState("");

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);
  const recognitionRef = useRef(null);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => { if (messages.length) scrollToBottom(); }, [messages]);

  const handleScroll = () => {
    const el = chatContainerRef.current;
    if (!el) return;
    setShowScrollBtn(el.scrollHeight - el.scrollTop - el.clientHeight > 120);
  };

  /* ── SEND MESSAGE ─────────────────────────────────── */
  const sendMessage = useCallback(async (text, imgFile) => {
    const msgText = text || input.trim();
    if (!msgText && !imgFile) return;
    if (!API_KEY) {
      addAIMessage("⚠️ **Gemini API key not configured.**\n\nPlease add `VITE_GEMINI_API_KEY=your_key` to your `.env` file and restart the dev server.\n\nGet your free API key at: https://aistudio.google.com/");
      return;
    }

    const userMsg = {
      id: Date.now(),
      role: "user",
      text: msgText,
      image: imgFile ? URL.createObjectURL(imgFile) : null,
      time: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setImage(null);
    setIsLoading(true);
    setVoiceTranscript("");

    try {
      let responseText = "";

      if (imgFile) {
        const { base64, mimeType } = await fileToBase64(imgFile);
        const prompt = `${SYSTEM_PROMPT}\n\nAnalyze this farm/crop image for an Indian farmer. The farmer says: "${msgText || 'Please analyze this image'}"\n\nProvide:\n1. 🌿 What you see (crop/plant/pest/soil/etc)\n2. 🔍 Problem diagnosis (if any disease, deficiency, or pest)\n3. ⚠️ Cause of the problem\n4. 💊 Treatment (organic first, then chemical)\n5. 🛡️ Prevention tips\n6. ✅ Action steps (numbered)\n\nBe practical and specific for Indian farming conditions.`;
        const result = await callGeminiWithRetry(() => visionModel.generateContent([
          prompt,
          { inlineData: { data: base64, mimeType } },
        ]));
        responseText = result.response.text();
      } else {
        const newHistory = [
          ...chatHistory,
          { role: "user", parts: [{ text: msgText }] },
        ];
        const chatModel = genAI.getGenerativeModel({
          model: "gemini-2.0-flash",
          systemInstruction: {
            parts: [{ text: SYSTEM_PROMPT }],
          },
        });
        const chat = chatModel.startChat({
          history: chatHistory.length ? chatHistory : [],
          generationConfig: { maxOutputTokens: 1024, temperature: 0.7 },
        });
        const result = await callGeminiWithRetry(() => chat.sendMessage(msgText));
        responseText = result.response.text();
        setChatHistory([
          ...newHistory,
          { role: "model", parts: [{ text: responseText }] },
        ]);
      }

      addAIMessage(responseText);
      if (autoSpeak) {
        setIsSpeaking(true);
        speakText(responseText, () => setIsSpeaking(false));
      }
    } catch (err) {
      console.error(err);
      addAIMessage(`❌ **Error:** ${err.message || "Something went wrong. Please try again."}\n\nMake sure your Gemini API key is valid and has quota remaining.`);
    } finally {
      setIsLoading(false);
    }
  }, [input, image, chatHistory, autoSpeak]);

  function addAIMessage(text) {
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), role: "ai", text, time: new Date() },
    ]);
  }

  const handleSend = () => sendMessage(input.trim(), image?.file);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 4 * 1024 * 1024) {
      setImageError("Image too large. Max 4MB.");
      return;
    }
    setImageError("");
    setImage({ file, preview: URL.createObjectURL(file) });
    setActiveTab("chat");
  };

  const toggleVoice = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice input not supported in this browser. Try Chrome.");
      return;
    }
    const rec = new SpeechRecognition();
    rec.lang = "hi-IN";
    rec.interimResults = true;
    rec.continuous = false;
    rec.onresult = (e) => {
      const transcript = Array.from(e.results).map((r) => r[0].transcript).join("");
      setVoiceTranscript(transcript);
      if (e.results[e.results.length - 1].isFinal) {
        setInput(transcript);
        setVoiceTranscript("");
      }
    };
    rec.onend = () => setIsListening(false);
    rec.onerror = () => setIsListening(false);
    rec.start();
    recognitionRef.current = rec;
    setIsListening(true);
  };

  const speakLastMessage = () => {
    const lastAI = [...messages].reverse().find((m) => m.role === "ai");
    if (!lastAI) return;
    if (isSpeaking) { window.speechSynthesis.cancel(); setIsSpeaking(false); return; }
    setIsSpeaking(true);
    speakText(lastAI.text, () => setIsSpeaking(false));
  };

  const formatMessage = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/^### (.*$)/gim, "<h4 style='margin:6px 0 2px;font-size:0.88rem;color:#14532d;font-weight:700'>$1</h4>")
      .replace(/^## (.*$)/gim, "<h3 style='margin:8px 0 3px;font-size:0.92rem;color:#14532d;font-weight:800'>$1</h3>")
      .replace(/^• (.*$)/gim, "<li style='margin:2px 0;padding-left:4px'>$1</li>")
      .replace(/^- (.*$)/gim, "<li style='margin:2px 0;padding-left:4px'>$1</li>")
      .replace(/^\d+\. (.*$)/gim, "<li style='margin:2px 0;list-style-type:decimal;padding-left:4px'>$1</li>")
      .replace(/\n/g, "<br/>");
  };

  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');

    *, *::before, *::after { box-sizing: border-box; }

    .ai-page {
      font-family: 'DM Sans', sans-serif;
      background: #f0fdf4;
      height: 100vh;
      height: 100dvh;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    /* ── HEADER ── */
    .ai-header {
      background: linear-gradient(135deg, #0d2e1a 0%, #14532d 60%, #166534 100%);
      padding: 14px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 4px 20px rgba(0,0,0,0.15);
      flex-shrink: 0;
      gap: 12px;
      flex-wrap: wrap;
    }
    .ai-header-left { display: flex; align-items: center; gap: 12px; }
    .ai-avatar {
      width: 42px; height: 42px; border-radius: 12px; flex-shrink: 0;
      background: linear-gradient(135deg, #22c55e, #4ade80);
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 4px 12px rgba(34,197,94,0.4);
      animation: ai-glow 3s ease-in-out infinite;
    }
    @keyframes ai-glow {
      0%,100% { box-shadow: 0 4px 12px rgba(34,197,94,0.4); }
      50% { box-shadow: 0 4px 24px rgba(34,197,94,0.7); }
    }
    .ai-title { font-family: 'Playfair Display', serif; font-size: 1.15rem; font-weight: 800; color: #fff; white-space: nowrap; }
    .ai-subtitle { font-size: 0.68rem; color: rgba(187,247,208,0.7); margin-top: 1px; }
    .ai-status-dot { width: 7px; height: 7px; border-radius: 50%; background: #4ade80; animation: ai-pulse 2s infinite; display:inline-block; margin-right: 5px; }
    @keyframes ai-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.6;transform:scale(1.3)} }

    /* ── TABS ── */
    .ai-tabs {
      display: flex;
      gap: 3px;
      background: rgba(255,255,255,0.08);
      padding: 3px;
      border-radius: 10px;
      flex-shrink: 0;
    }
    .ai-tab {
      padding: 6px 11px; border-radius: 8px; font-size: 0.72rem; font-weight: 600;
      cursor: pointer; border: none; transition: all 0.18s ease;
      color: rgba(187,247,208,0.65); background: transparent;
      display: flex; align-items: center; gap: 4px; white-space: nowrap;
    }
    .ai-tab.active { background: rgba(74,222,128,0.2); color: #dcfce7; border: 1px solid rgba(74,222,128,0.3); }
    .ai-tab:hover:not(.active) { background: rgba(255,255,255,0.06); color: #dcfce7; }

    /* ── CONTENT WRAPPER ── */
    .ai-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      min-height: 0;
    }

    /* ── NO API KEY BANNER ── */
    .ai-no-key {
      background: #fff7ed; border: 1px solid #fed7aa;
      border-radius: 10px; padding: 12px 14px;
      font-size: 0.78rem; color: #92400e; line-height: 1.6;
      margin: 10px 16px 0;
      flex-shrink: 0;
    }

    /* ── CONTROLS BAR ── */
    .ai-controls {
      background: #fff; border-bottom: 1px solid #e9f7ef;
      padding: 8px 14px; display: flex; align-items: center;
      gap: 6px; flex-shrink: 0; flex-wrap: wrap;
    }
    .ai-ctrl-btn {
      display: flex; align-items: center; gap: 4px;
      padding: 5px 10px; border-radius: 8px;
      font-size: 0.72rem; font-weight: 600; cursor: pointer;
      transition: all 0.15s; border: 1px solid;
      font-family: 'DM Sans', sans-serif;
      white-space: nowrap;
    }
    .ai-ctrl-btn.green { background: #f0fdf4; color: #16a34a; border-color: #bbf7d0; }
    .ai-ctrl-btn.green:hover { background: #dcfce7; }
    .ai-ctrl-btn.blue { background: #eff6ff; color: #2563eb; border-color: #bfdbfe; }
    .ai-ctrl-btn.blue:hover { background: #dbeafe; }
    .ai-ctrl-btn.red { background: #fef2f2; color: #dc2626; border-color: #fecaca; }
    .ai-ctrl-btn.red:hover { background: #fee2e2; }

    /* ── CHAT AREA ── */
    .ai-chat-area {
      flex: 1;
      overflow-y: auto;
      padding: 14px 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      scroll-behavior: smooth;
      min-height: 0;
      -webkit-overflow-scrolling: touch;
    }
    .ai-chat-area::-webkit-scrollbar { width: 3px; }
    .ai-chat-area::-webkit-scrollbar-track { background: transparent; }
    .ai-chat-area::-webkit-scrollbar-thumb { background: rgba(74,222,128,0.25); border-radius: 4px; }

    /* ── MESSAGES ── */
    .ai-msg { display: flex; gap: 8px; max-width: 88%; animation: ai-fadein 0.3s ease; }
    @keyframes ai-fadein { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
    .ai-msg.user { align-self: flex-end; flex-direction: row-reverse; }
    .ai-msg.ai { align-self: flex-start; }

    .ai-msg-avatar {
      width: 30px; height: 30px; border-radius: 9px; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center; font-size: 0.8rem;
    }
    .ai-msg-avatar.ai { background: linear-gradient(135deg, #14532d, #16a34a); }
    .ai-msg-avatar.user { background: linear-gradient(135deg, #1e40af, #3b82f6); }

    .ai-bubble {
      padding: 9px 13px; border-radius: 13px;
      font-size: 0.82rem; line-height: 1.6;
      max-width: 100%; word-wrap: break-word; word-break: break-word;
    }
    .ai-bubble.ai {
      background: #fff; color: #1f2937;
      border: 1px solid #e9f7ef;
      border-bottom-left-radius: 4px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    }
    .ai-bubble.user {
      background: linear-gradient(135deg, #14532d, #16a34a);
      color: #fff; border-bottom-right-radius: 4px;
    }
    .ai-bubble img { max-width: 180px; border-radius: 8px; margin-bottom: 6px; display: block; }
    .ai-time { font-size: 0.62rem; color: #9ca3af; margin-top: 2px; }
    .ai-time.ai { text-align: left; }
    .ai-time.user { text-align: right; }

    /* ── LOADING DOTS ── */
    .ai-loading { display: flex; gap: 5px; padding: 4px 0; }
    .ai-dot { width: 6px; height: 6px; border-radius: 50%; background: #16a34a; animation: ai-bounce 1.2s infinite; }
    .ai-dot:nth-child(2) { animation-delay: 0.2s; }
    .ai-dot:nth-child(3) { animation-delay: 0.4s; }
    @keyframes ai-bounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-6px)} }

    /* ── QUICK PROMPTS ── */
    .ai-quick-section {
      background: #fff;
      border-top: 1px solid #f3f4f6;
      padding: 6px 14px;
      flex-shrink: 0;
    }
    .ai-quick-wrap { display: flex; flex-wrap: nowrap; gap: 6px; overflow-x: auto; padding-bottom: 2px; -webkit-overflow-scrolling: touch; }
    .ai-quick-wrap::-webkit-scrollbar { display: none; }
    .ai-quick-btn {
      padding: 5px 11px; border-radius: 20px; border: 1px solid #d1fae5;
      font-size: 0.72rem; font-weight: 500; color: #166534; background: #f0fdf4;
      cursor: pointer; transition: all 0.15s; white-space: nowrap;
      font-family: 'DM Sans', sans-serif; flex-shrink: 0;
    }
    .ai-quick-btn:hover { background: #dcfce7; border-color: #4ade80; transform: translateY(-1px); }

    /* ── INPUT AREA ── */
    .ai-input-area {
      background: #fff;
      border-top: 1px solid #e9f7ef;
      padding: 10px 14px;
      display: flex;
      flex-direction: column;
      gap: 7px;
      flex-shrink: 0;
    }
    .ai-image-preview {
      display: flex; align-items: center; gap: 8px;
      background: #f0fdf4; padding: 7px 10px; border-radius: 10px;
      border: 1px solid #bbf7d0; font-size: 0.76rem; color: #166534;
    }
    .ai-image-preview img { width: 36px; height: 36px; border-radius: 6px; object-fit: cover; flex-shrink: 0; }
    .ai-input-row { display: flex; gap: 7px; align-items: flex-end; }
    .ai-input {
      flex: 1; border: 1.5px solid #d1fae5; border-radius: 12px;
      padding: 9px 13px; font-size: 0.84rem; font-family: 'DM Sans', sans-serif;
      resize: none; min-height: 40px; max-height: 96px; line-height: 1.5;
      transition: border-color 0.15s; outline: none; color: #1f2937;
      background: #f9fefb; width: 100%;
    }
    .ai-input:focus { border-color: #4ade80; background: #fff; }
    .ai-input::placeholder { color: #9ca3af; }
    .ai-send-btn {
      width: 40px; height: 40px; border-radius: 12px; border: none;
      background: linear-gradient(135deg, #14532d, #16a34a);
      color: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center;
      transition: all 0.15s; box-shadow: 0 4px 12px rgba(22,101,52,0.3); flex-shrink: 0;
    }
    .ai-send-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(22,101,52,0.4); }
    .ai-send-btn:disabled { opacity: 0.5; cursor: not-allowed; }
    .ai-icon-btn {
      width: 40px; height: 40px; border-radius: 12px; border: 1.5px solid;
      cursor: pointer; display: flex; align-items: center; justify-content: center;
      transition: all 0.15s; flex-shrink: 0; background: transparent;
    }
    .ai-icon-btn.mic { border-color: #bbf7d0; color: #16a34a; }
    .ai-icon-btn.mic:hover { background: #f0fdf4; }
    .ai-icon-btn.mic.active { background: #dc2626; border-color: #dc2626; color:#fff; animation: ai-pulse-red 1s infinite; }
    @keyframes ai-pulse-red { 0%,100%{box-shadow:0 0 0 0 rgba(220,38,38,0.4)} 50%{box-shadow:0 0 0 6px rgba(220,38,38,0)} }
    .ai-icon-btn.img { border-color: #bfdbfe; color: #2563eb; }
    .ai-icon-btn.img:hover { background: #eff6ff; }

    /* ── VOICE TRANSCRIPT ── */
    .ai-transcript {
      font-size: 0.75rem; color: #dc2626; background: #fef2f2;
      padding: 4px 10px; border-radius: 8px; border: 1px solid #fecaca;
      font-style: italic; animation: ai-fadein 0.2s ease;
    }

    /* ── CLEAR BTN ── */
    .ai-clear-btn {
      font-size: 0.7rem; color: #9ca3af; background: none; border: none;
      cursor: pointer; padding: 4px 8px; border-radius: 6px;
      transition: all 0.15s; font-family: 'DM Sans', sans-serif;
      display: flex; align-items: center; gap: 3px;
    }
    .ai-clear-btn:hover { color: #dc2626; background: #fef2f2; }

    /* ── SCROLL BTN ── */
    .ai-scroll-btn {
      position: sticky;
      align-self: flex-end;
      bottom: 8px;
      margin-right: 0;
      width: 32px; height: 32px; border-radius: 50%;
      background: #14532d; color: #fff; border: none; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2); transition: all 0.15s;
      animation: ai-fadein 0.2s ease; flex-shrink: 0;
    }
    .ai-scroll-btn:hover { background: #16a34a; transform: translateY(-1px); }

    /* ── IMAGE TAB ── */
    .ai-scrollable-tab {
      flex: 1;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }
    .ai-image-tab { padding: 20px 16px; }
    .ai-drop-zone {
      border: 2px dashed #4ade80; border-radius: 14px;
      padding: 36px 16px; text-align: center;
      cursor: pointer; transition: all 0.2s;
      background: #f0fdf4; position: relative;
    }
    .ai-drop-zone:hover { background: #dcfce7; border-color: #16a34a; }
    .ai-drop-zone input { position: absolute; inset:0; opacity:0; cursor:pointer; width:100%; height:100%; }
    .ai-drop-icon {
      width: 56px; height: 56px; border-radius: 14px;
      background: linear-gradient(135deg, #14532d, #16a34a);
      display: flex; align-items: center; justify-content: center;
      margin: 0 auto 12px;
    }
    .ai-scan-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-top: 18px;
    }
    .ai-scan-card {
      background: #fff; border: 1px solid #e9f7ef;
      border-radius: 12px; padding: 13px;
      display: flex; gap: 10px; align-items: flex-start;
    }

    /* ── TIPS TAB ── */
    .ai-tips-tab { padding: 16px; display: flex; flex-direction: column; gap: 12px; }
    .ai-tip-card {
      background: #fff; border-radius: 12px; padding: 14px;
      border: 1px solid #e9f7ef; display: flex; gap: 12px;
      align-items: flex-start; box-shadow: 0 2px 8px rgba(0,0,0,0.04);
      transition: transform 0.15s;
    }
    .ai-tip-card:hover { transform: translateY(-2px); box-shadow: 0 6px 16px rgba(0,0,0,0.08); }
    .ai-tip-icon { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .ai-tip-title { font-size: 0.84rem; font-weight: 700; color: #14532d; margin-bottom: 2px; }
    .ai-tip-text { font-size: 0.76rem; color: #6b7280; line-height: 1.5; }

    /* ── SEASON CARD ── */
    .ai-season-card {
      background: linear-gradient(135deg, #0d2e1a, #14532d);
      border-radius: 14px; padding: 16px; color: #dcfce7;
    }
    .ai-season-title {
      font-family: 'Playfair Display', serif;
      font-size: 0.9rem; font-weight: 800; margin-bottom: 10px; color: #4ade80;
    }
    .ai-season-body { font-size: 0.78rem; line-height: 1.8; color: rgba(187,247,208,0.85); }

    /* ── MOBILE SPECIFICS ── */
    @media (max-width: 480px) {
      .ai-header { padding: 10px 14px; flex-wrap: nowrap; align-items: flex-start; flex-direction: column; gap: 8px; }
      .ai-tabs { width: 100%; }
      .ai-tab { flex: 1; justify-content: center; padding: 5px 6px; font-size: 0.68rem; }
      .ai-title { font-size: 1rem; }
      .ai-avatar { width: 36px; height: 36px; border-radius: 10px; }
      .ai-msg { max-width: 94%; }
      .ai-bubble { font-size: 0.8rem; }
      .ai-controls { padding: 6px 12px; gap: 5px; }
      .ai-ctrl-btn { padding: 4px 8px; font-size: 0.68rem; }
      .ai-chat-area { padding: 10px 12px; }
      .ai-input-area { padding: 8px 12px; }
      .ai-quick-section { padding: 5px 12px; }
      .ai-input { font-size: 0.82rem; padding: 8px 11px; }
      .ai-scan-grid { grid-template-columns: 1fr; }
      .ai-image-tab, .ai-tips-tab { padding: 14px 12px; }
      .ai-drop-zone { padding: 28px 14px; }
      .ai-no-key { margin: 8px 12px 0; font-size: 0.75rem; }
    }

    /* ── TABLET ── */
    @media (min-width: 481px) and (max-width: 768px) {
      .ai-header { padding: 12px 18px; }
      .ai-msg { max-width: 90%; }
    }

    /* ── LARGE SCREENS ── */
    @media (min-width: 1024px) {
      .ai-page { max-width: 800px; margin: 0 auto; border-left: 1px solid #e9f7ef; border-right: 1px solid #e9f7ef; box-shadow: 0 0 40px rgba(0,0,0,0.08); }
    }

    @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  `;

  return (
    <div className="ai-page">
      <style>{styles}</style>

      {/* ── HEADER ─────────────────────────────────────── */}
      <div className="ai-header">
        <div className="ai-header-left">
          <div className="ai-avatar"><Bot size={20} color="#fff" /></div>
          <div>
            <div className="ai-title">KisanAI Assistant</div>
            <div className="ai-subtitle">
              <span className="ai-status-dot" />
              {API_KEY ? "Powered by Gemini · India farming AI" : "⚠️ API Key not configured"}
            </div>
          </div>
        </div>
        <div className="ai-tabs">
          {[
            { id: "chat", label: "💬 Chat" },
            { id: "image", label: "📷 Scan" },
            { id: "tips", label: "💡 Tips" },
          ].map((t) => (
            <button
              key={t.id}
              className={`ai-tab${activeTab === t.id ? " active" : ""}`}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── CONTENT ────────────────────────────────────── */}
      <div className="ai-content">
        {/* No API key warning */}
        {!API_KEY && (
          <div className="ai-no-key">
            <strong>⚠️ Gemini API Key Required</strong><br />
            Add <code style={{ background: "#fed7aa", padding: "1px 5px", borderRadius: 4 }}>VITE_GEMINI_API_KEY=your_api_key</code> to <strong>frontend/.env</strong><br />
            Get a free key at:{" "}
            <a href="https://aistudio.google.com/" target="_blank" rel="noreferrer" style={{ color: "#d97706" }}>aistudio.google.com</a>
          </div>
        )}

        {/* ── CHAT TAB ─────────────────────────────────── */}
        {activeTab === "chat" && (
          <>
            {/* Controls */}
            <div className="ai-controls">
              <button
                className={`ai-ctrl-btn ${autoSpeak ? "red" : "green"}`}
                onClick={() => { setAutoSpeak((p) => !p); window.speechSynthesis.cancel(); setIsSpeaking(false); }}
              >
                {autoSpeak ? <VolumeX size={12} /> : <Volume2 size={12} />}
                {autoSpeak ? "Mute" : "Auto-Speak"}
              </button>
              <button
                className="ai-ctrl-btn blue"
                onClick={speakLastMessage}
                disabled={!messages.filter((m) => m.role === "ai").length}
              >
                {isSpeaking
                  ? <><Loader2 size={12} style={{ animation: "spin 1s linear infinite" }} /> Stop</>
                  : <><Volume2 size={12} /> Speak</>}
              </button>
              <button
                className="ai-clear-btn"
                onClick={() => { setMessages([]); setChatHistory([]); window.speechSynthesis.cancel(); setIsSpeaking(false); }}
              >
                <RefreshCw size={10} /> Clear
              </button>
            </div>

            {/* Messages */}
            <div className="ai-chat-area" ref={chatContainerRef} onScroll={handleScroll}>
              {messages.map((msg) => (
                <div key={msg.id} className={`ai-msg ${msg.role}`}>
                  <div className={`ai-msg-avatar ${msg.role}`}>
                    {msg.role === "ai" ? "🌿" : "👨‍🌾"}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    {msg.image && (
                      <img src={msg.image} alt="uploaded" style={{ maxWidth: 160, borderRadius: 10, marginBottom: 6, display: "block" }} />
                    )}
                    <div
                      className={`ai-bubble ${msg.role}`}
                      dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }}
                    />
                    <div className={`ai-time ${msg.role}`}>
                      {msg.time?.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="ai-msg ai">
                  <div className="ai-msg-avatar ai">🌿</div>
                  <div className="ai-bubble ai">
                    <div className="ai-loading">
                      <div className="ai-dot" /><div className="ai-dot" /><div className="ai-dot" />
                    </div>
                  </div>
                </div>
              )}

              {showScrollBtn && (
                <button className="ai-scroll-btn" onClick={scrollToBottom}>
                  <ChevronDown size={15} />
                </button>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick prompts — horizontally scrollable on mobile */}
            <div className="ai-quick-section">
              <div className="ai-quick-wrap">
                {QUICK_PROMPTS.map((p, i) => (
                  <button
                    key={i}
                    className="ai-quick-btn"
                    onClick={() => sendMessage(p.text, null)}
                    disabled={isLoading}
                  >
                    {p.icon} {p.text}
                  </button>
                ))}
              </div>
            </div>

            {/* Input area */}
            <div className="ai-input-area">
              {image && (
                <div className="ai-image-preview">
                  <img src={image.preview} alt="preview" />
                  <span style={{ flex: 1 }}>📷 Image ready</span>
                  <button
                    onClick={() => setImage(null)}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "#dc2626", display: "flex", padding: 0 }}
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
              {imageError && <div style={{ color: "#dc2626", fontSize: "0.73rem" }}>⚠️ {imageError}</div>}
              {voiceTranscript && (
                <div className="ai-transcript">🎤 {voiceTranscript}</div>
              )}
              <div className="ai-input-row">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
                <button className="ai-icon-btn img" onClick={() => fileInputRef.current?.click()} title="Upload crop image">
                  <ImagePlus size={16} />
                </button>
                <button
                  className={`ai-icon-btn mic${isListening ? " active" : ""}`}
                  onClick={toggleVoice}
                  title={isListening ? "Stop" : "Speak (Hindi/English)"}
                >
                  {isListening ? <MicOff size={16} /> : <Mic size={16} />}
                </button>
                <textarea
                  ref={inputRef}
                  className="ai-input"
                  placeholder={isListening ? "🎤 Listening…" : "Ask about farming… (Hindi or English)"}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                  rows={1}
                />
                <button
                  className="ai-send-btn"
                  onClick={handleSend}
                  disabled={isLoading || (!input.trim() && !image)}
                >
                  {isLoading
                    ? <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />
                    : <Send size={16} />}
                </button>
              </div>
            </div>
          </>
        )}

        {/* ── IMAGE SCAN TAB ────────────────────────────── */}
        {activeTab === "image" && (
          <div className="ai-scrollable-tab">
            <div className="ai-image-tab">
              <div className="ai-drop-zone" onClick={() => fileInputRef.current?.click()}>
                <input
                  type="file" accept="image/*"
                  onChange={(e) => { handleImageChange(e); setActiveTab("chat"); }}
                />
                <div className="ai-drop-icon"><Camera size={24} color="#fff" /></div>
                <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#14532d", marginBottom: 5 }}>
                  Upload Crop / Leaf / Soil Photo
                </div>
                <div style={{ fontSize: "0.77rem", color: "#6b7280", lineHeight: 1.6 }}>
                  Tap to select or take a photo<br />
                  KisanAI will diagnose diseases, pests & deficiencies
                </div>
              </div>

              <div className="ai-scan-grid">
                {[
                  { icon: "🌿", title: "Leaf Analysis", desc: "Yellowing, spots, wilting, fungal infections" },
                  { icon: "🪲", title: "Pest ID", desc: "Aphids, whitefly, borers from close-up photos" },
                  { icon: "🌱", title: "Crop Health", desc: "Overall plant health & vigor scoring" },
                  { icon: "🪨", title: "Soil Check", desc: "Visual soil quality & structure analysis" },
                ].map((item, i) => (
                  <div key={i} className="ai-scan-card">
                    <div style={{ fontSize: "1.3rem" }}>{item.icon}</div>
                    <div>
                      <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#14532d" }}>{item.title}</div>
                      <div style={{ fontSize: "0.71rem", color: "#6b7280", marginTop: 2, lineHeight: 1.5 }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 14, background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 12, padding: 13, fontSize: "0.76rem", color: "#92400e", lineHeight: 1.6 }}>
                <AlertTriangle size={13} style={{ display: "inline", verticalAlign: "middle", marginRight: 5 }} />
                <strong>Best results:</strong> Clear, well-lit photos within 30cm of affected area. Avoid blurry or dark images.
              </div>

              {/* hidden file input shared with chat tab */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
            </div>
          </div>
        )}

        {/* ── TIPS TAB ─────────────────────────────────── */}
        {activeTab === "tips" && (
          <div className="ai-scrollable-tab">
            <div className="ai-tips-tab">
              <div style={{ fontSize: "0.78rem", color: "#6b7280", marginBottom: 4, fontWeight: 600, display: "flex", alignItems: "center", gap: 5 }}>
                <Lightbulb size={13} color="#d97706" />
                Smart tips for {getCurrentSeason().split(" (")[0]}
              </div>

              {SMART_TIPS.map((tip, i) => {
                const Icon = tip.icon;
                return (
                  <div key={i} className="ai-tip-card">
                    <div className="ai-tip-icon" style={{ background: tip.color + "18" }}>
                      <Icon size={17} color={tip.color} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div className="ai-tip-title">{tip.title}</div>
                      <div className="ai-tip-text">{tip.text}</div>
                      <button
                        className="ai-quick-btn"
                        style={{ marginTop: 8 }}
                        onClick={() => { setActiveTab("chat"); setTimeout(() => sendMessage(`Tell me more about: ${tip.title}`), 100); }}
                      >
                        Ask KisanAI →
                      </button>
                    </div>
                  </div>
                );
              })}

              {/* Season guide */}
              <div className="ai-season-card">
                <div className="ai-season-title">🌾 Current Season Guide</div>
                <div className="ai-season-body">
                  {getCurrentSeason().split(" (")[0] === "Kharif season" && <>
                    ✅ Sow: Rice, Maize, Bajra, Cotton, Soybean<br />
                    💧 Water: High (rainy season advantage)<br />
                    🐛 Watch: Brown plant hopper, stem borer<br />
                    📅 Harvest: October – November
                  </>}
                  {getCurrentSeason().split(" (")[0] === "Rabi season" && <>
                    ✅ Sow: Wheat, Barley, Mustard, Gram, Peas<br />
                    💧 Water: Medium (2–3 irrigations for wheat)<br />
                    🌡️ Best temp: 10–25°C for germination<br />
                    📅 Harvest: March – April
                  </>}
                  {getCurrentSeason().split(" (")[0] === "Zaid season" && <>
                    ✅ Grow: Watermelon, Muskmelon, Cucumber, Okra<br />
                    💧 Water: Very High (hot & dry conditions)<br />
                    ☀️ Challenge: Heat stress management<br />
                    📅 Duration: April – June
                  </>}
                </div>
                <button
                  className="ai-quick-btn"
                  style={{ marginTop: 12, background: "rgba(74,222,128,0.15)", borderColor: "rgba(74,222,128,0.3)", color: "#4ade80" }}
                  onClick={() => { setActiveTab("chat"); setTimeout(() => sendMessage("Give me a detailed farming plan for this season in India"), 100); }}
                >
                  📋 Get Detailed Season Plan
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}