import { useState } from "react";
import { Link } from "react-router-dom";

const LeafLogo = () => (
  <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="16" fill="#16a34a" />
    <path d="M16 24C16 24 8 18 8 12C8 8.68629 10.6863 6 14 6C15.1046 6 16 6.89543 16 8V24Z" fill="#86efac" />
    <path d="M16 24C16 24 24 18 24 12C24 8.68629 21.3137 6 18 6C16.8954 6 16 6.89543 16 8V24Z" fill="white" fillOpacity="0.9" />
    <line x1="16" y1="8" x2="16" y2="25" stroke="#16a34a" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
  </svg>
);

const QUICK_LINKS = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Solutions", to: "#" },
  { label: "Contact", to: "/contact" },
];

const SERVICES = [
  { label: "AI Crop Advisory", icon: "🌾" },
  { label: "Weather Forecast", icon: "🌦️" },
  { label: "Pest Detection", icon: "🔍" },
  { label: "Market Insights", icon: "📈" },
];

const SOCIALS = [
  { icon: <FacebookIcon />, label: "Facebook",  bg: "#1877f2" },
  { icon: <InstagramIcon />, label: "Instagram", bg: "linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)" },
  { icon: <TwitterIcon />,  label: "Twitter",   bg: "#000000" },
  { icon: <YoutubeIcon />,  label: "YouTube",   bg: "#ff0000" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  const handleSubscribe = () => {
    if (!email.includes("@")) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3500);
  };

  return (
    <footer
      style={{
        fontFamily: "'DM Sans', sans-serif",
        background: "linear-gradient(160deg, #0f3d1f 0%, #14532d 40%, #166534 100%)",
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        .footer-link { transition: color 0.2s ease, padding-left 0.2s ease; }
        .footer-link:hover { color: #86efac !important; padding-left: 6px !important; }
        .social-btn { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .social-btn:hover { transform: translateY(-3px) scale(1.1); box-shadow: 0 8px 20px rgba(0,0,0,0.3) !important; }
        .newsletter-input:focus { outline: none; border-color: #4ade80 !important; box-shadow: 0 0 0 3px rgba(74,222,128,0.15) !important; }
      `}</style>

      {/* Background decorative blobs */}
      <div style={{ position: "absolute", top: 0, right: 0, width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(74,222,128,0.06), transparent 70%)", transform: "translate(30%,-30%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 60, left: 0, width: 240, height: 240, borderRadius: "50%", background: "radial-gradient(circle, rgba(234,88,12,0.05), transparent 70%)", transform: "translate(-40%,30%)", pointerEvents: "none" }} />

      {/* ── NEWSLETTER BANNER ── */}
      <div
        style={{
          background: "linear-gradient(135deg, rgba(22,163,74,0.25), rgba(234,88,12,0.12))",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          padding: "32px 24px",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <span style={{ fontSize: 22 }}>📬</span>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: "white", margin: 0 }}>
                Stay Ahead of the Season
              </h3>
            </div>
            <p style={{ fontSize: 13.5, color: "rgba(187,247,208,0.8)", margin: 0 }}>
              Get weekly crop tips, weather alerts & mandi prices straight to your inbox.
            </p>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", minWidth: 300, flex: "1 1 300px", maxWidth: 480 }}>
            {subscribed ? (
              <div style={{
                flex: 1, display: "flex", alignItems: "center", gap: 8,
                padding: "12px 20px", borderRadius: 999,
                background: "rgba(74,222,128,0.15)", border: "1px solid rgba(74,222,128,0.3)",
                color: "#86efac", fontSize: 14, fontWeight: 600,
              }}>
                ✅ Subscribed! Welcome to Kisansathi 🌿
              </div>
            ) : (
              <>
                <input
                  className="newsletter-input"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleSubscribe()}
                  style={{
                    flex: 1,
                    padding: "12px 18px",
                    borderRadius: 999,
                    border: "1.5px solid rgba(255,255,255,0.15)",
                    background: "rgba(255,255,255,0.08)",
                    color: "white",
                    fontSize: 14,
                    fontFamily: "'DM Sans', sans-serif",
                    backdropFilter: "blur(8px)",
                    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                    minWidth: 180,
                  }}
                />
                <button
                  onClick={handleSubscribe}
                  style={{
                    padding: "12px 22px",
                    borderRadius: 999,
                    background: "linear-gradient(135deg, #ea580c, #fb923c)",
                    color: "white",
                    fontWeight: 700,
                    fontSize: 14,
                    border: "none",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    boxShadow: "0 4px 16px rgba(234,88,12,0.4)",
                    fontFamily: "'DM Sans', sans-serif",
                    transition: "transform 0.2s ease",
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                >
                  Subscribe →
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── MAIN FOOTER GRID ── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 24px 48px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "40px 48px",
        }}>

          {/* Col 1 — Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <LeafLogo />
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: "white" }}>
                Kisan<span style={{ color: "#86efac" }}>sathi</span>
              </span>
            </div>
            <p style={{ fontSize: 14, color: "rgba(187,247,208,0.72)", lineHeight: 1.75, marginBottom: 24, maxWidth: 260 }}>
              Empowering Indian farmers with AI-powered crop advisory, real-time weather intelligence, and smart market insights — from seed to sale.
            </p>

            {/* Social icons */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {SOCIALS.map(s => (
                <button
                  key={s.label}
                  className="social-btn"
                  title={s.label}
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "background 0.2s ease",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = s.bg}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
                >
                  {s.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#86efac", marginBottom: 20 }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {QUICK_LINKS.map(link => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="footer-link"
                    style={{
                      color: "rgba(220,252,231,0.8)",
                      textDecoration: "none",
                      fontSize: 14.5,
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <span style={{ color: "#4ade80", fontSize: 12 }}>›</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Services */}
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#86efac", marginBottom: 20 }}>
              Our Services
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {SERVICES.map(s => (
                <li key={s.label}>
                  <a
                    href="#"
                    className="footer-link"
                    style={{
                      color: "rgba(220,252,231,0.8)",
                      textDecoration: "none",
                      fontSize: 14.5,
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <span style={{ fontSize: 15 }}>{s.icon}</span>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#86efac", marginBottom: 20 }}>
              Contact Us
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                {
                  icon: "📍",
                  text: "Plot 42, Green Valley\nPune – 411001, Maharashtra",
                },
                {
                  icon: "📞",
                  text: "+91 98765 43210",
                  href: "tel:+919876543210",
                },
                {
                  icon: "✉️",
                  text: "support@kisansathi.in",
                  href: "mailto:support@kisansathi.in",
                },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: 10,
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 15, flexShrink: 0,
                  }}>
                    {item.icon}
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      style={{
                        color: "rgba(220,252,231,0.8)",
                        fontSize: 14,
                        lineHeight: 1.6,
                        textDecoration: "none",
                        transition: "color 0.2s ease",
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = "#86efac"}
                      onMouseLeave={e => e.currentTarget.style.color = "rgba(220,252,231,0.8)"}
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span style={{ color: "rgba(220,252,231,0.8)", fontSize: 14, lineHeight: 1.6, whiteSpace: "pre-line" }}>
                      {item.text}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── DIVIDER ── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12) 20%, rgba(134,239,172,0.2) 50%, rgba(255,255,255,0.12) 80%, transparent)",
        }} />
      </div>

      {/* ── COPYRIGHT BAR ── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "20px 24px" }}>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}>
          <p style={{ fontSize: 13, color: "rgba(187,247,208,0.55)", margin: 0 }}>
            © {new Date().getFullYear()} <strong style={{ color: "rgba(187,247,208,0.8)" }}>Kisansathi AgriTech Pvt. Ltd.</strong> All rights reserved.
          </p>
          <div style={{ display: "flex", gap: 20 }}>
            {["Privacy Policy", "Terms of Use", "Sitemap"].map(item => (
              <a
                key={item}
                href="#"
                style={{
                  fontSize: 13,
                  color: "rgba(187,247,208,0.5)",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={e => e.currentTarget.style.color = "#86efac"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(187,247,208,0.5)"}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}