import React, { useState, useEffect } from 'react';
import { io as socketIO } from 'socket.io-client';

import RoleSwitcherBar from '../components/RoleSwitcherBar';
import SuperAdminDashboard from './dashboards/SuperAdminDashboard';
import ControlRoomDashboard from './dashboards/ControlRoomDashboard';
import PoliceDashboard from './dashboards/PoliceDashboard';
import HospitalDashboard from './dashboards/HospitalDashboard';
import TrafficDashboard from './dashboards/TrafficDashboard';
import DroneDashboard from './dashboards/DroneDashboard';
import IncidentReportModal from '../components/IncidentReportModal';

export default function Dashboard() {
  // Read logged in role or default to 'control_room'
  const getInitialRole = () => {
    try {
      const stored = localStorage.getItem('crowdshield_user');
      if (stored) {
        const u = JSON.parse(stored);
        if (u.role) return u.role;
      }
    } catch (e) {}
    return 'control_room';
  };

  const [activeRole, setActiveRole] = useState(getInitialRole());
  const [telemetry, setTelemetry] = useState(null);
  const [selectedCamForModal, setSelectedCamForModal] = useState(null);
  const [isCamModalOpen, setIsCamModalOpen] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(null);

  // Real-time Socket.IO Sync
  useEffect(() => {
    fetch('/api/telemetry')
      .then(res => res.json())
      .then(data => setTelemetry(data))
      .catch(err => console.warn("Telemetry offline:", err));

    const targetSocketUrl = window.location.hostname === 'localhost' 
      ? 'http://localhost:5000' 
      : window.location.origin;

    const socket = socketIO(targetSocketUrl, {
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 5
    });

    socket.on('telemetry_update', (data) => {
      setTelemetry(data);
      if (data.risk?.score > 80 && !isAIModalOpen) {
        setIsAIModalOpen(true);
      }
    });

    return () => socket.disconnect();
  }, []);

  // Dispatch Actions
  const handleDispatchService = async (service, target) => {
    try {
      await fetch('/api/emergency/dispatch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ service, target })
      });
      setIsAIModalOpen(false);
    } catch (err) {
      console.error("Dispatch error:", err);
    }
  };

  // Simulation Triggers
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
        if (data.stepData.popup) {
          setIsAIModalOpen(true);
        }
      }
    } catch (err) {
      console.error("Step trigger error:", err);
    }
  };

  const handleResetSim = async () => {
    try {
      await fetch('/api/simulations/reset', { method: 'POST' });
      setCurrentStepIndex(null);
      setIsAIModalOpen(false);
    } catch (err) {
      console.error("Reset error:", err);
    }
  };

  const handleOpenCameraModal = (cam) => {
    setSelectedCamForModal(cam);
    setIsCamModalOpen(true);
  };

  // Telemetry Fallbacks
  const defaultCameraFeeds = [
    { id: "cam-1", name: "Camera 1 — North Gate Entrance", location: "North Gate 1", peopleCount: 450, density: 2.1, speed: 1.2, risk: "Safe" },
    { id: "cam-2", name: "Camera 2 — South Metro Junction", location: "Gate 3 Metro Plaza", peopleCount: 380, density: 1.8, speed: 1.4, risk: "Safe" },
    { id: "cam-3", name: "Camera 3 — East Promenade", location: "East Promenade Gate 2", peopleCount: 520, density: 2.4, speed: 1.1, risk: "Safe" },
    { id: "cam-4", name: "Camera 4 — West Transit Corridor", location: "Gate 4 Transit Exit", peopleCount: 610, density: 3.2, speed: 0.8, risk: "Warning" }
  ];

  const venue = telemetry?.venue || {};
  const cameraFeeds = (telemetry?.cameraFeeds && telemetry.cameraFeeds.length > 0) ? telemetry.cameraFeeds : defaultCameraFeeds;
  const riskInfo = telemetry?.risk || { score: 18, badge: "SAFE", color: "#00C853", reasons: ["Baseline safe flow"] };
  const alerts = telemetry?.alerts || [];
  const vehicles = telemetry?.vehicles || [];

  return (
    <div className="min-h-screen bg-[#09090B] text-slate-100 flex flex-col font-sans">
      {/* Role Navigation Switcher Bar */}
      <RoleSwitcherBar activeRole={activeRole} onSelectRole={setActiveRole} />

      {/* Mount Dashboard corresponding to Active Role */}
      {activeRole === 'super_admin' && (
        <SuperAdminDashboard
          venue={venue}
          cameraFeeds={cameraFeeds}
          riskInfo={riskInfo}
          alerts={alerts}
          vehicles={vehicles}
          onTriggerStep={handleTriggerStep}
          onResetSim={handleResetSim}
          currentStepIndex={currentStepIndex}
        />
      )}

      {activeRole === 'control_room' && (
        <ControlRoomDashboard
          venue={venue}
          cameraFeeds={cameraFeeds}
          riskInfo={riskInfo}
          alerts={alerts}
          vehicles={vehicles}
          onDispatch={handleDispatchService}
          onTriggerStep={handleTriggerStep}
          onResetSim={handleResetSim}
          onOpenReport={() => setIsReportOpen(true)}
          onOpenCameraModal={handleOpenCameraModal}
          selectedCamForModal={selectedCamForModal}
          isCamModalOpen={isCamModalOpen}
          onCloseCamModal={() => setIsCamModalOpen(false)}
          isAIModalOpen={isAIModalOpen}
          onCloseAIModal={() => setIsAIModalOpen(false)}
          aiPopupData={telemetry?.simulationMode?.stepData?.popup}
          onApproveAI={() => handleDispatchService('ai_approve')}
        />
      )}

      {activeRole === 'police' && (
        <PoliceDashboard
          venue={venue}
          vehicles={vehicles}
          onDispatch={handleDispatchService}
        />
      )}

      {activeRole === 'hospital' && (
        <HospitalDashboard
          venue={venue}
          vehicles={vehicles}
          onDispatch={handleDispatchService}
        />
      )}

      {activeRole === 'traffic' && (
        <TrafficDashboard
          venue={venue}
          vehicles={vehicles}
          onDispatch={handleDispatchService}
        />
      )}

      {activeRole === 'drone' && (
        <DroneDashboard
          venue={venue}
          vehicles={vehicles}
        />
      )}

      {/* PDF Post-Incident Report Generator Modal */}
      <IncidentReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        currentCrowd={venue.currentTotalCrowd}
        riskScore={riskInfo.score}
      />
    </div>
  );
}
