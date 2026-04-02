import { useState, useEffect } from "react";
import { ClipboardList, Clock, MessageSquare, Star, TrendingUp, CheckCircle, AlertCircle, User } from "lucide-react";
import { ExpertPageHeader } from "../../Pages/Expertdash/Expertdash";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');

  .eo-root { font-family: 'DM Sans', sans-serif; background: #f0f7ff; min-height: 100vh; }
  .eo-body { padding: 24px; }

  .eo-stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px; margin-bottom: 24px;
  }

  .eo-stat-card {
    background: #ffffff; border-radius: 16px;
    padding: 20px; border: 1px solid #ebf8ff;
    display: flex; flex-direction: column; gap: 12px;
    transition: box-shadow 0.2s, transform 0.2s; cursor: default;
  }

  .eo-stat-card:hover {
    box-shadow: 0 8px 24px rgba(49,130,206,0.1);
    transform: translateY(-2px);
  }

  .eo-stat-icon {
    width: 40px; height: 40px; border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
  }

  .eo-stat-label { font-size: 0.78rem; color: #6b7280; font-weight: 500; }
  .eo-stat-value { font-family: 'Playfair Display', serif; font-size: 1.8rem; font-weight: 700; color: #1a365d; line-height: 1; }
  .eo-stat-sub { font-size: 0.75rem; color: #3182ce; font-weight: 500; }

  .eo-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; }
  @media (max-width: 768px) { .eo-grid-2 { grid-template-columns: 1fr; } }

  .eo-card { background: #ffffff; border-radius: 16px; border: 1px solid #ebf8ff; overflow: hidden; }

  .eo-card-header {
    padding: 16px 20px; border-bottom: 1px solid #ebf8ff;
    display: flex; align-items: center; justify-content: space-between;
  }

  .eo-card-title { font-family: 'Playfair Display', serif; font-size: 1rem; font-weight: 700; color: #1a365d; }
  .eo-card-body { padding: 16px 20px; }

  .eo-query-item {
    display: flex; align-items: flex-start; gap: 12px;
    padding: 12px 0; border-bottom: 1px solid #f0f7ff;
  }
  .eo-query-item:last-child { border-bottom: none; }

  .eo-query-avatar {
    width: 36px; height: 36px; border-radius: 50%;
    background: linear-gradient(135deg, #ebf8ff, #bee3f8);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; font-size: 14px; font-weight: 600; color: #3182ce;
  }

  .eo-query-name { font-size: 0.85rem; font-weight: 600; color: #1a365d; }
  .eo-query-text { font-size: 0.78rem; color: #6b7280; margin-top: 2px; line-height: 1.4; }
  .eo-query-time { font-size: 0.7rem; color: #9ca3af; margin-top: 4px; }

  .eo-badge {
    font-size: 0.65rem; font-weight: 600;
    padding: 2px 8px; border-radius: 20px;
  }

  .eo-activity-item {
    display: flex; align-items: flex-start; gap: 12px;
    padding: 10px 0; border-bottom: 1px solid #f0f7ff;
  }
  .eo-activity-item:last-child { border-bottom: none; }
  .eo-activity-dot { width: 8px; height: 8px; border-radius: 50%; margin-top: 5px; flex-shrink: 0; }
  .eo-activity-text { font-size: 0.82rem; color: #374151; line-height: 1.5; }
  .eo-activity-time { font-size: 0.72rem; color: #9ca3af; margin-top: 2px; }

  .eo-tip-card {
    background: linear-gradient(135deg, #1a365d, #3182ce);
    border-radius: 16px; padding: 20px; color: #fff;
    margin-bottom: 24px; display: flex; align-items: center; gap: 16px;
  }

  .eo-perf-row {
    display: flex; align-items: center; justify-content: space-between;
    padding: 10px 0; border-bottom: 1px solid #f0f7ff;
  }
  .eo-perf-row:last-child { border-bottom: none; }
  .eo-perf-label { font-size: 0.82rem; color: #6b7280; }
  .eo-perf-val { font-size: 0.85rem; font-weight: 700; color: #1a365d; }
  .eo-perf-bar { height: 5px; background: #ebf8ff; border-radius: 10px; margin-top: 4px; overflow: hidden; }
  .eo-perf-fill { height: 100%; border-radius: 10px; background: linear-gradient(90deg, #3182ce, #63b3ed); }
`;

const stats = [
  { label: "Total Cases Handled", value: "148", sub: "All time",          icon: <ClipboardList size={20} color="#3182ce" />, bg: "#ebf8ff" },
  { label: "Pending Queries",     value: "7",   sub: "Awaiting response", icon: <Clock         size={20} color="#d97706" />, bg: "#fffbeb" },
  { label: "Responses Sent",      value: "23",  sub: "This month",        icon: <MessageSquare size={20} color="#16a34a" />, bg: "#f0fdf4" },
  { label: "Rating",              value: "4.8", sub: "Out of 5.0",        icon: <Star          size={20} color="#7c3aed" />, bg: "#f5f3ff" },
];

const pendingQueries = [
  { name: "Ramesh Patil",   initials: "RP", query: "My cotton crop shows yellowing leaves. What fertilizer should I apply?",  time: "2 hours ago",  urgent: true  },
  { name: "Sunita Devi",    initials: "SD", query: "Is it safe to plant wheat now given the current weather conditions?",      time: "4 hours ago",  urgent: false },
  { name: "Ajay Sharma",    initials: "AS", query: "Pest infestation on my rice crop, need immediate help.",                   time: "5 hours ago",  urgent: true  },
  { name: "Kavita Jadhav",  initials: "KJ", query: "What is the recommended pH for growing tomatoes in black soil?",          time: "Yesterday",    urgent: false },
];

const activities = [
  { text: "Responded to Mohan Kumar's query about soil deficiency",  time: "1 hour ago",  color: "#16a34a" },
  { text: "Case #142 marked as resolved — Rice pest control",         time: "3 hours ago", color: "#3182ce" },
  { text: "New urgent query from Ramesh Patil assigned to you",       time: "5 hours ago", color: "#dc2626" },
  { text: "Monthly performance report generated",                     time: "Yesterday",   color: "#7c3aed" },
  { text: "Responded to 3 pending queries",                           time: "2 days ago",  color: "#16a34a" },
];

const performance = [
  { label: "Response Rate",    value: "96%", width: "96%" },
  { label: "Resolution Rate",  value: "89%", width: "89%" },
  { label: "Farmer Satisfaction", value: "92%", width: "92%" },
];

export default function ExpertOverview() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const hour = time.getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  return (
    <div className="eo-root">
      <style>{styles}</style>
      <ExpertPageHeader
        title="Expert Overview"
        description={`${greeting}, Dr. Expert 👨‍🌾 — ${time.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}`}
      />

      <div className="eo-body">
        {/* Banner */}
        <div className="eo-tip-card">
          <div style={{ fontSize: "2.5rem", flexShrink: 0 }}>👨‍🔬</div>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 700, marginBottom: 4 }}>
              You have 7 pending queries
            </div>
            <div style={{ fontSize: "0.82rem", opacity: 0.85, lineHeight: 1.5 }}>
              3 are marked urgent. Farmers are waiting for your expert advice. Please respond at the earliest.
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="eo-stats-grid">
          {stats.map((s, i) => (
            <div className="eo-stat-card" key={i}>
              <div className="eo-stat-icon" style={{ background: s.bg }}>{s.icon}</div>
              <div>
                <div className="eo-stat-label">{s.label}</div>
                <div className="eo-stat-value">{s.value}</div>
                <div className="eo-stat-sub">{s.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Pending + Activity */}
        <div className="eo-grid-2">
          {/* Pending Queries */}
          <div className="eo-card">
            <div className="eo-card-header">
              <div className="eo-card-title">Pending Queries</div>
              <span className="eo-badge" style={{ background: "#fef2f2", color: "#dc2626" }}>7 waiting</span>
            </div>
            <div className="eo-card-body">
              {pendingQueries.map((q, i) => (
                <div className="eo-query-item" key={i}>
                  <div className="eo-query-avatar">{q.initials}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div className="eo-query-name">{q.name}</div>
                      {q.urgent && (
                        <span className="eo-badge" style={{ background: "#fef2f2", color: "#dc2626" }}>Urgent</span>
                      )}
                    </div>
                    <div className="eo-query-text">{q.query}</div>
                    <div className="eo-query-time">{q.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right col: Activity + Performance */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div className="eo-card">
              <div className="eo-card-header">
                <div className="eo-card-title">Recent Activity</div>
                <span className="eo-badge" style={{ background: "#f3f4f6", color: "#6b7280" }}>Last 7 days</span>
              </div>
              <div className="eo-card-body">
                {activities.map((a, i) => (
                  <div className="eo-activity-item" key={i}>
                    <div className="eo-activity-dot" style={{ background: a.color }} />
                    <div>
                      <div className="eo-activity-text">{a.text}</div>
                      <div className="eo-activity-time">{a.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="eo-card">
              <div className="eo-card-header">
                <div className="eo-card-title">Performance</div>
                <TrendingUp size={18} color="#3182ce" />
              </div>
              <div className="eo-card-body">
                {performance.map((p, i) => (
                  <div key={i} style={{ marginBottom: i < performance.length - 1 ? 14 : 0 }}>
                    <div className="eo-perf-row">
                      <span className="eo-perf-label">{p.label}</span>
                      <span className="eo-perf-val">{p.value}</span>
                    </div>
                    <div className="eo-perf-bar">
                      <div className="eo-perf-fill" style={{ width: p.width }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}