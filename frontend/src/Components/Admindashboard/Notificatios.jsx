import { useState } from "react";
import {
  Bell, BellRing, CheckCheck, Filter,
  Eye, CheckCircle, XCircle, MessageSquare,
  UserPlus, AlertTriangle, ShieldAlert, Clock,
  Send, RefreshCw, Leaf, BarChart3, ChevronRight,
  Circle, Inbox
} from "lucide-react";

/* ─── MOCK DATA ──────────────────────────────────────── */
const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    type: "farmer_query",
    urgency: "urgent",
    unread: true,
    time: "2 min ago",
    farmer: "Raj Kumar",
    farmerLocation: "Punjab",
    crop: "Wheat",
    issue: "Leaves turning yellow at the tips. Spreading fast.",
    avatar: "RK",
    avatarBg: "#dcfce7",
    avatarColor: "#16a34a",
    assignedTo: null,
  },
  {
    id: 2,
    type: "expert_pending",
    urgency: "urgent",
    unread: true,
    time: "18 min ago",
    expert: "Dr. Priya Iyer",
    specialization: "Plant Pathology",
    location: "Tamil Nadu",
    avatar: "PI",
    avatarBg: "#fef9c3",
    avatarColor: "#ca8a04",
    appliedDate: "Apr 2, 2026",
  },
  {
    id: 3,
    type: "complaint",
    urgency: "urgent",
    unread: true,
    time: "45 min ago",
    complainant: "Farmer Meena Devi",
    against: "Dr. Vikram Joshi",
    reason: "No response for 4 days on critical pest infestation.",
    severity: "High",
    avatar: "VJ",
    avatarBg: "#fee2e2",
    avatarColor: "#dc2626",
  },
  {
    id: 4,
    type: "expert_inactive",
    urgency: "warning",
    unread: true,
    time: "2 hrs ago",
    expert: "Dr. Neha Kulkarni",
    inactiveDays: 3,
    pendingCases: 7,
    avatar: "NK",
    avatarBg: "#ffedd5",
    avatarColor: "#ea580c",
  },
  {
    id: 5,
    type: "expert_activity",
    urgency: "info",
    unread: false,
    time: "3 hrs ago",
    expert: "Dr. Anjali Nair",
    action: "responded to 5 farmer queries",
    avatar: "AN",
    avatarBg: "#dcfce7",
    avatarColor: "#16a34a",
  },
  {
    id: 6,
    type: "new_registrations",
    urgency: "info",
    unread: true,
    time: "5 hrs ago",
    farmerCount: 12,
    expertCount: 3,
  },
  {
    id: 7,
    type: "farmer_query",
    urgency: "urgent",
    unread: false,
    time: "6 hrs ago",
    farmer: "Suresh Yadav",
    farmerLocation: "Haryana",
    crop: "Paddy",
    issue: "Black spots on stem. 30% crop affected.",
    avatar: "SY",
    avatarBg: "#ede9fe",
    avatarColor: "#7c3aed",
    assignedTo: null,
  },
  {
    id: 8,
    type: "system_alert",
    urgency: "warning",
    unread: false,
    time: "8 hrs ago",
    pendingQueries: 45,
    avgWait: "6.2 hrs",
  },
  {
    id: 9,
    type: "expert_pending",
    urgency: "urgent",
    unread: false,
    time: "Yesterday",
    expert: "Dr. Kiran Rao",
    specialization: "Irrigation & Water Mgmt",
    location: "Andhra Pradesh",
    avatar: "KR",
    avatarBg: "#cffafe",
    avatarColor: "#0891b2",
    appliedDate: "Apr 1, 2026",
  },
  {
    id: 10,
    type: "expert_activity",
    urgency: "info",
    unread: false,
    time: "Yesterday",
    expert: "Dr. Ramesh Sharma",
    action: "closed 8 cases with avg rating 4.9",
    avatar: "RS",
    avatarBg: "#cffafe",
    avatarColor: "#0891b2",
  },
];

const EXPERTS_LIST = ["Dr. Anjali Nair", "Dr. Ramesh Sharma", "Dr. Suresh Patil", "Dr. Kiran Rao"];

const FILTER_TABS = [
  { key: "all", label: "All", icon: Bell },
  { key: "urgent", label: "Urgent", icon: AlertTriangle },
  { key: "expert_activity", label: "Expert Activity", icon: CheckCircle },
  { key: "farmer_query", label: "Farmer Queries", icon: Leaf },
  { key: "system", label: "System", icon: BarChart3 },
];

