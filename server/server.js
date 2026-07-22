import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import jwt from "jsonwebtoken";
import { initialVenueData, initialCameraFeeds, initialWhatsAppAlerts, simulationScenarios, delhiLandmarks } from "./data/mockData.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

const JWT_SECRET = "crowdshield-super-secret-key-2026";

// Live state in memory
let liveState = JSON.parse(JSON.stringify(initialVenueData));
let liveCameraFeeds = JSON.parse(JSON.stringify(initialCameraFeeds));
let liveWhatsAppAlerts = JSON.parse(JSON.stringify(initialWhatsAppAlerts));
let currentSimulationMode = null; // null or { caseId, stepIndex }

// Live dispatched vehicle positions (for map animations)
let activeMovingVehicles = [
  { id: "p1", type: "police", label: "Police Unit 01", lat: 28.6310, lng: 77.2415, targetLat: 28.6385, targetLng: 77.2432, moving: false },
  { id: "h1", type: "ambulance", label: "Ambulance 01 (LNJP)", lat: 28.6355, lng: 77.2405, targetLat: 28.6377, targetLng: 77.2432, moving: false }
];

// Helper to calculate AI Risk Score Level
// 0-30: SAFE, 31-60: WARNING, 61-80: HIGH, 81-100: CRITICAL
export function calculateRiskScoreLevel(gates, cameraFeeds, weather) {
  let maxDensity = Math.max(...cameraFeeds.map(c => c.density));
  let densityScore = Math.min(100, (maxDensity / 6.0) * 100);
  let abnormalCount = cameraFeeds.filter(c => c.abnormalMotion || c.runningDetected || c.fallingDetected).length;
  let weatherScore = weather.condition.includes("Rain") ? 75 : 10;
  let criticalGates = gates.filter(g => g.status === "Critical" || g.status === "Closed" || g.current > 900).length;

  let totalScore = (0.40 * densityScore) + (0.20 * 20) + (0.15 * abnormalCount * 30) + (0.10 * weatherScore) + (0.10 * criticalGates * 40) + 5;
  let finalScore = Math.min(99, Math.max(12, Math.round(totalScore)));

  let badge = "SAFE";
  let color = "#00C853";
  if (finalScore > 80) { badge = "CRITICAL"; color = "#FF3B30"; }
  else if (finalScore > 60) { badge = "HIGH"; color = "#F97316"; }
  else if (finalScore > 30) { badge = "WARNING"; color = "#FFC107"; }

  return {
    score: finalScore,
    badge,
    color,
    reasons: criticalGates > 0 ? ["Gate Bottleneck Detected", "Rain Surge"] : ["Baseline flow uniform", "Normal speeds"]
  };
}

// REST API Endpoints

// 1. Auth Endpoint for 6 Roles
app.post("/api/auth/login", (req, res) => {
  const { role, username } = req.body;
  if (!role) return res.status(400).json({ error: "Role is required" });

  const roleTitles = {
    super_admin: "Super Admin",
    control_room: "Control Room Lead",
    police: "Police Commander",
    hospital: "Hospital Chief Doctor",
    traffic: "Traffic Operations Officer",
    drone: "Drone Mission Pilot"
  };

  const token = jwt.sign({ role, username: username || role }, JWT_SECRET, { expiresIn: "12h" });
  return res.json({
    success: true,
    token,
    user: {
      role,
      name: roleTitles[role] || "Command Officer",
      badgeId: `DELHI-CS-${Math.floor(1000 + Math.random() * 9000)}`
    }
  });
});

// 2. Get Telemetry Endpoint
app.get("/api/telemetry", (req, res) => {
  const riskInfo = calculateRiskScoreLevel(liveState.gates, liveCameraFeeds, liveState.weather);
  res.json({
    venue: liveState,
    landmarks: delhiLandmarks,
    cameraFeeds: liveCameraFeeds,
    risk: riskInfo,
    alerts: liveWhatsAppAlerts.slice(-15),
    vehicles: activeMovingVehicles,
    simulationMode: currentSimulationMode
  });
});

// 3. Scenario Simulation Trigger Endpoint
app.post("/api/simulations/step", (req, res) => {
  const { caseId, stepIndex } = req.body;
  const scenario = simulationScenarios[caseId];

  if (!scenario || stepIndex === undefined || stepIndex < 0 || stepIndex >= scenario.steps.length) {
    return res.status(400).json({ error: "Invalid simulation parameter" });
  }

  const stepData = scenario.steps[stepIndex];
  currentSimulationMode = { caseId, stepIndex, stepData };

  if (stepData.gate1Count !== undefined) liveState.gates[0].current = stepData.gate1Count;
  if (stepData.weatherCondition !== undefined) liveState.weather.condition = stepData.weatherCondition;

  // Add WhatsApp alert
  liveWhatsAppAlerts.unshift({
    id: Date.now(),
    type: stepData.riskScore > 80 ? "emergency" : "sim",
    icon: stepData.riskScore > 80 ? "🚨" : "ℹ️",
    title: stepData.title,
    text: stepData.eventMessage,
    time: "Just now"
  });

  io.emit("telemetry_update", {
    venue: liveState,
    landmarks: delhiLandmarks,
    cameraFeeds: liveCameraFeeds,
    risk: {
      score: stepData.riskScore,
      badge: stepData.riskBadge,
      color: stepData.riskColor,
      reasons: [stepData.description]
    },
    alerts: liveWhatsAppAlerts.slice(-15),
    vehicles: activeMovingVehicles,
    simulationMode: currentSimulationMode
  });

  return res.json({ success: true, stepData });
});

