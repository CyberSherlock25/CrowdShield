import React from 'react';
import { Download, FileText, CheckCircle2, AlertTriangle, ShieldCheck, X } from 'lucide-react';
import { generateIncidentPDFReport } from '../utils/pdfGenerator';

export default function IncidentReportModal({ isOpen, onClose, currentCrowd, riskScore }) {
  if (!isOpen) return null;

  const reportData = {
    venueName: "Metropolis National Stadium",
    scenarioTitle: "Stadium Stampede Hazard Mitigation",
    peakRisk: 91,
    totalCrowd: currentCrowd || 58900
  };

  const handleDownloadPDF = () => {
    generateIncidentPDFReport(reportData);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-3xl glass-panel rounded-2xl p-6 border border-zinc-800 shadow-[0_0_50px_rgba(0,0,0,0.8)] text-left flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-950 border border-[#00C853] text-[#00C853] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-orbitron font-bold text-white">After-Incident Official Audit Report</h2>
              <p className="text-xs font-mono-tech text-zinc-400">Post-event telemetry, root cause, and lives saved audit</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="text-zinc-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Report Content Scroll Area */}
        <div className="p-4 overflow-y-auto space-y-4 flex-1 font-mono-tech text-xs text-zinc-300">
          {/* Executive Summary Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-[#09090B] p-3 rounded-lg border border-zinc-800">
              <div className="text-[10px] text-zinc-500 uppercase">Peak Risk Score</div>
              <div className="text-2xl font-orbitron font-bold text-[#FF3B30] mt-1">91 / 100</div>
              <div className="text-[10px] text-red-400">CRITICAL HAZARD</div>
            </div>

            <div className="bg-[#09090B] p-3 rounded-lg border border-zinc-800">
              <div className="text-[10px] text-zinc-500 uppercase">Attendees Guided</div>
              <div className="text-2xl font-orbitron font-bold text-[#00E5FF] mt-1">18,200</div>
              <div className="text-[10px] text-cyan-400">SAFE REROUTING</div>
            </div>

            <div className="bg-[#09090B] p-3 rounded-lg border border-zinc-800">
              <div className="text-[10px] text-zinc-500 uppercase">Lives Saved</div>
              <div className="text-2xl font-orbitron font-bold text-[#00C853] mt-1">100%</div>
              <div className="text-[10px] text-emerald-400">ZERO CASUALTIES</div>
            </div>

            <div className="bg-[#09090B] p-3 rounded-lg border border-zinc-800">
              <div className="text-[10px] text-zinc-500 uppercase">Green Corridor ETA</div>
              <div className="text-2xl font-orbitron font-bold text-[#FFC107] mt-1">2.1 Min</div>
              <div className="text-[10px] text-amber-400">FAST TRANSIT</div>
            </div>
          </div>

          {/* Root Cause Analysis */}
          <div className="bg-[#09090B] p-3 rounded-lg border border-zinc-800">
            <div className="font-orbitron font-bold text-white mb-1 text-sm text-[#00E5FF]">
              1. Root Cause Analysis
            </div>
            <ul className="list-disc list-inside space-y-1 text-zinc-300">
              <li>Turnstile scanner hardware glitch at Gate 1 created an initial 450-person bottleneck.</li>
              <li>Sudden heavy rain prompted 4,500 outside attendees to rush into Gate 1 concourse.</li>
              <li>AI prediction algorithm detected compression wave 120s prior to stampede threshold.</li>
            </ul>
          </div>

          {/* Response Timeline */}
          <div className="bg-[#09090B] p-3 rounded-lg border border-zinc-800">
            <div className="font-orbitron font-bold text-white mb-1 text-sm text-[#00E5FF]">
              2. Key Response Timeline
            </div>
            <div className="space-y-1">
              <div className="flex justify-between border-b border-zinc-900 pb-1">
                <span>12:00 PM — Baseline crowd flow normal across 4 gates.</span>
                <span className="text-[#00C853]">✓ Baseline</span>
              </div>
              <div className="flex justify-between border-b border-zinc-900 pb-1">
                <span>12:05 PM — Rain rush detected; reverse movement alert logged.</span>
                <span className="text-[#FFC107]">⚠ Warning</span>
              </div>
              <div className="flex justify-between border-b border-zinc-900 pb-1">
                <span>12:06 PM — AI predicts stampede in 120s. Emergency mode engaged.</span>
                <span className="text-[#FF3B30]">⚡ Critical</span>
              </div>
              <div className="flex justify-between pb-1">
                <span>12:12 PM — Crowd safely evacuated to Gate 2/3. Risk score: 22.</span>
                <span className="text-[#00C853]">✓ Resolved</span>
              </div>
            </div>
          </div>

          {/* AI Future Recommendations */}
          <div className="bg-[#09090B] p-3 rounded-lg border border-zinc-800">
            <div className="font-orbitron font-bold text-white mb-1 text-sm text-[#00E5FF]">
              3. AI Optimization Recommendations
            </div>
            <p className="text-zinc-400 leading-relaxed">
              Upgrade Gate 1 turnstile optical sensors to redundant dual-channel scanners. Deploy automated rain shelter canopies along North Concourse to eliminate rain rush surges.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-zinc-800 flex justify-between items-center">
          <span className="text-zinc-500 text-xs font-mono-tech">DOCUMENT ID: CS-AUDIT-2026-9481</span>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleDownloadPDF}
              className="px-5 py-2.5 rounded-xl bg-[#00E5FF] text-black font-orbitron font-bold text-xs hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(0,229,255,0.4)] flex items-center gap-2"
            >
              <Download className="w-4 h-4" /> DOWNLOAD OFFICIAL PDF REPORT
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-zinc-800 text-zinc-300 font-mono-tech text-xs hover:text-white"
            >
              CLOSE AUDIT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
