import { useState } from "react";
import { PageHeader } from "../../Pages/Admindash/Admindash";
import {
  Search,
  Filter,
  Plus,
  Eye,
  CheckCircle,
  Ban,
  Trash2,
  Star,
  Clock,
  MessageSquare,
  ChevronDown,
  X,
  User,
  Mail,
  MapPin,
  Award,
} from "lucide-react";

/* ─── MOCK DATA ─────────────────────────────────────── */
const EXPERTS = [
  {
    id: 1,
    name: "Dr. Anjali Nair",
    email: "anjali.nair@kisansathi.in",
    location: "Kerala",
    specialization: "Agronomy",
    status: "active",
    cases: 214,
    rating: 4.9,
    responseTime: "1.2 hrs",
    avatar: "AN",
    avatarBg: "#dcfce7",
    avatarColor: "#16a34a",
    joined: "Jan 2024",
  },
  {
    id: 2,
    name: "Dr. Ramesh Sharma",
    email: "ramesh.sharma@kisansathi.in",
    location: "Maharashtra",
    specialization: "Soil Science",
    status: "active",
    cases: 120,
    rating: 4.8,
    responseTime: "0.8 hrs",
    avatar: "RS",
    avatarBg: "#cffafe",
    avatarColor: "#0891b2",
    joined: "Mar 2024",
  },
  {
    id: 3,
    name: "Dr. Priya Iyer",
    email: "priya.iyer@kisansathi.in",
    location: "Tamil Nadu",
    specialization: "Plant Pathology",
    status: "pending",
    cases: 0,
    rating: null,
    responseTime: "—",
    avatar: "PI",
    avatarBg: "#fef9c3",
    avatarColor: "#ca8a04",
    joined: "Apr 2026",
  },
  {
    id: 4,
    name: "Dr. Suresh Patil",
    email: "suresh.patil@kisansathi.in",
    location: "Karnataka",
    specialization: "Horticulture",
    status: "active",
    cases: 87,
    rating: 4.6,
    responseTime: "2.1 hrs",
    avatar: "SP",
    avatarBg: "#ede9fe",
    avatarColor: "#7c3aed",
    joined: "Feb 2024",
  },
  {
    id: 5,
    name: "Dr. Meena Verma",
    email: "meena.verma@kisansathi.in",
    location: "Uttar Pradesh",
    specialization: "Entomology",
    status: "blocked",
    cases: 34,
    rating: 3.9,
    responseTime: "5.0 hrs",
    avatar: "MV",
    avatarBg: "#fee2e2",
    avatarColor: "#dc2626",
    joined: "Jun 2023",
  },
  {
    id: 6,
    name: "Dr. Kiran Rao",
    email: "kiran.rao@kisansathi.in",
    location: "Andhra Pradesh",
    specialization: "Irrigation",
    status: "pending",
    cases: 0,
    rating: null,
    responseTime: "—",
    avatar: "KR",
    avatarBg: "#ffedd5",
    avatarColor: "#ea580c",
    joined: "Apr 2026",
  },
];

const STATUS_CONFIG = {
  active:  { label: "Active",  bg: "#f0fdf4", color: "#16a34a", border: "#bbf7d0" },
  pending: { label: "Pending", bg: "#fffbeb", color: "#d97706", border: "#fde68a" },
  blocked: { label: "Blocked", bg: "#fef2f2", color: "#dc2626", border: "#fecaca" },
};

/* ─── STAR RATING ────────────────────────────────────── */
function StarRating({ rating }) {
  if (!rating) return <span style={{ fontSize: "0.75rem", color: "#9ca3af" }}>Not rated</span>;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
      <Star size={12} fill="#f59e0b" color="#f59e0b" />
      <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#1f2937" }}>{rating}</span>
    </div>
  );
}

