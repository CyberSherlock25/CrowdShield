import React, { useState } from 'react';
import { Hospital, Ambulance, Stethoscope, Droplet, Check, X, AlertCircle, HeartPulse, User } from 'lucide-react';
import DelhiMap from '../../components/DelhiMap';

export default function HospitalDashboard({ venue, vehicles, onDispatch }) {
  const [dispatchedAmb1, setDispatchedAmb1] = useState(false);
  const [dispatchedAmb2, setDispatchedAmb2] = useState(false);

  const handleDispatchAmb = (ambNum) => {
    if (ambNum === 1) setDispatchedAmb1(true);
    if (ambNum === 2) setDispatchedAmb2(true);
    onDispatch('ambulance', `Gate 1 Medical Bay (Amb ${ambNum})`);
  };

  return (
    <div className="min-h-screen bg-[#064E3B]/90 text-slate-100 flex flex-col font-sans p-4 space-y-4">
      {/* Top Header */}
      <div className="bg-[#022C22] p-4 rounded-2xl border border-[#00C853]/40 flex flex-wrap items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-[#00C853] flex items-center justify-center text-[#00C853]">
            <Hospital className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-orbitron font-extrabold text-white flex items-center gap-2">
              LNJP & AIIMS TRAUMA EMERGENCY CONTROL
            </h1>
            <p className="text-xs font-mono-tech text-emerald-300">Live Casualty Pipeline & Emergency Ambulance Logistics</p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-3 font-mono-tech text-xs">
          <div className="bg-emerald-950 px-3 py-1.5 rounded-lg border border-[#00C853] text-emerald-200">
            TRAUMA WARDS: <strong className="text-white text-sm">READY</strong>
          </div>
        </div>
      </div>

      {/* 5 Top Hospital Telemetry Widgets */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 font-mono-tech">
        <div className="bg-[#022C22] p-3 rounded-xl border border-emerald-500/40">
          <div className="text-[10px] text-zinc-400 uppercase">Available Beds</div>
          <div className="text-2xl font-orbitron font-bold text-[#00C853] mt-1">18</div>
          <div className="text-[10px] text-emerald-300">General Ward</div>
        </div>

        <div className="bg-[#022C22] p-3 rounded-xl border border-emerald-500/40">
          <div className="text-[10px] text-zinc-400 uppercase">ICU Beds</div>
          <div className="text-2xl font-orbitron font-bold text-amber-400 mt-1">6</div>
          <div className="text-[10px] text-amber-300">Critical Care</div>
        </div>

        <div className="bg-[#022C22] p-3 rounded-xl border border-emerald-500/40">
          <div className="text-[10px] text-zinc-500 uppercase">On-Duty Doctors</div>
          <div className="text-2xl font-orbitron font-bold text-white mt-1">18</div>
          <div className="text-[10px] text-emerald-300">Surgeons Ready</div>
        </div>

        <div className="bg-[#022C22] p-3 rounded-xl border border-emerald-500/40">
          <div className="text-[10px] text-zinc-400 uppercase">Ambulances</div>
          <div className="text-2xl font-orbitron font-bold text-[#00E5FF] mt-1">4</div>
          <div className="text-[10px] text-cyan-300">Fleet Ready</div>
        </div>

        <div className="bg-[#022C22] p-3 rounded-xl border border-emerald-500/40">
          <div className="text-[10px] text-zinc-400 uppercase">Blood Units</div>
          <div className="text-2xl font-orbitron font-bold text-red-400 mt-1">65</div>
          <div className="text-[10px] text-red-300">O-Negative Ready</div>
        </div>
      </div>

      {/* Action Buttons Bar */}
      <div className="flex flex-wrap gap-2.5 bg-[#022C22] p-2.5 rounded-xl border border-emerald-500/30 font-mono-tech text-xs">
        <button
          type="button"
          onClick={() => handleDispatchAmb(1)}
          className="px-4 py-2 rounded-lg bg-[#00C853] text-black font-orbitron font-bold hover:bg-emerald-300 flex items-center gap-1.5 shadow-md"
        >
          <Ambulance className="w-4 h-4" /> DISPATCH AMBULANCE 01
        </button>

        <button
          type="button"
          onClick={() => onDispatch('ambulance')}
          className="px-4 py-2 rounded-lg bg-emerald-950 border border-[#00C853] text-[#00C853] hover:bg-[#00C853] hover:text-black flex items-center gap-1.5"
        >
          <Droplet className="w-4 h-4" /> REQUEST BLOOD UNITS
        </button>

        <button
          type="button"
          onClick={() => onDispatch('ambulance')}
          className="px-4 py-2 rounded-lg bg-emerald-950 border border-[#00C853] text-[#00C853] hover:bg-[#00C853] hover:text-black flex items-center gap-1.5"
        >
          <Stethoscope className="w-4 h-4" /> NOTIFY TRAUMA SURGEONS
        </button>

        <button
          type="button"
          onClick={() => onDispatch('green_corridor')}
          className="px-4 py-2 rounded-lg bg-cyan-950 border border-[#00E5FF] text-[#00E5FF] hover:bg-[#00E5FF] hover:text-black flex items-center gap-1.5 ml-auto"
        >
          <HeartPulse className="w-4 h-4" /> ACCEPT INCOMING CASUALTIES
        </button>
      </div>

      {/* Main Grid: Map & Ambulance / Casualty Stream Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1">
        {/* Left Map View with Moving Ambulances (8 Cols) */}
        <div className="lg:col-span-8 h-[500px]">
          <DelhiMap
            gates={venue.gates}
            vehicles={vehicles}
            greenCorridorActive={venue.emergencyServices?.trafficCorridor?.greenCorridorActive}
            emergencyActive={false}
            riskBadge="TRAUMA CARE"
          />
        </div>

        {/* Right Ambulance Cards & Patient Stream (4 Cols) */}
        <div className="lg:col-span-4 space-y-3 font-mono-tech text-xs">
          {/* Live Incoming Casualty Pipeline Banner */}
          <div className="bg-red-950/80 p-3 rounded-xl border border-red-500 text-red-100 font-mono-tech space-y-1">
            <div className="font-bold text-white flex items-center justify-between">
              <span className="flex items-center gap-1">🚨 INCOMING PATIENTS: 5 Injured</span>
              <span className="bg-red-600 text-white px-2 py-0.5 rounded text-[10px]">ETA 3 MIN</span>
            </div>
            <div className="text-[11px] text-red-200">
              Critical: <strong className="text-white">2</strong> • Stable: <strong className="text-white">3</strong>
            </div>
            <div className="text-[10px] text-yellow-300 font-bold">Action: Prepare Operation Theatre 02 & 03</div>
          </div>

          {/* Ambulance Card 1 */}
          <div className="bg-[#022C22] p-3.5 rounded-xl border border-emerald-500/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-sm flex items-center gap-1.5">
                <Ambulance className="w-4 h-4 text-[#00C853]" /> Ambulance 01 (LNJP)
              </span>
              <span className="bg-emerald-950 border border-[#00C853] text-[#00C853] px-2 py-0.5 rounded text-[10px]">
                {dispatchedAmb1 ? "EN ROUTE" : "READY"}
              </span>
            </div>

            <div className="text-zinc-300 text-xs">Driver: <strong className="text-white">Rajesh Kumar</strong> • ETA: <strong className="text-amber-400">3 min</strong></div>

            <button
              type="button"
              onClick={() => handleDispatchAmb(1)}
              className={`w-full py-2 rounded-lg font-orbitron font-bold text-xs transition-all flex items-center justify-center gap-1.5 ${
                dispatchedAmb1
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#00C853] text-black hover:bg-emerald-300 shadow-md'
              }`}
            >
              <Check className="w-4 h-4" /> {dispatchedAmb1 ? "DISPATCHED (EN ROUTE)" : "DISPATCH AMBULANCE"}
            </button>
          </div>

          {/* Ambulance Card 2 */}
          <div className="bg-[#022C22] p-3.5 rounded-xl border border-emerald-500/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-sm flex items-center gap-1.5">
                <Ambulance className="w-4 h-4 text-[#00C853]" /> Ambulance 02 (AIIMS)
              </span>
              <span className="bg-emerald-950 border border-[#00C853] text-[#00C853] px-2 py-0.5 rounded text-[10px]">
                {dispatchedAmb2 ? "EN ROUTE" : "READY"}
              </span>
            </div>

            <div className="text-zinc-300 text-xs">Driver: <strong className="text-white">Suresh Sharma</strong> • ETA: <strong className="text-amber-400">5 min</strong></div>

            <button
              type="button"
              onClick={() => handleDispatchAmb(2)}
              className={`w-full py-2 rounded-lg font-orbitron font-bold text-xs transition-all flex items-center justify-center gap-1.5 ${
                dispatchedAmb2
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#00C853] text-black hover:bg-emerald-300 shadow-md'
              }`}
            >
              <Check className="w-4 h-4" /> {dispatchedAmb2 ? "DISPATCHED (EN ROUTE)" : "DISPATCH AMBULANCE"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
