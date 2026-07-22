import React, { useState } from 'react';
import { Navigation, Zap, AlertTriangle, Check, Shield, Radio } from 'lucide-react';
import DelhiMap from '../../components/DelhiMap';

export default function TrafficDashboard({ venue, vehicles, onDispatch }) {
  const [corridorActive, setCorridorActive] = useState(venue.emergencyServices?.trafficCorridor?.greenCorridorActive || false);

  const handleToggleCorridor = () => {
    setCorridorActive(!corridorActive);
    onDispatch('green_corridor');
  };

  return (
    <div className="min-h-screen bg-[#431407]/90 text-slate-100 flex flex-col font-sans p-4 space-y-4">
      {/* Header Bar */}
      <div className="bg-[#7C2D12] p-4 rounded-2xl border border-[#FF6B00]/50 flex flex-wrap items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-950 border border-[#FF6B00] flex items-center justify-center text-[#FF6B00]">
            <Navigation className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-orbitron font-extrabold text-white flex items-center gap-2">
              DELHI TRAFFIC CONTROL HQ — GREEN CORRIDOR ENGINE
            </h1>
            <p className="text-xs font-mono-tech text-orange-200">Perimeter Arterial Signal Override & Emergency Lane Management</p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-3 font-mono-tech text-xs">
          <span className="text-orange-200">CORRIDOR STATUS:</span>
          <span className={`px-3 py-1 rounded font-bold text-sm border ${
            corridorActive ? 'bg-emerald-950 border-[#00C853] text-[#00C853] animate-pulse' : 'bg-orange-950 border-[#FF6B00] text-[#FF6B00]'
          }`}>
            {corridorActive ? "🚦 GREEN CORRIDOR ENGAGED" : "STANDARD SIGNAL CYCLE"}
          </span>
        </div>
      </div>

      {/* 4 Traffic Telemetry Widgets */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono-tech">
        <div className="bg-[#7C2D12]/70 p-3 rounded-xl border border-orange-500/40">
          <div className="text-[10px] text-orange-200 uppercase">Arterial Road Status</div>
          <div className="text-lg font-orbitron font-bold text-white mt-1">Vikas Marg Clear</div>
          <div className="text-[10px] text-emerald-400">Optimal Throughput</div>
        </div>

        <div className="bg-[#7C2D12]/70 p-3 rounded-xl border border-orange-500/40">
          <div className="text-[10px] text-orange-200 uppercase">Traffic Signals</div>
          <div className="text-lg font-orbitron font-bold text-[#FF6B00] mt-1">12 Signals Overridden</div>
          <div className="text-[10px] text-orange-300">Phase Hold Active</div>
        </div>

        <div className="bg-[#7C2D12]/70 p-3 rounded-xl border border-orange-500/40">
          <div className="text-[10px] text-orange-200 uppercase">Priority Emergency Lane</div>
          <div className="text-lg font-orbitron font-bold text-[#00C853] mt-1">Lane 1 Reserved</div>
          <div className="text-[10px] text-emerald-300">Stadium -&gt; LNJP</div>
        </div>

        <div className="bg-[#7C2D12]/70 p-3 rounded-xl border border-orange-500/40">
          <div className="text-[10px] text-orange-200 uppercase">Perimeter Diversions</div>
          <div className="text-lg font-orbitron font-bold text-white mt-1">2 Diversions Open</div>
          <div className="text-[10px] text-orange-200">Outer Ring Bypass</div>
        </div>
      </div>

      {/* Action Buttons Bar */}
      <div className="flex flex-wrap gap-2.5 bg-[#7C2D12]/60 p-2.5 rounded-xl border border-orange-500/40 font-mono-tech text-xs">
        <button
          type="button"
          onClick={handleToggleCorridor}
          className={`px-5 py-2.5 rounded-xl font-orbitron font-extrabold text-xs transition-all flex items-center gap-2 shadow-lg ${
            corridorActive
              ? 'bg-[#00C853] text-black shadow-[0_0_20px_rgba(0,200,83,0.6)]'
              : 'bg-[#FF6B00] text-black hover:bg-orange-400 shadow-[0_0_20px_rgba(255,107,0,0.4)]'
          }`}
        >
          <Zap className="w-4 h-4" /> {corridorActive ? "DEACTIVATE GREEN CORRIDOR" : "ACTIVATE GREEN CORRIDOR"}
        </button>

        <button
          type="button"
          onClick={() => onDispatch('green_corridor')}
          className="px-4 py-2.5 rounded-xl bg-orange-950 border border-[#FF6B00] text-[#FF6B00] hover:bg-[#FF6B00] hover:text-black flex items-center gap-1.5"
        >
          <AlertTriangle className="w-4 h-4" /> CLOSE STADIUM ROAD
        </button>

        <button
          type="button"
          onClick={() => onDispatch('green_corridor')}
          className="px-4 py-2.5 rounded-xl bg-orange-950 border border-[#FF6B00] text-[#FF6B00] hover:bg-[#FF6B00] hover:text-black flex items-center gap-1.5"
        >
          <Navigation className="w-4 h-4" /> OPEN METRO DIVERSION
        </button>
      </div>

      {/* Main Grid: Interactive Map with Green Corridor Polyline (Full width) */}
      <div className="h-[520px] flex-1">
        <DelhiMap
          gates={venue.gates}
          vehicles={vehicles}
          greenCorridorActive={corridorActive}
          emergencyActive={corridorActive}
          riskBadge={corridorActive ? "GREEN CORRIDOR" : "TRAFFIC CONTROL"}
        />
      </div>
    </div>
  );
}
