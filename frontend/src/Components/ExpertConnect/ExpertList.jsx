import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Star, Phone, Video, Clock, ChevronRight, Users, Award } from "lucide-react";

const API = import.meta.env.VITE_API_URL || "http://localhost:5002";

export default function ExpertList() {
  const navigate = useNavigate();
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterOnline, setFilterOnline] = useState(false);
  const [filterKVK, setFilterKVK] = useState(false);
  const [filterRating, setFilterRating] = useState("all");

  useEffect(() => { fetchExperts(); }, [filterOnline, filterKVK, filterRating, search]);

  const fetchExperts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filterOnline) params.set("online", "true");
      if (filterKVK) params.set("kvkFree", "true");
      if (filterRating !== "all") params.set("rating", filterRating);
      if (search) params.set("search", search);
      const res = await fetch(`${API}/api/experts?${params}`);
      const data = await res.json();
      setExperts(data.data || []);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const onSearch = (e) => { e.preventDefault(); fetchExperts(); };

  return (
    <div style={{ minHeight: "100vh", background: "#f7fdf9", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        .ec-hero { background: linear-gradient(145deg, #14532d 0%, #16a34a 100%); color: white; padding: 48px 32px; }
        .ec-hero h1 { font-family:'Playfair Display',serif; font-size:2.5rem; font-weight:800; margin:0 0 8px; line-height:1.1 }
        .ec-hero h1 span { color:#fbbf24 }
        .ec-hero p { font-size:1rem; opacity:.85; margin:0 0 28px; max-width:520px }
        .ec-search-row { display:flex; gap:0; max-width:460px }
        .ec-search-input { flex:1; padding:14px 18px; border:none; border-radius:10px 0 0 10px; font-family:'DM Sans',sans-serif; font-size:0.95rem; outline:none }
        .ec-search-btn { background:#fbbf24; color:#14532d; padding:14px 22px; border:none; border-radius:0 10px 10px 0; font-weight:700; cursor:pointer; font-size:0.95rem; white-space:nowrap }
        .ec-hero-chips { display:flex; gap:8px; flex-wrap:wrap; margin-top:16px }
        .ec-hero-chip { background:rgba(255,255,255,.15); border:1px solid rgba(255,255,255,.25); color:white; padding:6px 14px; border-radius:20px; font-size:0.8rem; cursor:pointer; transition:.2s }
        .ec-hero-chip:hover { background:rgba(255,255,255,.25) }
        .ec-stats { display:flex; gap:0; background:white; border-bottom:1px solid #e5e7eb }
        .ec-stat { flex:1; padding:20px; text-align:center; border-right:1px solid #e5e7eb }
        .ec-stat:last-child { border-right:none }
        .ec-stat-val { font-size:1.6rem; font-weight:800; color:#14532d }
        .ec-stat-lbl { font-size:0.75rem; color:#6b7280; margin-top:2px }
        .ec-main { display:flex; gap:0; max-width:1200px; margin:0 auto; padding:24px }
        .ec-filters { width:210px; flex-shrink:0 }
        .ec-filter-group { background:white; border-radius:12px; padding:18px; border:1px solid #e5e7eb; margin-bottom:16px }
        .ec-filter-title { font-size:0.85rem; font-weight:700; color:#374151; margin-bottom:14px }
        .ec-toggle-row { display:flex; justify-content:space-between; align-items:center; margin-bottom:10px }
        .ec-toggle-lbl { font-size:0.82rem; color:#4b5563 }
        .ec-toggle { position:relative; width:36px; height:20px; cursor:pointer }
        .ec-toggle input { opacity:0; width:0; height:0 }
        .ec-toggle-slider { position:absolute; inset:0; background:#d1d5db; border-radius:10px; transition:.2s }
        .ec-toggle-slider:before { content:''; position:absolute; width:14px; height:14px; left:3px; bottom:3px; background:white; border-radius:50%; transition:.2s }
        .ec-toggle input:checked + .ec-toggle-slider { background:#16a34a }
        .ec-toggle input:checked + .ec-toggle-slider:before { transform:translateX(16px) }
        .ec-radio { display:flex; flex-direction:column; gap:8px }
        .ec-radio-item { display:flex; align-items:center; gap:8px; cursor:pointer; font-size:0.82rem; color:#4b5563 }
        .ec-radio-item input { accent-color:#16a34a }
        .ec-cards { flex:1 }
        .ec-section-title { font-family:'Playfair Display',serif; font-size:1.1rem; font-weight:700; color:#14532d; margin-bottom:16px; display:flex; justify-content:space-between; align-items:center }
        .ec-card { background:white; border-radius:16px; border:1px solid #e5e7eb; padding:20px; display:flex; gap:16px; margin-bottom:16px; transition:.2s; cursor:pointer }
        .ec-card:hover { box-shadow:0 4px 20px rgba(0,0,0,.08); border-color:#bbf7d0; transform:translateY(-1px) }
        .ec-avatar-wrap { position:relative; flex-shrink:0 }
        .ec-avatar { width:72px; height:72px; border-radius:50%; object-fit:cover; border:3px solid #e5e7eb }
        .ec-online-dot { position:absolute; bottom:4px; right:4px; width:14px; height:14px; border-radius:50%; background:#22c55e; border:2.5px solid white }
        .ec-offline-dot { position:absolute; bottom:4px; right:4px; width:14px; height:14px; border-radius:50%; background:#9ca3af; border:2.5px solid white }
        .ec-card-body { flex:1 }
        .ec-card-top { display:flex; justify-content:space-between; align-items:flex-start; gap:8px }
        .ec-name { font-size:0.95rem; font-weight:800; color:#1f2937; margin-bottom:2px }
        .ec-role { font-size:0.8rem; color:#6b7280; margin-bottom:6px }
        .ec-badges { display:flex; gap:6px; flex-wrap:wrap; margin-bottom:8px }
        .ec-badge-online { background:#dcfce7; color:#16a34a; padding:2px 8px; border-radius:4px; font-size:0.65rem; font-weight:700 }
        .ec-badge-kvk { background:#fef3c7; color:#d97706; padding:2px 8px; border-radius:4px; font-size:0.65rem; font-weight:700 }
        .ec-badge-feat { background:#ede9fe; color:#7c3aed; padding:2px 8px; border-radius:4px; font-size:0.65rem; font-weight:700 }
        .ec-meta-row { display:flex; gap:14px; flex-wrap:wrap; font-size:0.75rem; color:#6b7280; margin-bottom:8px }
        .ec-meta-item { display:flex; align-items:center; gap:4px }
        .ec-crops { display:flex; gap:6px; flex-wrap:wrap; margin-bottom:10px }
        .ec-crop-tag { background:#f0fdf4; color:#16a34a; border:1px solid #bbf7d0; padding:3px 8px; border-radius:4px; font-size:0.7rem; font-weight:600; display:flex; align-items:center; gap:3px }
        .ec-lang { display:flex; gap:6px; flex-wrap:wrap }
        .ec-lang-tag { background:#f3f4f6; color:#4b5563; padding:2px 7px; border-radius:4px; font-size:0.7rem }
        .ec-card-right { display:flex; flex-direction:column; align-items:flex-end; gap:8px; flex-shrink:0 }
        .ec-price { font-size:1.1rem; font-weight:800; color:#14532d }
        .ec-price small { font-size:0.65rem; font-weight:400; color:#6b7280; display:block; text-align:right }
        .ec-price-free { font-size:1.1rem; font-weight:800; color:#16a34a }
        .ec-btn-row { display:flex; gap:8px }
        .ec-view-btn { padding:8px 12px; border:1px solid #d1d5db; background:white; color:#374151; border-radius:8px; font-size:0.78rem; font-weight:600; cursor:pointer; transition:.15s; font-family:'DM Sans',sans-serif }
        .ec-view-btn:hover { background:#f9fafb }
        .ec-book-btn { padding:8px 14px; border:none; background:linear-gradient(135deg,#14532d,#16a34a); color:white; border-radius:8px; font-size:0.78rem; font-weight:700; cursor:pointer; transition:.15s; font-family:'DM Sans',sans-serif }
        .ec-book-btn:hover { transform:translateY(-1px); box-shadow:0 4px 12px rgba(22,101,52,.3) }
        .ec-stars { display:flex; align-items:center; gap:3px; font-size:0.78rem; color:#374151 }
        .ec-star-icon { color:#fbbf24 }
      `}</style>

      {/* Hero Banner */}
      <div className="ec-hero">
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <h1>Talk to <span>Agricultural</span><br />Experts</h1>
              <p>Get instant video consultation from India's best agricultural scientists on disease management, market prices, and government schemes.</p>
              <form className="ec-search-row" onSubmit={onSearch}>
                <input className="ec-search-input" placeholder="Search expert or crop... (e.g., Wheat)" value={search} onChange={(e) => setSearch(e.target.value)} />
                <button type="submit" className="ec-search-btn">Search</button>
              </form>
              <div className="ec-hero-chips">
                {["🌾 Crop Expert", "🐛 Pest Control", "📈 Market", "🏛️ KVK Free"].map(c => (
                  <span key={c} className="ec-hero-chip">{c}</span>
                ))}
              </div>
            </div>
            <div style={{ background: "rgba(255,255,255,.12)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,.2)", borderRadius: 16, padding: "20px 24px", minWidth: 210, flexShrink: 0 }}>
              <div style={{ color: "#86efac", fontWeight: 700, fontSize: "0.85rem", display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
                {experts.filter(e => e.isOnline).length || 3} Experts Online Now
              </div>
              <div style={{ color: "rgba(255,255,255,.85)", fontSize: "0.8rem", marginBottom: 6 }}>⭐ 4.8 Average Rating</div>
              <div style={{ color: "rgba(255,255,255,.85)", fontSize: "0.8rem" }}>📞 10,000+ Sessions Done</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="ec-stats">
        {[
          { val: "150+", lbl: "Experts" },
          { val: "4.8⭐", lbl: "Avg Rating" },
          { val: "₹0-149", lbl: "Per Call" },
          { val: "< 2hr", lbl: "Response" },
        ].map(s => (
          <div key={s.lbl} className="ec-stat">
            <div className="ec-stat-val">{s.val}</div>
            <div className="ec-stat-lbl">{s.lbl}</div>
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="ec-main">
        {/* Filters */}
        <div className="ec-filters">
          <div className="ec-filter-group">
            <div className="ec-filter-title">Filters</div>
            <div className="ec-toggle-row">
              <span className="ec-toggle-lbl">Online Only</span>
              <label className="ec-toggle">
                <input type="checkbox" checked={filterOnline} onChange={(e) => setFilterOnline(e.target.checked)} />
                <span className="ec-toggle-slider" />
              </label>
            </div>
            <div className="ec-toggle-row">
              <span className="ec-toggle-lbl">KVK Experts (Free)</span>
              <label className="ec-toggle">
                <input type="checkbox" checked={filterKVK} onChange={(e) => setFilterKVK(e.target.checked)} />
                <span className="ec-toggle-slider" />
              </label>
            </div>
          </div>
          <div className="ec-filter-group">
            <div className="ec-filter-title">RATING</div>
            <div className="ec-radio">
              {[["all","Show All"],["4.5","4.5 & Up ⭐"],["4","4 & Up ⭐"],["3.5","3.5 & Up ⭐"]].map(([val, lbl]) => (
                <label key={val} className="ec-radio-item">
                  <input type="radio" name="rating" value={val} checked={filterRating === val} onChange={() => setFilterRating(val)} />
                  {lbl}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Expert Cards */}
        <div className="ec-cards">
          <div className="ec-section-title">
            <span>Recommended Experts</span>
            <span style={{ fontSize: "0.8rem", fontWeight: 500, color: "#6b7280" }}>{experts.length} experts</span>
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: 60, color: "#6b7280" }}>Loading experts...</div>
          ) : experts.length === 0 ? (
            <div style={{ textAlign: "center", padding: 60, color: "#6b7280" }}>No experts found. Try different filters.</div>
          ) : (
            experts.map(expert => (
              <div key={expert.id} className="ec-card" onClick={() => navigate(`/farmerdashboard/expert-connect/${expert.id}`)}>
                <div className="ec-avatar-wrap">
                  <img src={expert.avatar} alt={expert.name} className="ec-avatar" />
                  <div className={expert.isOnline ? "ec-online-dot" : "ec-offline-dot"} />
                </div>
                <div className="ec-card-body">
                  <div className="ec-card-top">
                    <div>
                      <div className="ec-badges">
                        {expert.isOnline && <span className="ec-badge-online">● ONLINE</span>}
                        {expert.isKVKFree && <span className="ec-badge-kvk">KVK FREE</span>}
                        {expert.totalSessions > 1000 && <span className="ec-badge-feat">FEATURED</span>}
                      </div>
                      <div className="ec-name">{expert.name}</div>
                      <div className="ec-role">{expert.title}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <Star size={14} fill="#fbbf24" color="#fbbf24" />
                      <span style={{ fontWeight: 700, fontSize: "0.85rem" }}>{expert.rating}</span>
                      <span style={{ fontSize: "0.75rem", color: "#9ca3af" }}>({expert.totalReviews})</span>
                    </div>
                  </div>
                  <div className="ec-meta-row">
                    <span className="ec-meta-item"><Users size={12} /> {expert.totalSessions} sessions</span>
                    <span className="ec-meta-item">🌾 {expert.cropsCovered.slice(0, 3).join(", ")}</span>
                    <span className="ec-meta-item">💬 {expert.languages.slice(0, 2).join(", ")}</span>
                    <span className="ec-meta-item">⏳ {expert.experience} experience</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div className="ec-price">
                      {expert.consultationFee === 0 ? (
                        <span className="ec-price-free">₹0 <small>/ call (KVK Free)</small></span>
                      ) : (
                        <>₹{expert.consultationFee} <small>/ 30 min call</small></>
                      )}
                    </div>
                    <div className="ec-btn-row">
                      <button className="ec-view-btn" onClick={(e) => { e.stopPropagation(); navigate(`/farmerdashboard/expert-connect/${expert.id}`); }}>
                        View Profile
                      </button>
                      <button className="ec-book-btn" onClick={(e) => { e.stopPropagation(); navigate(`/farmerdashboard/expert-connect/${expert.id}/book`); }}>
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
