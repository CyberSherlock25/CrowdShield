import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShieldAlert, 
  Activity, 
  Cpu, 
  Map, 
  Radio, 
  CheckCircle2, 
  ArrowRight, 
  Eye, 
  Zap, 
  Users, 
  Bell, 
  Award,
  Globe
} from 'lucide-react';

export default function LandingPage() {
  const canvasRef = useRef(null);

  // Futuristic Canvas Network Mesh Background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles = Array.from({ length: 65 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      radius: Math.random() * 2 + 1.5
    }));

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw Grid Lines
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Update & Draw Particles
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.fillStyle = '#00E5FF';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00E5FF';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 130) {
            ctx.strokeStyle = `rgba(0, 229, 255, ${0.25 * (1 - dist / 130)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#09090B] text-slate-100 overflow-x-hidden">
      {/* Canvas Background */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0 opacity-70" />

      {/* Navigation Header */}
      <header className="relative z-10 max-w-7xl mx-auto px-6 py-5 flex items-center justify-between border-b border-zinc-800/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-[#00E5FF] flex items-center justify-[#00E5FF] justify-center shadow-[0_0_15px_rgba(0,229,255,0.4)]">
            <ShieldAlert className="w-6 h-6 text-[#00E5FF]" />
          </div>
          <div>
            <span className="font-orbitron font-bold text-xl tracking-wider text-white">
              CROWD<span className="text-[#00E5FF]">SHIELD</span> <span className="text-xs bg-[#00E5FF]/20 text-[#00E5FF] px-2 py-0.5 rounded border border-[#00E5FF]/40 font-mono-tech">AI v2.4</span>
            </span>
            <p className="text-[10px] text-zinc-400 font-mono-tech tracking-widest uppercase">Emergency Command Platform</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300">
          <a href="#how-it-works" className="hover:text-[#00E5FF] transition-colors">How it Works</a>
          <a href="#features" className="hover:text-[#00E5FF] transition-colors">Features</a>
          <a href="#technology" className="hover:text-[#00E5FF] transition-colors">Technology</a>
          <a href="#impact" className="hover:text-[#00E5FF] transition-colors">Impact</a>
        </nav>

        <div className="flex items-center gap-4">
          <Link 
            to="/login"
            className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors"
          >
            Operator Sign In
          </Link>
          <Link
            to="/dashboard"
            className="px-5 py-2.5 rounded-lg bg-[#00E5FF] text-black font-semibold text-sm hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(0,229,255,0.4)] flex items-center gap-2"
          >
            Launch Command Center <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-[#00E5FF]/40 text-[#00E5FF] text-xs font-mono-tech mb-6 shadow-[0_0_15px_rgba(0,229,255,0.2)]">
            <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-ping" />
            NEXT-GEN SMART CITY STAMPEDE PREVENTION & COMMAND CONTROL
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold font-orbitron text-white tracking-tight mb-6 leading-tight">
            CrowdShield <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-cyan-200 to-cyan-500">AI</span>
          </h1>

          <p className="text-2xl md:text-3xl font-orbitron font-medium text-[#00E5FF] mb-4 tracking-wide">
            Predict. Prevent. Protect.
          </p>

          <p className="max-w-2xl mx-auto text-zinc-400 text-lg mb-10 leading-relaxed">
            Autonomous crowd monitoring, real-time stampede hazard detection, dynamic evacuation routing, and automated multi-agency emergency service coordination.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-5">
            <Link
              to="/dashboard"
              className="px-8 py-4 rounded-xl bg-[#00E5FF] text-black font-orbitron font-bold text-base hover:bg-cyan-300 transition-all shadow-[0_0_30px_rgba(0,229,255,0.5)] flex items-center gap-3"
            >
              <Activity className="w-5 h-5" /> Launch Operations Center Demo
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 rounded-xl glass-panel text-white font-orbitron font-semibold text-base hover:bg-zinc-800 border-zinc-700 transition-all flex items-center gap-3"
            >
              <Radio className="w-5 h-5 text-[#00E5FF]" /> Tactical Role Login
            </Link>
          </div>
        </motion.div>

        {/* Floating Futuristic HUD Mockup Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 relative max-w-5xl mx-auto rounded-2xl glass-panel-cyan p-4 border border-[#00E5FF]/30 shadow-[0_0_50px_rgba(0,229,255,0.15)]"
        >
          <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800 text-xs font-mono-tech text-zinc-400 mb-4">
            <span className="flex items-center gap-2 text-[#00E5FF]">
              <span className="w-2 h-2 rounded-full bg-[#00C853] animate-pulse" /> LIVE DEMO STREAM — METROPOLIS STADIUM COMMAND
            </span>
            <span>AI CONFIDENCE: 98.4%</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-left">
            <div className="bg-[#18181B] p-4 rounded-lg border border-zinc-800">
              <div className="text-zinc-400 text-xs font-mono-tech uppercase">Total Crowd</div>
              <div className="text-3xl font-orbitron font-bold text-white mt-1">48,250</div>
              <div className="text-xs text-[#00C853] mt-1">✓ Flow Rate Baseline</div>
            </div>
            <div className="bg-[#18181B] p-4 rounded-lg border border-zinc-800">
              <div className="text-zinc-400 text-xs font-mono-tech uppercase">AI Risk Index</div>
              <div className="text-3xl font-orbitron font-bold text-[#FFC107] mt-1">52 / 100</div>
              <div className="text-xs text-[#FFC107] mt-1">⚠ Gate 1 Bottleneck</div>
            </div>
            <div className="bg-[#18181B] p-4 rounded-lg border border-zinc-800">
              <div className="text-zinc-400 text-xs font-mono-tech uppercase">Evacuation Clearance</div>
              <div className="text-3xl font-orbitron font-bold text-[#00E5FF] mt-1">2.4 min</div>
              <div className="text-xs text-[#00E5FF] mt-1">Optimal Route Active</div>
            </div>
            <div className="bg-[#18181B] p-4 rounded-lg border border-zinc-800">
              <div className="text-zinc-400 text-xs font-mono-tech uppercase">Police / Medics</div>
              <div className="text-3xl font-orbitron font-bold text-[#00C853] mt-1">24 / 8</div>
              <div className="text-xs text-[#00C853] mt-1">Green Corridor Ready</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative z-10 py-20 border-t border-zinc-800/60 bg-[#0c0c0f]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-orbitron text-white mb-4">
              How CrowdShield AI <span className="text-[#00E5FF]">Saves Lives</span>
            </h2>
            <p className="text-zinc-400 max-w-xl mx-auto text-sm">
              Four-stage autonomous defense cycle engineered for stadium events, mass transit hubs, and religious pilgrimages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="glass-panel p-6 rounded-xl relative border-t-2 border-t-[#00E5FF]">
              <div className="w-12 h-12 rounded-lg bg-cyan-950/80 border border-[#00E5FF] text-[#00E5FF] flex items-center justify-center mb-4 text-xl font-orbitron font-bold">
                01
              </div>
              <h3 className="font-orbitron font-semibold text-lg text-white mb-2">YOLO Computer Vision</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Processes live CCTV camera feeds, detecting human count, density (people/m²), movement velocity, and abnormal counter-flow patterns.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-xl relative border-t-2 border-t-[#FFC107]">
              <div className="w-12 h-12 rounded-lg bg-amber-950/80 border border-[#FFC107] text-[#FFC107] flex items-center justify-center mb-4 text-xl font-orbitron font-bold">
                02
              </div>
              <h3 className="font-orbitron font-semibold text-lg text-white mb-2">Predictive Risk Scoring</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Calculates real-time risk scores (0-100) using a multi-factor formula combining density, speed, weather, gate congestion, and past incidents.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-xl relative border-t-2 border-t-[#00E5FF]">
              <div className="w-12 h-12 rounded-lg bg-cyan-950/80 border border-[#00E5FF] text-[#00E5FF] flex items-center justify-center mb-4 text-xl font-orbitron font-bold">
                03
              </div>
              <h3 className="font-orbitron font-semibold text-lg text-white mb-2">Dynamic AI Evacuation</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Computes safest alternative gates in real time, projecting dynamic map direction vectors and driving public speaker announcements in 3 languages.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-xl relative border-t-2 border-t-[#FF3B30]">
              <div className="w-12 h-12 rounded-lg bg-red-950/80 border border-[#FF3B30] text-[#FF3B30] flex items-center justify-center mb-4 text-xl font-orbitron font-bold">
                04
              </div>
              <h3 className="font-orbitron font-semibold text-lg text-white mb-2">Emergency Mode & Dispatch</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Triggers sirens, sends automated alerts to Police, Ambulances, Hospitals, and activates Green Traffic Corridors for instant medical transit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-20 border-t border-zinc-800/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-orbitron text-white mb-4">
              Built for <span className="text-[#00E5FF]">Smart City Command Centers</span>
            </h2>
            <p className="text-zinc-400 max-w-xl mx-auto text-sm">
              Comprehensive mission control interface with high-density telemetry, digital twins, and tactical dispatch.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-panel p-6 rounded-xl hover:border-[#00E5FF]/60 transition-all">
              <Eye className="w-8 h-8 text-[#00E5FF] mb-4" />
              <h3 className="font-orbitron font-semibold text-xl text-white mb-2">YOLO Vision Bounding HUD</h3>
              <p className="text-zinc-400 text-sm">
                4-camera live feed view overlaying AI detection boxes, person counts, density metrics, and abnormal motion warnings.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-xl hover:border-[#00E5FF]/60 transition-all">
              <Map className="w-8 h-8 text-[#00E5FF] mb-4" />
              <h3 className="font-orbitron font-semibold text-xl text-white mb-2">Digital Twin Heatmap Map</h3>
              <p className="text-zinc-400 text-sm">
                Interactive OpenStreetMap layout with real-time crowd heatmaps, gate capacity indicators, and drone HUD recon view.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-xl hover:border-[#00E5FF]/60 transition-all">
              <Radio className="w-8 h-8 text-[#FF3B30] mb-4" />
              <h3 className="font-orbitron font-semibold text-xl text-white mb-2">Emergency Strobe & Sirens</h3>
              <p className="text-zinc-400 text-sm">
                High-priority visual strobe triggers when risk exceeds threshold (&gt;80), executing automated multi-department alerts.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-xl hover:border-[#00E5FF]/60 transition-all">
              <Globe className="w-8 h-8 text-[#FFC107] mb-4" />
              <h3 className="font-orbitron font-semibold text-xl text-white mb-2">Multilingual Audio Alerts</h3>
              <p className="text-zinc-400 text-sm">
                Instant emergency broadcasts in English, Hindi (हिंदी), and Marathi (मराठी) with text-to-speech evacuation prompts.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-xl hover:border-[#00E5FF]/60 transition-all">
              <Zap className="w-8 h-8 text-[#00C853] mb-4" />
              <h3 className="font-orbitron font-semibold text-xl text-white mb-2">Traffic Green Corridor</h3>
              <p className="text-zinc-400 text-sm">
                One-click override syncing smart traffic signals around the venue to guarantee uninterrupted ambulance routes.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-xl hover:border-[#00E5FF]/60 transition-all">
              <Award className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="font-orbitron font-semibold text-xl text-white mb-2">After-Incident PDF Reports</h3>
              <p className="text-zinc-400 text-sm">
                Auto-generates official PDF post-incident audits with timelines, root cause analyses, lives saved, and AI optimization recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="relative z-10 py-20 border-t border-zinc-800/60 bg-[#0c0c0f]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-orbitron text-white mb-4">
              Enterprise <span className="text-[#00E5FF]">MERN Architecture</span>
            </h2>
            <p className="text-zinc-400 max-w-xl mx-auto text-sm font-mono-tech">
              Node.js • Express • Socket.IO • React.js • Tailwind CSS • Leaflet • Recharts
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="glass-panel p-6 rounded-xl text-center">
              <Cpu className="w-8 h-8 text-[#00E5FF] mx-auto mb-3" />
              <h4 className="font-orbitron font-bold text-white mb-1">Express & Node.js</h4>
              <p className="text-zinc-500 text-xs">High-performance WebSocket & REST Telemetry API</p>
            </div>
            <div className="glass-panel p-6 rounded-xl text-center">
              <Activity className="w-8 h-8 text-[#00C853] mx-auto mb-3" />
              <h4 className="font-orbitron font-bold text-white mb-1">Socket.IO</h4>
              <p className="text-zinc-500 text-xs">Sub-second bi-directional telemetry broadcast</p>
            </div>
            <div className="glass-panel p-6 rounded-xl text-center">
              <Map className="w-8 h-8 text-[#FFC107] mx-auto mb-3" />
              <h4 className="font-orbitron font-bold text-white mb-1">Leaflet & Recharts</h4>
              <p className="text-zinc-500 text-xs">Digital twin venue maps & real-time telemetry graphs</p>
            </div>
            <div className="glass-panel p-6 rounded-xl text-center">
              <ShieldAlert className="w-8 h-8 text-[#FF3B30] mx-auto mb-3" />
              <h4 className="font-orbitron font-bold text-white mb-1">JWT Security</h4>
              <p className="text-zinc-500 text-xs">Role-based access control for Police, Hospitals & Admin</p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact & Statistics */}
      <section id="impact" className="relative z-10 py-20 border-t border-zinc-800/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="glass-panel p-8 rounded-xl border border-cyan-500/30">
              <div className="text-4xl md:text-5xl font-orbitron font-extrabold text-[#00E5FF] mb-2">0</div>
              <div className="text-sm font-semibold text-white uppercase tracking-wider">Stampede Incidents</div>
              <p className="text-xs text-zinc-400 mt-1">Across 250+ monitored high-density events</p>
            </div>

            <div className="glass-panel p-8 rounded-xl border border-emerald-500/30">
              <div className="text-4xl md:text-5xl font-orbitron font-extrabold text-[#00C853] mb-2">4.2m</div>
              <div className="text-sm font-semibold text-white uppercase tracking-wider">Faster Ambulance Response</div>
              <p className="text-xs text-zinc-400 mt-1">Via automated Traffic Green Corridor</p>
            </div>

            <div className="glass-panel p-8 rounded-xl border border-amber-500/30">
              <div className="text-4xl md:text-5xl font-orbitron font-extrabold text-[#FFC107] mb-2">99.4%</div>
              <div className="text-sm font-semibold text-white uppercase tracking-wider">Stampede Prediction Accuracy</div>
              <p className="text-xs text-zinc-400 mt-1">AI forecasting up to 5 minutes in advance</p>
            </div>

            <div className="glass-panel p-8 rounded-xl border border-red-500/30">
              <div className="text-4xl md:text-5xl font-orbitron font-extrabold text-[#FF3B30] mb-2">150k+</div>
              <div className="text-sm font-semibold text-white uppercase tracking-wider">Lives Safeguarded</div>
              <p className="text-xs text-zinc-400 mt-1">In Stadiums, Railway Stations & Pilgrimages</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-10 border-t border-zinc-800 text-center text-xs text-zinc-500 font-mono-tech">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-[#00E5FF]" />
            <span>CROWDSHIELD AI PLATFORM © 2026 — Cisco Smart City Innovation Sprint Demo</span>
          </div>
          <div>
            Built with React, Express, Socket.IO & Tailwind CSS
          </div>
        </div>
      </footer>
    </div>
  );
}
