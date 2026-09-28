import React, { useState, useEffect } from 'react';
import { useCyber } from '../context/CyberContext';
import { ATTACK_SCENARIOS } from '../data/cyberData';
import { AttackScenario } from '../types/cyber';
import { 
  Swords, 
  ShieldAlert, 
  ShieldCheck, 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronRight, 
  AlertTriangle, 
  Terminal, 
  ArrowRight, 
  Activity, 
  Lock, 
  Cpu, 
  Info,
  CheckCircle2
} from 'lucide-react';

export const AttackSimulator: React.FC = () => {
  const { selectedAttackScenarioId, setSelectedAttackScenarioId, navigateTo } = useCyber();
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const scenario: AttackScenario = ATTACK_SCENARIOS.find(s => s.id === selectedAttackScenarioId) || ATTACK_SCENARIOS[0];

  // Auto-advance when playing
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setTimeout(() => {
        if (activeStepIndex < scenario.chainSteps.length - 1) {
          setActiveStepIndex(prev => prev + 1);
        } else {
          setIsPlaying(false);
        }
      }, 2400);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, activeStepIndex, scenario]);

  const handleSelectScenario = (id: string) => {
    setSelectedAttackScenarioId(id);
    setActiveStepIndex(0);
    setIsPlaying(false);
  };

  const handleRestart = () => {
    setActiveStepIndex(0);
    setIsPlaying(false);
  };

  const currentStep = scenario.chainSteps[activeStepIndex] || scenario.chainSteps[0];

  return (
    <div className="min-h-screen cyber-grid py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header and Safety Guarantee */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-cyan-950/70 border border-cyan-500/30 text-xs font-mono text-cyan-300 uppercase mb-2">
              <Swords className="w-3.5 h-3.5 text-cyan-400" />
              <span>EDUCATIONAL ADVERSARY CHAIN SIMULATOR</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Attack Simulator — "What If?"
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400">
              MITRE ATT&CK: <span className="text-cyan-400 font-bold">{scenario.mitreTechnique}</span>
            </span>
          </div>
        </div>

        {/* Safety Disclaimer Banner */}
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-cyan-500/20 text-xs text-slate-300 flex items-center gap-2">
          <Info className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>
            <strong>Defensive Education Notice:</strong> All scenarios use conceptual visual chains. No real-world attack commands, exploit payloads, or malicious scripts are provided or executed.
          </span>
        </div>
      </div>

      {/* Scenario Selector Pills / Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {ATTACK_SCENARIOS.map((item) => {
          const isSelected = item.id === scenario.id;
          return (
            <button
              key={item.id}
              onClick={() => handleSelectScenario(item.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-2 shrink-0 border ${
                isSelected
                  ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900/70 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
              }`}
            >
              <Swords className={`w-3.5 h-3.5 ${isSelected ? 'text-slate-950' : 'text-cyan-400'}`} />
              <span>{item.userQuestion}</span>
            </button>
          );
        })}
      </div>

      {/* Main Simulation Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Animated Visual Attack Chain (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-cyan-500/25 space-y-6">
            
            {/* Scenario Header */}
            <div className="space-y-1 border-b border-slate-800 pb-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-cyan-400 uppercase font-semibold">{scenario.category}</span>
                <span className="text-rose-400">Success Rate w/o Defense: {scenario.estimatedSuccessRateWithoutDefense}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {scenario.title}
              </h2>
              <p className="text-xs text-slate-300 italic pt-1">
                Trigger: "{scenario.triggerHook}"
              </p>
            </div>

            {/* Attack Chain Visual Stepper Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SIMULATION PHASE: STEP {activeStepIndex + 1} OF {scenario.chainSteps.length}</span>
                <span className="text-cyan-300 font-bold">{currentStep.phaseName}</span>
              </div>

              {/* Step indicator bars */}
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {scenario.chainSteps.map((step, idx) => {
                  const isActive = idx === activeStepIndex;
                  const isPassed = idx < activeStepIndex;
                  return (
                    <button
                      key={step.stepNumber}
                      onClick={() => { setActiveStepIndex(idx); setIsPlaying(false); }}
                      className={`py-2 px-2.5 rounded-lg border text-left transition-all ${
                        isActive
                          ? 'border-cyan-400 bg-cyan-950/60 shadow-md shadow-cyan-500/10 ring-1 ring-cyan-400'
                          : isPassed
                          ? 'border-rose-500/40 bg-rose-950/20 text-rose-300'
                          : 'border-slate-800 bg-slate-900/40 text-slate-500 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-[10px] font-mono uppercase">Phase {step.stepNumber}</div>
                      <div className="text-xs font-semibold truncate text-white mt-0.5">{step.phaseName}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Step Deep Dive Card */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-4 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Phase {currentStep.stepNumber}: {currentStep.phaseName}</span>
                </span>
                <span className="px-2 py-0.5 rounded bg-rose-950/80 border border-rose-500/40 text-[10px] font-mono text-rose-300 uppercase">
                  {currentStep.severity} Severity
                </span>
              </div>

              {/* Attacker Action vs Victim Impact */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                <div className="p-3.5 rounded-lg bg-rose-950/20 border border-rose-900/40 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-rose-400">
                    <Swords className="w-3.5 h-3.5" />
                    <span>Attacker Maneuver:</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {currentStep.attackerAction}
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-400">
                    <Activity className="w-3.5 h-3.5" />
                    <span>System & User Impact:</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {currentStep.systemOrUserImpact}
                  </p>
                </div>
              </div>

              {/* Technical Simulation Mechanism */}
              <div className="pt-2 border-t border-slate-900 flex items-center gap-2 text-xs font-mono text-slate-400">
                <Terminal className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Mechanism: <span className="text-slate-300">{currentStep.technicalMechanism}</span></span>
              </div>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-colors shadow-md shadow-cyan-500/10"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5" />
                      <span>Play Simulation</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleRestart}
                  className="p-2 rounded-lg border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  title="Reset to Phase 1"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  disabled={activeStepIndex === 0}
                  onClick={() => { setActiveStepIndex(prev => Math.max(0, prev - 1)); setIsPlaying(false); }}
                  className="px-3 py-1.5 text-xs font-mono rounded border border-slate-700 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300"
                >
                  Prev
                </button>
                <button
                  disabled={activeStepIndex === scenario.chainSteps.length - 1}
                  onClick={() => { setActiveStepIndex(prev => Math.min(scenario.chainSteps.length - 1, prev + 1)); setIsPlaying(false); }}
                  className="px-3 py-1.5 text-xs font-mono rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-cyan-300"
                >
                  Next Phase
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: "How to Defend" Blueprint (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel rounded-2xl p-6 sm:p-7 border border-emerald-500/30 space-y-6 sticky top-24">
            
            {/* Header */}
            <div className="space-y-1 border-b border-slate-800 pb-4">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>DEFENSIVE COUNTERMEASURES</span>
              </span>
              <h3 className="text-xl font-bold text-white tracking-tight">
                How to Defend Against This Attack
              </h3>
              <p className="text-xs text-slate-400">
                Actionable protocols to break the kill chain before compromise occurs.
              </p>
            </div>

            {/* Primary Recommended Control */}
            <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 space-y-1">
              <div className="text-[10px] font-mono uppercase text-emerald-400 font-bold">
                RECOMMENDED SECURITY CONTROL:
              </div>
              <div className="text-sm font-bold text-white">
                {scenario.recommendedControl}
              </div>
            </div>

            {/* Checklist items */}
            <div className="space-y-2.5">
              <span className="text-xs font-mono text-slate-300 uppercase tracking-wide">
                Step-by-Step Defense Protocol:
              </span>

              <div className="space-y-2">
                {scenario.defenseChecklist.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="pt-2">
              <button
                onClick={() => navigateTo('defender-mode')}
                className="w-full py-3 px-4 rounded-xl bg-emerald-500 text-slate-950 hover:bg-emerald-400 text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                <ShieldCheck className="w-4 h-4 text-slate-950" />
                <span>Apply This Countermeasure in Defender Mode</span>
                <ChevronRight className="w-4 h-4 text-slate-950" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
