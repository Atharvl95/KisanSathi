import { useState, useRef } from "react";
import {
  User, MapPin, Wheat, Bell, Globe, Lock, Moon, History,
  Camera, ChevronRight, Save, LogOut, Eye, EyeOff, Check,
  Loader2, Shield, Database, Sun
} from "lucide-react";
import { FarmerPageHeader } from "../../Pages/Farmerdash/Farmerdash";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');

  .st-root {
    font-family: 'DM Sans', sans-serif;
    background: #f7fdf9;
    min-height: 100vh;
  }

  .st-body { padding: 24px; display: flex; flex-direction: column; gap: 20px; }

  /* ── Section Card ── */
  .st-card {
    background: #ffffff;
    border-radius: 16px;
    border: 1px solid #e9f7ef;
    overflow: hidden;
  }

  .st-card-header {
    padding: 16px 20px;
    border-bottom: 1px solid #e9f7ef;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .st-header-icon {
    width: 34px; height: 34px;
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }

  .st-card-title {
    font-family: 'Playfair Display', serif;
    font-size: 1rem;
    font-weight: 700;
    color: #14532d;
  }

  .st-card-sub {
    font-size: 0.73rem;
    color: #9ca3af;
    margin-top: 1px;
  }

  .st-card-body { padding: 20px; }

  /* ── Grid layouts ── */
  .st-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .st-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }

  @media (max-width: 700px) {
    .st-grid-2, .st-grid-3 { grid-template-columns: 1fr; }
  }

  /* ── Form Fields ── */
  .st-field { display: flex; flex-direction: column; gap: 6px; }

  .st-label {
    font-size: 0.78rem;
    font-weight: 600;
    color: #374151;
  }

  .st-input {
    padding: 10px 14px;
    border: 1.5px solid #e5e7eb;
    border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.85rem;
    color: #111827;
    background: #fafafa;
    outline: none;
    transition: all 0.2s;
  }

  .st-input:focus {
    border-color: #16a34a;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(22,163,74,0.12);
  }

  .st-input-wrap { position: relative; }
  .st-input-wrap .st-input { padding-right: 40px; width: 100%; box-sizing: border-box; }
  .st-input-eye {
    position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
    background: none; border: none; cursor: pointer; color: #9ca3af;
    display: flex; align-items: center;
  }

  .st-select {
    padding: 10px 14px;
    border: 1.5px solid #e5e7eb;
    border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.85rem;
    color: #111827;
    background: #fafafa;
    outline: none;
    width: 100%;
    cursor: pointer;
    transition: all 0.2s;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    padding-right: 36px;
  }

  .st-select:focus { border-color: #16a34a; background-color: #fff; box-shadow: 0 0 0 3px rgba(22,163,74,0.12); }

  /* ── Profile Photo ── */
  .st-avatar-row {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #f3f4f6;
  }

  .st-avatar-wrap { position: relative; width: 80px; height: 80px; flex-shrink: 0; }

  .st-avatar {
    width: 80px; height: 80px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid #bbf7d0;
    background: #f0fdf4;
    display: flex; align-items: center; justify-content: center;
    font-size: 2rem;
    font-weight: 700;
    color: #16a34a;
    font-family: 'Playfair Display', serif;
  }

  .st-avatar-btn {
    position: absolute;
    bottom: 0; right: 0;
    width: 26px; height: 26px;
    border-radius: 50%;
    background: #16a34a;
    border: 2px solid #fff;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    color: #fff;
    transition: all 0.2s;
  }

  .st-avatar-btn:hover { background: #14532d; transform: scale(1.1); }

  .st-avatar-info { flex: 1; }
  .st-avatar-name {
    font-family: 'Playfair Display', serif;
    font-size: 1.2rem;
    font-weight: 700;
    color: #14532d;
    margin-bottom: 2px;
  }
  .st-avatar-role { font-size: 0.78rem; color: #9ca3af; }

  /* ── Location row ── */
  .st-location-pill {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #f0fdf4;
    border: 1.5px solid #bbf7d0;
    border-radius: 10px;
    padding: 10px 14px;
    font-size: 0.85rem;
    font-weight: 600;
    color: #14532d;
    margin-bottom: 16px;
  }

  .st-location-pill span { flex: 1; }

  .st-detect-btn {
    padding: 6px 12px;
    border-radius: 8px;
    border: none;
    background: #16a34a;
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    cursor: pointer;
    display: flex; align-items: center; gap: 4px;
    transition: all 0.2s;
    white-space: nowrap;
  }

  .st-detect-btn:hover { background: #14532d; }

  /* ── Toggle Rows ── */
  .st-toggle-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 13px 0;
    border-bottom: 1px solid #f3f4f6;
  }

  .st-toggle-row:last-child { border-bottom: none; padding-bottom: 0; }
  .st-toggle-row:first-child { padding-top: 0; }

  .st-toggle-left { display: flex; align-items: center; gap: 10px; }

  .st-toggle-icon {
    width: 36px; height: 36px;
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 17px;
    flex-shrink: 0;
  }

  .st-toggle-title { font-size: 0.87rem; font-weight: 600; color: #111827; }
  .st-toggle-sub   { font-size: 0.73rem; color: #9ca3af; margin-top: 1px; }

  .st-toggle {
    position: relative;
    width: 44px; height: 24px;
    cursor: pointer;
    flex-shrink: 0;
  }

  .st-toggle input { opacity: 0; width: 0; height: 0; position: absolute; }

  .st-toggle-track {
    position: absolute; inset: 0;
    background: #e5e7eb;
    border-radius: 99px;
    transition: background 0.25s;
  }

  .st-toggle input:checked ~ .st-toggle-track { background: #16a34a; }

  .st-toggle-thumb {
    position: absolute;
    top: 3px; left: 3px;
    width: 18px; height: 18px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0,0,0,0.18);
    transition: transform 0.25s;
  }

  .st-toggle input:checked ~ .st-toggle-track ~ .st-toggle-thumb,
  .st-toggle input:checked + .st-toggle-track + .st-toggle-thumb {
    transform: translateX(20px);
  }

  /* ── Language Selector ── */
  .st-lang-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-bottom: 16px;
  }

  @media (max-width: 500px) { .st-lang-grid { grid-template-columns: 1fr 1fr; } }

  .st-lang-btn {
    padding: 12px;
    border-radius: 12px;
    border: 2px solid #e5e7eb;
    background: #fafafa;
    cursor: pointer;
    text-align: center;
    transition: all 0.2s;
    font-family: 'DM Sans', sans-serif;
  }

  .st-lang-btn:hover { border-color: #bbf7d0; background: #f0fdf4; }

  .st-lang-btn.selected {
    border-color: #16a34a;
    background: #f0fdf4;
    box-shadow: 0 0 0 3px rgba(22,163,74,0.1);
  }

  .st-lang-flag { font-size: 1.5rem; display: block; margin-bottom: 4px; }
  .st-lang-name { font-size: 0.82rem; font-weight: 700; color: #14532d; }
  .st-lang-native { font-size: 0.72rem; color: #9ca3af; }

  .st-lang-btn.selected .st-lang-name { color: #16a34a; }

  /* ── Security Buttons ── */
  .st-sec-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 13px 0;
    border-bottom: 1px solid #f3f4f6;
  }
  .st-sec-row:last-child { border-bottom: none; padding-bottom: 0; }
  .st-sec-row:first-child { padding-top: 0; }

  .st-sec-left { display: flex; align-items: center; gap: 10px; }
  .st-sec-icon {
    width: 36px; height: 36px;
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .st-sec-title { font-size: 0.87rem; font-weight: 600; color: #111827; }
  .st-sec-sub   { font-size: 0.73rem; color: #9ca3af; margin-top: 1px; }

  .st-sec-btn {
    display: flex; align-items: center; gap: 5px;
    padding: 7px 14px;
    border-radius: 9px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.78rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    border: 1.5px solid;
    white-space: nowrap;
  }

  .st-sec-btn.outline {
    border-color: #e5e7eb;
    background: #fff;
    color: #374151;
  }

  .st-sec-btn.outline:hover { border-color: #16a34a; color: #16a34a; background: #f0fdf4; }

  .st-sec-btn.danger {
    border-color: #fecaca;
    background: #fff;
    color: #dc2626;
  }

  .st-sec-btn.danger:hover { background: #fef2f2; border-color: #dc2626; }

  /* ── History tiles ── */
  .st-history-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  @media (max-width: 500px) { .st-history-grid { grid-template-columns: 1fr; } }

  .st-history-tile {
    border: 1.5px solid #e9f7ef;
    border-radius: 13px;
    padding: 16px;
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    transition: all 0.22s;
    background: #fafffe;
  }

  .st-history-tile:hover {
    border-color: #16a34a;
    background: #f0fdf4;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(22,101,52,0.08);
  }

  .st-history-icon {
    width: 44px; height: 44px;
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 20px;
    flex-shrink: 0;
  }

  .st-history-title { font-size: 0.87rem; font-weight: 700; color: #14532d; }
  .st-history-sub   { font-size: 0.73rem; color: #9ca3af; margin-top: 2px; }

  /* ── Save button ── */
  .st-save-btn {
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
    margin-top: 16px;
  }

  .st-save-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(22,101,52,0.3); }
  .st-save-btn:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }

  /* ── Saved toast ── */
  .st-toast {
    position: fixed;
    bottom: 28px; right: 28px;
    background: #14532d;
    color: #fff;
    border-radius: 12px;
    padding: 12px 18px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.85rem;
    font-weight: 600;
    box-shadow: 0 8px 24px rgba(22,101,52,0.25);
    animation: st-toastIn 0.3s ease;
    z-index: 999;
  }

  @keyframes st-toastIn {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── Password section ── */
  .st-pw-fields { display: flex; flex-direction: column; gap: 12px; }
  .st-pw-label { font-size: 0.75rem; font-weight: 700; color: #6b7280; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 8px; }

  /* ── Dark mode overlay hint ── */
  .st-dark-hint {
    font-size: 0.75rem;
    color: #9ca3af;
    margin-top: 4px;
    font-style: italic;
  }

  @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
`;

const LANGUAGES = [
  { code: "en", flag: "🇬🇧", name: "English",  native: "English" },
  { code: "hi", flag: "🇮🇳", name: "Hindi",    native: "हिन्दी" },
  { code: "mr", flag: "🟠",  name: "Marathi",  native: "मराठी" },
  { code: "gu", flag: "🟡",  name: "Gujarati", native: "ગુજરાતી" },
  { code: "ta", flag: "🔵",  name: "Tamil",    native: "தமிழ்" },
  { code: "te", flag: "🟣",  name: "Telugu",   native: "తెలుగు" },
];

const SOIL_TYPES  = ["Black Soil","Red Soil","Alluvial Soil","Sandy Soil","Loamy Soil","Clay Soil","Laterite Soil"];
const CROP_TYPES  = ["Wheat","Rice","Cotton","Sugarcane","Maize","Soybean","Onion","Tomato","Grapes","Mango","Banana"];
const LAND_UNITS  = ["Acres","Hectares","Bigha","Guntha"];

function Toggle({ checked, onChange }) {
  return (
    <label className="st-toggle">
      <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} />
      <div className="st-toggle-track" />
      <div className="st-toggle-thumb" style={{ transform: checked ? "translateX(20px)" : "translateX(0)" }} />
    </label>
  );
}

export default function FarmerSettings() {
  // Profile
  const [profile, setProfile] = useState({
    name: "Ramesh Patil", phone: "9876543210",
    email: "ramesh.patil@gmail.com", avatar: null,
  });

  // Location
  const [location, setLocation] = useState({ city: "Nashik", state: "Maharashtra", detecting: false });

  // Farm
  const [farm, setFarm] = useState({ crop: "Wheat", soil: "Black Soil", land: "2", unit: "Acres" });

  // Notifications
  const [notifs, setNotifs] = useState({
    expertReplies: true, weatherAlerts: true, pestAlerts: true,
    requestUpdates: true, systemUpdates: false, marketingNotifs: false, farmingTips: true,
  });

  // Language
  const [lang, setLang] = useState("en");

  // Preferences
  const [prefs, setPrefs] = useState({ darkMode: false, dataSaving: false, autoLocation: true });

  // Security
  const [pwVisible, setPwVisible] = useState({ current: false, newPw: false, confirm: false });
  const [pw, setPw] = useState({ current: "", newPw: "", confirm: "" });

  // UI state
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const fileRef = useRef();

  const detectLocation = () => {
    setLocation(l => ({ ...l, detecting: true }));
    setTimeout(() => setLocation({ city: "Pune", state: "Maharashtra", detecting: false }), 1800);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setProfile(p => ({ ...p, avatar: ev.target.result }));
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => { setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 2500); }, 1200);
  };

  const avatarInitials = profile.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="st-root">
      <style>{styles}</style>
      <FarmerPageHeader
        title="Settings"
        description="Manage your profile, farm details, and app preferences"
      />

      <div className="st-body">

        {/* ── 1. Profile ── */}
        <div className="st-card">
          <div className="st-card-header">
            <div className="st-header-icon" style={{ background: "#f0fdf4" }}>
              <User size={17} color="#16a34a" />
            </div>
            <div>
              <div className="st-card-title">Profile Information</div>
              <div className="st-card-sub">Update your personal details</div>
            </div>
          </div>
          <div className="st-card-body">
            <div className="st-avatar-row">
              <div className="st-avatar-wrap">
                {profile.avatar
                  ? <img src={profile.avatar} alt="avatar" className="st-avatar" style={{ display: "block" }} />
                  : <div className="st-avatar">{avatarInitials}</div>
                }
                <button className="st-avatar-btn" onClick={() => fileRef.current.click()}>
                  <Camera size={12} />
                </button>
                <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleAvatarChange} />
              </div>
              <div className="st-avatar-info">
                <div className="st-avatar-name">{profile.name}</div>
                <div className="st-avatar-role">🌾 Registered Farmer · Nashik, MH</div>
              </div>
            </div>

            <div className="st-grid-2" style={{ gap: 16 }}>
              <div className="st-field">
                <label className="st-label">Full Name</label>
                <input className="st-input" value={profile.name}
                  onChange={e => setProfile(p => ({ ...p, name: e.target.value }))} />
              </div>
              <div className="st-field">
                <label className="st-label">Phone Number</label>
                <input className="st-input" value={profile.phone} type="tel"
                  onChange={e => setProfile(p => ({ ...p, phone: e.target.value }))} />
              </div>
              <div className="st-field" style={{ gridColumn: "1 / -1" }}>
                <label className="st-label">Email Address</label>
                <input className="st-input" value={profile.email} type="email"
                  onChange={e => setProfile(p => ({ ...p, email: e.target.value }))} />
              </div>
            </div>
          </div>
        </div>

        {/* ── 2. Location ── */}
        <div className="st-card">
          <div className="st-card-header">
            <div className="st-header-icon" style={{ background: "#fff7ed" }}>
              <MapPin size={17} color="#ea580c" />
            </div>
            <div>
              <div className="st-card-title">Location Settings</div>
              <div className="st-card-sub">Used for weather & crop recommendations</div>
            </div>
          </div>
          <div className="st-card-body">
            <div className="st-location-pill">
              <MapPin size={14} color="#16a34a" />
              <span>📍 {location.city}, {location.state}</span>
              <button className="st-detect-btn" onClick={detectLocation} disabled={location.detecting}>
                {location.detecting
                  ? <><Loader2 size={12} style={{ animation: "spin 1s linear infinite" }} /> Detecting...</>
                  : <><MapPin size={12} /> Auto-detect</>
                }
              </button>
            </div>
            <div className="st-grid-2">
              <div className="st-field">
                <label className="st-label">Village / City</label>
                <input className="st-input" value={location.city}
                  onChange={e => setLocation(l => ({ ...l, city: e.target.value }))} />
              </div>
              <div className="st-field">
                <label className="st-label">State</label>
                <input className="st-input" value={location.state}
                  onChange={e => setLocation(l => ({ ...l, state: e.target.value }))} />
              </div>
            </div>
          </div>
        </div>

        {/* ── 3. Farm Details ── */}
        <div className="st-card">
          <div className="st-card-header">
            <div className="st-header-icon" style={{ background: "#fefce8" }}>
              <Wheat size={17} color="#ca8a04" />
            </div>
            <div>
              <div className="st-card-title">Farm Details</div>
              <div className="st-card-sub">Personalizes your crop & soil recommendations</div>
            </div>
          </div>
          <div className="st-card-body">
            <div className="st-grid-3">
              <div className="st-field">
                <label className="st-label">Primary Crop</label>
                <select className="st-select" value={farm.crop}
                  onChange={e => setFarm(f => ({ ...f, crop: e.target.value }))}>
                  {CROP_TYPES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="st-field">
                <label className="st-label">Soil Type</label>
                <select className="st-select" value={farm.soil}
                  onChange={e => setFarm(f => ({ ...f, soil: e.target.value }))}>
                  {SOIL_TYPES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="st-field">
                <label className="st-label">Land Size</label>
                <div style={{ display: "flex", gap: 6 }}>
                  <input className="st-input" type="number" value={farm.land} min="0" style={{ flex: 1 }}
                    onChange={e => setFarm(f => ({ ...f, land: e.target.value }))} />
                  <select className="st-select" value={farm.unit} style={{ width: 100 }}
                    onChange={e => setFarm(f => ({ ...f, unit: e.target.value }))}>
                    {LAND_UNITS.map(u => <option key={u}>{u}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── 4. Notifications ── */}
        <div className="st-card">
          <div className="st-card-header">
            <div className="st-header-icon" style={{ background: "#eff6ff" }}>
              <Bell size={17} color="#2563eb" />
            </div>
            <div>
              <div className="st-card-title">Notification Preferences</div>
              <div className="st-card-sub">Choose which alerts you want to receive</div>
            </div>
          </div>
          <div className="st-card-body">
            {[
              { key: "expertReplies",   icon: "👨‍🔬", bg: "#f0fdf4", title: "Expert Replies",          sub: "Get notified when agronomists respond" },
              { key: "weatherAlerts",   icon: "🌧️", bg: "#fff7ed", title: "Weather Alerts",          sub: "Heavy rain, drought & climate warnings" },
              { key: "pestAlerts",      icon: "🦠", bg: "#fef2f2", title: "Pest & Disease Alerts",    sub: "AI detection results for your crops" },
              { key: "requestUpdates",  icon: "📩", bg: "#eff6ff", title: "Request Status Updates",   sub: "Pending → In Progress → Resolved" },
              { key: "farmingTips",     icon: "💡", bg: "#fefce8", title: "Daily Farming Tips",       sub: "Seasonal advice and best practices" },
              { key: "systemUpdates",   icon: "📢", bg: "#f5f3ff", title: "System Notifications",     sub: "New features and maintenance alerts" },
              { key: "marketingNotifs", icon: "📣", bg: "#f3f4f6", title: "Marketing Notifications",  sub: "Offers and promotional content" },
            ].map(({ key, icon, bg, title, sub }) => (
              <div className="st-toggle-row" key={key}>
                <div className="st-toggle-left">
                  <div className="st-toggle-icon" style={{ background: bg }}>{icon}</div>
                  <div>
                    <div className="st-toggle-title">{title}</div>
                    <div className="st-toggle-sub">{sub}</div>
                  </div>
                </div>
                <Toggle checked={notifs[key]} onChange={v => setNotifs(n => ({ ...n, [key]: v }))} />
              </div>
            ))}
          </div>
        </div>

        {/* ── 5. Language ── */}
        <div className="st-card">
          <div className="st-card-header">
            <div className="st-header-icon" style={{ background: "#f0fdf4" }}>
              <Globe size={17} color="#16a34a" />
            </div>
            <div>
              <div className="st-card-title">Language Settings</div>
              <div className="st-card-sub">Choose your preferred language</div>
            </div>
          </div>
          <div className="st-card-body">
            <div className="st-lang-grid">
              {LANGUAGES.map(l => (
                <button
                  key={l.code}
                  className={`st-lang-btn${lang === l.code ? " selected" : ""}`}
                  onClick={() => setLang(l.code)}
                >
                  <span className="st-lang-flag">{l.flag}</span>
                  <div className="st-lang-name">{l.name}</div>
                  <div className="st-lang-native">{l.native}</div>
                  {lang === l.code && (
                    <div style={{ marginTop: 6, display: "flex", justifyContent: "center" }}>
                      <Check size={13} color="#16a34a" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── 6. Security ── */}
        <div className="st-card">
          <div className="st-card-header">
            <div className="st-header-icon" style={{ background: "#fef2f2" }}>
              <Lock size={17} color="#dc2626" />
            </div>
            <div>
              <div className="st-card-title">Security Settings</div>
              <div className="st-card-sub">Keep your account safe</div>
            </div>
          </div>
          <div className="st-card-body">
            <div className="st-pw-label">Change Password</div>
            <div className="st-pw-fields">
              {[
                { key: "current", label: "Current Password" },
                { key: "newPw",   label: "New Password" },
                { key: "confirm", label: "Confirm New Password" },
              ].map(({ key, label }) => (
                <div className="st-field" key={key}>
                  <label className="st-label">{label}</label>
                  <div className="st-input-wrap">
                    <input
                      className="st-input"
                      type={pwVisible[key] ? "text" : "password"}
                      placeholder="••••••••"
                      value={pw[key]}
                      onChange={e => setPw(p => ({ ...p, [key]: e.target.value }))}
                    />
                    <button className="st-input-eye" onClick={() => setPwVisible(v => ({ ...v, [key]: !v[key] }))}>
                      {pwVisible[key] ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 20 }}>
              {[
                { icon: <Shield size={16} color="#7c3aed" />, bg: "#f5f3ff", title: "Two-Factor Authentication", sub: "Add extra layer of security", btnLabel: "Enable", btnClass: "outline" },
                { icon: <LogOut size={16} color="#dc2626" />, bg: "#fef2f2", title: "Logout", sub: "Sign out of your account", btnLabel: "Logout", btnClass: "danger" },
              ].map(({ icon, bg, title, sub, btnLabel, btnClass }) => (
                <div className="st-sec-row" key={title}>
                  <div className="st-sec-left">
                    <div className="st-sec-icon" style={{ background: bg }}>{icon}</div>
                    <div>
                      <div className="st-sec-title">{title}</div>
                      <div className="st-sec-sub">{sub}</div>
                    </div>
                  </div>
                  <button className={`st-sec-btn ${btnClass}`}>
                    {btnLabel} <ChevronRight size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── 7. App Preferences ── */}
        <div className="st-card">
          <div className="st-card-header">
            <div className="st-header-icon" style={{ background: "#f5f3ff" }}>
              <Moon size={17} color="#7c3aed" />
            </div>
            <div>
              <div className="st-card-title">App Preferences</div>
              <div className="st-card-sub">Customize how the app behaves</div>
            </div>
          </div>
          <div className="st-card-body">
            {[
              { key: "darkMode",     icon: prefs.darkMode ? "🌙" : "☀️", bg: "#f5f3ff", title: "Dark Mode",            sub: "Switch between light and dark theme" },
              { key: "dataSaving",   icon: "📶",                           bg: "#eff6ff", title: "Data Saving Mode",     sub: "Reduce image quality to save data" },
              { key: "autoLocation", icon: "📍",                           bg: "#fff7ed", title: "Auto-detect Location", sub: "Use GPS for weather & crop data" },
            ].map(({ key, icon, bg, title, sub }) => (
              <div className="st-toggle-row" key={key}>
                <div className="st-toggle-left">
                  <div className="st-toggle-icon" style={{ background: bg }}>{icon}</div>
                  <div>
                    <div className="st-toggle-title">{title}</div>
                    <div className="st-toggle-sub">{sub}</div>
                  </div>
                </div>
                <Toggle checked={prefs[key]} onChange={v => setPrefs(p => ({ ...p, [key]: v }))} />
              </div>
            ))}
          </div>
        </div>

        {/* ── 8. History & Data ── */}
        <div className="st-card">
          <div className="st-card-header">
            <div className="st-header-icon" style={{ background: "#f0fdf4" }}>
              <History size={17} color="#16a34a" />
            </div>
            <div>
              <div className="st-card-title">History & Data</div>
              <div className="st-card-sub">Access your past records and reports</div>
            </div>
          </div>
          <div className="st-card-body">
            <div className="st-history-grid">
              {[
                { icon: "🦠", bg: "#fef2f2", title: "Pest Detection History",  sub: "14 scans · Last 30 days" },
                { icon: "👨‍🔬", bg: "#f0fdf4", title: "Expert Query History",   sub: "6 queries · Last 30 days" },
                { icon: "🌾", bg: "#fefce8", title: "Crop Recommendation Log", sub: "8 reports · All time" },
                { icon: "📊", bg: "#eff6ff", title: "Weather History",          sub: "30 days · Nashik region" },
              ].map(({ icon, bg, title, sub }) => (
                <div className="st-history-tile" key={title}>
                  <div className="st-history-icon" style={{ background: bg }}>{icon}</div>
                  <div style={{ flex: 1 }}>
                    <div className="st-history-title">{title}</div>
                    <div className="st-history-sub">{sub}</div>
                  </div>
                  <ChevronRight size={15} color="#9ca3af" />
                </div>
              ))}
            </div>

            <div style={{ marginTop: 16, padding: "12px 14px", background: "#fef2f2", borderRadius: 10, border: "1px solid #fecaca", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Database size={15} color="#dc2626" />
                <div>
                  <div style={{ fontSize: "0.83rem", fontWeight: 700, color: "#b91c1c" }}>Clear All Data</div>
                  <div style={{ fontSize: "0.72rem", color: "#9ca3af" }}>Permanently delete your history</div>
                </div>
              </div>
              <button className="st-sec-btn danger">Clear <ChevronRight size={13} /></button>
            </div>
          </div>
        </div>

        {/* ── Save Button ── */}
        <button className="st-save-btn" onClick={handleSave} disabled={saving}>
          {saving
            ? <><Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> Saving changes...</>
            : <><Save size={16} /> Save All Settings</>
          }
        </button>
      </div>

      {/* ── Toast ── */}
      {saved && (
        <div className="st-toast">
          <Check size={16} /> Settings saved successfully!
        </div>
      )}
    </div>
  );
}