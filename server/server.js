import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import jwt from "jsonwebtoken";
import { initialVenueData, initialCameraFeeds, simulationScenarios } from "./data/mockData.js";

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
let currentSimulationMode = null; // null or { caseId, stepIndex }
let eventLogHistory = [
  { time: "20:00:15", type: "system", text: "CrowdShield AI Engine initialized & connected to CCTV Network." },
  { time: "20:01:00", type: "yolo", text: "YOLO V8 Detection active across 4 perimeter cameras." },
  { time: "20:02:30", type: "info", text: "All gate flow metrics within baseline tolerance." }
];

// Helper to calculate AI Risk Score Formula
// Formula: 40% Density + 20% Speed Risk + 15% Reverse Movement + 10% Weather + 10% Gate Congestion + 5% Previous Incidents
export function calculateRiskScore(gates, cameraFeeds, weather) {
  // Max gate density
  let maxDensity = Math.max(...cameraFeeds.map(c => c.density));
  let densityScore = Math.min(100, (maxDensity / 6.0) * 100); // 6 p/m2 is emergency limit

  // Speed risk (too slow or abnormal running)
  let avgSpeed = cameraFeeds.reduce((acc, c) => acc + c.speed, 0) / cameraFeeds.length;
  let speedScore = avgSpeed < 0.6 ? 90 : (avgSpeed > 3.0 ? 80 : 20);

  // Reverse / Abnormal motion
  let abnormalCount = cameraFeeds.filter(c => c.abnormalMotion || c.runningDetected || c.fallingDetected).length;
  let reverseScore = abnormalCount * 30;

  // Weather risk
  let weatherScore = weather.condition.includes("Rain") ? 75 : 10;

  // Gate Congestion
  let criticalGates = gates.filter(g => g.status === "Critical" || g.status === "Closed" || g.current > 900).length;
  let gateScore = criticalGates * 40;

  // Past Incidents (baseline)
  let pastIncidentScore = 15;

  let totalScore = (0.40 * densityScore) +
                   (0.20 * speedScore) +
                   (0.15 * reverseScore) +
                   (0.10 * weatherScore) +
                   (0.10 * gateScore) +
                   (0.05 * pastIncidentScore);

  let finalScore = Math.min(99, Math.max(12, Math.round(totalScore)));

  // Generate dynamic reasons
  let reasons = [];
  if (densityScore > 60) reasons.push("High Crowd Density at Gates");
  if (criticalGates > 0) reasons.push(`Gate 1 Congestion Critical (${gates[0].current}/1000)`);
  if (abnormalCount > 0) reasons.push("Abnormal Motion & Reverse Flow Detected");
  if (weather.condition.includes("Rain")) reasons.push("Heavy Rain Emergency Rush");
  if (reasons.length === 0) reasons.push("Uniform Crowd Distribution", "Normal Flow Speeds");

  return {
    score: finalScore,
    breakdown: {
      densityContrib: Math.round(0.40 * densityScore),
      speedContrib: Math.round(0.20 * speedScore),
      reverseContrib: Math.round(0.15 * reverseScore),
      weatherContrib: Math.round(0.10 * weatherScore),
      gateContrib: Math.round(0.10 * gateScore),
      incidentContrib: Math.round(0.05 * pastIncidentScore)
    },
    reasons
  };
}

// REST API Endpoints

// 1. Auth Endpoint
app.post("/api/auth/login", (req, res) => {
  const { role, username, password } = req.body;
  if (!role) {
    return res.status(400).json({ error: "Role is required" });
  }

  const token = jwt.sign({ role, username: username || role }, JWT_SECRET, { expiresIn: "12h" });
  return res.json({
    success: true,
    token,
    user: {
      role,
      name: `${role.toUpperCase().replace("_", " ")} Officer`,
      badgeId: `CS-${Math.floor(1000 + Math.random() * 9000)}`
    }
  });
});

// 2. Get Telemetry Endpoint
app.get("/api/telemetry", (req, res) => {
  const riskInfo = calculateRiskScore(liveState.gates, liveCameraFeeds, liveState.weather);
  res.json({
    venue: liveState,
    cameraFeeds: liveCameraFeeds,
    risk: riskInfo,
    eventLogs: eventLogHistory.slice(-20),
    simulationMode: currentSimulationMode
  });
});

