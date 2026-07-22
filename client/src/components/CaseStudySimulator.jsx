import React, { useState } from 'react';
import { Play, RotateCcw, ChevronRight, CheckCircle2, AlertTriangle, ShieldAlert, Sparkles } from 'lucide-react';

export default function CaseStudySimulator({ onTriggerStep, onResetSim, currentStepIndex }) {
  const [activeCase, setActiveCase] = useState('case1');
  const [isPlaying, setIsPlaying] = useState(false);

  const cases = [
    { id: 'case1', title: 'Case 1: Stadium Stampede Mitigation', maxSteps: 7 },
    { id: 'case2', title: 'Case 2: Festival Railway Overcrowding', maxSteps: 3 },
    { id: 'case3', title: 'Case 3: Religious Temple Pilgrimage', maxSteps: 3 }
  ];

  const handleNextStep = () => {
    const activeObj = cases.find(c => c.id === activeCase);
    const nextIdx = (currentStepIndex === null ? 0 : currentStepIndex + 1);
    if (nextIdx < activeObj.maxSteps) {
      onTriggerStep(activeCase, nextIdx);
    }
  };

  const handleSelectCase = (caseId) => {
    setActiveCase(caseId);
    onResetSim();
    onTriggerStep(caseId, 0);
  };

  return (
    <div className="glass-panel-cyan rounded-xl p-3.5 border border-[#00E5FF]/40 shadow-[0_0_20px_rgba(0,229,255,0.1)]">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3 pb-2 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#00E5FF] animate-spin" />
          <span className="font-orbitron font-bold text-sm text-white uppercase tracking-wider">
            Case Study Simulation Engine (Demo Mode)
          </span>
        </div>

        {/* Case Selector Tabs */}
        <div className="flex items-center gap-2">
          {cases.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => handleSelectCase(c.id)}
              className={`px-3 py-1 rounded-lg text-xs font-mono-tech transition-all ${
                activeCase === c.id
                  ? 'bg-[#00E5FF] text-black font-bold shadow-[0_0_12px_rgba(0,229,255,0.4)]'
                  : 'bg-[#18181B] text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              {c.title.split(':')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Simulator Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#09090B] p-2.5 rounded-lg border border-zinc-800">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleNextStep}
            className="px-4 py-2 rounded-lg bg-[#00E5FF] text-black font-orbitron font-bold text-xs hover:bg-cyan-300 transition-all shadow-[0_0_15px_rgba(0,229,255,0.4)] flex items-center gap-1.5"
          >
            <Play className="w-3.5 h-3.5 fill-black" />
            <span>PLAY NEXT SIMULATION STEP</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onResetSim}
            className="px-3 py-2 rounded-lg bg-[#18181B] border border-zinc-700 text-zinc-300 hover:text-white text-xs font-mono-tech flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>RESET SIMULATION</span>
          </button>
        </div>

        <div className="text-xs font-mono-tech text-zinc-400">
          STEP <strong className="text-[#00E5FF]">{(currentStepIndex ?? 0) + 1}</strong> OF{' '}
          <strong className="text-white">{cases.find(c => c.id === activeCase)?.maxSteps}</strong>
        </div>
      </div>
    </div>
  );
}
