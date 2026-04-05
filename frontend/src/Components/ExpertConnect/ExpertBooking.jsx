import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Video, Mic, ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";

const API = import.meta.env.VITE_API_URL || "http://localhost:5002";
const TOPICS = ["Crop Disease", "Irrigation Issue", "Pest Problem", "Soil Health", "Fertilizer Advice", "Market Price", "Government Schemes", "Other"];
const CROPS = ["Wheat", "Rice", "Maize", "Cotton", "Sugarcane", "Tomato", "Potato", "Onion", "Mustard", "Soybean", "Groundnut", "Barley", "Other"];

function getDates() {
  const dates = [];
  const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  for (let i = 0; i < 14; i++) {
    const d = new Date(); d.setDate(d.getDate() + i);
    dates.push({
      dayName: i === 0 ? "Today" : days[d.getDay()],
      weekDay: days[d.getDay()],
      date: d.getDate(),
      month: months[d.getMonth()],
      year: d.getFullYear(),
      iso: d.toISOString().split("T")[0],
    });
  }
  return dates;
}

function StepBar({ step }) {
  const steps = ["Schedule","Details","Confirmed"];
  return (
    <div style={{ display:"flex", alignItems:"center", gap:8, flex:1, justifyContent:"center" }}>
      {steps.map((label, i) => {
        const n = i + 1;
        const done   = step > n;
        const active = step === n;
        return (
          <div key={label} style={{ display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
              <div style={{
                width:28, height:28, borderRadius:"50%",
                display:"flex", alignItems:"center", justifyContent:"center",
                background: done || active ? "#16a34a" : "#e5e7eb",
                color: done || active ? "white" : "#9ca3af",
                fontWeight:700, fontSize:"0.82rem", flexShrink:0, transition:"all .2s"
              }}>
                {done ? <CheckCircle size={15}/> : n}
              </div>
              <span style={{ fontSize:"0.65rem", fontWeight:700, textTransform:"uppercase", letterSpacing:".06em",
                color: active ? "#16a34a" : done ? "#16a34a" : "#9ca3af" }}>
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div style={{ width:80, height:2, background: step > n ? "#16a34a" : "#e5e7eb",
                marginBottom:18, borderRadius:2, transition:"background .3s" }}/>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function ExpertBooking() {
  const { id }    = useParams();
  const navigate  = useNavigate();

  const [expert,       setExpert]       = useState(null);
  const [step,         setStep]         = useState(1);
  const [mode,         setMode]         = useState("Video Call");
  const [allDates]                      = useState(getDates);
  const [selectedDate, setSelectedDate] = useState(null);
  const [topic,        setTopic]        = useState("");
  const [crop,         setCrop]         = useState("");
  const [description,  setDescription]  = useState("");
  const [booking,      setBooking]      = useState(null);
  const [loading,      setLoading]      = useState(false);

  useEffect(() => {
    fetch(`${API}/api/experts/${id}`)
      .then(r => r.json())
      .then(d => setExpert(d.data));
  }, [id]);

  const handleBook = async () => {
    if (!topic || !selectedDate) return;
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          expertId: expert.id, expertName: expert.name,
          mode, date: selectedDate.iso,
          timeSlot: "10:00", topic, crop, description,
          farmerName: "Farmer User"
        })
      });
      const data = await res.json();
      if (data.success) { setBooking(data.data); setStep(3); }
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  if (!expert) return <div style={{ padding:80, textAlign:"center", color:"#6b7280", fontFamily:"'DM Sans',sans-serif" }}>Loading...</div>;

  return (
    <div style={{ minHeight:"100vh", background:"#f7fdf9", fontFamily:"'DM Sans',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        * { box-sizing:border-box; }
        .eb-header { background:white; padding:16px 32px; display:flex; align-items:center; gap:16px; border-bottom:1px solid #e5e7eb }
        .eb-back { background:none; border:none; cursor:pointer; color:#374151; display:flex; align-items:center; gap:6px; font-family:'DM Sans',sans-serif; font-size:0.88rem; font-weight:600; padding:6px 10px; border-radius:8px; transition:.15s }
        .eb-back:hover { background:#f3f4f6 }
        .eb-body { max-width:640px; margin:28px auto; padding:0 16px 60px; }
        .eb-expert-banner { background:white; border:1px solid #e5e7eb; border-radius:14px; padding:16px 20px; display:flex; gap:14px; align-items:center; margin-bottom:28px; box-shadow:0 2px 8px rgba(0,0,0,.04) }
        .eb-ex-avatar { width:52px; height:52px; border-radius:50%; object-fit:cover; border:2px solid #bbf7d0 }
        .eb-ex-name { font-weight:800; font-size:0.95rem; color:#1f2937; margin-bottom:2px }
        .eb-ex-role { font-size:0.8rem; color:#16a34a; font-weight:600 }
        .eb-section { font-size:0.82rem; font-weight:700; color:#374151; margin-bottom:12px }
        .eb-mode-row { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:28px }
        .eb-mode-btn { padding:18px 12px; border-radius:14px; border:2px solid #e5e7eb; background:white; cursor:pointer; display:flex; flex-direction:column; align-items:center; gap:8px; transition:.2s; font-family:'DM Sans',sans-serif }
        .eb-mode-btn.active { border-color:#16a34a; background:#f0fdf4 }
        .eb-mode-icon { width:42px; height:42px; border-radius:50%; display:flex; align-items:center; justify-content:center }
        .eb-mode-lbl { font-size:0.85rem; font-weight:700; color:#374151 }
        .eb-mode-btn.active .eb-mode-lbl { color:#14532d }
        .eb-mode-sub { font-size:0.72rem; color:#9ca3af }
        .eb-calendar { background:white; border:1px solid #e5e7eb; border-radius:14px; padding:18px; margin-bottom:24px; box-shadow:0 2px 8px rgba(0,0,0,.04) }
        .eb-cal-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; font-weight:700; color:#374151 }
        .eb-dates { display:flex; gap:8px; overflow-x:auto; padding-bottom:4px }
        .eb-dates::-webkit-scrollbar { height:3px }
        .eb-dates::-webkit-scrollbar-thumb { background:#d1d5db; border-radius:4px }
        .eb-date-cell { flex-shrink:0; width:70px; padding:10px 0; border-radius:12px; border:1.5px solid #e5e7eb; background:white; text-align:center; cursor:pointer; transition:.2s; display:flex; flex-direction:column; align-items:center; gap:2px }
        .eb-date-cell:hover { border-color:#16a34a; background:#f0fdf4 }
        .eb-date-cell.selected { border-color:#16a34a; background:#f0fdf4; box-shadow:0 2px 8px rgba(22,163,74,.15) }
        .eb-date-day { font-size:0.68rem; color:#9ca3af; margin-bottom:2px; font-weight:600 }
        .eb-date-num { font-size:1.2rem; font-weight:800; color:#1f2937; line-height:1 }
        .eb-date-cell.selected .eb-date-num { color:#14532d }
        .eb-avail-dot { width:6px; height:6px; border-radius:50%; background:#22c55e; margin-top:2px }
        .eb-select { width:100%; padding:12px 14px; border:1.5px solid #e5e7eb; border-radius:10px; font-family:'DM Sans',sans-serif; font-size:0.88rem; outline:none; margin-bottom:16px; background:white; transition:.2s }
        .eb-select:focus { border-color:#16a34a }
        .eb-textarea { width:100%; padding:12px 14px; border:1.5px solid #e5e7eb; border-radius:10px; font-family:'DM Sans',sans-serif; font-size:0.85rem; min-height:100px; resize:vertical; outline:none; background:white; transition:.2s }
        .eb-textarea:focus { border-color:#16a34a }
        .eb-info-banner { background:#eff6ff; border:1px solid #bfdbfe; border-radius:10px; padding:12px 14px; font-size:0.8rem; color:#1d4ed8; display:flex; gap:8px; align-items:center; margin-bottom:20px }
        .eb-next-btn { width:100%; padding:15px; background:linear-gradient(135deg,#14532d,#16a34a); color:white; border:none; border-radius:12px; font-size:1rem; font-weight:700; cursor:pointer; transition:.2s; font-family:'DM Sans',sans-serif; display:flex; align-items:center; justify-content:center; gap:8px }
        .eb-next-btn:hover:not(:disabled) { transform:translateY(-1px); box-shadow:0 8px 24px rgba(22,101,52,.3) }
        .eb-next-btn:disabled { opacity:.55; cursor:not-allowed; transform:none }
        .eb-confirm-card { background:white; border-radius:20px; border:1px solid #e5e7eb; overflow:hidden; box-shadow:0 8px 32px rgba(0,0,0,.08) }
        .eb-confirm-top { background:linear-gradient(135deg,#14532d,#16a34a); padding:32px; text-align:center }
        .eb-confirm-icon { width:72px; height:72px; border-radius:50%; background:rgba(255,255,255,.2); border:2px solid rgba(255,255,255,.4); display:flex; align-items:center; justify-content:center; margin:0 auto 16px; font-size:2rem }
        .eb-confirm-title { font-family:'Playfair Display',serif; font-size:1.4rem; font-weight:800; color:white; margin:0 0 8px }
        .eb-confirm-sub { font-size:0.88rem; color:rgba(255,255,255,.8) }
        .eb-confirm-body { padding:28px }
        .eb-join-btn { display:inline-flex; align-items:center; justify-content:center; gap:10px; width:100%; padding:16px; background:linear-gradient(135deg,#14532d,#16a34a); color:white; text-decoration:none; border-radius:12px; font-weight:700; font-size:1rem; cursor:pointer; border:none; font-family:'DM Sans',sans-serif; transition:.2s; margin-bottom:12px }
        .eb-join-btn:hover { transform:translateY(-1px); box-shadow:0 8px 24px rgba(22,101,52,.35) }
        .eb-booking-row { display:flex; justify-content:space-between; padding:9px 0; border-bottom:1px solid #f3f4f6; font-size:0.84rem }
        .eb-booking-row:last-child { border:none }
        @keyframes spin { to { transform:rotate(360deg); } }
      `}</style>

      {/* HEADER */}
      <div className="eb-header">
        <button className="eb-back" onClick={() => step === 1 ? navigate(`/farmerdashboard/expert-connect/${id}`) : setStep(s => s-1)}>
          <ArrowLeft size={16}/> {step === 1 ? "Back to Profile" : "Previous Step"}
        </button>
        <StepBar step={step}/>
      </div>

      <div className="eb-body">
        {/* Expert banner */}
        <div className="eb-expert-banner">
          <img src={expert.avatar} alt={expert.name} className="eb-ex-avatar"/>
          <div>
            <div className="eb-ex-name">{expert.name}</div>
            <div className="eb-ex-role">{expert.title}</div>
          </div>
          <div style={{ marginLeft:"auto", textAlign:"right" }}>
            <div style={{ fontSize:"1.1rem", fontWeight:800, color:"#16a34a" }}>
              {expert.consultationFee === 0 ? "FREE" : `₹${expert.consultationFee}`}
            </div>
            <div style={{ fontSize:"0.7rem", color:"#9ca3af" }}>30 min session</div>
          </div>
        </div>

        {/* ── STEP 1: Schedule ── */}
        {step === 1 && (
          <>
            <div className="eb-section">Select Mode</div>
            <div className="eb-mode-row">
              {[
                { key:"Video Call", icon:<Video size={22} color={mode==="Video Call"?"#16a34a":"#9ca3af"}/>, bg:mode==="Video Call"?"#dcfce7":"#f3f4f6", sub:"See face to face" },
                { key:"Voice Call", icon:<Mic   size={22} color={mode==="Voice Call"?"#16a34a":"#9ca3af"}/>, bg:mode==="Voice Call"?"#dcfce7":"#f3f4f6", sub:"Audio only" },
              ].map(m => (
                <button key={m.key} className={`eb-mode-btn${mode===m.key?" active":""}`} onClick={() => setMode(m.key)}>
                  <div className="eb-mode-icon" style={{ background:m.bg }}>{m.icon}</div>
                  <span className="eb-mode-lbl">{m.key}</span>
                  <span className="eb-mode-sub">{m.sub}</span>
                </button>
              ))}
            </div>

            <div className="eb-section">Select Date</div>
            <div className="eb-calendar">
              <div className="eb-cal-header">
                <span>Select Date</span>
                <span style={{ color:"#16a34a", fontSize:"0.82rem" }}>
                  {allDates[0]?.month} {allDates[0]?.year}
                </span>
              </div>
              <div className="eb-dates">
                {allDates.map(d => (
                  <div key={d.iso}
                    className={`eb-date-cell${selectedDate?.iso===d.iso?" selected":""}`}
                    onClick={() => setSelectedDate(d)}
                  >
                    <div className="eb-date-day">{d.dayName}</div>
                    <div className="eb-date-num">{d.date}</div>
                    <div className="eb-avail-dot"/>
                  </div>
                ))}
              </div>
            </div>

            <button className="eb-next-btn" disabled={!selectedDate} onClick={() => setStep(2)}>
              Next Step →
            </button>
          </>
        )}

        {/* ── STEP 2: Details ── */}
        {step === 2 && (
          <>
            <div className="eb-section">What do you want to discuss? *</div>
            <select className="eb-select" value={topic} onChange={e => setTopic(e.target.value)}>
              <option value="">Select topic...</option>
              {TOPICS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>

            <div className="eb-section">Which crop? (Optional)</div>
            <select className="eb-select" value={crop} onChange={e => setCrop(e.target.value)}>
              <option value="">Select crop...</option>
              {CROPS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            <div className="eb-section">Describe your problem in detail (Optional)</div>
            <textarea className="eb-textarea"
              placeholder="Describe what's happening with your crop, soil, or farm..."
              value={description}
              onChange={e => setDescription(e.target.value)}
            />

            {mode === "Video Call" && (
              <div className="eb-info-banner">
                <Video size={16} style={{ flexShrink:0 }}/>
                You can show your farm or crop live on camera during the consultation.
              </div>
            )}

            <button className="eb-next-btn" disabled={!topic || loading} onClick={handleBook}>
              {loading
                ? <><span style={{ animation:"spin 1s linear infinite", display:"flex" }}>⟳</span> Booking...</>
                : <>Review & Confirm →</>
              }
            </button>
          </>
        )}

        {/* ── STEP 3: Confirmed ── */}
        {step === 3 && booking && (
          <div className="eb-confirm-card">
            <div className="eb-confirm-top">
              <div className="eb-confirm-icon">✅</div>
              <div className="eb-confirm-title">Booking Confirmed!</div>
              <div className="eb-confirm-sub">
                Your session with <strong>{expert.name}</strong> is scheduled for{" "}
                <strong>{selectedDate?.dayName}, {selectedDate?.date} {selectedDate?.month}</strong>
              </div>
            </div>

            <div className="eb-confirm-body">
              {/* Join Call button */}
              <a
                href={`/farmerdashboard/call/${booking.roomId}`}
                className="eb-join-btn"
              >
                <Video size={20}/> Join Video Call Room
              </a>

              <p style={{ fontSize:"0.8rem", color:"#9ca3af", textAlign:"center", marginBottom:24 }}>
                You can join at your scheduled time. The room will be active 5 min before.
              </p>

              {/* Booking Details */}
              <div style={{ background:"#f9fafb", borderRadius:12, padding:"16px 18px" }}>
                <div style={{ fontSize:"0.78rem", fontWeight:700, color:"#374151", marginBottom:12 }}>📋 Session Details</div>
                {[
                  ["Expert",    booking.expertName],
                  ["Mode",      booking.mode],
                  ["Date",      booking.date],
                  ["Topic",     booking.topic],
                  ...(booking.crop ? [["Crop", booking.crop]] : []),
                  ["Fee",       expert.consultationFee === 0 ? "FREE (KVK)" : `₹${expert.consultationFee}`],
                  ["Booking ID",booking.id],
                ].map(([k,v]) => (
                  <div key={k} className="eb-booking-row">
                    <span style={{ color:"#6b7280" }}>{k}</span>
                    <span style={{ fontWeight:600, color:"#374151", fontFamily: k==="Booking ID" ? "monospace" : "inherit", fontSize: k==="Booking ID" ? "0.75rem" : "inherit" }}>{v}</span>
                  </div>
                ))}
              </div>

              {/* Tips */}
              <div style={{ background:"#fffbeb", border:"1px solid #fde68a", borderRadius:10, padding:"14px 16px", marginTop:16, marginBottom:20 }}>
                <div style={{ fontSize:"0.82rem", fontWeight:700, color:"#92400e", marginBottom:8 }}>💡 Before Your Session</div>
                {["Join 5 minutes before the scheduled time","Check your camera & mic are working","Keep your crop / farm ready to show if needed","Stable internet preferred (WiFi)"].map(t => (
                  <div key={t} style={{ fontSize:"0.78rem", color:"#92400e", display:"flex", gap:6, marginBottom:4 }}>
                    <span>→</span> {t}
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate("/farmerdashboard/expert-connect")}
                style={{ width:"100%", padding:"12px", borderRadius:10, border:"1.5px solid #e5e7eb", background:"white", color:"#374151", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontWeight:600, fontSize:"0.88rem" }}
              >
                ← Back to Expert Connect
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
