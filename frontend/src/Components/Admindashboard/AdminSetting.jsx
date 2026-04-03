import { useState, useRef } from "react";
import {
  Settings2, User, Shield, Users, Microscope,
  Bell, Globe, BarChart3, Camera, Eye, EyeOff,
  Check, ChevronRight, Download, Sun, Moon,
  Lock, Smartphone, AlertCircle, ToggleLeft,
  ToggleRight, Save, RefreshCw, LogOut, Upload,
  FileText, Database, Zap, Mail, MessageSquare,
  UserCheck, SlidersHorizontal, Languages, Wrench,
  KeyRound, ShieldCheck, Activity
} from "lucide-react";

/* ─── REUSABLE COMPONENTS ────────────────────────────── */

function SectionCard({ icon: Icon, title, subtitle, iconBg = "#f0fdf4", iconColor = "#16a34a", children }) {
  return (
    <div style={{
      background: "#fff",
      borderRadius: 16,
      border: "1.5px solid #f0fdf4",
      boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
      overflow: "hidden",
      animation: "fadeSlide 0.3s ease",
    }}>
      {/* Card Header */}
      <div style={{
        padding: "16px 22px",
        borderBottom: "1.5px solid #f3f4f6",
        display: "flex",
        alignItems: "center",
        gap: 12,
        background: "linear-gradient(to right, #f9fafb, #fff)",
      }}>
        <div style={{
          width: 38, height: 38, borderRadius: 11,
          background: iconBg, display: "flex",
          alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <Icon size={18} color={iconColor} />
        </div>
        <div>
          <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#111827", fontFamily: "'Playfair Display', serif" }}>{title}</div>
          {subtitle && <div style={{ fontSize: "0.72rem", color: "#9ca3af", marginTop: 1 }}>{subtitle}</div>}
        </div>
      </div>
      <div style={{ padding: "18px 22px" }}>{children}</div>
    </div>
  );
}

function FieldRow({ label, hint, children }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "12px 0", borderBottom: "1px solid #f9fafb", gap: 16, flexWrap: "wrap",
    }}>
      <div style={{ flex: 1, minWidth: 160 }}>
        <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#111827" }}>{label}</div>
        {hint && <div style={{ fontSize: "0.7rem", color: "#9ca3af", marginTop: 2 }}>{hint}</div>}
      </div>
      <div style={{ flexShrink: 0 }}>{children}</div>
    </div>
  );
}

function Toggle({ value, onChange, disabled }) {
  return (
    <button
      onClick={() => !disabled && onChange(!value)}
      style={{
        width: 44, height: 24, borderRadius: 12,
        background: value ? "#16a34a" : "#d1d5db",
        border: "none", cursor: disabled ? "not-allowed" : "pointer",
        position: "relative", transition: "background 0.2s",
        flexShrink: 0,
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <div style={{
        width: 18, height: 18, borderRadius: "50%", background: "#fff",
        position: "absolute", top: 3,
        left: value ? 23 : 3,
        transition: "left 0.2s",
        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
      }} />
    </button>
  );
}

function InputField({ value, onChange, placeholder, type = "text", icon: Icon }) {
  return (
    <div style={{ position: "relative" }}>
      {Icon && <Icon size={13} color="#9ca3af" style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }} />}
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          padding: Icon ? "8px 10px 8px 30px" : "8px 12px",
          border: "1.5px solid #e5e7eb",
          borderRadius: 9, fontSize: "0.82rem",
          color: "#1f2937", outline: "none",
          fontFamily: "'DM Sans', sans-serif",
          width: 220, boxSizing: "border-box",
          transition: "border-color 0.15s",
        }}
        onFocus={e => e.target.style.borderColor = "#16a34a"}
        onBlur={e => e.target.style.borderColor = "#e5e7eb"}
      />
    </div>
  );
}

function SelectField({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{
        padding: "8px 30px 8px 12px",
        border: "1.5px solid #e5e7eb",
        borderRadius: 9, fontSize: "0.82rem",
        color: "#1f2937", outline: "none",
        fontFamily: "'DM Sans', sans-serif",
        background: "#fff", cursor: "pointer",
        appearance: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 10px center",
        minWidth: 160,
      }}
    >
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}

