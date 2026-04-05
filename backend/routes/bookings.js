const express = require("express");
const router = express.Router();

// In-memory store (replace with DB in production)
const bookings = [];

// Generate a unique Jitsi room ID
function generateRoomId() {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let id = "KisanSathi-";
  for (let i = 0; i < 10; i++) id += chars[Math.floor(Math.random() * chars.length)];
  return id;
}

// POST /api/bookings  — Create a booking
router.post("/", (req, res) => {
  const { expertId, expertName, mode, date, timeSlot, topic, crop, description, farmerName } = req.body;

  if (!expertId || !mode || !date || !timeSlot || !topic) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  const roomId = generateRoomId();
  const meetLink = mode === "Video Call"
    ? `https://meet.jit.si/${roomId}`
    : null;

  const booking = {
    id: `booking-${Date.now()}`,
    expertId,
    expertName,
    farmerName: farmerName || "Farmer",
    mode,
    date,
    timeSlot,
    topic,
    crop: crop || "",
    description: description || "",
    roomId,
    meetLink,
    status: "confirmed",
    createdAt: new Date().toISOString()
  };

  bookings.push(booking);

  res.status(201).json({
    success: true,
    data: booking,
    message: `Booking confirmed! ${mode === "Video Call" ? "Your video call link is ready." : "Voice call details shared."}`
  });
});

// GET /api/bookings — Get all bookings
router.get("/", (req, res) => {
  res.json({ success: true, data: bookings });
});

// GET /api/bookings/:id
router.get("/:id", (req, res) => {
  const booking = bookings.find(b => b.id === req.params.id);
  if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });
  res.json({ success: true, data: booking });
});

module.exports = router;
