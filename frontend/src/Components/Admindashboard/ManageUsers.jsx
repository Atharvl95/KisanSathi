import { useState } from "react";
import { PageHeader } from "../../Pages/Admindash/Admindash";
import {
  Search,
  Filter,
  Plus,
  Eye,
  Ban,
  Trash2,
  CheckCircle,
  User,
  Mail,
  MapPin,
  Phone,
  Sprout,
  ShoppingBag,
  Clock,
  X,
} from "lucide-react";

/* ─── MOCK DATA ─────────────────────────────────────── */
const USERS = [
  {
    id: 1,
    name: "Ramesh Patil",
    email: "ramesh.patil@gmail.com",
    phone: "+91 98230 12345",
    location: "Nagpur, Maharashtra",
    role: "farmer",
    status: "active",
    crops: ["Wheat", "Cotton"],
    orders: 14,
    joined: "Jan 2024",
    lastActive: "2 hrs ago",
    avatar: "RP",
    avatarBg: "#dcfce7",
    avatarColor: "#16a34a",
  },
  {
    id: 2,
    name: "Sunita Devi",
    email: "sunita.devi@gmail.com",
    phone: "+91 97110 55432",
    location: "Lucknow, Uttar Pradesh",
    role: "farmer",
    status: "active",
    crops: ["Rice", "Sugarcane"],
    orders: 8,
    joined: "Mar 2024",
    lastActive: "1 day ago",
    avatar: "SD",
    avatarBg: "#cffafe",
    avatarColor: "#0891b2",
  },
  {
    id: 3,
    name: "Arjun Singh",
    email: "arjun.singh@gmail.com",
    phone: "+91 94500 78901",
    location: "Amritsar, Punjab",
    role: "farmer",
    status: "pending",
    crops: ["Wheat"],
    orders: 0,
    joined: "Apr 2026",
    lastActive: "Just now",
    avatar: "AS",
    avatarBg: "#fef9c3",
    avatarColor: "#ca8a04",
  },
  {
    id: 4,
    name: "Kavitha Reddy",
    email: "kavitha.r@gmail.com",
    phone: "+91 99004 23456",
    location: "Hyderabad, Telangana",
    role: "buyer",
    status: "active",
    crops: [],
    orders: 42,
    joined: "Nov 2023",
    lastActive: "3 hrs ago",
    avatar: "KR",
    avatarBg: "#ede9fe",
    avatarColor: "#7c3aed",
  },
  {
    id: 5,
    name: "Mohan Lal",
    email: "mohan.lal@gmail.com",
    phone: "+91 98765 43210",
    location: "Jaipur, Rajasthan",
    role: "farmer",
    status: "blocked",
    crops: ["Soybean", "Mustard"],
    orders: 3,
    joined: "Aug 2023",
    lastActive: "1 month ago",
    avatar: "ML",
    avatarBg: "#fee2e2",
    avatarColor: "#dc2626",
  },
  {
    id: 6,
    name: "Preethi Nair",
    email: "preethi.n@gmail.com",
    phone: "+91 96321 11223",
    location: "Kochi, Kerala",
    role: "buyer",
    status: "active",
    crops: [],
    orders: 19,
    joined: "Feb 2024",
    lastActive: "5 hrs ago",
    avatar: "PN",
    avatarBg: "#ffedd5",
    avatarColor: "#ea580c",
  },
  {
    id: 7,
    name: "Vijay Kumar",
    email: "vijay.kumar@gmail.com",
    phone: "+91 93456 78234",
    location: "Chennai, Tamil Nadu",
    role: "farmer",
    status: "pending",
    crops: ["Rice"],
    orders: 0,
    joined: "Apr 2026",
    lastActive: "Just now",
    avatar: "VK",
    avatarBg: "#f0fdfa",
    avatarColor: "#0d9488",
  },
];

const STATUS_CONFIG = {
  active:  { label: "Active",  bg: "#f0fdf4", color: "#16a34a", border: "#bbf7d0" },
  pending: { label: "Pending", bg: "#fffbeb", color: "#d97706", border: "#fde68a" },
  blocked: { label: "Blocked", bg: "#fef2f2", color: "#dc2626", border: "#fecaca" },
};

const ROLE_CONFIG = {
  farmer: { label: "Farmer", bg: "#f0fdf4", color: "#16a34a" },
  buyer:  { label: "Buyer",  bg: "#eff6ff", color: "#2563eb" },
};

