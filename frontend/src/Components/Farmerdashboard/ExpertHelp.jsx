import { useState, useRef } from "react";
import { MessageSquare, Upload, X, CheckCircle, Clock, AlertCircle, ChevronDown, Send, RefreshCw, ImageIcon, MapPin, Leaf, Flame } from "lucide-react";
import { FarmerPageHeader } from "../../Pages/Farmerdash/Farmerdash";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');

  .eh-root {
    font-family: 'DM Sans', sans-serif;
    background: #f7fdf9;
    min-height: 100vh;
  }

  .eh-body { padding: 24px; display: flex; flex-direction: column; gap: 20px; }

  .eh-card {
    background: #ffffff;
    border-radius: 16px;
    border: 1px solid #e9f7ef;
    overflow: hidden;
  }

  .eh-card-header {
    padding: 16px 20px;
    border-bottom: 1px solid #e9f7ef;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .eh-card-icon {
    width: 32px; height: 32px;
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }

  .eh-card-title {
    font-family: 'Playfair Display', serif;
    font-size: 1rem;
    font-weight: 700;
    color: #14532d;
  }

  .eh-card-sub {
    font-size: 0.75rem;
    color: #6b7280;
    margin-top: 2px;
  }

  .eh-card-body { padding: 20px; }

  /* Form */
  .eh-field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 14px; }

  .eh-label {
    font-size: 0.78rem;
    font-weight: 600;
    color: #374151;
    display: flex; align-items: center; gap: 6px;
  }

  .eh-textarea {
    width: 100%;
    min-height: 90px;
    padding: 10px 12px;
    border: 1.5px solid #e5e7eb;
    border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.83rem;
    color: #1f2937;
    resize: vertical;
    outline: none;
    transition: border-color 0.15s;
    box-sizing: border-box;
  }

  .eh-textarea:focus { border-color: #16a34a; }

  .eh-input {
    width: 100%;
    padding: 9px 12px;
    border: 1.5px solid #e5e7eb;
    border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.83rem;
    color: #1f2937;
    outline: none;
    transition: border-color 0.15s;
    box-sizing: border-box;
  }

  .eh-input:focus { border-color: #16a34a; }

  .eh-select-wrap { position: relative; }

  .eh-select {
    width: 100%;
    padding: 9px 32px 9px 12px;
    border: 1.5px solid #e5e7eb;
    border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.83rem;
    color: #1f2937;
    outline: none;
    appearance: none;
    background: #fff;
    cursor: pointer;
    transition: border-color 0.15s;
  }

  .eh-select:focus { border-color: #16a34a; }

  .eh-select-arrow {
    position: absolute; right: 10px; top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
  }

  .eh-field-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 14px;
  }

  @media (max-width: 600px) {
    .eh-field-row { grid-template-columns: 1fr; }
  }

  /* Upload */
  .eh-upload-zone {
    border: 2px dashed #bbf7d0;
    border-radius: 12px;
    padding: 22px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s;
    background: #f0fdf4;
    position: relative;
  }

  .eh-upload-zone:hover { border-color: #16a34a; background: #dcfce7; }
  .eh-upload-zone.drag { border-color: #16a34a; background: #dcfce7; }

  .eh-upload-icon {
    width: 44px; height: 44px;
    border-radius: 12px;
    background: #dcfce7;
    border: 1.5px solid #bbf7d0;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 10px;
  }

  .eh-upload-label {
    font-size: 0.83rem;
    font-weight: 600;
    color: #14532d;
    margin-bottom: 4px;
  }

  .eh-upload-hint { font-size: 0.72rem; color: #6b7280; }

  .eh-preview-grid {
    display: flex; gap: 10px; flex-wrap: wrap; margin-top: 12px;
  }

  .eh-preview-item {
    position: relative;
    width: 72px; height: 72px;
    border-radius: 10px;
    overflow: hidden;
    border: 1.5px solid #bbf7d0;
  }

  .eh-preview-item img {
    width: 100%; height: 100%; object-fit: cover;
  }

  .eh-preview-remove {
    position: absolute; top: 3px; right: 3px;
    width: 18px; height: 18px;
    border-radius: 50%;
    background: rgba(0,0,0,0.55);
    border: none;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
  }

  /* Urgency */
  .eh-urgency-row { display: flex; gap: 10px; }

  .eh-urgency-btn {
    flex: 1;
    padding: 10px;
    border-radius: 10px;
    border: 1.5px solid #e5e7eb;
    background: #fff;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.8rem;
    font-weight: 600;
    color: #6b7280;
    display: flex; align-items: center; justify-content: center;
    gap: 6px;
    transition: all 0.18s;
  }

  .eh-urgency-btn.normal.active {
    border-color: #16a34a;
    background: #f0fdf4;
    color: #14532d;
  }

  .eh-urgency-btn.urgent.active {
    border-color: #dc2626;
    background: #fef2f2;
    color: #dc2626;
  }

  /* Submit */
  .eh-submit-btn {
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
    display: flex; align-items: center; justify-content: center;
    gap: 8px;
    transition: all 0.2s;
    box-shadow: 0 4px 12px rgba(22,101,52,0.22);
    margin-top: 4px;
  }

  .eh-submit-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(22,101,52,0.3); }
  .eh-submit-btn:disabled { opacity: 0.65; cursor: not-allowed; transform: none; }

  /* Filter tabs */
  .eh-tabs { display: flex; gap: 8px; flex-wrap: wrap; }

  .eh-tab {
    padding: 7px 16px;
    border-radius: 9px;
    border: 1.5px solid #e5e7eb;
    background: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.78rem;
    font-weight: 600;
    color: #6b7280;
    cursor: pointer;
    transition: all 0.15s;
    display: flex; align-items: center; gap: 6px;
  }

  .eh-tab:hover { background: #f0fdf4; color: #16a34a; border-color: #bbf7d0; }
  .eh-tab.active { background: #f0fdf4; color: #16a34a; border-color: #16a34a; }

  .eh-tab-dot {
    width: 8px; height: 8px; border-radius: 50%;
    display: inline-block;
  }

  /* Request cards */
  .eh-req-list { display: flex; flex-direction: column; gap: 12px; }

  .eh-req-card {
    border: 1.5px solid #e9f7ef;
    border-radius: 14px;
    overflow: hidden;
    background: #fff;
    transition: box-shadow 0.15s;
  }

  .eh-req-card:hover { box-shadow: 0 2px 12px rgba(0,0,0,0.06); }

  .eh-req-top {
    padding: 14px 18px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
    border-bottom: 1px solid #f3f4f6;
  }

  .eh-req-left { flex: 1; }

  .eh-req-problem {
    font-size: 0.88rem;
    font-weight: 700;
    color: #111827;
    margin-bottom: 6px;
    display: flex; align-items: center; gap: 8px;
  }

  .eh-req-meta {
    display: flex; flex-wrap: wrap; gap: 10px;
    font-size: 0.72rem; color: #9ca3af;
  }

  .eh-req-meta span {
    display: flex; align-items: center; gap: 4px;
  }

  .eh-status-badge {
    padding: 4px 10px;
    border-radius: 7px;
    font-size: 0.7rem;
    font-weight: 700;
    flex-shrink: 0;
    display: flex; align-items: center; gap: 5px;
    white-space: nowrap;
  }

  .eh-status-pending   { background: #fef2f2; color: #dc2626; border: 1px solid #fecaca; }
  .eh-status-progress  { background: #fffbeb; color: #d97706; border: 1px solid #fde68a; }
  .eh-status-resolved  { background: #f0fdf4; color: #16a34a; border: 1px solid #bbf7d0; }

  .eh-urgency-tag {
    padding: 2px 8px;
    border-radius: 5px;
    font-size: 0.65rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .eh-urgency-tag.urgent { background: #fef2f2; color: #dc2626; border: 1px solid #fecaca; }
  .eh-urgency-tag.normal { background: #f0fdf4; color: #16a34a; border: 1px solid #bbf7d0; }

  .eh-req-images { display: flex; gap: 6px; margin-top: 8px; }

  .eh-req-img-thumb {
    width: 44px; height: 44px;
    border-radius: 7px;
    object-fit: cover;
    border: 1px solid #e9f7ef;
  }

  /* Expert reply */
  .eh-reply {
    padding: 14px 18px;
    background: #f7fdf9;
    border-top: 1px solid #e9f7ef;
  }

  .eh-reply-header {
    font-size: 0.72rem;
    font-weight: 700;
    color: #16a34a;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 8px;
    display: flex; align-items: center; gap: 6px;
  }

  .eh-reply-expert {
    display: flex; align-items: center; gap: 10px; margin-bottom: 8px;
  }

  .eh-expert-avatar {
    width: 32px; height: 32px;
    border-radius: 50%;
    background: linear-gradient(135deg, #14532d, #16a34a);
    display: flex; align-items: center; justify-content: center;
    font-size: 0.7rem; font-weight: 800; color: #fff;
    flex-shrink: 0;
  }

  .eh-expert-name { font-size: 0.8rem; font-weight: 700; color: #14532d; }
  .eh-expert-role { font-size: 0.68rem; color: #9ca3af; }

  .eh-reply-text {
    font-size: 0.83rem;
    color: #374151;
    line-height: 1.6;
    padding: 10px 14px;
    background: #fff;
    border-radius: 10px;
    border: 1px solid #e9f7ef;
  }

  .eh-pending-reply {
    padding: 12px 14px;
    background: #fff;
    border-radius: 10px;
    border: 1px dashed #d1d5db;
    font-size: 0.78rem;
    color: #9ca3af;
    text-align: center;
  }

  /* Empty */
  .eh-empty {
    text-align: center;
    padding: 40px 20px;
    color: #9ca3af;
  }

  .eh-empty-icon { font-size: 3rem; opacity: 0.35; margin-bottom: 12px; }
  .eh-empty-text { font-size: 0.83rem; line-height: 1.6; }

  /* Success toast */
  .eh-toast {
    position: fixed; bottom: 24px; right: 24px; z-index: 100;
    background: #14532d; color: #fff;
    padding: 12px 20px; border-radius: 12px;
    display: flex; align-items: center; gap: 8px;
    font-size: 0.82rem; font-weight: 700;
    box-shadow: 0 8px 24px rgba(0,0,0,0.18);
    animation: eh-fade 0.3s ease;
    font-family: 'DM Sans', sans-serif;
  }

  @keyframes eh-fade {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes eh-fadein {
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .eh-req-card { animation: eh-fadein 0.3s ease; }
`;

const CROP_OPTIONS = [
  "Tomato", "Wheat", "Rice", "Maize", "Cotton",
  "Sugarcane", "Soybean", "Potato", "Onion", "Mango",
  "Banana", "Chickpea", "Mustard", "Groundnut", "Other",
];

const MOCK_REQUESTS = [
  {
    id: 1,
    problem: "Leaves turning yellow with brown spots at edges",
    crop: "Tomato",
    location: "Pune, Maharashtra",
    date: "12 Feb 2026",
    status: "resolved",
    urgency: "urgent",
    images: ["https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=80&q=60"],
    expert: { name: "Dr. Ramesh Patil", role: "Plant Pathologist", initials: "RP" },
    reply: "The yellowing with brown edges is likely caused by early blight (Alternaria solani). Apply copper-based fungicide (Blitox 50) at 2g/litre. Ensure proper spacing for airflow and avoid overhead irrigation. Repeat spray after 10 days.",
  },
  {
    id: 2,
    problem: "White powdery coating on leaves, plant growth stunted",
    crop: "Wheat",
    location: "Nashik, Maharashtra",
    date: "28 Jan 2026",
    status: "progress",
    urgency: "normal",
    images: [],
    expert: { name: "Dr. Sunita Rao", role: "Agronomist", initials: "SR" },
    reply: null,
  },
  {
    id: 3,
    problem: "Crop not growing well, soil looks dry even after irrigation",
    crop: "Cotton",
    location: "Amravati, Maharashtra",
    date: "03 Feb 2026",
    status: "pending",
    urgency: "normal",
    images: [],
    expert: null,
    reply: null,
  },
];

const STATUS_CONFIG = {
  pending:  { label: "Pending",     cls: "eh-status-pending",  icon: <AlertCircle size={11} /> },
  progress: { label: "In Progress", cls: "eh-status-progress", icon: <Clock size={11} /> },
  resolved: { label: "Resolved",    cls: "eh-status-resolved", icon: <CheckCircle size={11} /> },
};

export default function ExpertHelp() {
  /* Form state */
  const [problem, setProblem]   = useState("");
  const [crop, setCrop]         = useState("");
  const [location, setLocation] = useState("");
  const [urgency, setUrgency]   = useState("normal");
  const [images, setImages]     = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast]       = useState(false);

  /* List state */
  const [filter, setFilter]     = useState("all");
  const [requests, setRequests] = useState(MOCK_REQUESTS);

  const fileRef = useRef();

  const handleImageAdd = (files) => {
    const newImgs = Array.from(files).slice(0, 3 - images.length).map(f => ({
      file: f,
      preview: URL.createObjectURL(f),
    }));
    setImages(prev => [...prev, ...newImgs].slice(0, 3));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleImageAdd(e.dataTransfer.files);
  };

  const removeImage = (idx) => {
    setImages(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = () => {
    if (!problem.trim() || !crop || !location.trim()) return;
    setSubmitting(true);
    setTimeout(() => {
      const newReq = {
        id: Date.now(),
        problem: problem.trim(),
        crop,
        location,
        date: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
        status: "pending",
        urgency,
        images: images.map(i => i.preview),
        expert: null,
        reply: null,
      };
      setRequests(prev => [newReq, ...prev]);
      setProblem(""); setCrop(""); setLocation(""); setImages([]); setUrgency("normal");
      setSubmitting(false);
      setToast(true);
      setTimeout(() => setToast(false), 3000);
    }, 1000);
  };

  const filtered = filter === "all"
    ? requests
    : requests.filter(r => r.status === filter);

  const counts = {
    all: requests.length,
    pending: requests.filter(r => r.status === "pending").length,
    progress: requests.filter(r => r.status === "progress").length,
    resolved: requests.filter(r => r.status === "resolved").length,
  };

  const isFormValid = problem.trim() && crop && location.trim();

  return (
    <div className="eh-root">
      <style>{styles}</style>
      <FarmerPageHeader
        title="Expert Help"
        description="Submit crop problems and get advice from certified agricultural experts"
      />

      <div className="eh-body">

        {/* ── ASK A QUESTION ── */}
        <div className="eh-card">
          <div className="eh-card-header">
            <div className="eh-card-icon" style={{ background: "#f0fdf4" }}>
              <MessageSquare size={16} color="#16a34a" />
            </div>
            <div>
              <div className="eh-card-title">Ask an Expert</div>
              <div className="eh-card-sub">Describe your crop problem in detail for accurate diagnosis</div>
            </div>
          </div>
          <div className="eh-card-body">

            {/* Problem description */}
            <div className="eh-field">
              <label className="eh-label">
                <MessageSquare size={13} color="#16a34a" />
                Describe the Problem *
              </label>
              <textarea
                className="eh-textarea"
                placeholder="e.g. Leaves turning yellow with brown spots at edges, plant growth slowing down..."
                value={problem}
                onChange={e => setProblem(e.target.value)}
              />
            </div>

            {/* Crop + Location row */}
            <div className="eh-field-row">
              <div className="eh-field" style={{ margin: 0 }}>
                <label className="eh-label">
                  <Leaf size={13} color="#16a34a" />
                  Crop Type *
                </label>
                <div className="eh-select-wrap">
                  <select
                    className="eh-select"
                    value={crop}
                    onChange={e => setCrop(e.target.value)}
                  >
                    <option value="">Select crop...</option>
                    {CROP_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <ChevronDown size={13} color="#9ca3af" className="eh-select-arrow" />
                </div>
              </div>

              <div className="eh-field" style={{ margin: 0 }}>
                <label className="eh-label">
                  <MapPin size={13} color="#16a34a" />
                  Location *
                </label>
                <input
                  className="eh-input"
                  placeholder="e.g. Pune, Maharashtra"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                />
              </div>
            </div>

            {/* Image Upload */}
            <div className="eh-field">
              <label className="eh-label">
                <ImageIcon size={13} color="#16a34a" />
                Upload Crop Images (optional, max 3)
              </label>
              <div
                className={`eh-upload-zone${images.length >= 3 ? " drag" : ""}`}
                onClick={() => images.length < 3 && fileRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={e => e.preventDefault()}
              >
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  multiple
                  style={{ display: "none" }}
                  onChange={e => handleImageAdd(e.target.files)}
                />
                <div className="eh-upload-icon">
                  <Upload size={18} color="#16a34a" />
                </div>
                <div className="eh-upload-label">
                  {images.length >= 3 ? "Maximum images added" : "Click or drag images here"}
                </div>
                <div className="eh-upload-hint">JPG, PNG up to 5MB each · Helps experts diagnose faster</div>
              </div>

              {images.length > 0 && (
                <div className="eh-preview-grid">
                  {images.map((img, i) => (
                    <div key={i} className="eh-preview-item">
                      <img src={img.preview} alt="crop" />
                      <button className="eh-preview-remove" onClick={() => removeImage(i)}>
                        <X size={10} color="#fff" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Urgency */}
            <div className="eh-field">
              <label className="eh-label">
                <Flame size={13} color="#16a34a" />
                Urgency Level
              </label>
              <div className="eh-urgency-row">
                <button
                  className={`eh-urgency-btn normal${urgency === "normal" ? " active" : ""}`}
                  onClick={() => setUrgency("normal")}
                >
                  <CheckCircle size={14} />
                  Normal
                </button>
                <button
                  className={`eh-urgency-btn urgent${urgency === "urgent" ? " active" : ""}`}
                  onClick={() => setUrgency("urgent")}
                >
                  <AlertCircle size={14} />
                  Urgent
                </button>
              </div>
            </div>

            <button
              className="eh-submit-btn"
              onClick={handleSubmit}
              disabled={!isFormValid || submitting}
            >
              {submitting
                ? <><RefreshCw size={16} style={{ animation: "spin 1s linear infinite" }} /> Submitting...</>
                : <><Send size={15} /> Submit to Expert</>
              }
            </button>
          </div>
        </div>

        {/* ── MY REQUESTS ── */}
        <div className="eh-card">
          <div className="eh-card-header" style={{ flexWrap: "wrap", gap: 12 }}>
            <div className="eh-card-icon" style={{ background: "#fffbeb" }}>
              <Clock size={16} color="#d97706" />
            </div>
            <div style={{ flex: 1 }}>
              <div className="eh-card-title">My Requests</div>
              <div className="eh-card-sub">Track all your submitted queries and expert replies</div>
            </div>
            {/* Status summary pills */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <span style={{ fontSize: "0.72rem", fontWeight: 700, padding: "4px 10px", borderRadius: 6, background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca" }}>
                {counts.pending} Pending
              </span>
              <span style={{ fontSize: "0.72rem", fontWeight: 700, padding: "4px 10px", borderRadius: 6, background: "#fffbeb", color: "#d97706", border: "1px solid #fde68a" }}>
                {counts.progress} In Progress
              </span>
              <span style={{ fontSize: "0.72rem", fontWeight: 700, padding: "4px 10px", borderRadius: 6, background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0" }}>
                {counts.resolved} Resolved
              </span>
            </div>
          </div>

          <div className="eh-card-body">
            {/* Filter tabs */}
            <div className="eh-tabs" style={{ marginBottom: 16 }}>
              {[
                { key: "all",      label: "All",         dot: "#9ca3af" },
                { key: "pending",  label: "Pending",     dot: "#dc2626" },
                { key: "progress", label: "In Progress", dot: "#d97706" },
                { key: "resolved", label: "Resolved",    dot: "#16a34a" },
              ].map(t => (
                <button
                  key={t.key}
                  className={`eh-tab${filter === t.key ? " active" : ""}`}
                  onClick={() => setFilter(t.key)}
                >
                  <span className="eh-tab-dot" style={{ background: t.dot }} />
                  {t.label} ({counts[t.key]})
                </button>
              ))}
            </div>

            {/* Request list */}
            {filtered.length === 0 ? (
              <div className="eh-empty">
                <div className="eh-empty-icon">📋</div>
                <div className="eh-empty-text">
                  No requests found for this filter.<br />Submit your first query above.
                </div>
              </div>
            ) : (
              <div className="eh-req-list">
                {filtered.map(req => {
                  const sc = STATUS_CONFIG[req.status];
                  return (
                    <div key={req.id} className="eh-req-card">
                      {/* Request top */}
                      <div className="eh-req-top">
                        <div className="eh-req-left">
                          <div className="eh-req-problem">
                            <span className={`eh-urgency-tag ${req.urgency}`}>
                              {req.urgency === "urgent" ? "🔴 Urgent" : "🟢 Normal"}
                            </span>
                            {req.problem}
                          </div>
                          <div className="eh-req-meta">
                            <span><Leaf size={11} /> {req.crop}</span>
                            <span><MapPin size={11} /> {req.location}</span>
                            <span>📅 {req.date}</span>
                          </div>
                          {req.images?.length > 0 && (
                            <div className="eh-req-images">
                              {req.images.map((src, i) => (
                                <img key={i} src={src} alt="crop" className="eh-req-img-thumb" />
                              ))}
                            </div>
                          )}
                        </div>
                        <span className={`eh-status-badge ${sc.cls}`}>
                          {sc.icon} {sc.label}
                        </span>
                      </div>

                      {/* Expert reply section */}
                      <div className="eh-reply">
                        <div className="eh-reply-header">
                          <CheckCircle size={11} />
                          Expert Reply
                        </div>

                        {req.expert && (
                          <div className="eh-reply-expert">
                            <div className="eh-expert-avatar">{req.expert.initials}</div>
                            <div>
                              <div className="eh-expert-name">{req.expert.name}</div>
                              <div className="eh-expert-role">{req.expert.role}</div>
                            </div>
                          </div>
                        )}

                        {req.reply ? (
                          <div className="eh-reply-text">{req.reply}</div>
                        ) : (
                          <div className="eh-pending-reply">
                            {req.status === "pending"
                              ? "⏳ Waiting for expert assignment..."
                              : "💬 Expert is reviewing your query..."}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {toast && (
        <div className="eh-toast">
          <CheckCircle size={15} color="#86efac" />
          Request submitted! An expert will respond soon.
        </div>
      )}

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}