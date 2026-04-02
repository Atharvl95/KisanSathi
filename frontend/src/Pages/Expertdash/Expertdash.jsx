import { useState } from "react";
import { NavLink, useLocation, Outlet } from "react-router-dom";
import {
  LayoutGrid,
  ClipboardList,
  MessageSquare,
  Bell,
  Settings,
  Clock,
  LogOut,
  X,
} from "lucide-react";

/* ─── NAV ITEMS ─────────────────────────────────────── */
const navItems = [
  { title: "Overview",           path: "/expertdashboard",                    icon: LayoutGrid     },
  { title: "Case History",       path: "/expertdashboard/casehistory",        icon: ClipboardList  },
  { title: "Pending Queries",    path: "/expertdashboard/pendingqueries",     icon: Clock          },
  { title: "Respond to Farmers", path: "/expertdashboard/respondtofarmers",  icon: MessageSquare  },
  { title: "Notification",       path: "/expertdashboard/notification",       icon: Bell           },
  { title: "Setting",            path: "/expertdashboard/setting",            icon: Settings       },
];

/* ─── SIDEBAR ───────────────────────────────────────── */
export function ExpertSidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const location = useLocation();

  const confirmLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/";
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        .ks-exp-sidebar {
          font-family: 'DM Sans', sans-serif;
          background: linear-gradient(180deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%);
          border-right: 1px solid rgba(99,179,237,0.15);
          box-shadow: 4px 0 24px rgba(0,0,0,0.2);
        }

        .ks-exp-logo-area {
          border-bottom: 1px solid rgba(99,179,237,0.12);
          background: rgba(0,0,0,0.2);
        }

        .ks-exp-logo-text {
          font-family: 'Playfair Display', serif;
          background: linear-gradient(135deg, #63b3ed, #90cdf4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          white-space: nowrap;
          font-size: 1.15rem;
          font-weight: 800;
          letter-spacing: -0.01em;
        }

        .ks-exp-logo-dot {
          width: 10px; height: 10px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ea580c, #fb923c);
          flex-shrink: 0;
          box-shadow: 0 0 8px rgba(234,88,12,0.6);
          animation: ks-exp-pulse 2.5s infinite;
        }

        @keyframes ks-exp-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.7; transform: scale(1.2); }
        }

        .ks-exp-nav-item {
          display: flex;
          align-items: center;
          border-radius: 10px;
          padding: 10px 12px;
          font-size: 0.82rem;
          font-weight: 500;
          color: rgba(190,227,248,0.65);
          cursor: pointer;
          transition: all 0.18s ease;
          text-decoration: none;
          white-space: nowrap;
          border: 1px solid transparent;
          background: transparent;
          width: 100%;
          text-align: left;
        }

        .ks-exp-nav-item:hover {
          color: #ebf8ff;
          background: rgba(99,179,237,0.08);
          border-color: rgba(99,179,237,0.12);
        }

        .ks-exp-nav-item.active {
          color: #ffffff;
          background: linear-gradient(135deg, rgba(49,130,206,0.35), rgba(99,179,237,0.15));
          border-color: rgba(99,179,237,0.3);
          box-shadow: 0 2px 12px rgba(49,130,206,0.2);
        }

        .ks-exp-nav-item.active .ks-exp-nav-icon { color: #63b3ed; }

        .ks-exp-nav-icon {
          flex-shrink: 0;
          width: 18px; height: 18px;
          transition: color 0.18s ease;
        }

        .ks-exp-active-indicator {
          position: absolute;
          right: -1px; top: 50%;
          transform: translateY(-50%);
          width: 3px; height: 60%;
          border-radius: 2px 0 0 2px;
          background: linear-gradient(180deg, #63b3ed, #3182ce);
        }

        .ks-exp-logout-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          border-radius: 10px;
          padding: 10px 12px;
          font-size: 0.82rem;
          font-weight: 600;
          color: rgba(252,165,165,0.7);
          cursor: pointer;
          transition: all 0.18s ease;
          background: transparent;
          border: 1px solid transparent;
          width: 100%;
          text-align: left;
          white-space: nowrap;
        }

        .ks-exp-logout-btn:hover {
          color: #fca5a5;
          background: rgba(239,68,68,0.08);
          border-color: rgba(239,68,68,0.15);
        }

        .ks-exp-modal-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.55);
          backdrop-filter: blur(6px);
          display: flex; align-items: center; justify-content: center;
          z-index: 9999; padding: 16px;
        }

        .ks-exp-modal {
          background: #ffffff;
          border-radius: 20px;
          box-shadow: 0 32px 80px rgba(0,0,0,0.24);
          max-width: 400px; width: 100%;
          overflow: hidden;
          border: 1px solid rgba(49,130,206,0.1);
        }

        .ks-exp-modal-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 20px 24px;
          border-bottom: 1px solid #f3f4f6;
        }

        .ks-exp-modal-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.1rem; font-weight: 700; color: #1a365d;
        }

        .ks-exp-modal-icon-btn {
          background: none; border: none; cursor: pointer;
          color: #9ca3af; padding: 4px; border-radius: 6px;
          transition: all 0.15s; display: flex;
        }

        .ks-exp-modal-icon-btn:hover { color: #6b7280; background: #f3f4f6; }

        .ks-exp-modal-body  { padding: 20px 24px; color: #6b7280; font-size: 0.9rem; line-height: 1.6; }
        .ks-exp-modal-footer {
          display: flex; justify-content: flex-end; gap: 10px;
          padding: 16px 24px; border-top: 1px solid #f3f4f6;
        }

        .ks-exp-btn-cancel {
          padding: 8px 18px; border-radius: 10px;
          font-size: 0.85rem; font-weight: 500; color: #374151;
          background: #ffffff; border: 1px solid #d1d5db;
          cursor: pointer; transition: all 0.15s; font-family: 'DM Sans', sans-serif;
        }
        .ks-exp-btn-cancel:hover { background: #f9fafb; }

        .ks-exp-btn-logout {
          padding: 8px 18px; border-radius: 10px;
          font-size: 0.85rem; font-weight: 600; color: #ffffff;
          background: linear-gradient(135deg, #dc2626, #ef4444);
          border: none; cursor: pointer; transition: all 0.15s;
          box-shadow: 0 4px 12px rgba(220,38,38,0.28);
          font-family: 'DM Sans', sans-serif;
        }
        .ks-exp-btn-logout:hover { background: linear-gradient(135deg, #b91c1c, #dc2626); }

        .ks-exp-nav-scroll::-webkit-scrollbar { width: 3px; }
        .ks-exp-nav-scroll::-webkit-scrollbar-track { background: transparent; }
        .ks-exp-nav-scroll::-webkit-scrollbar-thumb { background: rgba(99,179,237,0.2); border-radius: 4px; }

        .ks-exp-badge {
          font-size: 0.6rem; font-weight: 600;
          padding: 2px 6px; border-radius: 4px;
          background: rgba(99,179,237,0.15); color: #63b3ed;
          border: 1px solid rgba(99,179,237,0.3);
          margin-left: auto; white-space: nowrap;
        }

        .ks-exp-section-label {
          font-size: 0.62rem; letter-spacing: 1.5px;
          text-transform: uppercase;
          color: rgba(190,227,248,0.3);
          padding: 8px 12px 4px; white-space: nowrap;
        }
      `}</style>

      <aside
        className="ks-exp-sidebar"
        style={{
          position: "fixed", left: 0, top: 0, zIndex: 40,
          height: "100vh",
          width: isExpanded ? 240 : 60,
          transition: "width 0.22s ease",
          display: "flex", flexDirection: "column",
        }}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Logo */}
        <div
          className="ks-exp-logo-area"
          style={{
            height: 64, display: "flex", alignItems: "center",
            padding: isExpanded ? "0 16px" : "0",
            justifyContent: isExpanded ? "flex-start" : "center",
            gap: 10, overflow: "hidden",
          }}
        >
          <div className="ks-exp-logo-dot" />
          {isExpanded && (
            <>
              <span className="ks-exp-logo-text">
                Kisan<span style={{ WebkitTextFillColor: "#fb923c", color: "#fb923c" }}>Sathi</span>
              </span>
              <span className="ks-exp-badge">EXPERT</span>
            </>
          )}
        </div>

        {/* Nav */}
        <nav
          className="ks-exp-nav-scroll"
          style={{
            flex: 1, display: "flex", flexDirection: "column",
            gap: 2, padding: "10px 6px",
            overflowY: "auto", overflowX: "hidden",
          }}
        >
          {isExpanded && <div className="ks-exp-section-label">Menu</div>}

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.path} style={{ position: "relative" }}>
                <NavLink
                  to={item.path}
                  end={item.path === "/expertdashboard"}
                  className={({ isActive }) => `ks-exp-nav-item${isActive ? " active" : ""}`}
                  style={{ justifyContent: isExpanded ? "flex-start" : "center", gap: isExpanded ? 10 : 0 }}
                  title={!isExpanded ? item.title : undefined}
                >
                  {({ isActive }) => (
                    <>
                      <Icon className="ks-exp-nav-icon" />
                      {isExpanded && <span>{item.title}</span>}
                      {isActive && <div className="ks-exp-active-indicator" />}
                    </>
                  )}
                </NavLink>
              </div>
            );
          })}
        </nav>

        {/* Logout */}
        <div style={{ padding: "10px 6px 16px", borderTop: "1px solid rgba(99,179,237,0.1)" }}>
          <button
            onClick={() => setShowLogoutModal(true)}
            className="ks-exp-logout-btn"
            style={{ justifyContent: isExpanded ? "flex-start" : "center" }}
            title={!isExpanded ? "Logout" : undefined}
          >
            <LogOut size={18} style={{ flexShrink: 0 }} />
            {isExpanded && "Logout"}
          </button>
        </div>
      </aside>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="ks-exp-modal-overlay">
          <div className="ks-exp-modal">
            <div className="ks-exp-modal-header">
              <span className="ks-exp-modal-title">Confirm Logout</span>
              <button className="ks-exp-modal-icon-btn" onClick={() => setShowLogoutModal(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="ks-exp-modal-body">
              Are you sure you want to logout? You'll need to sign in again to access your KisanSathi expert dashboard.
            </div>
            <div className="ks-exp-modal-footer">
              <button className="ks-exp-btn-cancel" onClick={() => setShowLogoutModal(false)}>Cancel</button>
              <button className="ks-exp-btn-logout" onClick={confirmLogout}>Logout</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ─── PAGE HEADER ───────────────────────────────────── */
export function ExpertPageHeader({ title, description, action }) {
  return (
    <div style={{
      display: "flex", alignItems: "flex-start", justifyContent: "space-between",
      borderBottom: "1px solid #ebf8ff", background: "#ffffff",
      padding: "16px 24px", fontFamily: "'DM Sans', sans-serif",
    }}>
      <div>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "1.25rem", fontWeight: 700, color: "#1a365d", margin: 0,
        }}>{title}</h1>
        {description && (
          <p style={{ marginTop: 4, fontSize: "0.82rem", color: "#6b7280", margin: "4px 0 0" }}>
            {description}
          </p>
        )}
      </div>
      {action && (
        <button
          onClick={action.onClick}
          style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "8px 16px", borderRadius: 10,
            fontSize: "0.82rem", fontWeight: 600, color: "#ffffff",
            background: "linear-gradient(135deg, #1a365d, #3182ce)",
            border: "none", cursor: "pointer",
            boxShadow: "0 4px 12px rgba(49,130,206,0.22)",
            transition: "all 0.15s ease", fontFamily: "'DM Sans', sans-serif",
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
        >
          {action.icon}{action.label}
        </button>
      )}
    </div>
  );
}

/* ─── LAYOUT ────────────────────────────────────────── */
export function ExpertDashboardLayout() {
  return (
    <div style={{ minHeight: "100vh", background: "#f0f7ff", fontFamily: "'DM Sans', sans-serif" }}>
      <ExpertSidebar />
      <main style={{ marginLeft: 60, minHeight: "100vh" }}>
        <Outlet />
      </main>
    </div>
  );
}

export default ExpertDashboardLayout;