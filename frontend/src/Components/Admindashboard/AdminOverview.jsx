import { useState, useEffect } from "react";
import { PageHeader } from "../../Pages/Admindash/Admindash";
import {
  Tractor,
  Users,
  ShoppingBag,
  Sprout,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CloudRain,
  Bug,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  Clock,
} from "lucide-react";

/* ─── MOCK DATA ─────────────────────────────────────── */
const STAT_CARDS = [
  {
    label: "Total Farmers",
    value: "12,480",
    change: "+8.4%",
    up: true,
    icon: Tractor,
    accent: "#16a34a",
    bg: "#f0fdf4",
    iconBg: "#dcfce7",
  },
  {
    label: "Active Experts",
    value: "340",
    change: "+5.1%",
    up: true,
    icon: Users,
    accent: "#0891b2",
    bg: "#ecfeff",
    iconBg: "#cffafe",
  },
  {
    label: "Marketplace Orders",
    value: "8,920",
    change: "+12.7%",
    up: true,
    icon: ShoppingBag,
    accent: "#ea580c",
    bg: "#fff7ed",
    iconBg: "#ffedd5",
  },
  {
    label: "Crops Monitored",
    value: "45,310",
    change: "-2.3%",
    up: false,
    icon: Sprout,
    accent: "#7c3aed",
    bg: "#f5f3ff",
    iconBg: "#ede9fe",
  },
];

const RECENT_ACTIVITY = [
  { type: "farmer", msg: "New farmer registered: Ramesh Patil, Maharashtra", time: "2 min ago", status: "new" },
  { type: "alert", msg: "Pest outbreak alert raised: Vidarbha region", time: "15 min ago", status: "warning" },
  { type: "order", msg: "Marketplace order #MKT-4892 fulfilled", time: "32 min ago", status: "success" },
  { type: "weather", msg: "Heavy rain advisory sent to 1,200 farmers", time: "1 hr ago", status: "info" },
  { type: "expert", msg: "Dr. Anjali Nair joined as Agronomy Expert", time: "2 hr ago", status: "new" },
  { type: "crop", msg: "AI crop recommendation updated for Kharif season", time: "3 hr ago", status: "success" },
];

const TOP_CROPS = [
  { name: "Wheat", farmers: 4200, health: 92, color: "#f59e0b" },
  { name: "Rice", farmers: 3800, health: 87, color: "#16a34a" },
  { name: "Cotton", farmers: 2100, health: 74, color: "#0891b2" },
  { name: "Sugarcane", farmers: 1600, health: 88, color: "#7c3aed" },
  { name: "Soybean", farmers: 780, health: 95, color: "#ea580c" },
];

const statusColor = {
  new: { bg: "#f0fdf4", color: "#16a34a", border: "#bbf7d0" },
  warning: { bg: "#fffbeb", color: "#d97706", border: "#fde68a" },
  success: { bg: "#f0fdf4", color: "#16a34a", border: "#bbf7d0" },
  info: { bg: "#eff6ff", color: "#2563eb", border: "#bfdbfe" },
};

