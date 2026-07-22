export const initialVenueData = {
  venueName: "Metropolis National Stadium",
  capacity: 80000,
  currentTotalCrowd: 48250,
  safeZones: 3,
  warningZones: 1,
  criticalZones: 0,
  weather: {
    condition: "Clear",
    temperature: 24,
    rainProbability: 5,
    windSpeed: "12 km/h"
  },
  gates: [
    { id: "gate-1", name: "Gate 1 (North Main)", capacity: 1000, current: 450, status: "Safe", flowRate: "35 p/min", lat: 28.6139, lng: 77.2090 },
    { id: "gate-2", name: "Gate 2 (East Express)", capacity: 1000, current: 520, status: "Safe", flowRate: "42 p/min", lat: 28.6145, lng: 77.2105 },
    { id: "gate-3", name: "Gate 3 (South VIP & Metro)", capacity: 1000, current: 380, status: "Safe", flowRate: "28 p/min", lat: 28.6130, lng: 77.2095 },
    { id: "gate-4", name: "Gate 4 (West Transit)", capacity: 1000, current: 610, status: "Warning", flowRate: "58 p/min", lat: 28.6135, lng: 77.2075 }
  ],
  emergencyServices: {
    ambulancesAvailable: 8,
    policeNearby: 24,
    activeHospitals: 3,
    activeAlerts: 0,
    hospitals: [
      { id: "h1", name: "Central City Hospital", distance: "2.1 km", bedsAvailable: 18, ambulances: 4, phone: "+1-800-555-0199" },
      { id: "h2", name: "Metro Trauma Center", distance: "3.8 km", bedsAvailable: 12, ambulances: 3, phone: "+1-800-555-0188" },
      { id: "h3", name: "St. Jude Emergency Care", distance: "5.4 km", bedsAvailable: 25, ambulances: 5, phone: "+1-800-555-0177" }
    ],
    policeUnits: [
      { id: "p1", unit: "Unit Alpha (Rapid Patrol)", eta: "2 min", officers: 8, location: "North Outer Ring" },
      { id: "p2", unit: "Unit Bravo (Crowd Taskforce)", eta: "4 min", officers: 12, location: "Metro Junction" }
    ],
    trafficCorridor: {
      status: "Normal",
      greenCorridorActive: false
    }
  }
};

export const initialCameraFeeds = [
  {
    id: "cam-1",
    name: "Camera 1 - North Gate",
    location: "North Entrance Concourse",
    peopleCount: 450,
    density: 2.1, // persons/m2
    speed: 1.2, // m/s
    abnormalMotion: false,
    fallingDetected: false,
    runningDetected: false,
    detections: [
      { id: 1, type: "person", label: "Person (Walking)", confidence: 0.94, bbox: [20, 30, 45, 65] },
      { id: 2, type: "person", label: "Person (Walking)", confidence: 0.89, bbox: [50, 40, 75, 75] },
      { id: 3, type: "person", label: "Person (Standing)", confidence: 0.96, bbox: [70, 20, 95, 55] }
    ]
  },
  {
    id: "cam-2",
    name: "Camera 2 - South Gate",
    location: "South Gate Plaza",
    peopleCount: 380,
    density: 1.8,
    speed: 1.4,
    abnormalMotion: false,
    fallingDetected: false,
    runningDetected: false,
    detections: [
      { id: 1, type: "person", label: "Person (Walking)", confidence: 0.91, bbox: [15, 25, 40, 60] },
      { id: 2, type: "person", label: "Person (Walking)", confidence: 0.88, bbox: [60, 30, 85, 70] }
    ]
  },
  {
    id: "cam-3",
    name: "Camera 3 - East Gate",
    location: "East Promenade",
    peopleCount: 520,
    density: 2.4,
    speed: 1.1,
    abnormalMotion: false,
    fallingDetected: false,
    runningDetected: false,
    detections: [
      { id: 1, type: "person", label: "Person (Walking)", confidence: 0.95, bbox: [30, 20, 55, 55] },
      { id: 2, type: "person", label: "Person (Standing)", confidence: 0.92, bbox: [65, 35, 90, 75] }
    ]
  },
  {
    id: "cam-4",
    name: "Camera 4 - West Gate",
    location: "West Transit Exit",
    peopleCount: 610,
    density: 3.2,
    speed: 0.8,
    abnormalMotion: false,
    fallingDetected: false,
    runningDetected: false,
    detections: [
      { id: 1, type: "person", label: "Person (Congested)", confidence: 0.97, bbox: [25, 15, 50, 50] },
      { id: 2, type: "person", label: "Person (Slow)", confidence: 0.93, bbox: [55, 45, 80, 85] }
    ]
  }
];

