import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldAlert, Lock, UserCheck, Shield, Building, Stethoscope, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState('control_room');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRoleSelect = (roleKey) => {
    setSelectedRole(roleKey);
    if (roleKey === 'admin') {
      setUsername('admin_commander');
      setPassword('••••••••');
    } else if (roleKey === 'control_room') {
      setUsername('operator_01');
      setPassword('••••••••');
    } else if (roleKey === 'police') {
      setUsername('chief_officer_sharma');
      setPassword('••••••••');
    } else if (roleKey === 'hospital') {
      setUsername('dr_mehta_trauma');
      setPassword('••••••••');
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
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
        navigate('/dashboard');
      } else {
        // Fallback for direct demo access
        localStorage.setItem('crowdshield_token', 'demo-jwt-token-2026');
        localStorage.setItem('crowdshield_user', JSON.stringify({ role: selectedRole, name: `${selectedRole.toUpperCase()} Officer` }));
        navigate('/dashboard');
      }
    } catch (err) {
      // Fallback offline demo login
      localStorage.setItem('crowdshield_token', 'demo-jwt-token-2026');
      localStorage.setItem('crowdshield_user', JSON.stringify({ role: selectedRole, name: `${selectedRole.toUpperCase()} Officer` }));
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const roles = [
    { id: 'admin', label: 'System Admin', icon: Shield, desc: 'Full System Control & Audit Logs' },
    { id: 'control_room', label: 'Control Room', icon: Building, desc: 'Smart City Command Operator' },
    { id: 'police', label: 'Police Unit', icon: ShieldAlert, desc: 'Perimeter Security & Rapid Response' },
    { id: 'hospital', label: 'Hospital Lead', icon: Stethoscope, desc: 'Trauma Care & Ambulance Logistics' }
  ];

  return (
    <div className="min-h-screen bg-[#09090B] cyber-grid flex items-center justify-center p-6 relative">
      <div className="w-full max-w-md">
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
            Tactical Operations Authentication Gateway
          </p>
        </div>

        {/* Card Form */}
        <div className="glass-panel p-6 rounded-2xl border border-zinc-800 shadow-[0_0_40px_rgba(0,0,0,0.8)]">
          <label className="block text-xs font-mono-tech text-zinc-400 uppercase tracking-wider mb-3">
            Select Tactical Authorization Role
          </label>

          {/* Role Tabs Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
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
                      ? 'bg-cyan-950/50 border-[#00E5FF] text-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.2)]'
                      : 'bg-[#18181B] border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Icon className={`w-5 h-5 ${isSelected ? 'text-[#00E5FF]' : 'text-zinc-400'}`} />
                    {isSelected && <div className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />}
                  </div>
                  <div>
                    <div className="font-orbitron font-semibold text-xs text-white">{r.label}</div>
                    <div className="text-[10px] text-zinc-500 line-clamp-1">{r.desc}</div>
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
                value={username || `${selectedRole}_officer`}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full bg-[#09090B] border border-zinc-800 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#00E5FF] font-mono-tech"
                placeholder="Enter Badge ID"
              />
            </div>

            <div>
              <label className="block text-xs font-mono-tech text-zinc-400 uppercase mb-1">
                Security Passcode
              </label>
              <input
                type="password"
                value={password || '••••••••'}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[#09090B] border border-zinc-800 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#00E5FF] font-mono-tech"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 rounded-xl bg-[#00E5FF] text-black font-orbitron font-bold text-sm hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(0,229,255,0.4)] flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="font-mono-tech animate-pulse">AUTHENTICATING...</span>
              ) : (
                <>
                  AUTHORIZE COMMAND SESSION <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Access Bar */}
          <div className="mt-6 pt-4 border-t border-zinc-800 text-center">
            <span className="text-[11px] text-zinc-500 font-mono-tech block mb-2">
              QUICK SPRINT REVIEW PRESETS
            </span>
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                type="button"
                onClick={() => { handleRoleSelect('control_room'); handleLoginSubmit({ preventDefault: () => {} }); }}
                className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[10px] font-mono-tech"
              >
                ⚡ Control Room Demo
              </button>
              <button
                type="button"
                onClick={() => { handleRoleSelect('police'); handleLoginSubmit({ preventDefault: () => {} }); }}
                className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[10px] font-mono-tech"
              >
                🚓 Police Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
