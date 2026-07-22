import React, { useState } from 'react';
import { X, Camera, Eye, AlertTriangle, Play, Pause, Camera as SnapIcon, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function SmartCameraManagerModal({ camera, isOpen, onClose }) {
  if (!isOpen || !camera) return null;

  const [isPlaying, setIsPlaying] = useState(true);
  const [timelineVal, setTimelineVal] = useState(100);
  const [snapped, setSnapped] = useState(false);

  const isCritical = camera.density > 4.0 || camera.risk === 'Critical';

  const handleSnapshot = () => {
    setSnapped(true);
    setTimeout(() => setSnapped(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg">
      <div className="relative w-full max-w-5xl h-[88vh] glass-panel-cyan rounded-2xl p-5 border border-[#00E5FF]/40 shadow-[0_0_60px_rgba(0,229,255,0.2)] flex flex-col overflow-hidden text-left">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-950 border border-[#00E5FF] flex items-center justify-center text-[#00E5FF]">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-orbitron font-bold text-white flex items-center gap-2">
                {camera.name}
                <span className={`text-[10px] font-mono-tech px-2 py-0.5 rounded border ${
                  isCritical ? 'bg-red-950 border-[#FF3B30] text-[#FF3B30] animate-pulse' : 'bg-emerald-950 border-[#00C853] text-[#00C853]'
                }`}>
                  {isCritical ? '🔴 CRITICAL HAZARD' : '🟢 SAFE baseline'}
                </span>
              </h2>
              <p className="text-xs font-mono-tech text-zinc-400">HD Optical Feed • Location: {camera.location}</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="text-zinc-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Video Canvas Container */}
        <div className="relative flex-1 bg-[#09090B] rounded-xl my-3 border border-zinc-800 overflow-hidden flex items-center justify-center scanline">
          {/* Simulated HD Feed with Bounding Boxes */}
          <div className="w-full h-full relative flex items-center justify-center bg-zinc-950">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 cyber-grid opacity-40" />

            {/* YOLO AI Detection Boxes Overlay */}
            <div className="absolute top-[18%] left-[20%] w-[22%] h-[45%] border-2 border-[#00E5FF] rounded bg-[#00E5FF]/10 p-1 font-mono-tech text-[10px] text-[#00E5FF]">
              PERSON 98% (Walking 1.2m/s)
            </div>

            <div className="absolute top-[30%] left-[52%] w-[25%] h-[50%] border-2 border-[#00E5FF] rounded bg-[#00E5FF]/10 p-1 font-mono-tech text-[10px] text-[#00E5FF]">
              PERSON 94% (Standing)
            </div>

            {isCritical && (
              <div className="absolute top-[12%] left-[38%] w-[45%] h-[65%] border-2 border-[#FF3B30] animate-pulse rounded bg-[#FF3B30]/20 p-2 font-mono-tech text-xs text-[#FF3B30] font-bold">
                ⚠ CONGESTION HAZARD 99% (8.2 p/m²)
              </div>
            )}

            {/* Snapshot Toast Feedback */}
            {snapped && (
              <div className="absolute top-4 right-4 bg-emerald-950 border border-[#00C853] text-[#00C853] px-3 py-1.5 rounded text-xs font-mono-tech flex items-center gap-1.5 shadow-lg">
                <CheckCircle2 className="w-4 h-4" /> HD Snapshot Saved to Audit Log
              </div>
            )}
          </div>
        </div>

        {/* Playback Controls & Timeline Bar */}
        <div className="flex items-center gap-4 bg-[#18181B] p-2.5 rounded-lg border border-zinc-800 mb-3 font-mono-tech text-xs">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-white"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <span className="text-zinc-400">PLAYBACK:</span>
          <input
            type="range"
            min="0"
            max="100"
            value={timelineVal}
            onChange={(e) => setTimelineVal(e.target.value)}
            className="flex-1 accent-[#00E5FF] cursor-pointer"
          />
          <span className="text-[#00E5FF] font-bold">LIVE STREAM</span>
          <button
            type="button"
            onClick={handleSnapshot}
            className="px-3 py-1 rounded bg-cyan-950 border border-[#00E5FF] text-[#00E5FF] hover:bg-[#00E5FF] hover:text-black flex items-center gap-1 text-xs"
          >
            <SnapIcon className="w-3.5 h-3.5" /> Snapshot
          </button>
        </div>

        {/* Camera Metrics & AI Recommendation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-[#09090B] p-3 rounded-xl border border-zinc-800 grid grid-cols-3 gap-2 font-mono-tech text-center">
            <div>
              <div className="text-[10px] text-zinc-500 uppercase">People Count</div>
              <div className="text-lg font-orbitron font-bold text-white mt-0.5">{camera.peopleCount}</div>
            </div>
            <div>
              <div className="text-[10px] text-zinc-500 uppercase">Density</div>
              <div className={`text-lg font-orbitron font-bold mt-0.5 ${isCritical ? 'text-[#FF3B30]' : 'text-[#00E5FF]'}`}>
                {camera.density} p/m²
              </div>
            </div>
            <div>
              <div className="text-[10px] text-zinc-500 uppercase">Speed</div>
              <div className="text-lg font-orbitron font-bold text-zinc-300 mt-0.5">{camera.speed} m/s</div>
            </div>
          </div>

          <div className="bg-[#09090B] p-3 rounded-xl border border-zinc-800 font-mono-tech text-xs flex flex-col justify-between">
            <div>
              <div className="text-[10px] text-[#00E5FF] uppercase font-bold mb-1">AI Recommendation & Action</div>
              <p className="text-white font-semibold">
                "{camera.aiRecommendation || "Close Gate 1 turnstiles immediately and divert incoming flow to Gate 3."}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
