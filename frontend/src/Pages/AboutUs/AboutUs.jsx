import { useState, useEffect, useRef } from "react";
import Layout from "../../Components/Layout/Layout";

/* ─── DATA ─────────────────────────────────────────── */
const STATS = [
  { value: "500+",  label: "Farmers Supported",   icon: "🌾", accent: "#16a34a", bg: "#f0fdf4" },
  { value: "2000+", label: "Products Available",  icon: "🛒", accent: "#ea580c", bg: "#fff7ed" },
  { value: "20+",   label: "Years Experience",    icon: "🏆", accent: "#16a34a", bg: "#f0fdf4" },
  { value: "1000+", label: "Happy Customers",     icon: "😊", accent: "#ea580c", bg: "#fff7ed" },
];

const TEAM = [
  {
    name: "Rajesh Kumar",
    role: "Founder & CEO",
    img: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=200&h=200&fit=crop&crop=face",
    bio: "25 years in agri-tech, passionate about empowering farmers across India.",
  },
  {
    name: "Priya Sharma",
    role: "Head of Agronomy",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
    bio: "PhD in Soil Science, leading our AI-powered crop research division.",
  },
  {
    name: "Amit Patel",
    role: "Chief Technology Officer",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face",
    bio: "Building the technology backbone of modern Indian agriculture.",
  },
  {
    name: "Sunita Rao",
    role: "Community Lead",
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop&crop=face",
    bio: "Connecting 500+ farmer communities across rural India.",
  },
];

const VALUES = [
  { icon: "🌱", title: "Sustainability",  desc: "Eco-friendly farming that preserves soil health for future generations." },
  { icon: "🤝", title: "Farmer First",    desc: "Every decision puts the farmer's welfare and income at the center." },
  { icon: "🔬", title: "Innovation",      desc: "Cutting-edge AI tools built specifically for Indian agriculture." },
  { icon: "🌍", title: "Impact",          desc: "Reducing crop loss and empowering rural communities nationwide." },
];

/* ─── HOOK ──────────────────────────────────────────── */
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

