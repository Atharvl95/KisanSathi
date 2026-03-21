import { useState, useEffect, useRef } from "react";
import Layout from "../../Components/Layout/Layout";
/* ─── DATA ─────────────────────────────────────────── */
const CATEGORIES = [
  { label: "All", icon: "🌿", count: 8 },
  { label: "Crop Tips", icon: "🌾", count: 3 },
  { label: "Weather Updates", icon: "🌦️", count: 2 },
  { label: "Technology", icon: "🤖", count: 2 },
  { label: "Govt Schemes", icon: "🏛️", count: 1 },
];

const BLOGS = [
  {
    id: 1,
    title: "Top 5 Smart Farming Techniques in 2025",
    desc: "Discover how precision agriculture, drone monitoring, and AI-powered advisory tools are reshaping how Indian farmers work their land this season.",
    author: "Rajesh Kumar",
    date: "Mar 10, 2025",
    category: "Technology",
    readTime: "5 min read",
    img: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&q=80",
    accent: "#16a34a",
    featured: true,
  },
  {
    id: 2,
    title: "How AI is Transforming Indian Agriculture",
    desc: "From crop recommendations to real-time disease detection — explore the AI tools making modern farming accessible to every farmer across India.",
    author: "Priya Sharma",
    date: "Feb 28, 2025",
    category: "Technology",
    readTime: "7 min read",
    img: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=600&q=80",
    accent: "#7c3aed",
    featured: false,
  },
  {
    id: 3,
    title: "Best Crops to Grow in Monsoon Season",
    desc: "Kharif season is the most productive for Indian farmers. Learn which crops thrive in monsoon rains and how to prepare your soil for maximum yield.",
    author: "Amit Patel",
    date: "Feb 14, 2025",
    category: "Crop Tips",
    readTime: "4 min read",
    img: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80",
    accent: "#ea580c",
    featured: false,
  },
  {
    id: 4,
    title: "How Weather Data Helps Farmers Increase Yield",
    desc: "Hyperlocal weather forecasts, rainfall predictions, and drought alerts are giving farmers a decisive edge. Here's how to use them effectively.",
    author: "Sunita Rao",
    date: "Jan 30, 2025",
    category: "Weather Updates",
    readTime: "6 min read",
    img: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&q=80",
    accent: "#0284c7",
    featured: false,
  },
  {
    id: 5,
    title: "PM Kisan Yojana: What Every Farmer Must Know",
    desc: "A complete guide to understanding the PM Kisan Samman Nidhi — eligibility, how to apply, payment schedule, and how to check your status online.",
    author: "Vikram Desai",
    date: "Jan 18, 2025",
    category: "Govt Schemes",
    readTime: "8 min read",
    img: "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?w=600&q=80",
    accent: "#be185d",
    featured: false,
  },
  {
    id: 6,
    title: "Organic Farming: Step-by-Step Beginner Guide",
    desc: "Thinking about going organic? This guide walks you through soil preparation, natural pesticides, composting, and getting certified for premium markets.",
    author: "Meena Joshi",
    date: "Jan 5, 2025",
    category: "Crop Tips",
    readTime: "10 min read",
    img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80",
    accent: "#16a34a",
    featured: false,
  },
  {
    id: 7,
    title: "Understanding Soil Health for Better Harvests",
    desc: "Healthy soil is the foundation of a successful farm. Learn how to test NPK levels, improve soil structure, and choose the right fertilizers.",
    author: "Rajesh Kumar",
    date: "Dec 22, 2024",
    category: "Crop Tips",
    readTime: "5 min read",
    img: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=600&q=80",
    accent: "#92400e",
    featured: false,
  },
  {
    id: 8,
    title: "Monsoon Forecast 2025: What Farmers Should Prepare",
    desc: "The IMD's early monsoon predictions for 2025 are out. Here's what they mean for Kharif sowing, water storage, and crop selection strategies.",
    author: "Priya Sharma",
    date: "Dec 10, 2024",
    category: "Weather Updates",
    readTime: "6 min read",
    img: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=600&q=80",
    accent: "#0891b2",
    featured: false,
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

/* ─── BLOG CARD ─────────────────────────────────────── */
function BlogCard({ blog, index }) {
  const [ref, inView] = useInView();
  const [hov, setHov] = useState(false);

  const catColor = {
    Technology: { color: "#7c3aed", bg: "#faf5ff", border: "#ddd6fe" },
    "Crop Tips": { color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0" },
    "Weather Updates": { color: "#0284c7", bg: "#f0f9ff", border: "#bae6fd" },
    "Govt Schemes": { color: "#be185d", bg: "#fdf2f8", border: "#fbcfe8" },
  }[blog.category] || { color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0" };

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "white",
        borderRadius: 20,
        overflow: "hidden",
        border: hov ? `1.5px solid ${blog.accent}35` : "1.5px solid rgba(22,163,74,0.08)",
        boxShadow: hov
          ? `0 20px 56px ${blog.accent}18, 0 4px 12px rgba(0,0,0,0.06)`
          : "0 4px 20px rgba(22,163,74,0.07), 0 1px 4px rgba(0,0,0,0.04)",
        opacity: inView ? 1 : 0,
        transform: inView ? (hov ? "translateY(-8px)" : "translateY(0)") : "translateY(36px)",
        transition: `opacity 0.6s ease ${index * 80}ms, transform 0.35s ease, box-shadow 0.35s ease, border-color 0.3s ease`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", overflow: "hidden", height: 200 }}>
        <img
          src={blog.img}
          alt={blog.title}
          style={{
            width: "100%", height: "100%",
            objectFit: "cover",
            transform: hov ? "scale(1.07)" : "scale(1)",
            transition: "transform 0.5s ease",
            display: "block",
          }}
          onError={e => { e.target.style.background = "#f0fdf4"; e.target.src = ""; }}
        />
        {/* Category badge */}
        <div style={{
          position: "absolute", top: 14, left: 14,
          padding: "4px 12px", borderRadius: 999,
          background: "rgba(255,255,255,0.92)",
          color: catColor.color, fontSize: 11, fontWeight: 700,
          backdropFilter: "blur(6px)",
          border: `1px solid ${catColor.border}`,
        }}>
          {blog.category}
        </div>
        {blog.featured && (
          <div style={{
            position: "absolute", top: 14, right: 14,
            padding: "4px 10px", borderRadius: 999,
            background: "linear-gradient(135deg, #ea580c, #fb923c)",
            color: "white", fontSize: 11, fontWeight: 700,
          }}>
            ⭐ Featured
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: "22px 24px 24px", display: "flex", flexDirection: "column", flex: 1 }}>
        {/* Meta */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <div style={{
            width: 32, height: 32, borderRadius: "50%",
            background: `linear-gradient(135deg, #16a34a, #4ade80)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "white", fontSize: 12, fontWeight: 700, flexShrink: 0,
          }}>
            {blog.author[0]}
          </div>
          <span style={{ fontSize: 12.5, color: "#6b7280", fontWeight: 500 }}>{blog.author}</span>
          <span style={{ fontSize: 11, color: "#d1d5db" }}>·</span>
          <span style={{ fontSize: 12, color: "#9ca3af" }}>{blog.date}</span>
          <span style={{ fontSize: 11, color: "#d1d5db" }}>·</span>
          <span style={{ fontSize: 12, color: "#9ca3af" }}>{blog.readTime}</span>
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 17.5, fontWeight: 800,
          color: hov ? "#16a34a" : "#14532d",
          lineHeight: 1.35, marginBottom: 10,
          transition: "color 0.2s ease",
        }}>
          {blog.title}
        </h3>

        {/* Desc */}
        <p style={{ fontSize: 13.5, color: "#6b7280", lineHeight: 1.72, marginBottom: 20, flex: 1 }}>
          {blog.desc}
        </p>

        {/* Read More */}
        <button style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "9px 18px", borderRadius: 999, width: "fit-content",
          background: hov ? blog.accent : "transparent",
          color: hov ? "white" : blog.accent,
          border: `1.5px solid ${hov ? blog.accent : blog.accent + "55"}`,
          fontSize: 13, fontWeight: 600,
          cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
          transition: "all 0.25s ease",
          boxShadow: hov ? `0 4px 14px ${blog.accent}40` : "none",
        }}>
          Read More
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ─── MAIN PAGE ─────────────────────────────────────── */
export default function Blogs() {
  const [loaded, setLoaded] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [nlRef, nlInView] = useInView(0.15);

  useEffect(() => { const t = setTimeout(() => setLoaded(true), 80); return () => clearTimeout(t); }, []);

  const filtered = activeCategory === "All"
    ? BLOGS
    : BLOGS.filter(b => b.category === activeCategory);

  const handleSubscribe = () => {
    if (!email.includes("@")) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3500);
  };

  return (
    <Layout>
      <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#fafffe", minHeight: "100vh" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=DM+Sans:wght@300;400;500;600;700&display=swap');
          *, *::before, *::after { box-sizing: border-box; }
          .cat-btn { transition: all 0.2s ease; }
          .cat-btn:hover { transform: translateY(-2px); }
          .nl-input:focus { outline: none; border-color: #4ade80 !important; box-shadow: 0 0 0 3px rgba(74,222,128,0.15) !important; }
        `}</style>

        {/* ══════════ BANNER ══════════ */}
        <section style={{ position: "relative", minHeight: 400, overflow: "hidden" }}>
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1600&q=80')",
            backgroundSize: "cover", backgroundPosition: "center",
          }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)" }} />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(110deg, rgba(20,83,45,0.97) 0%, rgba(22,163,74,0.88) 42%, rgba(22,163,74,0.2) 70%, transparent 100%)",
          }} />
          <div style={{ position: "absolute", top: 0, left: 0, width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(134,239,172,0.1), transparent 70%)", transform: "translate(-35%,-35%)", pointerEvents: "none" }} />

          <div style={{ position: "relative", zIndex: 1, minHeight: 400, display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px 24px", maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "rgba(187,247,208,0.75)", marginBottom: 20 }}>
              <span>Home</span><span>›</span>
              <span style={{ color: "#86efac", fontWeight: 600 }}>Blogs</span>
            </div>

            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "8px 18px", borderRadius: 999, marginBottom: 22, width: "fit-content",
              background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.22)",
              color: "#bbf7d0", fontSize: 13, fontWeight: 600, backdropFilter: "blur(8px)",
            }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ea580c", display: "block", animation: "pulse 2s infinite" }} />
              Knowledge for Farmers
            </div>

            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.4rem, 6vw, 4.4rem)",
              fontWeight: 900, color: "white", lineHeight: 1.08,
              textShadow: "0 4px 24px rgba(0,0,0,0.28)",
              marginBottom: 18, maxWidth: 680,
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}>
              Agriculture{" "}
              <span style={{ WebkitTextStroke: "2.5px #4ade80", color: "transparent" }}>Insights</span>
              {" "}& Blogs
            </h1>

            <p style={{
              fontSize: 16, color: "rgba(220,252,231,0.82)", fontWeight: 300,
              lineHeight: 1.75, maxWidth: 500,
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.7s ease 0.18s, transform 0.7s ease 0.18s",
            }}>
              Stay informed with the latest crop tips, technology trends, weather guides, and government schemes tailored for Indian farmers.
            </p>
          </div>

          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 64, overflow: "hidden", pointerEvents: "none" }}>
            <svg viewBox="0 0 1440 64" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
              <path d="M0,32 C480,64 960,0 1440,32 L1440,64 L0,64 Z" fill="#fafffe" />
            </svg>
          </div>
        </section>

        {/* ══════════ CATEGORY FILTER ══════════ */}
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px 0" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
            {CATEGORIES.map(cat => {
              const active = activeCategory === cat.label;
              return (
                <button
                  key={cat.label}
                  className="cat-btn"
                  onClick={() => setActiveCategory(cat.label)}
                  style={{
                    display: "flex", alignItems: "center", gap: 7,
                    padding: "9px 18px", borderRadius: 999,
                    background: active ? "linear-gradient(135deg, #14532d, #16a34a)" : "white",
                    color: active ? "white" : "#374151",
                    border: active ? "1.5px solid transparent" : "1.5px solid #e5e7eb",
                    fontSize: 13.5, fontWeight: 600,
                    cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                    boxShadow: active ? "0 4px 16px rgba(22,101,52,0.28)" : "0 2px 8px rgba(0,0,0,0.04)",
                  }}
                >
                  <span>{cat.icon}</span>
                  {cat.label}
                  <span style={{
                    padding: "1px 7px", borderRadius: 999, fontSize: 11, fontWeight: 700,
                    background: active ? "rgba(255,255,255,0.2)" : "#f3f4f6",
                    color: active ? "white" : "#6b7280",
                  }}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ══════════ BLOG GRID ══════════ */}
        <section style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px 80px" }}>
          {/* Section header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32, flexWrap: "wrap", gap: 12 }}>
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, color: "#14532d", margin: 0 }}>
                {activeCategory === "All" ? "Latest Articles" : activeCategory}
              </h2>
              <p style={{ fontSize: 13, color: "#9ca3af", margin: "4px 0 0" }}>
                {filtered.length} article{filtered.length !== 1 ? "s" : ""} found
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 999, background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <span style={{ fontSize: 12.5, color: "#16a34a", fontWeight: 600 }}>Search articles</span>
              </div>
            </div>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 24,
          }}>
            {filtered.map((blog, i) => <BlogCard key={blog.id} blog={blog} index={i} />)}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "64px 24px", color: "#9ca3af" }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🌾</div>
              <p style={{ fontSize: 15 }}>No articles found in this category yet.</p>
            </div>
          )}
        </section>

        {/* ══════════ NEWSLETTER ══════════ */}
        <section style={{ padding: "0 24px 80px", maxWidth: 1200, margin: "0 auto" }}>
          <div
            ref={nlRef}
            style={{
              position: "relative", overflow: "hidden",
              borderRadius: 28, padding: "60px 40px",
              background: "linear-gradient(135deg, #0f3d1f 0%, #14532d 40%, #16a34a 100%)",
              boxShadow: "0 24px 64px rgba(22,101,52,0.28)",
              textAlign: "center",
              opacity: nlInView ? 1 : 0,
              transform: nlInView ? "translateY(0)" : "translateY(36px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
          >
            <div style={{ position: "absolute", top: 0, right: 0, width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(134,239,172,0.1), transparent)", transform: "translate(30%,-30%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: 0, left: "8%", width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(234,88,12,0.07), transparent)", transform: "translateY(45%)", pointerEvents: "none" }} />

            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ fontSize: 36, marginBottom: 16 }}>📬</div>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                padding: "6px 16px", borderRadius: 999, marginBottom: 18,
                background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
                color: "#bbf7d0", fontSize: 12.5, fontWeight: 600,
              }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#ea580c" }} />
                Weekly Farm Updates
              </div>

              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.7rem, 4vw, 2.6rem)",
                fontWeight: 900, color: "white", marginBottom: 12,
              }}>
                Never Miss a Farm Insight
              </h2>
              <p style={{ fontSize: 15, color: "rgba(220,252,231,0.8)", fontWeight: 300, lineHeight: 1.7, maxWidth: 480, margin: "0 auto 32px" }}>
                Get weekly crop tips, weather alerts, mandi prices, and expert farming advice — straight to your inbox, every Tuesday.
              </p>

              {subscribed ? (
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  padding: "14px 28px", borderRadius: 999,
                  background: "rgba(74,222,128,0.15)", border: "1px solid rgba(74,222,128,0.3)",
                  color: "#86efac", fontSize: 15, fontWeight: 600,
                }}>
                  ✅ You're subscribed! Welcome to the Kisansathi community 🌿
                </div>
              ) : (
                <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", maxWidth: 460, margin: "0 auto" }}>
                  <input
                    className="nl-input"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleSubscribe()}
                    style={{
                      flex: 1, minWidth: 220,
                      padding: "13px 20px", borderRadius: 999,
                      border: "1.5px solid rgba(255,255,255,0.2)",
                      background: "rgba(255,255,255,0.1)",
                      color: "white", fontSize: 14,
                      fontFamily: "'DM Sans', sans-serif",
                      backdropFilter: "blur(8px)",
                      transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                    }}
                  />
                  <button
                    onClick={handleSubscribe}
                    style={{
                      padding: "13px 26px", borderRadius: 999,
                      background: "linear-gradient(135deg, #ea580c, #fb923c)",
                      color: "white", fontWeight: 700, fontSize: 14,
                      border: "none", cursor: "pointer",
                      boxShadow: "0 4px 16px rgba(234,88,12,0.4)",
                      fontFamily: "'DM Sans', sans-serif",
                      transition: "transform 0.2s ease",
                      whiteSpace: "nowrap",
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                  >
                    Subscribe →
                  </button>
                </div>
              )}

              <p style={{ fontSize: 12, color: "rgba(187,247,208,0.5)", marginTop: 14 }}>
                🔒 No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}