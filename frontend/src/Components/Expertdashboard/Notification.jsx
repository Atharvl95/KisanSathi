import { useState, useMemo } from "react";
import {
  Bell, MessageSquare, AlertCircle, Star, TrendingUp,
  Megaphone, RefreshCw, Clock, CheckCheck, Check,
  Trash2, Filter, Search, X, Eye, Send, ChevronRight,
  BellOff, Zap
} from "lucide-react";
import { ExpertPageHeader } from "../../Pages/Expertdash/Expertdash";

/* ─────────────────────────────────────────
   STYLES
───────────────────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');

  .nf-root { font-family: 'DM Sans', sans-serif; background: #f0f7ff; min-height: 100vh; }
  .nf-body { padding: 24px; }

  /* ── Banner ── */
  .nf-tip-card {
    background: linear-gradient(135deg, #1a365d, #3182ce);
    border-radius: 16px; padding: 20px; color: #fff;
    margin-bottom: 24px; display: flex; align-items: center; gap: 16px;
  }

  /* ── Stat cards ── */
  .nf-stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(165px, 1fr));
    gap: 16px; margin-bottom: 24px;
  }
  .nf-stat-card {
    background: #fff; border-radius: 16px;
    padding: 20px; border: 1px solid #ebf8ff;
    display: flex; flex-direction: column; gap: 10px;
    transition: box-shadow .2s, transform .2s;
  }
  .nf-stat-card:hover { box-shadow: 0 8px 24px rgba(49,130,206,.1); transform: translateY(-2px); }
  .nf-stat-icon { width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
  .nf-stat-label { font-size: .78rem; color: #6b7280; font-weight: 500; }
  .nf-stat-value { font-family: 'Playfair Display', serif; font-size: 1.8rem; font-weight: 700; color: #1a365d; line-height: 1; }
  .nf-stat-sub { font-size: .75rem; color: #3182ce; font-weight: 500; }

  /* ── Toolbar ── */
  .nf-toolbar {
    background: #fff; border-radius: 16px; border: 1px solid #ebf8ff;
    padding: 14px 20px; margin-bottom: 20px;
    display: flex; gap: 12px; flex-wrap: wrap; align-items: center;
  }
  .nf-search-wrap {
    flex: 1; min-width: 180px;
    display: flex; align-items: center; gap: 8px;
    background: #f0f7ff; border-radius: 10px; padding: 8px 14px;
  }
  .nf-search-wrap input {
    border: none; background: transparent; outline: none;
    font-family: 'DM Sans', sans-serif; font-size: .85rem; color: #1a365d; width: 100%;
  }
  .nf-search-wrap input::placeholder { color: #9ca3af; }

  .nf-filter-btn {
    display: flex; align-items: center; gap: 6px;
    padding: 8px 16px; border-radius: 10px;
    font-family: 'DM Sans', sans-serif; font-size: .82rem; font-weight: 600;
    border: 1.5px solid #ebf8ff; background: #fff; cursor: pointer;
    color: #374151; transition: all .18s; white-space: nowrap;
  }
  .nf-filter-btn:hover, .nf-filter-btn.active {
    background: #ebf8ff; border-color: #3182ce; color: #1a365d;
  }
  .nf-action-btn {
    display: flex; align-items: center; gap: 6px;
    padding: 8px 14px; border-radius: 10px;
    font-family: 'DM Sans', sans-serif; font-size: .8rem; font-weight: 600;
    border: 1.5px solid #ebf8ff; background: #fff; cursor: pointer;
    color: #6b7280; transition: all .18s; white-space: nowrap;
  }
  .nf-action-btn:hover { background: #f0f7ff; color: #1a365d; border-color: #bee3f8; }

  /* ── Notification list ── */
  .nf-list { display: flex; flex-direction: column; gap: 12px; }

  /* ── Notification item ── */
  .nf-item {
    background: #fff; border-radius: 16px;
    border: 1px solid #ebf8ff; overflow: hidden;
    transition: box-shadow .2s, transform .2s;
    position: relative;
  }
  .nf-item:hover { box-shadow: 0 6px 24px rgba(49,130,206,.1); transform: translateY(-1px); }
  .nf-item.unread { border-left: 4px solid #3182ce; }
  .nf-item.unread-urgent { border-left: 4px solid #dc2626; }
  .nf-item.read { opacity: .78; }

  /* Unread dot */
  .nf-unread-dot {
    width: 8px; height: 8px; border-radius: 50%;
    flex-shrink: 0; margin-top: 6px;
  }

  .nf-item-inner {
    padding: 16px 18px;
    display: flex; align-items: flex-start; gap: 14px;
  }

  /* Icon bubble */
  .nf-icon-bubble {
    width: 44px; height: 44px; border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; font-size: 1.2rem;
  }

  /* Content */
  .nf-content { flex: 1; min-width: 0; }
  .nf-item-title {
    font-size: .88rem; font-weight: 700; color: #1a365d;
    margin-bottom: 3px; line-height: 1.4;
  }
  .nf-item-title.read { font-weight: 500; color: #4b5563; }
  .nf-item-body { font-size: .8rem; color: #6b7280; line-height: 1.6; }
  .nf-item-meta {
    display: flex; align-items: center; gap: 10px; margin-top: 8px; flex-wrap: wrap;
  }
  .nf-meta-time { font-size: .72rem; color: #9ca3af; display: flex; align-items: center; gap: 4px; }

  /* Badges */
  .nf-badge {
    font-size: .62rem; font-weight: 700; padding: 2px 9px;
    border-radius: 20px; display: inline-flex; align-items: center; gap: 3px;
  }

  /* CTA buttons inside notification */
  .nf-cta {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 5px 12px; border-radius: 8px; cursor: pointer;
    font-family: 'DM Sans', sans-serif; font-size: .75rem; font-weight: 700;
    border: none; transition: all .15s;
  }
  .nf-cta-primary { background: linear-gradient(135deg, #1a365d, #3182ce); color: #fff; }
  .nf-cta-primary:hover { box-shadow: 0 3px 12px rgba(49,130,206,.3); }
  .nf-cta-outline { background: #f0f7ff; color: #3182ce; border: 1.5px solid #bee3f8; }
  .nf-cta-outline:hover { background: #ebf8ff; }

  /* Right side icons */
  .nf-right { display: flex; flex-direction: column; align-items: flex-end; gap: 8px; flex-shrink: 0; }
  .nf-icon-action {
    background: none; border: none; cursor: pointer; padding: 5px; border-radius: 8px;
    color: #d1d5db; transition: all .15s; display: flex; align-items: center;
  }
  .nf-icon-action:hover.mark { color: #3182ce; background: #ebf8ff; }
  .nf-icon-action:hover.del  { color: #dc2626; background: #fef2f2; }

  /* Divider date group */
  .nf-date-divider {
    display: flex; align-items: center; gap: 12px;
    font-size: .72rem; font-weight: 700; color: #9ca3af;
    text-transform: uppercase; letter-spacing: .06em;
    margin: 8px 0 4px;
  }
  .nf-date-divider::before, .nf-date-divider::after {
    content: ''; flex: 1; height: 1px; background: #ebf8ff;
  }

  /* Star row */
  .nf-stars { display: flex; gap: 2px; }
  .nf-star { font-size: 13px; }

  /* Empty state */
  .nf-empty {
    background: #fff; border-radius: 16px; border: 1px solid #ebf8ff;
    padding: 56px 24px; text-align: center; color: #9ca3af;
  }

  /* Pulse animation for urgent */
  @keyframes nf-pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(220,38,38,.25); }
    50%       { box-shadow: 0 0 0 8px rgba(220,38,38,0); }
  }
  .nf-item.unread-urgent { animation: nf-pulse 2.5s ease-in-out infinite; }
`;

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const INIT_NOTIFICATIONS = [
  // ── Today ──
  {
    id: 1, group: "Today",
    type: "urgent", read: false,
    icon: "🚨", iconBg: "#fef2f2", iconColor: "#dc2626",
    title: "URGENT: Pest attack on rice crop",
    body: "Farmer Ajay Sharma from Kolhapur has reported a severe stem borer infestation. 30% of the field is affected. Immediate response required.",
    time: "2 min ago",
    badge: { label: "Urgent", bg: "#fef2f2", color: "#dc2626" },
    cta: [{ label: "Respond Now", type: "primary", icon: <Send size={12} /> }],
    meta: { crop: "Rice", farmer: "Ajay Sharma" },
  },
  {
    id: 2, group: "Today",
    type: "new_query", read: false,
    icon: "📩", iconBg: "#ebf8ff", iconColor: "#3182ce",
    title: "New query from Farmer Ramesh Patil",
    body: "Crop: Tomato · Problem: Leaves turning yellow with brown spots since 3 days. Query awaiting your response.",
    time: "2 hours ago",
    badge: { label: "New Query", bg: "#ebf8ff", color: "#3182ce" },
    cta: [
      { label: "View Query",    type: "primary",  icon: <Eye  size={12} /> },
      { label: "Respond",       type: "outline",  icon: <Send size={12} /> },
    ],
    meta: { crop: "Tomato", farmer: "Ramesh Patil" },
  },
  {
    id: 3, group: "Today",
    type: "new_query", read: false,
    icon: "📩", iconBg: "#ebf8ff", iconColor: "#3182ce",
    title: "New query from Farmer Sunita Devi",
    body: "Crop: Wheat · Problem: Is it safe to plant wheat now given the current weather conditions?",
    time: "4 hours ago",
    badge: { label: "New Query", bg: "#ebf8ff", color: "#3182ce" },
    cta: [{ label: "View Query", type: "primary", icon: <Eye size={12} /> }],
    meta: { crop: "Wheat", farmer: "Sunita Devi" },
  },
  {
    id: 4, group: "Today",
    type: "feedback", read: false,
    icon: "⭐", iconBg: "#fffbeb", iconColor: "#d97706",
    title: "5-star rating from Farmer Kavita Jadhav",
    body: '"Excellent! Very detailed advice. The soil pH fix worked perfectly for my tomatoes." — Kavita Jadhav',
    time: "5 hours ago",
    badge: { label: "Feedback", bg: "#fffbeb", color: "#d97706" },
    cta: [],
    meta: { rating: 5 },
  },
  {
    id: 5, group: "Today",
    type: "reassigned", read: false,
    icon: "🔄", iconBg: "#f5f3ff", iconColor: "#7c3aed",
    title: "Case reassigned to you",
    body: "Query Q-023 (Cotton boll damage — Mohan Kumar, Satara) has been reassigned to you by Dr. Anita Kulkarni.",
    time: "6 hours ago",
    badge: { label: "Reassigned", bg: "#f5f3ff", color: "#7c3aed" },
    cta: [{ label: "View Case", type: "outline", icon: <Eye size={12} /> }],
    meta: { crop: "Cotton", farmer: "Mohan Kumar" },
  },

  // ── Yesterday ──
  {
    id: 6, group: "Yesterday",
    type: "performance", read: true,
    icon: "⚠️", iconBg: "#fffbeb", iconColor: "#d97706",
    title: "Performance Alert: 10 pending queries",
    body: "You currently have 10 unresolved queries. Your response rate has dropped to 72% this week. Please clear pending cases to maintain your rating.",
    time: "Yesterday, 4:30 PM",
    badge: { label: "Performance", bg: "#fffbeb", color: "#d97706" },
    cta: [{ label: "View Pending", type: "outline", icon: <ChevronRight size={12} /> }],
    meta: {},
  },
  {
    id: 7, group: "Yesterday",
    type: "feedback", read: true,
    icon: "⭐", iconBg: "#fffbeb", iconColor: "#d97706",
    title: "4-star rating from Farmer Sunita Devi",
    body: '"Good response, could have been faster. The fungicide advice did help control the blight." — Sunita Devi',
    time: "Yesterday, 2:10 PM",
    badge: { label: "Feedback", bg: "#fffbeb", color: "#d97706" },
    cta: [],
    meta: { rating: 4 },
  },
  {
    id: 8, group: "Yesterday",
    type: "new_query", read: true,
    icon: "📩", iconBg: "#ebf8ff", iconColor: "#3182ce",
    title: "New query from Farmer Priya Nair",
    body: "Crop: Onion · Problem: Bulb rotting before harvest with foul smell. Marked as urgent by system.",
    time: "Yesterday, 10:45 AM",
    badge: { label: "New Query", bg: "#ebf8ff", color: "#3182ce" },
    cta: [{ label: "View Query", type: "primary", icon: <Eye size={12} /> }],
    meta: { crop: "Onion", farmer: "Priya Nair" },
  },

  // ── Earlier ──
  {
    id: 9, group: "Earlier",
    type: "system", read: true,
    icon: "📢", iconBg: "#f0fdf4", iconColor: "#16a34a",
    title: "New feature: AI-powered Crop Suggestions",
    body: "The platform has added AI-based crop suggestions to your response toolkit. You can now auto-suggest treatments based on symptom matching.",
    time: "3 days ago",
    badge: { label: "System", bg: "#f0fdf4", color: "#16a34a" },
    cta: [{ label: "Learn More", type: "outline", icon: <Zap size={12} /> }],
    meta: {},
  },
  {
    id: 10, group: "Earlier",
    type: "reassigned", read: true,
    icon: "🔄", iconBg: "#f5f3ff", iconColor: "#7c3aed",
    title: "Case reopened — Ramesh Patil",
    body: "Case C-140 (Wheat yellowing) has been reopened by the farmer. He reports that the issue has returned after 5 days. Please follow up.",
    time: "4 days ago",
    badge: { label: "Reopened", bg: "#f5f3ff", color: "#7c3aed" },
    cta: [{ label: "View Case", type: "outline", icon: <Eye size={12} /> }],
    meta: { crop: "Wheat", farmer: "Ramesh Patil" },
  },
  {
    id: 11, group: "Earlier",
    type: "performance", read: true,
    icon: "📊", iconBg: "#ebf8ff", iconColor: "#3182ce",
    title: "Monthly performance report — January 2025",
    body: "Your January report is ready. Total cases: 28 · Resolution rate: 93% · Avg rating: 4.7 ⭐. You are in the Top 10% of experts this month!",
    time: "5 days ago",
    badge: { label: "Report", bg: "#ebf8ff", color: "#3182ce" },
    cta: [{ label: "View Report", type: "outline", icon: <ChevronRight size={12} /> }],
    meta: {},
  },
  {
    id: 12, group: "Earlier",
    type: "system", read: true,
    icon: "📢", iconBg: "#f0fdf4", iconColor: "#16a34a",
    title: "Scheduled maintenance on 15 Feb — 2 AM to 4 AM IST",
    body: "The platform will undergo scheduled maintenance. During this time, you will not be able to submit responses. Plan accordingly.",
    time: "6 days ago",
    badge: { label: "System", bg: "#f0fdf4", color: "#16a34a" },
    cta: [],
    meta: {},
  },
];

const FILTER_TABS = ["All", "Unread", "Urgent", "Queries", "Feedback", "System"];

/* ─────────────────────────────────────────
   STAR DISPLAY
───────────────────────────────────────── */
function Stars({ count }) {
  return (
    <div className="nf-stars">
      {[1,2,3,4,5].map(n => (
        <span key={n} className="nf-star" style={{ color: n <= count ? "#f59e0b" : "#e5e7eb" }}>★</span>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   SINGLE NOTIFICATION ITEM
───────────────────────────────────────── */
function NotifItem({ notif, onRead, onDelete }) {
  const isUrgent  = notif.type === "urgent";
  const itemClass = `nf-item${notif.read ? " read" : isUrgent ? " unread-urgent" : " unread"}`;

  return (
    <div className={itemClass}>
      <div className="nf-item-inner">
        {/* Icon bubble */}
        <div className="nf-icon-bubble" style={{ background: notif.iconBg }}>
          <span>{notif.icon}</span>
        </div>

        {/* Content */}
        <div className="nf-content">
          {/* Title + badge row */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: 8, flexWrap: "wrap" }}>
            <div className={`nf-item-title${notif.read ? " read" : ""}`}>{notif.title}</div>
            <span className="nf-badge" style={{ background: notif.badge.bg, color: notif.badge.color, marginTop: 2 }}>
              {notif.badge.label}
            </span>
          </div>

          {/* Body */}
          <div className="nf-item-body">{notif.body}</div>

          {/* Star rating if feedback */}
          {notif.meta.rating && (
            <div style={{ marginTop: 6 }}>
              <Stars count={notif.meta.rating} />
            </div>
          )}

          {/* Meta chips */}
          <div className="nf-item-meta">
            <span className="nf-meta-time"><Clock size={11} />{notif.time}</span>
            {notif.meta.crop   && <span className="nf-badge" style={{ background: "#f0fdf4", color: "#16a34a" }}>🌿 {notif.meta.crop}</span>}
            {notif.meta.farmer && <span className="nf-badge" style={{ background: "#f0f7ff", color: "#3182ce" }}>👤 {notif.meta.farmer}</span>}
          </div>

          {/* CTA buttons */}
          {notif.cta.length > 0 && (
            <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
              {notif.cta.map((c, i) => (
                <button
                  key={i}
                  className={`nf-cta nf-cta-${c.type}`}
                  onClick={() => onRead(notif.id)}
                >
                  {c.icon}{c.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: unread dot + actions */}
        <div className="nf-right">
          {!notif.read && (
            <div className="nf-unread-dot" style={{ background: isUrgent ? "#dc2626" : "#3182ce" }} />
          )}
          <button
            className="nf-icon-action mark"
            title={notif.read ? "Already read" : "Mark as read"}
            onClick={() => onRead(notif.id)}
          >
            {notif.read ? <CheckCheck size={15} /> : <Check size={15} />}
          </button>
          <button
            className="nf-icon-action del"
            title="Dismiss"
            onClick={() => onDelete(notif.id)}
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────── */
export default function ExpertNotifications() {
  const [notifs, setNotifs]   = useState(INIT_NOTIFICATIONS);
  const [search, setSearch]   = useState("");
  const [filter, setFilter]   = useState("All");

  const unreadCount  = notifs.filter(n => !n.read).length;
  const urgentCount  = notifs.filter(n => n.type === "urgent" && !n.read).length;
  const queryCount   = notifs.filter(n => n.type === "new_query" && !n.read).length;
  const feedbackCount = notifs.filter(n => n.type === "feedback").length;

  const markRead   = (id) => setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  const deleteNotif = (id) => setNotifs(prev => prev.filter(n => n.id !== id));
  const markAllRead = () => setNotifs(prev => prev.map(n => ({ ...n, read: true })));
  const clearAll    = () => setNotifs([]);

  const filtered = useMemo(() => {
    return notifs.filter(n => {
      const matchSearch =
        n.title.toLowerCase().includes(search.toLowerCase()) ||
        n.body.toLowerCase().includes(search.toLowerCase()) ||
        (n.meta.farmer || "").toLowerCase().includes(search.toLowerCase()) ||
        (n.meta.crop   || "").toLowerCase().includes(search.toLowerCase());

      const matchFilter =
        filter === "All"      ? true :
        filter === "Unread"   ? !n.read :
        filter === "Urgent"   ? n.type === "urgent" :
        filter === "Queries"  ? n.type === "new_query" || n.type === "reassigned" :
        filter === "Feedback" ? n.type === "feedback" :
        filter === "System"   ? n.type === "system" || n.type === "performance" :
        true;

      return matchSearch && matchFilter;
    });
  }, [notifs, search, filter]);

  // Group filtered notifications
  const groups = useMemo(() => {
    const order = ["Today", "Yesterday", "Earlier"];
    return order
      .map(g => ({ group: g, items: filtered.filter(n => n.group === g) }))
      .filter(g => g.items.length > 0);
  }, [filtered]);

  const stats = [
    { label: "Total",     value: notifs.length,  sub: "All notifications", icon: <Bell size={20} color="#3182ce" />,       bg: "#ebf8ff" },
    { label: "Unread",    value: unreadCount,     sub: "Need attention",    icon: <Bell size={20} color="#dc2626" />,       bg: "#fef2f2" },
    { label: "Urgent",    value: urgentCount,     sub: "Respond now",       icon: <AlertCircle size={20} color="#d97706" />, bg: "#fffbeb" },
    { label: "Feedback",  value: feedbackCount,   sub: "Farmer ratings",    icon: <Star size={20} color="#7c3aed" />,       bg: "#f5f3ff" },
  ];

  return (
    <div className="nf-root">
      <style>{styles}</style>

      <ExpertPageHeader
        title="Notifications"
        description="Stay updated with new queries, alerts, and farmer feedback."
      />

      <div className="nf-body">

        {/* ── Banner ── */}
        <div className="nf-tip-card">
          <div style={{ fontSize: "2.5rem", flexShrink: 0 }}>🔔</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 700, marginBottom: 4 }}>
              {unreadCount > 0
                ? `You have ${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
                : "You're all caught up! No unread notifications 🎉"}
            </div>
            <div style={{ fontSize: ".82rem", opacity: .85, lineHeight: 1.5 }}>
              {urgentCount > 0
                ? `${urgentCount} urgent alert${urgentCount > 1 ? "s" : ""} and ${queryCount} new quer${queryCount === 1 ? "y" : "ies"} awaiting your response.`
                : "No urgent alerts right now. Check back regularly to stay on top of farmer queries."}
            </div>
          </div>
          {unreadCount > 0 && (
            <div
              style={{
                background: "rgba(255,255,255,.18)", borderRadius: "50%",
                width: 52, height: 52, display: "flex", alignItems: "center",
                justifyContent: "center", flexShrink: 0, fontSize: "1.4rem",
                fontFamily: "'Playfair Display', serif", fontWeight: 700
              }}
            >
              {unreadCount}
            </div>
          )}
        </div>

        {/* ── Stats ── */}
        <div className="nf-stats-grid">
          {stats.map((s, i) => (
            <div className="nf-stat-card" key={i}>
              <div className="nf-stat-icon" style={{ background: s.bg }}>{s.icon}</div>
              <div>
                <div className="nf-stat-label">{s.label}</div>
                <div className="nf-stat-value">{s.value}</div>
                <div className="nf-stat-sub">{s.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Toolbar ── */}
        <div className="nf-toolbar">
          {/* Search */}
          <div className="nf-search-wrap">
            <Search size={15} color="#9ca3af" />
            <input
              placeholder="Search notifications, farmers, crops…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && <X size={14} color="#9ca3af" style={{ cursor: "pointer", flexShrink: 0 }} onClick={() => setSearch("")} />}
          </div>

          {/* Filter tabs */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {FILTER_TABS.map(f => (
              <button
                key={f}
                className={`nf-filter-btn${filter === f ? " active" : ""}`}
                onClick={() => setFilter(f)}
              >
                {f}
                {f === "Unread" && unreadCount > 0 && (
                  <span style={{
                    background: "#dc2626", color: "#fff", borderRadius: "50%",
                    width: 17, height: 17, display: "inline-flex",
                    alignItems: "center", justifyContent: "center",
                    fontSize: ".6rem", fontWeight: 800
                  }}>{unreadCount}</span>
                )}
              </button>
            ))}
          </div>

          {/* Bulk actions */}
          <div style={{ display: "flex", gap: 8, marginLeft: "auto" }}>
            <button className="nf-action-btn" onClick={markAllRead} title="Mark all as read">
              <CheckCheck size={14} />Mark all read
            </button>
            <button className="nf-action-btn" onClick={clearAll} title="Clear all">
              <Trash2 size={14} />Clear all
            </button>
          </div>
        </div>

        {/* ── Notification Groups ── */}
        {notifs.length === 0 ? (
          <div className="nf-empty">
            <div style={{ fontSize: "3rem", marginBottom: 14 }}>
              <BellOff size={48} color="#d1d5db" style={{ margin: "0 auto" }} />
            </div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", color: "#6b7280", marginBottom: 6 }}>
              No notifications
            </div>
            <div style={{ fontSize: ".82rem" }}>You have cleared all notifications.</div>
          </div>
        ) : groups.length === 0 ? (
          <div className="nf-empty">
            <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>🔍</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", color: "#6b7280", marginBottom: 6 }}>
              No results found
            </div>
            <div style={{ fontSize: ".82rem" }}>Try adjusting your search or filter.</div>
          </div>
        ) : (
          <div className="nf-list">
            {groups.map(g => (
              <div key={g.group}>
                <div className="nf-date-divider">{g.group}</div>
                {g.items.map(n => (
                  <div key={n.id} style={{ marginBottom: 10 }}>
                    <NotifItem notif={n} onRead={markRead} onDelete={deleteNotif} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}