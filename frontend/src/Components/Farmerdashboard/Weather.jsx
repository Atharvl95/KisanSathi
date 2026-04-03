import { useState, useEffect } from "react";
import { Cloud, RefreshCw, MapPin, Wind, Droplets, Eye, Thermometer, Sunrise, Sunset, CheckCircle, AlertTriangle, Info, Search } from "lucide-react";
import { FarmerPageHeader } from "../../Pages/Farmerdash/Farmerdash";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');

  .wr-root {
    font-family: 'DM Sans', sans-serif;
    background: #f7fdf9;
    min-height: 100vh;
  }

  .wr-body { padding: 24px; }

  .wr-grid {
    display: grid;
    grid-template-columns: 1fr 380px;
    gap: 20px;
    align-items: start;
  }

  @media (max-width: 900px) {
    .wr-grid { grid-template-columns: 1fr; }
  }

  /* ── Card (identical to cr-card / pd-card) ── */
  .wr-card {
    background: #ffffff;
    border-radius: 16px;
    border: 1px solid #e9f7ef;
    overflow: hidden;
    margin-bottom: 20px;
  }
  .wr-card:last-child { margin-bottom: 0; }

  .wr-card-header {
    padding: 16px 20px;
    border-bottom: 1px solid #e9f7ef;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .wr-card-title {
    font-family: 'Playfair Display', serif;
    font-size: 1rem;
    font-weight: 700;
    color: #14532d;
  }

  .wr-card-sub {
    font-size: 0.75rem;
    color: #6b7280;
    margin-top: 2px;
  }

  .wr-card-body { padding: 20px; }

  /* ── Location Bar ── */
  .wr-loc-bar {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }

  .wr-loc-input-wrap {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 14px;
    background: #ffffff;
    border: 1.5px solid #bbf7d0;
    border-radius: 12px;
    transition: border-color 0.2s;
  }

  .wr-loc-input-wrap:focus-within { border-color: #16a34a; }

  .wr-loc-input {
    border: none;
    outline: none;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.88rem;
    color: #14532d;
    background: transparent;
    width: 100%;
  }

  .wr-loc-input::placeholder { color: #9ca3af; }

  .wr-loc-btn {
    padding: 10px 16px;
    background: linear-gradient(135deg, #14532d, #16a34a);
    border: none;
    border-radius: 12px;
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: all 0.2s;
    box-shadow: 0 4px 12px rgba(22,101,52,0.22);
    white-space: nowrap;
  }

  .wr-loc-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(22,101,52,0.3); }
  .wr-loc-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

  .wr-gps-btn {
    padding: 10px 14px;
    background: #ffffff;
    border: 1.5px solid #bbf7d0;
    border-radius: 12px;
    color: #16a34a;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: all 0.2s;
    white-space: nowrap;
  }

  .wr-gps-btn:hover { background: #f0fdf4; }

  /* ── Current Weather Hero ── */
  .wr-hero {
    background: linear-gradient(135deg, #14532d, #166534);
    border-radius: 14px;
    padding: 24px;
    margin-bottom: 16px;
    position: relative;
    overflow: hidden;
  }

  .wr-hero::before {
    content: '';
    position: absolute;
    top: -40px; right: -40px;
    width: 140px; height: 140px;
    border-radius: 50%;
    background: rgba(255,255,255,0.05);
  }

  .wr-hero::after {
    content: '';
    position: absolute;
    bottom: -30px; left: -30px;
    width: 100px; height: 100px;
    border-radius: 50%;
    background: rgba(255,255,255,0.04);
  }

  .wr-hero-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  .wr-hero-emoji { font-size: 4rem; line-height: 1; }

  .wr-hero-temp {
    font-family: 'Playfair Display', serif;
    font-size: 3.2rem;
    font-weight: 800;
    color: #ffffff;
    line-height: 1;
  }

  .wr-hero-unit { font-size: 1.4rem; font-weight: 400; color: rgba(255,255,255,0.7); }

  .wr-hero-condition {
    font-size: 1.1rem;
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 2px;
  }

  .wr-hero-loc {
    font-size: 0.78rem;
    color: rgba(255,255,255,0.6);
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .wr-hero-feels {
    font-size: 0.8rem;
    color: rgba(255,255,255,0.65);
    margin-top: 4px;
  }

  .wr-hero-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    margin-top: 4px;
  }

  .wr-hero-stat {
    background: rgba(255,255,255,0.1);
    border-radius: 10px;
    padding: 8px 10px;
    text-align: center;
    backdrop-filter: blur(4px);
  }

  .wr-hero-stat-val {
    font-size: 0.92rem;
    font-weight: 700;
    color: #ffffff;
  }

  .wr-hero-stat-label {
    font-size: 0.65rem;
    color: rgba(255,255,255,0.6);
    margin-top: 1px;
  }

  /* ── Info items (mirrors cr-info-item) ── */
  .wr-info-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 10px 0;
    border-bottom: 1px solid #f3f4f6;
  }

  .wr-info-item:last-child { border-bottom: none; }

  .wr-info-icon {
    width: 32px; height: 32px;
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    font-size: 15px;
  }

  .wr-info-label { font-size: 0.72rem; color: #9ca3af; }
  .wr-info-value { font-size: 0.85rem; font-weight: 600; color: #14532d; }

  /* ── 7-Day Forecast ── */
  .wr-forecast-row {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 0;
    border-bottom: 1px solid #f3f4f6;
  }

  .wr-forecast-row:last-child { border-bottom: none; }

  .wr-forecast-day {
    font-size: 0.82rem;
    font-weight: 600;
    color: #374151;
    width: 36px;
    flex-shrink: 0;
  }

  .wr-forecast-emoji { font-size: 1.4rem; flex-shrink: 0; }

  .wr-forecast-bar-wrap {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .wr-forecast-temps {
    display: flex;
    justify-content: space-between;
    font-size: 0.72rem;
    color: #9ca3af;
  }

  .wr-forecast-bar {
    height: 4px;
    background: #e5e7eb;
    border-radius: 10px;
    overflow: hidden;
  }

  .wr-forecast-fill {
    height: 100%;
    border-radius: 10px;
    background: linear-gradient(90deg, #16a34a, #4ade80);
  }

  .wr-forecast-rain {
    font-size: 0.72rem;
    color: #2563eb;
    font-weight: 600;
    width: 32px;
    text-align: right;
    flex-shrink: 0;
  }

  .wr-forecast-temp-main {
    font-size: 0.88rem;
    font-weight: 700;
    color: #14532d;
    width: 40px;
    text-align: right;
    flex-shrink: 0;
  }

  /* ── Rain Prediction ── */
  .wr-rain-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid #f3f4f6;
  }

  .wr-rain-row:last-child { border-bottom: none; }

  .wr-rain-time {
    font-size: 0.8rem;
    font-weight: 600;
    color: #374151;
    min-width: 60px;
  }

  .wr-rain-prob-bar {
    flex: 1;
    height: 6px;
    background: #e5e7eb;
    border-radius: 10px;
    overflow: hidden;
    margin: 0 12px;
  }

  .wr-rain-prob-fill {
    height: 100%;
    border-radius: 10px;
    background: linear-gradient(90deg, #2563eb, #60a5fa);
    transition: width 1s ease;
  }

  .wr-rain-pct {
    font-size: 0.8rem;
    font-weight: 700;
    color: #2563eb;
    width: 34px;
    text-align: right;
  }

  /* ── Farming Advice ── */
  .wr-advice-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 8px;
  }

  .wr-advice-item:last-child { margin-bottom: 0; }

  .wr-advice-good  { background: #f0fdf4; border: 1px solid #bbf7d0; }
  .wr-advice-warn  { background: #fef9c3; border: 1px solid #fde68a; }
  .wr-advice-alert { background: #fee2e2; border: 1px solid #fca5a5; }

  .wr-advice-icon { font-size: 1.1rem; margin-top: 1px; flex-shrink: 0; }

  .wr-advice-text-wrap {}

  .wr-advice-title {
    font-size: 0.83rem;
    font-weight: 700;
    margin-bottom: 1px;
  }

  .wr-advice-good  .wr-advice-title { color: #14532d; }
  .wr-advice-warn  .wr-advice-title { color: #b45309; }
  .wr-advice-alert .wr-advice-title { color: #dc2626; }

  .wr-advice-sub {
    font-size: 0.73rem;
    color: #6b7280;
    line-height: 1.4;
  }

  /* ── Sun times ── */
  .wr-sun-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .wr-sun-item {
    background: #f7fdf9;
    border: 1px solid #e9f7ef;
    border-radius: 12px;
    padding: 14px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .wr-sun-icon {
    width: 36px; height: 36px;
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }

  .wr-sun-label { font-size: 0.72rem; color: #9ca3af; }
  .wr-sun-val   { font-size: 0.95rem; font-weight: 700; color: #14532d; }

  /* ── Tip row (mirrors cr-tip-row) ── */
  .wr-tip-row {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    padding: 10px;
    background: #f0fdf4;
    border-radius: 10px;
    border: 1px solid #bbf7d0;
    margin-top: 12px;
  }

  .wr-tip-text { font-size: 0.78rem; color: #166534; line-height: 1.5; }

  /* ── Empty / Loading ── */
  .wr-empty {
    text-align: center;
    padding: 40px 20px;
    color: #9ca3af;
  }

  .wr-empty-icon { font-size: 3rem; margin-bottom: 12px; opacity: 0.4; }
  .wr-empty-text { font-size: 0.85rem; line-height: 1.6; }

  .wr-error {
    text-align: center;
    padding: 20px;
    color: #dc2626;
    font-size: 0.83rem;
    background: #fee2e2;
    border-radius: 10px;
    border: 1px solid #fca5a5;
  }

  /* ── Refresh btn ── */
  .wr-refresh-btn {
    padding: 8px 14px;
    background: transparent;
    border: 1px solid #d1d5db;
    border-radius: 10px;
    color: #6b7280;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.8rem;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: all 0.2s;
    margin-left: auto;
  }

  .wr-refresh-btn:hover { background: #f9fafb; color: #374151; }

  @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
`;

/* ── Weather condition helpers ── */
const conditionMap = {
  0:  { label: "Clear Sky",        emoji: "☀️",  farming: "sunny" },
  1:  { label: "Mainly Clear",     emoji: "🌤️", farming: "sunny" },
  2:  { label: "Partly Cloudy",    emoji: "⛅",  farming: "cloudy" },
  3:  { label: "Overcast",         emoji: "☁️",  farming: "cloudy" },
  45: { label: "Foggy",            emoji: "🌫️", farming: "foggy" },
  48: { label: "Icy Fog",          emoji: "🌫️", farming: "foggy" },
  51: { label: "Light Drizzle",    emoji: "🌦️", farming: "rainy" },
  53: { label: "Drizzle",          emoji: "🌦️", farming: "rainy" },
  55: { label: "Heavy Drizzle",    emoji: "🌧️", farming: "rainy" },
  61: { label: "Light Rain",       emoji: "🌧️", farming: "rainy" },
  63: { label: "Moderate Rain",    emoji: "🌧️", farming: "rainy" },
  65: { label: "Heavy Rain",       emoji: "🌧️", farming: "rainy" },
  71: { label: "Light Snow",       emoji: "🌨️", farming: "cold" },
  73: { label: "Moderate Snow",    emoji: "❄️",  farming: "cold" },
  75: { label: "Heavy Snow",       emoji: "❄️",  farming: "cold" },
  80: { label: "Rain Showers",     emoji: "🌦️", farming: "rainy" },
  81: { label: "Heavy Showers",    emoji: "🌧️", farming: "rainy" },
  82: { label: "Violent Showers",  emoji: "⛈️", farming: "stormy" },
  95: { label: "Thunderstorm",     emoji: "⛈️", farming: "stormy" },
  99: { label: "Hailstorm",        emoji: "🌩️", farming: "stormy" },
};

const weekDays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

/* ── Farming advice generator ── */
function getFarmingAdvice(weather) {
  const { temp, humidity, windspeed, rain_prob, condition_type } = weather;
  const advice = [];

  if (condition_type === "sunny" && rain_prob < 20) {
    advice.push({ type: "good",  icon: "💧", title: "Good day for irrigation", sub: "Low rain chance — water your crops efficiently today." });
  }
  if (rain_prob > 60) {
    advice.push({ type: "warn",  icon: "🐛", title: "Avoid pesticide spraying", sub: `${rain_prob}% rain chance — spray will wash off before acting.` });
  }
  if (windspeed > 20) {
    advice.push({ type: "warn",  icon: "💨", title: "Wind too strong for spraying", sub: `Wind at ${windspeed} km/h — chemicals may drift to other fields.` });
  }
  if (condition_type === "sunny" && rain_prob < 15) {
    advice.push({ type: "good",  icon: "🌾", title: "Safe to harvest today", sub: "No rain expected — ideal conditions for harvesting." });
  }
  if (humidity > 80) {
    advice.push({ type: "alert", icon: "🦠", title: "High disease risk", sub: `Humidity at ${humidity}% — monitor for fungal diseases on crops.` });
  }
  if (condition_type === "stormy") {
    advice.push({ type: "alert", icon: "⚠️", title: "Avoid field activities", sub: "Thunderstorm expected — stay indoors and secure equipment." });
  }
  if (temp > 38) {
    advice.push({ type: "warn",  icon: "🌡️", title: "Heat stress risk", sub: `Temperature ${temp}°C — water crops early morning or evening.` });
  }
  if (condition_type === "sunny" && humidity < 40 && windspeed < 15) {
    advice.push({ type: "good",  icon: "✅", title: "Ideal spraying conditions", sub: "Low humidity, low wind — perfect for pesticide application." });
  }
  if (advice.length === 0) {
    advice.push({ type: "good", icon: "✅", title: "Normal farming day", sub: "Conditions are stable — proceed with regular activities." });
  }
  return advice;
}

/* ── Main Component ── */
export default function WeatherPage() {
  const [query,    setQuery]    = useState("");
  const [weather,  setWeather]  = useState(null);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState(null);
  const [locName,  setLocName]  = useState("");
  const [lastUpd,  setLastUpd]  = useState(null);

  /* Geocode city name → lat/lon via Open-Meteo geocoding */
  const geocode = async (city) => {
    const res  = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`);
    const data = await res.json();
    if (!data.results?.length) throw new Error("Location not found. Try a different city name.");
    const r = data.results[0];
    return { lat: r.latitude, lon: r.longitude, name: `${r.name}, ${r.country}` };
  };

  /* Fetch weather from Open-Meteo (free, no API key) */
  const fetchWeather = async (lat, lon, name) => {
    setLoading(true);
    setError(null);
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}`
        + `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,precipitation_probability`
        + `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset`
        + `&hourly=precipitation_probability`
        + `&timezone=auto&forecast_days=7`;

      const res  = await fetch(url);
      const data = await res.json();
      const c    = data.current;
      const d    = data.daily;
      const h    = data.hourly;

      /* Current condition */
      const cond = conditionMap[c.weather_code] || { label: "Unknown", emoji: "🌡️", farming: "cloudy" };

      /* Hourly rain for today (0–23) */
      const todayHourly = h.precipitation_probability.slice(0, 24).map((p, i) => ({
        time: `${String(i).padStart(2,"0")}:00`,
        prob: p,
      }));

      /* Pick representative hours */
      const rainSlots = [
        { label: "Morning",   prob: Math.max(...todayHourly.slice(6,12).map(x=>x.prob))  },
        { label: "Afternoon", prob: Math.max(...todayHourly.slice(12,18).map(x=>x.prob)) },
        { label: "Evening",   prob: Math.max(...todayHourly.slice(18,24).map(x=>x.prob)) },
        { label: "Night",     prob: Math.max(...todayHourly.slice(0,6).map(x=>x.prob))   },
      ];

      /* 7-day forecast */
      const forecast = d.weather_code.map((code, i) => {
        const date = new Date(d.time ? d.time[i] : Date.now());
        const dc   = conditionMap[code] || { emoji: "🌡️" };
        return {
          day:      weekDays[date.getDay()],
          emoji:    dc.emoji,
          max:      Math.round(d.temperature_2m_max[i]),
          min:      Math.round(d.temperature_2m_min[i]),
          rainProb: d.precipitation_probability_max[i],
        };
      });

      /* Sunrise / Sunset (today) */
      const fmtTime = (iso) => {
        const dt = new Date(iso);
        return dt.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
      };

      setWeather({
        temp:           Math.round(c.temperature_2m),
        feels:          Math.round(c.apparent_temperature),
        humidity:       c.relative_humidity_2m,
        windspeed:      Math.round(c.wind_speed_10m),
        rain_prob:      c.precipitation_probability ?? rainSlots[1].prob,
        condition:      cond.label,
        emoji:          cond.emoji,
        condition_type: cond.farming,
        forecast,
        rainSlots,
        sunrise:        fmtTime(d.sunrise ? d.sunrise[0] : ""),
        sunset:         fmtTime(d.sunset   ? d.sunset[0]   : ""),
      });

      setLocName(name);
      setLastUpd(new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true }));
    } catch (e) {
      setError(e.message || "Failed to fetch weather. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* Search by city */
  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const { lat, lon, name } = await geocode(query.trim());
      await fetchWeather(lat, lon, name);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  /* GPS location */
  const handleGPS = () => {
    if (!navigator.geolocation) { setError("Geolocation not supported by your browser."); return; }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude: lat, longitude: lon } = pos.coords;
          /* Reverse geocode */
          const res  = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
          const data = await res.json();
          const name = data.address?.city || data.address?.town || data.address?.village || "Your Location";
          await fetchWeather(lat, lon, `${name}, ${data.address?.country || ""}`);
        } catch {
          await fetchWeather(pos.coords.latitude, pos.coords.longitude, "Your Location");
        }
      },
      () => { setError("Location access denied. Enter a city name instead."); setLoading(false); }
    );
  };

  /* Load default on mount (Pune, Maharashtra) */
  useEffect(() => {
    fetchWeather(18.5204, 73.8567, "Pune, India");
    // eslint-disable-next-line
  }, []);

  const advice = weather ? getFarmingAdvice(weather) : [];

  return (
    <div className="wr-root">
      <style>{styles}</style>

      <FarmerPageHeader
        title="Live Weather"
        description="Real-time weather data to help you plan irrigation, spraying & harvesting"
      />

      <div className="wr-body">

        {/* ── Location Bar ── */}
        <div className="wr-loc-bar">
          <div className="wr-loc-input-wrap">
            <Search size={16} color="#9ca3af" />
            <input
              className="wr-loc-input"
              placeholder="Enter city or village name…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>
          <button className="wr-loc-btn" onClick={handleSearch} disabled={loading || !query.trim()}>
            {loading ? <RefreshCw size={15} style={{ animation: "spin 1s linear infinite" }} /> : <Search size={15} />}
            Search
          </button>
          <button className="wr-gps-btn" onClick={handleGPS} disabled={loading}>
            <MapPin size={15} /> Use GPS
          </button>
        </div>

        <div className="wr-grid">

          {/* ══════════════ LEFT COLUMN ══════════════ */}
          <div>

            {/* Current Weather Card */}
            <div className="wr-card">
              <div className="wr-card-header">
                <div style={{ width: 32, height: 32, borderRadius: 10, background: "#f0fdf4", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Cloud size={18} color="#16a34a" />
                </div>
                <div style={{ flex: 1 }}>
                  <div className="wr-card-title">Current Weather</div>
                  <div className="wr-card-sub">{locName || "—"}{lastUpd ? ` · Updated ${lastUpd}` : ""}</div>
                </div>
                <button className="wr-refresh-btn" onClick={() => weather && fetchWeather(...[])} style={{ display: "flex" }}
                  onClick={() => {
                    if (query.trim()) handleSearch();
                    else handleGPS();
                  }}
                >
                  <RefreshCw size={13} style={loading ? { animation: "spin 1s linear infinite" } : {}} />
                  Refresh
                </button>
              </div>
              <div className="wr-card-body">
                {error && <div className="wr-error">⚠️ {error}</div>}

                {!weather && !error && (
                  <div className="wr-empty">
                    <div className="wr-empty-icon">🌦️</div>
                    <div className="wr-empty-text">Loading weather data…</div>
                  </div>
                )}

                {weather && (
                  <>
                    <div className="wr-hero">
                      <div className="wr-hero-top">
                        <div>
                          <div className="wr-hero-emoji">{weather.emoji}</div>
                          <div className="wr-hero-condition">{weather.condition}</div>
                          <div className="wr-hero-loc"><MapPin size={11} /> {locName}</div>
                          <div className="wr-hero-feels">Feels like {weather.feels}°C</div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div className="wr-hero-temp">
                            {weather.temp}<span className="wr-hero-unit">°C</span>
                          </div>
                        </div>
                      </div>

                      <div className="wr-hero-stats">
                        <div className="wr-hero-stat">
                          <div className="wr-hero-stat-val">💧 {weather.humidity}%</div>
                          <div className="wr-hero-stat-label">Humidity</div>
                        </div>
                        <div className="wr-hero-stat">
                          <div className="wr-hero-stat-val">🌬️ {weather.windspeed} km/h</div>
                          <div className="wr-hero-stat-label">Wind Speed</div>
                        </div>
                        <div className="wr-hero-stat">
                          <div className="wr-hero-stat-val">🌧️ {weather.rain_prob}%</div>
                          <div className="wr-hero-stat-label">Rain Chance</div>
                        </div>
                      </div>
                    </div>

                    {/* Sunrise / Sunset */}
                    <div className="wr-sun-row" style={{ marginBottom: 8 }}>
                      <div className="wr-sun-item">
                        <div className="wr-sun-icon" style={{ background: "#fef9c3" }}>🌅</div>
                        <div>
                          <div className="wr-sun-label">Sunrise</div>
                          <div className="wr-sun-val">{weather.sunrise}</div>
                        </div>
                      </div>
                      <div className="wr-sun-item">
                        <div className="wr-sun-icon" style={{ background: "#fed7aa" }}>🌇</div>
                        <div>
                          <div className="wr-sun-label">Sunset</div>
                          <div className="wr-sun-val">{weather.sunset}</div>
                        </div>
                      </div>
                    </div>

                    <div className="wr-tip-row">
                      <Info size={14} color="#16a34a" style={{ flexShrink: 0, marginTop: 2 }} />
                      <div className="wr-tip-text">
                        Data sourced from <strong>Open-Meteo</strong> (free, no API key). Updates automatically every refresh.
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* 7-Day Forecast Card */}
            <div className="wr-card">
              <div className="wr-card-header">
                <div style={{ width: 32, height: 32, borderRadius: 10, background: "#f0fdf4", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>
                  📅
                </div>
                <div>
                  <div className="wr-card-title">7-Day Forecast</div>
                  <div className="wr-card-sub">Plan your irrigation & harvest schedule</div>
                </div>
              </div>
              <div className="wr-card-body">
                {!weather && (
                  <div className="wr-empty">
                    <div className="wr-empty-icon" style={{ opacity: 0.4 }}>📅</div>
                    <div className="wr-empty-text">Forecast will appear after loading weather data.</div>
                  </div>
                )}
                {weather && weather.forecast.map((f, i) => {
                  const range = f.max - f.min || 1;
                  const fill  = Math.max(10, Math.min(100, ((f.max - 20) / 20) * 100));
                  return (
                    <div className="wr-forecast-row" key={i}>
                      <div className="wr-forecast-day" style={{ fontWeight: i === 0 ? 700 : 600, color: i === 0 ? "#16a34a" : "#374151" }}>
                        {i === 0 ? "Today" : f.day}
                      </div>
                      <div className="wr-forecast-emoji">{f.emoji}</div>
                      <div className="wr-forecast-bar-wrap">
                        <div className="wr-forecast-temps">
                          <span>{f.min}°</span>
                          <span>{f.max}°</span>
                        </div>
                        <div className="wr-forecast-bar">
                          <div className="wr-forecast-fill" style={{ width: `${fill}%` }} />
                        </div>
                      </div>
                      <div className="wr-forecast-rain" title="Rain probability">
                        {f.rainProb > 0 ? `${f.rainProb}%` : "—"}
                      </div>
                      <div className="wr-forecast-temp-main">{f.max}°C</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Rain Prediction Card */}
            <div className="wr-card">
              <div className="wr-card-header">
                <div style={{ width: 32, height: 32, borderRadius: 10, background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>
                  🌧️
                </div>
                <div>
                  <div className="wr-card-title">Rain Prediction — Today</div>
                  <div className="wr-card-sub">Helps you decide when to spray pesticides</div>
                </div>
              </div>
              <div className="wr-card-body">
                {!weather && (
                  <div className="wr-empty">
                    <div className="wr-empty-icon" style={{ opacity: 0.4 }}>🌧️</div>
                    <div className="wr-empty-text">Rain data will appear after loading weather.</div>
                  </div>
                )}
                {weather && weather.rainSlots.map((r, i) => (
                  <div className="wr-rain-row" key={i}>
                    <div className="wr-rain-time">{r.time}</div>
                    <div className="wr-rain-prob-bar">
                      <div className="wr-rain-prob-fill" style={{ width: `${r.prob}%` }} />
                    </div>
                    <div className="wr-rain-pct">{r.prob}%</div>
                  </div>
                ))}
                {weather && (
                  <div className="wr-tip-row" style={{ marginTop: 10 }}>
                    <Info size={14} color="#16a34a" style={{ flexShrink: 0, marginTop: 2 }} />
                    <div className="wr-tip-text">
                      Avoid spraying pesticides if rain probability exceeds 40%. Spray in morning when wind is lowest.
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* ══════════════ RIGHT COLUMN ══════════════ */}
          <div>

            {/* Smart Farming Advice Card */}
            <div className="wr-card">
              <div className="wr-card-header">
                <div style={{ width: 32, height: 32, borderRadius: 10, background: "#f0fdf4", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <CheckCircle size={18} color="#16a34a" />
                </div>
                <div>
                  <div className="wr-card-title">Smart Farming Advice</div>
                  <div className="wr-card-sub">AI-based suggestions for today</div>
                </div>
              </div>
              <div className="wr-card-body">
                {!weather && (
                  <div className="wr-empty">
                    <div className="wr-empty-icon" style={{ opacity: 0.4 }}>🌾</div>
                    <div className="wr-empty-text">Farming advice will appear based on live weather data.</div>
                  </div>
                )}
                {weather && advice.map((a, i) => (
                  <div className={`wr-advice-item wr-advice-${a.type}`} key={i}>
                    <div className="wr-advice-icon">{a.icon}</div>
                    <div className="wr-advice-text-wrap">
                      <div className="wr-advice-title">{a.title}</div>
                      <div className="wr-advice-sub">{a.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Wind & Humidity Detail Card */}
            <div className="wr-card" style={{ marginTop: 20 }}>
              <div className="wr-card-header">
                <div style={{ width: 32, height: 32, borderRadius: 10, background: "#f0fdf4", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Wind size={18} color="#16a34a" />
                </div>
                <div>
                  <div className="wr-card-title">Wind & Humidity</div>
                  <div className="wr-card-sub">Key indicators for farming safety</div>
                </div>
              </div>
              <div className="wr-card-body">
                {!weather && (
                  <div className="wr-empty" style={{ padding: "20px" }}>
                    <div className="wr-empty-text">Loading…</div>
                  </div>
                )}
                {weather && (
                  <>
                    <div className="wr-info-item">
                      <div className="wr-info-icon" style={{ background: "#eff6ff" }}>🌬️</div>
                      <div style={{ flex: 1 }}>
                        <div className="wr-info-label">Wind Speed</div>
                        <div className="wr-info-value">{weather.windspeed} km/h — {weather.windspeed > 20 ? "⚠️ Too strong for spraying" : weather.windspeed > 10 ? "Moderate" : "✅ Calm — safe to spray"}</div>
                      </div>
                    </div>
                    <div className="wr-info-item">
                      <div className="wr-info-icon" style={{ background: "#f0fdf4" }}>💧</div>
                      <div style={{ flex: 1 }}>
                        <div className="wr-info-label">Humidity</div>
                        <div className="wr-info-value">{weather.humidity}% — {weather.humidity > 80 ? "🦠 High disease risk" : weather.humidity > 60 ? "Moderate" : "✅ Low — good conditions"}</div>
                      </div>
                    </div>
                    <div className="wr-info-item">
                      <div className="wr-info-icon" style={{ background: "#fef3c7" }}>🌡️</div>
                      <div style={{ flex: 1 }}>
                        <div className="wr-info-label">Temperature</div>
                        <div className="wr-info-value">{weather.temp}°C — {weather.temp > 38 ? "🔥 Heat stress risk for crops" : weather.temp > 30 ? "Warm" : "✅ Comfortable"}</div>
                      </div>
                    </div>
                    <div className="wr-info-item">
                      <div className="wr-info-icon" style={{ background: "#fee2e2" }}>🌧️</div>
                      <div style={{ flex: 1 }}>
                        <div className="wr-info-label">Rain Probability</div>
                        <div className="wr-info-value">{weather.rain_prob}% — {weather.rain_prob > 60 ? "🚫 Avoid spraying pesticides" : weather.rain_prob > 30 ? "Monitor closely" : "✅ Safe to spray"}</div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* About Data Card (mirrors "About This Model" card) */}
            <div className="wr-card" style={{ marginTop: 20 }}>
              <div className="wr-card-header">
                <div className="wr-card-title">About Weather Data</div>
              </div>
              <div className="wr-card-body" style={{ fontSize: "0.82rem", color: "#6b7280", lineHeight: 1.7 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                    <span style={{ background: "#f0fdf4", borderRadius: 6, padding: "2px 8px", fontSize: "0.72rem", fontWeight: 600, color: "#16a34a" }}>Free API</span>
                    <span style={{ background: "#f3f4f6", borderRadius: 6, padding: "2px 8px", fontSize: "0.72rem", fontWeight: 600, color: "#374151" }}>7-Day Forecast</span>
                    <span style={{ background: "#eff6ff", borderRadius: 6, padding: "2px 8px", fontSize: "0.72rem", fontWeight: 600, color: "#2563eb" }}>Real-Time</span>
                  </div>
                  <p style={{ margin: 0 }}>
                    Powered by <strong style={{ color: "#14532d" }}>Open-Meteo API</strong> — free, open-source weather API with hourly & daily forecasts. No API key required.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}