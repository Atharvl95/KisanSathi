import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, MapPin, Clock, Video, Mic, Shield, CheckCircle, Award, Users } from "lucide-react";

const API = import.meta.env.VITE_API_URL || "http://localhost:5002";

export default function ExpertProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expert, setExpert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("about");

  useEffect(() => {
    fetch(`${API}/api/experts/${id}`)
      .then(r => r.json())
      .then(d => { setExpert(d.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div style={{ padding: 80, textAlign: "center", fontFamily: "'DM Sans',sans-serif", color: "#6b7280" }}>Loading expert profile...</div>;
  if (!expert) return <div style={{ padding: 80, textAlign: "center", fontFamily: "'DM Sans',sans-serif", color: "#dc2626" }}>Expert not found.</div>;

  return (
    <div style={{ minHeight: "100vh", background: "#f7fdf9", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        .ep-hero { background:linear-gradient(145deg,#14532d,#16a34a); padding:24px 32px 80px; position:relative }
        .ep-back-btn { background:rgba(255,255,255,.15); border:1px solid rgba(255,255,255,.25); color:white; padding:8px 14px; border-radius:8px; display:flex; align-items:center; gap:6px; cursor:pointer; font-size:0.82rem; font-family:'DM Sans',sans-serif; margin-bottom:20px; width:fit-content }
        .ep-hero-info { display:flex; align-items:flex-start; gap:20px }
        .ep-avatar-wrap { position:relative; flex-shrink:0 }
        .ep-avatar { width:90px; height:90px; border-radius:50%; border:4px solid rgba(255,255,255,.4); object-fit:cover }
        .ep-online-badge { position:absolute; bottom:6px; right:6px; background:#22c55e; border:2px solid white; padding:2px 7px; border-radius:10px; font-size:0.6rem; font-weight:700; color:white }
        .ep-hero-text { color:white }
        .ep-hero-name { font-family:'Playfair Display',serif; font-size:1.5rem; font-weight:800; margin:0 0 4px }
        .ep-hero-role { opacity:.85; font-size:0.9rem; margin-bottom:10px }
        .ep-hero-meta { display:flex; gap:14px; flex-wrap:wrap; font-size:0.8rem; opacity:.85 }
        .ep-hero-meta span { display:flex; align-items:center; gap:4px }
        .ep-body { max-width:1000px; margin:-48px auto 0; padding:0 24px 48px; position:relative; display:flex; gap:24px; align-items:flex-start }
        .ep-left { flex:1 }
        .ep-card { background:white; border-radius:16px; border:1px solid #e5e7eb; overflow:hidden; margin-bottom:20px }
        .ep-tabs { display:flex; border-bottom:1px solid #e5e7eb }
        .ep-tab { padding:14px 20px; font-size:0.85rem; font-weight:600; color:#6b7280; cursor:pointer; border-bottom:2px solid transparent; transition:.15s }
        .ep-tab.active { color:#16a34a; border-bottom-color:#16a34a }
        .ep-tab-content { padding:24px }
        .ep-section-title { font-size:0.9rem; font-weight:700; color:#14532d; margin:0 0 14px }
        .ep-chips { display:flex; gap:8px; flex-wrap:wrap; margin-bottom:20px }
        .ep-chip-green { background:#f0fdf4; color:#16a34a; border:1px solid #bbf7d0; padding:5px 12px; border-radius:20px; font-size:0.78rem; font-weight:600 }
        .ep-chip-orange { background:#fff7ed; color:#ea580c; border:1px solid #fed7aa; padding:5px 12px; border-radius:20px; font-size:0.78rem; font-weight:600; display:flex; align-items:center; gap:4px }
        .ep-about-text { font-size:0.9rem; color:#4b5563; line-height:1.7; margin-bottom:20px }
        .ep-achieve { display:flex; flex-direction:column; gap:10px }
        .ep-achieve-item { display:flex; align-items:center; gap:12px; padding:12px 14px; background:#fffbeb; border-radius:10px; border:1px solid #fde68a }
        .ep-achieve-icon { font-size:1.1rem }
        .ep-achieve-text { font-size:0.85rem; color:#374151; font-weight:500 }
        .ep-qual-list { list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:8px }
        .ep-qual-item { display:flex; align-items:center; gap:8px; font-size:0.85rem; color:#374151 }
        .ep-review { border:1px solid #e5e7eb; border-radius:12px; padding:16px; margin-bottom:12px }
        .ep-review-header { display:flex; justify-content:space-between; margin-bottom:8px }
        .ep-review-name { font-weight:700; color:#1f2937; font-size:0.88rem }
        .ep-review-date { font-size:0.75rem; color:#9ca3af }
        .ep-review-stars { display:flex; gap:2px; margin-bottom:8px }
        .ep-review-text { font-size:0.85rem; color:#4b5563; line-height:1.6 }
        .ep-right { width:240px; flex-shrink:0; position:sticky; top:20px }
        .ep-booking-card { background:white; border-radius:16px; border:1px solid #e5e7eb; padding:24px }
        .ep-bc-label { font-size:0.72rem; color:#6b7280; text-align:center; text-transform:uppercase; letter-spacing:.05em; margin-bottom:4px }
        .ep-bc-fee { font-size:2rem; font-weight:800; color:#16a34a; text-align:center; margin-bottom:2px }
        .ep-bc-sub { font-size:0.75rem; color:#6b7280; text-align:center; margin-bottom:20px }
        .ep-bc-btn { width:100%; padding:14px; background:linear-gradient(135deg,#14532d,#16a34a); color:white; border:none; border-radius:10px; font-size:0.95rem; font-weight:700; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px; margin-bottom:16px; transition:.15s; font-family:'DM Sans',sans-serif }
        .ep-bc-btn:hover { transform:translateY(-1px); box-shadow:0 6px 20px rgba(22,101,52,.3) }
        .ep-bc-features { display:flex; flex-direction:column; gap:8px }
        .ep-bc-feature { display:flex; align-items:center; gap:8px; font-size:0.78rem; color:#4b5563 }
      `}</style>

      {/* Hero */}
      <div className="ep-hero">
        <button className="ep-back-btn" onClick={() => navigate("/farmerdashboard/expert-connect")}>
          <ArrowLeft size={14} /> Expert Connect
        </button>
        <div className="ep-hero-info">
          <div className="ep-avatar-wrap">
            <img src={expert.avatar} alt={expert.name} className="ep-avatar" />
            {expert.isOnline && <span className="ep-online-badge">● ONLINE</span>}
          </div>
          <div className="ep-hero-text">
            <h1 className="ep-hero-name">{expert.name}</h1>
            <div className="ep-hero-role">{expert.title}</div>
            <div className="ep-hero-meta">
              <span><MapPin size={13} /> {expert.location} • {expert.organization}</span>
              <span><Star size={13} fill="#fbbf24" color="#fbbf24" /> {expert.rating} ({expert.totalReviews} reviews)</span>
              <span><Users size={13} /> {expert.totalSessions} sessions</span>
              <span><Clock size={13} /> {expert.responseTime} response</span>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="ep-body">
        {/* Left column */}
        <div className="ep-left">
          <div className="ep-card">
            <div className="ep-tabs">
              {["about", "reviews", "availability"].map(tab => (
                <div key={tab} className={`ep-tab${activeTab === tab ? " active" : ""}`} onClick={() => setActiveTab(tab)}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  {tab === "reviews" && ` (${expert.totalReviews})`}
                </div>
              ))}
            </div>

            <div className="ep-tab-content">
              {activeTab === "about" && (
                <>
                  <div className="ep-section-title">About Expert</div>
                  <p className="ep-about-text">{expert.about}</p>

                  <div style={{ display: "flex", gap: 32, marginBottom: 20 }}>
                    <div>
                      <div className="ep-section-title">Specializations</div>
                      <div className="ep-chips">
                        {expert.specializations.map(s => <span key={s} className="ep-chip-green">{s}</span>)}
                      </div>
                    </div>
                    <div>
                      <div className="ep-section-title">Crops Covered</div>
                      <div className="ep-chips">
                        {expert.cropsCovered.map(c => <span key={c} className="ep-chip-orange">🌾 {c}</span>)}
                      </div>
                    </div>
                  </div>

                  <div className="ep-section-title">Achievements</div>
                  <div className="ep-achieve">
                    {expert.achievements.map((a, i) => (
                      <div key={i} className="ep-achieve-item">
                        <span className="ep-achieve-icon">🏆</span>
                        <span className="ep-achieve-text">{a}</span>
                      </div>
                    ))}
                  </div>

                  <div className="ep-section-title" style={{ marginTop: 20 }}>Qualifications</div>
                  <ul className="ep-qual-list">
                    {expert.qualifications.map((q, i) => (
                      <li key={i} className="ep-qual-item">
                        <CheckCircle size={15} color="#16a34a" /> {q}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {activeTab === "reviews" && (
                <>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                    <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "#14532d" }}>{expert.rating}</div>
                    <div>
                      <div style={{ display: "flex", gap: 3, marginBottom: 4 }}>
                        {[1,2,3,4,5].map(s => <Star key={s} size={16} fill={s <= Math.round(expert.rating) ? "#fbbf24" : "#e5e7eb"} color={s <= Math.round(expert.rating) ? "#fbbf24" : "#e5e7eb"} />)}
                      </div>
                      <div style={{ fontSize: "0.8rem", color: "#6b7280" }}>Based on {expert.totalReviews} reviews</div>
                    </div>
                  </div>
                  {expert.reviews.map((r, i) => (
                    <div key={i} className="ep-review">
                      <div className="ep-review-header">
                        <span className="ep-review-name">{r.author}</span>
                        <span className="ep-review-date">{r.date}</span>
                      </div>
                      <div className="ep-review-stars">
                        {[1,2,3,4,5].map(s => <Star key={s} size={13} fill={s <= r.rating ? "#fbbf24" : "#e5e7eb"} color={s <= r.rating ? "#fbbf24" : "#e5e7eb"} />)}
                      </div>
                      <div className="ep-review-text">{r.text}</div>
                    </div>
                  ))}
                </>
              )}

              {activeTab === "availability" && (
                <>
                  <div className="ep-section-title">Weekly Availability</div>
                  {Object.entries(expert.availability).map(([day, slots]) => (
                    <div key={day} style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 12 }}>
                      <div style={{ width: 36, fontWeight: 700, fontSize: "0.82rem", color: "#374151", paddingTop: 2 }}>{day}</div>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        {slots.length === 0 ? (
                          <span style={{ fontSize: "0.78rem", color: "#9ca3af" }}>Unavailable</span>
                        ) : slots.map(s => (
                          <span key={s} style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", color: "#16a34a", borderRadius: 6, padding: "3px 10px", fontSize: "0.75rem", fontWeight: 600 }}>{s}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right sticky booking card */}
        <div className="ep-right">
          <div className="ep-booking-card">
            <div className="ep-bc-label">Consultation Fee</div>
            <div className="ep-bc-fee">{expert.consultationFee === 0 ? "FREE" : `₹${expert.consultationFee}`}</div>
            <div className="ep-bc-sub">/ 30 min video session</div>
            <button className="ep-bc-btn" onClick={() => navigate(`/farmerdashboard/expert-connect/${expert.id}/book`)}>
              <Video size={16} /> Book Video Call
            </button>
            <div className="ep-bc-features">
              <div className="ep-bc-feature"><CheckCircle size={14} color="#16a34a" /> Secure SSL payment</div>
              <div className="ep-bc-feature"><CheckCircle size={14} color="#16a34a" /> 100% money back guarantee</div>
              <div className="ep-bc-feature"><CheckCircle size={14} color="#16a34a" /> Free cancellation before 2hrs</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
