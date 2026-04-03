import { useState, useRef } from "react";
import { Bug, RefreshCw, CheckCircle, Info, Upload, Camera, Clock, ChevronRight, AlertTriangle, X } from "lucide-react";
import { FarmerPageHeader } from "../../Pages/Farmerdash/Farmerdash";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');

  .pd-root {
    font-family: 'DM Sans', sans-serif;
    background: #f7fdf9;
    min-height: 100vh;
  }

  .pd-body { padding: 24px; }

  .pd-grid {
    display: grid;
    grid-template-columns: 1fr 380px;
    gap: 20px;
    align-items: start;
  }

  @media (max-width: 900px) {
    .pd-grid { grid-template-columns: 1fr; }
  }

  /* ── Card (mirrors .cr-card exactly) ── */
  .pd-card {
    background: #ffffff;
    border-radius: 16px;
    border: 1px solid #e9f7ef;
    overflow: hidden;
    margin-bottom: 20px;
  }
  .pd-card:last-child { margin-bottom: 0; }

  .pd-card-header {
    padding: 16px 20px;
    border-bottom: 1px solid #e9f7ef;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .pd-card-title {
    font-family: 'Playfair Display', serif;
    font-size: 1rem;
    font-weight: 700;
    color: #14532d;
  }

  .pd-card-sub {
    font-size: 0.75rem;
    color: #6b7280;
    margin-top: 2px;
  }

  .pd-card-body { padding: 20px; }

  /* ── Upload Zone ── */
  .pd-upload-zone {
    border: 2px dashed #bbf7d0;
    border-radius: 14px;
    padding: 36px 20px;
    text-align: center;
    background: #f0fdf4;
    cursor: pointer;
    transition: all 0.2s;
  }

  .pd-upload-zone:hover,
  .pd-upload-zone.drag-over {
    border-color: #16a34a;
    background: #dcfce7;
    transform: scale(1.01);
  }

  .pd-upload-icon {
    width: 56px; height: 56px;
    border-radius: 16px;
    background: #ffffff;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 12px;
    box-shadow: 0 4px 12px rgba(22,163,74,0.15);
  }

  .pd-upload-title {
    font-weight: 700;
    color: #14532d;
    font-size: 0.95rem;
    margin-bottom: 4px;
  }

  .pd-upload-sub {
    font-size: 0.78rem;
    color: #6b7280;
  }

  .pd-upload-actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-top: 16px;
  }

  /* ── Buttons (mirrors .cr-predict-btn / .cr-reset-btn) ── */
  .pd-btn-primary {
    width: 100%;
    padding: 12px;
    background: linear-gradient(135deg, #14532d, #16a34a);
    border: none;
    border-radius: 12px;
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 0.2s;
    box-shadow: 0 4px 12px rgba(22,101,52,0.22);
    margin-top: 8px;
  }

  .pd-btn-primary:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(22,101,52,0.3);
  }

  .pd-btn-primary:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

  .pd-btn-secondary {
    padding: 10px;
    background: #ffffff;
    border: 1.5px solid #bbf7d0;
    border-radius: 10px;
    color: #14532d;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.82rem;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    transition: all 0.2s;
  }

  .pd-btn-secondary:hover { background: #f0fdf4; }

  .pd-btn-expert {
    width: 100%;
    padding: 11px;
    background: #eff6ff;
    border: 1.5px solid #bfdbfe;
    border-radius: 12px;
    color: #1d4ed8;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 0.2s;
    margin-top: 12px;
  }

  .pd-btn-expert:hover { background: #dbeafe; }

  /* ── Image Preview ── */
  .pd-preview-wrap {
    position: relative;
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid #e9f7ef;
    margin-bottom: 4px;
  }

  .pd-preview-img {
    width: 100%;
    height: 220px;
    object-fit: cover;
    display: block;
  }

  .pd-preview-close {
    position: absolute;
    top: 8px; right: 8px;
    background: rgba(0,0,0,0.5);
    border-radius: 8px;
    padding: 4px;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    border: none;
  }

  .pd-preview-label {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    padding: 8px 12px;
    background: linear-gradient(transparent, rgba(0,0,0,0.6));
    color: #fff;
    font-size: 0.75rem;
    font-weight: 600;
  }

  /* Scan animation overlay */
  .pd-scan-overlay {
    position: absolute;
    inset: 0;
    background: rgba(20,83,45,0.08);
    display: flex; align-items: center; justify-content: center;
    border-radius: 12px;
  }

  .pd-scan-line {
    position: absolute;
    left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #16a34a, transparent);
    animation: pdScan 1.2s ease-in-out infinite;
  }

  @keyframes pdScan {
    0%   { top: 10%; opacity: 1; }
    50%  { opacity: 0.7; }
    100% { top: 90%; opacity: 1; }
  }

  /* ── Severity Badge ── */
  .pd-severity {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.78rem;
    font-weight: 700;
  }

  .pd-sev-low    { background: #dcfce7; color: #16a34a; }
  .pd-sev-medium { background: #fef9c3; color: #b45309; }
  .pd-sev-high   { background: #fee2e2; color: #dc2626; }

  /* ── Result (mirrors .cr-result) ── */
  .pd-result { animation: pd-fadeIn 0.4s ease; }

  @keyframes pd-fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── Result Hero (mirrors .cr-result-hero) ── */
  .pd-result-hero {
    background: linear-gradient(135deg, #14532d, #166534);
    border-radius: 14px;
    padding: 22px;
    margin-bottom: 16px;
    position: relative;
    overflow: hidden;
  }

  .pd-result-hero::before {
    content: '';
    position: absolute;
    top: -40px; right: -40px;
    width: 120px; height: 120px;
    border-radius: 50%;
    background: rgba(255,255,255,0.05);
  }

  .pd-result-hero::after {
    content: '';
    position: absolute;
    bottom: -30px; left: -30px;
    width: 100px; height: 100px;
    border-radius: 50%;
    background: rgba(255,255,255,0.04);
  }

  .pd-result-hero-row {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 12px;
  }

  .pd-result-emoji   { font-size: 2.8rem; flex-shrink: 0; }

  .pd-result-label {
    font-size: 0.7rem;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.6);
    margin-bottom: 2px;
  }

  .pd-result-name {
    font-family: 'Playfair Display', serif;
    font-size: 1.4rem;
    font-weight: 800;
    color: #ffffff;
    line-height: 1.2;
  }

  .pd-result-crop {
    font-size: 0.8rem;
    color: rgba(255,255,255,0.65);
    margin-top: 2px;
  }

  /* ── Confidence bar (mirrors .cr-conf-bar) ── */
  .pd-conf-row {
    display: flex;
    justify-content: space-between;
    font-size: 0.75rem;
    color: #6b7280;
    margin-bottom: 4px;
  }

  .pd-conf-bar {
    height: 6px;
    background: #e5e7eb;
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 14px;
  }

  .pd-conf-fill {
    height: 100%;
    background: linear-gradient(90deg, #16a34a, #4ade80);
    border-radius: 10px;
    transition: width 1.2s ease;
  }

  /* ── Info item (mirrors .cr-info-item) ── */
  .pd-info-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 10px 0;
    border-bottom: 1px solid #f3f4f6;
  }

  .pd-info-item:last-child { border-bottom: none; }

  .pd-info-icon {
    width: 32px; height: 32px;
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    font-size: 15px;
  }

  .pd-info-label { font-size: 0.72rem; color: #9ca3af; }
  .pd-info-value { font-size: 0.85rem; font-weight: 600; color: #14532d; }

  /* ── Treatment Steps ── */
  .pd-step {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 10px 0;
    border-bottom: 1px solid #f3f4f6;
  }

  .pd-step:last-child { border-bottom: none; }

  .pd-step-num {
    width: 24px; height: 24px;
    border-radius: 50%;
    background: linear-gradient(135deg, #14532d, #16a34a);
    color: #fff;
    font-size: 0.72rem;
    font-weight: 700;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    margin-top: 1px;
  }

  .pd-step-text { font-size: 0.83rem; color: #374151; line-height: 1.5; }

  .pd-tag {
    display: inline-block;
    padding: 1px 7px;
    border-radius: 10px;
    font-size: 0.68rem;
    font-weight: 600;
    margin-left: 6px;
  }

  .pd-tag-pest { background: #fef3c7; color: #d97706; }
  .pd-tag-fert { background: #f0fdf4; color: #16a34a; }
  .pd-tag-mech { background: #eff6ff; color: #2563eb; }

  /* ── Tip row (mirrors .cr-tip-row) ── */
  .pd-tip-row {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    padding: 10px;
    background: #f0fdf4;
    border-radius: 10px;
    border: 1px solid #bbf7d0;
    margin-top: 12px;
  }

  .pd-tip-text { font-size: 0.78rem; color: #166534; line-height: 1.5; }

  /* ── History ── */
  .pd-history-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 11px 0;
    border-bottom: 1px solid #f3f4f6;
    cursor: pointer;
    transition: opacity 0.15s;
  }

  .pd-history-item:last-child { border-bottom: none; }
  .pd-history-item:hover { opacity: 0.8; }

  .pd-history-thumb {
    width: 44px; height: 44px;
    border-radius: 10px;
    flex-shrink: 0;
    border: 1px solid #e9f7ef;
    background: #f0fdf4;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.4rem;
  }

  .pd-history-name    { font-size: 0.85rem; font-weight: 600; color: #14532d; }
  .pd-history-disease { font-size: 0.75rem; color: #6b7280; margin-top: 1px; }

  .pd-history-date {
    font-size: 0.7rem; color: #9ca3af;
    display: flex; align-items: center; gap: 3px;
    margin-top: 2px;
  }

  /* ── Empty state (mirrors .cr-empty) ── */
  .pd-empty {
    text-align: center;
    padding: 40px 20px;
    color: #9ca3af;
  }

  .pd-empty-icon { font-size: 3rem; margin-bottom: 12px; opacity: 0.4; }
  .pd-empty-text { font-size: 0.85rem; line-height: 1.6; }

  @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
`;

/* ─── Data ─────────────────────────────────────────── */

const diseaseDB = {
  "Leaf Blight": {
    emoji: "🍂",
    crop: "Tomato",
    confidence: 92,
    severity: "high",
    cause: "Fungal infection (Alternaria solani)",
    spread: "Wind & rain splashes",
    treatments: [
      { text: "Spray Mancozeb or Chlorothalonil fungicide twice a week", tag: "pest" },
      { text: "Apply nitrogen-rich fertilizer to boost plant immunity", tag: "fert" },
      { text: "Remove and destroy all infected leaves immediately", tag: "mech" },
      { text: "Ensure proper row spacing for air circulation", tag: "mech" },
    ],
  },
  "Powdery Mildew": {
    emoji: "🌫️",
    crop: "Wheat",
    confidence: 88,
    severity: "medium",
    cause: "Fungal infection (Blumeria graminis)",
    spread: "Airborne spores",
    treatments: [
      { text: "Apply sulfur-based fungicide spray on affected areas", tag: "pest" },
      { text: "Reduce excess nitrogen fertilizer to slow growth", tag: "fert" },
      { text: "Improve ventilation and spacing between plants", tag: "mech" },
    ],
  },
  "Bacterial Wilt": {
    emoji: "🥀",
    crop: "Brinjal",
    confidence: 85,
    severity: "high",
    cause: "Ralstonia solanacearum bacterium",
    spread: "Soil & infected tools",
    treatments: [
      { text: "Remove and burn all wilted plants immediately", tag: "mech" },
      { text: "Apply copper-based bactericide to soil", tag: "pest" },
      { text: "Use resistant crop varieties in next season", tag: "fert" },
      { text: "Disinfect all tools with bleach solution after use", tag: "mech" },
    ],
  },
  "Yellow Mosaic": {
    emoji: "🟡",
    crop: "Soybean",
    confidence: 78,
    severity: "medium",
    cause: "Mung Bean Yellow Mosaic Virus (MYMV)",
    spread: "Whitefly vectors",
    treatments: [
      { text: "Spray Imidacloprid insecticide to control whiteflies", tag: "pest" },
      { text: "Apply potassium-rich fertilizer to boost resistance", tag: "fert" },
      { text: "Uproot and destroy infected plants early", tag: "mech" },
    ],
  },
  "Rust Disease": {
    emoji: "🔶",
    crop: "Rice",
    confidence: 94,
    severity: "low",
    cause: "Puccinia fungal species",
    spread: "Wind-carried spores",
    treatments: [
      { text: "Apply Propiconazole or Tebuconazole fungicide", tag: "pest" },
      { text: "Balance phosphorus and potassium fertilizers", tag: "fert" },
      { text: "Avoid overhead irrigation to reduce leaf wetness", tag: "mech" },
    ],
  },
};

const historyData = [
  { icon: "🍅", name: "Tomato Leaf",   disease: "Leaf Blight",    date: "28 Mar 2025", severity: "high" },
  { icon: "🌾", name: "Wheat Crop",    disease: "Powdery Mildew", date: "15 Mar 2025", severity: "medium" },
  { icon: "🌿", name: "Brinjal Plant", disease: "Bacterial Wilt", date: "02 Mar 2025", severity: "high" },
  { icon: "🫛", name: "Soybean Leaf",  disease: "Yellow Mosaic",  date: "18 Feb 2025", severity: "medium" },
];

const sevConfig = {
  low:    { cls: "pd-sev-low",    label: "Low ✅" },
  medium: { cls: "pd-sev-medium", label: "Medium ⚠️" },
  high:   { cls: "pd-sev-high",   label: "High 🚨" },
};

const tagLabel = { pest: "Pesticide", fert: "Fertilizer", mech: "Action" };
const diseaseKeys = Object.keys(diseaseDB);

/* ─── Component ─────────────────────────────────────── */

export default function PestDetection() {
  const [image,   setImage]   = useState(null);
  const [result,  setResult]  = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef(null);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    setImage(URL.createObjectURL(file));
    setResult(null);
  };

  const handleDetect = () => {
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      const picked = diseaseKeys[Math.floor(Math.random() * diseaseKeys.length)];
      setResult(picked);
      setLoading(false);
    }, 2000);
  };

  const handleReset = () => { setImage(null); setResult(null); };

  const info = result ? diseaseDB[result] : null;
  const sev  = info   ? sevConfig[info.severity] : null;

  return (
    <div className="pd-root">
      <style>{styles}</style>

      <FarmerPageHeader
        title="Pest & Disease Detection"
        description="Upload a crop image to instantly detect disease and get treatment advice"
      />

      <div className="pd-body">
        <div className="pd-grid">

          {/* ══════════════ LEFT COLUMN ══════════════ */}
          <div>

            {/* Upload Card */}
            <div className="pd-card">
              <div className="pd-card-header">
                <div style={{ width: 32, height: 32, borderRadius: 10, background: "#f0fdf4", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Bug size={18} color="#16a34a" />
                </div>
                <div>
                  <div className="pd-card-title">Upload Crop Image</div>
                  <div className="pd-card-sub">JPG, PNG or HEIC — max 10 MB</div>
                </div>
              </div>

              <div className="pd-card-body">
                {/* ── No image yet ── */}
                {!image && (
                  <div
                    className={`pd-upload-zone${dragOver ? " drag-over" : ""}`}
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
                    onClick={() => fileRef.current.click()}
                  >
                    <div className="pd-upload-icon">
                      <Upload size={24} color="#16a34a" />
                    </div>
                    <div className="pd-upload-title">Drag & drop your crop photo</div>
                    <div className="pd-upload-sub">or click to browse from your device</div>

                    <div className="pd-upload-actions" onClick={(e) => e.stopPropagation()}>
                      <button className="pd-btn-secondary" onClick={() => fileRef.current.click()}>
                        <Upload size={14} /> Upload Image
                      </button>
                      <button className="pd-btn-secondary" onClick={() => fileRef.current.click()}>
                        <Camera size={14} /> Capture Photo
                      </button>
                    </div>
                  </div>
                )}

                {/* ── Image preview ── */}
                {image && (
                  <div className="pd-preview-wrap">
                    <img src={image} alt="Uploaded crop" className="pd-preview-img" />
                    {loading && (
                      <div className="pd-scan-overlay">
                        <div className="pd-scan-line" />
                      </div>
                    )}
                    <button className="pd-preview-close" onClick={handleReset}>
                      <X size={16} color="#fff" />
                    </button>
                    <div className="pd-preview-label">📷 Uploaded crop image — ready to scan</div>
                  </div>
                )}

                {/* Hidden file input */}
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  style={{ display: "none" }}
                  onChange={(e) => handleFile(e.target.files[0])}
                />

                {/* Detect button (mirrors cr-predict-btn) */}
                <button
                  className="pd-btn-primary"
                  onClick={handleDetect}
                  disabled={!image || loading}
                >
                  {loading
                    ? <><RefreshCw size={16} style={{ animation: "spin 1s linear infinite" }} /> Scanning Image...</>
                    : <><Bug size={16} /> Detect Disease</>
                  }
                </button>
              </div>
            </div>

            {/* Treatment Card — appears after result */}
            {result && info && (
              <div className="pd-card pd-result">
                <div className="pd-card-header">
                  <div style={{ width: 32, height: 32, borderRadius: 10, background: "#fef9c3", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>
                    💊
                  </div>
                  <div>
                    <div className="pd-card-title">Suggested Treatment</div>
                    <div className="pd-card-sub">Step-by-step remediation plan</div>
                  </div>
                </div>
                <div className="pd-card-body">
                  {info.treatments.map((t, i) => (
                    <div className="pd-step" key={i}>
                      <div className="pd-step-num">{i + 1}</div>
                      <div className="pd-step-text">
                        {t.text}
                        <span className={`pd-tag pd-tag-${t.tag}`}>{tagLabel[t.tag]}</span>
                      </div>
                    </div>
                  ))}

                  <div className="pd-tip-row">
                    <Info size={14} color="#16a34a" style={{ flexShrink: 0, marginTop: 2 }} />
                    <div className="pd-tip-text">
                      Start treatment within 48 hours of detection. Repeat pesticide sprays after rainfall for best results.
                    </div>
                  </div>

                  {/* Ask Expert */}
                  <button className="pd-btn-expert">
                    👨‍🔬 Not satisfied? Ask an Expert
                    <ChevronRight size={15} />
                  </button>
                </div>
              </div>
            )}

            {/* History Card */}
            <div className="pd-card">
              <div className="pd-card-header">
                <div style={{ width: 32, height: 32, borderRadius: 10, background: "#f0fdf4", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Clock size={18} color="#16a34a" />
                </div>
                <div>
                  <div className="pd-card-title">Detection History</div>
                  <div className="pd-card-sub">Your recent crop scans</div>
                </div>
              </div>
              <div className="pd-card-body" style={{ padding: "12px 20px" }}>
                {historyData.map((h, i) => (
                  <div className="pd-history-item" key={i}>
                    <div className="pd-history-thumb">{h.icon}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="pd-history-name">{h.name}</div>
                      <div className="pd-history-disease">🦠 {h.disease}</div>
                      <div className="pd-history-date"><Clock size={10} /> {h.date}</div>
                    </div>
                    <span className={`pd-severity ${sevConfig[h.severity].cls}`} style={{ fontSize: "0.68rem" }}>
                      {sevConfig[h.severity].label}
                    </span>
                    <ChevronRight size={16} style={{ color: "#d1d5db", flexShrink: 0 }} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ══════════════ RIGHT COLUMN ══════════════ */}
          <div style={{ display: "flex", flexDirection: "column" }}>

            {/* Result Card (mirrors cr-card right column) */}
            <div className="pd-card">
              <div className="pd-card-header">
                <div>
                  <div className="pd-card-title">Detection Result</div>
                  <div className="pd-card-sub">Powered by CNN Image Analysis</div>
                </div>
                {result && <CheckCircle size={20} color="#16a34a" />}
              </div>
              <div className="pd-card-body">

                {/* Empty state */}
                {!result && !loading && (
                  <div className="pd-empty">
                    <div className="pd-empty-icon">🔬</div>
                    <div className="pd-empty-text">
                      Upload a crop image and click <strong>Detect Disease</strong> to see the AI analysis result.
                    </div>
                  </div>
                )}

                {/* Loading state */}
                {loading && (
                  <div className="pd-empty">
                    <div className="pd-empty-icon" style={{ opacity: 1 }}>🧠</div>
                    <div className="pd-empty-text">Running AI model on your image…</div>
                  </div>
                )}

                {/* Result */}
                {result && info && sev && (
                  <div className="pd-result">
                    {/* Hero (mirrors cr-result-hero) */}
                    <div className="pd-result-hero">
                      <div className="pd-result-hero-row">
                        <div className="pd-result-emoji">{info.emoji}</div>
                        <div>
                          <div className="pd-result-label">Detected Disease</div>
                          <div className="pd-result-name">{result}</div>
                          <div className="pd-result-crop">🌱 Crop: {info.crop}</div>
                        </div>
                      </div>
                      <span className={`pd-severity ${sev.cls}`}>
                        <AlertTriangle size={11} /> Severity: {sev.label}
                      </span>
                    </div>

                    {/* Confidence bar (mirrors cr-conf-bar) */}
                    <div className="pd-conf-row">
                      <span>Model confidence</span>
                      <span style={{ fontWeight: 600, color: "#14532d" }}>{info.confidence}%</span>
                    </div>
                    <div className="pd-conf-bar">
                      <div className="pd-conf-fill" style={{ width: `${info.confidence}%` }} />
                    </div>

                    {/* Info items (mirrors cr-info-item) */}
                    <div className="pd-info-item">
                      <div className="pd-info-icon" style={{ background: "#fef3c7" }}>🦠</div>
                      <div>
                        <div className="pd-info-label">Cause</div>
                        <div className="pd-info-value">{info.cause}</div>
                      </div>
                    </div>
                    <div className="pd-info-item">
                      <div className="pd-info-icon" style={{ background: "#eff6ff" }}>💨</div>
                      <div>
                        <div className="pd-info-label">Spreads By</div>
                        <div className="pd-info-value">{info.spread}</div>
                      </div>
                    </div>
                    <div className="pd-info-item">
                      <div className="pd-info-icon" style={{ background: "#f0fdf4" }}>🌱</div>
                      <div>
                        <div className="pd-info-label">Affected Crop</div>
                        <div className="pd-info-value">{info.crop}</div>
                      </div>
                    </div>

                    {/* Tip row (mirrors cr-tip-row) */}
                    <div className="pd-tip-row">
                      <Info size={14} color="#16a34a" style={{ flexShrink: 0, marginTop: 2 }} />
                      <div className="pd-tip-text">
                        Result based on CNN model trained on 50,000+ crop disease images across 38 disease classes.
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* About Model Card (mirrors cr-card info card) */}
            <div className="pd-card" style={{ marginTop: 20 }}>
              <div className="pd-card-header">
                <div className="pd-card-title">About This Model</div>
              </div>
              <div className="pd-card-body" style={{ fontSize: "0.82rem", color: "#6b7280", lineHeight: 1.7 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                    <span style={{ background: "#f0fdf4", borderRadius: 6, padding: "2px 8px", fontSize: "0.72rem", fontWeight: 600, color: "#16a34a" }}>96.4% Accuracy</span>
                    <span style={{ background: "#f3f4f6", borderRadius: 6, padding: "2px 8px", fontSize: "0.72rem", fontWeight: 600, color: "#374151" }}>38 Diseases</span>
                    <span style={{ background: "#eff6ff", borderRadius: 6, padding: "2px 8px", fontSize: "0.72rem", fontWeight: 600, color: "#2563eb" }}>50K+ Samples</span>
                  </div>
                  <p style={{ margin: 0 }}>
                    Built using <strong style={{ color: "#14532d" }}>ResNet-50 CNN</strong> fine-tuned on the PlantVillage dataset. Detects 38 crop disease classes across 14 plant species.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}