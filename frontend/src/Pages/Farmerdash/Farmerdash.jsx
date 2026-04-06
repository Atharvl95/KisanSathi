import { useState } from "react";
import { NavLink, useLocation, Outlet } from "react-router-dom";
import {
  LayoutGrid,
  Sprout,
  Users,
  Bug,
  CloudSun,
  Bell,
  Settings,
  LogOut,
  X,
  FileText,
  PhoneCall,
  Bot,
} from "lucide-react";

/* ─── NAV ITEMS ─────────────────────────────────────── */
const navItems = [
  {
    title: "Overview",
    path: "/farmerdashboard",
    icon: LayoutGrid,
  },
  {
    title: "AI Assistant",
    path: "/farmerdashboard/aiassistant",
    icon: Bot,
  },
  {
    title: "Crop Recommendation",
    path: "/farmerdashboard/croprecommendation",
    icon: Sprout,
  },
  {
    title: "Expert Help",
    path: "/farmerdashboard/experthelp",
    icon: Users,
  },
  {
    title: "Expert Connect",
    path: "/farmerdashboard/expert-connect",
    icon: PhoneCall,
  },
  {
    title: "Pest Detection",
    path: "/farmerdashboard/pestdetection",
    icon: Bug,
  },
  {
    title: "Weather",
    path: "/farmerdashboard/weather",
    icon: CloudSun,
  },
  {
    title: "Notifications",
    path: "/farmerdashboard/notifications",
    icon: Bell,
  },
  {
    title: "Settings",
    path: "/farmerdashboard/settings",
    icon: Settings,
  },
  {
    title: "Govt Schemes",
    path: "/farmerdashboard/schemes",
    icon: FileText,
  },
];