/* ─── URGENCY CONFIG ──────────────────────────────────── */
const URGENCY = {
  urgent: { dot: "#ef4444", border: "#fca5a5", leftBar: "#ef4444", bg: "#fff5f5" },
  warning: { dot: "#f59e0b", border: "#fcd34d", leftBar: "#f59e0b", bg: "#fffbeb" },
  info: { dot: "#16a34a", border: "#86efac", leftBar: "#16a34a", bg: "#f0fdf4" },
};

/* ─── ACTION BUTTON ───────────────────────────────────── */
function Btn({ children, color = "#16a34a", bg = "#f0fdf4", onClick, icon: Icon, size = "sm" }) {
  const pad = size === "sm" ? "5px 11px" : "7px 15px";
  return (
    <button
      onClick={onClick}
      style={{
        display: "inline-flex", alignItems: "center", gap: 5,
        padding: pad, borderRadius: 8, border: "none",
        background: bg, color, cursor: "pointer",
        fontSize: "0.72rem", fontWeight: 700,
        fontFamily: "'DM Sans', sans-serif",
        transition: "opacity 0.15s, transform 0.1s",
        whiteSpace: "nowrap",
      }}
      onMouseEnter={e => { e.currentTarget.style.opacity = "0.82"; e.currentTarget.style.transform = "scale(0.97)"; }}
      onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1)"; }}
    >
      {Icon && <Icon size={12} />}
      {children}
    </button>
  );
}

/* ─── AVATAR ─────────────────────────────────────────── */
function Avatar({ initials, bg, color, size = 40 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: 12, flexShrink: 0,
      background: bg, color,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size > 36 ? "0.75rem" : "0.65rem", fontWeight: 800,
    }}>
      {initials}
    </div>
  );
}

