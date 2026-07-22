import React from 'react';
import { Camera, Eye, AlertTriangle, Activity, Users, ShieldAlert } from 'lucide-react';

export default function CameraFeeds({ cameraFeeds, activeCamId, setActiveCamId }) {
  return (
    <div className="glass-panel rounded-xl p-3 border border-zinc-800 flex flex-col h-full overflow-hidden">
      {/* Panel Title */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Camera className="w-4 h-4 text-[#00E5FF]" />
          <span className="font-orbitron font-bold text-xs text-white uppercase tracking-wider">
            YOLO Vision Camera Network
          </span>
        </div>
        <span className="text-[10px] font-mono-tech bg-cyan-950 text-[#00E5FF] px-2 py-0.5 rounded border border-[#00E5FF]/40">
          4 FEEDS ONLINE
        </span>
      </div>

      {/* Camera Grid (2x2) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 overflow-y-auto flex-1 pr-1">
        {cameraFeeds.map((cam, index) => {
          const isActive = activeCamId === cam.id;
          const isHighDensity = cam.density > 3.0;

          return (
            <div
              key={cam.id}
              onClick={() => setActiveCamId(cam.id)}
              className={`relative rounded-lg overflow-hidden border cursor-pointer transition-all bg-[#09090B] flex flex-col justify-between p-2 min-h-[140px] ${
                isHighDensity
                  ? 'border-red-500/80 shadow-[0_0_15px_rgba(255,59,48,0.3)]'
                  : isActive
                  ? 'border-[#00E5FF] shadow-[0_0_12px_rgba(0,229,255,0.3)]'
                  : 'border-zinc-800 hover:border-zinc-700'
              }`}
            >
              {/* Camera Header Bar */}
              <div className="flex items-center justify-between text-[11px] font-mono-tech z-10 bg-black/60 px-1.5 py-0.5 rounded">
                <span className="text-white font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00C853] animate-pulse" />
                  {cam.name}
                </span>
                <span className="text-zinc-400 text-[10px]">{cam.location}</span>
              </div>

              {/* Simulated YOLO AI Detection Bounding Boxes Canvas Graphic */}
              <div className="absolute inset-0 z-0 flex items-center justify-center opacity-30 scanline">
                <div className="w-full h-full relative">
                  {/* Fake YOLO Bounding Boxes */}
                  <div className="absolute top-[20%] left-[15%] w-[25%] h-[40%] border-2 border-[#00E5FF] rounded bg-[#00E5FF]/10 text-[8px] font-mono-tech text-[#00E5FF] p-0.5">
                    PERSON 96%
                  </div>
                  <div className="absolute top-[35%] left-[50%] w-[30%] h-[45%] border-2 border-[#00E5FF] rounded bg-[#00E5FF]/10 text-[8px] font-mono-tech text-[#00E5FF] p-0.5">
                    PERSON 92%
                  </div>
                  {isHighDensity && (
                    <div className="absolute top-[10%] left-[35%] w-[45%] h-[60%] border-2 border-[#FF3B30] animate-pulse rounded bg-[#FF3B30]/20 text-[8px] font-mono-tech text-[#FF3B30] p-0.5">
                      CONGESTION HAZARD 98%
                    </div>
                  )}
                </div>
              </div>

              {/* Camera Live Telemetry Badge Overlay */}
              <div className="relative z-10 mt-auto pt-2">
                <div className="grid grid-cols-3 gap-1 bg-[#18181B]/90 backdrop-blur p-1.5 rounded text-[10px] font-mono-tech text-center border border-zinc-800">
                  <div>
                    <div className="text-zinc-500 uppercase text-[9px]">People</div>
                    <div className="font-bold text-white text-xs">{cam.peopleCount}</div>
                  </div>
                  <div>
                    <div className="text-zinc-500 uppercase text-[9px]">Density</div>
                    <div className={`font-bold text-xs ${isHighDensity ? 'text-[#FF3B30]' : 'text-[#00E5FF]'}`}>
                      {cam.density} p/m²
                    </div>
                  </div>
                  <div>
                    <div className="text-zinc-500 uppercase text-[9px]">Speed</div>
                    <div className="font-bold text-zinc-300 text-xs">{cam.speed} m/s</div>
                  </div>
                </div>

                {/* YOLO Detection Badges */}
                <div className="flex flex-wrap gap-1 mt-1.5">
                  <span className="bg-cyan-950/80 text-[#00E5FF] text-[9px] font-mono-tech px-1.5 py-0.5 rounded border border-[#00E5FF]/30">
                    YOLO Person Count: {cam.peopleCount}
                  </span>
                  {cam.runningDetected && (
                    <span className="bg-amber-950 text-[#FFC107] text-[9px] font-mono-tech px-1.5 py-0.5 rounded border border-[#FFC107]/40 animate-pulse">
                      ⚡ Running
                    </span>
                  )}
                  {isHighDensity && (
                    <span className="bg-red-950 text-[#FF3B30] text-[9px] font-mono-tech px-1.5 py-0.5 rounded border border-[#FF3B30]/40 animate-pulse">
                      ⚠ High Density
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
