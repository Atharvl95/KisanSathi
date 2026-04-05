import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";

const EyeIcon = ({ open }) => open ? (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
) : (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

const LeafLogo = () => (
  <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="16" fill="#16a34a"/>
    <path d="M16 24C16 24 8 18 8 12C8 8.68629 10.6863 6 14 6C15.1046 6 16 6.89543 16 8V24Z" fill="#86efac"/>
    <path d="M16 24C16 24 24 18 24 12C24 8.68629 21.3137 6 18 6C16.8954 6 16 6.89543 16 8V24Z" fill="white" fillOpacity="0.9"/>
    <line x1="16" y1="8" x2="16" y2="25" stroke="#16a34a" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

function InputField({ label, type = "text", placeholder, value, onChange, name, rightElement }) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold" style={{ color: "#14532d" }}>{label}</label>
      <div className="relative">
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: "100%",
            padding: rightElement ? "13px 48px 13px 18px" : "13px 18px",
            borderRadius: 14,
            border: focused ? "2px solid #16a34a" : "2px solid #e5e7eb",
            outline: "none",
            fontSize: 14,
            fontFamily: "'DM Sans', sans-serif",
            color: "#374151",
            background: focused ? "#fafffe" : "white",
            boxShadow: focused ? "0 0 0 4px rgba(22,163,74,0.08)" : "0 2px 8px rgba(0,0,0,0.04)",
            transition: "all 0.2s ease",
          }}
        />
        {rightElement && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Role Selector Component ──
function RoleSelector({ role, setRole }) {
  const roles = [
    { id: "farmer", label: "Farmer", icon: "🌾", desc: "I grow crops & need guidance" },
    { id: "expert", label: "Expert", icon: "🧑‍🔬", desc: "I advise & support farmers" },
  ];
  return (
    <div className="mb-6">
      <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#6b7280" }}>
        I am a
      </p>
      <div className="grid grid-cols-2 gap-3">
        {roles.map(r => (
          <button
            key={r.id}
            onClick={() => setRole(r.id)}
            style={{
              border: role === r.id ? "2px solid #16a34a" : "2px solid #e5e7eb",
              borderRadius: 16,
              padding: "12px 10px",
              background: role === r.id ? "#f0fdf4" : "white",
              cursor: "pointer",
              textAlign: "left",
              transition: "all 0.2s ease",
              boxShadow: role === r.id ? "0 0 0 4px rgba(22,163,74,0.08)" : "0 2px 8px rgba(0,0,0,0.04)",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span style={{ fontSize: 20 }}>{r.icon}</span>
              <span
                className="text-sm font-bold"
                style={{ color: role === r.id ? "#14532d" : "#374151" }}
              >
                {r.label}
              </span>
              {role === r.id && (
                <span
                  className="ml-auto flex items-center justify-center w-4 h-4 rounded-full"
                  style={{ background: "#16a34a" }}
                >
                  <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                    <polyline points="2,6 5,9 10,3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              )}
            </div>
            <p className="text-xs" style={{ color: "#9ca3af", lineHeight: 1.4 }}>{r.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function AuthPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("login");
  const [role, setRole] = useState("farmer"); // 🔑 shared role state
  const [loaded, setLoaded] = useState(false);
  const [showLoginPass, setShowLoginPass] = useState(false);
  const [showSignupPass, setShowSignupPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const [login, setLogin] = useState({ email: "", password: "" });
  const [signup, setSignup] = useState({ name: "", email: "", password: "", confirm: "" });

  useEffect(() => { setTimeout(() => setLoaded(true), 80); }, []);

  const handleLoginChange = e => setLogin(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSignupChange = e => setSignup(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleLogin = () => {
    if (!login.email || !login.password) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setLoginSuccess(true);
      // After showing brief success state, redirect to correct dashboard
      setTimeout(() => {
        navigate(role === "farmer" ? "/farmerdashboard" : "/expertdashboard");
      }, 900);
    }, 1400);
  };

  const handleSignup = () => {
    if (!signup.name || !signup.email || !signup.password || !signup.confirm) return;
    if (signup.password !== signup.confirm) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSignupSuccess(true);
      // After showing brief success state, redirect to correct dashboard
      setTimeout(() => {
        navigate(role === "farmer" ? "/farmerdashboard" : "/expertdashboard");
      }, 900);
    }, 1400);
  };

  const FEATURES = [
    { icon: "🌾", text: "AI-powered crop recommendations" },
    { icon: "🌦️", text: "Real-time weather alerts" },
    { icon: "🔍", text: "Instant pest & disease detection" },
    { icon: "🧪", text: "Smart fertilizer optimization" },
  ];

  return (
    <Layout>
      <div style={{ fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", display: "flex" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');
          * { box-sizing: border-box; }
          ::placeholder { color: #9ca3af; }
          .tab-slide { transition: all 0.35s cubic-bezier(0.4,0,0.2,1); }
          .form-enter { animation: formIn 0.4s cubic-bezier(0.4,0,0.2,1); }
          @keyframes formIn {
            from { opacity: 0; transform: translateY(12px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .spin { animation: spin 1s linear infinite; }
          @keyframes spin { to { transform: rotate(360deg); } }
          .float { animation: float 6s ease-in-out infinite; }
          @keyframes float {
            0%,100% { transform: translateY(0); }
            50%      { transform: translateY(-10px); }
          }
        `}</style>

        {/* ── LEFT PANEL ── */}
        <div
          className="hidden lg:flex flex-col justify-between relative overflow-hidden"
          style={{
            width: "48%",
            minHeight: "100vh",
            background: "#14532d",
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.6s ease",
          }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&q=80')", opacity: 0.35 }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(160deg, rgba(20,83,45,0.97) 0%, rgba(22,163,74,0.88) 60%, rgba(22,163,74,0.5) 100%)" }}
          />
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #86efac, transparent)", transform: "translate(30%,-30%)" }}/>
          <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #4ade80, transparent)", transform: "translate(-30%,30%)" }}/>

          <div className="relative z-10 flex flex-col justify-between h-full px-12 py-12">
            <div className="flex items-center gap-3">
              <LeafLogo />
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: "white" }}>
                Kisan<span style={{ color: "#86efac" }}>sathi</span>
              </span>
            </div>

            <div>
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
                style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", color: "#bbf7d0", backdropFilter: "blur(8px)" }}
              >
                <span className="w-2 h-2 rounded-full bg-orange-400" style={{ animation: "pulse 2s infinite" }}/>
                Trusted by 500+ Farmers
              </div>

              <h1
                className="text-5xl font-black text-white mb-5 leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Welcome to <br />
                <span style={{ WebkitTextStroke: "2px #4ade80", color: "transparent" }}>Kisansathi</span>
              </h1>

              <p className="text-base leading-relaxed mb-10 max-w-sm" style={{ color: "rgba(220,252,231,0.82)", fontWeight: 300 }}>
                India's smartest agriculture platform — helping farmers grow more, spend less, and farm smarter with AI-powered tools.
              </p>

              <div className="flex flex-col gap-3">
                {FEATURES.map((f, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-4 py-3 rounded-2xl"
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      backdropFilter: "blur(6px)",
                      opacity: loaded ? 1 : 0,
                      transform: loaded ? "translateX(0)" : "translateX(-20px)",
                      transition: `all 0.6s ease ${0.2 + i * 0.1}s`,
                    }}
                  >
                    <span className="text-xl">{f.icon}</span>
                    <span className="text-sm font-medium" style={{ color: "rgba(220,252,231,0.9)" }}>{f.text}</span>
                    <span className="ml-auto text-green-400">✓</span>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="float flex items-center gap-4 px-5 py-4 rounded-2xl"
              style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.18)", backdropFilter: "blur(12px)", maxWidth: 320 }}
            >
              <div className="text-3xl">🌱</div>
              <div>
                <div className="text-sm font-bold text-white">Start Growing Smarter Today</div>
                <div className="text-xs mt-0.5" style={{ color: "rgba(187,247,208,0.75)" }}>Free access to AI crop tools for new members</div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-1"
            style={{ background: "linear-gradient(90deg, #16a34a, #4ade80, #ea580c)" }}/>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div
          className="flex flex-col items-center justify-center flex-1 px-6 py-12"
          style={{
            background: "#fafffe",
            minHeight: "100vh",
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.6s ease 0.1s",
          }}
        >
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2 mb-8">
            <LeafLogo />
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "#14532d" }}>
              Kisan<span style={{ color: "#16a34a" }}>sathi</span>
            </span>
          </div>

          <div
            className="w-full"
            style={{
              maxWidth: 440,
              background: "white",
              borderRadius: 28,
              boxShadow: "0 20px 60px rgba(22,163,74,0.10), 0 4px 16px rgba(0,0,0,0.06)",
              border: "1px solid rgba(22,163,74,0.08)",
              overflow: "hidden",
            }}
          >
            {/* Green top accent */}
            <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #16a34a, #4ade80, #ea580c)" }}/>

            <div className="p-8 md:p-10">

              {/* ── ROLE SELECTOR (always visible, above tabs) ── */}
              <RoleSelector role={role} setRole={setRole} />

              {/* Divider */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 h-px" style={{ background: "#e5e7eb" }} />
                <span className="text-xs font-semibold" style={{ color: "#9ca3af" }}>
                  {role === "farmer" ? "🌾 Farmer Portal" : "🧑‍🔬 Expert Portal"}
                </span>
                <div className="flex-1 h-px" style={{ background: "#e5e7eb" }} />
              </div>

              {/* Tab switcher */}
              <div
                className="flex items-center p-1 rounded-2xl mb-8 relative"
                style={{ background: "#f0fdf4", border: "1px solid #dcfce7" }}
              >
                <div
                  className="tab-slide absolute top-1 bottom-1 rounded-xl"
                  style={{
                    width: "calc(50% - 4px)",
                    background: "white",
                    boxShadow: "0 2px 8px rgba(22,163,74,0.15)",
                    left: tab === "login" ? 4 : "calc(50%)",
                  }}
                />
                {["login", "signup"].map(t => (
                  <button
                    key={t}
                    onClick={() => { setTab(t); setLoginSuccess(false); setSignupSuccess(false); }}
                    className="flex-1 py-2.5 text-sm font-semibold rounded-xl relative z-10 transition-colors duration-300"
                    style={{
                      color: tab === t ? "#14532d" : "#6b7280",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {t === "login" ? "Login" : "Sign Up"}
                  </button>
                ))}
              </div>

              {/* ── LOGIN FORM ── */}
              {tab === "login" && (
                <div className="form-enter">
                  {loginSuccess ? (
                    <div className="flex flex-col items-center text-center py-8 gap-4">
                      <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
                        style={{ background: "#f0fdf4", border: "3px solid #86efac" }}>
                        {role === "farmer" ? "🎉" : "👨‍🔬"}
                      </div>
                      <h3 className="text-2xl font-black" style={{ color: "#14532d", fontFamily: "'Playfair Display', serif" }}>
                        Welcome Back, {role === "farmer" ? "Farmer" : "Expert"}!
                      </h3>
                      <p className="text-gray-500 text-sm max-w-xs">
                        You've logged in successfully as a <strong>{role}</strong>. Redirecting to your dashboard...
                      </p>
                      <div className="w-8 h-8 rounded-full border-4 border-green-200 border-t-green-600 spin mt-2"/>
                    </div>
                  ) : (
                    <>
                      <div className="mb-7">
                        <h2 className="text-2xl font-black" style={{ color: "#14532d", fontFamily: "'Playfair Display', serif" }}>
                          {role === "farmer" ? "🌾 Farmer Login" : "🧑‍🔬 Expert Login"}
                        </h2>
                        <p className="text-sm text-gray-400 mt-1">Enter your credentials to continue</p>
                      </div>

                      <div className="flex flex-col gap-4">
                        <InputField
                          label="Email Address"
                          type="email"
                          name="email"
                          placeholder="you@example.com"
                          value={login.email}
                          onChange={handleLoginChange}
                        />
                        <InputField
                          label="Password"
                          type={showLoginPass ? "text" : "password"}
                          name="password"
                          placeholder="Enter your password"
                          value={login.password}
                          onChange={handleLoginChange}
                          rightElement={
                            <button
                              onClick={() => setShowLoginPass(v => !v)}
                              style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", padding: 0, display: "flex" }}
                            >
                              <EyeIcon open={showLoginPass} />
                            </button>
                          }
                        />

                        <div className="flex items-center justify-between">
                          <label className="flex items-center gap-2 cursor-pointer select-none">
                            <div
                              onClick={() => setRemember(v => !v)}
                              className="w-5 h-5 rounded-md flex items-center justify-center transition-all duration-200"
                              style={{
                                background: remember ? "#16a34a" : "white",
                                border: remember ? "2px solid #16a34a" : "2px solid #d1d5db",
                                cursor: "pointer",
                              }}
                            >
                              {remember && <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><polyline points="2,6 5,9 10,3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                            </div>
                            <span className="text-sm text-gray-500">Remember me</span>
                          </label>
                          <button
                            className="text-sm font-semibold transition-colors hover:underline"
                            style={{ color: "#16a34a", background: "none", border: "none", cursor: "pointer" }}
                          >
                            Forgot Password?
                          </button>
                        </div>

                        <button
                          onClick={handleLogin}
                          disabled={loading}
                          className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-bold text-white text-base transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] mt-1"
                          style={{
                            background: loading ? "#fdba74" : "linear-gradient(135deg, #ea580c 0%, #f97316 60%, #fb923c 100%)",
                            border: "none",
                            cursor: loading ? "not-allowed" : "pointer",
                            boxShadow: "0 8px 28px rgba(234,88,12,0.32)",
                          }}
                        >
                          {loading
                            ? <><div className="w-5 h-5 rounded-full border-2 border-white/40 border-t-white spin"/> Logging in...</>
                            : <>Login as {role === "farmer" ? "Farmer" : "Expert"} <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></>
                          }
                        </button>

                        <p className="text-center text-sm text-gray-400">
                          Don't have an account?{" "}
                          <button
                            onClick={() => setTab("signup")}
                            className="font-semibold hover:underline"
                            style={{ color: "#16a34a", background: "none", border: "none", cursor: "pointer" }}
                          >
                            Sign up free
                          </button>
                        </p>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* ── SIGNUP FORM ── */}
              {tab === "signup" && (
                <div className="form-enter">
                  {signupSuccess ? (
                    <div className="flex flex-col items-center text-center py-8 gap-4">
                      <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
                        style={{ background: "#f0fdf4", border: "3px solid #86efac" }}>
                        {role === "farmer" ? "🌱" : "🧑‍🔬"}
                      </div>
                      <h3 className="text-2xl font-black" style={{ color: "#14532d", fontFamily: "'Playfair Display', serif" }}>
                        {role === "farmer" ? "Welcome, Farmer!" : "Welcome, Expert!"}
                      </h3>
                      <p className="text-gray-500 text-sm max-w-xs">
                        Your <strong>{role}</strong> account is ready. Setting up your dashboard...
                      </p>
                      <div className="w-8 h-8 rounded-full border-4 border-green-200 border-t-green-600 spin mt-2"/>
                    </div>
                  ) : (
                    <>
                      <div className="mb-7">
                        <h2 className="text-2xl font-black" style={{ color: "#14532d", fontFamily: "'Playfair Display', serif" }}>
                          {role === "farmer" ? "🌾 Farmer Sign Up" : "🧑‍🔬 Expert Sign Up"}
                        </h2>
                        <p className="text-sm text-gray-400 mt-1">
                          {role === "farmer" ? "Join 500+ farmers growing smarter" : "Join our network of agricultural experts"}
                        </p>
                      </div>

                      <div className="flex flex-col gap-4">
                        <InputField
                          label="Full Name"
                          name="name"
                          placeholder={role === "farmer" ? "Rajesh Kumar" : "Dr. Priya Sharma"}
                          value={signup.name}
                          onChange={handleSignupChange}
                        />
                        <InputField
                          label="Email Address"
                          type="email"
                          name="email"
                          placeholder="you@example.com"
                          value={signup.email}
                          onChange={handleSignupChange}
                        />

                        {/* Extra field for experts */}
                        {role === "expert" && (
                          <InputField
                            label="Specialization"
                            name="specialization"
                            placeholder="e.g. Soil Science, Pest Management"
                            value={signup.specialization || ""}
                            onChange={handleSignupChange}
                          />
                        )}

                        <InputField
                          label="Password"
                          type={showSignupPass ? "text" : "password"}
                          name="password"
                          placeholder="Create a strong password"
                          value={signup.password}
                          onChange={handleSignupChange}
                          rightElement={
                            <button onClick={() => setShowSignupPass(v => !v)}
                              style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", padding: 0, display: "flex" }}>
                              <EyeIcon open={showSignupPass} />
                            </button>
                          }
                        />
                        <InputField
                          label="Confirm Password"
                          type={showConfirmPass ? "text" : "password"}
                          name="confirm"
                          placeholder="Repeat your password"
                          value={signup.confirm}
                          onChange={handleSignupChange}
                          rightElement={
                            <button onClick={() => setShowConfirmPass(v => !v)}
                              style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", padding: 0, display: "flex" }}>
                              <EyeIcon open={showConfirmPass} />
                            </button>
                          }
                        />

                        {signup.confirm && (
                          <div
                            className="flex items-center gap-2 text-xs font-medium px-3 py-2 rounded-xl"
                            style={{
                              background: signup.password === signup.confirm ? "#f0fdf4" : "#fff5f5",
                              color: signup.password === signup.confirm ? "#16a34a" : "#ef4444",
                              border: `1px solid ${signup.password === signup.confirm ? "#bbf7d0" : "#fecaca"}`,
                            }}
                          >
                            {signup.password === signup.confirm ? "✓ Passwords match" : "✗ Passwords do not match"}
                          </div>
                        )}

                        <button
                          onClick={handleSignup}
                          disabled={loading}
                          className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-bold text-white text-base transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] mt-1"
                          style={{
                            background: loading ? "#fdba74" : "linear-gradient(135deg, #ea580c 0%, #f97316 60%, #fb923c 100%)",
                            border: "none",
                            cursor: loading ? "not-allowed" : "pointer",
                            boxShadow: "0 8px 28px rgba(234,88,12,0.32)",
                          }}
                        >
                          {loading
                            ? <><div className="w-5 h-5 rounded-full border-2 border-white/40 border-t-white spin"/> Creating account...</>
                            : <>Create {role === "farmer" ? "Farmer" : "Expert"} Account <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></>
                          }
                        </button>

                        <p className="text-center text-sm text-gray-400">
                          Already have an account?{" "}
                          <button
                            onClick={() => setTab("login")}
                            className="font-semibold hover:underline"
                            style={{ color: "#16a34a", background: "none", border: "none", cursor: "pointer" }}
                          >
                            Login here
                          </button>
                        </p>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          <p className="text-xs text-gray-400 mt-6 text-center">
            🔒 Your data is secure and never shared. &nbsp;
            <span style={{ color: "#16a34a", cursor: "pointer" }}>Privacy Policy</span> ·{" "}
            <span style={{ color: "#16a34a", cursor: "pointer" }}>Terms of Use</span>
          </p>
        </div>
      </div>
    </Layout>
  );
}