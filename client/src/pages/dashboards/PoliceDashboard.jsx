import React, { useState } from 'react';
import { ShieldAlert, Shield, Users, Clock, MapPin, Check, X, AlertTriangle, Navigation } from 'lucide-react';
import DelhiMap from '../../components/DelhiMap';

export default function PoliceDashboard({ venue, vehicles, onDispatch }) {
  const [dispatchedUnit1, setDispatchedUnit1] = useState(false);
  const [dispatchedUnit2, setDispatchedUnit2] = useState(false);

  const handleDispatchPolice = (unitNum) => {
    if (unitNum === 1) setDispatchedUnit1(true);
    if (unitNum === 2) setDispatchedUnit2(true);
    onDispatch('police');
  };

  return (
    <div className="min-h-screen bg-[#0B192C] text-slate-100 flex flex-col font-sans p-4 space-y-4">
      {/* Header Bar */}
      <div className="bg-[#1E3E62]/40 p-4 rounded-2xl border border-blue-500/40 flex flex-wrap items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-950 border border-blue-400 flex items-center justify-center text-blue-400">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-orbitron font-extrabold text-white flex items-center gap-2">
              DELHI POLICE TACTICAL COMMAND
            </h1>
            <p className="text-xs font-mono-tech text-blue-300">Rapid Response Unit • Perimeter Crowd Control & Patrol Dispatch</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex items-center gap-4 font-mono-tech text-xs">
          <div className="bg-blue-950/80 px-3 py-1.5 rounded-lg border border-blue-400 text-blue-200">
            OFFICERS AVAILABLE: <strong className="text-white text-sm">140</strong>
          </div>
          <div className="bg-blue-950/80 px-3 py-1.5 rounded-lg border border-blue-400 text-blue-200">
            ACTIVE UNITS: <strong className="text-white text-sm">2</strong>
          </div>
        </div>
      </div>

      {/* Police Quick Action Controls */}
      <div className="flex flex-wrap gap-2.5 bg-[#1E3E62]/30 p-2.5 rounded-xl border border-blue-500/30 font-mono-tech text-xs">
        <button
          type="button"
          onClick={() => handleDispatchPolice(1)}
          className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-orbitron font-bold flex items-center gap-2 shadow-md transition-all"
        >
          <ShieldAlert className="w-4 h-4" /> DISPATCH RAPID FORCE
        </button>

        <button
          type="button"
          onClick={() => onDispatch('police')}
          className="px-4 py-2 rounded-lg bg-blue-950 border border-blue-400 text-blue-300 hover:bg-blue-800 hover:text-white flex items-center gap-1.5"
        >
          <Users className="w-4 h-4" /> REQUEST BACKUP (15 OFFICERS)
        </button>

        <button
          type="button"
          onClick={() => onDispatch('police')}
          className="px-4 py-2 rounded-lg bg-blue-950 border border-blue-400 text-blue-300 hover:bg-blue-800 hover:text-white flex items-center gap-1.5"
        >
          <Shield className="w-4 h-4" /> ERECT BARRICADE AT GATE 1
        </button>

        <button
          type="button"
          onClick={() => onDispatch('police')}
          className="px-4 py-2 rounded-lg bg-red-950 border border-red-500 text-red-300 hover:bg-red-800 hover:text-white flex items-center gap-1.5"
        >
          <AlertTriangle className="w-4 h-4" /> CLOSE PERIMETER ROAD
        </button>
      </div>

      {/* Main Grid: Map & Police Dispatch Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1">
        {/* Left Interactive Map with Moving Police Vehicles (8 Cols) */}
        <div className="lg:col-span-8 h-[520px]">
          <DelhiMap
            gates={venue.gates}
            vehicles={vehicles}
            greenCorridorActive={venue.emergencyServices?.trafficCorridor?.greenCorridorActive}
            emergencyActive={false}
            riskBadge="POLICE DISPATCH"
          />
        </div>

        {/* Right Police Unit Dispatch Panel (4 Cols) */}
        <div className="lg:col-span-4 space-y-3 font-mono-tech text-xs">
          {/* Dispatch Unit Card 1 */}
          <div className="bg-[#1E3E62]/40 p-4 rounded-xl border border-blue-400/50 space-y-2">
            <div className="flex items-center justify-between text-blue-200">
              <span className="font-bold text-white text-sm flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-blue-400" /> INCIDENT: Gate 1 North
              </span>
              <span className="bg-red-950 border border-red-500 text-red-400 px-2 py-0.5 rounded text-[10px] font-bold">
                HIGH PRIORITY
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 bg-black/40 p-2.5 rounded-lg border border-blue-900/60 text-zinc-300">
              <div>Required Officers: <strong className="text-white text-sm">25</strong></div>
              <div>Available: <strong className="text-emerald-400 text-sm">32</strong></div>
              <div>Distance: <strong className="text-blue-300">850 meters</strong></div>
              <div>ETA: <strong className="text-amber-400">2 min</strong></div>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                type="button"
                onClick={() => handleDispatchPolice(1)}
                className={`flex-1 py-2.5 rounded-lg font-orbitron font-bold text-xs transition-all flex items-center justify-center gap-1.5 ${
                  dispatchedUnit1
                    ? 'bg-emerald-600 text-white'
                    : 'bg-blue-500 hover:bg-blue-400 text-black shadow-md'
                }`}
              >
                <Check className="w-4 h-4" /> {dispatchedUnit1 ? "DISPATCHED (EN ROUTE)" : "DISPATCH — YES"}
              </button>
              <button
                type="button"
                className="px-4 py-2.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white font-mono-tech text-xs"
              >
                NO
              </button>
            </div>
          </div>

          {/* Dispatch Unit Card 2 */}
          <div className="bg-[#1E3E62]/40 p-4 rounded-xl border border-blue-400/50 space-y-2">
            <div className="flex items-center justify-between text-blue-200">
              <span className="font-bold text-white text-sm flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-blue-400" /> INCIDENT: Metro Junction
              </span>
              <span className="bg-amber-950 border border-amber-500 text-amber-400 px-2 py-0.5 rounded text-[10px] font-bold">
                STANDBY
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 bg-black/40 p-2.5 rounded-lg border border-blue-900/60 text-zinc-300">
              <div>Required Officers: <strong className="text-white text-sm">40</strong></div>
              <div>Available: <strong className="text-emerald-400 text-sm">45</strong></div>
              <div>Distance: <strong className="text-blue-300">1.4 km</strong></div>
              <div>ETA: <strong className="text-amber-400">4 min</strong></div>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                type="button"
                onClick={() => handleDispatchPolice(2)}
                className={`flex-1 py-2.5 rounded-lg font-orbitron font-bold text-xs transition-all flex items-center justify-center gap-1.5 ${
                  dispatchedUnit2
                    ? 'bg-emerald-600 text-white'
                    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md'
                }`}
              >
                <Check className="w-4 h-4" /> {dispatchedUnit2 ? "DISPATCHED (EN ROUTE)" : "DISPATCH — YES"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
