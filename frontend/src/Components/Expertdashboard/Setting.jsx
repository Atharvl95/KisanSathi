import { useState, useRef } from "react";
import {
  User, Mail, Phone, Camera, Award, Briefcase, MapPin,
  ToggleLeft, ToggleRight, Bell, BellOff, Lock, LogOut,
  Globe, Sliders, TrendingUp, Star, CheckCircle, ChevronRight,
  Save, Eye, EyeOff, Shield, Zap, Clock, Leaf, AlertCircle,
  BarChart2, RefreshCw, X, Plus, Check
} from "lucide-react";
import { ExpertPageHeader } from "../../Pages/Expertdash/Expertdash";

/* ─────────────────────────────────────────
   STYLES
───────────────────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');

  .st-root { font-family: 'DM Sans', sans-serif; background: #f0f7ff; min-height: 100vh; }
  .st-body { padding: 24px; display: grid; grid-template-columns: 240px 1fr; gap: 20px; align-items: start; }
  @media (max-width: 860px) { .st-body { grid-template-columns: 1fr; } }

  /* ── Sidebar nav ── */
  .st-sidebar {
    background: #fff; border-radius: 16px; border: 1px solid #ebf8ff;
    overflow: hidden; position: sticky; top: 20px;
  }
  .st-sidebar-profile {
    padding: 20px; border-bottom: 1px solid #f0f7ff; text-align: center;
  }
  .st-avatar-wrap {
    width: 72px; height: 72px; border-radius: 50%; margin: 0 auto 10px;
    background: linear-gradient(135deg, #ebf8ff, #bee3f8);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.8rem; font-weight: 700; color: #3182ce;
    position: relative; cursor: pointer; border: 3px solid #ebf8ff;
    transition: border-color .2s;
  }
  .st-avatar-wrap:hover { border-color: #3182ce; }
  .st-avatar-cam {
    position: absolute; bottom: 0; right: 0;
    width: 22px; height: 22px; border-radius: 50%;
    background: #3182ce; display: flex; align-items: center; justify-content: center;
    border: 2px solid #fff;
  }
  .st-sidebar-name { font-family: 'Playfair Display', serif; font-size: .95rem; font-weight: 700; color: #1a365d; }
  .st-sidebar-spec { font-size: .75rem; color: #6b7280; margin-top: 2px; }
  .st-avail-pill {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 3px 12px; border-radius: 20px; font-size: .7rem; font-weight: 700;
    margin-top: 8px;
  }
  .st-avail-dot { width: 7px; height: 7px; border-radius: 50%; }

  .st-nav { padding: 8px 0; }
  .st-nav-item {
    display: flex; align-items: center; gap: 10px;
    padding: 11px 18px; cursor: pointer; font-size: .84rem; font-weight: 500;
    color: #6b7280; transition: all .15s; border-left: 3px solid transparent;
  }
  .st-nav-item:hover { background: #f0f7ff; color: #1a365d; }
  .st-nav-item.active {
    background: #ebf8ff; color: #1a365d; font-weight: 700;
    border-left-color: #3182ce;
  }
  .st-nav-icon { flex-shrink: 0; }

  /* ── Main content ── */
  .st-main { display: flex; flex-direction: column; gap: 20px; }

  /* ── Section card ── */
  .st-card { background: #fff; border-radius: 16px; border: 1px solid #ebf8ff; overflow: hidden; }
  .st-card-header {
    padding: 16px 22px; border-bottom: 1px solid #f0f7ff;
    display: flex; align-items: center; gap: 10px;
  }
  .st-card-icon {
    width: 36px; height: 36px; border-radius: 10px;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .st-card-title { font-family: 'Playfair Display', serif; font-size: .98rem; font-weight: 700; color: #1a365d; flex: 1; }
  .st-card-body { padding: 22px; }

  /* ── Form fields ── */
  .st-form-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
  }
  @media (max-width: 600px) { .st-form-grid { grid-template-columns: 1fr; } }
  .st-form-full { grid-column: 1 / -1; }

  .st-field { display: flex; flex-direction: column; gap: 6px; }
  .st-field label {
    font-size: .72rem; font-weight: 700; color: #9ca3af;
    text-transform: uppercase; letter-spacing: .05em;
  }
  .st-input {
    padding: 10px 14px; border-radius: 10px;
    border: 1.5px solid #ebf8ff; background: #f8fbff;
    font-family: 'DM Sans', sans-serif; font-size: .85rem; color: #1a365d;
    outline: none; transition: border-color .18s; width: 100%; box-sizing: border-box;
  }
  .st-input:focus { border-color: #3182ce; background: #fff; }
  .st-input::placeholder { color: #b0c4d8; }

  .st-input-wrap { position: relative; }
  .st-input-wrap .st-input { padding-left: 38px; }
  .st-input-icon {
    position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #9ca3af;
  }
  .st-input-right {
    position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
    cursor: pointer; color: #9ca3af; background: none; border: none; padding: 0;
    display: flex; align-items: center;
  }
  .st-input-right:hover { color: #3182ce; }

  .st-textarea {
    padding: 10px 14px; border-radius: 10px;
    border: 1.5px solid #ebf8ff; background: #f8fbff;
    font-family: 'DM Sans', sans-serif; font-size: .85rem; color: #1a365d;
    outline: none; resize: vertical; min-height: 80px;
    transition: border-color .18s; width: 100%; box-sizing: border-box;
  }
  .st-textarea:focus { border-color: #3182ce; background: #fff; }
  .st-textarea::placeholder { color: #b0c4d8; }

  .st-select {
    padding: 10px 14px; border-radius: 10px;
    border: 1.5px solid #ebf8ff; background: #f8fbff;
    font-family: 'DM Sans', sans-serif; font-size: .85rem; color: #1a365d;
    outline: none; cursor: pointer; width: 100%;
    transition: border-color .18s;
  }
  .st-select:focus { border-color: #3182ce; }

  /* ── Tag chips ── */
  .st-tags { display: flex; flex-wrap: wrap; gap: 8px; }
  .st-tag {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 5px 12px; border-radius: 20px; font-size: .78rem; font-weight: 600;
    cursor: pointer; transition: all .15s; border: 1.5px solid;
  }
  .st-tag.on  { background: #ebf8ff; border-color: #3182ce; color: #1a365d; }
  .st-tag.off { background: #f9fafb; border-color: #e5e7eb; color: #9ca3af; }
  .st-tag:hover { border-color: #3182ce; color: #1a365d; background: #ebf8ff; }

  /* ── Availability cards ── */
  .st-avail-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
  @media (max-width: 500px) { .st-avail-grid { grid-template-columns: 1fr; } }
  .st-avail-card {
    border-radius: 12px; border: 2px solid #ebf8ff; padding: 14px 12px;
    text-align: center; cursor: pointer; transition: all .18s;
    display: flex; flex-direction: column; align-items: center; gap: 6px;
  }
  .st-avail-card:hover { border-color: #3182ce; background: #f0f7ff; }
  .st-avail-card.selected { border-color: currentColor; }
  .st-avail-label { font-size: .82rem; font-weight: 700; }
  .st-avail-sub   { font-size: .7rem; color: #9ca3af; }

  /* ── Toggle row ── */
  .st-toggle-row {
    display: flex; align-items: center; justify-content: space-between;
    padding: 13px 0; border-bottom: 1px solid #f0f7ff;
  }
  .st-toggle-row:last-child { border-bottom: none; }
  .st-toggle-label { font-size: .85rem; font-weight: 600; color: #374151; }
  .st-toggle-sub   { font-size: .75rem; color: #9ca3af; margin-top: 2px; }
  .st-toggle-btn {
    background: none; border: none; cursor: pointer; padding: 0;
    display: flex; align-items: center; transition: opacity .15s;
    flex-shrink: 0;
  }
  .st-toggle-btn:hover { opacity: .75; }

  /* ── Slider ── */
  .st-slider-wrap { display: flex; align-items: center; gap: 14px; }
  .st-slider {
    flex: 1; -webkit-appearance: none; appearance: none;
    height: 5px; border-radius: 10px; background: #ebf8ff; outline: none; cursor: pointer;
  }
  .st-slider::-webkit-slider-thumb {
    -webkit-appearance: none; appearance: none;
    width: 18px; height: 18px; border-radius: 50%;
    background: linear-gradient(135deg, #1a365d, #3182ce);
    cursor: pointer; border: 2px solid #fff;
    box-shadow: 0 2px 8px rgba(49,130,206,.3);
  }
  .st-slider-val {
    font-family: 'Playfair Display', serif; font-size: 1.1rem;
    font-weight: 700; color: #1a365d; min-width: 36px; text-align: right;
  }

  /* ── Performance mini-cards ── */
  .st-perf-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;
  }
  @media (max-width: 500px) { .st-perf-grid { grid-template-columns: 1fr; } }
  .st-perf-card {
    background: #f0f7ff; border-radius: 12px; padding: 14px;
    text-align: center; border: 1px solid #ebf8ff;
  }
  .st-perf-val { font-family: 'Playfair Display', serif; font-size: 1.6rem; font-weight: 700; color: #1a365d; }
  .st-perf-label { font-size: .72rem; color: #6b7280; margin-top: 2px; font-weight: 500; }
  .st-perf-bar { height: 4px; background: #ebf8ff; border-radius: 10px; margin-top: 8px; overflow: hidden; }
  .st-perf-fill { height: 100%; border-radius: 10px; background: linear-gradient(90deg, #3182ce, #63b3ed); }

  /* ── Security buttons ── */
  .st-sec-row {
    display: flex; align-items: center; justify-content: space-between;
    padding: 13px 0; border-bottom: 1px solid #f0f7ff;
  }
  .st-sec-row:last-child { border-bottom: none; }

  /* ── Buttons ── */
  .st-btn {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 10px 20px; border-radius: 10px;
    font-family: 'DM Sans', sans-serif; font-size: .84rem; font-weight: 700;
    cursor: pointer; border: none; transition: all .18s;
  }
  .st-btn-primary { background: linear-gradient(135deg, #1a365d, #3182ce); color: #fff; }
  .st-btn-primary:hover { box-shadow: 0 6px 20px rgba(49,130,206,.3); transform: translateY(-1px); }
  .st-btn-outline { background: #fff; color: #374151; border: 1.5px solid #ebf8ff; }
  .st-btn-outline:hover { background: #f0f7ff; border-color: #3182ce; color: #1a365d; }
  .st-btn-danger { background: #fff; color: #dc2626; border: 1.5px solid #fecaca; }
  .st-btn-danger:hover { background: #fef2f2; }
  .st-btn-sm { padding: 7px 14px; font-size: .78rem; }

  /* ── Save bar ── */
  .st-save-bar {
    background: linear-gradient(135deg, #1a365d, #3182ce);
    border-radius: 16px; padding: 16px 22px;
    display: flex; align-items: center; justify-content: space-between; gap: 16px;
    color: #fff; margin-bottom: 4px;
  }
  .st-save-text { font-size: .85rem; opacity: .88; }

  /* ── Success toast ── */
  .st-toast {
    position: fixed; bottom: 28px; right: 28px;
    background: #1a365d; color: #fff; border-radius: 14px;
    padding: 14px 20px; display: flex; align-items: center; gap: 10px;
    font-size: .85rem; font-weight: 600; z-index: 999;
    box-shadow: 0 10px 40px rgba(26,54,93,.25);
    animation: st-slide-in .3s ease;
  }
  @keyframes st-slide-in {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── Badge ── */
  .st-badge {
    font-size: .65rem; font-weight: 700; padding: 2px 9px;
    border-radius: 20px; display: inline-flex; align-items: center; gap: 3px;
  }

  /* Section label */
  .st-section-label {
    font-size: .72rem; font-weight: 700; color: #9ca3af;
    text-transform: uppercase; letter-spacing: .06em;
    margin-bottom: 14px; display: flex; align-items: center; gap: 8px;
  }
  .st-section-label::after { content: ''; flex: 1; height: 1px; background: #ebf8ff; }
`;

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const NAV_ITEMS = [
  { id: "profile",      label: "Profile",         icon: <User size={16} />,       bg: "#ebf8ff", color: "#3182ce" },
  { id: "expertise",    label: "Expertise",        icon: <Award size={16} />,      bg: "#f0fdf4", color: "#16a34a" },
  { id: "availability", label: "Availability",     icon: <Zap size={16} />,        bg: "#fffbeb", color: "#d97706" },
  { id: "notifications",label: "Notifications",    icon: <Bell size={16} />,       bg: "#fef2f2", color: "#dc2626" },
  { id: "work",         label: "Work Preferences", icon: <Sliders size={16} />,    bg: "#f5f3ff", color: "#7c3aed" },
  { id: "performance",  label: "Performance",      icon: <BarChart2 size={16} />,  bg: "#ebf8ff", color: "#3182ce" },
  { id: "language",     label: "Language",         icon: <Globe size={16} />,      bg: "#f0fdf4", color: "#16a34a" },
  { id: "security",     label: "Security",         icon: <Shield size={16} />,     bg: "#fef2f2", color: "#dc2626" },
];

const ALL_CROPS = ["Wheat","Rice","Tomato","Cotton","Sugarcane","Onion","Soybean","Maize","Groundnut","Pulses"];
const ALL_EXPERTISE = ["Pest Control","Soil Health","Fertilizer Management","Irrigation","Plant Pathology","Post Harvest","Organic Farming","Drip Irrigation","Seed Selection","Crop Planning"];
const LANGUAGES = ["English","Hindi","Marathi","Kannada","Telugu","Tamil","Gujarati","Bengali","Punjabi"];

/* ─────────────────────────────────────────
   TOGGLE COMPONENT
───────────────────────────────────────── */
function Toggle({ on, onChange }) {
  return (
    <button className="st-toggle-btn" onClick={() => onChange(!on)}>
      {on
        ? <ToggleRight size={32} color="#3182ce" />
        : <ToggleLeft  size={32} color="#d1d5db" />
      }
    </button>
  );
}

/* ─────────────────────────────────────────
   SECTION WRAPPER
───────────────────────────────────────── */
function Section({ id, icon, iconBg, iconColor, title, children, activeSection }) {
  if (activeSection !== id && activeSection !== "all") return null;
  return (
    <div className="st-card" id={`st-${id}`}>
      <div className="st-card-header">
        <div className="st-card-icon" style={{ background: iconBg }}>
          {/* re-color icon */}
          <span style={{ color: iconColor, display: "flex" }}>{icon}</span>
        </div>
        <div className="st-card-title">{title}</div>
      </div>
      <div className="st-card-body">{children}</div>
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
export default function ExpertSettings() {
  // ── nav
  const [active, setActive] = useState("all");

  // ── profile
  const [name,      setName]      = useState("Dr. Rajesh Sharma");
  const [email,     setEmail]     = useState("rajesh.sharma@agriexpert.in");
  const [phone,     setPhone]     = useState("+91 98765 43210");
  const [location,  setLocation]  = useState("Pune, Maharashtra");
  const [qual,      setQual]      = useState("Ph.D. in Agronomy, IARI New Delhi");
  const [exp,       setExp]       = useState("8");
  const [bio,       setBio]       = useState("Specialist in crop disease management and soil health improvement with over 8 years of field research experience.");

  // ── expertise
  const [selCrops,  setSelCrops]  = useState(["Wheat","Tomato","Rice","Cotton"]);
  const [selSkills, setSelSkills] = useState(["Pest Control","Soil Health","Plant Pathology"]);

  // ── availability
  const [avail,     setAvail]     = useState("Available");

  // ── notifications
  const [notifToggles, setNotifToggles] = useState({
    newQuery:    true,
    urgent:      true,
    feedback:    true,
    reassigned:  true,
    performance: true,
    system:      false,
    marketing:   false,
    emailDigest: true,
    smsAlerts:   false,
  });

  // ── work prefs
  const [autoAssign,    setAutoAssign]    = useState(true);
  const [maxQueries,    setMaxQueries]    = useState(10);
  const [responseTime,  setResponseTime]  = useState(4);
  const [priorityFirst, setPriorityFirst] = useState(true);

  // ── language
  const [language, setLanguage] = useState("English");

  // ── security
  const [showPw,    setShowPw]    = useState(false);
  const [oldPw,     setOldPw]     = useState("");
  const [newPw,     setNewPw]     = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  // ── toast
  const [toast, setToast] = useState(null);
  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2800); };

  const toggleTag = (list, setList, val) => {
    setList(prev => prev.includes(val) ? prev.filter(x => x !== val) : [...prev, val]);
  };
  const toggleNotif = (key) => {
    setNotifToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => showToast("Settings saved successfully!");
  const handleChangePw = () => {
    if (!oldPw || !newPw || !confirmPw) return showToast("Please fill all password fields.");
    if (newPw !== confirmPw) return showToast("Passwords do not match.");
    setOldPw(""); setNewPw(""); setConfirmPw("");
    showToast("Password changed successfully!");
  };

  const availConfigs = [
    { label: "Available", dot: "#16a34a", bg: "#f0fdf4", color: "#16a34a", sub: "Accepting queries" },
    { label: "Busy",      dot: "#d97706", bg: "#fffbeb", color: "#d97706", sub: "Limited responses" },
    { label: "Offline",   dot: "#9ca3af", bg: "#f9fafb", color: "#6b7280", sub: "No new assignments" },
  ];
  const currentAvail = availConfigs.find(a => a.label === avail);

  // scroll-to for sidebar nav
  const handleNav = (id) => {
    setActive("all");
    setTimeout(() => {
      const el = document.getElementById(`st-${id}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  return (
    <div className="st-root">
      <style>{styles}</style>
      <ExpertPageHeader
        title="Settings"
        description="Manage your profile, availability, and preferences."
      />

      <div className="st-body">

        {/* ══ SIDEBAR ══ */}
        <div className="st-sidebar">
          {/* Mini profile */}
          <div className="st-sidebar-profile">
            <div className="st-avatar-wrap">
              👨‍🔬
              <div className="st-avatar-cam"><Camera size={11} color="#fff" /></div>
            </div>
            <div className="st-sidebar-name">{name}</div>
            <div className="st-sidebar-spec">Plant Pathology & Pest Control</div>
            <div
              className="st-avail-pill"
              style={{ background: currentAvail.bg, color: currentAvail.color }}
            >
              <div className="st-avail-dot" style={{ background: currentAvail.dot }} />
              {avail}
            </div>
          </div>

          {/* Nav */}
          <nav className="st-nav">
            {NAV_ITEMS.map(n => (
              <div
                key={n.id}
                className="st-nav-item"
                onClick={() => handleNav(n.id)}
              >
                <span className="st-nav-icon" style={{ color: n.color }}>{n.icon}</span>
                {n.label}
                <ChevronRight size={14} style={{ marginLeft: "auto", color: "#d1d5db" }} />
              </div>
            ))}
          </nav>
        </div>

        {/* ══ MAIN SECTIONS ══ */}
        <div className="st-main">

          {/* ── Save bar ── */}
          <div className="st-save-bar">
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: ".95rem" }}>
                Save your changes
              </div>
              <div className="st-save-text">Settings are not auto-saved. Click to apply all changes.</div>
            </div>
            <button className="st-btn" style={{ background: "#fff", color: "#1a365d" }} onClick={handleSave}>
              <Save size={15} />Save Settings
            </button>
          </div>

          {/* ══ 1. PROFILE ══ */}
          <div className="st-card" id="st-profile">
            <div className="st-card-header">
              <div className="st-card-icon" style={{ background: "#ebf8ff" }}><User size={18} color="#3182ce" /></div>
              <div className="st-card-title">Expert Profile</div>
            </div>
            <div className="st-card-body">
              {/* Avatar upload */}
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 22 }}>
                <div style={{
                  width: 68, height: 68, borderRadius: "50%",
                  background: "linear-gradient(135deg,#ebf8ff,#bee3f8)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "2rem", border: "3px solid #ebf8ff", cursor: "pointer", flexShrink: 0
                }}>👨‍🔬</div>
                <div>
                  <div style={{ fontWeight: 700, color: "#1a365d", fontSize: ".9rem" }}>Profile Photo</div>
                  <div style={{ fontSize: ".75rem", color: "#9ca3af", margin: "4px 0 10px" }}>JPG, PNG up to 2MB</div>
                  <button className="st-btn st-btn-outline st-btn-sm"><Camera size={13} />Upload Photo</button>
                </div>
              </div>

              <div className="st-form-grid">
                <div className="st-field">
                  <label>Full Name</label>
                  <div className="st-input-wrap">
                    <User size={15} className="st-input-icon" />
                    <input className="st-input" value={name} onChange={e => setName(e.target.value)} placeholder="Dr. Rajesh Sharma" />
                  </div>
                </div>
                <div className="st-field">
                  <label>Email</label>
                  <div className="st-input-wrap">
                    <Mail size={15} className="st-input-icon" />
                    <input className="st-input" value={email} onChange={e => setEmail(e.target.value)} placeholder="email@agriexpert.in" />
                  </div>
                </div>
                <div className="st-field">
                  <label>Phone</label>
                  <div className="st-input-wrap">
                    <Phone size={15} className="st-input-icon" />
                    <input className="st-input" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 98765 43210" />
                  </div>
                </div>
                <div className="st-field">
                  <label>Location</label>
                  <div className="st-input-wrap">
                    <MapPin size={15} className="st-input-icon" />
                    <input className="st-input" value={location} onChange={e => setLocation(e.target.value)} placeholder="Pune, Maharashtra" />
                  </div>
                </div>
                <div className="st-field">
                  <label>Qualification</label>
                  <div className="st-input-wrap">
                    <Award size={15} className="st-input-icon" />
                    <input className="st-input" value={qual} onChange={e => setQual(e.target.value)} placeholder="Ph.D. Agronomy, IARI" />
                  </div>
                </div>
                <div className="st-field">
                  <label>Years of Experience</label>
                  <div className="st-input-wrap">
                    <Briefcase size={15} className="st-input-icon" />
                    <input className="st-input" type="number" min="0" value={exp} onChange={e => setExp(e.target.value)} placeholder="8" />
                  </div>
                </div>
                <div className="st-field st-form-full">
                  <label>Professional Bio</label>
                  <textarea className="st-textarea" value={bio} onChange={e => setBio(e.target.value)} placeholder="Brief professional summary..." />
                </div>
              </div>
            </div>
          </div>

          {/* ══ 2. EXPERTISE ══ */}
          <div className="st-card" id="st-expertise">
            <div className="st-card-header">
              <div className="st-card-icon" style={{ background: "#f0fdf4" }}><Award size={18} color="#16a34a" /></div>
              <div className="st-card-title">Expertise & Skills</div>
              <span className="st-badge" style={{ background: "#f0fdf4", color: "#16a34a" }}>Helps assign correct queries</span>
            </div>
            <div className="st-card-body">
              <div className="st-section-label">Crops You Handle</div>
              <div className="st-tags" style={{ marginBottom: 22 }}>
                {ALL_CROPS.map(c => (
                  <button
                    key={c}
                    className={`st-tag ${selCrops.includes(c) ? "on" : "off"}`}
                    onClick={() => toggleTag(selCrops, setSelCrops, c)}
                  >
                    {selCrops.includes(c) && <Check size={11} />}
                    🌿 {c}
                  </button>
                ))}
              </div>
              <div className="st-section-label">Areas of Expertise</div>
              <div className="st-tags">
                {ALL_EXPERTISE.map(s => (
                  <button
                    key={s}
                    className={`st-tag ${selSkills.includes(s) ? "on" : "off"}`}
                    onClick={() => toggleTag(selSkills, setSelSkills, s)}
                  >
                    {selSkills.includes(s) && <Check size={11} />}
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ══ 3. AVAILABILITY ══ */}
          <div className="st-card" id="st-availability">
            <div className="st-card-header">
              <div className="st-card-icon" style={{ background: "#fffbeb" }}><Zap size={18} color="#d97706" /></div>
              <div className="st-card-title">Availability Status</div>
              <div
                className="st-avail-pill"
                style={{ background: currentAvail.bg, color: currentAvail.color }}
              >
                <div className="st-avail-dot" style={{ background: currentAvail.dot }} />
                Currently: {avail}
              </div>
            </div>
            <div className="st-card-body">
              <div style={{ fontSize: ".82rem", color: "#6b7280", marginBottom: 16, lineHeight: 1.6 }}>
                Your availability status determines whether the system assigns new farmer queries to you.
              </div>
              <div className="st-avail-grid">
                {availConfigs.map(a => (
                  <div
                    key={a.label}
                    className={`st-avail-card${avail === a.label ? " selected" : ""}`}
                    style={{ color: avail === a.label ? a.color : undefined, borderColor: avail === a.label ? a.dot : undefined, background: avail === a.label ? a.bg : undefined }}
                    onClick={() => setAvail(a.label)}
                  >
                    <div className="st-avail-dot" style={{ background: a.dot, width: 12, height: 12 }} />
                    <div className="st-avail-label" style={{ color: a.color }}>{a.label}</div>
                    <div className="st-avail-sub">{a.sub}</div>
                    {avail === a.label && <CheckCircle size={16} color={a.color} />}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ══ 4. NOTIFICATIONS ══ */}
          <div className="st-card" id="st-notifications">
            <div className="st-card-header">
              <div className="st-card-icon" style={{ background: "#fef2f2" }}><Bell size={18} color="#dc2626" /></div>
              <div className="st-card-title">Notification Settings</div>
            </div>
            <div className="st-card-body">
              {[
                { key: "newQuery",    label: "New Query Alerts",          sub: "Get notified when a new farmer query is assigned",   icon: <MessageSquare size={14} color="#3182ce" /> },
                { key: "urgent",      label: "Urgent Request Alerts",     sub: "Immediate alerts for high-priority cases",            icon: <AlertCircle   size={14} color="#dc2626" /> },
                { key: "feedback",    label: "Feedback & Ratings",        sub: "Notify when a farmer rates your response",           icon: <Star          size={14} color="#d97706" /> },
                { key: "reassigned",  label: "Reassigned Case Alerts",    sub: "Alert when a case is reassigned to you",             icon: <RefreshCw     size={14} color="#7c3aed" /> },
                { key: "performance", label: "Performance Reminders",     sub: "Weekly summary and pending query reminders",         icon: <BarChart2     size={14} color="#16a34a" /> },
                { key: "system",      label: "System Announcements",      sub: "Feature updates and maintenance notifications",      icon: <Zap           size={14} color="#6b7280" /> },
                { key: "emailDigest", label: "Daily Email Digest",        sub: "Receive a daily summary via email",                  icon: <Mail          size={14} color="#3182ce" /> },
                { key: "smsAlerts",   label: "SMS Alerts",                sub: "Receive urgent alerts via SMS on your phone",        icon: <Phone         size={14} color="#16a34a" /> },
                { key: "marketing",   label: "Marketing Notifications",   sub: "Platform promotions and announcements",              icon: <BellOff       size={14} color="#9ca3af" /> },
              ].map(n => (
                <div className="st-toggle-row" key={n.key}>
                  <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <div style={{ marginTop: 2 }}>{n.icon}</div>
                    <div>
                      <div className="st-toggle-label">{n.label}</div>
                      <div className="st-toggle-sub">{n.sub}</div>
                    </div>
                  </div>
                  <Toggle on={notifToggles[n.key]} onChange={() => toggleNotif(n.key)} />
                </div>
              ))}
            </div>
          </div>

          {/* ══ 5. WORK PREFERENCES ══ */}
          <div className="st-card" id="st-work">
            <div className="st-card-header">
              <div className="st-card-icon" style={{ background: "#f5f3ff" }}><Sliders size={18} color="#7c3aed" /></div>
              <div className="st-card-title">Work Preferences</div>
            </div>
            <div className="st-card-body">
              <div className="st-toggle-row">
                <div>
                  <div className="st-toggle-label">Auto-assign Queries</div>
                  <div className="st-toggle-sub">System automatically assigns new queries to you based on expertise</div>
                </div>
                <Toggle on={autoAssign} onChange={setAutoAssign} />
              </div>
              <div className="st-toggle-row">
                <div>
                  <div className="st-toggle-label">Prioritize Urgent Queries First</div>
                  <div className="st-toggle-sub">Show urgent cases at the top of your pending list</div>
                </div>
                <Toggle on={priorityFirst} onChange={setPriorityFirst} />
              </div>

              <div style={{ padding: "16px 0", borderBottom: "1px solid #f0f7ff" }}>
                <div className="st-toggle-label" style={{ marginBottom: 6 }}>Max Queries per Day</div>
                <div className="st-toggle-sub" style={{ marginBottom: 14 }}>Limit the number of new queries assigned to you daily</div>
                <div className="st-slider-wrap">
                  <span style={{ fontSize: ".75rem", color: "#9ca3af" }}>1</span>
                  <input
                    type="range" min="1" max="30" step="1"
                    className="st-slider" value={maxQueries}
                    onChange={e => setMaxQueries(Number(e.target.value))}
                  />
                  <span style={{ fontSize: ".75rem", color: "#9ca3af" }}>30</span>
                  <span className="st-slider-val">{maxQueries}</span>
                </div>
              </div>

              <div style={{ padding: "16px 0" }}>
                <div className="st-toggle-label" style={{ marginBottom: 6 }}>Target Response Time (hours)</div>
                <div className="st-toggle-sub" style={{ marginBottom: 14 }}>System will remind you when queries exceed this duration</div>
                <div className="st-slider-wrap">
                  <span style={{ fontSize: ".75rem", color: "#9ca3af" }}>1h</span>
                  <input
                    type="range" min="1" max="24" step="1"
                    className="st-slider" value={responseTime}
                    onChange={e => setResponseTime(Number(e.target.value))}
                  />
                  <span style={{ fontSize: ".75rem", color: "#9ca3af" }}>24h</span>
                  <span className="st-slider-val">{responseTime}h</span>
                </div>
              </div>
            </div>
          </div>

          {/* ══ 6. PERFORMANCE ══ */}
          <div className="st-card" id="st-performance">
            <div className="st-card-header">
              <div className="st-card-icon" style={{ background: "#ebf8ff" }}><BarChart2 size={18} color="#3182ce" /></div>
              <div className="st-card-title">Performance Overview</div>
              <span className="st-badge" style={{ background: "#ebf8ff", color: "#3182ce" }}>This month</span>
            </div>
            <div className="st-card-body">
              <div className="st-perf-grid" style={{ marginBottom: 20 }}>
                {[
                  { val: "148",  label: "Total Cases",    bar: "100%", color: "#3182ce" },
                  { val: "4.8⭐", label: "Avg Rating",    bar: "96%",  color: "#d97706" },
                  { val: "93%",  label: "Success Rate",   bar: "93%",  color: "#16a34a" },
                  { val: "96%",  label: "Response Rate",  bar: "96%",  color: "#7c3aed" },
                  { val: "23",   label: "This Month",     bar: "77%",  color: "#3182ce" },
                  { val: "Top 10%", label: "Expert Rank", bar: "90%",  color: "#d97706" },
                ].map((p, i) => (
                  <div className="st-perf-card" key={i}>
                    <div className="st-perf-val" style={{ color: p.color }}>{p.val}</div>
                    <div className="st-perf-label">{p.label}</div>
                    <div className="st-perf-bar">
                      <div className="st-perf-fill" style={{ width: p.bar, background: `linear-gradient(90deg, ${p.color}, ${p.color}99)` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div style={{
                background: "linear-gradient(135deg,#f0fdf4,#dcfce7)",
                borderRadius: 12, padding: "14px 16px",
                fontSize: ".82rem", color: "#16a34a", fontWeight: 600,
                display: "flex", alignItems: "center", gap: 8
              }}>
                <CheckCircle size={16} />
                You are in the Top 10% of experts this month! Keep up the great work, Dr. Sharma.
              </div>
            </div>
          </div>

          {/* ══ 7. LANGUAGE ══ */}
          <div className="st-card" id="st-language">
            <div className="st-card-header">
              <div className="st-card-icon" style={{ background: "#f0fdf4" }}><Globe size={18} color="#16a34a" /></div>
              <div className="st-card-title">Language Preferences</div>
            </div>
            <div className="st-card-body">
              <div style={{ fontSize: ".82rem", color: "#6b7280", marginBottom: 16, lineHeight: 1.6 }}>
                Choose your preferred interface language. Selecting a regional language helps you communicate better with farmers.
              </div>
              <div className="st-field" style={{ maxWidth: 320 }}>
                <label>Interface Language</label>
                <select className="st-select" value={language} onChange={e => setLanguage(e.target.value)}>
                  {LANGUAGES.map(l => <option key={l}>{l}</option>)}
                </select>
              </div>
              <div style={{ marginTop: 16 }}>
                <div className="st-section-label">Quick select</div>
                <div className="st-tags">
                  {["English","Hindi","Marathi"].map(l => (
                    <button
                      key={l}
                      className={`st-tag ${language === l ? "on" : "off"}`}
                      onClick={() => setLanguage(l)}
                    >
                      {language === l && <Check size={11} />}{l}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ══ 8. SECURITY ══ */}
          <div className="st-card" id="st-security">
            <div className="st-card-header">
              <div className="st-card-icon" style={{ background: "#fef2f2" }}><Shield size={18} color="#dc2626" /></div>
              <div className="st-card-title">Security Settings</div>
            </div>
            <div className="st-card-body">
              <div className="st-section-label">Change Password</div>
              <div className="st-form-grid" style={{ marginBottom: 20 }}>
                <div className="st-field st-form-full">
                  <label>Current Password</label>
                  <div className="st-input-wrap">
                    <Lock size={15} className="st-input-icon" />
                    <input
                      className="st-input"
                      type={showPw ? "text" : "password"}
                      value={oldPw} onChange={e => setOldPw(e.target.value)}
                      placeholder="Enter current password"
                    />
                    <button className="st-input-right" onClick={() => setShowPw(v => !v)}>
                      {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>
                <div className="st-field">
                  <label>New Password</label>
                  <div className="st-input-wrap">
                    <Lock size={15} className="st-input-icon" />
                    <input className="st-input" type="password" value={newPw} onChange={e => setNewPw(e.target.value)} placeholder="New password" />
                  </div>
                </div>
                <div className="st-field">
                  <label>Confirm New Password</label>
                  <div className="st-input-wrap">
                    <Lock size={15} className="st-input-icon" />
                    <input className="st-input" type="password" value={confirmPw} onChange={e => setConfirmPw(e.target.value)} placeholder="Repeat new password" />
                  </div>
                </div>
              </div>
              <button className="st-btn st-btn-outline" onClick={handleChangePw}>
                <Lock size={14} />Change Password
              </button>

              <div style={{ height: 20 }} />
              <div className="st-section-label">Account Actions</div>

              <div className="st-sec-row">
                <div>
                  <div className="st-toggle-label">Two-Factor Authentication</div>
                  <div className="st-toggle-sub">Add an extra layer of security to your account</div>
                </div>
                <button className="st-btn st-btn-outline st-btn-sm"><Shield size={13} />Enable 2FA</button>
              </div>

              <div className="st-sec-row">
                <div>
                  <div className="st-toggle-label" style={{ color: "#dc2626" }}>Logout</div>
                  <div className="st-toggle-sub">Sign out from your current session</div>
                </div>
                <button className="st-btn st-btn-danger st-btn-sm"><LogOut size={13} />Logout</button>
              </div>
            </div>
          </div>

          {/* ── Bottom save ── */}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, paddingBottom: 8 }}>
            <button className="st-btn st-btn-outline" onClick={() => showToast("Changes discarded.")}>Discard Changes</button>
            <button className="st-btn st-btn-primary" onClick={handleSave}><Save size={15} />Save All Settings</button>
          </div>

        </div>
      </div>

      {/* ── Toast ── */}
      {toast && (
        <div className="st-toast">
          <CheckCircle size={18} color="#63b3ed" />
          {toast}
        </div>
      )}
    </div>
  );
}

// local alias for MessageSquare used in notification labels
function MessageSquare({ size, color }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>;
}