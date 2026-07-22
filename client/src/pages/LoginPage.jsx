import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldAlert, Shield, Building, Stethoscope, Navigation, Video, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState('control_room');
  const [username, setUsername] = useState('operator_01');
  const [password, setPassword] = useState('••••••••');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const roles = [
    { id: 'super_admin', label: 'Super Admin', icon: Shield, color: 'text-[#00E5FF]', desc: 'Citywide Sensor Grid' },
    { id: 'control_room', label: 'Control Room', icon: Building, color: 'text-zinc-300', desc: 'NASA Mission Control Brain' },
    { id: 'police', label: 'Police Unit', icon: ShieldAlert, color: 'text-blue-400', desc: 'Tactical Force & Barricades' },
    { id: 'hospital', label: 'Hospital Lead', icon: Stethoscope, color: 'text-[#00C853]', desc: 'Trauma Beds & Ambulances' },
    { id: 'traffic', label: 'Traffic Control', icon: Navigation, color: 'text-[#FF6B00]', desc: 'Green Corridor Signals' },
    { id: 'drone', label: 'Drone Pilot', icon: Video, color: 'text-purple-400', desc: 'Aerial Reconnaissance HUD' }
  ];

  const handleRoleSelect = (roleKey) => {
    setSelectedRole(roleKey);
    setUsername(`${roleKey}_officer`);
    setPassword('••••••••');
  };

  const handleLoginSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: selectedRole, username, password })
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem('crowdshield_token', data.token);
        localStorage.setItem('crowdshield_user', JSON.stringify(data.user));
      } else {
        localStorage.setItem('crowdshield_token', 'demo-jwt-token-2026');
        localStorage.setItem('crowdshield_user', JSON.stringify({ role: selectedRole, name: `${selectedRole.toUpperCase()} Officer` }));
      }
      navigate('/dashboard');
    } catch (err) {
      localStorage.setItem('crowdshield_token', 'demo-jwt-token-2026');
      localStorage.setItem('crowdshield_user', JSON.stringify({ role: selectedRole, name: `${selectedRole.toUpperCase()} Officer` }));
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090B] cyber-grid flex items-center justify-center p-6 relative">
      <div className="w-full max-w-lg">
        {/* Header Branding */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-[#00E5FF] flex items-center justify-center shadow-[0_0_20px_rgba(0,229,255,0.4)]">
              <ShieldAlert className="w-7 h-7 text-[#00E5FF]" />
            </div>
          </Link>
          <h1 className="text-2xl font-orbitron font-bold text-white tracking-wide">
            CROWD<span className="text-[#00E5FF]">SHIELD</span> AI
          </h1>
          <p className="text-xs text-zinc-400 font-mono-tech uppercase tracking-widest mt-1">
            Cisco Smart City Operations Gateway — 6 Tactical Roles
          </p>
        </div>

        {/* Card Form */}
        <div className="glass-panel p-6 rounded-2xl border border-zinc-800 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
          <label className="block text-xs font-mono-tech text-zinc-400 uppercase tracking-wider mb-3">
            Select Emergency Authorization Role
          </label>

          {/* 6 Role Tabs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-6">
            {roles.map((r) => {
              const Icon = r.icon;
              const isSelected = selectedRole === r.id;
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => handleRoleSelect(r.id)}
                  className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-black border-[#00E5FF] text-white shadow-[0_0_15px_rgba(0,229,255,0.3)]'
                      : 'bg-[#18181B] border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Icon className={`w-5 h-5 ${r.color}`} />
                    {isSelected && <div className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />}
                  </div>
                  <div>
                    <div className="font-orbitron font-semibold text-xs text-white">{r.label}</div>
                    <div className="text-[9px] font-mono-tech text-zinc-500 line-clamp-1">{r.desc}</div>
                  </div>
                </button>
              );
            })}
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono-tech text-zinc-400 uppercase mb-1">
                Badge / Tactical ID
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full bg-[#09090B] border border-zinc-800 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#00E5FF] font-mono-tech"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3.5 rounded-xl bg-[#00E5FF] text-black font-orbitron font-extrabold text-sm hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(0,229,255,0.4)] flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="font-mono-tech animate-pulse">AUTHORIZING COMMAND SESSION...</span>
              ) : (
                <>
                  AUTHORIZE COMMAND SESSION <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Access Bar */}
          <div className="mt-6 pt-4 border-t border-zinc-800 text-center">
            <span className="text-[10px] text-zinc-500 font-mono-tech block mb-2 uppercase">
              QUICK CISCO SPRINT REVIEW ROLE PRESETS
            </span>
            <div className="flex flex-wrap gap-1.5 justify-center">
              {roles.map(r => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => { setSelectedRole(r.id); setUsername(`${r.id}_officer`); handleLoginSubmit({ preventDefault: () => {} }); }}
                  className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[10px] font-mono-tech"
                >
                  ⚡ {r.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
