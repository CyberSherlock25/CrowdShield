import React from 'react';
import { Radio, AlertCircle, Info, ShieldAlert } from 'lucide-react';

export default function EventTimeline({ eventLogs }) {
  return (
    <div className="glass-panel rounded-xl p-3 border border-zinc-800 flex flex-col h-full overflow-hidden">
      {/* Title */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-[#00E5FF] animate-pulse" />
          <span className="font-orbitron font-bold text-xs text-white uppercase tracking-wider">
            Live Tactical Event Log
          </span>
        </div>
        <span className="text-[10px] font-mono-tech text-zinc-500">AUTO-GENERATING REALTIME</span>
      </div>

      {/* Event Timeline Feed */}
      <div className="space-y-1.5 overflow-y-auto flex-1 pr-1 font-mono-tech text-xs">
        {eventLogs && eventLogs.length > 0 ? (
          eventLogs.map((log, idx) => {
            const isEmergency = log.type === 'emergency';
            const isSim = log.type === 'sim';

            return (
              <div
                key={idx}
                className={`p-2 rounded flex items-start gap-2.5 border transition-all ${
                  isEmergency
                    ? 'bg-red-950/40 border-[#FF3B30]/60 text-red-200'
                    : isSim
                    ? 'bg-cyan-950/30 border-[#00E5FF]/40 text-cyan-200'
                    : 'bg-[#09090B] border-zinc-800 text-zinc-300'
                }`}
              >
                <span className="text-[10px] text-zinc-500 bg-zinc-900 px-1.5 py-0.5 rounded shrink-0">
                  {log.time}
                </span>
                <div className="flex-1 flex items-center gap-2">
                  {isEmergency ? (
                    <ShieldAlert className="w-3.5 h-3.5 text-[#FF3B30] shrink-0" />
                  ) : (
                    <Info className="w-3.5 h-3.5 text-[#00E5FF] shrink-0" />
                  )}
                  <span className="leading-snug">{log.text}</span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-zinc-500 text-xs py-4 text-center">Awaiting event logs...</div>
        )}
      </div>
    </div>
  );
}
