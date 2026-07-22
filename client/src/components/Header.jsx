import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldAlert, 
  Clock, 
  CloudRain, 
  Sun, 
  Volume2, 
  VolumeX, 
  Video, 
  Radio, 
  LogOut, 
  AlertTriangle, 
  Sliders,
  BarChart2
} from 'lucide-react';

export default function Header({ 
  weather, 
  droneMode, 
  setDroneMode, 
  sirenMuted, 
  setSirenMuted, 
  emergencyActive, 
  setEmergencyActive,
  onOpenAnalytics,
  onOpenReport
}) {
  const [time, setTime] = useState(new Date());
  let user = { role: "control_room", name: "Control Operator" };
  try {
    const stored = localStorage.getItem('crowdshield_user');
    if (stored) user = JSON.parse(stored);
  } catch (e) {
    user = { role: "control_room", name: "Control Operator" };
  }
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('crowdshield_token');
    localStorage.removeItem('crowdshield_user');
    navigate('/login');
  };

  return (
    <header className="bg-[#18181B] border-b border-zinc-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-4 z-30 shadow-md">
      {/* Brand & Status */}
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center gap-2 group">
          <div className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-all ${
            emergencyActive
              ? 'bg-red-950/80 border-[#FF3B30] text-[#FF3B30] animate-pulse shadow-[0_0_20px_rgba(255,59,48,0.6)]'
              : 'bg-cyan-950/60 border-[#00E5FF] text-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.3)]'
          }`}>
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <span className="font-orbitron font-bold text-lg text-white tracking-wider">
              CROWD<span className="text-[#00E5FF]">SHIELD</span> AI
            </span>
            <span className="hidden sm:inline-block ml-2 text-[10px] bg-cyan-950 border border-[#00E5FF]/40 text-[#00E5FF] px-1.5 py-0.2 rounded font-mono-tech">
              OPS COMMAND
            </span>
          </div>
        </Link>
      </div>

      {/* Center Realtime Clock & Weather */}
      <div className="flex items-center gap-6 bg-[#09090B] px-4 py-1.5 rounded-lg border border-zinc-800 text-xs font-mono-tech">
        {/* Clock */}
        <div className="flex items-center gap-2 text-zinc-300">
          <Clock className="w-3.5 h-3.5 text-[#00E5FF]" />
          <span>LOCAL: <strong className="text-white">{time.toLocaleTimeString()}</strong></span>
          <span className="text-zinc-600">|</span>
          <span>UTC: <strong className="text-zinc-400">{time.toISOString().substring(11, 19)}</strong></span>
        </div>

        <div className="h-4 w-px bg-zinc-800 hidden sm:block" />

        {/* Weather */}
        <div className="flex items-center gap-2 text-zinc-300">
          {weather?.condition?.includes('Rain') ? (
            <CloudRain className="w-3.5 h-3.5 text-[#00E5FF] animate-bounce" />
          ) : (
            <Sun className="w-3.5 h-3.5 text-[#FFC107]" />
          )}
          <span>{weather?.condition || "Clear"} ({weather?.temperature || 24}°C)</span>
          <span className="text-zinc-500">Rain: {weather?.rainProbability || 5}%</span>
        </div>
      </div>

      {/* Tactical Controls & User */}
      <div className="flex items-center gap-3">
        {/* Drone HUD Toggle */}
        <button
          type="button"
          onClick={() => setDroneMode(!droneMode)}
          className={`px-3 py-1.5 rounded-lg border text-xs font-mono-tech flex items-center gap-1.5 transition-all ${
            droneMode
              ? 'bg-cyan-950 border-[#00E5FF] text-[#00E5FF] shadow-[0_0_12px_rgba(0,229,255,0.4)]'
              : 'bg-[#09090B] border-zinc-800 text-zinc-400 hover:text-white'
          }`}
          title="Toggle Drone Aerial HUD Layer"
        >
          <Video className="w-3.5 h-3.5" />
          <span>DRONE HUD</span>
        </button>

        {/* Siren Mute Toggle */}
        <button
          type="button"
          onClick={() => setSirenMuted(!sirenMuted)}
          className={`p-1.5 rounded-lg border text-xs flex items-center justify-center transition-all ${
            sirenMuted
              ? 'bg-[#09090B] border-zinc-800 text-zinc-500 hover:text-zinc-300'
              : 'bg-amber-950/40 border-[#FFC107] text-[#FFC107]'
          }`}
          title={sirenMuted ? "Unmute Audio Sirens" : "Mute Audio Sirens"}
        >
          {sirenMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        {/* Analytics Drawer Button */}
        <button
          type="button"
          onClick={onOpenAnalytics}
          className="px-3 py-1.5 rounded-lg bg-[#09090B] border border-zinc-800 text-zinc-300 hover:border-[#00E5FF] hover:text-[#00E5FF] text-xs font-mono-tech flex items-center gap-1.5 transition-all"
        >
          <BarChart2 className="w-3.5 h-3.5" />
          <span>ANALYTICS</span>
        </button>

        {/* Emergency Manual Trigger */}
        <button
          type="button"
          onClick={() => setEmergencyActive(!emergencyActive)}
          className={`px-3 py-1.5 rounded-lg border text-xs font-orbitron font-bold flex items-center gap-1.5 transition-all ${
            emergencyActive
              ? 'bg-[#FF3B30] text-black border-red-400 animate-pulse shadow-[0_0_20px_rgba(255,59,48,0.8)]'
              : 'bg-red-950/40 border-[#FF3B30]/60 text-[#FF3B30] hover:bg-[#FF3B30] hover:text-black'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>{emergencyActive ? "EMERGENCY ACTIVE" : "TRIGGER EMERGENCY"}</span>
        </button>

        {/* User badge */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#09090B] border border-zinc-800 text-xs font-mono-tech text-zinc-400">
          <div className="w-2 h-2 rounded-full bg-[#00C853]" />
          <span>{user.name}</span>
        </div>

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          className="p-1.5 text-zinc-400 hover:text-white transition-colors"
          title="Sign Out"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
