import { useState } from "react";
import { Sprout, RefreshCw, CheckCircle, Info } from "lucide-react";
import { FarmerPageHeader } from "../../Pages/Farmerdash/Farmerdash";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');

  .cr-root {
    font-family: 'DM Sans', sans-serif;
    background: #f7fdf9;
    min-height: 100vh;
  }

  .cr-body { padding: 24px; }

  .cr-grid {
    display: grid;
    grid-template-columns: 1fr 380px;
    gap: 20px;
    align-items: start;
  }

  @media (max-width: 900px) {
    .cr-grid { grid-template-columns: 1fr; }
  }

  .cr-card {
    background: #ffffff;
    border-radius: 16px;
    border: 1px solid #e9f7ef;
    overflow: hidden;
  }

  .cr-card-header {
    padding: 16px 20px;
    border-bottom: 1px solid #e9f7ef;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .cr-card-title {
    font-family: 'Playfair Display', serif;
    font-size: 1rem;
    font-weight: 700;
    color: #14532d;
  }

  .cr-card-sub {
    font-size: 0.75rem;
    color: #6b7280;
    margin-top: 2px;
  }

  .cr-card-body { padding: 20px; }

  .cr-fields { display: flex; flex-direction: column; gap: 16px; }

  .cr-field-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .cr-field { display: flex; flex-direction: column; gap: 6px; }

  .cr-label {
    font-size: 0.78rem;
    font-weight: 600;
    color: #374151;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .cr-label-icon { font-size: 14px; }

  .cr-slider-wrap {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .cr-slider-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .cr-slider-val {
    font-size: 0.82rem;
    font-weight: 700;
    color: #14532d;
    background: #f0fdf4;
    padding: 2px 8px;
    border-radius: 6px;
    border: 1px solid #bbf7d0;
  }

  input[type=range].cr-range {
    width: 100%;
    height: 5px;
    -webkit-appearance: none;
    appearance: none;
    background: #e5e7eb;
    border-radius: 4px;
    outline: none;
    cursor: pointer;
  }

  input[type=range].cr-range::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 18px; height: 18px;
    border-radius: 50%;
    background: #16a34a;
    cursor: pointer;
    border: 2px solid #fff;
    box-shadow: 0 0 0 3px rgba(22,163,74,0.2);
    transition: box-shadow 0.2s;
  }

  input[type=range].cr-range::-webkit-slider-thumb:hover {
    box-shadow: 0 0 0 5px rgba(22,163,74,0.25);
  }

  .cr-predict-btn {
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
    margin-top: 8px;
  }

  .cr-predict-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(22,101,52,0.3);
  }

  .cr-predict-btn:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }

  .cr-reset-btn {
    width: 100%;
    padding: 10px;
    background: transparent;
    border: 1px solid #d1d5db;
    border-radius: 12px;
    color: #6b7280;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.85rem;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 0.2s;
    margin-top: 8px;
  }

  .cr-reset-btn:hover { background: #f9fafb; color: #374151; }

  .cr-error-box {
    background: #fef2f2;
    border: 1px solid #fecaca;
    color: #b91c1c;
    border-radius: 10px;
    padding: 10px 14px;
    font-size: 0.82rem;
    margin-top: 8px;
  }

  /* Result */
  .cr-result { animation: cr-fadeIn 0.4s ease; }

  @keyframes cr-fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .cr-result-hero {
    background: linear-gradient(135deg, #14532d, #166534);
    border-radius: 14px;
    padding: 24px;
    text-align: center;
    margin-bottom: 16px;
    position: relative;
    overflow: hidden;
  }

  .cr-result-hero::before {
    content: '';
    position: absolute;
    top: -40px; right: -40px;
    width: 120px; height: 120px;
    border-radius: 50%;
    background: rgba(255,255,255,0.05);
  }

  .cr-result-hero::after {
    content: '';
    position: absolute;
    bottom: -30px; left: -30px;
    width: 100px; height: 100px;
    border-radius: 50%;
    background: rgba(255,255,255,0.04);
  }

  .cr-result-emoji { font-size: 3.5rem; display: block; margin-bottom: 8px; }

  .cr-result-label {
    font-size: 0.7rem;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.6);
    margin-bottom: 4px;
  }

  .cr-result-name {
    font-family: 'Playfair Display', serif;
    font-size: 1.8rem;
    font-weight: 800;
    color: #ffffff;
    text-transform: capitalize;
  }

  .cr-result-hint {
    font-size: 0.8rem;
    color: rgba(255,255,255,0.65);
    margin-top: 4px;
  }

  .cr-conf-row {
    display: flex;
    justify-content: space-between;
    font-size: 0.75rem;
    color: #6b7280;
    margin-bottom: 4px;
  }

  .cr-conf-bar {
    height: 6px;
    background: #e5e7eb;
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 12px;
  }

  .cr-conf-fill {
    height: 100%;
    background: linear-gradient(90deg, #16a34a, #4ade80);
    border-radius: 10px;
    transition: width 1s ease;
  }

  .cr-info-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 10px 0;
    border-bottom: 1px solid #f3f4f6;
  }

  .cr-info-item:last-child { border-bottom: none; }

  .cr-info-icon {
    width: 32px; height: 32px;
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    font-size: 16px;
  }

  .cr-info-label { font-size: 0.72rem; color: #9ca3af; }
  .cr-info-value { font-size: 0.85rem; font-weight: 600; color: #14532d; }

  .cr-empty {
    text-align: center;
    padding: 40px 20px;
    color: #9ca3af;
  }

  .cr-empty-icon { font-size: 3rem; margin-bottom: 12px; opacity: 0.4; }
  .cr-empty-text { font-size: 0.85rem; line-height: 1.6; }

  .cr-tip-row {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    padding: 10px;
    background: #f0fdf4;
    border-radius: 10px;
    border: 1px solid #bbf7d0;
    margin-top: 12px;
  }

  .cr-tip-text { font-size: 0.78rem; color: #166534; line-height: 1.5; }
`;

// ── Field definitions use min/max from the actual dataset ──
const fields = [
  { key: "N",           label: "Nitrogen (N)",    icon: "🌿", unit: "mg/kg", min: 0,   max: 140, step: 1,    default: 50  },
  { key: "P",           label: "Phosphorus (P)",  icon: "🔴", unit: "mg/kg", min: 5,   max: 145, step: 1,    default: 50  },
  { key: "K",           label: "Potassium (K)",   icon: "🟡", unit: "mg/kg", min: 5,   max: 205, step: 1,    default: 48  },
  { key: "temperature", label: "Temperature",     icon: "🌡️", unit: "°C",    min: 8,   max: 44,  step: 0.1,  default: 25  },
  { key: "humidity",    label: "Humidity",        icon: "💧", unit: "%",     min: 14,  max: 100, step: 0.1,  default: 71  },
  { key: "ph",          label: "Soil pH",         icon: "⚗️", unit: "",      min: 3.5, max: 9.9, step: 0.01, default: 6.5 },
  { key: "rainfall",    label: "Rainfall",        icon: "🌧️", unit: "mm",    min: 20,  max: 299, step: 0.1,  default: 100 },
];

const cropData = {
  rice:        { emoji: "🌾", hint: "Grows well in waterlogged fields",    season: "Kharif",       duration: "90–150 days",   water: "High"     },
  maize:       { emoji: "🌽", hint: "Needs well-drained fertile soil",     season: "Kharif/Rabi",  duration: "80–110 days",   water: "Moderate" },
  chickpea:    { emoji: "🫘", hint: "Ideal for dry, cool climates",        season: "Rabi",         duration: "90–120 days",   water: "Low"      },
  kidneybeans: { emoji: "🫘", hint: "Needs moderate temperature",          season: "Kharif",       duration: "90–120 days",   water: "Moderate" },
  pigeonpeas:  { emoji: "🌿", hint: "Drought tolerant legume",             season: "Kharif",       duration: "120–180 days",  water: "Low"      },
  mothbeans:   { emoji: "🌱", hint: "Highly drought resistant",            season: "Kharif",       duration: "60–90 days",    water: "Very Low" },
  mungbean:    { emoji: "🫛", hint: "Short-duration warm season crop",     season: "Kharif",       duration: "60–90 days",    water: "Low"      },
  blackgram:   { emoji: "⚫", hint: "Grows in hot humid conditions",       season: "Kharif",       duration: "70–90 days",    water: "Low"      },
  lentil:      { emoji: "🍂", hint: "Cool season crop, nitrogen fixer",    season: "Rabi",         duration: "90–130 days",   water: "Low"      },
  pomegranate: { emoji: "🍎", hint: "Thrives in hot arid climates",        season: "Perennial",    duration: "5–7 months",    water: "Low"      },
  banana:      { emoji: "🍌", hint: "Needs high humidity and warmth",      season: "Perennial",    duration: "10–15 months",  water: "High"     },
  mango:       { emoji: "🥭", hint: "Tropical fruit, loves heat",          season: "Perennial",    duration: "3–5 months",    water: "Low"      },
  grapes:      { emoji: "🍇", hint: "Warm dry climate preferred",          season: "Perennial",    duration: "5–8 months",    water: "Moderate" },
  watermelon:  { emoji: "🍉", hint: "Hot summer fruit",                    season: "Kharif",       duration: "70–90 days",    water: "Moderate" },
  muskmelon:   { emoji: "🍈", hint: "Warm season, well-drained soil",      season: "Kharif",       duration: "75–100 days",   water: "Moderate" },
  apple:       { emoji: "🍏", hint: "Cool temperate climate needed",       season: "Rabi",         duration: "5–6 months",    water: "Moderate" },
  orange:      { emoji: "🍊", hint: "Subtropical citrus fruit",            season: "Perennial",    duration: "6–8 months",    water: "Moderate" },
  papaya:      { emoji: "🧡", hint: "Fast growing tropical fruit",         season: "Perennial",    duration: "9–11 months",   water: "Moderate" },
  coconut:     { emoji: "🥥", hint: "Coastal humid tropical climate",      season: "Perennial",    duration: "12 months",     water: "High"     },
  cotton:      { emoji: "☁️", hint: "Needs high K and warm temp",          season: "Kharif",       duration: "150–180 days",  water: "Moderate" },
  jute:        { emoji: "🌿", hint: "Warm humid climate crop",             season: "Kharif",       duration: "100–120 days",  water: "High"     },
  coffee:      { emoji: "☕", hint: "Cool humid hill regions",             season: "Perennial",    duration: "9–11 months",   water: "Moderate" },
};

// ── Points to your Express backend ──
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const defaultValues = Object.fromEntries(fields.map(f => [f.key, f.default]));

export default function CropRecommendation() {
  const [values, setValues]   = useState(defaultValues);
  const [result, setResult]   = useState(null);       // crop name string
  const [confidence, setConfidence] = useState(null); // real confidence from model
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  const handleChange = (key, val) => {
    setValues(prev => ({ ...prev, [key]: parseFloat(val) }));
  };

  // ── Real API call to Express → Flask → ML model ──
  const handlePredict = async () => {
    setLoading(true);
    setResult(null);
    setError(null);
    setConfidence(null);

    try {
      const res = await fetch(`${API_BASE}/api/crop/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          N:           values.N,
          P:           values.P,
          K:           values.K,
          temperature: values.temperature,
          humidity:    values.humidity,
          ph:          values.ph,        // lowercase 'ph' to match Flask
          rainfall:    values.rainfall,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Prediction failed");

      setResult(data.recommended_crop);
      setConfidence(Math.round(data.confidence * 100));

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setValues(defaultValues);
    setResult(null);
    setConfidence(null);
    setError(null);
  };

  const formatVal = (f) => {
    const v = values[f.key];
    if (f.step < 0.1) return v.toFixed(2);
    if (f.step < 1)   return v.toFixed(1);
    return v;
  };

  const info = result ? cropData[result] : null;

  return (
    <div className="cr-root">
      <style>{styles}</style>
      <FarmerPageHeader
        title="Crop Recommendation"
        description="Enter your soil and climate parameters to get the best crop suggestion"
      />

      <div className="cr-body">
        <div className="cr-grid">

          {/* ── Left: Input Form ── */}
          <div className="cr-card">
            <div className="cr-card-header">
              <div style={{ width: 32, height: 32, borderRadius: 10, background: "#f0fdf4", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Sprout size={18} color="#16a34a" />
              </div>
              <div>
                <div className="cr-card-title">Soil & Climate Data</div>
                <div className="cr-card-sub">Adjust sliders to match your field conditions</div>
              </div>
            </div>
            <div className="cr-card-body">
              <div className="cr-fields">

                <div className="cr-field-row">
                  {fields.slice(0, 3).map(f => (
                    <div className="cr-field" key={f.key}>
                      <div className="cr-label">
                        <span className="cr-label-icon">{f.icon}</span>
                        {f.label}
                      </div>
                      <div className="cr-slider-wrap">
                        <div className="cr-slider-top">
                          <span style={{ fontSize: "0.72rem", color: "#9ca3af" }}>{f.min}</span>
                          <span className="cr-slider-val">{formatVal(f)}{f.unit && ` ${f.unit}`}</span>
                          <span style={{ fontSize: "0.72rem", color: "#9ca3af" }}>{f.max}</span>
                        </div>
                        <input
                          type="range"
                          className="cr-range"
                          min={f.min} max={f.max} step={f.step}
                          value={values[f.key]}
                          onChange={e => handleChange(f.key, e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cr-field-row">
                  {fields.slice(3, 5).map(f => (
                    <div className="cr-field" key={f.key}>
                      <div className="cr-label">
                        <span className="cr-label-icon">{f.icon}</span>
                        {f.label}
                      </div>
                      <div className="cr-slider-wrap">
                        <div className="cr-slider-top">
                          <span style={{ fontSize: "0.72rem", color: "#9ca3af" }}>{f.min}</span>
                          <span className="cr-slider-val">{formatVal(f)}{f.unit && ` ${f.unit}`}</span>
                          <span style={{ fontSize: "0.72rem", color: "#9ca3af" }}>{f.max}</span>
                        </div>
                        <input
                          type="range"
                          className="cr-range"
                          min={f.min} max={f.max} step={f.step}
                          value={values[f.key]}
                          onChange={e => handleChange(f.key, e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cr-field-row">
                  {fields.slice(5, 7).map(f => (
                    <div className="cr-field" key={f.key}>
                      <div className="cr-label">
                        <span className="cr-label-icon">{f.icon}</span>
                        {f.label}
                      </div>
                      <div className="cr-slider-wrap">
                        <div className="cr-slider-top">
                          <span style={{ fontSize: "0.72rem", color: "#9ca3af" }}>{f.min}</span>
                          <span className="cr-slider-val">{formatVal(f)}{f.unit && ` ${f.unit}`}</span>
                          <span style={{ fontSize: "0.72rem", color: "#9ca3af" }}>{f.max}</span>
                        </div>
                        <input
                          type="range"
                          className="cr-range"
                          min={f.min} max={f.max} step={f.step}
                          value={values[f.key]}
                          onChange={e => handleChange(f.key, e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary row */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, padding: "12px", background: "#f7fdf9", borderRadius: 12, border: "1px solid #e9f7ef" }}>
                  {fields.map(f => (
                    <div key={f.key} style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "0.65rem", color: "#9ca3af" }}>{f.label.split(" ")[0]}</div>
                      <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#14532d" }}>{formatVal(f)}</div>
                    </div>
                  ))}
                </div>

                {/* Error */}
                {error && (
                  <div className="cr-error-box">⚠️ {error}</div>
                )}

                <button className="cr-predict-btn" onClick={handlePredict} disabled={loading}>
                  {loading ? (
                    <><RefreshCw size={16} style={{ animation: "spin 1s linear infinite" }} /> Analyzing...</>
                  ) : (
                    <><Sprout size={16} /> Get Crop Recommendation</>
                  )}
                </button>
                <button className="cr-reset-btn" onClick={handleReset}>
                  <RefreshCw size={14} /> Reset to Default
                </button>

              </div>
            </div>
          </div>

          {/* ── Right: Result ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div className="cr-card">
              <div className="cr-card-header">
                <div>
                  <div className="cr-card-title">Recommendation Result</div>
                  <div className="cr-card-sub">Powered by Random Forest ML Model</div>
                </div>
                {result && <CheckCircle size={20} color="#16a34a" />}
              </div>
              <div className="cr-card-body">
                {!result && !loading && !error && (
                  <div className="cr-empty">
                    <div className="cr-empty-icon">🌾</div>
                    <div className="cr-empty-text">
                      Set your soil parameters on the left and click <strong>Get Crop Recommendation</strong> to see results.
                    </div>
                  </div>
                )}
                {loading && (
                  <div className="cr-empty">
                    <div className="cr-empty-icon" style={{ opacity: 1 }}>⏳</div>
                    <div className="cr-empty-text">Running ML model on your data...</div>
                  </div>
                )}
                {result && info && (
                  <div className="cr-result">
                    <div className="cr-result-hero">
                      <span className="cr-result-emoji">{info.emoji}</span>
                      <div className="cr-result-label">Recommended Crop</div>
                      <div className="cr-result-name">{result}</div>
                      <div className="cr-result-hint">{info.hint}</div>
                    </div>

                    <div className="cr-conf-row">
                      <span>Model confidence</span>
                      <span style={{ fontWeight: 600, color: "#14532d" }}>{confidence}%</span>
                    </div>
                    <div className="cr-conf-bar">
                      <div className="cr-conf-fill" style={{ width: `${confidence}%` }} />
                    </div>

                    <div className="cr-info-item">
                      <div className="cr-info-icon" style={{ background: "#f0fdf4" }}>📅</div>
                      <div>
                        <div className="cr-info-label">Season</div>
                        <div className="cr-info-value">{info.season}</div>
                      </div>
                    </div>
                    <div className="cr-info-item">
                      <div className="cr-info-icon" style={{ background: "#eff6ff" }}>⏱️</div>
                      <div>
                        <div className="cr-info-label">Duration</div>
                        <div className="cr-info-value">{info.duration}</div>
                      </div>
                    </div>
                    <div className="cr-info-item">
                      <div className="cr-info-icon" style={{ background: "#eff6ff" }}>💧</div>
                      <div>
                        <div className="cr-info-label">Water Requirement</div>
                        <div className="cr-info-value">{info.water}</div>
                      </div>
                    </div>

                    <div className="cr-tip-row">
                      <Info size={14} color="#16a34a" style={{ flexShrink: 0, marginTop: 2 }} />
                      <div className="cr-tip-text">
                        This recommendation is based on your soil N, P, K values and local climate data using a Random Forest classifier trained on 2,200 samples.
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Info card */}
            <div className="cr-card">
              <div className="cr-card-header">
                <div className="cr-card-title">About This Model</div>
              </div>
              <div className="cr-card-body" style={{ fontSize: "0.82rem", color: "#6b7280", lineHeight: 1.7 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ background: "#f0fdf4", borderRadius: 6, padding: "2px 8px", fontSize: "0.72rem", fontWeight: 600, color: "#16a34a" }}>99.3% Accuracy</span>
                    <span style={{ background: "#f3f4f6", borderRadius: 6, padding: "2px 8px", fontSize: "0.72rem", fontWeight: 600, color: "#374151" }}>22 Crops</span>
                    <span style={{ background: "#eff6ff", borderRadius: 6, padding: "2px 8px", fontSize: "0.72rem", fontWeight: 600, color: "#2563eb" }}>2,200 Samples</span>
                  </div>
                  <p style={{ margin: 0 }}>
                    Built using <strong style={{ color: "#14532d" }}>Random Forest Classifier</strong> with 100 decision trees. Trained on 7 soil and climate parameters across 22 crop varieties.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}