/* ─── NOTIFICATION CARD ───────────────────────────────── */
function NotificationCard({ notif, onRead, onAction }) {
  const u = URGENCY[notif.urgency];
  const [assignOpen, setAssignOpen] = useState(false);
  const [actionDone, setActionDone] = useState({});

  const markDone = (key) => {
    setActionDone(p => ({ ...p, [key]: true }));
    onRead(notif.id);
  };

  const renderBody = () => {
    switch (notif.type) {

      case "farmer_query":
        return (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <Avatar initials={notif.avatar} bg={notif.avatarBg} color={notif.avatarColor} />
              <div>
                <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "#111827" }}>
                  New Query from <span style={{ color: "#16a34a" }}>{notif.farmer}</span>
                </div>
                <div style={{ fontSize: "0.72rem", color: "#9ca3af" }}>{notif.farmerLocation} · {notif.crop}</div>
              </div>
            </div>
            <div style={{
              background: "#f8fafc", border: "1px solid #e5e7eb", borderRadius: 8,
              padding: "8px 12px", fontSize: "0.8rem", color: "#374151",
              fontStyle: "italic", marginBottom: 10, lineHeight: 1.5,
            }}>
              "{notif.issue}"
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              <Btn icon={Eye} bg="#eff6ff" color="#2563eb">View Request</Btn>
              <div style={{ position: "relative" }}>
                <Btn icon={Send} bg="#f0fdf4" color="#16a34a" onClick={() => setAssignOpen(p => !p)}>
                  Assign Expert ▾
                </Btn>
                {assignOpen && (
                  <div style={{
                    position: "absolute", top: "110%", left: 0, zIndex: 20,
                    background: "#fff", border: "1.5px solid #e5e7eb", borderRadius: 10,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.1)", minWidth: 200, overflow: "hidden",
                  }}>
                    {EXPERTS_LIST.map(ex => (
                      <div
                        key={ex}
                        onClick={() => { setAssignOpen(false); markDone("assign"); }}
                        style={{
                          padding: "9px 14px", fontSize: "0.78rem", color: "#374151",
                          cursor: "pointer", fontWeight: 500,
                          borderBottom: "1px solid #f3f4f6",
                          transition: "background 0.12s",
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = "#f0fdf4"}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                      >
                        {ex}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case "expert_pending":
        return (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <Avatar initials={notif.avatar} bg={notif.avatarBg} color={notif.avatarColor} />
              <div>
                <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "#111827" }}>
                  Expert Approval Pending
                </div>
                <div style={{ fontSize: "0.82rem", color: "#374151", fontWeight: 600 }}>{notif.expert}</div>
                <div style={{ fontSize: "0.72rem", color: "#9ca3af" }}>{notif.specialization} · {notif.location} · Applied {notif.appliedDate}</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              <Btn icon={Eye} bg="#eff6ff" color="#2563eb">View Profile</Btn>
              {!actionDone.approved && !actionDone.rejected ? (
                <>
                  <Btn icon={CheckCircle} bg="#f0fdf4" color="#16a34a" onClick={() => markDone("approved")}>Approve</Btn>
                  <Btn icon={XCircle} bg="#fef2f2" color="#dc2626" onClick={() => markDone("rejected")}>Reject</Btn>
                </>
              ) : (
                <span style={{
                  fontSize: "0.72rem", fontWeight: 700,
                  color: actionDone.approved ? "#16a34a" : "#dc2626",
                  display: "flex", alignItems: "center", gap: 4,
                }}>
                  <CheckCircle size={12} /> {actionDone.approved ? "Approved" : "Rejected"}
                </span>
              )}
            </div>
          </div>
        );

      case "complaint":
        return (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                background: "#fef2f2", display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <ShieldAlert size={18} color="#dc2626" />
              </div>
              <div>
                <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "#111827" }}>
                  Complaint Filed
                </div>
                <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>
                  By <span style={{ color: "#374151", fontWeight: 600 }}>{notif.complainant}</span> against <span style={{ color: "#dc2626", fontWeight: 700 }}>{notif.against}</span>
                </div>
              </div>
              <span style={{
                marginLeft: "auto", padding: "2px 9px", borderRadius: 6,
                background: "#fef2f2", color: "#dc2626", fontSize: "0.68rem", fontWeight: 700,
                border: "1px solid #fecaca",
              }}>
                {notif.severity} Severity
              </span>
            </div>
            <div style={{
              background: "#fff5f5", border: "1px solid #fecaca", borderRadius: 8,
              padding: "8px 12px", fontSize: "0.78rem", color: "#7f1d1d",
              marginBottom: 10, lineHeight: 1.5,
            }}>
              {notif.reason}
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              <Btn icon={Eye} bg="#fef2f2" color="#dc2626">View Details</Btn>
              <Btn icon={CheckCircle} bg="#f0fdf4" color="#16a34a">Resolve</Btn>
            </div>
          </div>
        );

      case "expert_inactive":
        return (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <Avatar initials={notif.avatar} bg={notif.avatarBg} color={notif.avatarColor} />
              <div>
                <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "#111827" }}>
                  Expert Inactive Warning
                </div>
                <div style={{ fontSize: "0.82rem", color: "#374151", fontWeight: 600 }}>{notif.expert}</div>
                <div style={{ fontSize: "0.72rem", color: "#9ca3af" }}>
                  Inactive for <span style={{ color: "#ea580c", fontWeight: 700 }}>{notif.inactiveDays} days</span> · <span style={{ color: "#d97706" }}>{notif.pendingCases} cases pending</span>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              <Btn icon={Send} bg="#fffbeb" color="#d97706">Send Reminder</Btn>
              <Btn icon={RefreshCw} bg="#eff6ff" color="#2563eb">Reassign Cases</Btn>
            </div>
          </div>
        );

      case "expert_activity":
        return (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Avatar initials={notif.avatar} bg={notif.avatarBg} color={notif.avatarColor} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "0.86rem", fontWeight: 700, color: "#111827" }}>
                <span style={{ color: "#16a34a" }}>{notif.expert}</span> {notif.action}
              </div>
              <div style={{ fontSize: "0.72rem", color: "#9ca3af", marginTop: 2 }}>Expert Activity · {notif.time}</div>
            </div>
            <Btn icon={Eye} bg="#f0fdf4" color="#16a34a">View</Btn>
          </div>
        );

      case "new_registrations":
        return (
          <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12,
              background: "#f0fdf4", display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <UserPlus size={18} color="#16a34a" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "#111827" }}>New Registrations Today</div>
              <div style={{ display: "flex", gap: 14, marginTop: 4 }}>
                <span style={{ fontSize: "0.78rem", color: "#374151" }}>
                  🌾 <span style={{ fontWeight: 700, color: "#16a34a" }}>{notif.farmerCount}</span> new farmers
                </span>
                <span style={{ fontSize: "0.78rem", color: "#374151" }}>
                  🧑‍🔬 <span style={{ fontWeight: 700, color: "#d97706" }}>{notif.expertCount}</span> experts pending
                </span>
              </div>
            </div>
            <Btn icon={ChevronRight} bg="#f0fdf4" color="#16a34a">Review</Btn>
          </div>
        );

      case "system_alert":
        return (
          <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12,
              background: "#fffbeb", display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <BarChart3 size={18} color="#d97706" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "#111827" }}>High Query Backlog</div>
              <div style={{ fontSize: "0.78rem", color: "#6b7280", marginTop: 2 }}>
                <span style={{ fontWeight: 700, color: "#d97706" }}>{notif.pendingQueries} queries</span> pending · avg wait <span style={{ fontWeight: 700, color: "#ea580c" }}>{notif.avgWait}</span>
              </div>
            </div>
            <Btn icon={RefreshCw} bg="#fffbeb" color="#d97706">Auto-Assign</Btn>
          </div>
        );

      default:
        return null;
    }
  };

  const typeLabels = {
    farmer_query: { label: "🌾 Farmer Query", color: "#16a34a", bg: "#f0fdf4" },
    expert_pending: { label: "⏳ Pending Approval", color: "#d97706", bg: "#fffbeb" },
    complaint: { label: "🚫 Complaint", color: "#dc2626", bg: "#fef2f2" },
    expert_inactive: { label: "⚠️ Inactive Warning", color: "#ea580c", bg: "#fff7ed" },
    expert_activity: { label: "✅ Expert Activity", color: "#0891b2", bg: "#ecfeff" },
    new_registrations: { label: "🆕 New Users", color: "#7c3aed", bg: "#ede9fe" },
    system_alert: { label: "📊 System Alert", color: "#d97706", bg: "#fffbeb" },
  };

  const tag = typeLabels[notif.type];

  return (
    <div
      onClick={() => onRead(notif.id)}
      style={{
        background: notif.unread ? u.bg : "#fff",
        border: `1.5px solid ${notif.unread ? u.border : "#f3f4f6"}`,
        borderLeft: `4px solid ${notif.unread ? u.leftBar : "#e5e7eb"}`,
        borderRadius: 14,
        padding: "16px 18px",
        cursor: "default",
        transition: "all 0.2s",
        position: "relative",
        animation: "fadeSlide 0.3s ease",
      }}
    >
      {/* Header row */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        {notif.unread && (
          <span style={{
            width: 8, height: 8, borderRadius: "50%",
            background: u.dot, display: "inline-block", flexShrink: 0,
          }} />
        )}
        <span style={{
          padding: "2px 9px", borderRadius: 6, fontSize: "0.68rem", fontWeight: 700,
          background: tag.bg, color: tag.color, border: `1px solid ${tag.bg}`,
        }}>
          {tag.label}
        </span>
        <span style={{ marginLeft: "auto", fontSize: "0.7rem", color: "#9ca3af", display: "flex", alignItems: "center", gap: 3 }}>
          <Clock size={10} /> {notif.time}
        </span>
      </div>

      {renderBody()}
    </div>
  );
}

