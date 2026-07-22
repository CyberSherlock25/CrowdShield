export const delhiLandmarks = {
  stadium: { name: "Arun Jaitley Stadium", lat: 28.6377, lng: 77.2432, capacity: 55000, current: 48250 },
  hospital: { name: "AIIMS / LNJP Emergency Care", lat: 28.6355, lng: 77.2405, beds: 42, icu: 14, doctors: 18, bloodUnits: 65 },
  policeHq: { name: "Delhi Police Central HQ", lat: 28.6310, lng: 77.2415, officersAvailable: 140 },
  trafficHq: { name: "Delhi Traffic Control HQ", lat: 28.6280, lng: 77.2350, corridorActive: false },
  metro: { name: "Mandi House / Stadium Metro", lat: 28.6258, lng: 77.2343, density: 4.8 },
  droneBase: { name: "Recon Drone Launch Pad", lat: 28.6410, lng: 77.2450, battery: 94, altitude: "120m" }
};

export const initialVenueData = {
  venueName: "Arun Jaitley Stadium (Delhi Ops)",
  city: "New Delhi, India",
  capacity: 55000,
  currentTotalCrowd: 48250,
  safeZones: 3,
  warningZones: 1,
  criticalZones: 0,
  riskLevel: "SAFE", // SAFE (0-30), WARNING (31-60), HIGH (61-80), CRITICAL (81-100)
  weather: {
    condition: "Clear",
    temperature: 28,
    rainProbability: 5,
    windSpeed: "10 km/h"
  },
  gates: [
    { id: "gate-1", name: "Gate 1 (North Main)", capacity: 1000, current: 450, status: "Safe", flowRate: "35 p/min", lat: 28.6385, lng: 77.2432 },
    { id: "gate-2", name: "Gate 2 (East Concourse)", capacity: 1000, current: 520, status: "Safe", flowRate: "42 p/min", lat: 28.6377, lng: 77.2445 },
    { id: "gate-3", name: "Gate 3 (South Metro Exit)", capacity: 1000, current: 380, status: "Safe", flowRate: "28 p/min", lat: 28.6368, lng: 77.2432 },
    { id: "gate-4", name: "Gate 4 (West Transit)", capacity: 1000, current: 610, status: "Warning", flowRate: "58 p/min", lat: 28.6377, lng: 77.2418 }
  ],
  emergencyServices: {
    ambulancesAvailable: 8,
    policeNearby: 24,
    activeHospitals: 3,
    activeAlerts: 0,
    hospitals: [
      { id: "h1", name: "LNJP Central Hospital", distance: "850 m", bedsAvailable: 18, icuBeds: 6, ambulances: 4, phone: "+91-11-2323-0000" },
      { id: "h2", name: "AIIMS Trauma Center", distance: "2.4 km", bedsAvailable: 12, icuBeds: 4, ambulances: 3, phone: "+91-11-2658-8500" },
      { id: "h3", name: "G.B. Pant Hospital", distance: "1.2 km", bedsAvailable: 25, icuBeds: 8, ambulances: 5, phone: "+91-11-2323-4000" }
    ],
    policeUnits: [
      { id: "p1", unit: "Patrol Unit 01 (North Gate)", officers: 25, available: 32, distance: "850 meters", eta: "2 min", lat: 28.6390, lng: 77.2432, status: "Standby" },
      { id: "p2", unit: "Patrol Unit 02 (Metro Plaza)", officers: 40, available: 45, distance: "1.4 km", eta: "4 min", lat: 28.6260, lng: 77.2345, status: "Standby" }
    ],
    trafficCorridor: {
      status: "Normal Flow",
      greenCorridorActive: false,
      priorityRoute: "Stadium -> Vikas Marg -> LNJP Hospital"
    }
  }
};

