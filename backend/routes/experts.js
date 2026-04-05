const express = require("express");
const router = express.Router();

const experts = [
  {
    id: "exp-001",
    name: "Dr. Rajesh Kumar",
    title: "Senior Agronomist",
    avatar: "https://i.pravatar.cc/150?img=12",
    location: "Meerut, UP",
    organization: "KVK Meerut",
    isOnline: true,
    isKVKFree: true,
    rating: 4.9,
    totalReviews: 234,
    totalSessions: 1240,
    responseTime: "< 2 hrs",
    languages: ["Hindi", "English", "Punjabi"],
    experience: "15 years",
    specializations: ["Wheat", "Mustard", "Soil Health"],
    cropsCovered: ["Wheat", "Mustard", "Barley"],
    consultationFee: 0,
    about: "15 years experience in wheat and oilseed crops. Expert in modern farming techniques and soil health management.",
    achievements: [
      "Best KVK Expert Award 2023",
      "1000+ farmers helped",
      "Published 12 research papers"
    ],
    qualifications: [
      "Ph.D Agriculture, BHU Varanasi",
      "15 Years of practical experience"
    ],
    availability: {
      Mon: ["09:00", "10:00", "11:00", "14:00", "15:00"],
      Tue: ["09:00", "11:00", "14:00", "16:00"],
      Wed: ["10:00", "11:00", "15:00"],
      Thu: ["09:00", "10:00", "14:00", "15:00", "16:00"],
      Fri: ["09:00", "11:00", "13:00", "14:00"],
      Sat: ["10:00", "11:00"],
      Sun: []
    },
    reviews: [
      { author: "Suresh Yadav", rating: 5, text: "Very helpful, explained everything in simple Hindi. My wheat crop recovered completely after following his advice.", date: "Mar 2026" },
      { author: "Ramawati Devi", rating: 5, text: "Excellent doctor. Free consultation from KVK is a great initiative.", date: "Feb 2026" },
      { author: "Hanuman Singh", rating: 4, text: "Good advice but I had to wait 3 days for the appointment.", date: "Jan 2026" }
    ]
  },
  {
    id: "exp-002",
    name: "Ramesh Singh",
    title: "Organic Farming Consultant",
    avatar: "https://i.pravatar.cc/150?img=33",
    location: "Lucknow, UP",
    organization: "Kheti Vikas NGO",
    isOnline: true,
    isKVKFree: false,
    rating: 4.9,
    totalReviews: 340,
    totalSessions: 1560,
    responseTime: "< 3 hrs",
    languages: ["Hindi", "Awadhi"],
    experience: "8 years",
    specializations: ["Organic Farming", "Vegetables", "Pulses"],
    cropsCovered: ["Vegetables", "Fruits", "Pulses"],
    consultationFee: 49,
    about: "Dedicated organic farming consultant helping small farmers transition to sustainable, chemical-free agriculture.",
    achievements: [
      "Helped 500+ farmers go organic",
      "State Award for Agriculture 2022",
      "Certified by ICAR"
    ],
    qualifications: [
      "M.Sc Agriculture, NDUAT Faizabad",
      "Certified Organic Farming Trainer"
    ],
    availability: {
      Mon: ["10:00", "11:00", "14:00"],
      Tue: ["09:00", "10:00", "15:00", "16:00"],
      Wed: ["11:00", "14:00", "15:00"],
      Thu: ["10:00", "11:00", "14:00"],
      Fri: ["09:00", "10:00", "16:00"],
      Sat: ["10:00", "12:00"],
      Sun: []
    },
    reviews: [
      { author: "Geeta Patel", rating: 5, text: "He helped me completely switch to organic methods. My income increased 30%.", date: "Mar 2026" },
      { author: "Om Prakash", rating: 5, text: "Very knowledgeable and patient. Explains everything step-by-step.", date: "Feb 2026" }
    ]
  },
  {
    id: "exp-003",
    name: "Dr. Priya Sharma",
    title: "Plant Pathologist",
    avatar: "https://i.pravatar.cc/150?img=47",
    location: "Bengaluru, Karnataka",
    organization: "Private Consultant",
    isOnline: true,
    isKVKFree: false,
    rating: 4.8,
    totalReviews: 189,
    totalSessions: 890,
    responseTime: "< 1 hr",
    languages: ["Hindi", "English"],
    experience: "10 years",
    specializations: ["Plant Diseases", "Rice", "Tomato", "Onion"],
    cropsCovered: ["Rice", "Tomato", "Potato", "Onion"],
    consultationFee: 99,
    about: "Specialist in identifying and treating plant diseases across a wide variety of crops. Known for quick diagnosis.",
    achievements: [
      "Ph.D from IISc Bangalore",
      "Published 25 research papers",
      "Consultant to Government of Karnataka"
    ],
    qualifications: [
      "Ph.D Plant Pathology, IISc Bangalore",
      "B.Sc & M.Sc Agriculture"
    ],
    availability: {
      Mon: ["09:00", "10:00", "14:00", "15:00", "16:00"],
      Tue: ["09:00", "10:00", "11:00"],
      Wed: ["14:00", "15:00", "16:00"],
      Thu: ["09:00", "10:00", "15:00", "16:00"],
      Fri: ["09:00", "10:00", "11:00", "14:00"],
      Sat: [],
      Sun: []
    },
    reviews: [
      { author: "Krishnamurthy", rating: 5, text: "She identified a rare fungal infection in my paddy in just 5 minutes. Incredible expertise.", date: "Mar 2026" },
      { author: "Lakshmi Bai", rating: 5, text: "Very professional. The consultation fee is absolutely worth it.", date: "Feb 2026" }
    ]
  },
  {
    id: "exp-004",
    name: "Amarjeet Kaur",
    title: "Horticulture Specialist",
    avatar: "https://i.pravatar.cc/150?img=5",
    location: "Amritsar, Punjab",
    organization: "Punjab Agriculture University",
    isOnline: false,
    isKVKFree: true,
    rating: 4.7,
    totalReviews: 156,
    totalSessions: 680,
    responseTime: "< 4 hrs",
    languages: ["Punjabi", "Hindi"],
    experience: "12 years",
    specializations: ["Fruits", "Vegetables", "Post-Harvest"],
    cropsCovered: ["Apple", "Grapes", "Mango", "Litchi"],
    consultationFee: 0,
    about: "Expert horticulturalist providing free KVK consultations on fruit and vegetable cultivation and post-harvest management.",
    achievements: [
      "Best Horticulture Officer Award 2021",
      "Trained 2000+ farmers",
      "Developed local variety of Kinnow"
    ],
    qualifications: [
      "M.Sc Horticulture, PAU Ludhiana",
      "20-year association with KVK"
    ],
    availability: {
      Mon: ["09:00", "11:00", "14:00"],
      Tue: ["10:00", "11:00"],
      Wed: ["09:00", "14:00", "15:00"],
      Thu: ["10:00", "11:00", "15:00"],
      Fri: ["09:00", "14:00"],
      Sat: [],
      Sun: []
    },
    reviews: [
      { author: "Gurpreet Singh", rating: 5, text: "Helped me start my apple orchard from scratch. Her guidance is priceless.", date: "Jan 2026" }
    ]
  },
  {
    id: "exp-005",
    name: "Dr. Venkatesh Rao",
    title: "Soil Scientist",
    avatar: "https://i.pravatar.cc/150?img=68",
    location: "Hyderabad, Telangana",
    organization: "ICRISAT",
    isOnline: true,
    isKVKFree: false,
    rating: 4.8,
    totalReviews: 211,
    totalSessions: 1050,
    responseTime: "< 2 hrs",
    languages: ["Telugu", "Hindi", "English"],
    experience: "18 years",
    specializations: ["Soil Health", "Nutrient Management", "Cotton"],
    cropsCovered: ["Cotton", "Soybean", "Sorghum", "Groundnut"],
    consultationFee: 149,
    about: "Senior scientist at ICRISAT specializing in soil health management and sustainable crop nutrition for dryland agriculture.",
    achievements: [
      "ICRISAT Outstanding Scientist Award",
      "Published 40+ research articles",
      "Consulted for 5 state governments"
    ],
    qualifications: [
      "Ph.D Soil Science, ANGRAU",
      "Post-Doctoral Research at IRRI Philippines"
    ],
    availability: {
      Mon: ["10:00", "14:00", "15:00"],
      Tue: ["09:00", "10:00", "16:00"],
      Wed: ["10:00", "11:00", "14:00"],
      Thu: ["14:00", "15:00", "16:00"],
      Fri: ["09:00", "10:00"],
      Sat: [],
      Sun: []
    },
    reviews: [
      { author: "Narayana Reddy", rating: 5, text: "Got my soil health card explained fully. Now I know exactly what my soil needs.", date: "Mar 2026" }
    ]
  },
  {
    id: "exp-006",
    name: "Mohammad Irfan",
    title: "Irrigation & Water Management Expert",
    avatar: "https://i.pravatar.cc/150?img=57",
    location: "Jaipur, Rajasthan",
    organization: "CAZRI Jodhpur",
    isOnline: false,
    isKVKFree: true,
    rating: 4.6,
    totalReviews: 98,
    totalSessions: 420,
    responseTime: "< 6 hrs",
    languages: ["Hindi", "Rajasthani"],
    experience: "9 years",
    specializations: ["Drip Irrigation", "Rainwater Harvesting", "Arid Farming"],
    cropsCovered: ["Bajra", "Moth Bean", "Cluster Bean", "Sesame"],
    consultationFee: 0,
    about: "Water management specialist helping Rajasthan farmers maximize output with minimal water using modern irrigation techniques.",
    achievements: [
      "Implemented drip irrigation for 300 farmers",
      "CAZRI Research Achievement Award 2020",
      "Desert Farming Expert"
    ],
    qualifications: [
      "M.Tech Agricultural Engineering, CTAE Udaipur"
    ],
    availability: {
      Mon: ["10:00", "14:00"],
      Tue: ["11:00", "15:00"],
      Wed: ["10:00", "14:00"],
      Thu: ["11:00", "15:00"],
      Fri: ["10:00"],
      Sat: [],
      Sun: []
    },
    reviews: [
      { author: "Bhairu Lal", rating: 5, text: "Saved my crop during drought season thanks to his water management advice.", date: "Feb 2026" }
    ]
  }
];

// GET all experts (with optional filters)
router.get("/", (req, res) => {
  let result = [...experts];
  const { online, kvkFree, rating, search } = req.query;
  
  if (online === "true") result = result.filter(e => e.isOnline);
  if (kvkFree === "true") result = result.filter(e => e.isKVKFree);
  if (rating) result = result.filter(e => e.rating >= parseFloat(rating));
  if (search) {
    const q = search.toLowerCase();
    result = result.filter(e =>
      e.name.toLowerCase().includes(q) ||
      e.specializations.some(s => s.toLowerCase().includes(q)) ||
      e.cropsCovered.some(c => c.toLowerCase().includes(q))
    );
  }

  res.json({ success: true, data: result, total: result.length });
});

// GET single expert
router.get("/:id", (req, res) => {
  const expert = experts.find(e => e.id === req.params.id);
  if (!expert) return res.status(404).json({ success: false, message: "Expert not found" });
  res.json({ success: true, data: expert });
});

module.exports = router;
