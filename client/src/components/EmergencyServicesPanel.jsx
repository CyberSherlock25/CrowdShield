import React from 'react';
import { Hospital, Ambulance, Shield, Radio, Zap, CheckCircle2 } from 'lucide-react';

export default function EmergencyServicesPanel({ emergencyData, onDispatch }) {
  const hospitals = emergencyData?.hospitals || [
    { name: "Central City Hospital", distance: "2.1 km", bedsAvailable: 18, ambulances: 4 },
    { name: "Metro Trauma Center", distance: "3.8 km", bedsAvailable: 12, ambulances: 3 }
  ];

  const policeUnits = emergencyData?.policeUnits || [
    { unit: "Unit Alpha (Rapid Patrol)", eta: "2 min", location: "North Perimeter" }
  ];

  const isGreenCorridor = emergencyData?.trafficCorridor?.greenCorridorActive || false;

  return (
    <div className="glass-panel rounded-xl p-3 border border-zinc-800 flex flex-col h-full">
      {/* Title */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Hospital className="w-4 h-4 text-[#00E5FF]" />
          <span className="font-orbitron font-bold text-xs text-white uppercase tracking-wider">
            Emergency Services Coordination
          </span>
        </div>
        <span className="text-[10px] font-mono-tech text-[#00C853] bg-emerald-950 px-2 py-0.5 rounded border border-[#00C853]/40">
          UNITS ACTIVE
        </span>
      </div>

      <div className="space-y-2.5 overflow-y-auto flex-1 font-mono-tech text-xs">
        {/* Green Corridor Status Box */}
        <div className={`p-2.5 rounded-lg border transition-all flex items-center justify-between ${
          isGreenCorridor
            ? 'bg-cyan-950/60 border-[#00E5FF] text-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.2)]'
            : 'bg-[#09090B] border-zinc-800 text-zinc-400'
        }`}>
          <div>
            <div className="font-bold text-white flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-[#00E5FF]" /> Traffic Green Corridor
            </div>
            <div className="text-[10px] text-zinc-400">
              {isGreenCorridor ? "Traffic lights synced for emergency routes" : "Standard signal cycle"}
            </div>
          </div>
          <button
            type="button"
            onClick={() => onDispatch('green_corridor')}
            className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${
              isGreenCorridor
                ? 'bg-[#00E5FF] text-black'
                : 'bg-zinc-800 text-zinc-200 hover:bg-[#00E5FF] hover:text-black'
            }`}
          >
            {isGreenCorridor ? "ACTIVE" : "ACTIVATE"}
          </button>
        </div>

        {/* Hospitals List */}
        <div className="space-y-1.5">
          <div className="text-[10px] text-zinc-500 uppercase">Trauma Hospitals Network</div>
          {hospitals.map((h, i) => (
            <div key={i} className="bg-[#09090B] p-2 rounded border border-zinc-800 flex items-center justify-between">
              <div>
                <div className="font-bold text-white">{h.name}</div>
                <div className="text-[10px] text-zinc-400">Distance: {h.distance} • Beds: <strong className="text-[#00C853]">{h.bedsAvailable}</strong></div>
              </div>
              <button
                type="button"
                onClick={() => onDispatch('ambulance', h.name)}
                className="px-2 py-1 rounded bg-cyan-950 border border-[#00E5FF]/40 text-[#00E5FF] hover:bg-[#00E5FF] hover:text-black text-[10px]"
              >
                Dispatch Amb ({h.ambulances})
              </button>
            </div>
          ))}
        </div>

        {/* Police Units */}
        <div className="space-y-1.5">
          <div className="text-[10px] text-zinc-500 uppercase">Police Perimeter Units</div>
          {policeUnits.map((p, i) => (
            <div key={i} className="bg-[#09090B] p-2 rounded border border-zinc-800 flex items-center justify-between">
              <div>
                <div className="font-bold text-white flex items-center gap-1">
                  <Shield className="w-3 h-3 text-[#00E5FF]" /> {p.unit}
                </div>
                <div className="text-[10px] text-zinc-400">ETA: <strong className="text-[#FFC107]">{p.eta}</strong> • {p.location}</div>
              </div>
              <button
                type="button"
                onClick={() => onDispatch('police')}
                className="px-2 py-1 rounded bg-amber-950 border border-[#FFC107]/40 text-[#FFC107] hover:bg-[#FFC107] hover:text-black text-[10px]"
              >
                Reinforce Unit
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