/* ─── ADD USER MODAL ─────────────────────────────────── */
function AddUserModal({ onClose }) {
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
            Add New User
          </h2>
          <button onClick={onClose} style={{ background: "#f3f4f6", border: "none", borderRadius: 8, padding: "4px 8px", cursor: "pointer" }}>
            <X size={16} color="#6b7280" />
          </button>
        </div>

        {[
          { label: "Full Name", placeholder: "User's full name", icon: User },
          { label: "Email", placeholder: "user@gmail.com", icon: Mail },
          { label: "Phone", placeholder: "+91 XXXXX XXXXX", icon: Phone },
          { label: "Location", placeholder: "City, State", icon: MapPin },
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

        {/* Role Select */}
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#374151", display: "block", marginBottom: 5 }}>Role</label>
          <select style={{
            width: "100%", padding: "9px 12px",
            border: "1.5px solid #e5e7eb", borderRadius: 10,
            fontSize: "0.82rem", color: "#1f2937",
            outline: "none", fontFamily: "'DM Sans', sans-serif",
            background: "#fff",
          }}>
            <option value="farmer">Farmer</option>
            <option value="buyer">Buyer</option>
          </select>
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          <button onClick={onClose} style={{ flex: 1, padding: "10px", borderRadius: 10, border: "1.5px solid #e5e7eb", background: "#fff", cursor: "pointer", fontWeight: 600, fontSize: "0.82rem", color: "#374151" }}>
            Cancel
          </button>
          <button style={{ flex: 1, padding: "10px", borderRadius: 10, border: "none", background: "linear-gradient(135deg, #14532d, #16a34a)", color: "#fff", cursor: "pointer", fontWeight: 700, fontSize: "0.82rem" }}>
            Add User
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── USER ROW ───────────────────────────────────────── */
function UserRow({ user, onStatusChange, onDelete }) {
  const s = STATUS_CONFIG[user.status];
  const r = ROLE_CONFIG[user.role];

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
            background: user.avatarBg, color: user.avatarColor,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "0.72rem", fontWeight: 800, flexShrink: 0,
          }}>
            {user.avatar}
          </div>
          <div>
            <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#111827" }}>{user.name}</div>
            <div style={{ fontSize: "0.72rem", color: "#9ca3af", display: "flex", alignItems: "center", gap: 3, marginTop: 1 }}>
              <Clock size={10} /> {user.lastActive}
            </div>
          </div>
        </div>
      </td>

      {/* Contact */}
      <td style={{ padding: "14px 12px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Mail size={11} color="#9ca3af" />
            <span style={{ fontSize: "0.75rem", color: "#6b7280" }}>{user.email}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Phone size={11} color="#9ca3af" />
            <span style={{ fontSize: "0.75rem", color: "#9ca3af" }}>{user.phone}</span>
          </div>
        </div>
      </td>

      {/* Location */}
      <td style={{ padding: "14px 12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <MapPin size={11} color="#9ca3af" />
          <span style={{ fontSize: "0.78rem", color: "#6b7280" }}>{user.location}</span>
        </div>
        <div style={{ fontSize: "0.7rem", color: "#9ca3af", marginTop: 2 }}>Joined {user.joined}</div>
      </td>

      {/* Role */}
      <td style={{ padding: "14px 12px" }}>
        <span style={{
          display: "inline-flex", alignItems: "center", gap: 4,
          padding: "3px 10px", borderRadius: 6,
          fontSize: "0.72rem", fontWeight: 700,
          background: r.bg, color: r.color,
        }}>
          {user.role === "farmer" ? <Sprout size={11} /> : <ShoppingBag size={11} />}
          {r.label}
        </span>
      </td>

      {/* Activity */}
      <td style={{ padding: "14px 12px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {user.role === "farmer" && user.crops.length > 0 && (
            <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
              {user.crops.map(c => (
                <span key={c} style={{ fontSize: "0.65rem", fontWeight: 600, background: "#f0fdf4", color: "#16a34a", padding: "2px 6px", borderRadius: 4 }}>
                  {c}
                </span>
              ))}
            </div>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <ShoppingBag size={11} color="#9ca3af" />
            <span style={{ fontSize: "0.75rem", color: "#374151", fontWeight: 600 }}>{user.orders} orders</span>
          </div>
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
          <button style={actionBtn("#eff6ff", "#2563eb")} title="View">
            <Eye size={13} /> View
          </button>

          {user.status === "pending" && (
            <button onClick={() => onStatusChange(user.id, "active")} style={actionBtn("#f0fdf4", "#16a34a")}>
              <CheckCircle size={13} /> Approve
            </button>
          )}

          {user.status === "active" && (
            <button onClick={() => onStatusChange(user.id, "blocked")} style={actionBtn("#fffbeb", "#d97706")}>
              <Ban size={13} /> Block
            </button>
          )}

          {user.status === "blocked" && (
            <button onClick={() => onStatusChange(user.id, "active")} style={actionBtn("#f0fdf4", "#16a34a")}>
              <CheckCircle size={13} /> Unblock
            </button>
          )}

          <button onClick={() => onDelete(user.id)} style={actionBtn("#fef2f2", "#dc2626")}>
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
export default function ManageUsers() {
  const [users, setUsers] = useState(USERS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);

  const filtered = users.filter(u => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.location.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || u.status === statusFilter;
    const matchRole = roleFilter === "all" || u.role === roleFilter;
    return matchSearch && matchStatus && matchRole;
  });

  const handleStatusChange = (id, newStatus) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: newStatus } : u));
  };

  const handleDelete = (id) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  const counts = {
    all: users.length,
    active: users.filter(u => u.status === "active").length,
    pending: users.filter(u => u.status === "pending").length,
    blocked: users.filter(u => u.status === "blocked").length,
    farmers: users.filter(u => u.role === "farmer").length,
    buyers: users.filter(u => u.role === "buyer").length,
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@300;400;500;600;700;800&display=swap');
        @keyframes slideUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .mu-filter-btn { border: 1.5px solid #e5e7eb; background: #fff; border-radius: 8px; padding: 6px 14px; font-size: 0.78rem; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.15s; color: #6b7280; }
        .mu-filter-btn.active { background: #f0fdf4; border-color: #16a34a; color: #16a34a; }
        .mu-filter-btn:hover { border-color: #16a34a; color: #16a34a; }
        table { border-collapse: collapse; width: 100%; }
        th { text-align: left; }
      `}</style>

      <PageHeader
        title="Manage Users"
        description="View, approve and manage all farmers and buyers on KisanSathi."
        action={{ label: "+ Add User", onClick: () => setShowModal(true) }}
      />

      <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 18 }}>

        {/* SUMMARY CARDS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 12 }}>
          {[
            { label: "Total Users",  val: counts.all,     color: "#14532d", border: "#bbf7d0" },
            { label: "Active",       val: counts.active,  color: "#16a34a", border: "#bbf7d0" },
            { label: "Pending",      val: counts.pending, color: "#d97706", border: "#fde68a" },
            { label: "Blocked",      val: counts.blocked, color: "#dc2626", border: "#fecaca" },
            { label: "Farmers",      val: counts.farmers, color: "#16a34a", border: "#bbf7d0" },
            { label: "Buyers",       val: counts.buyers,  color: "#2563eb", border: "#bfdbfe" },
          ].map(({ label, val, color, border }) => (
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

        {/* SEARCH + FILTERS */}
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

          {/* Status filter */}
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <Filter size={13} color="#9ca3af" />
            {["all", "active", "pending", "blocked"].map(f => (
              <button
                key={f}
                className={`mu-filter-btn${statusFilter === f ? " active" : ""}`}
                onClick={() => setStatusFilter(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
                <span style={{ marginLeft: 5, background: statusFilter === f ? "#dcfce7" : "#f3f4f6", color: statusFilter === f ? "#16a34a" : "#9ca3af", borderRadius: 4, padding: "0 5px", fontSize: "0.68rem", fontWeight: 700 }}>
                  {counts[f]}
                </span>
              </button>
            ))}
          </div>

          {/* Role filter */}
          <div style={{ display: "flex", gap: 6 }}>
            {["all", "farmer", "buyer"].map(r => (
              <button
                key={r}
                className={`mu-filter-btn${roleFilter === r ? " active" : ""}`}
                onClick={() => setRoleFilter(r)}
              >
                {r === "all" ? "All Roles" : r.charAt(0).toUpperCase() + r.slice(1) + "s"}
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
                {["User", "Contact", "Location", "Role", "Activity", "Status", "Actions"].map(h => (
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
                  <td colSpan={7} style={{ textAlign: "center", padding: "40px", color: "#9ca3af", fontSize: "0.85rem" }}>
                    No users found matching your search.
                  </td>
                </tr>
              ) : (
                filtered.map(user => (
                  <UserRow
                    key={user.id}
                    user={user}
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
              Showing {filtered.length} of {users.length} users
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

      {showModal && <AddUserModal onClose={() => setShowModal(false)} />}
    </div>
  );
}