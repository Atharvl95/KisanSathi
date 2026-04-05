import { useState, useEffect } from "react";
import { Search, ArrowLeft, ExternalLink, ShieldCheck, Wallet, Droplets, BookOpen, PenTool, Store, X, CheckCircle2 } from "lucide-react";

export default function GovtSchemes() {
  const [schemes, setSchemes] = useState([]);
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // Eligibility Modal State
  const [showModal, setShowModal] = useState(false);
  const [eligibilityActive, setEligibilityActive] = useState(false);
  
  // Eligibility Form Data
  const [formData, setFormData] = useState({
    state: "Uttar Pradesh",
    landHolding: "Marginal",
    category: "General",
    gender: "Male"
  });

  const categories = ["All", "SUBSIDY", "INSURANCE", "LOAN", "IRRIGATION", "EQUIPMENT", "TRAINING", "MARKETING"];
  const indianStates = [
    "Andhra Pradesh", "Bihar", "Chhattisgarh", "Gujarat", "Haryana", "Himachal Pradesh", 
    "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Odisha", 
    "Punjab", "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh", "West Bengal"
  ];

  useEffect(() => {
    fetchSchemes();
  }, []);

  const fetchSchemes = async () => {
    try {
      setLoading(true);
      const url = import.meta.env.VITE_API_URL || "http://localhost:5002";
      const res = await fetch(`${url}/api/schemes`);
      const data = await res.json();
      if (data.success) {
        setSchemes(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch schemes:", err);
    } finally {
      setLoading(false);
    }
  };

  // --- FILTERING LOGIC ---
  const filteredSchemes = schemes.filter(scheme => {
    // 1. Sidebar/Category Match
    const matchesFilter = filter === "All" || scheme.category === filter;
    
    // 2. Search Query Match
    const matchesSearch = scheme.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          scheme.nameHi.includes(searchQuery);
    
    // 3. Eligibility Match (if active)
    let matchesEligibility = true;
    if (eligibilityActive && scheme.eligibility) {
      const e = scheme.eligibility;
      const stateMatch = e.state.includes("All") || e.state.includes(formData.state);
      const landMatch = e.landHolding.includes("All") || e.landHolding.includes(formData.landHolding);
      const catMatch = e.category.includes("All") || e.category.includes(formData.category);
      const genderMatch = e.gender.includes("All") || e.gender.includes(formData.gender);
      
      matchesEligibility = stateMatch && landMatch && catMatch && genderMatch;
    }

    return matchesFilter && matchesSearch && matchesEligibility;
  });

  const getCategoryColor = (cat) => {
    switch(cat) {
      case "SUBSIDY": return { text: "#16a34a", bg: "#dcfce7" };
      case "INSURANCE": return { text: "#2563eb", bg: "#dbeafe" };
      case "LOAN": return { text: "#9333ea", bg: "#f3e8ff" };
      case "IRRIGATION": return { text: "#0891b2", bg: "#cffafe" };
      case "EQUIPMENT": return { text: "#ea580c", bg: "#ffedd5" };
      case "TRAINING": return { text: "#ca8a04", bg: "#fef08a" };
      case "MARKETING": return { text: "#db2777", bg: "#fce7f3" };
      default: return { text: "#4b5563", bg: "#f3f4f6" };
    }
  };

  const getCategoryIcon = (cat) => {
    switch(cat) {
      case "SUBSIDY": return <span style={{ color: "#16a34a" }}>₹</span>;
      case "INSURANCE": return <ShieldCheck size={18} color="#2563eb" />;
      case "LOAN": return <Wallet size={18} color="#9333ea" />;
      case "IRRIGATION": return <Droplets size={18} color="#0891b2" />;
      case "EQUIPMENT": return <PenTool size={18} color="#ea580c" />;
      case "TRAINING": return <BookOpen size={18} color="#ca8a04" />;
      case "MARKETING": return <Store size={18} color="#db2777" />;
      default: return <span style={{ color: "#4b5563" }}>₹</span>;
    }
  };

  const handleEligibilitySubmit = () => {
    setEligibilityActive(true);
    setShowModal(false);
  };

  const clearEligibility = () => {
    setEligibilityActive(false);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#eefdf2", paddingBottom: 60 }}>
      {/* ── HEADER ── */}
      <div style={{ backgroundColor: "#ffffff", padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #e5e7eb" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button style={{ background: "none", border: "none", cursor: "pointer", color: "#374151", padding: 4 }}>
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 700, color: "#1f2937", lineHeight: 1.2 }}>सरकारी योजनाएं</h1>
            <p style={{ margin: 0, fontSize: "0.85rem", color: "#6b7280" }}>Government Schemes for Farmers</p>
          </div>
        </div>
        
        <div style={{ display: "flex", gap: 12 }}>
          {eligibilityActive && (
             <button 
               onClick={clearEligibility}
               style={{ backgroundColor: "#fee2e2", color: "#dc2626", padding: "10px 20px", borderRadius: 8, border: "1px solid #fecaca", cursor: "pointer", fontWeight: 600, fontSize: "0.9rem" }}>
               Clear Limits ✖
             </button>
          )}
          <button 
            onClick={() => setShowModal(true)}
            style={{ backgroundColor: eligibilityActive ? "#f0fdf4" : "#16a34a", color: eligibilityActive ? "#16a34a" : "white", padding: "10px 20px", borderRadius: 8, border: eligibilityActive ? "1px solid #bbf7d0" : "none", cursor: "pointer", fontWeight: 600, fontSize: "0.9rem", display: "flex", alignItems: "center", gap: 6 }}>
            {eligibilityActive ? <><CheckCircle2 size={18}/> Matched Profile Active</> : "Check Eligibility"}
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "24px auto", padding: "0 24px" }}>
        
        {/* ── ALERTS / HEADERS ── */}
        {eligibilityActive && (
          <div style={{ padding: "12px 18px", backgroundColor: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: 8, marginBottom: 16, color: "#065f46" }}>
            Showing <b>{filteredSchemes.length}</b> schemes eligible for a <b>{formData.landHolding}</b> farmer matching your profile.
          </div>
        )}

        {/* ── SEARCH & FILTER BAR ── */}
        <div className="search-filter-bar" style={{ display: "flex", gap: 16, backgroundColor: "white", padding: 12, borderRadius: 12, alignItems: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", overflowX: "auto" }}>
          <div style={{ flex: 1, minWidth: 260, display: "flex", alignItems: "center", gap: 10, padding: "8px 16px", backgroundColor: "#ffffff", borderRadius: 8, border: "1px solid #e5e7eb" }}>
            <Search size={18} color="#9ca3af" />
            <input 
              type="text" 
              placeholder="Search schemes... योजनाएं खोजें..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ border: "none", outline: "none", width: "100%", fontSize: "0.95rem", color: "#374151" }}
            />
          </div>
          
          <div style={{ display: "flex", gap: 8 }}>
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setFilter(cat)}
                style={{ 
                  backgroundColor: filter === cat ? "#16a34a" : "#f3f4f6", 
                  color: filter === cat ? "white" : "#4b5563",
                  padding: "8px 16px", 
                  borderRadius: 8, 
                  border: "none", 
                  cursor: "pointer", 
                  fontWeight: 600, 
                  fontSize: "0.85rem",
                  whiteSpace: "nowrap"
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ── SCHEMES GRID ── */}
        {loading ? (
          <div style={{ textAlign: "center", padding: 80, color: "#6b7280" }}>Loading schemes...</div>
        ) : filteredSchemes.length === 0 ? (
          <div style={{ textAlign: "center", padding: 80, color: "#6b7280" }}>
            <p style={{ fontSize: "1.2rem", color: "#374151", fontWeight: "bold" }}>No Valid Schemes Found!</p>
            <p>Try clearing your eligibility filter or selecting a different category.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: 24, marginTop: 24 }}>
            {filteredSchemes.map(scheme => {
              const colors = getCategoryColor(scheme.category);
              return (
                <div key={scheme.id} style={{ backgroundColor: "white", borderRadius: 16, padding: 24, boxShadow: "0 4px 12px rgba(0,0,0,0.03)", display: "flex", flexDirection: "column", height: "100%" }}>
                  
                  {/* Category Header */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", backgroundColor: colors.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", fontWeight: "bold" }}>
                      {getCategoryIcon(scheme.category)}
                    </div>
                    <div style={{ backgroundColor: colors.bg, color: colors.text, padding: "4px 12px", borderRadius: 20, fontSize: "0.75rem", fontWeight: 800, textTransform: "uppercase" }}>
                      {scheme.category}
                    </div>
                  </div>

                  {/* Title & Desc */}
                  <div>
                    <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 800, color: "#1f2937", lineHeight: 1.3 }}>{scheme.nameEn}</h3>
                    <p style={{ margin: "4px 0 12px", fontSize: "0.85rem", color: "#16a34a", fontWeight: 600 }}>{scheme.nameHi}</p>
                    <p style={{ margin: "0 0 16px", fontSize: "0.9rem", color: "#4b5563", lineHeight: 1.5 }}>{scheme.description}</p>
                  </div>

                  {/* Highlight */}
                  <div style={{ backgroundColor: "#f0fdf4", padding: "10px 16px", borderRadius: 8, marginBottom: 16 }}>
                    <span style={{ color: "#16a34a", fontWeight: 700, fontSize: "0.95rem" }}>
                      {scheme.highlightPrefix}<span style={{ fontWeight: 800 }}>{scheme.highlight}</span>
                    </span>
                  </div>

                  <div style={{ flex: 1 }}></div>

                  {/* Documents */}
                  <div style={{ marginBottom: 20 }}>
                    <p style={{ margin: "0 0 8px", fontSize: "0.75rem", color: "#6b7280" }}>Required Documents:</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
                      {scheme.requiredDocs.map(doc => (
                        <div key={doc} style={{ backgroundColor: "#f3f4f6", padding: "4px 10px", borderRadius: 4, fontSize: "0.75rem", color: "#4b5563", fontWeight: 500 }}>
                          {doc}
                        </div>
                      ))}
                      {scheme.moreDocsCount > 0 && (
                        <div style={{ fontSize: "0.75rem", color: "#6b7280", marginLeft: 4 }}>
                          +{scheme.moreDocsCount} more
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action */}
                  <button 
                    onClick={() => window.open(scheme.link, "_blank")}
                    style={{ 
                      width: "100%", 
                      backgroundColor: "#16a34a", 
                      color: "white", 
                      padding: "12px", 
                      borderRadius: 8, 
                      border: "none", 
                      cursor: "pointer", 
                      fontWeight: 600, 
                      fontSize: "0.95rem",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 8,
                      transition: "background 0.2s"
                    }}
                  >
                    Apply Now <ExternalLink size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── EUIGIBILITY MODAL ── */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ backgroundColor: "white", width: "100%", maxWidth: 450, borderRadius: 24, overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", borderBottom: "1px solid #f3f4f6" }}>
              <h2 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 800, color: "#14532d" }}>Check Your Eligibility</h2>
              <button onClick={() => setShowModal(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af" }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Select State */}
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#374151", marginBottom: 6 }}>Which state are you from?</label>
                <select 
                  value={formData.state} 
                  onChange={(e) => setFormData({...formData, state: e.target.value})}
                  style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #d1d5db", fontSize: "0.9rem", outline: "none" }}
                >
                  {indianStates.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {/* Land Holding */}
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#374151", marginBottom: 6 }}>What is your land holding size?</label>
                <select 
                  value={formData.landHolding} 
                  onChange={(e) => setFormData({...formData, landHolding: e.target.value})}
                  style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #d1d5db", fontSize: "0.9rem", outline: "none" }}
                >
                  <option value="Landless">Landless</option>
                  <option value="Marginal">Marginal (up to 1 hectare)</option>
                  <option value="Small">Small (1 to 2 hectares)</option>
                  <option value="Large">Large (over 2 hectares)</option>
                </select>
              </div>

              {/* Social Category */}
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#374151", marginBottom: 6 }}>Social Category</label>
                <select 
                  value={formData.category} 
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #d1d5db", fontSize: "0.9rem", outline: "none" }}
                >
                  <option value="General">General</option>
                  <option value="OBC">OBC</option>
                  <option value="SC/ST">SC/ST</option>
                </select>
              </div>

              {/* Gender */}
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#374151", marginBottom: 6 }}>Gender</label>
                <select 
                  value={formData.gender} 
                  onChange={(e) => setFormData({...formData, gender: e.target.value})}
                  style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #d1d5db", fontSize: "0.9rem", outline: "none" }}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div style={{ padding: "16px 24px", backgroundColor: "#f9fafb", display: "flex", justifyContent: "flex-end", gap: 12, borderTop: "1px solid #f3f4f6" }}>
              <button 
                onClick={() => setShowModal(false)}
                style={{ padding: "10px 16px", borderRadius: 8, border: "1px solid #d1d5db", backgroundColor: "white", color: "#4b5563", fontWeight: 600, cursor: "pointer" }}
              >
                Cancel
              </button>
              <button 
                onClick={handleEligibilitySubmit}
                style={{ padding: "10px 24px", borderRadius: 8, border: "none", backgroundColor: "#16a34a", color: "white", fontWeight: 600, cursor: "pointer", boxShadow: "0 4px 12px rgba(22, 163, 74, 0.2)" }}
              >
                Find My Schemes
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
