import React from 'react';
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { X, BarChart2, Activity, Shield, Hospital, Zap } from 'lucide-react';

export default function AnalyticsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  // Chart Datasets
  const densityRiskData = [
    { time: '12:00', density: 1.8, risk: 18, evacuationTime: 1.2 },
    { time: '12:02', density: 2.4, risk: 28, evacuationTime: 1.4 },
    { time: '12:04', density: 4.2, risk: 52, evacuationTime: 2.1 },
    { time: '12:06', density: 5.8, risk: 84, evacuationTime: 3.4 },
    { time: '12:08', density: 3.1, risk: 64, evacuationTime: 2.2 },
    { time: '12:10', density: 1.9, risk: 22, evacuationTime: 1.1 }
  ];

  const responseTimeData = [
    { metric: 'Standard Traffic', minutes: 8.5 },
    { metric: 'Green Corridor Active', minutes: 2.1 },
    { metric: 'Target Goal', minutes: 3.0 }
  ];

  const hospitalLoadData = [
    { hospital: 'Central City', totalBeds: 50, occupied: 32, available: 18 },
    { hospital: 'Metro Trauma', totalBeds: 40, occupied: 28, available: 12 },
    { hospital: 'St. Jude Care', totalBeds: 60, occupied: 35, available: 25 }
  ];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-5xl h-[85vh] glass-panel rounded-2xl p-6 border border-zinc-800 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-950 border border-[#00E5FF] flex items-center justify-center text-[#00E5FF]">
              <BarChart2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-orbitron font-bold text-white">AI Advanced Analytics & Operations Audit</h2>
              <p className="text-xs font-mono-tech text-zinc-400">Deep telemetry benchmarks and historical performance</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="text-zinc-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2 overflow-y-auto flex-1 my-4">
          {/* Chart 1: Crowd Density vs Risk Score */}
          <div className="bg-[#09090B] p-4 rounded-xl border border-zinc-800">
            <div className="text-xs font-orbitron font-bold text-white mb-3 flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#00E5FF]" /> Crowd Density (p/m²) vs Risk Score Index
            </div>
            <div className="w-full h-52 text-xs">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={densityRiskData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272A" />
                  <XAxis dataKey="time" stroke="#71717A" />
                  <YAxis stroke="#71717A" />
                  <Tooltip contentStyle={{ backgroundColor: '#18181B', borderColor: '#00E5FF', color: '#fff' }} />
                  <Legend />
                  <Area type="monotone" dataKey="risk" stroke="#FF3B30" fill="rgba(255, 59, 48, 0.2)" name="AI Risk Score" />
                  <Area type="monotone" dataKey="density" stroke="#00E5FF" fill="rgba(0, 229, 255, 0.2)" name="Density (p/m²)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Ambulance Response Time (Standard vs Green Corridor) */}
          <div className="bg-[#09090B] p-4 rounded-xl border border-zinc-800">
            <div className="text-xs font-orbitron font-bold text-white mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#00C853]" /> Ambulance Response Time (Minutes)
            </div>
            <div className="w-full h-52 text-xs">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={responseTimeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272A" />
                  <XAxis dataKey="metric" stroke="#71717A" />
                  <YAxis stroke="#71717A" />
                  <Tooltip contentStyle={{ backgroundColor: '#18181B', borderColor: '#00E5FF', color: '#fff' }} />
                  <Bar dataKey="minutes" fill="#00E5FF" radius={[6, 6, 0, 0]} name="Response Time (Min)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 3: Hospital Capacity Load */}
          <div className="bg-[#09090B] p-4 rounded-xl border border-zinc-800 md:col-span-2">
            <div className="text-xs font-orbitron font-bold text-white mb-3 flex items-center gap-2">
              <Hospital className="w-4 h-4 text-purple-400" /> Active Trauma Hospital Bed Distribution
            </div>
            <div className="w-full h-52 text-xs">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hospitalLoadData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272A" />
                  <XAxis dataKey="hospital" stroke="#71717A" />
                  <YAxis stroke="#71717A" />
                  <Tooltip contentStyle={{ backgroundColor: '#18181B', borderColor: '#00E5FF', color: '#fff' }} />
                  <Legend />
                  <Bar dataKey="occupied" fill="#27272A" name="Occupied Beds" stackId="a" />
                  <Bar dataKey="available" fill="#00C853" name="Available Trauma Beds" stackId="a" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
