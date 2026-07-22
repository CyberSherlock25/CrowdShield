import React, { useState } from 'react';
import { Megaphone, Volume2, Globe, Check } from 'lucide-react';

export default function MultilingualAlerts({ activeGate = "Gate 2" }) {
  const [activeLang, setActiveLang] = useState('en');
  const [speaking, setSpeaking] = useState(false);

  const announcements = {
    en: {
      lang: "English",
      title: "Public Address Broadcast",
      text: `Attention. Please remain calm. Proceed to ${activeGate}.`
    },
    hi: {
      lang: "Hindi (हिंदी)",
      title: "सार्वजनिक घोषणा",
      text: `कृपया शांत रहें। ${activeGate === "Gate 2" ? "गेट 2" : activeGate} की ओर जाएं।`
    },
    mr: {
      lang: "Marathi (मराठी)",
      title: "सार्वजनिक घोषणा",
      text: `कृपया शांत राहा. ${activeGate === "Gate 2" ? "गेट २" : activeGate} कडे जा.`
    }
  };

  const handleSpeak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => setSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="glass-panel rounded-xl p-3 border border-zinc-800 flex flex-col h-full">
      {/* Title */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Megaphone className="w-4 h-4 text-[#00E5FF] animate-pulse" />
          <span className="font-orbitron font-bold text-xs text-white uppercase tracking-wider">
            Multilingual Evacuation Broadcast
          </span>
        </div>
        <span className="text-[10px] font-mono-tech text-zinc-400">AUDIO & LED BOARDS</span>
      </div>

      {/* Language Tabs */}
      <div className="flex items-center gap-1.5 mb-2 bg-[#09090B] p-1 rounded border border-zinc-800">
        {Object.keys(announcements).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setActiveLang(key)}
            className={`flex-1 py-1 rounded text-[11px] font-mono-tech transition-all ${
              activeLang === key
                ? 'bg-[#00E5FF] text-black font-bold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            {announcements[key].lang.split(' ')[0]}
          </button>
        ))}
      </div>

      {/* Selected Language Display Card */}
      <div className="bg-[#09090B] p-3 rounded-lg border border-zinc-800 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[10px] font-mono-tech text-zinc-500 mb-1">
            <span>{announcements[activeLang].lang}</span>
            <span>SYNCED TO VENUE SPEAKERS</span>
          </div>
          <p className="text-sm font-semibold text-white leading-relaxed">
            "{announcements[activeLang].text}"
          </p>
        </div>

        <button
          type="button"
          onClick={() => handleSpeak(announcements[activeLang].text)}
          className="mt-3 w-full py-1.5 rounded bg-cyan-950 border border-[#00E5FF]/40 text-[#00E5FF] hover:bg-[#00E5FF] hover:text-black font-mono-tech text-xs flex items-center justify-center gap-2 transition-all"
        >
          <Volume2 className="w-3.5 h-3.5" />
          <span>{speaking ? "BROADCASTING AUDIO..." : "TEST PUBLIC SPEAKER AUDIO"}</span>
        </button>
      </div>
    </div>
  );
}
