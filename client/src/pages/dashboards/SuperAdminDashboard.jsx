import React, { useState } from 'react';
import { Shield, Eye, Users, FileText, Activity, AlertTriangle, Sparkles, Map, Database } from 'lucide-react';
import DelhiMap from '../../components/DelhiMap';

export default function SuperAdminDashboard({ venue, cameraFeeds, riskInfo, alerts, vehicles, onTriggerStep, onResetSim, currentStepIndex }) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-[#070D19] text-slate-100 flex flex-col font-sans p-4 space-y-4">
      {/* Top Header */}
      <div className="glass-panel-cyan p-4 rounded-2xl border border-[#00E5FF]/40 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-[#00E5FF] flex items-center justify-center text-[#00E5FF]">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-orbitron font-extrabold text-white flex items-center gap-2">
              SUPER ADMIN — CITYWIDE MONITORING CONTROL
              <span className="text-xs font-mono-tech bg-cyan-950 border border-[#00E5FF] text-[#00E5FF] px-2 py-0.5 rounded">READ ONLY MONITOR</span>
            </h1>
            <p className="text-xs font-mono-tech text-cyan-300">Complete Delhi Metropolis Emergency Sensor Grid & User Management</p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-3 font-mono-tech text-xs">
          <span className="text-zinc-400">CITY RISK INDEX:</span>
          <span className="px-3 py-1 rounded font-bold text-sm bg-cyan-950 border border-[#00E5FF] text-[#00E5FF]">
            {riskInfo.badge || "SAFE"} ({riskInfo.score || 18})
          </span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1">
        {/* Left Map View (8 Cols) */}
        <div className="lg:col-span-8 h-[520px]">
          <DelhiMap
            gates={venue.gates}
            vehicles={vehicles}
            greenCorridorActive={venue.emergencyServices?.trafficCorridor?.greenCorridorActive}
            emergencyActive={riskInfo.score > 80}
            riskBadge={riskInfo.badge}
          />
        </div>

        {/* Right Admin Sensor Overview Panel (4 Cols) */}
        <div className="lg:col-span-4 glass-panel p-4 rounded-xl border border-zinc-800 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800 text-xs font-orbitron font-bold text-white">
            <span>CITY EMERGENCY SERVICES SENSORS</span>
            <span className="text-[#00E5FF]">100% ONLINE</span>
          </div>

          <div className="space-y-3 font-mono-tech text-xs flex-1 overflow-y-auto">
            <div className="bg-[#09090B] p-3 rounded-lg border border-zinc-800">
              <div className="text-zinc-400 text-[10px] uppercase mb-1">Total Monitored Crowd</div>
              <div className="text-2xl font-orbitron font-bold text-[#00E5FF]">
                {venue.currentTotalCrowd ? venue.currentTotalCrowd.toLocaleString() : "48,250"}
              </div>
              <div className="text-[10px] text-emerald-400 mt-1">4 Venue Gates Active</div>
            </div>

            <div className="bg-[#09090B] p-3 rounded-lg border border-zinc-800">
              <div className="text-zinc-400 text-[10px] uppercase mb-1">Hospitals & Beds</div>
              <div className="text-lg font-orbitron font-bold text-white">3 Trauma Hubs • 55 Beds</div>
              <div className="text-[10px] text-cyan-300 mt-1">AIIMS, LNJP, G.B. Pant</div>
            </div>

            <div className="bg-[#09090B] p-3 rounded-lg border border-zinc-800">
              <div className="text-zinc-400 text-[10px] uppercase mb-1">Police Units & Patrols</div>
              <div className="text-lg font-orbitron font-bold text-white">140 Officers • 2 Patrols</div>
              <div className="text-[10px] text-cyan-300 mt-1">Delhi Police Central Station</div>
            </div>
          </div>

          {/* Admin Policy Reminder */}
          <div className="p-3 bg-cyan-950/40 border border-[#00E5FF]/40 rounded-lg text-xs font-mono-tech text-cyan-200">
            <strong>ADMIN POLICY NOTICE:</strong> Super Admin monitors city telemetry. Dispatch operations are handled autonomously by ground commander roles.
          </div>
        </div>
      </div>
    </div>
  );
}
