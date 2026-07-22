import React from 'react';
import { ShieldAlert, AlertTriangle, Info, HelpCircle } from 'lucide-react';

export default function RiskMeter({ riskInfo }) {
  const score = riskInfo?.score || 18;
  const breakdown = riskInfo?.breakdown || {
    densityContrib: 12,
    speedContrib: 4,
    reverseContrib: 0,
    weatherContrib: 1,
    gateContrib: 2,
    incidentContrib: 1
  };
  const reasons = riskInfo?.reasons || ["Normal crowd density", "Gate flow baseline safe"];

  // Determine Risk Color & Level
  const getRiskDetails = (val) => {
    if (val <= 30) return { label: "SAFE", color: "#00C853", bg: "bg-emerald-950/60", border: "border-[#00C853]" };
    if (val <= 60) return { label: "MODERATE", color: "#FFC107", bg: "bg-amber-950/60", border: "border-[#FFC107]" };
    if (val <= 80) return { label: "HIGH RISK", color: "#F97316", bg: "bg-orange-950/60", border: "border-orange-500" };
    return { label: "CRITICAL HZ", color: "#FF3B30", bg: "bg-red-950/80", border: "border-[#FF3B30]" };
  };

  const risk = getRiskDetails(score);

  // SVG Circular Gauge Calculations
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="glass-panel rounded-xl p-3.5 border border-zinc-800 flex flex-col h-full overflow-y-auto">
      {/* Title Header */}
      <div className="flex items-center justify-between pb-2 border-b border-zinc-800 mb-3">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-[#00E5FF]" />
          <span className="font-orbitron font-bold text-xs text-white uppercase tracking-wider">
            AI Risk Diagnostics Engine
          </span>
        </div>
        <span className="text-[10px] font-mono-tech text-zinc-400">REALTIME SCORE</span>
      </div>

      {/* Circular Radial Risk Meter Gauge */}
      <div className="flex flex-col items-center justify-center my-2">
        <div className="relative w-36 h-36 flex items-center justify-center">
          {/* Background Track Circle */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="72"
              cy="72"
              r={radius}
              stroke="#27272A"
              strokeWidth="10"
              fill="transparent"
            />
            {/* Animated Dynamic Progress Circle */}
            <circle
              cx="72"
              cy="72"
              r={radius}
              stroke={risk.color}
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-700 ease-out"
              style={{ filter: `drop-shadow(0 0 8px ${risk.color})` }}
            />
          </svg>

          {/* Center Text Display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-orbitron font-extrabold text-white">{score}</span>
            <span className="text-[10px] font-mono-tech uppercase font-bold tracking-wider" style={{ color: risk.color }}>
              {risk.label}
            </span>
          </div>
        </div>
      </div>

      {/* Primary Risk Reasons */}
      <div className="mt-2 mb-4 bg-[#09090B] p-2.5 rounded-lg border border-zinc-800">
        <div className="text-[10px] font-mono-tech text-zinc-400 uppercase mb-1.5 flex items-center justify-between">
          <span>Active Hazard Diagnostics</span>
          <span className="text-zinc-500 font-normal">Updated Live</span>
        </div>
        <div className="space-y-1">
          {reasons.map((r, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs font-mono-tech text-zinc-200">
              <AlertTriangle className="w-3 h-3 text-[#FFC107] shrink-0" />
              <span>{r}</span>
            </div>
          ))}
        </div>
      </div>

      {/* AI Risk Score Formula Breakdown (Required by Prompt) */}
      <div className="bg-[#09090B] p-2.5 rounded-lg border border-zinc-800 text-[11px] font-mono-tech">
        <div className="text-zinc-400 uppercase text-[10px] mb-2 flex items-center justify-between">
          <span>AI Risk Formula Breakdown</span>
          <span className="text-[#00E5FF]">100% Weight</span>
        </div>

        <div className="space-y-1.5">
          <div>
            <div className="flex justify-between text-[10px] text-zinc-300 mb-0.5">
              <span>Crowd Density (40%)</span>
              <span className="text-[#00E5FF]">+{breakdown.densityContrib} pts</span>
            </div>
            <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-[#00E5FF] rounded-full" style={{ width: `${Math.min(100, breakdown.densityContrib * 2.5)}%` }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[10px] text-zinc-300 mb-0.5">
              <span>Movement Speed (20%)</span>
              <span className="text-[#00E5FF]">+{breakdown.speedContrib} pts</span>
            </div>
            <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-[#00C853] rounded-full" style={{ width: `${Math.min(100, breakdown.speedContrib * 5)}%` }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[10px] text-zinc-300 mb-0.5">
              <span>Reverse Movement (15%)</span>
              <span className="text-[#FFC107]">+{breakdown.reverseContrib} pts</span>
            </div>
            <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-[#FFC107] rounded-full" style={{ width: `${Math.min(100, breakdown.reverseContrib * 6.6)}%` }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[10px] text-zinc-300 mb-0.5">
              <span>Weather (10%)</span>
              <span className="text-[#00E5FF]">+{breakdown.weatherContrib} pts</span>
            </div>
            <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${Math.min(100, breakdown.weatherContrib * 10)}%` }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[10px] text-zinc-300 mb-0.5">
              <span>Gate Congestion (10%)</span>
              <span className="text-[#FF3B30]">+{breakdown.gateContrib} pts</span>
            </div>
            <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-[#FF3B30] rounded-full" style={{ width: `${Math.min(100, breakdown.gateContrib * 10)}%` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
