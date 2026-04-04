import { useState, useMemo } from "react";
import {
  ClipboardList, Star, TrendingUp, CheckCircle, AlertCircle,
  Clock, Search, Filter, ChevronDown, Image as ImageIcon,
  MessageSquare, Leaf, Calendar, X
} from "lucide-react";
import { ExpertPageHeader } from "../../Pages/Expertdash/Expertdash";

/* ─────────────────────────────────────────
   STYLES  (same token set as ExpertOverview)
───────────────────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');

  .ch-root { font-family: 'DM Sans', sans-serif; background: #f0f7ff; min-height: 100vh; }
  .ch-body { padding: 24px; }

  /* ── Summary strip ── */
  .ch-tip-card {
    background: linear-gradient(135deg, #1a365d, #3182ce);
    border-radius: 16px; padding: 20px; color: #fff;
    margin-bottom: 24px; display: flex; align-items: center; gap: 16px;
  }

  /* ── Stat cards ── */
  .ch-stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 16px; margin-bottom: 24px;
  }
  .ch-stat-card {
    background: #fff; border-radius: 16px;
    padding: 20px; border: 1px solid #ebf8ff;
    display: flex; flex-direction: column; gap: 10px;
    transition: box-shadow .2s, transform .2s; cursor: default;
  }
  .ch-stat-card:hover { box-shadow: 0 8px 24px rgba(49,130,206,.1); transform: translateY(-2px); }
  .ch-stat-icon {
    width: 40px; height: 40px; border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
  }
  .ch-stat-label { font-size: .78rem; color: #6b7280; font-weight: 500; }
  .ch-stat-value { font-family: 'Playfair Display', serif; font-size: 1.8rem; font-weight: 700; color: #1a365d; line-height: 1; }
  .ch-stat-sub { font-size: .75rem; color: #3182ce; font-weight: 500; }

  /* ── Search / filter bar ── */
  .ch-toolbar {
    background: #fff; border-radius: 16px; border: 1px solid #ebf8ff;
    padding: 16px 20px; margin-bottom: 20px;
    display: flex; gap: 12px; flex-wrap: wrap; align-items: center;
  }
  .ch-search-wrap {
    flex: 1; min-width: 200px;
    display: flex; align-items: center; gap: 8px;
    background: #f0f7ff; border-radius: 10px; padding: 8px 14px;
  }
  .ch-search-wrap input {
    border: none; background: transparent; outline: none;
    font-family: 'DM Sans', sans-serif; font-size: .85rem; color: #1a365d; width: 100%;
  }
  .ch-search-wrap input::placeholder { color: #9ca3af; }

  .ch-filter-btn {
    display: flex; align-items: center; gap: 6px;
    padding: 8px 14px; border-radius: 10px;
    font-family: 'DM Sans', sans-serif; font-size: .82rem; font-weight: 600;
    border: 1.5px solid #ebf8ff; background: #fff; cursor: pointer;
    color: #374151; transition: all .18s;
  }
  .ch-filter-btn:hover, .ch-filter-btn.active {
    background: #ebf8ff; border-color: #3182ce; color: #1a365d;
  }

  .ch-select {
    padding: 8px 14px; border-radius: 10px;
    font-family: 'DM Sans', sans-serif; font-size: .82rem; font-weight: 500;
    border: 1.5px solid #ebf8ff; background: #fff; color: #374151;
    cursor: pointer; outline: none;
  }
  .ch-select:focus { border-color: #3182ce; }

  /* ── Case cards ── */
  .ch-cases-list { display: flex; flex-direction: column; gap: 16px; }

  .ch-case-card {
    background: #fff; border-radius: 16px; border: 1px solid #ebf8ff;
    overflow: hidden; transition: box-shadow .2s, transform .2s;
  }
  .ch-case-card:hover { box-shadow: 0 8px 24px rgba(49,130,206,.1); transform: translateY(-2px); }

  .ch-case-header {
    padding: 16px 20px; border-bottom: 1px solid #f0f7ff;
    display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
  }

  .ch-case-avatar {
    width: 40px; height: 40px; border-radius: 50%;
    background: linear-gradient(135deg, #ebf8ff, #bee3f8);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; font-size: 15px; font-weight: 700; color: #3182ce;
  }

  .ch-case-farmer { font-size: .9rem; font-weight: 700; color: #1a365d; }
  .ch-case-meta { font-size: .75rem; color: #9ca3af; margin-top: 2px; }

  .ch-badge {
    font-size: .65rem; font-weight: 700;
    padding: 3px 10px; border-radius: 20px;
  }

  .ch-case-body {
    padding: 16px 20px;
    display: grid; grid-template-columns: 90px 1fr; gap: 16px;
  }
  @media (max-width: 600px) { .ch-case-body { grid-template-columns: 1fr; } }

  .ch-img-box {
    width: 90px; height: 90px; border-radius: 12px;
    background: linear-gradient(135deg, #ebf8ff, #bee3f8);
    display: flex; align-items: center; justify-content: center;
    overflow: hidden; flex-shrink: 0; border: 1px solid #ebf8ff;
    font-size: 2rem;
  }

  .ch-case-detail-label { font-size: .72rem; font-weight: 600; color: #9ca3af; text-transform: uppercase; letter-spacing: .05em; margin-bottom: 3px; }
  .ch-case-detail-val { font-size: .82rem; color: #374151; line-height: 1.5; }

  .ch-response-box {
    background: #f0f7ff; border-radius: 10px; padding: 12px 14px;
    margin-top: 10px; display: flex; gap: 8px; align-items: flex-start;
  }
  .ch-response-text { font-size: .8rem; color: #374151; line-height: 1.6; font-style: italic; }

  .ch-rating-row {
    display: flex; align-items: center; gap: 6px; margin-top: 10px;
  }
  .ch-star { font-size: 14px; }
  .ch-rating-label { font-size: .75rem; color: #6b7280; font-weight: 500; }

  /* ── No results ── */
  .ch-empty {
    background: #fff; border-radius: 16px; border: 1px solid #ebf8ff;
    padding: 48px 24px; text-align: center; color: #9ca3af;
  }
`;

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const cases = [
  {
    id: "C-148", farmer: "Ramesh Patil", initials: "RP",
    problem: "Yellowing leaves in wheat crop — suspected nitrogen deficiency",
    crop: "Wheat", date: "12 Feb 2025", status: "Resolved",
    image: "🌾", imageAlt: "Wheat leaf image",
    response: "Apply 30 kg/acre of urea immediately. Remove severely infected leaves and ensure adequate irrigation every 5 days.",
    rating: 5, feedback: "Very helpful advice, crop recovered fully!"
  },
  {
    id: "C-147", farmer: "Sunita Devi", initials: "SD",
    problem: "Fungal blight spreading across paddy field after heavy rain",
    crop: "Paddy / Rice", date: "8 Feb 2025", status: "Resolved",
    image: "🌿", imageAlt: "Paddy blight image",
    response: "Spray Mancozeb 75 WP @ 2g/litre of water. Drain excess water from field and avoid overhead irrigation for 10 days.",
    rating: 4, feedback: "Good response, could have been faster."
  },
  {
    id: "C-146", farmer: "Ajay Sharma", initials: "AS",
    problem: "Pest infestation — stem borer visible on rice stalks",
    crop: "Rice", date: "3 Feb 2025", status: "Escalated",
    image: "🐛", imageAlt: "Pest infestation image",
    response: "Case escalated to district agriculture officer due to severity. Applied Chlorpyriphos 2.5% dust as immediate measure.",
    rating: 3, feedback: "Escalation took too long."
  },
  {
    id: "C-145", farmer: "Kavita Jadhav", initials: "KJ",
    problem: "Soil pH imbalance — tomato plants showing stunted growth",
    crop: "Tomato", date: "28 Jan 2025", status: "Resolved",
    image: "🍅", imageAlt: "Tomato field image",
    response: "Optimal pH for tomatoes in black soil is 6.0–6.8. Apply agricultural lime @ 500 kg/acre and retest pH after 2 weeks.",
    rating: 5, feedback: "Excellent! Very detailed advice."
  },
  {
    id: "C-144", farmer: "Mohan Kumar", initials: "MK",
    problem: "Drip irrigation lines clogging — reduced water output in cotton rows",
    crop: "Cotton", date: "20 Jan 2025", status: "In Progress",
    image: "🌱", imageAlt: "Cotton irrigation image",
    response: "Flush lines with diluted hydrochloric acid solution (1:10 ratio). Check emitter filters and replace blocked ones.",
    rating: null, feedback: null
  },
  {
    id: "C-143", farmer: "Priya Nair", initials: "PN",
    problem: "Aphid attack on sugarcane — sticky residue on leaves",
    crop: "Sugarcane", date: "14 Jan 2025", status: "Resolved",
    image: "🪲", imageAlt: "Aphid attack image",
    response: "Spray Imidacloprid 0.3 ml/litre. Introduce lady bird beetles as biological control. Repeat spray after 10 days.",
    rating: 5, feedback: "The biological control tip was fantastic!"
  },
];

const CROPS = ["All Crops", "Wheat", "Paddy / Rice", "Rice", "Tomato", "Cotton", "Sugarcane"];
const STATUSES = ["All", "Resolved", "In Progress", "Escalated"];

/* ─────────────────────────────────────────
   HELPERS
───────────────────────────────────────── */
function StatusBadge({ status }) {
  const map = {
    "Resolved":    { bg: "#f0fdf4", color: "#16a34a", icon: <CheckCircle size={11} /> },
    "In Progress": { bg: "#fffbeb", color: "#d97706", icon: <Clock size={11} /> },
    "Escalated":   { bg: "#fef2f2", color: "#dc2626", icon: <AlertCircle size={11} /> },
  };
  const s = map[status] || map["Resolved"];
  return (
    <span className="ch-badge" style={{ background: s.bg, color: s.color, display: "inline-flex", alignItems: "center", gap: 4 }}>
      {s.icon}{status}
    </span>
  );
}

function StarRating({ value }) {
  if (!value) return <span style={{ fontSize: ".75rem", color: "#9ca3af" }}>Awaiting feedback</span>;
  return (
    <div className="ch-rating-row">
      {[1,2,3,4,5].map(n => (
        <span key={n} className="ch-star" style={{ color: n <= value ? "#f59e0b" : "#e5e7eb" }}>★</span>
      ))}
      <span className="ch-rating-label">{value}.0 / 5.0</span>
    </div>
  );
}

/* ─────────────────────────────────────────
   SUMMARY STATS
───────────────────────────────────────── */
function buildStats(data) {
  const total = data.length;
  const resolved = data.filter(c => c.status === "Resolved").length;
  const rated = data.filter(c => c.rating !== null);
  const avgRating = rated.length
    ? (rated.reduce((a, c) => a + c.rating, 0) / rated.length).toFixed(1)
    : "—";
  const successRate = total ? Math.round((resolved / total) * 100) + "%" : "—";
  return [
    { label: "Total Cases",    value: total,       sub: "All time",         icon: <ClipboardList size={20} color="#3182ce" />, bg: "#ebf8ff" },
    { label: "Resolved",       value: resolved,    sub: "Successfully closed", icon: <CheckCircle   size={20} color="#16a34a" />, bg: "#f0fdf4" },
    { label: "Success Rate",   value: successRate, sub: "Resolution ratio",  icon: <TrendingUp    size={20} color="#7c3aed" />, bg: "#f5f3ff" },
    { label: "Avg Rating",     value: avgRating,   sub: "Farmer feedback",  icon: <Star          size={20} color="#d97706" />, bg: "#fffbeb" },
  ];
}

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
export default function ExpertCaseHistory() {
  const [search, setSearch]       = useState("");
  const [cropFilter, setCrop]     = useState("All Crops");
  const [statusFilter, setStatus] = useState("All");

  const filtered = useMemo(() => {
    return cases.filter(c => {
      const matchSearch =
        c.farmer.toLowerCase().includes(search.toLowerCase()) ||
        c.problem.toLowerCase().includes(search.toLowerCase()) ||
        c.crop.toLowerCase().includes(search.toLowerCase()) ||
        c.id.toLowerCase().includes(search.toLowerCase());
      const matchCrop   = cropFilter === "All Crops" || c.crop === cropFilter;
      const matchStatus = statusFilter === "All"     || c.status === statusFilter;
      return matchSearch && matchCrop && matchStatus;
    });
  }, [search, cropFilter, statusFilter]);

  const stats = buildStats(cases);

  return (
    <div className="ch-root">
      <style>{styles}</style>

      <ExpertPageHeader
        title="Case History"
        description="A complete record of all cases you have handled as an expert."
      />

      <div className="ch-body">

        {/* ── Banner ── */}
        <div className="ch-tip-card">
          <div style={{ fontSize: "2.5rem", flexShrink: 0 }}>📋</div>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 700, marginBottom: 4 }}>
              You have handled {cases.length} cases so far
            </div>
            <div style={{ fontSize: ".82rem", opacity: .85, lineHeight: 1.5 }}>
              {cases.filter(c => c.status === "Resolved").length} resolved · {cases.filter(c => c.status === "In Progress").length} in progress · {cases.filter(c => c.status === "Escalated").length} escalated. Keep up the great work, Dr. Expert!
            </div>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="ch-stats-grid">
          {stats.map((s, i) => (
            <div className="ch-stat-card" key={i}>
              <div className="ch-stat-icon" style={{ background: s.bg }}>{s.icon}</div>
              <div>
                <div className="ch-stat-label">{s.label}</div>
                <div className="ch-stat-value">{s.value}</div>
                <div className="ch-stat-sub">{s.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Search + Filter ── */}
        <div className="ch-toolbar">
          {/* Search */}
          <div className="ch-search-wrap">
            <Search size={16} color="#9ca3af" />
            <input
              placeholder="Search farmer, crop, problem, case ID…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <X size={14} color="#9ca3af" style={{ cursor: "pointer", flexShrink: 0 }} onClick={() => setSearch("")} />
            )}
          </div>

          {/* Crop filter */}
          <select
            className="ch-select"
            value={cropFilter}
            onChange={e => setCrop(e.target.value)}
          >
            {CROPS.map(c => <option key={c}>{c}</option>)}
          </select>

          {/* Status pills */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {STATUSES.map(s => (
              <button
                key={s}
                className={`ch-filter-btn${statusFilter === s ? " active" : ""}`}
                onClick={() => setStatus(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* ── Case Cards ── */}
        {filtered.length === 0 ? (
          <div className="ch-empty">
            <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>🔍</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", color: "#6b7280", marginBottom: 6 }}>No cases found</div>
            <div style={{ fontSize: ".82rem" }}>Try adjusting your search or filters.</div>
          </div>
        ) : (
          <div className="ch-cases-list">
            {filtered.map((c, i) => (
              <div className="ch-case-card" key={i}>

                {/* Header */}
                <div className="ch-case-header">
                  <div className="ch-case-avatar">{c.initials}</div>
                  <div style={{ flex: 1 }}>
                    <div className="ch-case-farmer">{c.farmer}</div>
                    <div className="ch-case-meta">
                      Case {c.id} · <Leaf size={11} style={{ verticalAlign: "middle" }} /> {c.crop} · <Calendar size={11} style={{ verticalAlign: "middle" }} /> {c.date}
                    </div>
                  </div>
                  <StatusBadge status={c.status} />
                </div>

                {/* Body */}
                <div className="ch-case-body">
                  {/* Image preview */}
                  <div className="ch-img-box" title={c.imageAlt}>
                    {c.image}
                  </div>

                  {/* Details */}
                  <div>
                    <div className="ch-case-detail-label">Problem Reported</div>
                    <div className="ch-case-detail-val">{c.problem}</div>

                    {/* Expert response */}
                    <div className="ch-response-box">
                      <MessageSquare size={14} color="#3182ce" style={{ marginTop: 2, flexShrink: 0 }} />
                      <div>
                        <div className="ch-case-detail-label" style={{ marginBottom: 2 }}>Your Response</div>
                        <div className="ch-response-text">"{c.response}"</div>
                      </div>
                    </div>

                    {/* Rating + feedback */}
                    <div style={{ marginTop: 10 }}>
                      <div className="ch-case-detail-label">Farmer Rating</div>
                      <StarRating value={c.rating} />
                      {c.feedback && (
                        <div style={{ fontSize: ".75rem", color: "#6b7280", marginTop: 4, fontStyle: "italic" }}>
                          "{c.feedback}"
                        </div>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}