/* ─── SIDEBAR ───────────────────────────────────────── */
export function FarmerSidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const location = useLocation();

  const handleLogout = () => setShowLogoutModal(true);
  const confirmLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/";
  };
  const cancelLogout = () => setShowLogoutModal(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        .ks-farmer-sidebar {
          font-family: 'DM Sans', sans-serif;
          background: linear-gradient(180deg, #0d2e1a 0%, #14532d 60%, #0f3d20 100%);
          border-right: 1px solid rgba(74,222,128,0.15);
          box-shadow: 4px 0 24px rgba(0,0,0,0.18);
        }

        .ks-farmer-logo-area {
          border-bottom: 1px solid rgba(74,222,128,0.12);
          background: rgba(0,0,0,0.18);
        }

        .ks-farmer-logo-text {
          font-family: 'Playfair Display', serif;
          background: linear-gradient(135deg, #4ade80, #86efac);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          white-space: nowrap;
          font-size: 1.15rem;
          font-weight: 800;
          letter-spacing: -0.01em;
        }

        .ks-farmer-logo-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ea580c, #fb923c);
          flex-shrink: 0;
          box-shadow: 0 0 8px rgba(234,88,12,0.6);
          animation: ks-farmer-pulse 2.5s infinite;
        }

        @keyframes ks-farmer-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.2); }
        }

        .ks-farmer-nav-item {
          display: flex;
          align-items: center;
          border-radius: 10px;
          padding: 10px 12px;
          font-size: 0.82rem;
          font-weight: 500;
          color: rgba(187,247,208,0.65);
          cursor: pointer;
          transition: all 0.18s ease;
          text-decoration: none;
          white-space: nowrap;
          border: 1px solid transparent;
          background: transparent;
          width: 100%;
          text-align: left;
        }

        .ks-farmer-nav-item:hover {
          color: #dcfce7;
          background: rgba(74,222,128,0.08);
          border-color: rgba(74,222,128,0.12);
        }

        .ks-farmer-nav-item.active {
          color: #ffffff;
          background: linear-gradient(135deg, rgba(22,163,74,0.35), rgba(74,222,128,0.15));
          border-color: rgba(74,222,128,0.3);
          box-shadow: 0 2px 12px rgba(22,163,74,0.2);
        }

        .ks-farmer-nav-item.active .ks-farmer-nav-icon {
          color: #4ade80;
        }

        .ks-farmer-nav-icon {
          flex-shrink: 0;
          width: 18px;
          height: 18px;
          transition: color 0.18s ease;
        }

        .ks-farmer-active-indicator {
          position: absolute;
          right: -1px;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 60%;
          border-radius: 2px 0 0 2px;
          background: linear-gradient(180deg, #4ade80, #16a34a);
        }

        .ks-farmer-divider {
          height: 1px;
          background: rgba(74,222,128,0.08);
          margin: 6px 8px;
        }

        .ks-farmer-logout-btn {
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

        .ks-farmer-logout-btn:hover {
          color: #fca5a5;
          background: rgba(239,68,68,0.08);
          border-color: rgba(239,68,68,0.15);
        }

        /* MODAL */
        .ks-farmer-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.55);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 16px;
        }

        .ks-farmer-modal {
          background: #ffffff;
          border-radius: 20px;
          box-shadow: 0 32px 80px rgba(0,0,0,0.24);
          max-width: 400px;
          width: 100%;
          overflow: hidden;
          border: 1px solid rgba(22,163,74,0.1);
        }

        .ks-farmer-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px;
          border-bottom: 1px solid #f3f4f6;
        }

        .ks-farmer-modal-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: #14532d;
        }

        .ks-farmer-modal-icon-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: #9ca3af;
          padding: 4px;
          border-radius: 6px;
          transition: all 0.15s;
          display: flex;
        }

        .ks-farmer-modal-icon-btn:hover { color: #6b7280; background: #f3f4f6; }

        .ks-farmer-modal-body {
          padding: 20px 24px;
          color: #6b7280;
          font-size: 0.9rem;
          line-height: 1.6;
        }

        .ks-farmer-modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          padding: 16px 24px;
          border-top: 1px solid #f3f4f6;
        }

        .ks-farmer-btn-cancel {
          padding: 8px 18px;
          border-radius: 10px;
          font-size: 0.85rem;
          font-weight: 500;
          color: #374151;
          background: #ffffff;
          border: 1px solid #d1d5db;
          cursor: pointer;
          transition: all 0.15s;
          font-family: 'DM Sans', sans-serif;
        }

        .ks-farmer-btn-cancel:hover { background: #f9fafb; }

        .ks-farmer-btn-logout {
          padding: 8px 18px;
          border-radius: 10px;
          font-size: 0.85rem;
          font-weight: 600;
          color: #ffffff;
          background: linear-gradient(135deg, #dc2626, #ef4444);
          border: none;
          cursor: pointer;
          transition: all 0.15s;
          box-shadow: 0 4px 12px rgba(220,38,38,0.28);
          font-family: 'DM Sans', sans-serif;
        }

        .ks-farmer-btn-logout:hover {
          background: linear-gradient(135deg, #b91c1c, #dc2626);
        }

        /* Scrollbar */
        .ks-farmer-nav-scroll::-webkit-scrollbar { width: 3px; }
        .ks-farmer-nav-scroll::-webkit-scrollbar-track { background: transparent; }
        .ks-farmer-nav-scroll::-webkit-scrollbar-thumb {
          background: rgba(74,222,128,0.2);
          border-radius: 4px;
        }

        /* farmer badge */
        .ks-farmer-badge {
          font-size: 0.6rem;
          font-weight: 600;
          padding: 2px 6px;
          border-radius: 4px;
          background: rgba(74,222,128,0.15);
          color: #4ade80;
          border: 1px solid rgba(74,222,128,0.3);
          margin-left: auto;
          white-space: nowrap;
        }

        /* section label */
        .ks-farmer-section-label {
          font-size: 0.62rem;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: rgba(187,247,208,0.3);
          padding: 8px 12px 4px;
          white-space: nowrap;
        }
      `}</style>

      <aside
        className="ks-farmer-sidebar"
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          zIndex: 40,
          height: "100vh",
          width: isExpanded ? 240 : 60,
          transition: "width 0.22s ease",
          display: "flex",
          flexDirection: "column",
        }}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Logo */}
        <div
          className="ks-farmer-logo-area"
          style={{
            height: 64,
            display: "flex",
            alignItems: "center",
            padding: isExpanded ? "0 16px" : "0",
            justifyContent: isExpanded ? "flex-start" : "center",
            gap: 10,
            overflow: "hidden",
          }}
        >
          <div className="ks-farmer-logo-dot" />
          {isExpanded && (
            <>
              <span className="ks-farmer-logo-text">
                Kisan
                <span style={{ WebkitTextFillColor: "#fb923c", color: "#fb923c" }}>
                  Sathi
                </span>
              </span>
              <span className="ks-farmer-badge">FARMER</span>
            </>
          )}
        </div>

        {/* Nav */}
        <nav
          className="ks-farmer-nav-scroll"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            padding: "10px 6px",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          {isExpanded && (
            <div className="ks-farmer-section-label">Menu</div>
          )}

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.path} style={{ position: "relative" }}>
                <NavLink
                  to={item.path}
                  end={item.path === "/farmerdashboard"}
                  className={({ isActive }) =>
                    `ks-farmer-nav-item${isActive ? " active" : ""}`
                  }
                  style={{
                    justifyContent: isExpanded ? "flex-start" : "center",
                    gap: isExpanded ? 10 : 0,
                  }}
                  title={!isExpanded ? item.title : undefined}
                >
                  {({ isActive }) => (
                    <>
                      <Icon className="ks-farmer-nav-icon" />
                      {isExpanded && <span>{item.title}</span>}
                      {isActive && (
                        <div className="ks-farmer-active-indicator" />
                      )}
                    </>
                  )}
                </NavLink>
              </div>
            );
          })}
        </nav>

        {/* Logout */}
        <div
          style={{
            padding: "10px 6px 16px",
            borderTop: "1px solid rgba(74,222,128,0.1)",
          }}
        >
          <button
            onClick={handleLogout}
            className="ks-farmer-logout-btn"
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
        <div className="ks-farmer-modal-overlay">
          <div className="ks-farmer-modal">
            <div className="ks-farmer-modal-header">
              <span className="ks-farmer-modal-title">Confirm Logout</span>
              <button
                className="ks-farmer-modal-icon-btn"
                onClick={cancelLogout}
              >
                <X size={18} />
              </button>
            </div>
            <div className="ks-farmer-modal-body">
              Are you sure you want to logout? You'll need to sign in again to
              access your KisanSathi farmer dashboard.
            </div>
            <div className="ks-farmer-modal-footer">
              <button className="ks-farmer-btn-cancel" onClick={cancelLogout}>
                Cancel
              </button>
              <button className="ks-farmer-btn-logout" onClick={confirmLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ─── PAGE HEADER ───────────────────────────────────── */
export function FarmerPageHeader({ title, description, action }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        borderBottom: "1px solid #e9f7ef",
        background: "#ffffff",
        padding: "16px 24px",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.25rem",
            fontWeight: 700,
            color: "#14532d",
            margin: 0,
          }}
        >
          {title}
        </h1>
        {description && (
          <p
            style={{
              marginTop: 4,
              fontSize: "0.82rem",
              color: "#6b7280",
              margin: "4px 0 0",
            }}
          >
            {description}
          </p>
        )}
      </div>
      {action && (
        <button
          onClick={action.onClick}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "8px 16px",
            borderRadius: 10,
            fontSize: "0.82rem",
            fontWeight: 600,
            color: "#ffffff",
            background: "linear-gradient(135deg, #14532d, #16a34a)",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(22,101,52,0.22)",
            transition: "all 0.15s ease",
            fontFamily: "'DM Sans', sans-serif",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow =
              "0 6px 18px rgba(22,101,52,0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow =
              "0 4px 12px rgba(22,101,52,0.22)";
          }}
        >
          {action.icon}
          {action.label}
        </button>
      )}
    </div>
  );
}

/* ─── FARMER DASHBOARD LAYOUT ───────────────────────── */
export function FarmerDashboardLayout() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f7fdf9",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <FarmerSidebar />
      <main style={{ marginLeft: 60, minHeight: "100vh" }}>
        <Outlet />
      </main>
    </div>
  );
}

export default FarmerDashboardLayout;