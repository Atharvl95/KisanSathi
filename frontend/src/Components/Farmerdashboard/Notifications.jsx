import { useState } from "react";
import { Bell, CheckCheck, Trash2, RefreshCw, ChevronRight, BellOff } from "lucide-react";
import { FarmerPageHeader } from "../../Pages/Farmerdash/Farmerdash";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');

  .ntf-root {
    font-family: 'DM Sans', sans-serif;
    background: #f7fdf9;
    min-height: 100vh;
  }

  .ntf-body { padding: 24px; }

  .ntf-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    flex-wrap: wrap;
    gap: 12px;
  }

  .ntf-filter-group {
    display: flex;
    gap: 6px;
    background: #ffffff;
    border: 1px solid #e9f7ef;
    border-radius: 12px;
    padding: 4px;
  }

  .ntf-filter-btn {
    padding: 6px 14px;
    border: none;
    border-radius: 9px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    background: transparent;
    color: #6b7280;
  }

  .ntf-filter-btn.active {
    background: linear-gradient(135deg, #14532d, #16a34a);
    color: #fff;
    box-shadow: 0 2px 8px rgba(22,101,52,0.22);
  }

  .ntf-filter-btn:hover:not(.active) {
    background: #f0fdf4;
    color: #14532d;
  }

  .ntf-actions {
    display: flex;
    gap: 8px;
  }

  .ntf-action-btn {
    padding: 7px 14px;
    border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.78rem;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: all 0.2s;
    border: 1px solid #e5e7eb;
    background: #fff;
    color: #6b7280;
  }

  .ntf-action-btn:hover { background: #f9fafb; color: #374151; }

  .ntf-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .ntf-card {
    background: #ffffff;
    border-radius: 16px;
    border: 1px solid #e9f7ef;
    padding: 16px 18px;
    display: flex;
    align-items: flex-start;
    gap: 14px;
    cursor: pointer;
    transition: all 0.22s;
    position: relative;
    animation: ntf-slideIn 0.35s ease both;
  }

  .ntf-card:hover {
    box-shadow: 0 4px 16px rgba(22,101,52,0.10);
    transform: translateY(-1px);
    border-color: #bbf7d0;
  }

  .ntf-card.unread {
    border-left: 3px solid #16a34a;
    background: #fafffe;
  }

  .ntf-card.unread::before {
    content: '';
    position: absolute;
    top: 18px; left: -1.5px;
    width: 7px; height: 7px;
    border-radius: 50%;
    background: #16a34a;
  }

  @keyframes ntf-slideIn {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .ntf-icon-wrap {
    width: 44px; height: 44px;
    border-radius: 13px;
    display: flex; align-items: center; justify-content: center;
    font-size: 20px;
    flex-shrink: 0;
  }

  .ntf-content { flex: 1; min-width: 0; }

  .ntf-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 4px;
    gap: 8px;
  }

  .ntf-badge {
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    padding: 2px 8px;
    border-radius: 6px;
  }

  .ntf-time {
    font-size: 0.72rem;
    color: #9ca3af;
    flex-shrink: 0;
  }

  .ntf-title {
    font-size: 0.88rem;
    font-weight: 700;
    color: #14532d;
    margin-bottom: 3px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .ntf-desc {
    font-size: 0.80rem;
    color: #6b7280;
    line-height: 1.5;
  }

  .ntf-quote {
    background: #f0fdf4;
    border-left: 3px solid #16a34a;
    border-radius: 0 8px 8px 0;
    padding: 8px 12px;
    font-size: 0.8rem;
    color: #166534;
    font-style: italic;
    margin: 8px 0 4px;
    line-height: 1.5;
  }

  .ntf-cta {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    margin-top: 8px;
    padding: 5px 12px;
    background: linear-gradient(135deg, #14532d, #16a34a);
    color: #fff;
    border: none;
    border-radius: 8px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 2px 8px rgba(22,101,52,0.2);
  }

  .ntf-cta:hover { box-shadow: 0 4px 12px rgba(22,101,52,0.3); transform: translateY(-1px); }

  .ntf-dismiss {
    background: none;
    border: none;
    cursor: pointer;
    color: #d1d5db;
    padding: 4px;
    border-radius: 6px;
    transition: all 0.2s;
    flex-shrink: 0;
    align-self: flex-start;
  }

  .ntf-dismiss:hover { color: #ef4444; background: #fef2f2; }

  .ntf-empty {
    text-align: center;
    padding: 60px 20px;
    color: #9ca3af;
    background: #fff;
    border-radius: 16px;
    border: 1px solid #e9f7ef;
  }

  .ntf-empty-icon { font-size: 3rem; margin-bottom: 12px; opacity: 0.4; }
  .ntf-empty-text { font-size: 0.9rem; }

  .ntf-summary-strip {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    margin-bottom: 20px;
  }

  @media (max-width: 700px) {
    .ntf-summary-strip { grid-template-columns: repeat(2, 1fr); }
    .ntf-toolbar { flex-direction: column; align-items: flex-start; }
  }

  .ntf-stat-card {
    background: #ffffff;
    border: 1px solid #e9f7ef;
    border-radius: 14px;
    padding: 14px 16px;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .ntf-stat-icon {
    width: 38px; height: 38px;
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px;
    flex-shrink: 0;
  }

  .ntf-stat-val {
    font-family: 'Playfair Display', serif;
    font-size: 1.4rem;
    font-weight: 800;
    color: #14532d;
    line-height: 1;
  }

  .ntf-stat-label {
    font-size: 0.7rem;
    color: #9ca3af;
    margin-top: 2px;
  }

  .ntf-section-label {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: #9ca3af;
    margin: 16px 0 8px;
    padding-left: 2px;
  }

  .ntf-unread-count {
    background: #16a34a;
    color: #fff;
    border-radius: 99px;
    font-size: 0.65rem;
    font-weight: 700;
    padding: 1px 6px;
    margin-left: 6px;
  }
`;

const TYPE_CONFIG = {
  expert:   { bg: "#f0fdf4", color: "#16a34a", badge: "Expert Reply",   badgeBg: "#dcfce7", badgeColor: "#15803d" },
  weather:  { bg: "#fff7ed", color: "#ea580c", badge: "Weather Alert",  badgeBg: "#ffedd5", badgeColor: "#c2410c" },
  pest:     { bg: "#fef2f2", color: "#dc2626", badge: "Pest Detection", badgeBg: "#fee2e2", badgeColor: "#b91c1c" },
  request:  { bg: "#eff6ff", color: "#2563eb", badge: "Request Update", badgeBg: "#dbeafe", badgeColor: "#1d4ed8" },
  system:   { bg: "#f5f3ff", color: "#7c3aed", badge: "System",         badgeBg: "#ede9fe", badgeColor: "#6d28d9" },
  tip:      { bg: "#fefce8", color: "#ca8a04", badge: "Farming Tip",    badgeBg: "#fef9c3", badgeColor: "#a16207" },
};

const INITIAL_NOTIFICATIONS = [
  {
    id: 1, type: "expert", unread: true, time: "2 min ago", important: true,
    title: "Dr. Sharma replied to your query",
    desc: "Your question about wheat rust disease has been answered.",
    quote: "Use fungicide spray twice a week. Mancozeb 75% WP at 2.5g/L works best for rust control.",
    cta: "View Reply",
  },
  {
    id: 2, type: "weather", unread: true, time: "1 hr ago", important: true,
    title: "⚠️ Heavy Rain Expected Tomorrow",
    desc: "IMD forecast: 45–60mm rainfall in your region (Nashik district). Avoid pesticide spraying for next 48 hours.",
    cta: null,
  },
  {
    id: 3, type: "pest", unread: true, time: "3 hr ago", important: true,
    title: "Disease Detected: Leaf Blight",
    desc: "AI analysis of your uploaded crop image returned a result.",
    quote: "Confidence: 92% — Early Blight (Alternaria solani) detected on tomato leaves.",
    cta: "View Details",
  },
  {
    id: 4, type: "request", unread: false, time: "5 hr ago", important: false,
    title: "🟢 Your issue has been resolved",
    desc: "Request #1042 (Soil pH correction advice) has been marked as Resolved by our agronomist team.",
    cta: "View Resolution",
  },
  {
    id: 5, type: "expert", unread: false, time: "Yesterday", important: false,
    title: "Dr. Patel replied to your query",
    desc: "Response to your question about cotton bollworm management.",
    quote: "Apply Spinosad 45 SC at 0.3 ml/L. Spray in the evening for best results.",
    cta: "View Reply",
  },
  {
    id: 6, type: "request", unread: false, time: "Yesterday", important: false,
    title: "🟡 Your request is now In Progress",
    desc: "Request #1039 (Irrigation scheduling for sugarcane) has been picked up by Dr. Kulkarni.",
    cta: null,
  },
  {
    id: 7, type: "system", unread: false, time: "2 days ago", important: false,
    title: "📢 New Feature: Crop Recommendation",
    desc: "You can now get AI-powered crop recommendations based on your soil N, P, K and climate data. Try it now!",
    cta: "Try Now",
  },
  {
    id: 8, type: "weather", unread: false, time: "2 days ago", important: false,
    title: "🌤️ Weather cleared — Resume spraying",
    desc: "Rain has passed in your area. Conditions are now suitable for pesticide and fertilizer application.",
    cta: null,
  },
  {
    id: 9, type: "tip", unread: false, time: "3 days ago", important: false,
    title: "💡 Daily Farming Tip",
    desc: "Water your crops early in the morning (6–8 AM) to reduce evaporation and improve absorption by up to 30%.",
    cta: null,
  },
  {
    id: 10, type: "pest", unread: false, time: "4 days ago", important: false,
    title: "No Disease Detected",
    desc: "Your uploaded image of onion crop returned no signs of disease. Crop appears healthy.",
    cta: "View Report",
  },
  {
    id: 11, type: "system", unread: false, time: "5 days ago", important: false,
    title: "🔧 Scheduled Maintenance",
    desc: "The platform will be under maintenance on Sunday 12 AM – 2 AM. Services may be temporarily unavailable.",
    cta: null,
  },
  {
    id: 12, type: "tip", unread: false, time: "6 days ago", important: false,
    title: "💡 Fertilizer Tip",
    desc: "Split your nitrogen application into 3 doses (basal + top-dressing) rather than all at once to improve uptake by up to 40%.",
    cta: null,
  },
];

const FILTERS = ["All", "Unread", "Important", "Expert", "Weather", "Pest", "System"];

export default function FarmerNotifications() {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [activeFilter, setActiveFilter] = useState("All");

  const unreadCount = notifications.filter(n => n.unread).length;

  const filtered = notifications.filter(n => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Unread") return n.unread;
    if (activeFilter === "Important") return n.important;
    return n.type === activeFilter.toLowerCase();
  });

  const todayItems = filtered.filter(n => ["2 min ago","1 hr ago","3 hr ago","5 hr ago"].includes(n.time));
  const earlierItems = filtered.filter(n => !["2 min ago","1 hr ago","3 hr ago","5 hr ago"].includes(n.time));

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  const dismiss = (id, e) => { e.stopPropagation(); setNotifications(prev => prev.filter(n => n.id !== id)); };
  const markRead = (id) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));

  const stats = [
    { icon: "👨‍🔬", label: "Expert Replies", val: notifications.filter(n=>n.type==="expert").length, bg: "#f0fdf4" },
    { icon: "🌧️", label: "Weather Alerts", val: notifications.filter(n=>n.type==="weather").length, bg: "#fff7ed" },
    { icon: "🐛", label: "Pest Detections", val: notifications.filter(n=>n.type==="pest").length, bg: "#fef2f2" },
    { icon: "🔔", label: "Unread", val: unreadCount, bg: "#eff6ff" },
  ];

  const renderCard = (n, i) => {
    const cfg = TYPE_CONFIG[n.type];
    return (
      <div
        key={n.id}
        className={`ntf-card${n.unread ? " unread" : ""}`}
        style={{ animationDelay: `${i * 0.06}s` }}
        onClick={() => markRead(n.id)}
      >
        <div className="ntf-icon-wrap" style={{ background: cfg.bg }}>
          {n.type === "expert"  && "👨‍🔬"}
          {n.type === "weather" && "🌧️"}
          {n.type === "pest"    && "🦠"}
          {n.type === "request" && "📩"}
          {n.type === "system"  && "📢"}
          {n.type === "tip"     && "💡"}
        </div>

        <div className="ntf-content">
          <div className="ntf-meta">
            <span className="ntf-badge" style={{ background: cfg.badgeBg, color: cfg.badgeColor }}>
              {cfg.badge}
            </span>
            <span className="ntf-time">{n.time}</span>
          </div>
          <div className="ntf-title">{n.title}</div>
          <div className="ntf-desc">{n.desc}</div>
          {n.quote && <div className="ntf-quote">"{n.quote}"</div>}
          {n.cta && (
            <button className="ntf-cta">
              {n.cta} <ChevronRight size={12} />
            </button>
          )}
        </div>

        <button className="ntf-dismiss" onClick={(e) => dismiss(n.id, e)} title="Dismiss">
          <Trash2 size={14} />
        </button>
      </div>
    );
  };

  return (
    <div className="ntf-root">
      <style>{styles}</style>
      <FarmerPageHeader
        title="Notifications"
        description="Stay updated with expert replies, weather alerts, and pest detection results"
      />

      <div className="ntf-body">
        {/* Stats Strip */}
        <div className="ntf-summary-strip">
          {stats.map((s, i) => (
            <div className="ntf-stat-card" key={i}>
              <div className="ntf-stat-icon" style={{ background: s.bg }}>{s.icon}</div>
              <div>
                <div className="ntf-stat-val">{s.val}</div>
                <div className="ntf-stat-label">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="ntf-toolbar">
          <div className="ntf-filter-group">
            {FILTERS.map(f => (
              <button
                key={f}
                className={`ntf-filter-btn${activeFilter === f ? " active" : ""}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
                {f === "Unread" && unreadCount > 0 && (
                  <span className="ntf-unread-count">{unreadCount}</span>
                )}
              </button>
            ))}
          </div>

          <div className="ntf-actions">
            {unreadCount > 0 && (
              <button className="ntf-action-btn" onClick={markAllRead}>
                <CheckCheck size={13} /> Mark all read
              </button>
            )}
            <button className="ntf-action-btn" onClick={() => setNotifications(INITIAL_NOTIFICATIONS)}>
              <RefreshCw size={13} /> Refresh
            </button>
          </div>
        </div>

        {/* Notification List */}
        {filtered.length === 0 ? (
          <div className="ntf-empty">
            <div className="ntf-empty-icon"><BellOff /></div>
            <div className="ntf-empty-text">No notifications in this category.</div>
          </div>
        ) : (
          <div className="ntf-list">
            {todayItems.length > 0 && (
              <>
                <div className="ntf-section-label">Today</div>
                {todayItems.map((n, i) => renderCard(n, i))}
              </>
            )}
            {earlierItems.length > 0 && (
              <>
                <div className="ntf-section-label">Earlier</div>
                {earlierItems.map((n, i) => renderCard(n, i + todayItems.length))}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}