export const initialCameraFeeds = [
  {
    id: "cam-1",
    name: "Camera 1 — North Gate Entrance",
    location: "North Gate Gate 1",
    peopleCount: 450,
    density: 2.1,
    speed: 1.2,
    risk: "Safe",
    runningDetected: false,
    fallingDetected: false,
    suspiciousMotion: false,
    aiRecommendation: "Flow normal. Keep Gate 1 turnstiles open.",
    detections: [
      { id: 1, type: "person", label: "Person (Walking)", confidence: 0.96, bbox: [20, 30, 45, 65] },
      { id: 2, type: "person", label: "Person (Standing)", confidence: 0.92, bbox: [50, 40, 75, 75] }
    ]
  },
  {
    id: "cam-2",
    name: "Camera 2 — South Metro Junction",
    location: "Gate 3 Metro Plaza",
    peopleCount: 380,
    density: 1.8,
    speed: 1.4,
    risk: "Safe",
    runningDetected: false,
    fallingDetected: false,
    suspiciousMotion: false,
    aiRecommendation: "Flow normal.",
    detections: [
      { id: 1, type: "person", label: "Person (Walking)", confidence: 0.94, bbox: [15, 25, 40, 60] }
    ]
  },
  {
    id: "cam-3",
    name: "Camera 3 — East Promenade",
    location: "East Promenade Gate 2",
    peopleCount: 520,
    density: 2.4,
    speed: 1.1,
    risk: "Safe",
    runningDetected: false,
    fallingDetected: false,
    suspiciousMotion: false,
    aiRecommendation: "Baseline safe.",
    detections: [
      { id: 1, type: "person", label: "Person (Walking)", confidence: 0.91, bbox: [30, 20, 55, 55] }
    ]
  },
  {
    id: "cam-4",
    name: "Camera 4 — West Transit Corridor",
    location: "Gate 4 Transit Exit",
    peopleCount: 610,
    density: 3.2,
    speed: 0.8,
    risk: "Warning",
    runningDetected: false,
    fallingDetected: false,
    suspiciousMotion: false,
    aiRecommendation: "Monitor Gate 4. Density approaching warning limit.",
    detections: [
      { id: 1, type: "person", label: "Person (Congested)", confidence: 0.97, bbox: [25, 15, 50, 50] }
    ]
  }
];

export const initialWhatsAppAlerts = [
  { id: 1, type: "police", icon: "🚨", title: "Police Unit 01 Dispatched", text: "25 officers assigned to North Gate 1.", time: "2 sec ago" },
  { id: 2, type: "ambulance", icon: "🚑", title: "Ambulance 02 En Route", text: "Dispatched to Gate 1 Medical Bay.", time: "30 sec ago" },
  { id: 3, type: "traffic", icon: "🚦", title: "Green Corridor Standby", text: "Traffic signals prepped on Vikas Marg.", time: "1 min ago" }
];

