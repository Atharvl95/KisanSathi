import { useState, useEffect, useRef } from "react";

const FEATURES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"/>
        <path d="M12 6v6l4 2"/>
        <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.15"/>
      </svg>
    ),
    emoji: "🌾",
    title: "AI Crop Recommendation",
    desc: "Get personalized crop suggestions based on your soil NPK levels, pH balance, and real-time weather data. Maximize yield with data-driven decisions.",
    accent: "#16a34a",
    lightBg: "#f0fdf4",
    tag: "AI Powered",
    stat: "32% higher yield",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z"/>
      </svg>
    ),
    emoji: "🌦️",
    title: "Weather Intelligence",
    desc: "Real-time forecasts, rain alerts, drought warnings, and temperature tracking from IMD & OpenWeatherMap — so you're never caught off guard.",
    accent: "#0284c7",
    lightBg: "#f0f9ff",
    tag: "Live Data",
    stat: "7-day forecasts",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        <path d="M8 11a3 3 0 0 1 6 0"/>
      </svg>
    ),
    emoji: "🔍",
    title: "Pest & Disease Detection",
    desc: "Upload a leaf photo and our AI instantly identifies the disease, suggests the correct treatment, and helps you prevent further crop loss.",
    accent: "#ea580c",
    lightBg: "#fff7ed",
    tag: "Image AI",
    stat: "95% accuracy",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
    emoji: "📈",
    title: "Market Price Insights",
    desc: "Track live mandi prices across markets, compare rates, and decide the perfect time and place to sell your produce for maximum profit.",
    accent: "#7c3aed",
    lightBg: "#faf5ff",
    tag: "Live Prices",
    stat: "500+ mandis",
  },
];

