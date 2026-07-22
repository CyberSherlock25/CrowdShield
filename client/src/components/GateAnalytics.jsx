import React from 'react';
import { DoorOpen, AlertOctagon, CheckCircle, AlertTriangle } from 'lucide-react';

export default function GateAnalytics({ gates }) {
  const getStatusBadge = (status, current) => {
    if (status === 'Closed' || current > 900) {
      return { label: 'CRITICAL', bg: 'bg-red-950/80', text: 'text-[#FF3B30]', border: 'border-[#FF3B30]' };
    }
    if (status === 'Warning' || current > 600) {
      return { label: 'WARNING', bg: 'bg-amber-950/80', text: 'text-[#FFC107]', border: 'border-[#FFC107]' };
    }
    return { label: 'SAFE', bg: 'bg-emerald-950/80', text: 'text-[#00C853]', border: 'border-[#00C853]' };
  };

  return (
    <div className="glass-panel rounded-xl p-3 border border-zinc-800 flex flex-col h-full">
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <DoorOpen className="w-4 h-4 text-[#00E5FF]" />
          <span className="font-orbitron font-bold text-xs text-white uppercase tracking-wider">
            Perimeter Gate Analytics
          </span>
        </div>
        <span className="text-[10px] font-mono-tech text-zinc-500">CAPACITY VS LIVE LOAD</span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 flex-1">
        {gates && gates.map((gate) => {
          const badge = getStatusBadge(gate.status, gate.current);
          const percent = Math.min(100, Math.round((gate.current / gate.capacity) * 100));

          return (
            <div
              key={gate.id}
              className="bg-[#09090B] p-2.5 rounded-lg border border-zinc-800 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-orbitron font-bold text-xs text-white truncate max-w-[110px]">{gate.name}</span>
                <span className={`text-[9px] font-mono-tech px-1.5 py-0.5 rounded border ${badge.bg} ${badge.text} ${badge.border}`}>
                  {badge.label}
                </span>
              </div>

              <div>
                <div className="flex justify-between items-baseline text-[11px] font-mono-tech mb-1">
                  <span className="text-zinc-400">Current: <strong className="text-white">{gate.current}</strong></span>
                  <span className="text-zinc-500">Cap: {gate.capacity}</span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      percent > 85 ? 'bg-[#FF3B30]' : percent > 60 ? 'bg-[#FFC107]' : 'bg-[#00C853]'
                    }`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
