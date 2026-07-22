import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { TrendingUp, Cpu, Zap } from 'lucide-react';

export default function AIPredictionPanel({ currentCrowd }) {
  const predicted5Min = Math.round(currentCrowd * 1.12);
  const confidence = 98.4;

  // Sample historical & projected trend data
  const trendData = [
    { time: '-15m', actual: currentCrowd - 3200, predicted: currentCrowd - 3100 },
    { time: '-10m', actual: currentCrowd - 2100, predicted: currentCrowd - 2000 },
    { time: '-5m', actual: currentCrowd - 900, predicted: currentCrowd - 850 },
    { time: 'NOW', actual: currentCrowd, predicted: currentCrowd },
    { time: '+5m', actual: null, predicted: predicted5Min },
    { time: '+10m', actual: null, predicted: Math.round(predicted5Min * 1.08) }
  ];

  return (
    <div className="glass-panel rounded-xl p-3 border border-zinc-800 flex flex-col h-full">
      {/* Title */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-[#00E5FF]" />
          <span className="font-orbitron font-bold text-xs text-white uppercase tracking-wider">
            AI Predictive Crowd Forecasting
          </span>
        </div>
        <span className="text-[10px] font-mono-tech text-[#00E5FF] bg-cyan-950 px-2 py-0.5 rounded border border-[#00E5FF]/40">
          5-MIN AHEAD FORECAST
        </span>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-2 mb-3 font-mono-tech text-center">
        <div className="bg-[#09090B] p-2 rounded border border-zinc-800">
          <div className="text-[10px] text-zinc-500 uppercase">Current Crowd</div>
          <div className="text-base font-orbitron font-bold text-white mt-0.5">
            {currentCrowd ? currentCrowd.toLocaleString() : "48,250"}
          </div>
        </div>

        <div className="bg-[#09090B] p-2 rounded border border-zinc-800">
          <div className="text-[10px] text-zinc-500 uppercase">Predicted (+5 min)</div>
          <div className="text-base font-orbitron font-bold text-[#00E5FF] mt-0.5">
            {predicted5Min.toLocaleString()}
          </div>
        </div>

        <div className="bg-[#09090B] p-2 rounded border border-zinc-800">
          <div className="text-[10px] text-zinc-500 uppercase">AI Confidence</div>
          <div className="text-base font-orbitron font-bold text-[#00C853] mt-0.5">
            {confidence}%
          </div>
        </div>
      </div>

      {/* Recharts Line Trend Chart */}
      <div className="w-full h-32 text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272A" />
            <XAxis dataKey="time" stroke="#71717A" tick={{ fontSize: 10 }} />
            <YAxis stroke="#71717A" tick={{ fontSize: 10 }} domain={['dataMin - 1000', 'dataMax + 2000']} />
            <Tooltip
              contentStyle={{ backgroundColor: '#18181B', borderColor: '#00E5FF', color: '#fff', fontSize: '11px' }}
            />
            <Line type="monotone" dataKey="actual" stroke="#00C853" strokeWidth={2} name="Actual Crowd" dot={{ r: 3 }} />
            <Line type="monotone" dataKey="predicted" stroke="#00E5FF" strokeWidth={2} strokeDasharray="4 4" name="AI Forecast" dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