function useInView(threshold = 0.12) {
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

function FeatureCard({ feature, index }) {
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
        padding: "32px 28px",
        border: hov ? `1.5px solid ${feature.accent}30` : "1.5px solid rgba(22,163,74,0.08)",
        boxShadow: hov
          ? `0 20px 56px ${feature.accent}22, 0 4px 16px rgba(0,0,0,0.06)`
          : "0 4px 24px rgba(22,163,74,0.07), 0 1px 4px rgba(0,0,0,0.04)",
        opacity: inView ? 1 : 0,
        transform: inView
          ? hov ? "translateY(-8px)" : "translateY(0)"
          : "translateY(36px)",
        transition: `opacity 0.65s ease ${index * 120}ms, transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease`,
        cursor: "default",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative corner blob */}
      <div
        style={{
          position: "absolute",
          top: -30,
          right: -30,
          width: 100,
          height: 100,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${feature.accent}18, transparent 70%)`,
          transition: "opacity 0.35s ease",
          opacity: hov ? 1 : 0.4,
          pointerEvents: "none",
        }}
      />

      {/* Tag pill */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 5,
          padding: "4px 10px",
          borderRadius: 999,
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.04em",
          background: feature.lightBg,
          color: feature.accent,
          border: `1px solid ${feature.accent}30`,
          marginBottom: 20,
        }}
      >
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: feature.accent, display: "inline-block" }} />
        {feature.tag}
      </div>

      {/* Icon circle */}
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: "50%",
          background: feature.lightBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 20,
          color: feature.accent,
          border: `2px solid ${feature.accent}22`,
          transition: "transform 0.3s ease, background 0.3s ease",
          transform: hov ? "scale(1.08) rotate(-4deg)" : "scale(1) rotate(0deg)",
          fontSize: 28,
        }}
      >
        {feature.emoji}
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 20,
          fontWeight: 800,
          color: "#14532d",
          marginBottom: 10,
          lineHeight: 1.3,
          transition: "color 0.2s ease",
        }}
      >
        {feature.title}
      </h3>

      {/* Description */}
      <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.75, marginBottom: 20 }}>
        {feature.desc}
      </p>

      {/* Stat chip */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "6px 14px",
          borderRadius: 999,
          fontSize: 12,
          fontWeight: 700,
          background: hov ? feature.accent : feature.lightBg,
          color: hov ? "white" : feature.accent,
          transition: "background 0.3s ease, color 0.3s ease",
          boxShadow: hov ? `0 4px 12px ${feature.accent}40` : "none",
        }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
        </svg>
        {feature.stat}
      </div>

      {/* Arrow on hover */}
      <div
        style={{
          position: "absolute",
          bottom: 28,
          right: 28,
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: feature.lightBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: feature.accent,
          opacity: hov ? 1 : 0,
          transform: hov ? "scale(1) translateX(0)" : "scale(0.7) translateX(8px)",
          transition: "opacity 0.25s ease, transform 0.25s ease",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
        </svg>
      </div>
    </div>
  );
}

export default function Features() {
  const [headRef, headInView] = useInView(0.2);

  return (
    <section
      style={{
        fontFamily: "'DM Sans', sans-serif",
        background: "linear-gradient(180deg, #fafffe 0%, #f0fdf4 50%, #fafffe 100%)",
        padding: "96px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
      `}</style>

      {/* Background decorative blobs */}
      <div style={{
        position: "absolute", top: 0, left: 0, width: 400, height: 400,
        borderRadius: "50%", pointerEvents: "none",
        background: "radial-gradient(circle, rgba(22,163,74,0.06), transparent 70%)",
        transform: "translate(-40%, -40%)",
      }}/>
      <div style={{
        position: "absolute", bottom: 0, right: 0, width: 350, height: 350,
        borderRadius: "50%", pointerEvents: "none",
        background: "radial-gradient(circle, rgba(234,88,12,0.05), transparent 70%)",
        transform: "translate(35%, 35%)",
      }}/>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>

        {/* ── HEADER ── */}
        <div
          ref={headRef}
          style={{
            textAlign: "center",
            marginBottom: 64,
            opacity: headInView ? 1 : 0,
            transform: headInView ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          {/* Label pill */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "8px 18px", borderRadius: 999,
            background: "#f0fdf4", color: "#16a34a",
            border: "1px solid #bbf7d0",
            fontSize: 13, fontWeight: 600,
            marginBottom: 20,
          }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ea580c", display: "inline-block", animation: "pulse 2s infinite" }}/>
            Smart Technology
          </div>

          {/* Heading */}
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 900,
            color: "#14532d",
            lineHeight: 1.1,
            marginBottom: 16,
          }}>
            Our{" "}
            <span style={{ WebkitTextStroke: "2px #16a34a", color: "transparent" }}>Smart</span>
            {" "}Farming Solutions
          </h2>

          {/* Subtitle */}
          <p style={{
            fontSize: 16,
            color: "#6b7280",
            lineHeight: 1.75,
            maxWidth: 560,
            margin: "0 auto 28px",
            fontWeight: 400,
          }}>
            Kisansathi combines AI, real-time data, and deep agricultural knowledge to help every farmer grow more, spend less, and farm with confidence.
          </p>

          {/* Decorative divider */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
            <div style={{ height: 2, width: 48, borderRadius: 2, background: "linear-gradient(90deg, transparent, #16a34a)" }}/>
            <span style={{ fontSize: 20 }}>🌿</span>
            <div style={{ height: 2, width: 48, borderRadius: 2, background: "linear-gradient(90deg, #16a34a, transparent)" }}/>
          </div>
        </div>

        {/* ── CARDS GRID ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 24,
          marginBottom: 64,
        }}>
          {FEATURES.map((f, i) => <FeatureCard key={f.title} feature={f} index={i} />)}
        </div>

        {/* ── BOTTOM CTA STRIP ── */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 20,
            background: "white",
            borderRadius: 20,
            padding: "24px 32px",
            border: "1.5px solid rgba(22,163,74,0.1)",
            boxShadow: "0 4px 24px rgba(22,163,74,0.08)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{
              width: 48, height: 48, borderRadius: "50%",
              background: "#f0fdf4", display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: 22,
              border: "2px solid #bbf7d0",
            }}>
              🚀
            </div>
            <div>
              <div style={{ fontWeight: 700, color: "#14532d", fontSize: 15 }}>Ready to transform your farm?</div>
              <div style={{ fontSize: 13, color: "#9ca3af", marginTop: 2 }}>Join 500+ farmers already using Kisansathi</div>
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <button style={{
              padding: "11px 24px", borderRadius: 999,
              background: "linear-gradient(135deg, #ea580c, #fb923c)",
              color: "white", fontWeight: 700, fontSize: 14,
              border: "none", cursor: "pointer",
              boxShadow: "0 4px 16px rgba(234,88,12,0.35)",
              fontFamily: "'DM Sans', sans-serif",
              transition: "transform 0.2s ease",
            }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            >
              Get Started Free →
            </button>
            <button style={{
              padding: "11px 24px", borderRadius: 999,
              background: "#f0fdf4",
              color: "#16a34a", fontWeight: 600, fontSize: 14,
              border: "1.5px solid #bbf7d0", cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              transition: "transform 0.2s ease",
            }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            >
              View All Features
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}