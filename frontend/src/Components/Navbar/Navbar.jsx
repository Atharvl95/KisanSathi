import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Solutions", href: "/solutions" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact Us", href: "/contact" },
];

const ChevronDown = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const CartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 01-8 0" />
  </svg>
);

const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const LeafLogo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="16" fill="#16a34a" />
    <path d="M16 24C16 24 8 18 8 12C8 8.68629 10.6863 6 14 6C15.1046 6 16 6.89543 16 8V24Z" fill="#86efac" />
    <path d="M16 24C16 24 24 18 24 12C24 8.68629 21.3137 6 18 6C16.8954 6 16 6.89543 16 8V24Z" fill="white" fillOpacity="0.9" />
    <line x1="16" y1="8" x2="16" y2="25" stroke="#16a34a" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

function DropdownMenu({ items, visible }) {
  return (
    <div
      className="absolute top-full left-1/2 pt-3"
      style={{
        transform: "translateX(-50%)",
        minWidth: 240,
        pointerEvents: visible ? "auto" : "none",
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateX(-50%) translateY(0px)"
          : "translateX(-50%) translateY(-8px)",
        transition: "opacity 0.2s ease, transform 0.2s ease",
      }}
    >
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "white",
          boxShadow: "0 20px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(22,163,74,0.08)",
          border: "1px solid rgba(22,163,74,0.1)",
        }}
      >
        {/* Top accent bar */}
        <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #16a34a, #4ade80)" }} />
        <div className="py-2">
          {items.map((item, i) => (
            <a
              key={i}
              href="#"
              className="flex items-start gap-3 px-5 py-3 group transition-all duration-150"
              style={{ textDecoration: "none" }}
              onMouseEnter={e => e.currentTarget.style.background = "#f0fdf4"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              <span className="text-xl leading-none mt-0.5">{item.label.split(" ")[0]}</span>
              <div>
                <div className="text-sm font-semibold text-gray-800 group-hover:text-green-700 transition-colors">
                  {item.label.split(" ").slice(1).join(" ")}
                </div>
                <div className="text-xs text-gray-400 mt-0.5">{item.desc}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function KisansathiNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const closeTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMouseEnter = (label) => {
    clearTimeout(closeTimer.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 120);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;600&display=swap');
        .kisansathi-nav { font-family: 'DM Sans', sans-serif; }
        .kisansathi-logo-text { font-family: 'Playfair Display', serif; }
        .nav-link-underline::after {
          content: '';
          display: block;
          height: 2px;
          width: 0;
          background: linear-gradient(90deg, #16a34a, #4ade80);
          border-radius: 2px;
          transition: width 0.25s ease;
          margin-top: 2px;
        }
        .nav-link-underline:hover::after { width: 100%; }
        .hamburger-line { transition: all 0.3s ease; transform-origin: center; }
      `}</style>

      <nav
        className="kisansathi-nav fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: "white",
          boxShadow: scrolled
            ? "0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(22,163,74,0.06)"
            : "0 1px 0 rgba(0,0,0,0.06)",
        }}
      >


        {/* Main navbar */}
        <div className="flex items-center justify-between px-6 md:px-10 py-3.5">

          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 no-underline flex-shrink-0">
            <LeafLogo />
            <span
              className="kisansathi-logo-text text-2xl font-bold"
              style={{ color: "#14532d", letterSpacing: "-0.02em" }}
            >
              Kisan<span style={{ color: "#16a34a" }}>sathi</span>
            </span>
          </a>

          {/* Desktop Center Nav */}
          <ul className="hidden lg:flex items-center gap-1 list-none m-0 p-0">
            {NAV_LINKS.map((link) => (
              <li
                key={link.label}
                className="relative"
                onMouseEnter={() => link.dropdown && handleMouseEnter(link.label)}
                onMouseLeave={() => link.dropdown && handleMouseLeave()}
              >
                <Link
                  to={link.href}
                  className="nav-link-underline flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors duration-150 no-underline rounded-lg"
                  style={{
                    color: activeDropdown === link.label ? "#16a34a" : "#374151",
                  }}
                  onMouseEnter={e => { if (!link.dropdown) e.currentTarget.style.color = "#16a34a"; }}
                  onMouseLeave={e => { if (!link.dropdown) e.currentTarget.style.color = "#374151"; }}
                >
                  {link.label}
                  {link.dropdown && (
                    <span
                      style={{
                        color: "#16a34a",
                        transform: activeDropdown === link.label ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.2s ease",
                        display: "inline-flex",
                      }}
                    >
                      <ChevronDown />
                    </span>
                  )}
                </Link>
                {link.dropdown && (
                  <DropdownMenu items={link.dropdown} visible={activeDropdown === link.label} />
                )}
              </li>
            ))}
          </ul>

          {/* Right Side */}
          <div className="flex items-center gap-2 md:gap-3">


            {/* Cart */}
            <button
              className="relative flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200 hover:scale-110 active:scale-95"
              style={{
                background: "#f0fdf4",
                color: "#16a34a",
                border: "1.5px solid #bbf7d0",
                cursor: "pointer",
              }}
              title="Cart"
            >
              <CartIcon />
              <span
                className="absolute flex items-center justify-center text-white font-bold"
                style={{
                  top: -4,
                  right: -4,
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: "#ea580c",
                  fontSize: 10,
                  border: "2px solid white",
                }}
              >
                3
              </span>
            </button>

            {/* Register Now */}
            <Link
              to="/auth"
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95 no-underline"
              style={{
                background: "linear-gradient(135deg, #14532d 0%, #166534 50%, #16a34a 100%)",
                boxShadow: "0 4px 16px rgba(22,101,52,0.3)",
                letterSpacing: "0.01em",
              }}
            >
              <span>Register Now</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>

            {/* Hamburger */}
            <button
              className="flex lg:hidden items-center justify-center w-9 h-9 rounded-lg transition-colors"
              style={{
                background: mobileOpen ? "#f0fdf4" : "transparent",
                border: "1.5px solid",
                borderColor: mobileOpen ? "#86efac" : "#e5e7eb",
                cursor: "pointer",
                color: "#374151",
              }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          style={{
            maxHeight: mobileOpen ? "600px" : "0",
            overflow: "hidden",
            transition: "max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
            borderTop: mobileOpen ? "1px solid #f0fdf4" : "none",
          }}
        >
          <div className="px-6 py-4 flex flex-col gap-1" style={{ background: "#fafffe" }}>
            {NAV_LINKS.map((link) => (
              <div key={link.label}>
                {link.dropdown ? (
                  <button
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-left text-sm font-medium transition-all"
                    style={{
                      background: mobileExpanded === link.label ? "#f0fdf4" : "transparent",
                      color: mobileExpanded === link.label ? "#16a34a" : "#374151",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onClick={() => setMobileExpanded(mobileExpanded === link.label ? null : link.label)}
                  >
                    {link.label}
                    <span
                      style={{
                        color: "#16a34a",
                        transform: mobileExpanded === link.label ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.2s ease",
                        display: "inline-flex",
                      }}
                    >
                      <ChevronDown />
                    </span>
                  </button>
                ) : (
                  <Link
                    to={link.href}
                    className="flex items-center px-4 py-3 rounded-xl text-sm font-medium no-underline transition-all"
                    style={{ color: "#374151" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#f0fdf4"; e.currentTarget.style.color = "#16a34a"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#374151"; }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                )}

                {link.dropdown && (
                  <div
                    style={{
                      maxHeight: mobileExpanded === link.label ? "400px" : "0",
                      overflow: "hidden",
                      transition: "max-height 0.25s ease",
                    }}
                  >
                    <div className="pl-4 pb-2 flex flex-col gap-0.5">
                      {link.dropdown.map((item, i) => (
                        <a
                          key={i}
                          href="#"
                          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm no-underline transition-colors"
                          style={{ color: "#4b5563" }}
                          onMouseEnter={e => { e.currentTarget.style.background = "#f0fdf4"; e.currentTarget.style.color = "#16a34a"; }}
                          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#4b5563"; }}
                        >
                          <span>{item.label.split(" ")[0]}</span>
                          <div>
                            <div className="font-medium">{item.label.split(" ").slice(1).join(" ")}</div>
                            <div className="text-xs text-gray-400">{item.desc}</div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Mobile bottom actions */}
            <div className="flex items-center gap-3 mt-3 pt-3" style={{ borderTop: "1px solid #dcfce7" }}>
              <Link
                to="/auth"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold text-white no-underline"
                style={{
                  background: "linear-gradient(135deg, #14532d, #16a34a)",
                }}
                onClick={() => setMobileOpen(false)}
              >
                Register Now →
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer so page content doesn't go under navbar */}
      <div style={{ height: scrolled ? 68 : 100 }} className="transition-all duration-300" />
    </>
  );
}