export const simulationScenarios = {
  case1: {
    id: "stadium-stampede",
    title: "Case 1: Cricket Stadium Stampede",
    livesSaved: 37,
    steps: [
      {
        step: 1,
        timeLabel: "0 min",
        title: "Normal Entry",
        description: "Match entry baseline. All turnstiles operating normally.",
        riskScore: 15,
        riskBadge: "SAFE",
        riskColor: "#00C853",
        gate1Count: 450,
        weatherCondition: "Clear",
        eventMessage: "0 min — Everything normal. Gate 1 flow safe. Risk Score: 15.",
        popup: null
      },
      {
        step: 2,
        timeLabel: "2 min",
        title: "Gate 1 Turnstile Bottleneck",
        description: "Gate 1 scanner glitch. Crowd density increases to 4.2 p/m².",
        riskScore: 48,
        riskBadge: "WARNING",
        riskColor: "#FFC107",
        gate1Count: 780,
        weatherCondition: "Clear",
        eventMessage: "2 min — Gate 1 crowd increasing rapidly. Risk Score: 48.",
        popup: null
      },
      {
        step: 3,
        timeLabel: "3 min",
        title: "Rain Rush",
        description: "Unseasonal heavy rain starts outside. Thousands surge into Gate 1 concourse.",
        riskScore: 65,
        riskBadge: "HIGH",
        riskColor: "#F97316",
        gate1Count: 920,
        weatherCondition: "Heavy Rain",
        eventMessage: "3 min — Unseasonal rain surge. People rushing for shelter. Risk Score: 65.",
        popup: null
      },
      {
        step: 4,
        timeLabel: "4 min",
        title: "AI Stampede Hazard Prediction",
        description: "AI predicts 96% stampede hazard within 120 seconds.",
        riskScore: 82,
        riskBadge: "CRITICAL",
        riskColor: "#FF3B30",
        gate1Count: 990,
        weatherCondition: "Heavy Rain",
        eventMessage: "4 min — CRITICAL: People rushing! AI predicts stampede in 120s. Risk Score: 82.",
        popup: {
          title: "⚠ HIGH CROWD RISK — PREDICTED STAMPEDE",
          confidence: "96%",
          recommendedActions: [
            "Redirect Crowd to Gate 3 & Gate 2",
            "Open Gate 3 (South Metro)",
            "Halt & Close Gate 1 Entry",
            "Notify Police Patrol Unit 01",
            "Alert LNJP Hospital Emergency"
          ],
          whyExplanation: {
            predictedInjuries: 12,
            distanceToHospital: "850 meters",
            trafficStatus: "Heavy on Vikas Marg",
            confidence: "96%"
          }
        }
      },
      {
        step: 5,
        timeLabel: "5 min",
        title: "Crowd Safely Evacuated",
        description: "Police redirect crowd to Gate 3 & 2. Green Corridor clears ambulance path.",
        riskScore: 20,
        riskBadge: "SAFE",
        riskColor: "#00C853",
        gate1Count: 180,
        weatherCondition: "Clear",
        eventMessage: "5 min — People safely evacuated. Risk Score reduced to 20.",
        livesSavedCard: 37,
        popup: null
      }
    ]
  },
  case2: {
    id: "railway-station",
    title: "Case 2: Railway Station Festival Rush",
    livesSaved: 142,
    steps: [
      {
        step: 1,
        timeLabel: "0 min",
        title: "Diwali Passenger Surge",
        description: "Platform 1 & 2 congested as 3 festival special trains land.",
        riskScore: 35,
        riskBadge: "WARNING",
        riskColor: "#FFC107",
        eventMessage: "0 min — Diwali festival rush peak at Mandi House Railway Junction.",
        popup: null
      },
      {
        step: 2,
        timeLabel: "3 min",
        title: "Footbridge Overcrowding",
        description: "AI predicts platform overload. Passenger rerouting suggested.",
        riskScore: 78,
        riskBadge: "HIGH",
        riskColor: "#F97316",
        eventMessage: "3 min — Platform footbridge density high. AI redirects flow to Platform 4.",
        popup: {
          title: "⚠ PLATFORM OVERCROWDING PREDICTED",
          confidence: "94%",
          recommendedActions: [
            "Divert incoming surge to Platform 4",
            "Announce extra festival special train",
            "Hold Gate A turnstiles"
          ],
          whyExplanation: {
            predictedInjuries: 8,
            distanceToHospital: "1.2 km",
            trafficStatus: "Clear",
            confidence: "94%"
          }
        }
      },
      {
        step: 3,
        timeLabel: "6 min",
        title: "Zero Incident Clearance",
        description: "Passengers board Platform 4 special train. Normal risk restored.",
        riskScore: 18,
        riskBadge: "SAFE",
        riskColor: "#00C853",
        eventMessage: "6 min — Passengers safely boarded extra train. Zero incidents reported.",
        livesSavedCard: 142,
        popup: null
      }
    ]
  },
  case3: {
    id: "temple-festival",
    title: "Case 3: Temple Pilgrimage Bridge Hazard",
    livesSaved: 89,
    steps: [
      {
        step: 1,
        timeLabel: "0 min",
        title: "Morning Darshan Queue",
        description: "200,000 pilgrims gathered near river bridge entrance.",
        riskScore: 42,
        riskBadge: "WARNING",
        riskColor: "#FFC107",
        eventMessage: "0 min — Pilgrim footfall expanding near river bridge.",
        popup: null
      },
      {
        step: 2,
        timeLabel: "4 min",
        title: "Bridge Load & Sway Alert",
        description: "Drone detects sway resonance on narrow bridge.",
        riskScore: 88,
        riskBadge: "CRITICAL",
        riskColor: "#FF3B30",
        eventMessage: "4 min — CRITICAL: Bridge capacity exceeded by 140%. Entry stopped.",
        popup: {
          title: "⚠ BRIDGE COLLAPSE HAZARD PREDICTED",
          confidence: "97%",
          recommendedActions: [
            "Engage automatic bridge barrier",
            "Divert pilgrims to concrete bypass",
            "Activate holding pens"
          ],
          whyExplanation: {
            predictedInjuries: 25,
            distanceToHospital: "2.1 km",
            trafficStatus: "Corridor Active",
            confidence: "97%"
          }
        }
      },
      {
        step: 3,
        timeLabel: "8 min",
        title: "Safe Diversion Complete",
        description: "Pilgrims diverted over wide concrete bypass. Bridge load normalized.",
        riskScore: 22,
        riskBadge: "SAFE",
        riskColor: "#00C853",
        eventMessage: "8 min — Bridge cleared safely. Zero casualties.",
        livesSavedCard: 89,
        popup: null
      }
    ]
  }
};
