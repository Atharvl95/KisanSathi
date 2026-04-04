import { useState, useMemo } from "react";
import {
  Clock, MapPin, Leaf, Calendar, AlertCircle, MessageSquare,
  Send, UserCheck, ChevronDown, Search, X, Eye, CheckCircle,
  RotateCcw, Filter
} from "lucide-react";
import { ExpertPageHeader } from "../../Pages/Expertdash/Expertdash";

/* ─────────────────────────────────────────
   STYLES — same token set as Overview & Case History
───────────────────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');

  .pq-root { font-family: 'DM Sans', sans-serif; background: #f0f7ff; min-height: 100vh; }
  .pq-body { padding: 24px; }

  /* ── Banner ── */
  .pq-tip-card {
    background: linear-gradient(135deg, #1a365d, #3182ce);
    border-radius: 16px; padding: 20px; color: #fff;
    margin-bottom: 24px; display: flex; align-items: center; gap: 16px;
  }

  /* ── Stat cards ── */
  .pq-stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
    gap: 16px; margin-bottom: 24px;
  }
  .pq-stat-card {
    background: #fff; border-radius: 16px;
    padding: 20px; border: 1px solid #ebf8ff;
    display: flex; flex-direction: column; gap: 10px;
    transition: box-shadow .2s, transform .2s;
  }
  .pq-stat-card:hover { box-shadow: 0 8px 24px rgba(49,130,206,.1); transform: translateY(-2px); }
  .pq-stat-icon { width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
  .pq-stat-label { font-size: .78rem; color: #6b7280; font-weight: 500; }
  .pq-stat-value { font-family: 'Playfair Display', serif; font-size: 1.8rem; font-weight: 700; color: #1a365d; line-height: 1; }
  .pq-stat-sub { font-size: .75rem; color: #3182ce; font-weight: 500; }

  /* ── Toolbar ── */
  .pq-toolbar {
    background: #fff; border-radius: 16px; border: 1px solid #ebf8ff;
    padding: 16px 20px; margin-bottom: 20px;
    display: flex; gap: 12px; flex-wrap: wrap; align-items: center;
  }
  .pq-search-wrap {
    flex: 1; min-width: 200px;
    display: flex; align-items: center; gap: 8px;
    background: #f0f7ff; border-radius: 10px; padding: 8px 14px;
  }
  .pq-search-wrap input {
    border: none; background: transparent; outline: none;
    font-family: 'DM Sans', sans-serif; font-size: .85rem; color: #1a365d; width: 100%;
  }
  .pq-search-wrap input::placeholder { color: #9ca3af; }
  .pq-filter-btn {
    display: flex; align-items: center; gap: 6px;
    padding: 8px 16px; border-radius: 10px;
    font-family: 'DM Sans', sans-serif; font-size: .82rem; font-weight: 600;
    border: 1.5px solid #ebf8ff; background: #fff; cursor: pointer;
    color: #374151; transition: all .18s;
  }
  .pq-filter-btn:hover, .pq-filter-btn.active {
    background: #ebf8ff; border-color: #3182ce; color: #1a365d;
  }

  /* ── Query card ── */
  .pq-list { display: flex; flex-direction: column; gap: 20px; }

  .pq-card {
    background: #fff; border-radius: 16px; border: 1px solid #ebf8ff;
    overflow: hidden; transition: box-shadow .2s, transform .2s;
  }
  .pq-card:hover { box-shadow: 0 8px 28px rgba(49,130,206,.12); transform: translateY(-2px); }
  .pq-card.resolved { border-color: #bbf7d0; opacity: .82; }

  /* Card header */
  .pq-card-header {
    padding: 16px 20px; border-bottom: 1px solid #f0f7ff;
    display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
  }
  .pq-avatar {
    width: 42px; height: 42px; border-radius: 50%;
    background: linear-gradient(135deg, #ebf8ff, #bee3f8);
    display: flex; align-items: center; justify-content: center;
    font-size: 15px; font-weight: 700; color: #3182ce; flex-shrink: 0;
  }
  .pq-farmer-name { font-size: .9rem; font-weight: 700; color: #1a365d; }
  .pq-farmer-meta { font-size: .75rem; color: #9ca3af; margin-top: 2px; display: flex; gap: 10px; flex-wrap: wrap; }
  .pq-meta-chip { display: inline-flex; align-items: center; gap: 3px; }

  .pq-badge {
    font-size: .65rem; font-weight: 700;
    padding: 3px 10px; border-radius: 20px;
    display: inline-flex; align-items: center; gap: 4px;
  }

  .pq-pending-timer {
    margin-left: auto; display: flex; align-items: center; gap: 5px;
    font-size: .75rem; color: #d97706; font-weight: 600;
    background: #fffbeb; padding: 5px 12px; border-radius: 20px;
    flex-shrink: 0;
  }

  /* Card body */
  .pq-card-body {
    padding: 16px 20px;
    display: grid; grid-template-columns: 110px 1fr; gap: 20px;
  }
  @media (max-width: 600px) { .pq-card-body { grid-template-columns: 1fr; } }

  /* Image preview */
  .pq-img-box {
    width: 110px; height: 110px; border-radius: 14px;
    background: linear-gradient(135deg, #ebf8ff, #bee3f8);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    border: 1px solid #ebf8ff; cursor: pointer; gap: 6px; flex-shrink: 0;
    transition: box-shadow .18s;
  }
  .pq-img-box:hover { box-shadow: 0 4px 16px rgba(49,130,206,.18); }
  .pq-img-emoji { font-size: 2.8rem; line-height: 1; }
  .pq-img-label { font-size: .65rem; color: #3182ce; font-weight: 600; display: flex; align-items: center; gap: 3px; }

  /* Problem text */
  .pq-section-label {
    font-size: .72rem; font-weight: 600; color: #9ca3af;
    text-transform: uppercase; letter-spacing: .05em; margin-bottom: 4px;
  }
  .pq-problem-text { font-size: .85rem; color: #374151; line-height: 1.65; }

  /* Full description box */
  .pq-desc-box {
    background: #f0f7ff; border-radius: 10px; padding: 12px 14px;
    margin-top: 10px; font-size: .82rem; color: #374151;
    line-height: 1.7; border-left: 3px solid #3182ce;
  }

  /* Reply box */
  .pq-reply-area {
    padding: 16px 20px; border-top: 1px solid #f0f7ff;
  }
  .pq-textarea {
    width: 100%; min-height: 90px;
    border: 1.5px solid #ebf8ff; border-radius: 12px;
    padding: 12px 14px; font-family: 'DM Sans', sans-serif;
    font-size: .85rem; color: #1a365d; resize: vertical;
    outline: none; background: #f8fbff; box-sizing: border-box;
    transition: border-color .18s;
  }
  .pq-textarea:focus { border-color: #3182ce; background: #fff; }
  .pq-textarea::placeholder { color: #b0c4d8; }
  .pq-textarea:disabled { opacity: .5; cursor: not-allowed; }

  /* Action row */
  .pq-action-row {
    display: flex; gap: 10px; margin-top: 12px; flex-wrap: wrap; align-items: center;
  }
  .pq-btn {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 9px 18px; border-radius: 10px; font-family: 'DM Sans', sans-serif;
    font-size: .82rem; font-weight: 700; cursor: pointer; border: none;
    transition: all .18s;
  }
  .pq-btn-primary {
    background: linear-gradient(135deg, #1a365d, #3182ce);
    color: #fff;
  }
  .pq-btn-primary:hover:not(:disabled) { box-shadow: 0 4px 16px rgba(49,130,206,.35); transform: translateY(-1px); }
  .pq-btn-primary:disabled { opacity: .45; cursor: not-allowed; transform: none; }

  .pq-btn-outline {
    background: #fff; color: #6b7280;
    border: 1.5px solid #ebf8ff;
  }
  .pq-btn-outline:hover { background: #f0f7ff; border-color: #3182ce; color: #1a365d; }

  /* Forwarded / resolved state */
  .pq-resolved-banner {
    display: flex; align-items: center; gap: 8px;
    padding: 10px 16px; border-radius: 10px; font-size: .82rem; font-weight: 600;
    margin-top: 12px;
  }

  /* Forward modal overlay */
  .pq-modal-overlay {
    position: fixed; inset: 0; background: rgba(26,54,93,.35);
    display: flex; align-items: center; justify-content: center;
    z-index: 1000; padding: 24px;
  }
  .pq-modal {
    background: #fff; border-radius: 20px; padding: 28px;
    width: 100%; max-width: 420px; box-shadow: 0 20px 60px rgba(26,54,93,.18);
  }
  .pq-modal-title { font-family: 'Playfair Display', serif; font-size: 1.1rem; color: #1a365d; margin-bottom: 6px; }
  .pq-modal-sub { font-size: .8rem; color: #6b7280; margin-bottom: 20px; }
  .pq-expert-option {
    display: flex; align-items: center; gap: 12px;
    padding: 12px 14px; border-radius: 12px; cursor: pointer;
    border: 1.5px solid #ebf8ff; margin-bottom: 10px;
    transition: all .15s;
  }
  .pq-expert-option:hover, .pq-expert-option.selected { border-color: #3182ce; background: #ebf8ff; }
  .pq-expert-option-name { font-size: .85rem; font-weight: 600; color: #1a365d; }
  .pq-expert-option-spec { font-size: .75rem; color: #6b7280; }

  /* Empty state */
  .pq-empty {
    background: #fff; border-radius: 16px; border: 1px solid #ebf8ff;
    padding: 56px 24px; text-align: center; color: #9ca3af;
  }
`;

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const QUERIES_INITIAL = [
  {
    id: "Q-001", farmer: "Ramesh Patil", initials: "RP",
    crop: "Tomato", location: "Pune, Maharashtra", date: "12 Feb 2025",
    pendingSince: "2 hours ago", priority: "Urgent",
    summary: "Leaves turning yellow with brown spots",
    description: "My tomato plants have started showing yellow leaves with dark brown spots near the edges. This started about 3 days ago and is spreading to other plants quickly. I water them daily and have applied fertilizer last week. Please advise urgently.",
    image: "🍅",
  },
  {
    id: "Q-002", farmer: "Sunita Devi", initials: "SD",
    crop: "Wheat", location: "Nashik, Maharashtra", date: "12 Feb 2025",
    pendingSince: "4 hours ago", priority: "Normal",
    summary: "Is it safe to plant wheat now given the weather?",
    description: "We have had unseasonal rain in the past week. The soil feels too wet. Should I wait before sowing wheat seeds? I am worried about root rot if I sow now. What is the best strategy for this season?",
    image: "🌾",
  },
  {
    id: "Q-003", farmer: "Ajay Sharma", initials: "AS",
    crop: "Rice", location: "Kolhapur, Maharashtra", date: "11 Feb 2025",
    pendingSince: "5 hours ago", priority: "Urgent",
    summary: "Pest infestation — stem borer visible on rice stalks",
    description: "I can see small holes in the rice stalks and the central shoot is dying (deadheart symptom). This is affecting nearly 30% of my field. I have never faced this before. Need immediate recommendation on pesticide and dosage.",
    image: "🌿",
  },
  {
    id: "Q-004", farmer: "Kavita Jadhav", initials: "KJ",
    crop: "Cotton", location: "Aurangabad, Maharashtra", date: "11 Feb 2025",
    pendingSince: "Yesterday", priority: "Normal",
    summary: "Cotton bolls not opening properly, stunted growth",
    description: "The cotton bolls look small and are not opening as expected. The leaves are also slightly curled downward. I used drip irrigation and followed standard fertilizer schedule. Could this be a micronutrient deficiency or a pest issue?",
    image: "🪴",
  },
  {
    id: "Q-005", farmer: "Mohan Kumar", initials: "MK",
    crop: "Sugarcane", location: "Satara, Maharashtra", date: "10 Feb 2025",
    pendingSince: "2 days ago", priority: "Normal",
    summary: "White powdery substance on sugarcane leaves",
    description: "There is a white powder-like coating appearing on the upper surface of sugarcane leaves. It started on 2-3 plants but has now spread to around 15 plants. The cane is at 4-month growth stage. Is this powdery mildew? What should I spray?",
    image: "🎋",
  },
  {
    id: "Q-006", farmer: "Priya Nair", initials: "PN",
    crop: "Onion", location: "Ahmednagar, Maharashtra", date: "10 Feb 2025",
    pendingSince: "2 days ago", priority: "Urgent",
    summary: "Bulb rotting before harvest — strong foul smell",
    description: "Several onion bulbs are soft and have started to rot from the bottom. There is a very bad smell. I plan to harvest in 2 weeks. Is this bacterial soft rot? Can I still save the crop? Please respond urgently as harvest is near.",
    image: "🧅",
  },
];

const OTHER_EXPERTS = [
  { name: "Dr. Anita Kulkarni",  initials: "AK", specialization: "Plant Pathology & Fungal Diseases" },
  { name: "Dr. Suresh Bhosale",  initials: "SB", specialization: "Soil Science & Nutrient Management" },
  { name: "Dr. Meera Iyer",      initials: "MI", specialization: "Entomology & Pest Control" },
];

const FILTERS = ["All", "Urgent", "Normal"];

/* ─────────────────────────────────────────
   HELPERS
───────────────────────────────────────── */
function PriorityBadge({ priority }) {
  const urgent = priority === "Urgent";
  return (
    <span className="pq-badge" style={{
      background: urgent ? "#fef2f2" : "#fffbeb",
      color: urgent ? "#dc2626" : "#d97706"
    }}>
      {urgent ? <AlertCircle size={11} /> : <Clock size={11} />}
      {priority}
    </span>
  );
}

/* ─────────────────────────────────────────
   FORWARD MODAL
───────────────────────────────────────── */
function ForwardModal({ query, onClose, onForward }) {
  const [selected, setSelected] = useState(null);
  return (
    <div className="pq-modal-overlay" onClick={onClose}>
      <div className="pq-modal" onClick={e => e.stopPropagation()}>
        <div className="pq-modal-title">Forward Query</div>
        <div className="pq-modal-sub">
          Select another expert to handle {query.farmer}'s query on {query.crop}.
        </div>
        {OTHER_EXPERTS.map((e, i) => (
          <div
            key={i}
            className={`pq-expert-option${selected === i ? " selected" : ""}`}
            onClick={() => setSelected(i)}
          >
            <div style={{
              width: 38, height: 38, borderRadius: "50%",
              background: "linear-gradient(135deg,#ebf8ff,#bee3f8)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 700, color: "#3182ce", fontSize: 14, flexShrink: 0
            }}>{e.initials}</div>
            <div>
              <div className="pq-expert-option-name">{e.name}</div>
              <div className="pq-expert-option-spec">{e.specialization}</div>
            </div>
          </div>
        ))}
        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          <button
            className="pq-btn pq-btn-primary"
            style={{ flex: 1 }}
            disabled={selected === null}
            onClick={() => { onForward(OTHER_EXPERTS[selected].name); onClose(); }}
          >
            <UserCheck size={15} /> Confirm Forward
          </button>
          <button className="pq-btn pq-btn-outline" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   SINGLE QUERY CARD
───────────────────────────────────────── */
function QueryCard({ query, onResolved, onForwarded }) {
  const [reply, setReply]         = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [forwarded, setForwarded] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [imgPreviewed, setImg]    = useState(false);

  const isResolved = submitted || forwarded;

  const handleSend = () => {
    if (!reply.trim()) return;
    setSubmitted(true);
    onResolved(query.id);
  };

  const handleForward = (expertName) => {
    setForwarded(expertName);
    onForwarded(query.id);
  };

  return (
    <>
      <div className={`pq-card${isResolved ? " resolved" : ""}`}>

        {/* ── Header ── */}
        <div className="pq-card-header">
          <div className="pq-avatar">{query.initials}</div>
          <div style={{ flex: 1 }}>
            <div className="pq-farmer-name">{query.farmer}</div>
            <div className="pq-farmer-meta">
              <span className="pq-meta-chip"><Leaf size={11} />{query.crop}</span>
              <span className="pq-meta-chip"><MapPin size={11} />{query.location}</span>
              <span className="pq-meta-chip"><Calendar size={11} />{query.date}</span>
            </div>
          </div>
          <PriorityBadge priority={query.priority} />
          <div className="pq-pending-timer">
            <Clock size={13} />
            {query.pendingSince}
          </div>
        </div>

        {/* ── Body ── */}
        <div className="pq-card-body">
          {/* Image */}
          <div className="pq-img-box" title="View farmer's image" onClick={() => setImg(v => !v)}>
            <div className="pq-img-emoji">{query.image}</div>
            <div className="pq-img-label"><Eye size={10} />View Image</div>
          </div>

          {/* Details */}
          <div>
            <div className="pq-section-label">Problem Summary</div>
            <div className="pq-problem-text" style={{ fontWeight: 600 }}>{query.summary}</div>

            <div className="pq-desc-box">{query.description}</div>

            {imgPreviewed && (
              <div style={{
                marginTop: 12, background: "#f0f7ff", borderRadius: 12,
                padding: "14px 16px", display: "flex", alignItems: "center", gap: 10
              }}>
                <span style={{ fontSize: "3rem" }}>{query.image}</span>
                <div>
                  <div style={{ fontSize: ".75rem", fontWeight: 700, color: "#1a365d", marginBottom: 2 }}>
                    Farmer's uploaded image
                  </div>
                  <div style={{ fontSize: ".72rem", color: "#6b7280" }}>
                    Crop: {query.crop} · Location: {query.location}
                  </div>
                </div>
                <X size={15} color="#9ca3af" style={{ marginLeft: "auto", cursor: "pointer" }}
                  onClick={() => setImg(false)} />
              </div>
            )}
          </div>
        </div>

        {/* ── Reply area ── */}
        <div className="pq-reply-area">
          <div className="pq-section-label" style={{ marginBottom: 8 }}>
            <MessageSquare size={12} style={{ verticalAlign: "middle", marginRight: 4 }} />
            Your Expert Response
          </div>

          {!isResolved ? (
            <>
              <textarea
                className="pq-textarea"
                placeholder="Write your detailed advice here… (e.g. Use fungicide spray twice a week and remove infected leaves)"
                value={reply}
                onChange={e => setReply(e.target.value)}
              />
              <div className="pq-action-row">
                <button
                  className="pq-btn pq-btn-primary"
                  disabled={!reply.trim()}
                  onClick={handleSend}
                >
                  <Send size={14} /> Send Response
                </button>
                <button
                  className="pq-btn pq-btn-outline"
                  onClick={() => setShowModal(true)}
                >
                  <UserCheck size={14} /> Forward to Another Expert
                </button>
              </div>
            </>
          ) : (
            <div className="pq-resolved-banner" style={{
              background: submitted ? "#f0fdf4" : "#fffbeb",
              color: submitted ? "#16a34a" : "#d97706"
            }}>
              {submitted
                ? <><CheckCircle size={16} /> Response sent successfully! This query is now marked as resolved.</>
                : <><UserCheck size={16} /> Query forwarded to <strong style={{ marginLeft: 4 }}>{forwarded}</strong>.</>
              }
            </div>
          )}
        </div>

      </div>

      {showModal && (
        <ForwardModal
          query={query}
          onClose={() => setShowModal(false)}
          onForward={handleForward}
        />
      )}
    </>
  );
}

/* ─────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────── */
export default function ExpertPendingQueries() {
  const [queries, setQueries]     = useState(QUERIES_INITIAL);
  const [resolvedIds, setResolved] = useState(new Set());
  const [search, setSearch]       = useState("");
  const [filter, setFilter]       = useState("All");

  const handleResolved = id => setResolved(prev => new Set([...prev, id]));
  const handleForwarded = id => setResolved(prev => new Set([...prev, id]));

  const pending  = queries.filter(q => !resolvedIds.has(q.id));
  const urgent   = pending.filter(q => q.priority === "Urgent").length;

  const filtered = useMemo(() => {
    return queries.filter(q => {
      const matchSearch =
        q.farmer.toLowerCase().includes(search.toLowerCase()) ||
        q.crop.toLowerCase().includes(search.toLowerCase()) ||
        q.location.toLowerCase().includes(search.toLowerCase()) ||
        q.summary.toLowerCase().includes(search.toLowerCase());
      const matchFilter =
        filter === "All" ||
        (filter === "Urgent" && q.priority === "Urgent") ||
        (filter === "Normal" && q.priority === "Normal");
      return matchSearch && matchFilter;
    });
  }, [queries, search, filter]);

  const stats = [
    { label: "Total Pending",  value: queries.length, sub: "Assigned to you",    icon: <Clock size={20} color="#3182ce" />, bg: "#ebf8ff" },
    { label: "Urgent",         value: queries.filter(q => q.priority === "Urgent").length, sub: "Need immediate reply", icon: <AlertCircle size={20} color="#dc2626" />, bg: "#fef2f2" },
    { label: "Responded",      value: resolvedIds.size, sub: "This session",     icon: <CheckCircle size={20} color="#16a34a" />, bg: "#f0fdf4" },
    { label: "Still Pending",  value: Math.max(0, queries.length - resolvedIds.size), sub: "Awaiting your reply", icon: <MessageSquare size={20} color="#d97706" />, bg: "#fffbeb" },
  ];

  return (
    <div className="pq-root">
      <style>{styles}</style>

      <ExpertPageHeader
        title="Pending Queries"
        description="Review and respond to farmer queries assigned to you."
      />

      <div className="pq-body">

        {/* ── Banner ── */}
        <div className="pq-tip-card">
          <div style={{ fontSize: "2.5rem", flexShrink: 0 }}>📩</div>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 700, marginBottom: 4 }}>
              {pending.length > 0
                ? `You have ${pending.length} pending quer${pending.length === 1 ? "y" : "ies"}`
                : "All caught up! No pending queries 🎉"}
            </div>
            <div style={{ fontSize: ".82rem", opacity: .85, lineHeight: 1.5 }}>
              {urgent > 0
                ? `${urgent} marked urgent — farmers are waiting for your expert advice. Please respond at the earliest.`
                : "No urgent queries right now. Great work keeping up with responses!"}
            </div>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="pq-stats-grid">
          {stats.map((s, i) => (
            <div className="pq-stat-card" key={i}>
              <div className="pq-stat-icon" style={{ background: s.bg }}>{s.icon}</div>
              <div>
                <div className="pq-stat-label">{s.label}</div>
                <div className="pq-stat-value">{s.value}</div>
                <div className="pq-stat-sub">{s.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Toolbar ── */}
        <div className="pq-toolbar">
          <div className="pq-search-wrap">
            <Search size={16} color="#9ca3af" />
            <input
              placeholder="Search by farmer, crop, location, or problem…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && <X size={14} color="#9ca3af" style={{ cursor: "pointer", flexShrink: 0 }} onClick={() => setSearch("")} />}
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {FILTERS.map(f => (
              <button
                key={f}
                className={`pq-filter-btn${filter === f ? " active" : ""}`}
                onClick={() => setFilter(f)}
              >
                {f === "Urgent" && <AlertCircle size={13} />}
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* ── Query Cards ── */}
        {filtered.length === 0 ? (
          <div className="pq-empty">
            <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>🔍</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", color: "#6b7280", marginBottom: 6 }}>
              No queries found
            </div>
            <div style={{ fontSize: ".82rem" }}>Try adjusting your search or filter.</div>
          </div>
        ) : (
          <div className="pq-list">
            {filtered.map(q => (
              <QueryCard
                key={q.id}
                query={q}
                onResolved={handleResolved}
                onForwarded={handleForwarded}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}