import React, { useState, useEffect } from 'react';
import { io as socketIO } from 'socket.io-client';
import { 
  Users, 
  ShieldCheck, 
  AlertTriangle, 
  AlertOctagon, 
  Ambulance, 
  Shield, 
  Hospital, 
  Radio, 
  FileText,
  Sparkles
} from 'lucide-react';

import Header from '../components/Header';
import InteractiveMap from '../components/InteractiveMap';
import CameraFeeds from '../components/CameraFeeds';
import RiskMeter from '../components/RiskMeter';
import EventTimeline from '../components/EventTimeline';
import GateAnalytics from '../components/GateAnalytics';
import AIPredictionPanel from '../components/AIPredictionPanel';
import CaseStudySimulator from '../components/CaseStudySimulator';
import EmergencyModal from '../components/EmergencyModal';
import EmergencyServicesPanel from '../components/EmergencyServicesPanel';
import MultilingualAlerts from '../components/MultilingualAlerts';
import AIAssistant from '../components/AIAssistant';
import AnalyticsModal from '../components/AnalyticsModal';
import IncidentReportModal from '../components/IncidentReportModal';

export default function Dashboard() {
  // State variables
  const [telemetry, setTelemetry] = useState(null);
  const [activeCamId, setActiveCamId] = useState('cam-1');
  const [droneMode, setDroneMode] = useState(false);
  const [sirenMuted, setSirenMuted] = useState(false);
  const [emergencyActive, setEmergencyActive] = useState(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(null);

  // Real-time Socket.IO Connection & Initial Telemetry Fetch
  useEffect(() => {
    // Initial fetch
    fetch('/api/telemetry')
      .then(res => res.json())
      .then(data => {
        setTelemetry(data);
        if (data.risk?.score > 80) {
          setEmergencyActive(true);
          setIsEmergencyModalOpen(true);
        }
      })
      .catch(err => {
        console.warn("Telemetry endpoint offline, using local simulation state:", err);
      });

    // Connect to WebSocket server with localhost:5000 fallback
    const targetSocketUrl = window.location.hostname === 'localhost' 
      ? 'http://localhost:5000' 
      : window.location.origin;

    const socket = socketIO(targetSocketUrl, {
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 5
    });

    socket.on('telemetry_update', (data) => {
      setTelemetry(data);
      if (data.risk?.score > 80 && !emergencyActive) {
        setEmergencyActive(true);
        setIsEmergencyModalOpen(true);
      }
    });

    return () => socket.disconnect();
  }, []);

  // Trigger Scenario Step
  const handleTriggerStep = async (caseId, stepIndex) => {
    try {
      const res = await fetch('/api/simulations/step', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caseId, stepIndex })
      });
      const data = await res.json();
      if (data.stepData) {
        setCurrentStepIndex(stepIndex);
        if (data.stepData.emergency) {
          setEmergencyActive(true);
          setIsEmergencyModalOpen(true);
        }
      }
    } catch (err) {
      console.error("Simulation step error:", err);
    }
  };

  // Reset Simulation
  const handleResetSim = async () => {
    try {
      await fetch('/api/simulations/reset', { method: 'POST' });
      setCurrentStepIndex(null);
      setEmergencyActive(false);
      setIsEmergencyModalOpen(false);
    } catch (err) {
      console.error("Reset error:", err);
    }
  };

  // Emergency Service Dispatch Action
  const handleDispatchService = async (service, target) => {
    try {
      await fetch('/api/emergency/dispatch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ service, target })
      });
    } catch (err) {
      console.error("Dispatch error:", err);
    }
  };

  const defaultCameraFeeds = [
    { id: "cam-1", name: "Camera 1 - North Gate", location: "North Entrance Concourse", peopleCount: 450, density: 2.1, speed: 1.2, abnormalMotion: false },
    { id: "cam-2", name: "Camera 2 - South Gate", location: "South Gate Plaza", peopleCount: 380, density: 1.8, speed: 1.4, abnormalMotion: false },
    { id: "cam-3", name: "Camera 3 - East Gate", location: "East Promenade", peopleCount: 520, density: 2.4, speed: 1.1, abnormalMotion: false },
    { id: "cam-4", name: "Camera 4 - West Gate", location: "West Transit Exit", peopleCount: 610, density: 3.2, speed: 0.8, abnormalMotion: false }
  ];

  const venue = telemetry?.venue || {};
  const gates = venue.gates || [
    { id: "gate-1", name: "Gate 1 (North)", capacity: 1000, current: 450, status: "Safe", lat: 28.6139, lng: 77.2090 },
    { id: "gate-2", name: "Gate 2 (East)", capacity: 1000, current: 520, status: "Safe", lat: 28.6145, lng: 77.2105 },
    { id: "gate-3", name: "Gate 3 (South)", capacity: 1000, current: 380, status: "Safe", lat: 28.6130, lng: 77.2095 },
    { id: "gate-4", name: "Gate 4 (West)", capacity: 1000, current: 610, status: "Warning", lat: 28.6135, lng: 77.2075 }
  ];
  const cameraFeeds = (telemetry?.cameraFeeds && telemetry.cameraFeeds.length > 0) ? telemetry.cameraFeeds : defaultCameraFeeds;
  const riskInfo = telemetry?.risk || { score: 18, reasons: ["Baseline safe flow"] };
  const emergencyServices = venue.emergencyServices || {};

  return (
    <div className={`min-h-screen bg-[#09090B] text-slate-100 flex flex-col font-sans relative ${
      emergencyActive ? 'animate-emergency-strobe border-4 border-red-600/50' : ''
    }`}>
      {/* Top Navigation Header Bar */}
      <Header
        weather={venue.weather}
        droneMode={droneMode}
        setDroneMode={setDroneMode}
        sirenMuted={sirenMuted}
        setSirenMuted={setSirenMuted}
        emergencyActive={emergencyActive}
        setEmergencyActive={setEmergencyActive}
        onOpenAnalytics={() => setIsAnalyticsOpen(true)}
        onOpenReport={() => setIsReportOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 p-3 md:p-4 space-y-4 max-w-[1920px] mx-auto w-full">
        {/* Top 8 Telemetry Cards Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
          {/* Card 1: Total Crowd */}
          <div className="bg-[#18181B] p-2.5 rounded-xl border border-zinc-800 flex flex-col justify-between">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-[10px] font-mono-tech uppercase">Total Crowd</span>
              <Users className="w-3.5 h-3.5 text-[#00E5FF]" />
            </div>
            <div className="text-xl font-orbitron font-bold text-white mt-1">
              {venue.currentTotalCrowd ? venue.currentTotalCrowd.toLocaleString() : "48,250"}
            </div>
            <div className="text-[9px] font-mono-tech text-[#00C853]">Live Telemetry</div>
          </div>

          {/* Card 2: Safe Zones */}
          <div className="bg-[#18181B] p-2.5 rounded-xl border border-zinc-800 flex flex-col justify-between">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-[10px] font-mono-tech uppercase">Safe Zones</span>
              <ShieldCheck className="w-3.5 h-3.5 text-[#00C853]" />
            </div>
            <div className="text-xl font-orbitron font-bold text-[#00C853] mt-1">
              {venue.safeZones ?? 3} / 4
            </div>
            <div className="text-[9px] font-mono-tech text-zinc-400">Optimal Flow</div>
          </div>

          {/* Card 3: Warning Zones */}
          <div className="bg-[#18181B] p-2.5 rounded-xl border border-zinc-800 flex flex-col justify-between">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-[10px] font-mono-tech uppercase">Warning Zones</span>
              <AlertTriangle className="w-3.5 h-3.5 text-[#FFC107]" />
            </div>
            <div className="text-xl font-orbitron font-bold text-[#FFC107] mt-1">
              {venue.warningZones ?? 1}
            </div>
            <div className="text-[9px] font-mono-tech text-[#FFC107]">Gate 4 Bottleneck</div>
          </div>

          {/* Card 4: Critical Zones */}
          <div className="bg-[#18181B] p-2.5 rounded-xl border border-zinc-800 flex flex-col justify-between">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-[10px] font-mono-tech uppercase">Critical Zones</span>
              <AlertOctagon className="w-3.5 h-3.5 text-[#FF3B30]" />
            </div>
            <div className={`text-xl font-orbitron font-bold mt-1 ${venue.criticalZones > 0 ? 'text-[#FF3B30] animate-pulse' : 'text-zinc-400'}`}>
              {venue.criticalZones ?? 0}
            </div>
            <div className="text-[9px] font-mono-tech text-zinc-500">Hazard Monitoring</div>
          </div>

          {/* Card 5: Ambulances */}
          <div className="bg-[#18181B] p-2.5 rounded-xl border border-zinc-800 flex flex-col justify-between">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-[10px] font-mono-tech uppercase">Ambulances</span>
              <Ambulance className="w-3.5 h-3.5 text-[#00E5FF]" />
            </div>
            <div className="text-xl font-orbitron font-bold text-white mt-1">
              {emergencyServices.ambulancesAvailable ?? 8}
            </div>
            <div className="text-[9px] font-mono-tech text-[#00E5FF]">Ready for Transit</div>
          </div>

          {/* Card 6: Police Nearby */}
          <div className="bg-[#18181B] p-2.5 rounded-xl border border-zinc-800 flex flex-col justify-between">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-[10px] font-mono-tech uppercase">Police Nearby</span>
              <Shield className="w-3.5 h-3.5 text-indigo-400" />
            </div>
            <div className="text-xl font-orbitron font-bold text-[#00E5FF] mt-1">
              {emergencyServices.policeNearby ?? 24}
            </div>
            <div className="text-[9px] font-mono-tech text-zinc-400">Unit Alpha / Bravo</div>
          </div>

          {/* Card 7: Hospitals Active */}
          <div className="bg-[#18181B] p-2.5 rounded-xl border border-zinc-800 flex flex-col justify-between">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-[10px] font-mono-tech uppercase">Hospitals</span>
              <Hospital className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <div className="text-xl font-orbitron font-bold text-white mt-1">
              {emergencyServices.activeHospitals ?? 3}
            </div>
            <div className="text-[9px] font-mono-tech text-[#00C853]">55 Beds Ready</div>
          </div>

          {/* Card 8: Report Generator Button Card */}
          <button
            type="button"
            onClick={() => setIsReportOpen(true)}
            className="bg-cyan-950/60 p-2.5 rounded-xl border border-[#00E5FF]/50 flex flex-col justify-between hover:bg-[#00E5FF] hover:text-black transition-all group cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono-tech uppercase font-bold">PDF AUDIT</span>
              <FileText className="w-3.5 h-3.5 text-[#00E5FF] group-hover:text-black" />
            </div>
            <div className="text-xs font-orbitron font-bold mt-1 text-[#00E5FF] group-hover:text-black">
              AUDIT REPORT
            </div>
            <div className="text-[9px] font-mono-tech text-zinc-400 group-hover:text-black">Generate PDF</div>
          </button>
        </div>

        {/* 3-Column Main Command Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          {/* LEFT PANEL: Live Camera Feeds (3 Cols) */}
          <div className="lg:col-span-3 h-[480px]">
            <CameraFeeds
              cameraFeeds={cameraFeeds}
              activeCamId={activeCamId}
              setActiveCamId={setActiveCamId}
            />
          </div>

          {/* CENTER CANVAS: Interactive Map Digital Twin (6 Cols) */}
          <div className="lg:col-span-6 h-[480px]">
            <InteractiveMap
              gates={gates}
              droneMode={droneMode}
              emergencyActive={emergencyActive}
              riskScore={riskInfo.score}
            />
          </div>

          {/* RIGHT PANEL: AI Risk Score Diagnostics (3 Cols) */}
          <div className="lg:col-span-3 h-[480px]">
            <RiskMeter riskInfo={riskInfo} />
          </div>
        </div>

        {/* Case Study Simulation Engine (Demo Mode) */}
        <CaseStudySimulator
          onTriggerStep={handleTriggerStep}
          onResetSim={handleResetSim}
          currentStepIndex={currentStepIndex}
        />

        {/* Secondary 3-Column Operations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left Column: Live Event Timeline Log (4 Cols) */}
          <div className="lg:col-span-4 h-64">
            <EventTimeline eventLogs={telemetry?.eventLogs || []} />
          </div>

          {/* Center Column: Gate Analytics & AI Prediction (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4 h-64">
            <div className="flex-1">
              <GateAnalytics gates={gates} />
            </div>
            <div className="flex-1">
              <AIPredictionPanel currentCrowd={venue.currentTotalCrowd} />
            </div>
          </div>

          {/* Right Column: Emergency Services & Multilingual Alerts (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4 h-64">
            <div className="flex-1">
              <EmergencyServicesPanel
                emergencyData={emergencyServices}
                onDispatch={handleDispatchService}
              />
            </div>
            <div className="flex-1">
              <MultilingualAlerts activeGate={gates[1]?.name || "Gate 2"} />
            </div>
          </div>
        </div>
      </main>

      {/* Floating Tactical AI Assistant Chatbot */}
      <AIAssistant riskScore={riskInfo.score} />

      {/* Emergency Alert Strobe Modal Popup */}
      <EmergencyModal
        isOpen={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
        riskScore={riskInfo.score}
        onActivateServices={() => handleDispatchService('green_corridor')}
      />

      {/* Analytics Modal Drawer */}
      <AnalyticsModal
        isOpen={isAnalyticsOpen}
        onClose={() => setIsAnalyticsOpen(false)}
      />

      {/* After-Incident PDF Report Generator Modal */}
      <IncidentReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        currentCrowd={venue.currentTotalCrowd}
        riskScore={riskInfo.score}
      />
    </div>
  );
}
