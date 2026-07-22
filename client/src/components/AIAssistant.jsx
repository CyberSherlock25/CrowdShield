import React, { useState, useEffect } from 'react';
import { Bot, MessageSquare, X, Send, Sparkles, AlertCircle } from 'lucide-react';

export default function AIAssistant({ riskScore, activeScenario }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'ShieldAI Tactical Assistant online. Monitoring perimeter density and stampede hazard metrics.' }
  ]);
  const [inputMsg, setInputMsg] = useState('');

  // Auto-push tactical advice when risk score changes
  useEffect(() => {
    if (riskScore > 80) {
      setMessages(prev => [
        ...prev,
        { sender: 'ai', text: 'ALERT: Stampede Hazard Critical (>80)! Recommending immediate activation of Gate 1 halt and redirection to Gate 2 & Gate 3.' }
      ]);
    } else if (riskScore > 50) {
      setMessages(prev => [
        ...prev,
        { sender: 'ai', text: 'NOTICE: Gate 1 density rising above threshold. Recommend reinforcing Police Unit Alpha at North Concourse.' }
      ]);
    }
  }, [riskScore]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const userText = inputMsg;
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInputMsg('');

    // Generate smart response
    setTimeout(() => {
      let reply = "All parameters nominal. Evacuation vectors clear.";
      if (userText.toLowerCase().includes('gate') || userText.toLowerCase().includes('crowd')) {
        reply = `Current total crowd density is optimal across 3 gates. Gate 1 bottleneck is being monitored via YOLO Cam 1.`;
      } else if (userText.toLowerCase().includes('police') || userText.toLowerCase().includes('ambulance')) {
        reply = `Police Unit Alpha is positioned at North Perimeter (ETA 2m). 8 Ambulances are on standby with Green Corridor ready.`;
      } else if (userText.toLowerCase().includes('stampede') || userText.toLowerCase().includes('risk')) {
        reply = `AI Stampede Prediction Engine is analyzing crowd velocity vectors. Current Risk Index: ${riskScore || 18}/100.`;
      }
      setMessages(prev => [...prev, { sender: 'ai', text: reply }]);
    }, 600);
  };

  return (
    <div className="fixed bottom-4 right-4 z-[9000]">
      {/* Floating Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="relative w-12 h-12 rounded-full bg-cyan-950 border-2 border-[#00E5FF] text-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.5)] flex items-center justify-center hover:scale-105 transition-all group"
        >
          <Bot className="w-6 h-6 animate-pulse" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#00C853] border-2 border-black" />
        </button>
      )}

      {/* Assistant Window */}
      {isOpen && (
        <div className="w-80 sm:w-96 h-96 glass-panel-cyan rounded-2xl border border-[#00E5FF]/40 shadow-[0_0_40px_rgba(0,229,255,0.2)] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-[#18181B] p-3 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-[#00E5FF]" />
              <div>
                <div className="font-orbitron font-bold text-xs text-white">ShieldAI Tactical Assistant</div>
                <div className="text-[9px] font-mono-tech text-[#00C853] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00C853] animate-pulse" /> ONLINE & MONITORING
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-zinc-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2.5 font-mono-tech text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-2 rounded-lg ${
                    m.sender === 'user'
                      ? 'bg-[#00E5FF] text-black font-semibold'
                      : 'bg-[#18181B] text-zinc-200 border border-zinc-800'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-2 border-t border-zinc-800 bg-[#09090B] flex gap-2">
            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              placeholder="Ask ShieldAI..."
              className="flex-1 bg-[#18181B] border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#00E5FF] font-mono-tech"
            />
            <button
              type="submit"
              className="p-2 rounded-lg bg-[#00E5FF] text-black hover:bg-cyan-300 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
