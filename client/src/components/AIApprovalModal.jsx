import React from 'react';
import { AlertTriangle, CheckCircle2, XCircle, ShieldAlert, Sparkles, HelpCircle } from 'lucide-react';

export default function AIApprovalModal({ isOpen, popupData, onApprove, onReject }) {
  if (!isOpen || !popupData) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-emergency-strobe">
      <div className="relative w-full max-w-xl glass-panel-danger rounded-2xl p-6 border-2 border-[#FF3B30] shadow-[0_0_80px_rgba(255,59,48,0.8)] text-left">
        {/* Header Badge */}
        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-red-500/40">
          <div className="w-12 h-12 rounded-xl bg-red-600/40 border border-[#FF3B30] flex items-center justify-center text-[#FF3B30] animate-bounce shadow-[0_0_25px_rgba(255,59,48,0.9)]">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl font-orbitron font-extrabold text-white tracking-wider">
              {popupData.title || "⚠ HIGH CROWD RISK — PREDICTED STAMPEDE"}
            </h2>
            <div className="text-xs font-mono-tech text-red-300 mt-0.5 flex items-center gap-2">
              <span>AI CONFIDENCE: <strong className="text-white bg-red-950 px-2 py-0.5 rounded border border-red-500">{popupData.confidence || "96%"}</strong></span>
              <span>• IMPENDING HAZARD</span>
            </div>
          </div>
        </div>

        {/* Action Recommendations Box */}
        <div className="mb-4 bg-black/70 p-3.5 rounded-xl border border-red-500/40 font-mono-tech text-xs">
          <div className="text-[#00E5FF] font-bold uppercase mb-2 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#00E5FF]" /> Recommended Tactical Actions:
          </div>
          <div className="space-y-1.5">
            {(popupData.recommendedActions || [
              "Redirect Crowd to Gate 3 & Gate 2",
              "Open Gate 3 (South Metro)",
              "Halt & Close Gate 1 Entry",
              "Notify Police Patrol Unit 01",
              "Alert LNJP Hospital Emergency"
            ]).map((act, i) => (
              <div key={i} className="flex items-center gap-2 text-white">
                <CheckCircle2 className="w-4 h-4 text-[#00C853] shrink-0" />
                <span>{act}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Explainable AI Engine ("WHY" Box) */}
        <div className="mb-6 bg-[#09090B] p-3 rounded-xl border border-zinc-800 font-mono-tech text-xs">
          <div className="text-zinc-400 font-bold uppercase text-[10px] mb-2 flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5 text-[#FFC107]" /> Explainable AI Diagnostic rationale (Why?):
          </div>
          <div className="grid grid-cols-2 gap-2 text-zinc-300">
            <div>• Predicted Injuries: <strong className="text-[#FF3B30]">{popupData.whyExplanation?.predictedInjuries || 12}</strong></div>
            <div>• Distance to Hospital: <strong className="text-white">{popupData.whyExplanation?.distanceToHospital || "850 m"}</strong></div>
            <div>• Traffic Condition: <strong className="text-[#FFC107]">{popupData.whyExplanation?.trafficStatus || "Heavy"}</strong></div>
            <div>• Model Accuracy: <strong className="text-[#00C853]">{popupData.whyExplanation?.confidence || "96%"}</strong></div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={onApprove}
            className="flex-1 py-3.5 rounded-xl bg-[#00C853] text-black font-orbitron font-extrabold text-sm hover:bg-emerald-400 transition-all shadow-[0_0_30px_rgba(0,200,83,0.7)] flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5" /> APPROVE & EXECUTE
          </button>
          <button
            type="button"
            onClick={onReject}
            className="px-6 py-3.5 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-300 font-orbitron font-bold text-xs hover:bg-zinc-700 hover:text-white transition-all flex items-center justify-center gap-2"
          >
            <XCircle className="w-4 h-4" /> REJECT
          </button>
        </div>
      </div>
    </div>
  );
}