function ActionBtn({ children, color = "#16a34a", bg = "#f0fdf4", onClick, icon: Icon, border }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        padding: "8px 16px", borderRadius: 9,
        border: border || "none",
        background: bg, color, cursor: "pointer",
        fontSize: "0.78rem", fontWeight: 700,
        fontFamily: "'DM Sans', sans-serif",
        transition: "opacity 0.15s, transform 0.1s",
      }}
      onMouseEnter={e => { e.currentTarget.style.opacity = "0.82"; e.currentTarget.style.transform = "scale(0.97)"; }}
      onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1)"; }}
    >
      {Icon && <Icon size={13} />}
      {children}
    </button>
  );
}

function NumberStepper({ value, onChange, min = 1, max = 100 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0, border: "1.5px solid #e5e7eb", borderRadius: 9, overflow: "hidden" }}>
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        style={{ width: 30, height: 34, background: "#f9fafb", border: "none", cursor: "pointer", fontSize: "1rem", color: "#374151", fontWeight: 700 }}
      >−</button>
      <span style={{ width: 44, textAlign: "center", fontSize: "0.85rem", fontWeight: 700, color: "#111827" }}>{value}</span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        style={{ width: 30, height: 34, background: "#f9fafb", border: "none", cursor: "pointer", fontSize: "1rem", color: "#374151", fontWeight: 700 }}
      >+</button>
    </div>
  );
}