// 4. Reset Simulation
app.post("/api/simulations/reset", (req, res) => {
  currentSimulationMode = null;
  liveState = JSON.parse(JSON.stringify(initialVenueData));
  liveCameraFeeds = JSON.parse(JSON.stringify(initialCameraFeeds));
  activeMovingVehicles.forEach(v => { v.moving = false; });

  io.emit("telemetry_update", {
    venue: liveState,
    landmarks: delhiLandmarks,
    cameraFeeds: liveCameraFeeds,
    risk: calculateRiskScoreLevel(liveState.gates, liveCameraFeeds, liveState.weather),
    alerts: liveWhatsAppAlerts.slice(-15),
    vehicles: activeMovingVehicles,
    simulationMode: null
  });

  res.json({ success: true });
});

// 5. Emergency Actions Dispatch (Police, Ambulance, Green Corridor, AI Approve)
app.post("/api/emergency/dispatch", (req, res) => {
  const { service, target } = req.body;
  const now = "Just now";

  if (service === "green_corridor") {
    liveState.emergencyServices.trafficCorridor.greenCorridorActive = true;
    liveState.emergencyServices.trafficCorridor.status = "Active Green Corridor";
    liveWhatsAppAlerts.unshift({
      id: Date.now(),
      type: "traffic",
      icon: "🚦",
      title: "Green Corridor Activated",
      text: "Traffic signals synchronized for LNJP Hospital route.",
      time: now
    });
  } else if (service === "police") {
    const pVehicle = activeMovingVehicles.find(v => v.type === "police");
    if (pVehicle) pVehicle.moving = true;
    liveState.emergencyServices.policeNearby += 12;
    liveWhatsAppAlerts.unshift({
      id: Date.now(),
      type: "police",
      icon: "🚨",
      title: "Police Unit 01 Dispatched",
      text: "25 officers en route to North Gate 1.",
      time: now
    });
  } else if (service === "ambulance") {
    const aVehicle = activeMovingVehicles.find(v => v.type === "ambulance");
    if (aVehicle) aVehicle.moving = true;
    if (liveState.emergencyServices.ambulancesAvailable > 0) {
      liveState.emergencyServices.ambulancesAvailable -= 1;
    }
    liveWhatsAppAlerts.unshift({
      id: Date.now(),
      type: "ambulance",
      icon: "🚑",
      title: "Ambulance 01 Leaving Hospital",
      text: `Unit dispatched to ${target || "Gate 1 Medical Bay"}.`,
      time: now
    });
  } else if (service === "ai_approve") {
    // Execute AI recommendations
    liveState.gates[0].status = "Closed";
    liveState.gates[2].status = "Safe";
    liveState.emergencyServices.trafficCorridor.greenCorridorActive = true;
    activeMovingVehicles.forEach(v => { v.moving = true; });

    liveWhatsAppAlerts.unshift({
      id: Date.now(),
      type: "emergency",
      icon: "⚡",
      title: "AI Action Approved by Control Room",
      text: "Gate 1 closed. Gate 3 opened. Police & Ambulances dispatched.",
      time: now
    });
  }

  io.emit("telemetry_update", {
    venue: liveState,
    landmarks: delhiLandmarks,
    cameraFeeds: liveCameraFeeds,
    risk: calculateRiskScoreLevel(liveState.gates, liveCameraFeeds, liveState.weather),
    alerts: liveWhatsAppAlerts.slice(-15),
    vehicles: activeMovingVehicles,
    simulationMode: currentSimulationMode
  });

  res.json({ success: true, venue: liveState });
});

// Background Vehicle Movement & Telemetry Loop
setInterval(() => {
  // Smoothly move dispatched vehicles towards target coordinates
  activeMovingVehicles.forEach(v => {
    if (v.moving) {
      const latDiff = v.targetLat - v.lat;
      const lngDiff = v.targetLng - v.lng;

      if (Math.abs(latDiff) > 0.0001 || Math.abs(lngDiff) > 0.0001) {
        v.lat += latDiff * 0.25;
        v.lng += lngDiff * 0.25;
      }
    }
  });

  if (!currentSimulationMode) {
    liveState.gates.forEach(g => {
      const delta = Math.floor((Math.random() - 0.48) * 10);
      g.current = Math.max(100, Math.min(g.capacity, g.current + delta));
    });

    io.emit("telemetry_update", {
      venue: liveState,
      landmarks: delhiLandmarks,
      cameraFeeds: liveCameraFeeds,
      risk: calculateRiskScoreLevel(liveState.gates, liveCameraFeeds, liveState.weather),
      alerts: liveWhatsAppAlerts.slice(-15),
      vehicles: activeMovingVehicles,
      simulationMode: null
    });
  }
}, 3000);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`[CrowdShield AI Redesign] Server running on port ${PORT}`);
});
