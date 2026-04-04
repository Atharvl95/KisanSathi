import { useState, useRef } from "react";
import {
  MapPin, Leaf, Calendar, AlertCircle, Clock, Eye, EyeOff,
  CheckCircle, UserCheck, Send, Paperclip, ZoomIn, ZoomOut,
  X, ChevronDown, ChevronUp, Lightbulb, FlaskConical,
  Stethoscope, Pill, ShieldCheck, FileText, Image as ImageIcon,
  RotateCcw, Plus, Trash2
} from "lucide-react";
import { ExpertPageHeader } from "../../Pages/Expertdash/Expertdash";

/* ─────────────────────────────────────────
   STYLES
───────────────────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');

  .rf-root { font-family: 'DM Sans', sans-serif; background: #f0f7ff; min-height: 100vh; }
  .rf-body { padding: 24px; display: flex; flex-direction: column; gap: 20px; }

  /* ── Shared card ── */
  .rf-card {
    background: #fff; border-radius: 16px;
    border: 1px solid #ebf8ff; overflow: hidden;
  }
  .rf-card-header {
    padding: 14px 20px; border-bottom: 1px solid #f0f7ff;
    display: flex; align-items: center; gap: 10px;
  }
  .rf-card-header-icon {
    width: 34px; height: 34px; border-radius: 10px;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .rf-card-title {
    font-family: 'Playfair Display', serif; font-size: .95rem;
    font-weight: 700; color: #1a365d; flex: 1;
  }
  .rf-card-body { padding: 20px; }

  /* ── Farmer info ── */
  .rf-farmer-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 16px;
  }
  .rf-info-chip {
    background: #f0f7ff; border-radius: 12px; padding: 12px 16px;
    display: flex; align-items: center; gap: 10px;
  }
  .rf-info-chip-icon {
    width: 34px; height: 34px; border-radius: 10px;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .rf-info-label { font-size: .7rem; color: #9ca3af; font-weight: 600; text-transform: uppercase; letter-spacing: .05em; }
  .rf-info-val { font-size: .88rem; font-weight: 700; color: #1a365d; margin-top: 2px; }

  /* ── Badge ── */
  .rf-badge {
    font-size: .65rem; font-weight: 700; padding: 3px 10px;
    border-radius: 20px; display: inline-flex; align-items: center; gap: 4px;
  }

  /* ── Pending timer ── */
  .rf-timer {
    display: flex; align-items: center; gap: 5px; font-size: .75rem;
    color: #d97706; font-weight: 600; background: #fffbeb;
    padding: 5px 12px; border-radius: 20px;
  }

  /* ── Image viewer ── */
  .rf-image-panel {
    display: grid; grid-template-columns: 1fr 1fr; gap: 20px;
  }
  @media (max-width: 700px) { .rf-image-panel { grid-template-columns: 1fr; } }

  .rf-img-box {
    background: linear-gradient(135deg, #ebf8ff, #bee3f8);
    border-radius: 14px; border: 1px solid #ebf8ff;
    display: flex; align-items: center; justify-content: center;
    position: relative; overflow: hidden;
    min-height: 200px; cursor: zoom-in;
    transition: transform .2s;
  }
  .rf-img-box.zoomed { cursor: zoom-out; transform: scale(1.0); }
  .rf-img-emoji { font-size: 7rem; line-height: 1; user-select: none; transition: transform .3s; }
  .rf-img-box.zoomed .rf-img-emoji { transform: scale(1.4); }

  .rf-img-overlay {
    position: absolute; bottom: 10px; right: 10px;
    background: rgba(26,54,93,.55); color: #fff; border-radius: 8px;
    padding: 4px 10px; font-size: .7rem; font-weight: 600;
    display: flex; align-items: center; gap: 5px; backdrop-filter: blur(4px);
  }

  /* Problem description */
  .rf-desc-box {
    background: #f0f7ff; border-radius: 12px; padding: 16px 18px;
    font-size: .85rem; color: #374151; line-height: 1.75;
    border-left: 3px solid #3182ce;
  }

  /* ── Analysis section ── */
  .rf-analysis-grid {
    display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 16px;
  }
  @media (max-width: 680px) { .rf-analysis-grid { grid-template-columns: 1fr; } }

  .rf-analysis-field label {
    display: block; font-size: .72rem; font-weight: 600; color: #9ca3af;
    text-transform: uppercase; letter-spacing: .05em; margin-bottom: 6px;
  }
  .rf-analysis-input {
    width: 100%; padding: 10px 12px; border-radius: 10px;
    border: 1.5px solid #ebf8ff; background: #f8fbff;
    font-family: 'DM Sans', sans-serif; font-size: .83rem;
    color: #1a365d; outline: none; box-sizing: border-box;
    transition: border-color .18s;
  }
  .rf-analysis-input:focus { border-color: #3182ce; background: #fff; }
  .rf-analysis-input::placeholder { color: #b0c4d8; }

  .rf-notes-area {
    width: 100%; padding: 12px 14px; border-radius: 10px;
    border: 1.5px solid #ebf8ff; background: #f8fbff;
    font-family: 'DM Sans', sans-serif; font-size: .83rem;
    color: #1a365d; outline: none; resize: vertical; min-height: 72px;
    box-sizing: border-box; transition: border-color .18s;
  }
  .rf-notes-area:focus { border-color: #3182ce; background: #fff; }
  .rf-notes-area::placeholder { color: #b0c4d8; }

  /* ── Treatment builder ── */
  .rf-treatment-grid {
    display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px;
  }
  @media (max-width: 680px) { .rf-treatment-grid { grid-template-columns: 1fr; } }

  .rf-treatment-col {
    background: #f8fbff; border-radius: 12px;
    border: 1.5px solid #ebf8ff; padding: 14px;
  }
  .rf-treatment-col-label {
    font-size: .72rem; font-weight: 700; text-transform: uppercase;
    letter-spacing: .05em; margin-bottom: 10px;
    display: flex; align-items: center; gap: 6px;
  }
  .rf-treatment-item {
    display: flex; align-items: center; gap: 8px; margin-bottom: 8px;
  }
  .rf-treatment-item input {
    flex: 1; padding: 7px 10px; border-radius: 8px;
    border: 1.5px solid #ebf8ff; background: #fff;
    font-family: 'DM Sans', sans-serif; font-size: .8rem; color: #1a365d;
    outline: none; transition: border-color .18s;
  }
  .rf-treatment-item input:focus { border-color: #3182ce; }
  .rf-treatment-item input::placeholder { color: #b0c4d8; }
  .rf-add-btn {
    width: 100%; padding: 7px; border-radius: 8px;
    border: 1.5px dashed #bee3f8; background: transparent; cursor: pointer;
    font-family: 'DM Sans', sans-serif; font-size: .78rem;
    color: #3182ce; font-weight: 600; display: flex; align-items: center;
    justify-content: center; gap: 5px; transition: all .15s;
  }
  .rf-add-btn:hover { background: #ebf8ff; }
  .rf-icon-btn {
    background: none; border: none; cursor: pointer; padding: 4px;
    border-radius: 6px; display: flex; align-items: center; justify-content: center;
    transition: background .15s; color: #9ca3af;
  }
  .rf-icon-btn:hover { background: #fef2f2; color: #dc2626; }

  /* ── Main response box ── */
  .rf-textarea {
    width: 100%; min-height: 130px; border-radius: 12px;
    border: 1.5px solid #ebf8ff; background: #f8fbff;
    padding: 14px 16px; font-family: 'DM Sans', sans-serif;
    font-size: .87rem; color: #1a365d; resize: vertical;
    outline: none; box-sizing: border-box; line-height: 1.75;
    transition: border-color .18s;
  }
  .rf-textarea:focus { border-color: #3182ce; background: #fff; }
  .rf-textarea::placeholder { color: #b0c4d8; }

  /* ── Attach pills ── */
  .rf-attach-row { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 12px; }
  .rf-attach-pill {
    display: flex; align-items: center; gap: 6px;
    background: #f0f7ff; border: 1.5px solid #bee3f8;
    border-radius: 20px; padding: 5px 12px; font-size: .75rem;
    color: #3182ce; font-weight: 600; cursor: pointer;
    transition: all .15s;
  }
  .rf-attach-pill:hover { background: #ebf8ff; }
  .rf-attach-file {
    display: flex; align-items: center; gap: 6px;
    background: #f0f7ff; border: 1.5px solid #bee3f8;
    border-radius: 20px; padding: 5px 12px; font-size: .75rem; color: #1a365d;
  }

  /* ── Action row ── */
  .rf-action-row {
    display: flex; gap: 10px; flex-wrap: wrap; align-items: center; margin-top: 20px;
  }
  .rf-btn {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 11px 22px; border-radius: 11px;
    font-family: 'DM Sans', sans-serif; font-size: .85rem;
    font-weight: 700; cursor: pointer; border: none; transition: all .18s;
  }
  .rf-btn-primary {
    background: linear-gradient(135deg, #1a365d, #3182ce); color: #fff;
  }
  .rf-btn-primary:hover:not(:disabled) { box-shadow: 0 6px 20px rgba(49,130,206,.35); transform: translateY(-1px); }
  .rf-btn-primary:disabled { opacity: .45; cursor: not-allowed; transform: none; }
  .rf-btn-outline {
    background: #fff; color: #6b7280; border: 1.5px solid #ebf8ff;
  }
  .rf-btn-outline:hover { background: #f0f7ff; border-color: #3182ce; color: #1a365d; }
  .rf-btn-danger {
    background: #fff; color: #dc2626; border: 1.5px solid #fecaca;
  }
  .rf-btn-danger:hover { background: #fef2f2; }

  /* ── Success state ── */
  .rf-success-banner {
    background: linear-gradient(135deg, #f0fdf4, #dcfce7);
    border: 1.5px solid #bbf7d0; border-radius: 14px;
    padding: 24px; text-align: center;
  }
  .rf-success-icon { font-size: 3rem; margin-bottom: 10px; }
  .rf-success-title { font-family: 'Playfair Display', serif; font-size: 1.1rem; color: #16a34a; margin-bottom: 6px; }
  .rf-success-sub { font-size: .82rem; color: #6b7280; }

  /* ── Forward modal ── */
  .rf-modal-overlay {
    position: fixed; inset: 0; background: rgba(26,54,93,.35);
    display: flex; align-items: center; justify-content: center;
    z-index: 1000; padding: 24px;
  }
  .rf-modal {
    background: #fff; border-radius: 20px; padding: 28px;
    width: 100%; max-width: 420px; box-shadow: 0 20px 60px rgba(26,54,93,.18);
  }
  .rf-modal-title { font-family: 'Playfair Display', serif; font-size: 1.1rem; color: #1a365d; margin-bottom: 4px; }
  .rf-modal-sub { font-size: .8rem; color: #6b7280; margin-bottom: 18px; }
  .rf-expert-opt {
    display: flex; align-items: center; gap: 12px;
    padding: 12px 14px; border-radius: 12px; cursor: pointer;
    border: 1.5px solid #ebf8ff; margin-bottom: 10px; transition: all .15s;
  }
  .rf-expert-opt:hover, .rf-expert-opt.sel { border-color: #3182ce; background: #ebf8ff; }
  .rf-expert-opt-name { font-size: .85rem; font-weight: 700; color: #1a365d; }
  .rf-expert-opt-spec { font-size: .73rem; color: #6b7280; }
  .rf-expert-avatar {
    width: 38px; height: 38px; border-radius: 50%;
    background: linear-gradient(135deg,#ebf8ff,#bee3f8);
    display: flex; align-items: center; justify-content: center;
    font-weight: 700; color: #3182ce; font-size: 14px; flex-shrink: 0;
  }

  /* ── Toggle collapse ── */
  .rf-collapse-btn {
    background: none; border: none; cursor: pointer; padding: 4px;
    display: flex; align-items: center; color: #9ca3af; transition: color .15s;
  }
  .rf-collapse-btn:hover { color: #3182ce; }

  /* ── Divider label ── */
  .rf-section-label {
    font-size: .72rem; font-weight: 700; color: #9ca3af;
    text-transform: uppercase; letter-spacing: .06em; margin-bottom: 12px;
    display: flex; align-items: center; gap: 8px;
  }
  .rf-section-label::after {
    content: ''; flex: 1; height: 1px; background: #ebf8ff;
  }
`;

/* ─────────────────────────────────────────
   STATIC DATA — single case being responded to
───────────────────────────────────────── */
const CASE = {
  id: "Q-001", farmer: "Ramesh Patil", initials: "RP",
  crop: "Tomato", location: "Pune, Maharashtra", date: "12 Feb 2025",
  pendingSince: "2 hours ago", priority: "Urgent",
  summary: "Leaves turning yellow with brown spots",
  description: "My tomato plants have started showing yellow leaves with dark brown spots near the edges. This started about 3 days ago and is spreading to other plants quickly. I water them daily and have applied fertilizer last week. The lower leaves seem to be affected first and the spots have a yellowish halo around them. Please advise urgently as the whole crop may be at risk.",
  image: "🍅",
};

const OTHER_EXPERTS = [
  { name: "Dr. Anita Kulkarni",  initials: "AK", spec: "Plant Pathology & Fungal Diseases" },
  { name: "Dr. Suresh Bhosale",  initials: "SB", spec: "Soil Science & Nutrient Management" },
  { name: "Dr. Meera Iyer",      initials: "MI", spec: "Entomology & Pest Control" },
];

/* ─────────────────────────────────────────
   HELPERS
───────────────────────────────────────── */
function PriorityBadge({ priority }) {
  const urgent = priority === "Urgent";
  return (
    <span className="rf-badge" style={{
      background: urgent ? "#fef2f2" : "#fffbeb",
      color: urgent ? "#dc2626" : "#d97706"
    }}>
      {urgent ? <AlertCircle size={11} /> : <Clock size={11} />}
      {priority}
    </span>
  );
}

function TreatmentCol({ icon, label, color, bg, items, onAdd, onChange, onRemove, placeholder }) {
  return (
    <div className="rf-treatment-col" style={{ borderColor: bg }}>
      <div className="rf-treatment-col-label" style={{ color }}>
        {icon}{label}
      </div>
      {items.map((item, i) => (
        <div className="rf-treatment-item" key={i}>
          <input
            placeholder={placeholder[i % placeholder.length]}
            value={item}
            onChange={e => onChange(i, e.target.value)}
          />
          <button className="rf-icon-btn" onClick={() => onRemove(i)}><Trash2 size={13} /></button>
        </div>
      ))}
      <button className="rf-add-btn" onClick={onAdd}><Plus size={13} />Add</button>
    </div>
  );
}

/* ─────────────────────────────────────────
   FORWARD MODAL
───────────────────────────────────────── */
function ForwardModal({ onClose, onForward }) {
  const [selected, setSelected] = useState(null);
  return (
    <div className="rf-modal-overlay" onClick={onClose}>
      <div className="rf-modal" onClick={e => e.stopPropagation()}>
        <div className="rf-modal-title">Forward / Escalate Query</div>
        <div className="rf-modal-sub">Select a senior expert to handle this case.</div>
        {OTHER_EXPERTS.map((e, i) => (
          <div key={i} className={`rf-expert-opt${selected === i ? " sel" : ""}`} onClick={() => setSelected(i)}>
            <div className="rf-expert-avatar">{e.initials}</div>
            <div>
              <div className="rf-expert-opt-name">{e.name}</div>
              <div className="rf-expert-opt-spec">{e.spec}</div>
            </div>
          </div>
        ))}
        <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
          <button
            className="rf-btn rf-btn-primary" style={{ flex: 1 }}
            disabled={selected === null}
            onClick={() => { onForward(OTHER_EXPERTS[selected].name); onClose(); }}
          >
            <UserCheck size={15} />Confirm Forward
          </button>
          <button className="rf-btn rf-btn-outline" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────── */
export default function ExpertRespondToFarmer() {
  const fileRef = useRef(null);

  // Image viewer
  const [zoomed, setZoomed]     = useState(false);

  // Analysis
  const [showAnalysis, setShowAnalysis] = useState(true);
  const [disease, setDisease]   = useState("");
  const [cause, setCause]       = useState("");
  const [severity, setSeverity] = useState("");
  const [notes, setNotes]       = useState("");

  // Treatment builder
  const [showTreatment, setShowTreatment] = useState(true);
  const [problems,  setProblems]  = useState([""]);
  const [causes,    setCauses]    = useState([""]);
  const [solutions, setSolutions] = useState([""]);

  const listOps = (setter) => ({
    add:    ()       => setter(p => [...p, ""]),
    change: (i, v)   => setter(p => p.map((x, j) => j === i ? v : x)),
    remove: (i)      => setter(p => p.filter((_, j) => j !== i)),
  });
  const problemOps  = listOps(setProblems);
  const causeOps    = listOps(setCauses);
  const solutionOps = listOps(setSolutions);

  // Response
  const [response, setResponse] = useState("");
  const [attachments, setAttachments] = useState([]);

  // Submit states
  const [submitted, setSubmitted] = useState(false);
  const [forwarded, setForwarded] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const canSubmit = response.trim().length > 0;

  const handleSubmit = () => {
    if (!canSubmit) return;
    setSubmitted(true);
  };

  const handleFileAttach = (e) => {
    const files = Array.from(e.target.files);
    setAttachments(prev => [...prev, ...files.map(f => f.name)]);
  };

  const handleForward = (name) => setForwarded(name);

  const isResolved = submitted || forwarded;

  return (
    <div className="rf-root">
      <style>{styles}</style>

      <ExpertPageHeader
        title="Respond to Farmer"
        description={`Case ${CASE.id} — Detailed case solving view`}
      />

      <div className="rf-body">

        {/* ══ 1. FARMER DETAILS ══ */}
        <div className="rf-card">
          <div className="rf-card-header">
            <div className="rf-card-header-icon" style={{ background: "#ebf8ff" }}>
              <Stethoscope size={18} color="#3182ce" />
            </div>
            <div className="rf-card-title">Farmer Details</div>
            <PriorityBadge priority={CASE.priority} />
            <div className="rf-timer" style={{ marginLeft: 8 }}>
              <Clock size={13} />{CASE.pendingSince}
            </div>
          </div>
          <div className="rf-card-body">
            <div className="rf-farmer-grid">
              {[
                { label: "Farmer",   value: CASE.farmer,   icon: "👨‍🌾", bg: "#ebf8ff", color: "#3182ce" },
                { label: "Crop",     value: CASE.crop,     icon: <Leaf size={16} color="#16a34a" />, bg: "#f0fdf4", color: "#16a34a" },
                { label: "Location", value: CASE.location, icon: <MapPin size={16} color="#7c3aed" />, bg: "#f5f3ff", color: "#7c3aed" },
                { label: "Date",     value: CASE.date,     icon: <Calendar size={16} color="#d97706" />, bg: "#fffbeb", color: "#d97706" },
                { label: "Case ID",  value: CASE.id,       icon: "🔖", bg: "#f0f7ff", color: "#3182ce" },
              ].map((c, i) => (
                <div className="rf-info-chip" key={i}>
                  <div className="rf-info-chip-icon" style={{ background: c.bg }}>
                    {typeof c.icon === "string" ? <span style={{ fontSize: 16 }}>{c.icon}</span> : c.icon}
                  </div>
                  <div>
                    <div className="rf-info-label">{c.label}</div>
                    <div className="rf-info-val">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ 2. IMAGE + PROBLEM ══ */}
        <div className="rf-card">
          <div className="rf-card-header">
            <div className="rf-card-header-icon" style={{ background: "#f0fdf4" }}>
              <ImageIcon size={18} color="#16a34a" />
            </div>
            <div className="rf-card-title">Crop Image & Problem Description</div>
          </div>
          <div className="rf-card-body">
            <div className="rf-image-panel">
              {/* Image box */}
              <div>
                <div className="rf-section-label">Farmer's Uploaded Image</div>
                <div
                  className={`rf-img-box${zoomed ? " zoomed" : ""}`}
                  onClick={() => setZoomed(v => !v)}
                  title={zoomed ? "Click to zoom out" : "Click to zoom in"}
                >
                  <span className="rf-img-emoji">{CASE.image}</span>
                  <div className="rf-img-overlay">
                    {zoomed ? <ZoomOut size={12} /> : <ZoomIn size={12} />}
                    {zoomed ? "Click to zoom out" : "Click to zoom in"}
                  </div>
                </div>
                <div style={{ fontSize: ".72rem", color: "#9ca3af", marginTop: 8, textAlign: "center" }}>
                  {CASE.crop} · {CASE.location}
                </div>
              </div>

              {/* Problem description */}
              <div>
                <div className="rf-section-label">Problem Summary</div>
                <div style={{ fontWeight: 700, fontSize: ".92rem", color: "#1a365d", marginBottom: 12 }}>
                  {CASE.summary}
                </div>
                <div className="rf-section-label">Full Description</div>
                <div className="rf-desc-box">{CASE.description}</div>
              </div>
            </div>
          </div>
        </div>

        {/* ══ 3. ANALYSIS ══ */}
        <div className="rf-card">
          <div className="rf-card-header">
            <div className="rf-card-header-icon" style={{ background: "#f5f3ff" }}>
              <FlaskConical size={18} color="#7c3aed" />
            </div>
            <div className="rf-card-title">Expert Analysis <span style={{ fontSize: ".72rem", fontWeight: 400, color: "#9ca3af" }}>(optional)</span></div>
            <button className="rf-collapse-btn" onClick={() => setShowAnalysis(v => !v)}>
              {showAnalysis ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
          </div>
          {showAnalysis && (
            <div className="rf-card-body">
              <div className="rf-analysis-grid">
                <div className="rf-analysis-field">
                  <label>Suspected Disease</label>
                  <input className="rf-analysis-input" placeholder="e.g. Leaf Blight" value={disease} onChange={e => setDisease(e.target.value)} />
                </div>
                <div className="rf-analysis-field">
                  <label>Root Cause</label>
                  <input className="rf-analysis-input" placeholder="e.g. Fungal infection" value={cause} onChange={e => setCause(e.target.value)} />
                </div>
                <div className="rf-analysis-field">
                  <label>Severity Level</label>
                  <select className="rf-analysis-input" value={severity} onChange={e => setSeverity(e.target.value)}>
                    <option value="">Select severity</option>
                    <option>Low — Early stage</option>
                    <option>Medium — Moderate spread</option>
                    <option>High — Rapid spreading</option>
                    <option>Critical — Crop at risk</option>
                  </select>
                </div>
              </div>
              <div>
                <div className="rf-section-label">Expert Notes</div>
                <textarea
                  className="rf-notes-area"
                  placeholder="Add private analysis notes… e.g. Possible fungal infection due to high humidity. Symptoms match Septoria leaf spot."
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                />
              </div>
            </div>
          )}
        </div>

        {/* ══ 4. TREATMENT BUILDER ══ */}
        <div className="rf-card">
          <div className="rf-card-header">
            <div className="rf-card-header-icon" style={{ background: "#fffbeb" }}>
              <Pill size={18} color="#d97706" />
            </div>
            <div className="rf-card-title">Suggested Treatment Format <span style={{ fontSize: ".72rem", fontWeight: 400, color: "#9ca3af" }}>(structured breakdown)</span></div>
            <button className="rf-collapse-btn" onClick={() => setShowTreatment(v => !v)}>
              {showTreatment ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
          </div>
          {showTreatment && (
            <div className="rf-card-body">
              <div className="rf-treatment-grid">
                <TreatmentCol
                  icon={<AlertCircle size={13} />} label="Problem / Symptom"
                  color="#dc2626" bg="#fecaca"
                  items={problems} placeholder={["Yellowing leaves", "Brown spots", "Wilting"]}
                  onAdd={problemOps.add} onChange={problemOps.change} onRemove={problemOps.remove}
                />
                <TreatmentCol
                  icon={<FlaskConical size={13} />} label="Possible Cause"
                  color="#7c3aed" bg="#ddd6fe"
                  items={causes} placeholder={["Fungal infection", "Nitrogen deficiency", "Over-watering"]}
                  onAdd={causeOps.add} onChange={causeOps.change} onRemove={causeOps.remove}
                />
                <TreatmentCol
                  icon={<ShieldCheck size={13} />} label="Recommended Solution"
                  color="#16a34a" bg="#bbf7d0"
                  items={solutions} placeholder={["Spray Mancozeb 2g/L", "Apply urea 30kg/acre", "Reduce irrigation"]}
                  onAdd={solutionOps.add} onChange={solutionOps.change} onRemove={solutionOps.remove}
                />
              </div>
            </div>
          )}
        </div>

        {/* ══ 5. RESPONSE BOX ══ */}
        <div className="rf-card">
          <div className="rf-card-header">
            <div className="rf-card-header-icon" style={{ background: "#ebf8ff" }}>
              <Lightbulb size={18} color="#3182ce" />
            </div>
            <div className="rf-card-title">Your Expert Response</div>
          </div>
          <div className="rf-card-body">
            {!isResolved ? (
              <>
                <div className="rf-section-label">Write your advice</div>
                <textarea
                  className="rf-textarea"
                  placeholder={`Write your detailed advice here…\n\nExample:\n• Use fungicide spray (Mancozeb 75 WP @ 2g/L) twice a week for 3 weeks\n• Remove and destroy all infected leaves immediately\n• Avoid overhead irrigation — use drip instead\n• Re-check soil pH and ensure it is between 6.0–6.8`}
                  value={response}
                  onChange={e => setResponse(e.target.value)}
                />

                {/* Attach section */}
                <div style={{ marginTop: 14 }}>
                  <div className="rf-section-label">Attachments</div>
                  <div className="rf-attach-row">
                    <button className="rf-attach-pill" onClick={() => fileRef.current?.click()}>
                      <ImageIcon size={13} />Attach Image
                    </button>
                    <button className="rf-attach-pill" onClick={() => fileRef.current?.click()}>
                      <FileText size={13} />Attach PDF Guide
                    </button>
                    <input
                      ref={fileRef} type="file" style={{ display: "none" }}
                      multiple accept="image/*,.pdf"
                      onChange={handleFileAttach}
                    />
                    {attachments.map((f, i) => (
                      <span className="rf-attach-file" key={i}>
                        <Paperclip size={11} />{f}
                        <X size={11} style={{ cursor: "pointer", marginLeft: 2 }}
                          onClick={() => setAttachments(prev => prev.filter((_, j) => j !== i))} />
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rf-action-row">
                  <button
                    className="rf-btn rf-btn-primary"
                    disabled={!canSubmit}
                    onClick={handleSubmit}
                  >
                    <Send size={15} />Send Response
                  </button>
                  <button
                    className="rf-btn rf-btn-outline"
                    onClick={() => setShowModal(true)}
                  >
                    <UserCheck size={15} />Forward to Senior Expert
                  </button>
                  <button
                    className="rf-btn rf-btn-danger"
                    onClick={() => setShowModal(true)}
                  >
                    <AlertCircle size={15} />Escalate Case
                  </button>
                </div>
              </>
            ) : (
              <div className="rf-success-banner">
                <div className="rf-success-icon">{submitted ? "✅" : "📨"}</div>
                <div className="rf-success-title">
                  {submitted ? "Response sent successfully!" : `Case forwarded to ${forwarded}`}
                </div>
                <div className="rf-success-sub">
                  {submitted
                    ? "Your advice has been delivered to Ramesh Patil. This case will now move to Case History."
                    : `The query has been escalated to ${forwarded} for further handling.`}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

      {showModal && (
        <ForwardModal
          onClose={() => setShowModal(false)}
          onForward={(name) => { handleForward(name); setShowModal(false); }}
        />
      )}
    </div>
  );
}