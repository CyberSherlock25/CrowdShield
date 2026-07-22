import React from 'react';
import { Shield, Building, ShieldAlert, Hospital, Navigation, Video } from 'lucide-react';

export default function RoleSwitcherBar({ activeRole, onSelectRole }) {
  const roles = [
    { id: 'super_admin', label: 'Super Admin', color: 'border-[#00E5FF] text-[#00E5FF]', icon: Shield },
    { id: 'control_room', label: 'Control Room', color: 'border-zinc-400 text-zinc-300', icon: Building },
    { id: 'police', label: 'Police Command', color: 'border-blue-500 text-blue-400', icon: ShieldAlert },
    { id: 'hospital', label: 'Hospital Command', color: 'border-[#00C853] text-[#00C853]', icon: Hospital },
    { id: 'traffic', label: 'Traffic Control', color: 'border-[#FF6B00] text-[#FF6B00]', icon: Navigation },
    { id: 'drone', label: 'Drone Operator', color: 'border-purple-400 text-purple-400', icon: Video }
  ];

  return (
    <div className="bg-[#18181B] border-b border-zinc-800 px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-xs font-mono-tech z-50">
      <div className="flex items-center gap-2 text-zinc-400">
        <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
        <span className="font-orbitron font-bold text-white text-xs">ROLE COMMAND SWITCHER:</span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {roles.map((r) => {
          const Icon = r.icon;
          const isActive = activeRole === r.id;

          return (
            <button
              key={r.id}
              type="button"
              onClick={() => onSelectRole(r.id)}
              className={`px-3 py-1 rounded-lg border flex items-center gap-1.5 transition-all text-xs ${
                isActive
                  ? `bg-black font-bold shadow-md ${r.color}`
                  : 'bg-[#09090B] border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{r.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