/* ─── STAT CARD ─────────────────────────────────────── */
function StatCard({ stat, index }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className="flex flex-col items-center text-center p-8 rounded-3xl"
      style={{
        background: "white",
        boxShadow: "0 8px 40px rgba(22,163,74,0.09), 0 2px 8px rgba(0,0,0,0.05)",
        border: "1.5px solid rgba(22,163,74,0.08)",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.6s ease ${index * 120}ms, transform 0.6s ease ${index * 120}ms`,
      }}
    >
      <div
        className="w-16 h-16 flex items-center justify-center rounded-2xl text-3xl mb-4"
        style={{ background: stat.bg }}
      >
        {stat.icon}
      </div>
      <div
        className="text-4xl font-black mb-1"
        style={{ color: stat.accent, fontFamily: "'Playfair Display', serif" }}
      >
        {stat.value}
      </div>
      <div className="text-sm font-medium text-gray-500">{stat.label}</div>
    </div>
  );
}

/* ─── TEAM CARD ─────────────────────────────────────── */
function TeamCard({ member, index }) {
  const [ref, inView] = useInView();
  const [hov, setHov] = useState(false);
  return (
    <div
      ref={ref}
      className="flex flex-col items-center text-center p-6 rounded-3xl"
      style={{
        background: "white",
        border: "1.5px solid rgba(22,163,74,0.08)",
        boxShadow: hov
          ? "0 20px 48px rgba(22,163,74,0.16)"
          : "0 4px 24px rgba(22,163,74,0.07)",
        opacity: inView ? 1 : 0,
        transform: inView
          ? hov ? "translateY(-6px)" : "translateY(0)"
          : "translateY(30px)",
        transition: `opacity 0.6s ease ${index * 130}ms, transform 0.35s ease, box-shadow 0.35s ease`,
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* Avatar with gradient ring */}
      <div className="relative mb-5">
        <div
          className="absolute rounded-full"
          style={{
            inset: -3,
            background: "linear-gradient(135deg, #16a34a, #4ade80, #ea580c)",
            borderRadius: "50%",
            opacity: hov ? 1 : 0.35,
            transition: "opacity 0.3s ease",
          }}
        />
        <img
          src={member.img}
          alt={member.name}
          style={{
            width: 110,
            height: 110,
            borderRadius: "50%",
            objectFit: "cover",
            border: "4px solid white",
            position: "relative",
            zIndex: 1,
            display: "block",
            boxShadow: "0 6px 24px rgba(22,163,74,0.18)",
          }}
          onError={e => {
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=dcfce7&color=14532d&size=110`;
          }}
        />
      </div>

      <div className="font-bold text-lg mb-1" style={{ color: "#14532d", fontFamily: "'Playfair Display', serif" }}>
        {member.name}
      </div>
      <span
        className="text-xs font-semibold px-3 py-1 rounded-full mb-3"
        style={{ background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0" }}
      >
        {member.role}
      </span>
      <p className="text-sm text-gray-500 leading-relaxed">{member.bio}</p>
    </div>
  );
}

/* ─── MAIN PAGE ─────────────────────────────────────── */
export default function Aboutus() {
  const [loaded, setLoaded] = useState(false);
  const [colRef, colInView]       = useInView();
  const [valRef, valInView]       = useInView();

  useEffect(() => { const t = setTimeout(() => setLoaded(true), 80); return () => clearTimeout(t); }, []);

  return (
     <Layout>
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#fafffe", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
      `}</style>

      {/* ══════════════════ BANNER ══════════════════ */}
      <section className="relative w-full overflow-hidden" style={{ minHeight: 400 }}>
        {/* BG image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1600&q=80')" }}
        />
        {/* Overlays */}
        <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.38)" }} />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(110deg, rgba(20,83,45,0.97) 0%, rgba(22,163,74,0.88) 42%, rgba(22,163,74,0.22) 72%, transparent 100%)" }}
        />
        {/* Decorative glow blobs */}
        <div className="absolute top-0 left-0 rounded-full opacity-10 pointer-events-none"
          style={{ width: 280, height: 280, background: "radial-gradient(circle, #86efac, transparent 70%)", transform: "translate(-35%,-35%)" }} />
        <div className="absolute bottom-0 right-10 rounded-full opacity-8 pointer-events-none"
          style={{ width: 200, height: 200, background: "radial-gradient(circle, #4ade80, transparent 70%)", transform: "translateY(40%)" }} />

        {/* Content */}
        <div
          className="relative z-10 flex flex-col justify-center px-6 md:px-16 lg:px-24 py-20"
          style={{ minHeight: 400 }}
        >
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm mb-5" style={{ color: "rgba(187,247,208,0.75)" }}>
            <span>Home</span>
            <span>›</span>
            <span style={{ color: "#86efac", fontWeight: 600 }}>About Us</span>
          </div>

          {/* Pill badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6 w-fit"
            style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.22)", color: "#bbf7d0", backdropFilter: "blur(8px)" }}
          >
            <span className="w-2 h-2 rounded-full bg-orange-400" style={{ animation: "pulse 2s infinite" }} />
            Our Story
          </div>

          {/* Heading */}
          <h1
            className="font-black text-white mb-5"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.8rem, 7vw, 5rem)",
              lineHeight: 1.08,
              textShadow: "0 4px 24px rgba(0,0,0,0.28)",
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            About{" "}
            <span style={{ WebkitTextStroke: "2.5px #4ade80", color: "transparent" }}>Us</span>
          </h1>

          <p
            className="max-w-lg text-lg"
            style={{
              color: "rgba(220,252,231,0.82)",
              fontWeight: 300,
              lineHeight: 1.7,
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.7s ease 0.18s, transform 0.7s ease 0.18s",
            }}
          >
            Empowering Indian farmers with AI-driven insights, real-time weather alerts, and technology that truly works in the field.
          </p>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: 64, overflow: "hidden" }}>
          <svg viewBox="0 0 1440 64" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
            <path d="M0,32 C480,64 960,0 1440,32 L1440,64 L0,64 Z" fill="#fafffe" />
          </svg>
        </div>
      </section>

      {/* ══════════════════ TWO-COLUMN ══════════════════ */}
      <section className="px-6 md:px-16 lg:px-24 py-20">
        <div
          ref={colRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center"
        >
          {/* LEFT — Image */}
          <div
            className="relative"
            style={{
              opacity: colInView ? 1 : 0,
              transform: colInView ? "translateX(0)" : "translateX(-48px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
          >
            {/* Rotated blob behind image */}
            <div
              className="absolute rounded-3xl"
              style={{
                inset: 0,
                background: "linear-gradient(135deg, #dcfce7, #bbf7d0)",
                transform: "rotate(-3deg) scale(1.05)",
                zIndex: 0,
                borderRadius: 28,
              }}
            />
            <img
              src="https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?w=800&q=80"
              alt="Farmers working in the field"
              style={{
                position: "relative",
                zIndex: 1,
                width: "100%",
                height: 480,
                objectFit: "cover",
                borderRadius: 24,
                boxShadow: "0 24px 64px rgba(22,163,74,0.18)",
                display: "block",
              }}
            />
            {/* Est. badge */}
            <div
              className="absolute flex items-center gap-3 px-5 py-3 rounded-2xl"
              style={{
                bottom: 20,
                left: 20,
                zIndex: 2,
                background: "white",
                boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
              }}
            >
              <span style={{ fontSize: 28 }}>🌾</span>
              <div>
                <div className="font-bold text-sm" style={{ color: "#14532d" }}>Est. 2004</div>
                <div className="text-xs text-gray-400">20+ Years of Trust</div>
              </div>
            </div>
            {/* AI badge */}
            <div
              className="absolute flex items-center justify-center font-bold text-white text-xs rounded-full"
              style={{
                top: -14,
                right: -14,
                width: 48,
                height: 48,
                zIndex: 2,
                background: "linear-gradient(135deg, #ea580c, #fb923c)",
                boxShadow: "0 4px 16px rgba(234,88,12,0.42)",
                fontSize: 12,
              }}
            >
              AI
            </div>
          </div>

          {/* RIGHT — Content */}
          <div
            style={{
              opacity: colInView ? 1 : 0,
              transform: colInView ? "translateX(0)" : "translateX(48px)",
              transition: "opacity 0.8s ease 0.15s, transform 0.8s ease 0.15s",
            }}
          >
            {/* Label */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-5 w-fit"
              style={{ background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0" }}
            >
              <span className="w-2 h-2 rounded-full bg-orange-400" />
              Who We Are
            </div>

            <h2
              className="font-black mb-5 leading-tight"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2rem, 4vw, 2.8rem)",
                color: "#14532d",
              }}
            >
              Growing India's <br />
              <span style={{ color: "#16a34a" }}>Agriculture</span> Future
            </h2>

            <p className="text-gray-600 leading-relaxed mb-5" style={{ fontSize: 15.5 }}>
              Founded in 2004, <strong style={{ color: "#14532d" }}>Kisansathi</strong> was born from a simple belief — every farmer deserves access to the best tools, knowledge, and technology. We bridge the gap between modern AI and traditional farming wisdom.
            </p>

            {/* Mission */}
            <div className="p-5 rounded-2xl mb-4" style={{ background: "#f0fdf4", border: "1px solid #dcfce7" }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">🎯</span>
                <span className="font-bold text-sm" style={{ color: "#14532d" }}>Our Mission</span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                To empower every Indian farmer with AI-powered crop recommendations, real-time weather intelligence, and pest detection tools — reducing costs and increasing yields sustainably.
              </p>
            </div>

            {/* Vision */}
            <div className="p-5 rounded-2xl mb-7" style={{ background: "#fff7ed", border: "1px solid #fed7aa" }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">🔭</span>
                <span className="font-bold text-sm" style={{ color: "#9a3412" }}>Our Vision</span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                A future where no farmer faces crop failure alone — where data, community, and technology stand beside every farmer in every field across India.
              </p>
            </div>

            {/* CTA */}
            <button
              className="flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #14532d, #16a34a)",
                border: "none",
                cursor: "pointer",
                fontSize: 15,
                boxShadow: "0 8px 24px rgba(22,101,52,0.28)",
              }}
            >
              Explore Our Solutions
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════ STATS ══════════════════ */}
      <section style={{ background: "linear-gradient(180deg, #fafffe 0%, #f0fdf4 100%)" }} className="px-6 md:px-16 lg:px-24 py-16">
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4 w-fit mx-auto"
            style={{ background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0" }}
          >
            <span className="w-2 h-2 rounded-full bg-orange-400" />
            By The Numbers
          </div>
          <h2
            className="font-black"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", color: "#14532d" }}
          >
            Our Impact in Numbers
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((s, i) => <StatCard key={s.label} stat={s} index={i} />)}
        </div>
      </section>

      {/* ══════════════════ VALUES ══════════════════ */}
      <section className="px-6 md:px-16 lg:px-24 py-20">
        <div className="text-center mb-14">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4 w-fit mx-auto"
            style={{ background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0" }}
          >
            <span className="w-2 h-2 rounded-full bg-orange-400" />
            What Drives Us
          </div>
          <h2
            className="font-black"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", color: "#14532d" }}
          >
            Our Core Values
          </h2>
        </div>

        <div
          ref={valRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {VALUES.map((v, i) => (
            <div
              key={v.title}
              className="p-7 rounded-3xl"
              style={{
                background: "white",
                border: "1.5px solid rgba(22,163,74,0.08)",
                boxShadow: "0 4px 24px rgba(22,163,74,0.07)",
                opacity: valInView ? 1 : 0,
                transform: valInView ? "translateY(0)" : "translateY(28px)",
                transition: `opacity 0.6s ease ${i * 100}ms, transform 0.6s ease ${i * 100}ms, box-shadow 0.3s ease`,
                cursor: "default",
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 16px 48px rgba(22,163,74,0.15)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 4px 24px rgba(22,163,74,0.07)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-2xl text-3xl mb-5" style={{ background: "#f0fdf4" }}>
                {v.icon}
              </div>
              <h3 className="font-bold text-lg mb-2" style={{ color: "#14532d" }}>{v.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════ TEAM ══════════════════ */}
      <section
        className="px-6 md:px-16 lg:px-24 py-20"
        style={{ background: "linear-gradient(180deg, #fafffe 0%, #f0fdf4 55%, #fafffe 100%)" }}
      >
        <div className="text-center mb-14">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4 w-fit mx-auto"
            style={{ background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0" }}
          >
            <span className="w-2 h-2 rounded-full bg-orange-400" />
            The People
          </div>
          <h2
            className="font-black mb-3"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", color: "#14532d" }}
          >
            Meet Our Team
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed max-w-lg mx-auto">
            Agronomists, engineers, and community builders working together to transform Indian agriculture.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEAM.map((m, i) => <TeamCard key={m.name} member={m} index={i} />)}
        </div>
      </section>

      {/* ══════════════════ CTA BANNER ══════════════════ */}
      <section className="px-6 md:px-16 lg:px-24 pb-20">
        <div
          className="relative overflow-hidden rounded-3xl px-10 md:px-16 py-14 flex flex-col md:flex-row items-center justify-between gap-8"
          style={{
            background: "linear-gradient(135deg, #14532d 0%, #166534 45%, #16a34a 100%)",
            boxShadow: "0 24px 64px rgba(22,101,52,0.28)",
          }}
        >
          <div className="absolute top-0 right-0 rounded-full opacity-10 pointer-events-none"
            style={{ width: 280, height: 280, background: "radial-gradient(circle, #86efac, transparent)", transform: "translate(30%,-30%)" }} />
          <div className="absolute bottom-0 left-24 rounded-full opacity-10 pointer-events-none"
            style={{ width: 180, height: 180, background: "radial-gradient(circle, #4ade80, transparent)", transform: "translateY(45%)" }} />

          <div className="relative z-10">
            <h3
              className="font-black text-white mb-2"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}
            >
              Ready to Grow Smarter?
            </h3>
            <p style={{ color: "rgba(187,247,208,0.85)", fontSize: 15 }}>
              Join 500+ farmers already using Kisansathi to increase yield and reduce costs.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap gap-3">
            <button
              className="px-7 py-3.5 rounded-full font-bold text-sm text-white transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #ea580c, #fb923c)",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 4px 16px rgba(234,88,12,0.42)",
              }}
            >
              Get Started Free →
            </button>
            <button
              className="px-7 py-3.5 rounded-full font-semibold text-sm text-white transition-all duration-200 hover:bg-white/20"
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1.5px solid rgba(255,255,255,0.3)",
                cursor: "pointer",
                backdropFilter: "blur(8px)",
              }}
            >
              Talk to an Expert
            </button>
          </div>
        </div>
      </section>
    </div>
   </Layout>
  );
}