/* ─── STAT CARD ─────────────────────────────────────── */
function StatCard({ card, index }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), index * 100 + 80);
    return () => clearTimeout(t);
  }, [index]);
  const Icon = card.icon;
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: 16,
        padding: "20px 22px",
        border: `1.5px solid ${card.bg}`,
        boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease, transform 0.5s ease`,
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: card.iconBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon size={20} color={card.accent} />
        </div>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 3,
            fontSize: "0.75rem",
            fontWeight: 600,
            color: card.up ? "#16a34a" : "#dc2626",
            background: card.up ? "#f0fdf4" : "#fef2f2",
            padding: "3px 8px",
            borderRadius: 6,
          }}
        >
          {card.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {card.change}
        </span>
      </div>
      <div>
        <div
          style={{
            fontSize: "1.75rem",
            fontWeight: 800,
            color: "#111827",
            fontFamily: "'Playfair Display', serif",
            lineHeight: 1.1,
          }}
        >
          {card.value}
        </div>
        <div style={{ fontSize: "0.8rem", color: "#6b7280", marginTop: 3, fontWeight: 500 }}>
          {card.label}
        </div>
      </div>
    </div>
  );
}

/* ─── OVERVIEW PAGE ─────────────────────────────────── */
export default function AdminOverview() {
  return (
    <div>
      <PageHeader
        title="Admin Overview"
        description="Welcome back! Here's what's happening across KisanSathi today."
        action={{ label: "Download Report", icon: null, onClick: () => {} }}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@300;400;500;600;700;800&display=swap');
        .ks-section-title {
          font-family: 'Playfair Display', serif;
          font-size: 1rem;
          font-weight: 700;
          color: #14532d;
          margin: 0 0 14px;
        }
        .ks-card {
          background: #fff;
          border-radius: 16px;
          border: 1.5px solid #f0fdf4;
          box-shadow: 0 2px 16px rgba(0,0,0,0.04);
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
        }
        .ks-card-header {
          padding: 16px 20px;
          border-bottom: 1px solid #f3f4f6;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .ks-tag {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 3px 10px;
          border-radius: 6px;
          font-size: 0.72rem;
          font-weight: 600;
        }
        .ks-view-all {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.76rem;
          font-weight: 600;
          color: #16a34a;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: gap 0.15s;
        }
        .ks-view-all:hover { gap: 7px; }
      `}</style>

      <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 22 }}>

        {/* STAT CARDS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 16,
          }}
        >
          {STAT_CARDS.map((c, i) => <StatCard key={c.label} card={c} index={i} />)}
        </div>

        {/* QUICK ALERTS */}
        <div
          style={{
            background: "linear-gradient(135deg, #14532d, #16a34a)",
            borderRadius: 16,
            padding: "16px 22px",
            display: "flex",
            flexWrap: "wrap",
            gap: 14,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 36,
                height: 36,
                background: "rgba(255,255,255,0.15)",
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AlertTriangle size={18} color="#fbbf24" />
            </div>
            <div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: "#fff", fontSize: "0.88rem" }}>
                3 Active Alerts Require Attention
              </div>
              <div style={{ fontSize: "0.75rem", color: "rgba(187,247,208,0.75)" }}>
                Pest outbreak in Vidarbha · Low rainfall warning · Market price drop
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            {[
              { icon: Bug, label: "Pest: 1", color: "#fbbf24" },
              { icon: CloudRain, label: "Weather: 1", color: "#7dd3fc" },
              { icon: TrendingDown, label: "Market: 1", color: "#fca5a5" },
            ].map(({ icon: Icon, label, color }) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  borderRadius: 8,
                  padding: "5px 12px",
                  fontSize: "0.76rem",
                  color,
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  backdropFilter: "blur(4px)",
                }}
              >
                <Icon size={13} />
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* MAIN GRID */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>

          {/* RECENT ACTIVITY */}
          <div className="ks-card">
            <div className="ks-card-header">
              <span className="ks-section-title" style={{ margin: 0 }}>Recent Activity</span>
              <button className="ks-view-all">View all <ArrowRight size={12} /></button>
            </div>
            <div style={{ padding: "8px 0" }}>
              {RECENT_ACTIVITY.map((a, i) => {
                const s = statusColor[a.status];
                return (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 12,
                      padding: "10px 20px",
                      borderBottom: i < RECENT_ACTIVITY.length - 1 ? "1px solid #f9fafb" : "none",
                      transition: "background 0.15s",
                      cursor: "default",
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "#f9fafb"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  >
                    <div
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        background: s.color,
                        marginTop: 5,
                        flexShrink: 0,
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: 0, fontSize: "0.8rem", color: "#374151", lineHeight: 1.45 }}>{a.msg}</p>
                      <span style={{ fontSize: "0.7rem", color: "#9ca3af", display: "flex", alignItems: "center", gap: 3, marginTop: 2 }}>
                        <Clock size={10} />{a.time}
                      </span>
                    </div>
                    <span
                      className="ks-tag"
                      style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }}
                    >
                      {a.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* TOP CROPS */}
          <div className="ks-card">
            <div className="ks-card-header">
              <span className="ks-section-title" style={{ margin: 0 }}>Top Monitored Crops</span>
              <button className="ks-view-all">View all <ArrowRight size={12} /></button>
            </div>
            <div style={{ padding: "14px 20px", display: "flex", flexDirection: "column", gap: 14 }}>
              {TOP_CROPS.map((crop) => (
                <div key={crop.name}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 6,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: 2,
                          background: crop.color,
                          flexShrink: 0,
                        }}
                      />
                      <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "#1f2937" }}>{crop.name}</span>
                      <span style={{ fontSize: "0.72rem", color: "#9ca3af" }}>{crop.farmers.toLocaleString()} farmers</span>
                    </div>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        color: crop.health >= 85 ? "#16a34a" : crop.health >= 70 ? "#d97706" : "#dc2626",
                      }}
                    >
                      {crop.health}% healthy
                    </span>
                  </div>
                  <div
                    style={{
                      height: 6,
                      background: "#f3f4f6",
                      borderRadius: 4,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${crop.health}%`,
                        background: `linear-gradient(90deg, ${crop.color}aa, ${crop.color})`,
                        borderRadius: 4,
                        transition: "width 0.8s ease",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Summary row */}
            <div
              style={{
                margin: "0 16px 16px",
                padding: "12px 16px",
                background: "#f0fdf4",
                borderRadius: 12,
                display: "flex",
                gap: 20,
                justifyContent: "center",
              }}
            >
              {[
                { icon: CheckCircle2, label: "Healthy", val: "38,540", color: "#16a34a" },
                { icon: AlertTriangle, label: "At Risk", val: "5,210", color: "#d97706" },
                { icon: Bug, label: "Pest Alert", val: "1,560", color: "#dc2626" },
              ].map(({ icon: Icon, label, val, color }) => (
                <div key={label} style={{ textAlign: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, justifyContent: "center", marginBottom: 2 }}>
                    <Icon size={13} color={color} />
                    <span style={{ fontSize: "0.7rem", color: "#6b7280", fontWeight: 500 }}>{label}</span>
                  </div>
                  <div style={{ fontSize: "0.95rem", fontWeight: 800, color, fontFamily: "'Playfair Display', serif" }}>{val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM QUICK ACTIONS */}
        <div>
          <p className="ks-section-title">Quick Actions</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12 }}>
            {[
              { icon: Tractor, label: "Add Farmer", color: "#16a34a", bg: "#f0fdf4" },
              { icon: Users, label: "Assign Expert", color: "#0891b2", bg: "#ecfeff" },
              { icon: Bug, label: "Log Pest Alert", color: "#dc2626", bg: "#fef2f2" },
              { icon: CloudRain, label: "Send Weather Alert", color: "#7c3aed", bg: "#f5f3ff" },
              { icon: ShoppingBag, label: "Review Orders", color: "#ea580c", bg: "#fff7ed" },
              { icon: MessageSquare, label: "Moderate Forum", color: "#0d9488", bg: "#f0fdfa" },
            ].map(({ icon: Icon, label, color, bg }) => (
              <button
                key={label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 10,
                  padding: "18px 12px",
                  borderRadius: 14,
                  background: "#fff",
                  border: `1.5px solid ${bg}`,
                  cursor: "pointer",
                  transition: "all 0.18s ease",
                  fontFamily: "'DM Sans', sans-serif",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = bg;
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = `0 8px 24px ${color}22`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "#fff";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 11,
                    background: bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon size={18} color={color} />
                </div>
                <span style={{ fontSize: "0.76rem", fontWeight: 600, color: "#374151", textAlign: "center", lineHeight: 1.3 }}>
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}