const express = require("express");
const router = express.Router();

const FLASK_URL = process.env.FLASK_URL || "http://127.0.0.1:5001";

// POST /api/crop/predict
router.post("/predict", async (req, res) => {
  try {
    const { N, P, K, temperature, humidity, ph, rainfall } = req.body;

    // Validate
    const fields = { N, P, K, temperature, humidity, ph, rainfall };
    for (const [key, val] of Object.entries(fields)) {
      if (val === undefined || val === null || val === "") {
        return res.status(400).json({ error: `Missing field: ${key}` });
      }
      if (isNaN(Number(val))) {
        return res.status(400).json({ error: `${key} must be a number` });
      }
    }

    // Call Flask
    const flaskRes = await fetch(`${FLASK_URL}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        N:           Number(N),
        P:           Number(P),
        K:           Number(K),
        temperature: Number(temperature),
        humidity:    Number(humidity),
        ph:          Number(ph),
        rainfall:    Number(rainfall),
      }),
    });

    const data = await flaskRes.json();

    if (!flaskRes.ok) {
      return res.status(flaskRes.status).json({ error: data.error || "ML service error" });
    }

    return res.json(data);

  } catch (err) {
    console.error("[CropPredict] Error:", err.message);
    return res.status(500).json({ error: "Failed to reach ML service. Is it running on port 5001?" });
  }
});

// GET /api/crop/health
router.get("/health", async (req, res) => {
  try {
    const flaskRes = await fetch(`${FLASK_URL}/health`);
    const data = await flaskRes.json();
    return res.json({ express: "ok", flask: data });
  } catch {
    return res.status(503).json({ express: "ok", flask: "unreachable" });
  }
});

module.exports = router;