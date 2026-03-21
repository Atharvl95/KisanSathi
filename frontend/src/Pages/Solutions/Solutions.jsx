import { useState, useEffect, useRef } from "react";
import Layout from "../../Components/Layout/Layout";

/* ─── DATA ─────────────────────────────────────────── */
const SOLUTIONS = [
  {
    emoji: "🌾",
    title: "AI Crop Recommendation",
    desc: "Upload your soil data — NPK levels, pH, moisture — and our AI engine suggests the most profitable crops suited to your land and local climate.",
    accent: "#16a34a",
    bg: "#f0fdf4",
    border: "#bbf7d0",
    tag: "AI Powered",
    stat: "32% higher yield",
  },
  {
    emoji: "🌦️",
    title: "Weather Intelligence",
    desc: "Hyperlocal 7-day forecasts, rainfall alerts, frost warnings, and drought advisories — so you plan irrigation and spraying with perfect timing.",
    accent: "#0284c7",
    bg: "#f0f9ff",
    border: "#bae6fd",
    tag: "Live Data",
    stat: "7-day forecasts",
  },
  {
    emoji: "🔍",
    title: "Pest & Disease Detection",
    desc: "Photograph a diseased leaf and our vision AI instantly identifies the pathogen, recommends the right treatment, and prevents further crop loss.",
    accent: "#ea580c",
    bg: "#fff7ed",
    border: "#fed7aa",
    tag: "Image AI",
    stat: "95% accuracy",
  },
  {
    emoji: "💧",
    title: "Smart Irrigation Monitoring",
    desc: "Sensor-driven irrigation schedules that deliver the exact amount of water your crops need — cutting water use by up to 40% while boosting health.",
    accent: "#0891b2",
    bg: "#ecfeff",
    border: "#a5f3fc",
    tag: "IoT Sensors",
    stat: "40% water saved",
  },
  {
    emoji: "📈",
    title: "Market Price Insights",
    desc: "Track live mandi prices across 500+ markets, compare trends, and decide the best time and place to sell your harvest for maximum returns.",
    accent: "#7c3aed",
    bg: "#faf5ff",
    border: "#ddd6fe",
    tag: "Live Prices",
    stat: "500+ mandis",
  },
  {
    emoji: "🤝",
    title: "Farmer Community Network",
    desc: "Connect with farmers across India — share experiences, ask crop questions, join local groups, and learn from expert agronomists in real time.",
    accent: "#be185d",
    bg: "#fdf2f8",
    border: "#fbcfe8",
    tag: "Community",
    stat: "10K+ farmers",
  },
];

/* ─── HOOK ──────────────────────────────────────────── */
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

