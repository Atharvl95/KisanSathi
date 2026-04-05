import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, PhoneOff } from "lucide-react";

export default function JitsiCall() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const apiRef = useRef(null);

  useEffect(() => {
    if (!roomId || !containerRef.current) return;

    // Load Jitsi Meet External API script
    const script = document.createElement("script");
    script.src = "https://meet.jit.si/external_api.js";
    script.async = true;
    script.onload = () => {
      const domain = "meet.jit.si";
      const options = {
        roomName: roomId,
        width: "100%",
        height: "100%",
        parentNode: containerRef.current,
        lang: "en",
        configOverwrite: {
          startWithAudioMuted: false,
          startWithVideoMuted: false,
          enableWelcomePage: false,
          prejoinPageEnabled: false,
          disableDeepLinking: true,
          enableClosePage: false,
        },
        interfaceConfigOverwrite: {
          TOOLBAR_BUTTONS: [
            "microphone", "camera", "closedcaptions", "desktop", "fullscreen",
            "fodeviceselection", "hangup", "chat", "recording", "raisehand",
            "videoquality", "filmstrip", "feedback", "stats", "shortcuts",
            "tileview", "videobackgroundblur", "download", "help", "mute-everyone"
          ],
          SHOW_JITSI_WATERMARK: false,
          SHOW_WATERMARK_FOR_GUESTS: false,
          APP_NAME: "KisanSathi Expert Call",
          NATIVE_APP_NAME: "KisanSathi",
          DEFAULT_BACKGROUND: "#14532d",
          DEFAULT_REMOTE_DISPLAY_NAME: "Expert",
          DEFAULT_LOCAL_DISPLAY_NAME: "Farmer",
          BRAND_WATERMARK_LINK: "",
          SHOW_BRAND_WATERMARK: false,
        },
        userInfo: {
          displayName: "Farmer",
        }
      };

      // eslint-disable-next-line no-undef
      apiRef.current = new JitsiMeetExternalAPI(domain, options);

      // Handle call ended
      apiRef.current.addEventListeners({
        readyToClose: () => {
          navigate("/farmerdashboard/expert-connect");
        },
        videoConferenceLeft: () => {
          navigate("/farmerdashboard/expert-connect");
        }
      });
    };
    document.head.appendChild(script);

    return () => {
      if (apiRef.current) {
        apiRef.current.dispose();
        apiRef.current = null;
      }
      // Remove script
      const existingScript = document.querySelector('script[src="https://meet.jit.si/external_api.js"]');
      if (existingScript) document.head.removeChild(existingScript);
    };
  }, [roomId, navigate]);

  return (
    <div style={{ height: "100vh", background: "#0d1f12", display: "flex", flexDirection: "column", fontFamily: "'DM Sans',sans-serif" }}>
      {/* Top bar */}
      <div style={{ background: "#14532d", padding: "10px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80", animation: "pulse 2s infinite" }} />
          <span style={{ color: "#86efac", fontWeight: 700, fontSize: "0.88rem" }}>KisanSathi Expert Call</span>
          <span style={{ background: "rgba(255,255,255,.1)", color: "rgba(255,255,255,.6)", padding: "2px 10px", borderRadius: 4, fontSize: "0.72rem", fontFamily: "monospace" }}>
            Room: {roomId}
          </span>
        </div>
        <button
          onClick={() => navigate("/farmerdashboard/expert-connect")}
          style={{ background: "#dc2626", color: "white", border: "none", borderRadius: 8, padding: "8px 16px", display: "flex", alignItems: "center", gap: 6, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "0.82rem" }}
        >
          <PhoneOff size={14} /> End Call
        </button>
      </div>

      {/* Jitsi iframe container */}
      <div ref={containerRef} style={{ flex: 1, width: "100%" }} />

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.4); }
        }
      `}</style>
    </div>
  );
}
