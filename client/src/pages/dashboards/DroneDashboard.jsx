import React, { useState } from 'react';
import { Video, Crosshair, Battery, Compass, Eye, Shield, AlertCircle, RotateCcw, Zap } from 'lucide-react';
import DelhiMap from '../../components/DelhiMap';

export default function DroneDashboard({ venue, vehicles }) {
  const [thermalMode, setThermalMode] = useState(false);
  const [nightMode, setNightMode] = useState(false);
  const [zoomLevel, setZoomLevel] = useState('2x');
  const [trackingTarget, setTrackingTarget] = useState('Crowd Surge');

  return (
    <div className={`min-h-screen text-slate-100 flex flex-col font-mono-tech p-4 space-y-4 relative ${
      thermalMode ? 'bg-[#1e0a29]' : nightMode ? 'bg-[#031d17]' : 'bg-[#000000]'
    }`}>
      {/* Top Drone HUD Telemetry Bar */}
      <div className="bg-black/90 p-4 rounded-2xl border border-cyan-500/40 flex flex-wrap items-center justify-between gap-4 shadow-[0_0_30px_rgba(0,229,255,0.2)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-[#00E5FF] flex items-center justify-center text-[#00E5FF] animate-pulse">
            <Video className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-orbitron font-extrabold text-white flex items-center gap-2">
              RECON DRONE COMMAND — UNIT FALCON 01
              <span className="text-xs bg-cyan-950 text-[#00E5FF] px-2 py-0.5 rounded border border-[#00E5FF]">4K OPTICAL STREAM</span>
            </h1>
            <p className="text-xs text-zinc-400">Delhi Smart City Aerial Reconnaissance • Mission: Stadium Concourse Track</p>
          </div>
        </div>

        {/* Live HUD Telemetry Indicators */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono-tech">
          <div className="flex items-center gap-1.5 text-[#00C853] bg-emerald-950/80 px-3 py-1.5 rounded border border-[#00C853]">
            <Battery className="w-4 h-4" /> BATTERY: <strong className="text-white">94%</strong>
          </div>
          <div className="flex items-center gap-1.5 text-[#00E5FF] bg-cyan-950/80 px-3 py-1.5 rounded border border-[#00E5FF]">
            <Compass className="w-4 h-4" /> ALT: <strong className="text-white">120m</strong>
          </div>
          <div className="flex items-center gap-1.5 text-amber-400 bg-amber-950/80 px-3 py-1.5 rounded border border-[#FFC107]">
            SPEED: <strong className="text-white">42 km/h</strong>
          </div>
        </div>
      </div>

      {/* Drone Tactical Controls */}
      <div className="flex flex-wrap gap-2.5 bg-black p-2.5 rounded-xl border border-zinc-800 text-xs">
        <button
          type="button"
          onClick={() => setThermalMode(!thermalMode)}
          className={`px-4 py-2 rounded-lg font-bold border transition-all ${
            thermalMode ? 'bg-purple-600 text-white border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.6)]' : 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:text-white'
          }`}
        >
          🔥 THERMAL MODE {thermalMode ? 'ACTIVE' : ''}
        </button>

        <button
          type="button"
          onClick={() => setNightMode(!nightMode)}
          className={`px-4 py-2 rounded-lg font-bold border transition-all ${
            nightMode ? 'bg-emerald-600 text-white border-emerald-400 shadow-[0_0_15px_rgba(0,200,83,0.6)]' : 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:text-white'
          }`}
        >
          🌙 NIGHT VISION {nightMode ? 'ACTIVE' : ''}
        </button>

        <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-lg border border-zinc-700">
          <span className="text-zinc-400 px-2">ZOOM:</span>
          {['1x', '2x', '4x', '8x'].map(z => (
            <button
              key={z}
              type="button"
              onClick={() => setZoomLevel(z)}
              className={`px-2.5 py-1 rounded text-xs ${zoomLevel === z ? 'bg-[#00E5FF] text-black font-bold' : 'text-zinc-400'}`}
            >
              {z}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setTrackingTarget('Crowd Surge Gate 1')}
          className="px-3 py-2 rounded-lg bg-cyan-950 border border-[#00E5FF] text-[#00E5FF] hover:bg-[#00E5FF] hover:text-black"
        >
          🎯 FOLLOW CROWD
        </button>

        <button
          type="button"
          onClick={() => setTrackingTarget('Ambulance 01')}
          className="px-3 py-2 rounded-lg bg-red-950 border border-red-500 text-red-300 hover:bg-red-500 hover:text-black"
        >
          🚑 FOLLOW AMBULANCE
        </button>

        <button
          type="button"
          onClick={() => setTrackingTarget('Police Unit 01')}
          className="px-3 py-2 rounded-lg bg-blue-950 border border-blue-500 text-blue-300 hover:bg-blue-500 hover:text-black"
        >
          🚔 FOLLOW POLICE
        </button>

        <button
          type="button"
          className="px-3 py-2 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white ml-auto"
        >
          <RotateCcw className="w-3.5 h-3.5 inline mr-1" /> RETURN HOME
        </button>
      </div>

      {/* Main Full-Screen Drone HUD View (80vh) */}
      <div className="relative h-[560px] rounded-xl overflow-hidden border-2 border-cyan-500/50 shadow-[0_0_40px_rgba(0,229,255,0.3)]">
        {/* Drone HUD Overlay reticle */}
        <div className="absolute inset-0 z-20 pointer-events-none p-4 flex flex-col justify-between scanline border-4 border-cyan-500/30">
          <div className="flex justify-between items-start text-xs font-mono-tech text-[#00E5FF]">
            <div className="bg-black/80 p-2.5 rounded border border-[#00E5FF]/40">
              <div>DRONE ID: FALCON-01</div>
              <div>STREAM: 4K @ 60 FPS</div>
              <div>TRACKING: <strong className="text-white">{trackingTarget}</strong></div>
              <div>ZOOM: {zoomLevel}</div>
            </div>
            <div className="bg-black/80 p-2.5 rounded border border-[#00E5FF]/40 text-right">
              <div>LAT: 28.6410° N</div>
              <div>LNG: 77.2450° E</div>
              <div>PITCH: -45.0°</div>
              <div>GPS: LOCK (14 SATS)</div>
            </div>
          </div>

          {/* Center Target Crosshair */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
            <div className="w-40 h-40 border border-[#00E5FF]/50 rounded-full flex items-center justify-center animate-pulse">
              <Crosshair className="w-14 h-14 text-[#00E5FF]" />
            </div>
          </div>

          <div className="bg-black/70 py-1.5 px-4 rounded text-center text-xs font-mono-tech text-[#00E5FF] border border-[#00E5FF]/40">
            [LIVE RECON STREAM AUTOMATICALLY SYNCED TO CONTROL ROOM MISSION CONTROL]
          </div>
        </div>

        {/* Map Underlying Stream */}
        <DelhiMap
          gates={venue.gates}
          vehicles={vehicles}
          greenCorridorActive={venue.emergencyServices?.trafficCorridor?.greenCorridorActive}
          emergencyActive={false}
          riskBadge="DRONE HUD"
        />
      </div>
    </div>
  );
}
