import { useState, useEffect } from "react";
import { Sprout, CloudSun, Bug, Users, TrendingUp, Droplets, Thermometer, Wind } from "lucide-react";
import { FarmerPageHeader } from "../../Pages/Farmerdash/Farmerdash";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');

  .fo-root {
    font-family: 'DM Sans', sans-serif;
    background: #f7fdf9;
    min-height: 100vh;
  }

  .fo-body { padding: 24px; }

  .fo-stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    margin-bottom: 24px;
  }

  .fo-stat-card {
    background: #ffffff;
    border-radius: 16px;
    padding: 20px;
    border: 1px solid #e9f7ef;
    display: flex;
    flex-direction: column;
    gap: 12px;
    transition: box-shadow 0.2s, transform 0.2s;
    cursor: default;
  }

  .fo-stat-card:hover {
    box-shadow: 0 8px 24px rgba(22,163,74,0.1);
    transform: translateY(-2px);
  }

  .fo-stat-icon {
    width: 40px; height: 40px;
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
  }

  .fo-stat-label {
    font-size: 0.78rem;
    color: #6b7280;
    font-weight: 500;
  }

  .fo-stat-value {
    font-family: 'Playfair Display', serif;
    font-size: 1.8rem;
    font-weight: 700;
    color: #14532d;
    line-height: 1;
  }

  .fo-stat-sub {
    font-size: 0.75rem;
    color: #16a34a;
    font-weight: 500;
  }

  .fo-grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 24px;
  }

  @media (max-width: 768px) {
    .fo-grid-2 { grid-template-columns: 1fr; }
  }

  .fo-card {
    background: #ffffff;
    border-radius: 16px;
    border: 1px solid #e9f7ef;
    overflow: hidden;
  }

  .fo-card-header {
    padding: 16px 20px;
    border-bottom: 1px solid #e9f7ef;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .fo-card-title {
    font-family: 'Playfair Display', serif;
    font-size: 1rem;
    font-weight: 700;
    color: #14532d;
  }

  .fo-card-body { padding: 16px 20px; }

  .fo-weather-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .fo-weather-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px;
    background: #f7fdf9;
    border-radius: 12px;
    border: 1px solid #e9f7ef;
  }

  .fo-weather-icon {
    width: 36px; height: 36px;
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }

  .fo-weather-label { font-size: 0.72rem; color: #6b7280; }
  .fo-weather-value { font-size: 1rem; font-weight: 600; color: #14532d; }

  .fo-activity-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 12px 0;
    border-bottom: 1px solid #f3f4f6;
  }

  .fo-activity-item:last-child { border-bottom: none; }

  .fo-activity-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    margin-top: 5px;
    flex-shrink: 0;
  }

  .fo-activity-text { font-size: 0.82rem; color: #374151; line-height: 1.5; }
  .fo-activity-time { font-size: 0.72rem; color: #9ca3af; margin-top: 2px; }

  .fo-quick-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 12px;
    margin-bottom: 24px;
  }

  .fo-quick-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 20px 12px;
    background: #ffffff;
    border: 1px solid #e9f7ef;
    border-radius: 16px;
    cursor: pointer;
    transition: all 0.18s;
    text-decoration: none;
  }

  .fo-quick-btn:hover {
    background: #f0fdf4;
    border-color: #86efac;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(22,163,74,0.1);
  }

  .fo-quick-icon {
    width: 44px; height: 44px;
    border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
  }

  .fo-quick-label {
    font-size: 0.78rem;
    font-weight: 600;
    color: #374151;
    text-align: center;
  }

  .fo-badge {
    font-size: 0.65rem;
    font-weight: 600;
    padding: 2px 8px;
    border-radius: 20px;
  }

  .fo-tip-card {
    background: linear-gradient(135deg, #14532d, #16a34a);
    border-radius: 16px;
    padding: 20px;
    color: #fff;
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .fo-tip-icon {
    font-size: 2.5rem;
    flex-shrink: 0;
  }

  .fo-tip-title {
    font-family: 'Playfair Display', serif;
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 4px;
  }

  .fo-tip-text {
    font-size: 0.82rem;
    opacity: 0.85;
    line-height: 1.5;
  }
`;

const stats = [
  {
    label: "Recommended Crop",
    value: "Rice",
    sub: "Based on your soil data",
    icon: <Sprout size={20} color="#16a34a" />,
    iconBg: "#f0fdf4",
  },
  {
    label: "Active Experts",
    value: "12",
    sub: "Available for consultation",
    icon: <Users size={20} color="#2563eb" />,
    iconBg: "#eff6ff",
  },
  {
    label: "Pest Alerts",
    value: "2",
    sub: "In your region today",
    icon: <Bug size={20} color="#dc2626" />,
    iconBg: "#fef2f2",
  },
  {
    label: "Soil Health",
    value: "87%",
    sub: "Good condition",
    icon: <TrendingUp size={20} color="#d97706" />,
    iconBg: "#fffbeb",
  },
];

const activities = [
  { text: "Crop recommendation updated for Kharif season", time: "2 hours ago", color: "#16a34a" },
  { text: "Expert Dr. Sharma replied to your query", time: "5 hours ago", color: "#2563eb" },
  { text: "Pest alert: Brown planthopper detected nearby", time: "Yesterday", color: "#dc2626" },
  { text: "Weather forecast updated for your region", time: "Yesterday", color: "#d97706" },
  { text: "Soil test report is ready to view", time: "2 days ago", color: "#7c3aed" },
];

const quickActions = [
  { label: "Crop Advice", icon: <Sprout size={22} color="#16a34a" />, bg: "#f0fdf4", path: "/farmerdashboard/croprecommendation" },
  { label: "Ask Expert", icon: <Users size={22} color="#2563eb" />, bg: "#eff6ff", path: "/farmerdashboard/experthelp" },
  { label: "Pest Check", icon: <Bug size={22} color="#dc2626" />, bg: "#fef2f2", path: "/farmerdashboard/pestdetection" },
  { label: "Weather", icon: <CloudSun size={22} color="#d97706" />, bg: "#fffbeb", path: "/farmerdashboard/weather" },
];

export default function FarmerOverview() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const hour = time.getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  return (
    <div className="fo-root">
      <style>{styles}</style>
      <FarmerPageHeader
        title="Farmer Overview"
        description={`${greeting}, Farmer 👋 — ${time.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}`}
      />

      <div className="fo-body">
        {/* Tip of the day */}
        <div className="fo-tip-card">
          <div className="fo-tip-icon">🌱</div>
          <div>
            <div className="fo-tip-title">Tip of the Day</div>
            <div className="fo-tip-text">
              Kharif season is approaching. Ensure your soil nitrogen levels are above 50 mg/kg for optimal rice or maize growth. Use organic compost 2 weeks before sowing.
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="fo-stats-grid">
          {stats.map((s, i) => (
            <div className="fo-stat-card" key={i}>
              <div className="fo-stat-icon" style={{ background: s.iconBg }}>
                {s.icon}
              </div>
              <div>
                <div className="fo-stat-label">{s.label}</div>
                <div className="fo-stat-value">{s.value}</div>
                <div className="fo-stat-sub">{s.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div style={{ marginBottom: 8 }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 700, color: "#14532d", marginBottom: 12 }}>
            Quick Actions
          </div>
          <div className="fo-quick-grid">
            {quickActions.map((q, i) => (
              <a key={i} href={q.path} className="fo-quick-btn">
                <div className="fo-quick-icon" style={{ background: q.bg }}>
                  {q.icon}
                </div>
                <span className="fo-quick-label">{q.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Weather + Activity */}
        <div className="fo-grid-2">
          {/* Weather */}
          <div className="fo-card">
            <div className="fo-card-header">
              <div className="fo-card-title">Today's Weather</div>
              <span className="fo-badge" style={{ background: "#f0fdf4", color: "#16a34a" }}>Nagpur</span>
            </div>
            <div className="fo-card-body">
              <div style={{ textAlign: "center", marginBottom: 16 }}>
                <div style={{ fontSize: "3rem" }}>⛅</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, color: "#14532d" }}>32°C</div>
                <div style={{ fontSize: "0.82rem", color: "#6b7280" }}>Partly Cloudy</div>
              </div>
              <div className="fo-weather-grid">
                <div className="fo-weather-item">
                  <div className="fo-weather-icon" style={{ background: "#eff6ff" }}>
                    <Droplets size={18} color="#2563eb" />
                  </div>
                  <div>
                    <div className="fo-weather-label">Humidity</div>
                    <div className="fo-weather-value">68%</div>
                  </div>
                </div>
                <div className="fo-weather-item">
                  <div className="fo-weather-icon" style={{ background: "#fef2f2" }}>
                    <Thermometer size={18} color="#dc2626" />
                  </div>
                  <div>
                    <div className="fo-weather-label">Feels Like</div>
                    <div className="fo-weather-value">35°C</div>
                  </div>
                </div>
                <div className="fo-weather-item">
                  <div className="fo-weather-icon" style={{ background: "#f0fdf4" }}>
                    <Wind size={18} color="#16a34a" />
                  </div>
                  <div>
                    <div className="fo-weather-label">Wind</div>
                    <div className="fo-weather-value">12 km/h</div>
                  </div>
                </div>
                <div className="fo-weather-item">
                  <div className="fo-weather-icon" style={{ background: "#fffbeb" }}>
                    <CloudSun size={18} color="#d97706" />
                  </div>
                  <div>
                    <div className="fo-weather-label">Rainfall</div>
                    <div className="fo-weather-value">0 mm</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="fo-card">
            <div className="fo-card-header">
              <div className="fo-card-title">Recent Activity</div>
              <span className="fo-badge" style={{ background: "#f3f4f6", color: "#6b7280" }}>Last 7 days</span>
            </div>
            <div className="fo-card-body">
              {activities.map((a, i) => (
                <div className="fo-activity-item" key={i}>
                  <div className="fo-activity-dot" style={{ background: a.color }} />
                  <div>
                    <div className="fo-activity-text">{a.text}</div>
                    <div className="fo-activity-time">{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}