/* ─── MAIN PAGE ───────────────────────────────────────── */
export default function Notifications() {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [activeFilter, setActiveFilter] = useState("all");

  const unreadCount = notifications.filter(n => n.unread).length;
  const urgentCount = notifications.filter(n => n.urgency === "urgent").length;
  const infoCount   = notifications.filter(n => n.urgency === "info").length;

  const handleRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const filtered = notifications.filter(n => {
    if (activeFilter === "all") return true;
    if (activeFilter === "urgent") return n.urgency === "urgent";
    if (activeFilter === "expert_activity") return ["expert_activity", "expert_inactive", "expert_pending", "complaint"].includes(n.type);
    if (activeFilter === "farmer_query") return n.type === "farmer_query";
    if (activeFilter === "system") return ["system_alert", "new_registrations"].includes(n.type);
    return true;
  });

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", background: "#f9fafb" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@300;400;500;600;700;800&display=swap');
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .notif-filter-btn {
          display: inline-flex; align-items: center; gap: 5px;
          border: 1.5px solid #e5e7eb; background: #fff; border-radius: 9px;
          padding: 7px 14px; font-size: 0.78rem; font-weight: 600;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: all 0.15s; color: #6b7280; white-space: nowrap;
        }
        .notif-filter-btn.active {
          background: #f0fdf4; border-color: #16a34a; color: #16a34a;
        }
        .notif-filter-btn:hover { border-color: #16a34a; color: #16a34a; }
      `}</style>

      {/* ── PAGE HEADER ── */}
      <div style={{
        background: "linear-gradient(135deg, #14532d 0%, #166534 60%, #15803d 100%)",
        padding: "24px 28px 28px",
        borderBottom: "1.5px solid #dcfce7",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <BellRing size={22} color="#86efac" />
              <h1 style={{
                margin: 0, fontSize: "1.5rem", fontWeight: 800, color: "#fff",
                fontFamily: "'Playfair Display', serif", letterSpacing: "-0.01em",
              }}>
                Notifications
              </h1>
              {unreadCount > 0 && (
                <span style={{
                  background: "#ef4444", color: "#fff",
                  borderRadius: 20, padding: "2px 9px",
                  fontSize: "0.72rem", fontWeight: 800,
                }}>
                  {unreadCount} new
                </span>
              )}
            </div>
            <p style={{ margin: 0, color: "#86efac", fontSize: "0.82rem" }}>
              Stay on top of farmer queries, expert activity, and system alerts.
            </p>
          </div>

          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "9px 16px", borderRadius: 10,
                background: "rgba(255,255,255,0.12)", border: "1.5px solid rgba(255,255,255,0.25)",
                color: "#fff", cursor: "pointer", fontSize: "0.78rem", fontWeight: 700,
                fontFamily: "'DM Sans', sans-serif", transition: "background 0.15s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.12)"}
            >
              <CheckCheck size={14} /> Mark all read
            </button>
          )}
        </div>
      </div>

      <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 18 }}>

        {/* ── SUMMARY CARDS ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 12 }}>
          {[
            { label: "Total",  val: notifications.length, color: "#14532d", border: "#bbf7d0", accent: "#f0fdf4" },
            { label: "Urgent", val: urgentCount,           color: "#dc2626", border: "#fca5a5", accent: "#fff5f5" },
            { label: "Unread", val: unreadCount,           color: "#d97706", border: "#fcd34d", accent: "#fffbeb" },
            { label: "Info",   val: infoCount,             color: "#0891b2", border: "#a5f3fc", accent: "#ecfeff" },
          ].map(({ label, val, color, border, accent }) => (
            <div key={label} style={{
              background: "#fff", borderRadius: 14, padding: "14px 18px",
              border: `1.5px solid ${border}`,
              boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
              animation: "fadeSlide 0.3s ease",
            }}>
              <div style={{ fontSize: "1.75rem", fontWeight: 800, color, fontFamily: "'Playfair Display', serif" }}>{val}</div>
              <div style={{ fontSize: "0.74rem", color: "#6b7280", fontWeight: 500, marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* ── FILTER TABS ── */}
        <div style={{
          background: "#fff", borderRadius: 14, padding: "14px 18px",
          border: "1.5px solid #f0fdf4", boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
          display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap",
        }}>
          <Filter size={14} color="#9ca3af" />
          {FILTER_TABS.map(({ key, label, icon: Icon }) => {
            const count = key === "all" ? notifications.length
              : key === "urgent" ? notifications.filter(n => n.urgency === "urgent").length
              : key === "expert_activity" ? notifications.filter(n => ["expert_activity", "expert_inactive", "expert_pending", "complaint"].includes(n.type)).length
              : key === "farmer_query" ? notifications.filter(n => n.type === "farmer_query").length
              : notifications.filter(n => ["system_alert", "new_registrations"].includes(n.type)).length;
            return (
              <button
                key={key}
                className={`notif-filter-btn${activeFilter === key ? " active" : ""}`}
                onClick={() => setActiveFilter(key)}
              >
                <Icon size={12} />
                {label}
                <span style={{
                  marginLeft: 3, borderRadius: 4, padding: "0 5px",
                  fontSize: "0.66rem", fontWeight: 700,
                  background: activeFilter === key ? "#dcfce7" : "#f3f4f6",
                  color: activeFilter === key ? "#16a34a" : "#9ca3af",
                }}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── NOTIFICATION LIST ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {filtered.length === 0 ? (
            <div style={{
              background: "#fff", borderRadius: 16, padding: "60px 24px",
              border: "1.5px solid #f0fdf4", textAlign: "center",
            }}>
              <Inbox size={36} color="#d1fae5" style={{ marginBottom: 10 }} />
              <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "#9ca3af" }}>No notifications here</div>
            </div>
          ) : (
            filtered.map(notif => (
              <NotificationCard
                key={notif.id}
                notif={notif}
                onRead={handleRead}
                onAction={() => {}}
              />
            ))
          )}
        </div>

        {/* ── FOOTER ── */}
        <div style={{
          textAlign: "center", fontSize: "0.74rem", color: "#9ca3af",
          paddingBottom: 16,
        }}>
          {filtered.length} notification{filtered.length !== 1 ? "s" : ""} shown · Last refreshed just now
        </div>
      </div>
    </div>
  );
}