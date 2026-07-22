import React from 'react';
import { MessageSquare, Bell } from 'lucide-react';

export default function WhatsAppNotifications({ alerts }) {
  return (
    <div className="glass-panel rounded-xl p-3 border border-zinc-800 flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-[#00E5FF]" />
          <span className="font-orbitron font-bold text-xs text-white uppercase tracking-wider">
            Live Agency Activity Feed
          </span>
        </div>
        <span className="text-[10px] font-mono-tech text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-[#00C853]/40">
          WHATSAPP STYLE
        </span>
      </div>

      {/* Cards Stream */}
      <div className="space-y-2 overflow-y-auto flex-1 pr-1 font-mono-tech text-xs">
        {alerts && alerts.length > 0 ? (
          alerts.map((al) => (
            <div
              key={al.id}
              className="bg-[#09090B] p-2.5 rounded-lg border border-zinc-800 flex items-start gap-2.5 hover:border-zinc-700 transition-all"
            >
              <div className="text-base leading-none pt-0.5">{al.icon || "📢"}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-xs">{al.title}</span>
                  <span className="text-[10px] text-zinc-500">{al.time}</span>
                </div>
                <p className="text-zinc-400 text-[11px] mt-0.5">{al.text}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-zinc-500 text-xs py-4 text-center">Awaiting agency activity logs...</div>
        )}
      </div>
    </div>
  );
}
