const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ──
app.use(cors());
app.use(express.json());

// ── Routes ──
const cropRoutes = require("./routes/cropPrediction");
app.use("/api/crop", cropRoutes);

// ── Health check ──
app.get("/", (req, res) => {
  res.json({ status: "KisanSathi backend is running 🌿" });
});

// ── Start ──
app.listen(PORT, () => {
  console.log(`✅ Express server running on http://localhost:${PORT}`);
});