/* ─── SOLUTION CARD ─────────────────────────────────── */
function SolutionCard({ sol, index }) {
  const [ref, inView] = useInView();
  const [hov, setHov] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "white",
        borderRadius: 24,
        padding: "32px 28px 28px",
        border: hov ? `1.5px solid ${sol.accent}40` : "1.5px solid rgba(22,163,74,0.08)",
        boxShadow: hov
          ? `0 24px 60px ${sol.accent}20, 0 4px 16px rgba(0,0,0,0.06)`
          : "0 4px 24px rgba(22,163,74,0.07), 0 1px 4px rgba(0,0,0,0.04)",
        opacity: inView ? 1 : 0,
        transform: inView
          ? hov ? "translateY(-10px)" : "translateY(0)"
          : "translateY(40px)",
        transition: `opacity 0.65s ease ${index * 100}ms, transform 0.35s ease, box-shadow 0.35s ease, border-color 0.3s ease`,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        cursor: "default",
      }}
    >
      {/* Corner glow */}
      <div style={{
        position: "absolute", top: -40, right: -40,
        width: 120, height: 120, borderRadius: "50%",
        background: `radial-gradient(circle, ${sol.accent}20, transparent 70%)`,
        opacity: hov ? 1 : 0.3,
        transition: "opacity 0.35s ease",
        pointerEvents: "none",
      }} />

      {/* Tag */}
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 5,
        padding: "4px 10px", borderRadius: 999,
        fontSize: 11, fontWeight: 700, letterSpacing: "0.05em",
        background: sol.bg, color: sol.accent,
        border: `1px solid ${sol.border}`,
        marginBottom: 18, width: "fit-content",
      }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: sol.accent }} />
        {sol.tag}
      </div>

      {/* Icon */}
      <div style={{
        width: 68, height: 68, borderRadius: "50%",
        background: sol.bg, border: `2px solid ${sol.border}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 30, marginBottom: 20,
        transform: hov ? "scale(1.1) rotate(-5deg)" : "scale(1) rotate(0deg)",
        transition: "transform 0.3s ease",
        boxShadow: hov ? `0 8px 24px ${sol.accent}25` : "none",
      }}>
        {sol.emoji}
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 19, fontWeight: 800,
        color: "#14532d", marginBottom: 10, lineHeight: 1.3,
      }}>
        {sol.title}
      </h3>

      {/* Desc */}
      <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.78, marginBottom: 24, flex: 1 }}>
        {sol.desc}
      </p>

      {/* Footer row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
        {/* Stat chip */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 5,
          padding: "5px 12px", borderRadius: 999, fontSize: 12, fontWeight: 700,
          background: hov ? sol.accent : sol.bg,
          color: hov ? "white" : sol.accent,
          transition: "background 0.3s ease, color 0.3s ease",
          boxShadow: hov ? `0 4px 12px ${sol.accent}40` : "none",
        }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" />
          </svg>
          {sol.stat}
        </div>

        {/* Learn More */}
        <button
          style={{
            display: "flex", alignItems: "center", gap: 5,
            padding: "8px 16px", borderRadius: 999,
            border: `1.5px solid ${hov ? sol.accent : sol.border}`,
            background: hov ? sol.accent : "transparent",
            color: hov ? "white" : sol.accent,
            fontSize: 13, fontWeight: 600,
            cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
            transition: "all 0.25s ease",
          }}
        >
          Learn More
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ─── MAIN PAGE ─────────────────────────────────────── */
export default function Solutions() {
  const [loaded, setLoaded] = useState(false);
  const [gridRef, gridInView] = useInView(0.05);
  const [ctaRef, ctaInView]   = useInView(0.15);

  useEffect(() => { const t = setTimeout(() => setLoaded(true), 80); return () => clearTimeout(t); }, []);

  return (
    <Layout>
      <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#fafffe", minHeight: "100vh" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=DM+Sans:wght@300;400;500;600;700&display=swap');
          *, *::before, *::after { box-sizing: border-box; }
        `}</style>

        {/* ══════════ BANNER ══════════ */}
        <section style={{ position: "relative", minHeight: 420, overflow: "hidden" }}>
          {/* BG */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1600&q=80')",
            backgroundSize: "cover", backgroundPosition: "center",
          }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.38)" }} />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(110deg, rgba(20,83,45,0.97) 0%, rgba(22,163,74,0.88) 42%, rgba(22,163,74,0.22) 70%, transparent 100%)",
          }} />
          {/* Blobs */}
          <div style={{ position: "absolute", top: 0, left: 0, width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(134,239,172,0.1), transparent 70%)", transform: "translate(-35%,-35%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: 0, right: "15%", width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(74,222,128,0.08), transparent 70%)", transform: "translateY(40%)", pointerEvents: "none" }} />

          {/* Content */}
          <div style={{ position: "relative", zIndex: 1, minHeight: 420, display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px 24px 80px", maxWidth: 1200, margin: "0 auto" }}>
            {/* Breadcrumb */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "rgba(187,247,208,0.75)", marginBottom: 20 }}>
              <span>Home</span><span>›</span>
              <span style={{ color: "#86efac", fontWeight: 600 }}>Solutions</span>
            </div>

            {/* Badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "8px 18px", borderRadius: 999, marginBottom: 22, width: "fit-content",
              background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.22)",
              color: "#bbf7d0", fontSize: 13, fontWeight: 600, backdropFilter: "blur(8px)",
            }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ea580c", display: "block" }} />
              Smart Technology for Farmers
            </div>

            {/* Heading */}
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.6rem, 6.5vw, 4.8rem)",
              fontWeight: 900, color: "white", lineHeight: 1.08,
              textShadow: "0 4px 24px rgba(0,0,0,0.28)",
              marginBottom: 20, maxWidth: 700,
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}>
              Our{" "}
              <span style={{ WebkitTextStroke: "2.5px #4ade80", color: "transparent" }}>Smart</span>
              {" "}Farming<br />Solutions
            </h1>

            <p style={{
              fontSize: 16.5, color: "rgba(220,252,231,0.82)", fontWeight: 300,
              lineHeight: 1.75, maxWidth: 520,
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.7s ease 0.18s, transform 0.7s ease 0.18s",
            }}>
              Six powerful tools designed specifically for Indian farmers — combining AI, real-time data, and deep agricultural expertise to help you grow more and earn more.
            </p>

            {/* Quick stats row */}
            <div style={{
              display: "flex", flexWrap: "wrap", gap: 24, marginTop: 36,
              opacity: loaded ? 1 : 0,
              transition: "opacity 0.7s ease 0.35s",
            }}>
              {[["6", "Smart Tools"], ["500+", "Farmers"], ["95%", "AI Accuracy"]].map(([val, lbl]) => (
                <div key={lbl}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 900, color: "#86efac" }}>{val}</div>
                  <div style={{ fontSize: 12, color: "rgba(187,247,208,0.7)", marginTop: 2 }}>{lbl}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Wave */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 64, overflow: "hidden", pointerEvents: "none" }}>
            <svg viewBox="0 0 1440 64" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
              <path d="M0,32 C480,64 960,0 1440,32 L1440,64 L0,64 Z" fill="#fafffe" />
            </svg>
          </div>
        </section>

        {/* ══════════ INTRO ROW ══════════ */}
        <section style={{ maxWidth: 1200, margin: "0 auto", padding: "72px 24px 0" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 24, marginBottom: 56 }}>
            <div>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "7px 16px", borderRadius: 999, marginBottom: 14,
                background: "#f0fdf4", color: "#16a34a",
                border: "1px solid #bbf7d0", fontSize: 13, fontWeight: 600,
              }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#ea580c" }} />
                What We Offer
              </div>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                fontWeight: 900, color: "#14532d", lineHeight: 1.15,
              }}>
                Technology Built for<br />
                <span style={{ color: "#16a34a" }}>Every Indian Farmer</span>
              </h2>
            </div>
            <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.75, maxWidth: 420 }}>
              From AI-driven crop selection to live market prices — our suite covers every stage of your farming journey, making data-driven decisions simple and accessible.
            </p>
          </div>

          {/* Decorative divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 48 }}>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, #dcfce7, transparent)" }} />
            <span style={{ fontSize: 18 }}>🌿</span>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, #dcfce7)" }} />
          </div>
        </section>

        {/* ══════════ SOLUTIONS GRID ══════════ */}
        <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 96px" }}>
          <div
            ref={gridRef}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 24,
            }}
          >
            {SOLUTIONS.map((sol, i) => (
              <SolutionCard key={sol.title} sol={sol} index={i} />
            ))}
          </div>
        </section>

        {/* ══════════ CTA SECTION ══════════ */}
        <section style={{ padding: "0 24px 80px", maxWidth: 1200, margin: "0 auto" }}>
          <div
            ref={ctaRef}
            style={{
              position: "relative",
              overflow: "hidden",
              borderRadius: 32,
              padding: "72px 40px",
              background: "linear-gradient(135deg, #0f3d1f 0%, #14532d 35%, #166534 65%, #16a34a 100%)",
              boxShadow: "0 32px 80px rgba(22,101,52,0.32)",
              textAlign: "center",
              opacity: ctaInView ? 1 : 0,
              transform: ctaInView ? "translateY(0)" : "translateY(40px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
          >
            {/* BG blobs */}
            <div style={{ position: "absolute", top: 0, right: 0, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(134,239,172,0.1), transparent)", transform: "translate(30%,-30%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: 0, left: "10%", width: 220, height: 220, borderRadius: "50%", background: "radial-gradient(circle, rgba(74,222,128,0.08), transparent)", transform: "translateY(45%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", top: "50%", left: "5%", width: 160, height: 160, borderRadius: "50%", background: "radial-gradient(circle, rgba(234,88,12,0.08), transparent)", transform: "translateY(-50%)", pointerEvents: "none" }} />

            {/* Floating emoji accents */}
            <div style={{ position: "absolute", top: 24, left: "8%", fontSize: 28, opacity: 0.3, pointerEvents: "none" }}>🌾</div>
            <div style={{ position: "absolute", bottom: 24, right: "8%", fontSize: 24, opacity: 0.25, pointerEvents: "none" }}>🌱</div>
            <div style={{ position: "absolute", top: "40%", right: "12%", fontSize: 20, opacity: 0.2, pointerEvents: "none" }}>🔬</div>

            {/* Content */}
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "8px 18px", borderRadius: 999, marginBottom: 24,
                background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.22)",
                color: "#bbf7d0", fontSize: 13, fontWeight: 600, backdropFilter: "blur(8px)",
              }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#ea580c" }} />
                Join 500+ Farmers Today
              </div>

              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
                fontWeight: 900, color: "white", lineHeight: 1.12,
                marginBottom: 16, textShadow: "0 4px 20px rgba(0,0,0,0.2)",
              }}>
                Start Using{" "}
                <span style={{ WebkitTextStroke: "2px #4ade80", color: "transparent" }}>Smart</span>
                {" "}Farming Today
              </h2>

              <p style={{
                fontSize: 16, color: "rgba(220,252,231,0.82)", fontWeight: 300,
                lineHeight: 1.75, maxWidth: 520, margin: "0 auto 36px",
              }}>
                Sign up for free and unlock AI crop recommendations, live weather alerts, pest detection, and more — right from your phone.
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 14 }}>
                <button
                  style={{
                    padding: "15px 36px", borderRadius: 999,
                    background: "linear-gradient(135deg, #ea580c, #f97316, #fb923c)",
                    color: "white", fontWeight: 700, fontSize: 16,
                    border: "none", cursor: "pointer",
                    boxShadow: "0 8px 28px rgba(234,88,12,0.45)",
                    fontFamily: "'DM Sans', sans-serif",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    display: "flex", alignItems: "center", gap: 8,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.06)"; e.currentTarget.style.boxShadow = "0 12px 36px rgba(234,88,12,0.55)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(234,88,12,0.45)"; }}
                >
                  Get Started Free
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>

                <button
                  style={{
                    padding: "15px 32px", borderRadius: 999,
                    background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)",
                    color: "white", fontWeight: 600, fontSize: 15,
                    border: "1.5px solid rgba(255,255,255,0.3)", cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    transition: "background 0.2s ease",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.18)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
                >
                  Talk to an Expert
                </button>
              </div>

              {/* Trust badges */}
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 24, marginTop: 36 }}>
                {[["✅", "Free to Start"], ["🔒", "Secure & Private"], ["📱", "Works on Mobile"]].map(([icon, text]) => (
                  <div key={text} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, color: "rgba(187,247,208,0.75)" }}>
                    <span>{icon}</span> {text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}