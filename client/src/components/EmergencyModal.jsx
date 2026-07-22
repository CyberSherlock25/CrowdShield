import React from 'react';
import { ShieldAlert, AlertTriangle, Radio, CheckCircle2, Siren, X } from 'lucide-react';

export default function EmergencyModal({ isOpen, onClose, riskScore, onActivateServices }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-emergency-strobe">
      <div className="relative w-full max-w-lg glass-panel-danger rounded-2xl p-6 border-2 border-[#FF3B30] shadow-[0_0_60px_rgba(255,59,48,0.7)] text-left">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Siren Header */}
        <div className="flex items-center gap-3 mb-4 border-b border-red-500/40 pb-4">
          <div className="w-12 h-12 rounded-xl bg-red-600/30 border border-[#FF3B30] flex items-center justify-center animate-bounce text-[#FF3B30] shadow-[0_0_20px_rgba(255,59,48,0.8)]">
            <Siren className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl font-orbitron font-extrabold text-white tracking-wider">
              EMERGENCY DETECTED
            </h2>
            <p className="text-xs font-mono-tech text-red-300">
              AI RISK INDEX: <strong className="text-white text-sm">{riskScore || 84} / 100</strong> (STAMPEDE HAZARD HIGH)
            </p>
          </div>
        </div>

        {/* Automatic Agency Dispatch Checklist */}
        <div className="space-y-2.5 mb-6">
          <div className="text-xs font-mono-tech text-zinc-300 uppercase mb-2">
            Automated Multi-Agency Emergency Protocol Dispatch:
          </div>

          <div className="flex items-center justify-between p-2.5 bg-black/60 rounded-lg border border-red-500/40 font-mono-tech text-xs">
            <span className="flex items-center gap-2 text-white">
              <CheckCircle2 className="w-4 h-4 text-[#00C853]" /> 1. Police Perimeter Unit
            </span>
            <span className="text-[#00C853] font-bold">✓ DISPATCHED</span>
          </div>

          <div className="flex items-center justify-between p-2.5 bg-black/60 rounded-lg border border-red-500/40 font-mono-tech text-xs">
            <span className="flex items-center gap-2 text-white">
              <CheckCircle2 className="w-4 h-4 text-[#00C853]" /> 2. Emergency Ambulance Fleet
            </span>
            <span className="text-[#00C853] font-bold">✓ DISPATCHED</span>
          </div>

          <div className="flex items-center justify-between p-2.5 bg-black/60 rounded-lg border border-red-500/40 font-mono-tech text-xs">
            <span className="flex items-center gap-2 text-white">
              <CheckCircle2 className="w-4 h-4 text-[#00C853]" /> 3. City Hospital Trauma Ward
            </span>
            <span className="text-[#00C853] font-bold">✓ NOTIFIED</span>
          </div>

          <div className="flex items-center justify-between p-2.5 bg-black/60 rounded-lg border border-red-500/40 font-mono-tech text-xs">
            <span className="flex items-center gap-2 text-white">
              <CheckCircle2 className="w-4 h-4 text-[#00C853]" /> 4. Traffic Department Corridor
            </span>
            <span className="text-[#00E5FF] font-bold">✓ GREEN CORRIDOR ENGAGED</span>
          </div>

          <div className="flex items-center justify-between p-2.5 bg-black/60 rounded-lg border border-red-500/40 font-mono-tech text-xs">
            <span className="flex items-center gap-2 text-white">
              <CheckCircle2 className="w-4 h-4 text-[#00C853]" /> 5. Disaster Management HQ
            </span>
            <span className="text-[#00C853] font-bold">✓ ALERT SENT</span>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => { onActivateServices(); onClose(); }}
            className="flex-1 py-3 rounded-xl bg-[#FF3B30] text-black font-orbitron font-bold text-xs hover:bg-red-400 transition-all shadow-[0_0_25px_rgba(255,59,48,0.7)]"
          >
            CONFIRM ALL EMERGENCY DISPATCHES
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-3 rounded-xl bg-zinc-800 text-zinc-300 font-mono-tech text-xs hover:text-white"
          >
            DISMISS MODAL
          </button>
        </div>
      </div>
    </div>
  );
}