export const simulationScenarios = {
  case1: {
    id: "stadium-stampede",
    title: "Case 1: Stadium Stampede Scenario",
    steps: [
      {
        step: 1,
        title: "Normal Crowd Flow",
        description: "Crowd flow is smooth. All gates functioning within standard parameters.",
        riskScore: 18,
        totalCrowd: 48250,
        gate1Count: 450,
        gate1Status: "Safe",
        weatherCondition: "Clear",
        reasons: ["Optimal flow rates", "Uniform distribution"],
        eventMessage: "12:00 PM - System initialized. All gates operating normally.",
        emergency: false
      },
      {
        step: 2,
        title: "Gate 1 Bottleneck Formation",
        description: "Gate 1 ticketing scanner experiences glitch. Crowd density rises to 4.2 p/m².",
        riskScore: 52,
        totalCrowd: 52100,
        gate1Count: 820,
        gate1Status: "Warning",
        weatherCondition: "Clear",
        reasons: ["Gate 1 Congestion rising", "Turnstile speed bottleneck"],
        eventMessage: "12:03 PM - Warning: Gate 1 density crossed 4 p/m². Police notified.",
        emergency: false
      },
      {
        step: 3,
        title: "Sudden Rain Rush",
        description: "Unexpected heavy rain starts outside. Thousands rush into Gate 1 for cover.",
        riskScore: 76,
        totalCrowd: 56400,
        gate1Count: 960,
        gate1Status: "Critical",
        weatherCondition: "Heavy Rain",
        reasons: ["Crowd Density High at Gate 1", "Reverse Crowd Movement", "Rain Rush Detected"],
        eventMessage: "12:05 PM - Rain rush detected. Reverse movement triggered at North Concourse.",
        emergency: false
      },
      {
        step: 4,
        title: "AI Stampede Hazard Prediction",
        description: "AI predicts 94.8% probability of severe stampede within 2 minutes.",
        riskScore: 84,
        totalCrowd: 59100,
        gate1Count: 990,
        gate1Status: "Critical",
        weatherCondition: "Heavy Rain",
        reasons: ["Crowd Density Exceeding Threshold (5.8 p/m²)", "Gate 1 Blocked", "Sudden Compression Wave"],
        eventMessage: "12:06 PM - Emergency Alert! AI predicts stampede in 120s. LED boards & speakers auto-activated.",
        emergency: true
      },
      {
        step: 5,
        title: "Evacuation & Dynamic Rerouting",
        description: "Gate 1 entry halted. Audio broadcasts instruct crowd to divert to Gate 2 & Gate 3.",
        riskScore: 91,
        totalCrowd: 58900,
        gate1Count: 995,
        gate1Status: "Closed",
        weatherCondition: "Heavy Rain",
        reasons: ["Gate 1 Completely Blocked", "High Compression Hazard", "Evacuation Route Deployed"],
        eventMessage: "12:07 PM - Gate 1 closed. AI redirection vectors active towards Gate 2 and Gate 3.",
        emergency: true
      },
      {
        step: 6,
        title: "Emergency Response & Green Corridor",
        description: "Ambulances dispatched. Police clear North perimeter. Traffic signals synced to Green Corridor.",
        riskScore: 64,
        totalCrowd: 53200,
        gate1Count: 650,
        gate1Status: "Clearing",
        weatherCondition: "Light Rain",
        reasons: ["Green Corridor Active", "Crowd dispersing to Gate 2/3"],
        eventMessage: "12:09 PM - Emergency services on site. Green Corridor active for medical units.",
        emergency: false
      },
      {
        step: 7,
        title: "Situation Stabilized & Safe Evacuation",
        description: "Stadium crowd safely redirected and evacuated. Zero casualties reported.",
        riskScore: 22,
        totalCrowd: 41000,
        gate1Count: 210,
        gate1Status: "Safe",
        weatherCondition: "Clear",
        reasons: ["All gates clear", "Normal movement restored"],
        eventMessage: "12:12 PM - Incident resolved. 18,200 attendees safely guided.",
        emergency: false
      }
    ]
  },
  case2: {
    id: "railway-station",
    title: "Case 2: Festival Railway Station Overcrowding",
    steps: [
      {
        step: 1,
        title: "Diwali Rush Peak",
        description: "Platform 1 & 2 congested as 3 special trains arrive simultaneously.",
        riskScore: 45,
        reasons: ["Platform 1 capacity at 85%"],
        eventMessage: "14:00 - High festival passenger volume at Central Railway Station.",
        emergency: false
      },
      {
        step: 2,
        title: "Platform Surge Warning",
        description: "Footbridge density reaches critical mass. AI triggers entry restriction.",
        riskScore: 78,
        reasons: ["Platform 1 bottleneck", "Footbridge compression wave"],
        eventMessage: "14:05 - AI restrict entry at Main Concourse to prevent footbridge collapse.",
        emergency: false
      },
      {
        step: 3,
        title: "AI Rerouting & Special Train Dispatch",
        description: "AI instructs railway control to hold incoming train & open emergency exit gates.",
        riskScore: 31,
        reasons: ["Passenger flow diverted to Platform 4", "Additional special train announced"],
        eventMessage: "14:12 - Extra train deployed at Platform 4. Footbridge cleared safely.",
        emergency: false
      }
    ]
  },
  case3: {
    id: "temple-pilgrimage",
    title: "Case 3: Religious Temple Pilgrimage & Bridge Safety",
    steps: [
      {
        step: 1,
        title: "Morning Darshan Peak",
        description: "Over 200,000 pilgrims gathered near river bridge entrance.",
        riskScore: 58,
        reasons: ["Pilgrim queue density high"],
        eventMessage: "06:30 AM - River bridge pilgrim queue expanding rapidly.",
        emergency: false
      },
      {
        step: 2,
        title: "Bridge Sway Warning",
        description: "AI sensors detect abnormal resonance & counter-flow panic on narrow suspension bridge.",
        riskScore: 88,
        reasons: ["Bridge capacity exceed by 140%", "Reverse crowd movement"],
        eventMessage: "06:40 AM - CRITICAL ALERT: Bridge load limit exceeded! Automated barriers engaged.",
        emergency: true
      },
      {
        step: 3,
        title: "Emergency Hold & Safe Diversion",
        description: "AI activates hold holding pens and redirects flow over wide concrete bypass.",
        riskScore: 26,
        reasons: ["Bridge cleared", "Bypass holding pens active"],
        eventMessage: "06:50 AM - Bridge load normalized. Zero stampede casualties.",
        emergency: false
      }
    ]
  }
};
