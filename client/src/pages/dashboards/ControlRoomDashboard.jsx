import React, { useState } from 'react';
import { 
  Building, 
  AlertTriangle, 
  DoorOpen, 
  DoorClosed, 
  Video, 
  FileText, 
  Sparkles, 
  Volume2, 
  Radio, 
  CheckCircle2, 
  ShieldAlert 
} from 'lucide-react';

import DelhiMap from '../../components/DelhiMap';
import CameraFeeds from '../../components/CameraFeeds';
import WhatsAppNotifications from '../../components/WhatsAppNotifications';
import SmartCameraManagerModal from '../../components/SmartCameraManagerModal';
import AIApprovalModal from '../../components/AIApprovalModal';

export default function ControlRoomDashboard({ 
  venue, 
  cameraFeeds, 
  riskInfo, 
  alerts, 
  vehicles, 
  onDispatch, 
  onTriggerStep, 
  onResetSim, 
  onOpenReport,
  onOpenCameraModal,
  selectedCamForModal,
  isCamModalOpen,
  onCloseCamModal,
  isAIModalOpen,
  onCloseAIModal,
  aiPopupData,
  onApproveAI
}) {
  const [activeCamId, setActiveCamId] = useState('cam-1');

  return (
    <div className={`min-h-screen bg-[#18181B] text-slate-100 flex flex-col font-sans p-4 space-y-4 ${
      riskInfo.score > 80 ? 'animate-emergency-strobe border-4 border-[#FF3B30]' : ''
    }`}>
      {/* TOP HEADER: Mission Control Status */}
      <div className="bg-[#09090B] p-4 rounded-2xl border border-zinc-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[#00E5FF]">
            <Building className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-orbitron font-extrabold text-white flex items-center gap-2">
              NASA MISSION CONTROL — CROWDSHIELD COMMAND BRAIN
            </h1>
            <p className="text-xs font-mono-tech text-zinc-400">Current Incident: Stadium Concourse Density • Target: Arun Jaitley Stadium</p>
          </div>
        </div>

        {/* Large Color Risk Badge */}
        <div className="flex items-center gap-4">
          <div className={`px-4 py-2 rounded-xl font-orbitron font-extrabold text-lg border flex items-center gap-2 shadow-lg ${
            riskInfo.score > 80 ? 'bg-red-950 border-[#FF3B30] text-[#FF3B30] animate-pulse' :
            riskInfo.score > 60 ? 'bg-amber-950 border-[#FFC107] text-[#FFC107]' : 'bg-emerald-950 border-[#00C853] text-[#00C853]'
          }`}>
            <span>{riskInfo.badge || "SAFE"}</span>
            <span className="text-2xl font-mono-tech">{riskInfo.score || 18}</span>
          </div>
        </div>
      </div>

      {/* TACTICAL ACTION BUTTONS BAR */}
      <div className="flex flex-wrap items-center gap-2 bg-[#09090B] p-2.5 rounded-xl border border-zinc-800 font-mono-tech text-xs">
        <button
          type="button"
          onClick={() => onDispatch('police')}
          className="px-3.5 py-2 rounded-lg bg-[#FF3B30] text-black font-orbitron font-bold hover:bg-red-400 transition-all flex items-center gap-1.5 shadow-md"
        >
          <AlertTriangle className="w-4 h-4" /> ACTIVATE EMERGENCY
        </button>

        <button
          type="button"
          onClick={() => onDispatch('ai_approve')}
          className="px-3.5 py-2 rounded-lg bg-[#00E5FF] text-black font-orbitron font-bold hover:bg-cyan-300 transition-all flex items-center gap-1.5 shadow-md"
        >
          <Sparkles className="w-4 h-4" /> AI RECOMMENDATION
        </button>

        <button
          type="button"
          onClick={() => onDispatch('green_corridor')}
          className="px-3 py-2 rounded-lg bg-emerald-950 border border-[#00C853] text-[#00C853] hover:bg-[#00C853] hover:text-black transition-all flex items-center gap-1"
        >
          <DoorOpen className="w-4 h-4" /> OPEN EXIT GATE 3
        </button>

        <button
          type="button"
          onClick={() => onDispatch('police')}
          className="px-3 py-2 rounded-lg bg-red-950 border border-[#FF3B30] text-[#FF3B30] hover:bg-[#FF3B30] hover:text-black transition-all flex items-center gap-1"
        >
          <DoorClosed className="w-4 h-4" /> CLOSE EXIT GATE 1
        </button>

        <button
          type="button"
          onClick={onOpenReport}
          className="px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200 hover:text-white transition-all flex items-center gap-1 ml-auto"
        >
          <FileText className="w-4 h-4 text-[#00E5FF]" /> INCIDENT REPORT
        </button>
      </div>

      {/* MAIN 3-PANEL LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1">
        {/* LEFT PANEL: Camera Feeds (3 Cols) */}
        <div className="lg:col-span-3 h-[500px]" onClick={() => onOpenCameraModal(cameraFeeds[0])}>
          <CameraFeeds
            cameraFeeds={cameraFeeds}
            activeCamId={activeCamId}
            setActiveCamId={setActiveCamId}
          />
        </div>

        {/* CENTER CANVAS: BIG INTERACTIVE MAP (6 Cols) */}
        <div className="lg:col-span-6 h-[500px]">
          <DelhiMap
            gates={venue.gates}
            vehicles={vehicles}
            greenCorridorActive={venue.emergencyServices?.trafficCorridor?.greenCorridorActive}
            emergencyActive={riskInfo.score > 80}
            riskBadge={riskInfo.badge}
          />
        </div>

        {/* RIGHT PANEL: Incident Details & Action Center (3 Cols) */}
        <div className="lg:col-span-3 glass-panel p-4 rounded-xl border border-zinc-800 flex flex-col justify-between space-y-3 font-mono-tech text-xs">
          <div className="font-orbitron font-bold text-white text-sm border-b border-zinc-800 pb-2 flex items-center gap-2">
            <Radio className="w-4 h-4 text-[#00E5FF] animate-pulse" />
            <span>INCIDENT ACTION CENTER</span>
          </div>

          <div className="space-y-2 flex-1 overflow-y-auto">
            <div className="bg-[#09090B] p-2.5 rounded-lg border border-zinc-800">
              <div className="text-zinc-500 uppercase text-[10px]">What Happened?</div>
              <div className="text-white font-bold text-xs mt-0.5">Gate 1 Bottleneck & Rain Surge</div>
            </div>

            <div className="bg-[#09090B] p-2.5 rounded-lg border border-zinc-800">
              <div className="text-zinc-500 uppercase text-[10px]">Where?</div>
              <div className="text-[#00E5FF] font-bold text-xs mt-0.5">Arun Jaitley Stadium Gate 1</div>
            </div>

            <div className="bg-[#09090B] p-2.5 rounded-lg border border-zinc-800">
              <div className="text-zinc-500 uppercase text-[10px]">How Dangerous?</div>
              <div className="font-bold text-xs mt-0.5" style={{ color: riskInfo.color }}>
                {riskInfo.badge} — Risk Score {riskInfo.score}/100
              </div>
            </div>

            <div className="bg-[#09090B] p-2.5 rounded-lg border border-zinc-800">
              <div className="text-zinc-500 uppercase text-[10px]">What Action Should Be Taken?</div>
              <div className="text-emerald-400 font-bold text-xs mt-0.5">Divert crowd to Gate 3 & open Green Corridor</div>
            </div>

            <div className="bg-[#09090B] p-2.5 rounded-lg border border-zinc-800">
              <div className="text-zinc-500 uppercase text-[10px]">Who Is Responsible?</div>
              <div className="text-white font-bold text-xs mt-0.5">Control Room & Police Unit 01</div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM PANEL: Live WhatsApp Alert Feed */}
      <div className="h-44">
        <WhatsAppNotifications alerts={alerts} />
      </div>

      {/* Full Screen Camera Manager Modal */}
      <SmartCameraManagerModal
        camera={selectedCamForModal}
        isOpen={isCamModalOpen}
        onClose={onCloseCamModal}
      />

      {/* Huge AI Recommendation Approval Modal */}
      <AIApprovalModal
        isOpen={isAIModalOpen || riskInfo.score > 80}
        popupData={aiPopupData || {
          title: "⚠ HIGH CROWD RISK — PREDICTED STAMPEDE",
          confidence: "96%",
          recommendedActions: [
            "Redirect Crowd to Gate 3 & Gate 2",
            "Open Gate 3 (South Metro)",
            "Close Gate 1 Entry",
            "Notify Police Patrol Unit 01",
            "Alert LNJP Hospital Emergency"
          ],
          whyExplanation: {
            predictedInjuries: 12,
            distanceToHospital: "850 m",
            trafficStatus: "Heavy on Vikas Marg",
            confidence: "96%"
          }
        }}
        onApprove={onApproveAI}
        onReject={onCloseAIModal}
      />
    </div>
  );
}