// 3. Scenario Simulation Trigger Endpoint
app.post("/api/simulations/step", (req, res) => {
  const { caseId, stepIndex } = req.body; // e.g. case1, stepIndex 0..6
  const scenario = simulationScenarios[caseId];

  if (!scenario || stepIndex === undefined || stepIndex < 0 || stepIndex >= scenario.steps.length) {
    return res.status(400).json({ error: "Invalid simulation parameter" });
  }

  const stepData = scenario.steps[stepIndex];
  currentSimulationMode = { caseId, stepIndex, stepData };

  // Apply simulation state changes to liveState
  if (stepData.gate1Count !== undefined) liveState.gates[0].current = stepData.gate1Count;
  if (stepData.gate1Status !== undefined) liveState.gates[0].status = stepData.gate1Status;
  if (stepData.totalCrowd !== undefined) liveState.currentTotalCrowd = stepData.totalCrowd;
  if (stepData.weatherCondition !== undefined) liveState.weather.condition = stepData.weatherCondition;

  // Add event log
  const now = new Date().toLocaleTimeString('en-US', { hour12: false });
  eventLogHistory.push({
    time: now,
    type: stepData.emergency ? "emergency" : "sim",
    text: stepData.eventMessage
  });

  // Broadcast via socket.io immediately
  io.emit("telemetry_update", {
    venue: liveState,
    cameraFeeds: liveCameraFeeds,
    risk: {
      score: stepData.riskScore,
      breakdown: {
        densityContrib: Math.round(stepData.riskScore * 0.4),
        speedContrib: Math.round(stepData.riskScore * 0.2),
        reverseContrib: Math.round(stepData.riskScore * 0.15),
        weatherContrib: Math.round(stepData.riskScore * 0.1),
        gateContrib: Math.round(stepData.riskScore * 0.1),
        incidentContrib: Math.round(stepData.riskScore * 0.05)
      },
      reasons: stepData.reasons
    },
    eventLogs: eventLogHistory.slice(-20),
    simulationMode: currentSimulationMode
  });

  return res.json({ success: true, stepData });
});

// 4. Reset Simulation
app.post("/api/simulations/reset", (req, res) => {
  currentSimulationMode = null;
  liveState = JSON.parse(JSON.stringify(initialVenueData));
  liveCameraFeeds = JSON.parse(JSON.stringify(initialCameraFeeds));
  eventLogHistory.push({
    time: new Date().toLocaleTimeString('en-US', { hour12: false }),
    type: "system",
    text: "Simulation reset. Baseline telemetry restored."
  });

  io.emit("telemetry_update", {
    venue: liveState,
    cameraFeeds: liveCameraFeeds,
    risk: calculateRiskScore(liveState.gates, liveCameraFeeds, liveState.weather),
    eventLogs: eventLogHistory.slice(-20),
    simulationMode: null
  });

  res.json({ success: true });
});

// 5. Trigger Emergency Services Dispatch
app.post("/api/emergency/dispatch", (req, res) => {
  const { service, target } = req.body;
  const now = new Date().toLocaleTimeString('en-US', { hour12: false });

  if (service === "green_corridor") {
    liveState.emergencyServices.trafficCorridor.greenCorridorActive = true;
    liveState.emergencyServices.trafficCorridor.status = "Active Green Corridor";
    eventLogHistory.push({
      time: now,
      type: "emergency",
      text: "GREEN CORRIDOR ACTIVATED: Traffic signals override enabled for ambulances."
    });
  } else if (service === "police") {
    liveState.emergencyServices.policeNearby += 12;
    eventLogHistory.push({
      time: now,
      type: "emergency",
      text: "POLICE DISPATCH: Rapid Response Unit deployed to Gate 1 Perimeter."
    });
  } else if (service === "ambulance") {
    if (liveState.emergencyServices.ambulancesAvailable > 0) {
      liveState.emergencyServices.ambulancesAvailable -= 1;
    }
    eventLogHistory.push({
      time: now,
      type: "emergency",
      text: `AMBULANCE DISPATCH: Unit sent to ${target || "Gate 1 Medical Bay"}. City Hospital prepped.`
    });
  }

  res.json({ success: true, venue: liveState });
});

// Background Telemetry Simulation Loop (runs every 3s if not in step-by-step active simulation)
setInterval(() => {
  if (!currentSimulationMode) {
    // Minor natural fluctuations in count
    liveState.gates.forEach(g => {
      const delta = Math.floor((Math.random() - 0.48) * 12);
      g.current = Math.max(100, Math.min(g.capacity, g.current + delta));
      if (g.current > 850) g.status = "Critical";
      else if (g.current > 600) g.status = "Warning";
      else g.status = "Safe";
    });

    liveState.currentTotalCrowd = liveState.gates.reduce((sum, g) => sum + g.current, 45000);

    // Dynamic camera vision updates
    liveCameraFeeds.forEach(cam => {
      const countDelta = Math.floor((Math.random() - 0.45) * 10);
      cam.peopleCount = Math.max(150, cam.peopleCount + countDelta);
      cam.density = Number((cam.peopleCount / 200).toFixed(1));
      cam.speed = Number((1.2 + (Math.random() * 0.4 - 0.2)).toFixed(1));
    });

    // Random periodic event log
    if (Math.random() > 0.65) {
      const now = new Date().toLocaleTimeString('en-US', { hour12: false });
      const sampleEvents = [
        "YOLO Detection: Person count updated across North/East gates.",
        "Crowd flow density normal in East Promenade.",
        "AI Evacuation routes checked. Exit paths 100% operational.",
        "Drone Recon 01: Aerial telemetry synced with control room.",
        "Acoustic sensors report normal noise levels."
      ];
      const randomText = sampleEvents[Math.floor(Math.random() * sampleEvents.length)];
      eventLogHistory.push({ time: now, type: "info", text: randomText });
    }

    const riskInfo = calculateRiskScore(liveState.gates, liveCameraFeeds, liveState.weather);

    io.emit("telemetry_update", {
      venue: liveState,
      cameraFeeds: liveCameraFeeds,
      risk: riskInfo,
      eventLogs: eventLogHistory.slice(-20),
      simulationMode: null
    });
  }
}, 3000);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`[CrowdShield AI] Server running on port ${PORT}`);
});
