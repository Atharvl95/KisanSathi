import Layout from "../../Components/Layout/Layout";
import { useState, useEffect, useRef } from "react";

const CONTACT_INFO = [
  {
    icon: "📍",
    title: "Our Address",
    lines: ["Kisansathi AgriTech Pvt. Ltd.", "Plot 42, Green Valley, Pune - 411001", "Maharashtra, India"],
    color: "#16a34a",
    bg: "#f0fdf4",
    border: "#bbf7d0",
  },
  {
    icon: "📞",
    title: "Phone Number",
    lines: ["+91 98765 43210", "+91 80001 22334"],
    color: "#ea580c",
    bg: "#fff7ed",
    border: "#fed7aa",
  },
  {
    icon: "✉️",
    title: "Email Address",
    lines: ["support@kisansathi.in", "info@kisansathi.in"],
    color: "#16a34a",
    bg: "#f0fdf4",
    border: "#bbf7d0",
  },
  {
    icon: "🕐",
    title: "Working Hours",
    lines: ["Mon – Sat: 9:00 AM – 6:00 PM", "Sunday: Closed"],
    color: "#ea580c",
    bg: "#fff7ed",
    border: "#fed7aa",
  },
];

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function InputField({ label, type = "text", placeholder, value, onChange, name }) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="flex flex-col gap-1.5">
      <label
        className="text-sm font-semibold"
        style={{ color: "#14532d" }}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          padding: "13px 18px",
          borderRadius: 14,
          border: focused ? "2px solid #16a34a" : "2px solid #e5e7eb",
          outline: "none",
          fontSize: 14,
          fontFamily: "'DM Sans', sans-serif",
          color: "#374151",
          background: focused ? "#fafffe" : "white",
          boxShadow: focused ? "0 0 0 4px rgba(22,163,74,0.08)" : "0 2px 8px rgba(0,0,0,0.04)",
          transition: "all 0.2s ease",
          width: "100%",
        }}
      />
    </div>
  );
}

function TextareaField({ label, placeholder, value, onChange, name }) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold" style={{ color: "#14532d" }}>{label}</label>
      <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={5}
        style={{
          padding: "13px 18px",
          borderRadius: 14,
          border: focused ? "2px solid #16a34a" : "2px solid #e5e7eb",
          outline: "none",
          fontSize: 14,
          fontFamily: "'DM Sans', sans-serif",
          color: "#374151",
          background: focused ? "#fafffe" : "white",
          boxShadow: focused ? "0 0 0 4px rgba(22,163,74,0.08)" : "0 2px 8px rgba(0,0,0,0.04)",
          transition: "all 0.2s ease",
          resize: "vertical",
          width: "100%",
        }}
      />
    </div>
  );
}