/* ─── ADD EXPERT MODAL ───────────────────────────────── */
function AddExpertModal({ onClose }) {
  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 50,
        background: "rgba(0,0,0,0.35)", backdropFilter: "blur(4px)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff", borderRadius: 20, padding: 28,
          width: "100%", maxWidth: 460,
          boxShadow: "0 24px 48px rgba(0,0,0,0.15)",
          fontFamily: "'DM Sans', sans-serif",
          animation: "slideUp 0.25s ease",
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 800, color: "#14532d", fontFamily: "'Playfair Display', serif" }}>
            Add New Expert
          </h2>
          <button onClick={onClose} style={{ background: "#f3f4f6", border: "none", borderRadius: 8, padding: "4px 8px", cursor: "pointer" }}>
            <X size={16} color="#6b7280" />
          </button>
        </div>
        {[
          { label: "Full Name", placeholder: "Dr. Full Name", icon: User },
          { label: "Email", placeholder: "expert@kisansathi.in", icon: Mail },
          { label: "Location", placeholder: "State, India", icon: MapPin },
          { label: "Specialization", placeholder: "e.g. Agronomy", icon: Award },
        ].map(({ label, placeholder, icon: Icon }) => (
          <div key={label} style={{ marginBottom: 14 }}>
            <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#374151", display: "block", marginBottom: 5 }}>{label}</label>
            <div style={{ position: "relative" }}>
              <Icon size={14} color="#9ca3af" style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }} />
              <input
                placeholder={placeholder}
                style={{
                  width: "100%", padding: "9px 10px 9px 32px",
                  border: "1.5px solid #e5e7eb", borderRadius: 10,
                  fontSize: "0.82rem", color: "#1f2937",
                  outline: "none", boxSizing: "border-box",
                  fontFamily: "'DM Sans', sans-serif",
                }}
                onFocus={e => e.target.style.borderColor = "#16a34a"}
                onBlur={e => e.target.style.borderColor = "#e5e7eb"}
              />
            </div>
          </div>
        ))}
        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          <button onClick={onClose} style={{ flex: 1, padding: "10px", borderRadius: 10, border: "1.5px solid #e5e7eb", background: "#fff", cursor: "pointer", fontWeight: 600, fontSize: "0.82rem", color: "#374151" }}>
            Cancel
          </button>
          <button style={{ flex: 1, padding: "10px", borderRadius: 10, border: "none", background: "linear-gradient(135deg, #14532d, #16a34a)", color: "#fff", cursor: "pointer", fontWeight: 700, fontSize: "0.82rem" }}>
            Add Expert
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── EXPERT ROW ─────────────────────────────────────── */
function ExpertRow({ expert, onStatusChange, onDelete }) {
  const s = STATUS_CONFIG[expert.status];
  return (
    <tr
      style={{ borderBottom: "1px solid #f3f4f6", transition: "background 0.15s" }}
      onMouseEnter={e => e.currentTarget.style.background = "#f9fafb"}
      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
    >
      {/* Name + Avatar */}
      <td style={{ padding: "14px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 12,
            background: expert.avatarBg, color: expert.avatarColor,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "0.72rem", fontWeight: 800, flexShrink: 0,
          }}>
            {expert.avatar}
          </div>
          <div>
            <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#111827" }}>{expert.name}</div>
            <div style={{ fontSize: "0.72rem", color: "#9ca3af" }}>{expert.specialization} · {expert.joined}</div>
          </div>
        </div>
      </td>

      {/* Email */}
      <td style={{ padding: "14px 12px" }}>
        <span style={{ fontSize: "0.78rem", color: "#6b7280" }}>{expert.email}</span>
      </td>

      {/* Location */}
      <td style={{ padding: "14px 12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <MapPin size={11} color="#9ca3af" />
          <span style={{ fontSize: "0.78rem", color: "#6b7280" }}>{expert.location}</span>
        </div>
      </td>

      {/* Stats */}
      <td style={{ padding: "14px 12px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <MessageSquare size={11} color="#9ca3af" />
            <span style={{ fontSize: "0.75rem", color: "#374151", fontWeight: 600 }}>{expert.cases} cases</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Clock size={11} color="#9ca3af" />
            <span style={{ fontSize: "0.72rem", color: "#9ca3af" }}>{expert.responseTime}</span>
          </div>
          <StarRating rating={expert.rating} />
        </div>
      </td>

      {/* Status */}
      <td style={{ padding: "14px 12px" }}>
        <span style={{
          display: "inline-flex", alignItems: "center", gap: 4,
          padding: "3px 10px", borderRadius: 6,
          fontSize: "0.72rem", fontWeight: 700,
          background: s.bg, color: s.color, border: `1px solid ${s.border}`,
        }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: s.color, display: "inline-block" }} />
          {s.label}
        </span>
      </td>

      {/* Actions */}
      <td style={{ padding: "14px 16px" }}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {/* View */}
          <button style={actionBtn("#eff6ff", "#2563eb")} title="View Profile">
            <Eye size={13} /> View
          </button>

          {/* Approve — only if pending */}
          {expert.status === "pending" && (
            <button onClick={() => onStatusChange(expert.id, "active")} style={actionBtn("#f0fdf4", "#16a34a")} title="Approve">
              <CheckCircle size={13} /> Approve
            </button>
          )}

          {/* Disable / Unblock */}
          {expert.status === "active" && (
            <button onClick={() => onStatusChange(expert.id, "blocked")} style={actionBtn("#fffbeb", "#d97706")} title="Disable">
              <Ban size={13} /> Disable
            </button>
          )}
          {expert.status === "blocked" && (
            <button onClick={() => onStatusChange(expert.id, "active")} style={actionBtn("#f0fdf4", "#16a34a")} title="Reactivate">
              <CheckCircle size={13} /> Activate
            </button>
          )}

          {/* Delete */}
          <button onClick={() => onDelete(expert.id)} style={actionBtn("#fef2f2", "#dc2626")} title="Delete">
            <Trash2 size={13} />
          </button>
        </div>
      </td>
    </tr>
  );
}

function actionBtn(bg, color) {
  return {
    display: "inline-flex", alignItems: "center", gap: 4,
    padding: "5px 10px", borderRadius: 7, border: "none",
    background: bg, color, cursor: "pointer",
    fontSize: "0.72rem", fontWeight: 700,
    fontFamily: "'DM Sans', sans-serif",
    transition: "opacity 0.15s",
  };
}

/* ─── MAIN PAGE ──────────────────────────────────────── */
export default function ManageExperts() {
  const [experts, setExperts] = useState(EXPERTS);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);

  const filtered = experts.filter(e => {
    const matchSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase()) ||
      e.location.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || e.status === filter;
    return matchSearch && matchFilter;
  });

  const handleStatusChange = (id, newStatus) => {
    setExperts(prev => prev.map(e => e.id === id ? { ...e, status: newStatus } : e));
  };

  const handleDelete = (id) => {
    setExperts(prev => prev.filter(e => e.id !== id));
  };

  const counts = {
    all: experts.length,
    active: experts.filter(e => e.status === "active").length,
    pending: experts.filter(e => e.status === "pending").length,
    blocked: experts.filter(e => e.status === "blocked").length,
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@300;400;500;600;700;800&display=swap');
        @keyframes slideUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .me-filter-btn { border: 1.5px solid #e5e7eb; background: #fff; border-radius: 8px; padding: 6px 14px; font-size: 0.78rem; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.15s; color: #6b7280; }
        .me-filter-btn.active { background: #f0fdf4; border-color: #16a34a; color: #16a34a; }
        .me-filter-btn:hover { border-color: #16a34a; color: #16a34a; }
        table { border-collapse: collapse; width: 100%; }
        th { text-align: left; }
      `}</style>

      <PageHeader
        title="Manage Experts"
        description="Approve, monitor and manage all agricultural experts on KisanSathi."
        action={{ label: "+ Add Expert", onClick: () => setShowModal(true) }}
      />

      <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 18 }}>

        {/* SUMMARY CARDS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 12 }}>
          {[
            { label: "Total Experts", val: counts.all, color: "#14532d", bg: "#f0fdf4", border: "#bbf7d0" },
            { label: "Active", val: counts.active, color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0" },
            { label: "Pending", val: counts.pending, color: "#d97706", bg: "#fffbeb", border: "#fde68a" },
            { label: "Blocked", val: counts.blocked, color: "#dc2626", bg: "#fef2f2", border: "#fecaca" },
          ].map(({ label, val, color, bg, border }) => (
            <div key={label} style={{
              background: "#fff", borderRadius: 14, padding: "14px 18px",
              border: `1.5px solid ${border}`,
              boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
            }}>
              <div style={{ fontSize: "1.6rem", fontWeight: 800, color, fontFamily: "'Playfair Display', serif" }}>{val}</div>
              <div style={{ fontSize: "0.75rem", color: "#6b7280", fontWeight: 500, marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* SEARCH + FILTER */}
        <div style={{
          background: "#fff", borderRadius: 14, padding: "14px 18px",
          border: "1.5px solid #f0fdf4", boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
          display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap",
        }}>
          {/* Search */}
          <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
            <Search size={14} color="#9ca3af" style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)" }} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, email or location..."
              style={{
                width: "100%", padding: "9px 10px 9px 34px",
                border: "1.5px solid #e5e7eb", borderRadius: 10,
                fontSize: "0.82rem", color: "#1f2937",
                outline: "none", boxSizing: "border-box",
                fontFamily: "'DM Sans', sans-serif",
              }}
              onFocus={e => e.target.style.borderColor = "#16a34a"}
              onBlur={e => e.target.style.borderColor = "#e5e7eb"}
            />
          </div>

          {/* Filter tabs */}
          <div style={{ display: "flex", gap: 6 }}>
            <Filter size={14} color="#9ca3af" style={{ alignSelf: "center" }} />
            {["all", "active", "pending", "blocked"].map(f => (
              <button
                key={f}
                className={`me-filter-btn${filter === f ? " active" : ""}`}
                onClick={() => setFilter(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
                <span style={{ marginLeft: 5, background: filter === f ? "#dcfce7" : "#f3f4f6", color: filter === f ? "#16a34a" : "#9ca3af", borderRadius: 4, padding: "0 5px", fontSize: "0.68rem", fontWeight: 700 }}>
                  {counts[f]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* TABLE */}
        <div style={{
          background: "#fff", borderRadius: 16,
          border: "1.5px solid #f0fdf4",
          boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
          overflow: "hidden",
        }}>
          <table>
            <thead>
              <tr style={{ background: "#f0fdf4", borderBottom: "1.5px solid #dcfce7" }}>
                {["Expert", "Email", "Location", "Performance", "Status", "Actions"].map(h => (
                  <th key={h} style={{
                    padding: "12px 16px", fontSize: "0.72rem",
                    fontWeight: 700, color: "#14532d",
                    letterSpacing: "0.04em", textTransform: "uppercase",
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "40px", color: "#9ca3af", fontSize: "0.85rem" }}>
                    No experts found matching your search.
                  </td>
                </tr>
              ) : (
                filtered.map(expert => (
                  <ExpertRow
                    key={expert.id}
                    expert={expert}
                    onStatusChange={handleStatusChange}
                    onDelete={handleDelete}
                  />
                ))
              )}
            </tbody>
          </table>

          {/* Footer */}
          <div style={{
            padding: "12px 18px", borderTop: "1px solid #f3f4f6",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <span style={{ fontSize: "0.75rem", color: "#9ca3af" }}>
              Showing {filtered.length} of {experts.length} experts
            </span>
            <div style={{ display: "flex", gap: 6 }}>
              {["Prev", "Next"].map(label => (
                <button key={label} style={{
                  padding: "5px 12px", borderRadius: 7,
                  border: "1.5px solid #e5e7eb", background: "#fff",
                  fontSize: "0.75rem", fontWeight: 600, color: "#374151",
                  cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                }}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showModal && <AddExpertModal onClose={() => setShowModal(false)} />}
    </div>
  );
}