function SaveBanner({ show }) {
  if (!show) return null;
  return (
    <div style={{
      position: "fixed", bottom: 24, right: 24, zIndex: 100,
      background: "#14532d", color: "#fff",
      padding: "12px 20px", borderRadius: 12,
      display: "flex", alignItems: "center", gap: 8,
      fontSize: "0.82rem", fontWeight: 700,
      boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
      animation: "fadeSlide 0.3s ease",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <Check size={15} color="#86efac" /> Settings saved successfully!
    </div>
  );
}

/* ─── NAV TABS ───────────────────────────────────────── */
const NAV_TABS = [
  { key: "profile",       label: "Profile",        icon: User },
  { key: "security",      label: "Security",       icon: Shield },
  { key: "users",         label: "User Mgmt",      icon: Users },
  { key: "experts",       label: "Expert Rules",   icon: Microscope },
  { key: "notifications", label: "Notifications",  icon: Bell },
  { key: "system",        label: "System",         icon: Globe },
  { key: "data",          label: "Data & Reports", icon: BarChart3 },
];

/* ─── MAIN COMPONENT ─────────────────────────────────── */
export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef();

  /* Profile */
  const [adminName, setAdminName]   = useState("Admin KisanSathi");
  const [adminEmail, setAdminEmail] = useState("admin@kisansathi.com");
  const [adminPhone, setAdminPhone] = useState("+91 98765 43210");
  const [adminRole]                 = useState("Super Admin");
  const [avatarColor, setAvatarColor] = useState("#16a34a");
  const [avatarBg, setAvatarBg]       = useState("#dcfce7");

  /* Security */
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw]         = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showPw, setShowPw]       = useState(false);
  const [twoFA, setTwoFA]         = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState("30");

  /* User Management */
  const [allowFarmerReg, setAllowFarmerReg]       = useState(true);
  const [autoApproveFarmer, setAutoApproveFarmer] = useState(true);
  const [requireExpertVerif, setRequireExpertVerif] = useState(true);
  const [allowExpertReg, setAllowExpertReg]         = useState(true);
  const [minAgeReq, setMinAgeReq]                   = useState(false);
  const [kycRequired, setKycRequired]               = useState(false);

  /* Expert Rules */
  const [maxQueriesPerExpert, setMaxQueriesPerExpert] = useState(10);
  const [autoAssign, setAutoAssign]                   = useState(true);
  const [expertAvailability, setExpertAvailability]   = useState(true);
  const [responseDeadline, setResponseDeadline]       = useState("24");
  const [escalateAfter, setEscalateAfter]             = useState(3);
  const [allowExpertReject, setAllowExpertReject]     = useState(true);

  /* Notifications */
  const [emailNotifs, setEmailNotifs]         = useState(true);
  const [systemAlerts, setSystemAlerts]       = useState(true);
  const [farmerAlerts, setFarmerAlerts]       = useState(true);
  const [expertInactivity, setExpertInactivity] = useState(true);
  const [newRegistrations, setNewRegistrations] = useState(false);
  const [dailyDigest, setDailyDigest]           = useState(true);
  const [notifEmail, setNotifEmail]             = useState("admin@kisansathi.com");

  /* System */
  const [theme, setTheme]             = useState("light");
  const [language, setLanguage]       = useState("en");
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [timezone, setTimezone]       = useState("Asia/Kolkata");
  const [dateFormat, setDateFormat]   = useState("DD/MM/YYYY");

  const triggerSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  /* ─── TAB CONTENT ──────────────────────────────────── */
  const renderTab = () => {
    switch (activeTab) {

      /* ── 1. PROFILE ── */
      case "profile":
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <SectionCard icon={User} title="Admin Profile" subtitle="Update your personal information" iconBg="#dcfce7" iconColor="#16a34a">

              {/* Avatar */}
              <div style={{ display: "flex", alignItems: "center", gap: 18, paddingBottom: 18, borderBottom: "1px solid #f3f4f6", marginBottom: 4 }}>
                <div style={{ position: "relative" }}>
                  <div style={{
                    width: 72, height: 72, borderRadius: 20,
                    background: avatarBg, color: avatarColor,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1.4rem", fontWeight: 800, fontFamily: "'Playfair Display', serif",
                    border: "3px solid #dcfce7",
                  }}>
                    {adminName.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()}
                  </div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      position: "absolute", bottom: -4, right: -4,
                      width: 24, height: 24, borderRadius: "50%",
                      background: "#16a34a", border: "2px solid #fff",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    <Camera size={11} color="#fff" />
                  </button>
                  <input ref={fileInputRef} type="file" accept="image/*" style={{ display: "none" }} />
                </div>
                <div>
                  <div style={{ fontSize: "1rem", fontWeight: 800, color: "#111827", fontFamily: "'Playfair Display', serif" }}>{adminName}</div>
                  <div style={{ fontSize: "0.75rem", color: "#9ca3af", marginTop: 2 }}>{adminRole} · KisanSathi Platform</div>
                  <ActionBtn icon={Upload} bg="#f0fdf4" color="#16a34a" onClick={() => fileInputRef.current?.click()}>
                    Upload Photo
                  </ActionBtn>
                </div>
              </div>

              <FieldRow label="Full Name" hint="Your display name on the platform">
                <InputField value={adminName} onChange={setAdminName} placeholder="Admin Name" icon={User} />
              </FieldRow>
              <FieldRow label="Email Address" hint="Used for login and notifications">
                <InputField value={adminEmail} onChange={setAdminEmail} placeholder="admin@kisansathi.com" type="email" icon={Mail} />
              </FieldRow>
              <FieldRow label="Phone Number" hint="Optional, for 2FA SMS">
                <InputField value={adminPhone} onChange={setAdminPhone} placeholder="+91 XXXXX XXXXX" icon={Smartphone} />
              </FieldRow>
              <FieldRow label="Role" hint="Cannot be changed without super admin access">
                <span style={{
                  padding: "5px 12px", borderRadius: 7, background: "#f0fdf4",
                  color: "#16a34a", fontSize: "0.78rem", fontWeight: 700,
                  border: "1px solid #bbf7d0",
                }}>
                  {adminRole}
                </span>
              </FieldRow>

              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 14 }}>
                <ActionBtn icon={Save} bg="linear-gradient(135deg,#14532d,#16a34a)" color="#fff" onClick={triggerSave}>
                  Save Profile
                </ActionBtn>
              </div>
            </SectionCard>
          </div>
        );

      /* ── 2. SECURITY ── */
      case "security":
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <SectionCard icon={Lock} title="Change Password" subtitle="Use a strong password with letters, numbers & symbols" iconBg="#fef2f2" iconColor="#dc2626">
              <FieldRow label="Current Password">
                <div style={{ position: "relative" }}>
                  <InputField value={currentPw} onChange={setCurrentPw} placeholder="••••••••" type={showPw ? "text" : "password"} icon={KeyRound} />
                  <button onClick={() => setShowPw(p => !p)} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer" }}>
                    {showPw ? <EyeOff size={13} color="#9ca3af" /> : <Eye size={13} color="#9ca3af" />}
                  </button>
                </div>
              </FieldRow>
              <FieldRow label="New Password">
                <InputField value={newPw} onChange={setNewPw} placeholder="Min 8 characters" type={showPw ? "text" : "password"} icon={Lock} />
              </FieldRow>
              <FieldRow label="Confirm Password">
                <InputField value={confirmPw} onChange={setConfirmPw} placeholder="Repeat new password" type={showPw ? "text" : "password"} icon={Lock} />
              </FieldRow>
              {newPw && confirmPw && newPw !== confirmPw && (
                <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#dc2626", fontSize: "0.75rem", marginBottom: 8 }}>
                  <AlertCircle size={12} /> Passwords do not match
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 14 }}>
                <ActionBtn icon={Lock} bg="#fef2f2" color="#dc2626" onClick={triggerSave}>Update Password</ActionBtn>
              </div>
            </SectionCard>

            <SectionCard icon={ShieldCheck} title="Security & Access" subtitle="Manage authentication and login settings" iconBg="#fffbeb" iconColor="#d97706">
              <FieldRow label="Two-Factor Authentication" hint="Get OTP via SMS on login">
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Toggle value={twoFA} onChange={setTwoFA} />
                  <span style={{ fontSize: "0.75rem", color: twoFA ? "#16a34a" : "#9ca3af", fontWeight: 600 }}>
                    {twoFA ? "Enabled" : "Disabled"}
                  </span>
                </div>
              </FieldRow>
              <FieldRow label="Login Alerts" hint="Get notified of new logins via email">
                <Toggle value={loginAlerts} onChange={setLoginAlerts} />
              </FieldRow>
              <FieldRow label="Session Timeout" hint="Auto logout after inactivity">
                <SelectField
                  value={sessionTimeout}
                  onChange={setSessionTimeout}
                  options={[
                    { value: "15", label: "15 minutes" },
                    { value: "30", label: "30 minutes" },
                    { value: "60", label: "1 hour" },
                    { value: "120", label: "2 hours" },
                    { value: "never", label: "Never" },
                  ]}
                />
              </FieldRow>
              <FieldRow label="Active Sessions" hint="Manage devices logged in">
                <ActionBtn icon={Activity} bg="#eff6ff" color="#2563eb">View Sessions</ActionBtn>
              </FieldRow>
              <FieldRow label="Danger Zone" hint="This will log you out immediately">
                <ActionBtn icon={LogOut} bg="#fef2f2" color="#dc2626" border="1.5px solid #fecaca">Sign Out All Devices</ActionBtn>
              </FieldRow>
            </SectionCard>
          </div>
        );

      /* ── 3. USER MANAGEMENT ── */
      case "users":
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <SectionCard icon={Users} title="Farmer Registration" subtitle="Control how farmers join the platform" iconBg="#dcfce7" iconColor="#16a34a">
              <FieldRow label="Allow Farmer Registration" hint="New farmers can sign up">
                <Toggle value={allowFarmerReg} onChange={setAllowFarmerReg} />
              </FieldRow>
              <FieldRow label="Auto-Approve Farmers" hint="Skip manual review for farmers">
                <Toggle value={autoApproveFarmer} onChange={setAutoApproveFarmer} disabled={!allowFarmerReg} />
              </FieldRow>
              <FieldRow label="Minimum Age Requirement" hint="Farmers must be 18+ to register">
                <Toggle value={minAgeReq} onChange={setMinAgeReq} />
              </FieldRow>
              <FieldRow label="KYC Verification Required" hint="Aadhaar/ID verification before access">
                <Toggle value={kycRequired} onChange={setKycRequired} />
              </FieldRow>
            </SectionCard>

            <SectionCard icon={UserCheck} title="Expert Registration" subtitle="Control how experts apply and get approved" iconBg="#fffbeb" iconColor="#d97706">
              <FieldRow label="Allow Expert Applications" hint="New experts can apply to join">
                <Toggle value={allowExpertReg} onChange={setAllowExpertReg} />
              </FieldRow>
              <FieldRow label="Require Expert Verification" hint="Manual approval before experts go live">
                <Toggle value={requireExpertVerif} onChange={setRequireExpertVerif} />
              </FieldRow>
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 14 }}>
                <ActionBtn icon={Save} bg="linear-gradient(135deg,#14532d,#16a34a)" color="#fff" onClick={triggerSave}>Save Settings</ActionBtn>
              </div>
            </SectionCard>
          </div>
        );

      /* ── 4. EXPERT RULES ── */
      case "experts":
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <SectionCard icon={Microscope} title="Query Management" subtitle="Define how farmer queries are handled by experts" iconBg="#ede9fe" iconColor="#7c3aed">
              <FieldRow label="Max Queries per Expert" hint="Hard limit on active cases per expert">
                <NumberStepper value={maxQueriesPerExpert} onChange={setMaxQueriesPerExpert} min={1} max={50} />
              </FieldRow>
              <FieldRow label="Auto-Assign Queries" hint="Automatically route new queries to available experts">
                <Toggle value={autoAssign} onChange={setAutoAssign} />
              </FieldRow>
              <FieldRow label="Response Deadline" hint="Time limit for expert to respond">
                <SelectField
                  value={responseDeadline}
                  onChange={setResponseDeadline}
                  options={[
                    { value: "6", label: "6 hours" },
                    { value: "12", label: "12 hours" },
                    { value: "24", label: "24 hours" },
                    { value: "48", label: "48 hours" },
                  ]}
                />
              </FieldRow>
              <FieldRow label="Escalate After (days)" hint="Auto-escalate unanswered queries to admin">
                <NumberStepper value={escalateAfter} onChange={setEscalateAfter} min={1} max={7} />
              </FieldRow>
            </SectionCard>

            <SectionCard icon={Zap} title="Expert Behaviour" subtitle="Control expert availability and permissions" iconBg="#cffafe" iconColor="#0891b2">
              <FieldRow label="Expert Availability Toggle" hint="Allow experts to mark themselves unavailable">
                <Toggle value={expertAvailability} onChange={setExpertAvailability} />
              </FieldRow>
              <FieldRow label="Allow Experts to Reject Queries" hint="Experts can decline assigned queries">
                <Toggle value={allowExpertReject} onChange={setAllowExpertReject} />
              </FieldRow>
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 14 }}>
                <ActionBtn icon={Save} bg="linear-gradient(135deg,#14532d,#16a34a)" color="#fff" onClick={triggerSave}>Save Rules</ActionBtn>
              </div>
            </SectionCard>
          </div>
        );

      /* ── 5. NOTIFICATIONS ── */
      case "notifications":
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <SectionCard icon={Bell} title="Notification Preferences" subtitle="Choose which alerts you receive" iconBg="#dcfce7" iconColor="#16a34a">
              <FieldRow label="Email Notifications" hint="Receive alerts at your registered email">
                <Toggle value={emailNotifs} onChange={setEmailNotifs} />
              </FieldRow>
              <FieldRow label="Notification Email" hint="Override the default email for alerts">
                <InputField value={notifEmail} onChange={setNotifEmail} placeholder="email@kisansathi.com" icon={Mail} />
              </FieldRow>
              <FieldRow label="Daily Digest" hint="Get a summary email every morning at 8 AM">
                <Toggle value={dailyDigest} onChange={setDailyDigest} />
              </FieldRow>
            </SectionCard>

            <SectionCard icon={AlertCircle} title="Alert Types" subtitle="Fine-tune which events trigger notifications" iconBg="#fef2f2" iconColor="#dc2626">
              {[
                { label: "🌾 New Farmer Query",      hint: "Alert on each new crop query",               val: farmerAlerts,    set: setFarmerAlerts },
                { label: "📊 System Alerts",          hint: "High backlog or system errors",              val: systemAlerts,    set: setSystemAlerts },
                { label: "⚠️ Expert Inactivity",      hint: "Notify when expert is inactive 2+ days",     val: expertInactivity, set: setExpertInactivity },
                { label: "🆕 New Registrations",      hint: "New farmer or expert sign-ups",              val: newRegistrations, set: setNewRegistrations },
              ].map(({ label, hint, val, set }) => (
                <FieldRow key={label} label={label} hint={hint}>
                  <Toggle value={val} onChange={set} />
                </FieldRow>
              ))}
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 14 }}>
                <ActionBtn icon={Save} bg="linear-gradient(135deg,#14532d,#16a34a)" color="#fff" onClick={triggerSave}>Save Preferences</ActionBtn>
              </div>
            </SectionCard>
          </div>
        );

      /* ── 6. SYSTEM ── */
      case "system":
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <SectionCard icon={Globe} title="Platform Configuration" subtitle="Language, appearance and regional settings" iconBg="#ede9fe" iconColor="#7c3aed">
              <FieldRow label="Language" hint="Interface language">
                <SelectField
                  value={language}
                  onChange={setLanguage}
                  options={[
                    { value: "en", label: "🇬🇧 English" },
                    { value: "hi", label: "🇮🇳 Hindi (coming soon)" },
                    { value: "mr", label: "🇮🇳 Marathi (coming soon)" },
                  ]}
                />
              </FieldRow>
              <FieldRow label="Theme" hint="Light or dark admin interface">
                <div style={{ display: "flex", gap: 8 }}>
                  {[
                    { val: "light", label: "Light", icon: Sun },
                    { val: "dark",  label: "Dark",  icon: Moon },
                  ].map(({ val, label, icon: Icon }) => (
                    <button
                      key={val}
                      onClick={() => setTheme(val)}
                      style={{
                        display: "inline-flex", alignItems: "center", gap: 5,
                        padding: "7px 14px", borderRadius: 9,
                        border: `1.5px solid ${theme === val ? "#16a34a" : "#e5e7eb"}`,
                        background: theme === val ? "#f0fdf4" : "#fff",
                        color: theme === val ? "#16a34a" : "#6b7280",
                        cursor: "pointer", fontSize: "0.78rem", fontWeight: 700,
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      <Icon size={13} /> {label}
                    </button>
                  ))}
                </div>
              </FieldRow>
              <FieldRow label="Timezone" hint="All timestamps shown in this timezone">
                <SelectField
                  value={timezone}
                  onChange={setTimezone}
                  options={[
                    { value: "Asia/Kolkata", label: "IST (UTC+5:30)" },
                    { value: "UTC", label: "UTC" },
                  ]}
                />
              </FieldRow>
              <FieldRow label="Date Format" hint="Display format for all dates">
                <SelectField
                  value={dateFormat}
                  onChange={setDateFormat}
                  options={[
                    { value: "DD/MM/YYYY", label: "DD/MM/YYYY" },
                    { value: "MM/DD/YYYY", label: "MM/DD/YYYY" },
                    { value: "YYYY-MM-DD", label: "YYYY-MM-DD" },
                  ]}
                />
              </FieldRow>
            </SectionCard>

            <SectionCard icon={Wrench} title="Maintenance" subtitle="Platform availability controls" iconBg="#fef2f2" iconColor="#dc2626">
              <FieldRow label="Maintenance Mode" hint="Platform shows a maintenance page to all users">
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Toggle value={maintenanceMode} onChange={setMaintenanceMode} />
                  {maintenanceMode && (
                    <span style={{
                      padding: "3px 9px", borderRadius: 6,
                      background: "#fef2f2", color: "#dc2626",
                      fontSize: "0.68rem", fontWeight: 700, border: "1px solid #fecaca",
                    }}>
                      ⚠️ Platform is DOWN
                    </span>
                  )}
                </div>
              </FieldRow>
              <FieldRow label="Clear Cache" hint="Force refresh all cached data">
                <ActionBtn icon={RefreshCw} bg="#fffbeb" color="#d97706">Clear Cache</ActionBtn>
              </FieldRow>
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 14 }}>
                <ActionBtn icon={Save} bg="linear-gradient(135deg,#14532d,#16a34a)" color="#fff" onClick={triggerSave}>Save Config</ActionBtn>
              </div>
            </SectionCard>
          </div>
        );

      /* ── 7. DATA & REPORTS ── */
      case "data":
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <SectionCard icon={Download} title="Export Data" subtitle="Download platform data for analysis or backup" iconBg="#dcfce7" iconColor="#16a34a">
              {[
                { label: "All Farmer Data",    hint: "Names, locations, queries — CSV",   icon: Users,       color: "#16a34a", bg: "#f0fdf4" },
                { label: "All Expert Data",    hint: "Profiles, ratings, case count",     icon: Microscope,  color: "#7c3aed", bg: "#ede9fe" },
                { label: "Query Reports",      hint: "All queries with status & response",icon: MessageSquare, color: "#0891b2", bg: "#ecfeff" },
                { label: "Complaint Log",      hint: "All complaints and resolutions",    icon: AlertCircle, color: "#dc2626", bg: "#fef2f2" },
                { label: "Full System Backup", hint: "Complete data dump — Excel format", icon: Database,    color: "#d97706", bg: "#fffbeb" },
              ].map(({ label, hint, icon: Icon, color, bg }) => (
                <FieldRow key={label} label={label} hint={hint}>
                  <ActionBtn icon={Download} bg={bg} color={color}>Download CSV</ActionBtn>
                </FieldRow>
              ))}
            </SectionCard>

            <SectionCard icon={BarChart3} title="Analytics Control" subtitle="Manage what data is tracked and for how long" iconBg="#fffbeb" iconColor="#d97706">
              <FieldRow label="Data Retention Period" hint="How long to keep logs and analytics">
                <SelectField
                  value="90"
                  onChange={() => {}}
                  options={[
                    { value: "30", label: "30 days" },
                    { value: "90", label: "90 days" },
                    { value: "180", label: "6 months" },
                    { value: "365", label: "1 year" },
                  ]}
                />
              </FieldRow>
              <FieldRow label="Usage Analytics" hint="Track admin panel usage for improvements">
                <Toggle value={true} onChange={() => {}} />
              </FieldRow>
              <FieldRow label="Generate Monthly Report" hint="Get auto-generated PDF every 1st of month">
                <Toggle value={true} onChange={() => {}} />
              </FieldRow>
              <div style={{ marginTop: 16, padding: "14px 16px", background: "#f0fdf4", borderRadius: 10, border: "1px solid #bbf7d0" }}>
                <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#14532d", marginBottom: 4 }}>📊 Last Report Generated</div>
                <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>April 1, 2026 · 847 farmers · 12 experts · 2,341 queries resolved</div>
                <ActionBtn icon={FileText} bg="#fff" color="#16a34a" border="1.5px solid #bbf7d0">
                  View Report
                </ActionBtn>
              </div>
            </SectionCard>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", background: "#f9fafb" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@300;400;500;600;700;800&display=swap');
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .s-nav-btn {
          display: flex; align-items: center; gap: 9px;
          width: 100%; padding: 10px 14px; border-radius: 10px;
          border: none; background: transparent; cursor: pointer;
          font-size: 0.82rem; font-weight: 600; color: #6b7280;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.15s; text-align: left;
          white-space: nowrap;
        }
        .s-nav-btn:hover { background: #f0fdf4; color: #16a34a; }
        .s-nav-btn.active { background: #f0fdf4; color: #16a34a; font-weight: 800; }
        .s-nav-btn.active .s-nav-icon { color: #16a34a; }
      `}</style>

      {/* ── PAGE HEADER ── */}
      <div style={{
        background: "linear-gradient(135deg, #14532d 0%, #166534 60%, #15803d 100%)",
        padding: "24px 28px 28px",
        borderBottom: "1.5px solid #dcfce7",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Settings2 size={22} color="#86efac" />
          <div>
            <h1 style={{
              margin: 0, fontSize: "1.5rem", fontWeight: 800, color: "#fff",
              fontFamily: "'Playfair Display', serif", letterSpacing: "-0.01em",
            }}>
              Settings
            </h1>
            <p style={{ margin: 0, color: "#86efac", fontSize: "0.82rem" }}>
              Manage your profile, security, and platform configuration.
            </p>
          </div>
        </div>
      </div>

      {/* ── BODY: SIDEBAR + CONTENT ── */}
      <div style={{ display: "flex", gap: 0, padding: "24px", alignItems: "flex-start" }}>

        {/* SIDEBAR NAV */}
        <div style={{
          width: 210, flexShrink: 0, background: "#fff",
          borderRadius: 16, border: "1.5px solid #f0fdf4",
          boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
          padding: "12px 10px",
          position: "sticky", top: 24,
          marginRight: 20,
        }}>
          <div style={{ fontSize: "0.65rem", fontWeight: 700, color: "#9ca3af", letterSpacing: "0.08em", textTransform: "uppercase", padding: "4px 14px 8px" }}>
            Configuration
          </div>
          {NAV_TABS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              className={`s-nav-btn${activeTab === key ? " active" : ""}`}
              onClick={() => setActiveTab(key)}
            >
              <Icon size={15} className="s-nav-icon" style={{ color: activeTab === key ? "#16a34a" : "#9ca3af", flexShrink: 0 }} />
              {label}
              {activeTab === key && <ChevronRight size={13} style={{ marginLeft: "auto", color: "#16a34a" }} />}
            </button>
          ))}
        </div>

        {/* CONTENT AREA */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {renderTab()}
        </div>
      </div>

      <SaveBanner show={saved} />
    </div>
  );
}