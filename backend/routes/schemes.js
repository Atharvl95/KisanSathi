const express = require("express");
const router = express.Router();

// A robust set of 30+ highly-detailed Government Schemes covering diverse categories
const schemes = [
  // ── SUBSIDY ──
  {
    id: 1,
    nameEn: "PM Kisan Samman Nidhi",
    nameHi: "पीएम किसान सम्मान निधि",
    description: "Direct income support of ₹6000/year to all landholding farmer families.",
    highlightPrefix: "₹", highlight: "6,000",
    category: "SUBSIDY",
    requiredDocs: ["Aadhaar Card", "Bank Account", "Land Records"], moreDocsCount: 0,
    link: "https://pmkisan.gov.in/",
    eligibility: { state: ["All"], landHolding: ["Marginal", "Small", "Large"], category: ["All"], gender: ["All"] }
  },
  {
    id: 2,
    nameEn: "Paramparagat Krishi Vikas Yojana (PKVY)",
    nameHi: "परंपरागत कृषि विकास योजना",
    description: "Financial assistance of ₹50,000/hectare for organic farming over 3 years.",
    highlightPrefix: "₹", highlight: "50,000/Ha",
    category: "SUBSIDY",
    requiredDocs: ["Aadhaar Card", "Land Records"], moreDocsCount: 1,
    link: "https://pgsindia-ncof.gov.in/PKVY/index.aspx",
    eligibility: { state: ["All"], landHolding: ["Marginal", "Small", "Large"], category: ["All"], gender: ["All"] }
  },
  {
    id: 3,
    nameEn: "Mission for Integrated Development of Horticulture (MIDH)",
    nameHi: "बागवानी विकास मिशन (MIDH)",
    description: "Subsidies for planting materials, greenhouses, and post-harvest management.",
    highlightPrefix: "Up to", highlight: "50% Subsidy",
    category: "SUBSIDY",
    requiredDocs: ["Aadhaar", "Land Records", "Project Report"], moreDocsCount: 0,
    link: "https://midh.gov.in/",
    eligibility: { state: ["All"], landHolding: ["Marginal", "Small", "Large"], category: ["All"], gender: ["All"] }
  },
  {
    id: 4,
    nameEn: "Pradhan Mantri Kisan Maan-Dhan Yojana (PM-KMY)",
    nameHi: "पीएम किसान मानधन योजना",
    description: "Assured monthly pension of ₹3,000 for vulnerable farmers after 60 years of age.",
    highlightPrefix: "₹", highlight: "3,000/month",
    category: "SUBSIDY",
    requiredDocs: ["Aadhaar Card", "Savings Bank Account"], moreDocsCount: 0,
    link: "https://pmkmy.gov.in/",
    eligibility: { state: ["All"], landHolding: ["Marginal", "Small"], category: ["All"], gender: ["All"] }
  },
  {
    id: 5,
    nameEn: "Sub-Mission on Seed and Planting Material (SMSP)",
    nameHi: "बीज और रोपण सामग्री उप-मिशन",
    description: "Subsidy on seed distribution and assistance for seed production.",
    highlightPrefix: "Up to", highlight: "50% Subsidy",
    category: "SUBSIDY",
    requiredDocs: ["Aadhaar", "Farmer Certificate"], moreDocsCount: 0,
    link: "https://seednet.gov.in/",
    eligibility: { state: ["All"], landHolding: ["Marginal", "Small"], category: ["All"], gender: ["All"] }
  },

  // ── INSURANCE ──
  {
    id: 6,
    nameEn: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    nameHi: "प्रधानमंत्री फसल बीमा योजना",
    description: "Comprehensive crop insurance at highly subsidized premium rates.",
    highlightPrefix: "Premium: ", highlight: "1.5%-2%",
    category: "INSURANCE",
    requiredDocs: ["Aadhaar Card", "Bank Account", "Sowing Certificate"], moreDocsCount: 1,
    link: "https://pmfby.gov.in/",
    eligibility: { state: ["All"], landHolding: ["Marginal", "Small", "Large"], category: ["All"], gender: ["All"] }
  },
  {
    id: 7,
    nameEn: "Restructured Weather Based Crop Insurance Scheme (RWBCIS)",
    nameHi: "मौसम आधारित फसल बीमा योजना",
    description: "Mitigates hardship due to financial loss against adverse weather conditions.",
    highlightPrefix: "Premium: ", highlight: "Max 5%",
    category: "INSURANCE",
    requiredDocs: ["Aadhaar Card", "Land Records"], moreDocsCount: 1,
    link: "https://pmfby.gov.in/",
    eligibility: { state: ["All"], landHolding: ["Marginal", "Small", "Large"], category: ["All"], gender: ["All"] }
  },

  // ── LOAN ──
  {
    id: 8,
    nameEn: "Kisan Credit Card (KCC)",
    nameHi: "किसान क्रेडिट कार्ड",
    description: "Easy, collateral-free credit up to ₹1.6 lakh, total limits up to ₹3 lakh.",
    highlightPrefix: "Loan up to ", highlight: "₹3.0L",
    category: "LOAN",
    requiredDocs: ["Aadhaar Card", "PAN Card", "Land Records"], moreDocsCount: 1,
    link: "https://sbi.co.in/web/agri-rural/agriculture-banking/crop-loan/kisan-credit-card",
    eligibility: { state: ["All"], landHolding: ["Marginal", "Small", "Large"], category: ["All"], gender: ["All"] }
  },
  {
    id: 9,
    nameEn: "Agriculture Infrastructure Fund (AIF)",
    nameHi: "कृषि अवसंरचना कोष",
    description: "Credit link subsidy of 3% interest subvention for post-harvest infrastructure.",
    highlightPrefix: "Loan up to ", highlight: "₹2 Crores",
    category: "LOAN",
    requiredDocs: ["Aadhaar", "DPR", "Bank Loan Sanction"], moreDocsCount: 0,
    link: "https://agriinfra.dac.gov.in/",
    eligibility: { state: ["All"], landHolding: ["Small", "Large"], category: ["All"], gender: ["All"] }
  },
  {
    id: 10,
    nameEn: "Agri-Clinics and Agri-Business Centres (ACABC)",
    nameHi: "एग्री-क्लिनिक और एग्री-बिजनेस सेंटर",
    description: "Financial support for agri-graduates to set up agri-clinics.",
    highlightPrefix: "Subsidy: ", highlight: "36-44%",
    category: "LOAN",
    requiredDocs: ["Aadhaar", "Agriculture Degree", "Project Report"], moreDocsCount: 0,
    link: "https://www.agriclinics.net/",
    eligibility: { state: ["All"], landHolding: ["All"], category: ["All"], gender: ["All"] }
  },
  {
    id: 11,
    nameEn: "Dairy Entrepreneurship Development Scheme (DEDS)",
    nameHi: "डेयरी उद्यमिता विकास योजना",
    description: "Promotes setting up of modern dairy farms with capital subsidies.",
    highlightPrefix: "Subsidy: ", highlight: "25-33%",
    category: "LOAN",
    requiredDocs: ["Aadhaar", "Bank Account", "Project Report"], moreDocsCount: 0,
    link: "https://www.nabard.org/content1.aspx?id=591&catid=23&mid=530",
    eligibility: { state: ["All"], landHolding: ["All"], category: ["All"], gender: ["All"] }
  },

  // ── IRRIGATION ──
  {
    id: 12,
    nameEn: "PM Krishi Sinchayee Yojana (PMKSY) - Micro Irrigation",
    nameHi: "पीएम कृषि सिंचाई योजना",
    description: "Heavy subsidies on installing Drip and Sprinkler irrigation systems.",
    highlightPrefix: "Subsidy: ", highlight: "55-90%",
    category: "IRRIGATION",
    requiredDocs: ["Aadhaar Card", "Land Records", "Bank Account"], moreDocsCount: 0,
    link: "https://pmksy.gov.in/",
    eligibility: { state: ["All"], landHolding: ["Marginal", "Small", "Large"], category: ["All"], gender: ["All"] }
  },
  {
    id: 13,
    nameEn: "PM-KUSUM Scheme",
    nameHi: "पीएम-कुसुम योजना",
    description: "Subsidies for setting up standalone solar pumps for irrigation.",
    highlightPrefix: "Subsidy: ", highlight: "Up to 60%",
    category: "IRRIGATION",
    requiredDocs: ["Aadhaar", "Land Records", "Bank Account"], moreDocsCount: 1,
    link: "https://pmkusum.mnre.gov.in/",
    eligibility: { state: ["All"], landHolding: ["Marginal", "Small", "Large"], category: ["All"], gender: ["All"] }
  },

  // ── EQUIPMENT ──
  {
    id: 14,
    nameEn: "Sub-Mission on Agricultural Mechanization (SMAM)",
    nameHi: "कृषि यंत्रीकरण पर उप-मिशन",
    description: "Subsidy for purchasing tractors, tillers, and large agricultural machinery.",
    highlightPrefix: "Subsidy: ", highlight: "40-80%",
    category: "EQUIPMENT",
    requiredDocs: ["Aadhaar", "Quotation", "Land Records"], moreDocsCount: 1,
    link: "https://agrimachinery.nic.in/",
    eligibility: { state: ["All"], landHolding: ["Marginal", "Small", "Large"], category: ["All"], gender: ["All"] }
  },
  {
    id: 15,
    nameEn: "Rashtriya Krishi Vikas Yojana (RKVY-RAFTAAR)",
    nameHi: "राष्ट्रीय कृषि विकास योजना",
    description: "Financial assistance for creating pre & post-harvest infrastructure.",
    highlightPrefix: "Grant: ", highlight: "Multi-level",
    category: "EQUIPMENT",
    requiredDocs: ["Aadhaar", "Business Plan", "Bank Account"], moreDocsCount: 0,
    link: "https://rkvy.nic.in/",
    eligibility: { state: ["All"], landHolding: ["Small", "Large"], category: ["All"], gender: ["All"] }
  },

  // ── TRAINING ──
  {
    id: 16,
    nameEn: "Soil Health Card Scheme",
    nameHi: "मृदा स्वास्थ्य कार्ड योजना",
    description: "Provides free soil testing and crop-specific nutrient recommendations.",
    highlightPrefix: "Fees: ", highlight: "Free",
    category: "TRAINING",
    requiredDocs: ["Aadhaar Card", "Land Location Details"], moreDocsCount: 0,
    link: "https://soilhealth.dac.gov.in/",
    eligibility: { state: ["All"], landHolding: ["Marginal", "Small", "Large"], category: ["All"], gender: ["All"] }
  },
  {
    id: 17,
    nameEn: "Deen Dayal Upadhyaya Grameen Kaushalya Yojana (DDU-GKY)",
    nameHi: "डीडीयू-जीकेवाई (ट्रेनिंग)",
    description: "Skill training for rural youth to build capacities for agricultural advancement.",
    highlightPrefix: "Training: ", highlight: "100% Free",
    category: "TRAINING",
    requiredDocs: ["Aadhaar", "BPL Card/Income Cert"], moreDocsCount: 0,
    link: "http://ddugky.gov.in/",
    eligibility: { state: ["All"], landHolding: ["All"], category: ["All"], gender: ["All"] }
  },
  {
    id: 18,
    nameEn: "Kisan Call Center (KCC) Initiative",
    nameHi: "किसान कॉल सेंटर",
    description: "Toll-free numbers for getting expert advice and training on farming issues.",
    highlightPrefix: "1800-180-", highlight: "1551",
    category: "TRAINING",
    requiredDocs: ["None"], moreDocsCount: 0,
    link: "https://mkisan.gov.in/",
    eligibility: { state: ["All"], landHolding: ["All"], category: ["All"], gender: ["All"] }
  },

  // ── MARKETING ──
  {
    id: 19,
    nameEn: "National Agriculture Market (e-NAM)",
    nameHi: "ई-नाम (e-NAM)",
    description: "Pan-India electronic trading portal to directly sell agricultural commodities.",
    highlightPrefix: "Trade: ", highlight: "Direct Online",
    category: "MARKETING",
    requiredDocs: ["Aadhaar", "Bank Details"], moreDocsCount: 0,
    link: "https://www.enam.gov.in/",
    eligibility: { state: ["All"], landHolding: ["Marginal", "Small", "Large"], category: ["All"], gender: ["All"] }
  },
  {
    id: 20,
    nameEn: "PM Annadata Aay Sanrakshan Abhiyan (PM-AASHA)",
    nameHi: "पीएम आशा योजना",
    description: "Ensures Minimum Support Price (MSP) to farmers for their produce.",
    highlightPrefix: "Guarantee: ", highlight: "MSP",
    category: "MARKETING",
    requiredDocs: ["Aadhaar", "Mandi Registration"], moreDocsCount: 0,
    link: "https://pib.gov.in/PressReleaseIframePage.aspx?PRID=1545903",
    eligibility: { state: ["All"], landHolding: ["Marginal", "Small", "Large"], category: ["All"], gender: ["All"] }
  },

  // ── SPECIFIC CATEGORY/STATE SCHEMES ──
  {
    id: 21,
    nameEn: "Mahila Kisan Sashaktikaran Pariyojana (MKSP)",
    nameHi: "महिला किसान सशक्तिकरण परियोजना",
    description: "Empowering women in agriculture by making systematic investments to enhance their participation.",
    highlightPrefix: "Support: ", highlight: "Women Self-Help",
    category: "TRAINING",
    requiredDocs: ["Aadhaar", "SHG Group Document"], moreDocsCount: 0,
    link: "https://mksp.gov.in/",
    eligibility: { state: ["All"], landHolding: ["All"], category: ["All"], gender: ["Female"] }
  },
  {
    id: 22,
    nameEn: "Mukhya Mantri Krishi Ashirwad Yojana (Jharkhand)",
    nameHi: "मुख्यमंत्री कृषि आशीर्वाद योजना",
    description: "A state scheme providing ₹5,000 per acre up to a maximum of 5 acres to farmers in Jharkhand.",
    highlightPrefix: "₹", highlight: "5,000/Acre",
    category: "SUBSIDY",
    requiredDocs: ["Aadhaar", "Bank Account", "Jharkhand Domicile"], moreDocsCount: 0,
    link: "https://mmkay.jharkhand.gov.in/",
    eligibility: { state: ["Jharkhand"], landHolding: ["Marginal", "Small"], category: ["All"], gender: ["All"] }
  },
  {
    id: 23,
    nameEn: "Rythu Bandhu Scheme (Telangana)",
    nameHi: "रायतु बंधु योजना",
    description: "Investment support scheme offering ₹5,000 per acre per season to farmers.",
    highlightPrefix: "₹", highlight: "10,000/Year",
    category: "SUBSIDY",
    requiredDocs: ["Aadhaar", "Pattadar Passbook", "Bank Account"], moreDocsCount: 0,
    link: "http://rythubandhu.telangana.gov.in/",
    eligibility: { state: ["Telangana"], landHolding: ["Marginal", "Small", "Large"], category: ["All"], gender: ["All"] }
  },
  {
    id: 24,
    nameEn: "Krushak Assistance for Livelihood and Income Augmentation (KALIA)",
    nameHi: "कालिया योजना (ओडिशा)",
    description: "Financial assistance for small and marginal farmers in Odisha.",
    highlightPrefix: "₹", highlight: "10,000/Year",
    category: "SUBSIDY",
    requiredDocs: ["Aadhaar", "Odisha Domicile"], moreDocsCount: 0,
    link: "https://kalia.odisha.gov.in/",
    eligibility: { state: ["Odisha"], landHolding: ["Marginal", "Small", "Landless"], category: ["All"], gender: ["All"] }
  },
  {
    id: 25,
    nameEn: "Bhavantar Bhugtan Yojana (Madhya Pradesh)",
    nameHi: "भावान्तर भुगतान योजना",
    description: "Compensates farmers for differences between official MSP and the market price.",
    highlightPrefix: "Guarantee: ", highlight: "MSP Deficit",
    category: "MARKETING",
    requiredDocs: ["Aadhaar", "MP Domicile", "Bank Account"], moreDocsCount: 0,
    link: "http://mpkrishi.mp.gov.in/",
    eligibility: { state: ["Madhya Pradesh"], landHolding: ["Marginal", "Small", "Large"], category: ["All"], gender: ["All"] }
  },
  {
    id: 26,
    nameEn: "National Mission for Sustainable Agriculture (NMSA)",
    nameHi: "सतत कृषि के लिए राष्ट्रीय मिशन",
    description: "Promotes location specific integrated farming systems focusing on SC/ST demographics in select regions.",
    highlightPrefix: "Subsidy: ", highlight: "Varied",
    category: "SUBSIDY",
    requiredDocs: ["Aadhaar", "Land Records", "Caste Certificate"], moreDocsCount: 1,
    link: "https://nmsa.dac.gov.in/",
    // Adding SC/ST constraint for demonstration on Eligibility Check
    eligibility: { state: ["All"], landHolding: ["Marginal", "Small"], category: ["SC/ST"], gender: ["All"] }
  },
  {
    id: 27,
    nameEn: "Scheduled Caste Sub-Plan (SCSP)",
    nameHi: "अनुसूचित जाति उप-योजना",
    description: "Special central assistance aiming directly at the economic development of SC farmers.",
    highlightPrefix: "Subsidy: ", highlight: "50-100%",
    category: "EQUIPMENT",
    requiredDocs: ["Aadhaar", "SC Certificate", "Bank Account"], moreDocsCount: 0,
    link: "https://dbtbharat.gov.in/",
    eligibility: { state: ["All"], landHolding: ["Marginal", "Small", "Large"], category: ["SC/ST"], gender: ["All"] }
  },
  {
    id: 28,
    nameEn: "YSR Rythu Bharosa (Andhra Pradesh)",
    nameHi: "वाईएसआर रायतु भरोसा",
    description: "Provides financial assistance to farmer families, including tenant farmers.",
    highlightPrefix: "₹", highlight: "13,500/Year",
    category: "SUBSIDY",
    requiredDocs: ["Aadhaar", "AP Domicile", "Bank Account"], moreDocsCount: 0,
    link: "https://ysrrythubharosa.ap.gov.in/",
    eligibility: { state: ["Andhra Pradesh"], landHolding: ["Marginal", "Small"], category: ["All"], gender: ["All"] }
  },
  {
    id: 29,
    nameEn: "Mukhya Mantri Krishi Udyog Yojana (Odisha)",
    nameHi: "मुख्यमंत्री कृषि उद्योग योजना",
    description: "Encourages setting up new agro-industries with large subsidies.",
    highlightPrefix: "Subsidy: ", highlight: "Up to ₹50L",
    category: "LOAN",
    requiredDocs: ["Aadhaar", "Project Report", "Odisha Domicile"], moreDocsCount: 0,
    link: "https://apicol.nic.in/",
    eligibility: { state: ["Odisha"], landHolding: ["All"], category: ["All"], gender: ["All"] }
  },
  {
    id: 30,
    nameEn: "Atma Nirbhar Horticulture Clean Plant Program",
    nameHi: "आत्मनिर्भर बागवानी स्वच्छ पौधा कार्यक्रम",
    description: "Aims to boost availability of disease-free planting materials for horticulture.",
    highlightPrefix: "Fund: ", highlight: "₹2,200 Cr",
    category: "EQUIPMENT",
    requiredDocs: ["Aadhaar", "Land Records"], moreDocsCount: 0,
    link: "https://midh.gov.in/",
    eligibility: { state: ["All"], landHolding: ["Small", "Large"], category: ["All"], gender: ["All"] }
  }
];

router.get("/", (req, res) => {
  res.json({
    success: true,
    data: schemes
  });
});

module.exports = router;