export default function ContactUs() {
  const [loaded, setLoaded] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formRef, formInView] = useInView();
  const [infoRef, infoInView] = useInView();
  const [mapRef, mapInView] = useInView();

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  useEffect(() => { setTimeout(() => setLoaded(true), 80); }, []);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1400);
  };

  return (
    <Layout>
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#fafffe", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        ::placeholder { color: #9ca3af; }
      `}</style>

      {/* ── BANNER ── */}
      <section className="relative w-full overflow-hidden" style={{ minHeight: 360 }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1600&q=80')" }}
        />
        <div className="absolute inset-0 bg-black/35" />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(105deg, rgba(20,83,45,0.96) 0%, rgba(22,163,74,0.82) 45%, rgba(22,163,74,0.18) 72%, transparent 100%)",
          }}
        />
        <div className="absolute top-0 left-0 w-72 h-72 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #86efac, transparent 70%)", transform: "translate(-30%,-30%)" }} />

        <div className="relative z-10 flex flex-col items-start justify-center px-8 md:px-20 py-20" style={{ minHeight: 360 }}>
          <div className="flex items-center gap-2 text-sm mb-5" style={{ color: "rgba(187,247,208,0.8)" }}>
            <span>Home</span><span>›</span>
            <span style={{ color: "#86efac", fontWeight: 600 }}>Contact Us</span>
          </div>

          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-5"
            style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", color: "#bbf7d0", backdropFilter: "blur(8px)" }}
          >
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            Get In Touch
          </div>

          <h1
            className="text-5xl md:text-7xl font-black text-white"
            style={{
              fontFamily: "'Playfair Display', serif",
              textShadow: "0 4px 24px rgba(0,0,0,0.3)",
              lineHeight: 1.1,
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.7s ease",
            }}
          >
            Contact{" "}
            <span style={{ WebkitTextStroke: "2px #4ade80", color: "transparent" }}>Us</span>
          </h1>
          <p
            className="mt-4 text-lg max-w-lg"
            style={{
              color: "rgba(220,252,231,0.85)",
              fontWeight: 300,
              opacity: loaded ? 1 : 0,
              transition: "all 0.7s ease 0.2s",
            }}
          >
            Have a question or need help? We're here for every farmer, every day.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0" style={{ height: 60, overflow: "hidden" }}>
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#fafffe" />
          </svg>
        </div>
      </section>

      {/* ── TWO COLUMN ── */}
      <section className="px-6 md:px-16 lg:px-24 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left: Contact Info Cards */}
          <div
            ref={infoRef}
            style={{
              opacity: infoInView ? 1 : 0,
              transform: infoInView ? "translateX(0)" : "translateX(-36px)",
              transition: "all 0.8s ease",
            }}
          >
            <div className="mb-8">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4"
                style={{ background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0" }}
              >
                <span className="w-2 h-2 rounded-full bg-orange-400" />
                Reach Us
              </div>
              <h2
                className="text-4xl font-black leading-tight"
                style={{ color: "#14532d", fontFamily: "'Playfair Display', serif" }}
              >
                We'd Love to <br />
                <span style={{ color: "#16a34a" }}>Hear From You</span>
              </h2>
              <p className="mt-3 text-gray-500 leading-relaxed text-sm max-w-sm">
                Whether you're a farmer, partner, or just curious — our team is always ready to help you grow.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {CONTACT_INFO.map((info, i) => (
                <div
                  key={info.title}
                  className="flex items-start gap-4 p-5 rounded-2xl transition-all duration-300"
                  style={{
                    background: "white",
                    border: `1.5px solid ${info.border}`,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                    opacity: infoInView ? 1 : 0,
                    transform: infoInView ? "translateY(0)" : "translateY(16px)",
                    transition: `all 0.6s ease ${i * 100 + 200}ms`,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 32px rgba(22,163,74,0.12)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.05)"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <div
                    className="text-2xl flex items-center justify-center rounded-2xl flex-shrink-0"
                    style={{ width: 52, height: 52, background: info.bg, fontSize: 22 }}
                  >
                    {info.icon}
                  </div>
                  <div>
                    <div className="font-bold text-sm mb-1.5" style={{ color: info.color }}>{info.title}</div>
                    {info.lines.map((line, j) => (
                      <div key={j} className="text-sm text-gray-600 leading-relaxed">{line}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div className="mt-8">
              <div className="text-sm font-semibold mb-4" style={{ color: "#14532d" }}>Follow Us</div>
              <div className="flex gap-3">
                {[
                  { label: "FB", color: "#1877f2", bg: "#eff6ff" },
                  { label: "TW", color: "#1da1f2", bg: "#f0f9ff" },
                  { label: "IG", color: "#e1306c", bg: "#fdf2f8" },
                  { label: "YT", color: "#ff0000", bg: "#fff5f5" },
                ].map(s => (
                  <button
                    key={s.label}
                    className="w-10 h-10 rounded-full text-xs font-bold transition-all duration-200 hover:scale-110 active:scale-95"
                    style={{ background: s.bg, color: s.color, border: "none", cursor: "pointer" }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div
            ref={formRef}
            className="rounded-3xl p-8 md:p-10"
            style={{
              background: "white",
              boxShadow: "0 16px 64px rgba(22,163,74,0.10), 0 4px 16px rgba(0,0,0,0.06)",
              border: "1px solid rgba(22,163,74,0.08)",
              opacity: formInView ? 1 : 0,
              transform: formInView ? "translateX(0)" : "translateX(36px)",
              transition: "all 0.8s ease 0.1s",
            }}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center py-12 gap-4">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
                  style={{ background: "#f0fdf4", border: "3px solid #86efac" }}
                >
                  ✅
                </div>
                <h3
                  className="text-2xl font-black"
                  style={{ color: "#14532d", fontFamily: "'Playfair Display', serif" }}
                >
                  Message Sent!
                </h3>
                <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
                  Thank you for reaching out. Our team will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                  className="mt-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105"
                  style={{ background: "#f0fdf4", color: "#16a34a", border: "1.5px solid #bbf7d0", cursor: "pointer" }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h3
                    className="text-2xl font-black mb-1"
                    style={{ color: "#14532d", fontFamily: "'Playfair Display', serif" }}
                  >
                    Send a Message
                  </h3>
                  <p className="text-sm text-gray-400">Fill in the form below and we'll respond promptly.</p>
                </div>

                <div className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <InputField label="Your Name *" name="name" placeholder="Rajesh Kumar" value={form.name} onChange={handleChange} />
                    <InputField label="Email Address *" type="email" name="email" placeholder="you@example.com" value={form.email} onChange={handleChange} />
                  </div>
                  <InputField label="Subject" name="subject" placeholder="How can we help?" value={form.subject} onChange={handleChange} />
                  <TextareaField label="Your Message *" name="message" placeholder="Tell us about your query, farm, or feedback..." value={form.message} onChange={handleChange} />

                  {/* Submit */}
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-bold text-white text-base transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      background: loading
                        ? "#fdba74"
                        : "linear-gradient(135deg, #ea580c 0%, #f97316 50%, #fb923c 100%)",
                      border: "none",
                      cursor: loading ? "not-allowed" : "pointer",
                      boxShadow: "0 8px 32px rgba(234,88,12,0.35)",
                      letterSpacing: "0.01em",
                    }}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                      </>
                    )}
                  </button>

                  <p className="text-xs text-center text-gray-400">
                    🔒 Your information is safe and will never be shared.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── MAP SECTION ── */}
      <section
        ref={mapRef}
        className="px-6 md:px-16 lg:px-24 pb-20"
        style={{
          opacity: mapInView ? 1 : 0,
          transform: mapInView ? "translateY(0)" : "translateY(32px)",
          transition: "all 0.8s ease",
        }}
      >
        <div className="text-center mb-10">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4"
            style={{ background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0" }}
          >
            <span className="w-2 h-2 rounded-full bg-orange-400" />
            Find Us
          </div>
          <h2
            className="text-4xl font-black"
            style={{ color: "#14532d", fontFamily: "'Playfair Display', serif" }}
          >
            Our Location
          </h2>
          <p className="mt-2 text-gray-500 text-sm">Plot 42, Green Valley, Pune – 411001, Maharashtra, India</p>
        </div>

        <div
          className="relative overflow-hidden rounded-3xl"
          style={{
            boxShadow: "0 16px 64px rgba(22,163,74,0.12), 0 4px 16px rgba(0,0,0,0.06)",
            border: "1px solid rgba(22,163,74,0.1)",
            height: 420,
          }}
        >
          {/* Green top accent bar */}
          <div className="absolute top-0 left-0 right-0 z-10 h-1"
            style={{ background: "linear-gradient(90deg, #16a34a, #4ade80, #ea580c)" }} />

          <iframe
            title="Kisansathi Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.7641773694044!2d73.85674431489698!3d18.52043738739598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c07f4e5c3a0d%3A0xa50c3e9c4e7f7b8e!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0, display: "block" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          {/* Floating info card over map */}
          <div
            className="absolute bottom-6 left-6 flex items-center gap-4 px-5 py-4 rounded-2xl z-10"
            style={{
              background: "white",
              boxShadow: "0 8px 32px rgba(0,0,0,0.14)",
              maxWidth: 280,
            }}
          >
            <div
              className="text-2xl flex items-center justify-center rounded-xl flex-shrink-0"
              style={{ width: 48, height: 48, background: "#f0fdf4" }}
            >
              📍
            </div>
            <div>
              <div className="font-bold text-sm" style={{ color: "#14532d" }}>Kisansathi HQ</div>
              <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">Green Valley, Pune<br />Maharashtra – 411001</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="px-6 md:px-16 lg:px-24 pb-20">
        <div
          className="relative overflow-hidden rounded-3xl px-10 md:px-16 py-14 flex flex-col md:flex-row items-center justify-between gap-8"
          style={{
            background: "linear-gradient(135deg, #14532d 0%, #166534 40%, #16a34a 100%)",
            boxShadow: "0 24px 64px rgba(22,101,52,0.28)",
          }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #86efac, transparent)", transform: "translate(30%,-30%)" }} />
          <div className="absolute bottom-0 left-20 w-40 h-40 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #4ade80, transparent)", transform: "translateY(40%)" }} />

          <div className="relative z-10 text-center md:text-left">
            <h3
              className="text-3xl md:text-4xl font-black text-white mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Still have questions?
            </h3>
            <p style={{ color: "rgba(187,247,208,0.85)", fontSize: 15 }}>
              Call us directly or visit our Pune office — we're always happy to help.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap gap-3 justify-center">
            <a
              href="tel:+919876543210"
              className="px-7 py-3.5 rounded-full font-bold text-sm transition-all duration-200 hover:scale-105 active:scale-95 no-underline"
              style={{
                background: "linear-gradient(135deg, #ea580c, #fb923c)",
                color: "white",
                boxShadow: "0 4px 16px rgba(234,88,12,0.4)",
              }}
            >
              📞 Call Now
            </a>
            <a
              href="mailto:support@kisansathi.in"
              className="px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-200 hover:bg-white/20 no-underline"
              style={{
                background: "rgba(255,255,255,0.1)",
                color: "white",
                border: "1.5px solid rgba(255,255,255,0.3)",
                backdropFilter: "blur(8px)",
              }}
            >
              ✉️ Email Us
            </a>
          </div>
        </div>
      </section>
    </div>
    </Layout> 
  );
}