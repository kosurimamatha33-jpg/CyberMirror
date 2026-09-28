import React, { useState } from 'react';
import { useCyber } from '../context/CyberContext';
import { 
  ShieldCheck, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingDown, 
  Sparkles, 
  ArrowRight, 
  RotateCcw, 
  ChevronDown, 
  ChevronUp, 
  Info, 
  Lock, 
  Key, 
  Eye, 
  Smartphone, 
  Database, 
  Network
} from 'lucide-react';

export const DefenderMode: React.FC = () => {
  const { 
    countermeasures, 
    toggleCountermeasure, 
    metrics, 
    baselineScore, 
    navigateTo,
    resetAll
  } = useCyber();

  const [expandedId, setExpandedId] = useState<string | null>('cm-mfa');

  const implementedCount = countermeasures.filter(c => c.implemented).length;
  const totalCount = countermeasures.length;

  const scoreDifference = baselineScore - metrics.overallScore;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'password': return <Key className="w-4 h-4 text-cyan-400" />;
      case 'account': return <Lock className="w-4 h-4 text-sky-400" />;
      case 'privacy': return <Eye className="w-4 h-4 text-rose-400" />;
      case 'device': return <Smartphone className="w-4 h-4 text-indigo-400" />;
      case 'backup': return <Database className="w-4 h-4 text-emerald-400" />;
      default: return <Network className="w-4 h-4 text-amber-400" />;
    }
  };

  return (
    <div className="min-h-screen cyber-grid py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header and Disclaimer */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-emerald-950/70 border border-emerald-500/30 text-xs font-mono text-emerald-300 uppercase mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>DEFENSIVE REMEDIATION COCKPIT</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Defender Mode — Harden Your Posture
            </h1>
          </div>

          <button
            onClick={resetAll}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 hover:bg-slate-800 text-xs text-slate-300 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Remediations</span>
          </button>
        </div>

        {/* Clear Educational Disclaimer Required by Prompt */}
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-emerald-500/30 text-xs text-slate-300 flex items-center gap-2">
          <Info className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            <strong>Disclaimer:</strong> This score is an educational estimate, not a professional security assessment or penetration test. Remediation steps are simulated best practices designed to teach proactive digital defense.
          </span>
        </div>
      </div>

      {/* Before vs After Exposure Comparison Hero Banner */}
      <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-cyan-500/25 relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Before Score */}
          <div className="md:col-span-4 text-center md:text-left space-y-1">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              Baseline Exposure (Before Defense)
            </span>
            <div className="text-4xl sm:text-5xl font-mono font-extrabold text-rose-400">
              🔴 {baselineScore}<span className="text-lg text-slate-400 font-sans font-normal">/100</span>
            </div>
            <span className="text-xs text-rose-300 font-medium">Unmitigated Attack Surface</span>
          </div>

          {/* Animated Diff / Improvement Center Badge */}
          <div className="md:col-span-4 flex flex-col items-center justify-center py-2">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
              <TrendingDown className="w-5 h-5 text-emerald-400" />
              <div className="text-xs font-mono font-bold text-white">
                <span className="text-emerald-400 text-sm font-extrabold">-{scoreDifference} Points</span> Mitigated
              </div>
            </div>
            <span className="text-[11px] text-slate-400 font-mono mt-2">
              {implementedCount} of {totalCount} Countermeasures Applied
            </span>
          </div>

          {/* After Score */}
          <div className="md:col-span-4 text-center md:text-right space-y-1">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              Hardened Exposure (After Defense)
            </span>
            <div className={`text-4xl sm:text-5xl font-mono font-extrabold ${
              metrics.overallScore >= 60 ? 'text-amber-400' : 'text-emerald-400'
            }`}>
              🟢 {metrics.overallScore}<span className="text-lg text-slate-400 font-sans font-normal">/100</span>
            </div>
            <span className="text-xs text-emerald-300 font-medium">
              {metrics.level.toUpperCase()} RESILIENCE POSTURE
            </span>
          </div>
        </div>
      </div>

      {/* Countermeasures Remediation List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-mono uppercase font-semibold text-cyan-400">
            ACTIONABLE DEFENSIVE COUNTERMEASURES:
          </span>
          <span>Click "Fix This Risk" to simulate applying security controls</span>
        </div>

        <div className="space-y-4">
          {countermeasures.map((cm) => {
            const isExpanded = expandedId === cm.id;
            return (
              <div
                key={cm.id}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  cm.implemented
                    ? 'border-emerald-500/40 bg-emerald-950/20 shadow-md shadow-emerald-500/5'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                }`}
              >
                {/* Main Row */}
                <div className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                      cm.implemented
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                        : 'bg-slate-800 border-slate-700 text-slate-400'
                    }`}>
                      {cm.implemented ? <CheckCircle2 className="w-5 h-5" /> : getCategoryIcon(cm.category)}
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-bold text-white">
                          {cm.title}
                        </h3>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                          {cm.difficulty}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                          -{cm.impactScoreReduction} Exposure
                        </span>
                      </div>

                      <div className="text-xs text-slate-400 flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="text-rose-400 font-mono">Risk: {cm.riskTrigger}</span>
                        <span>·</span>
                        <span>Category: {cm.categoryLabel}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-800">
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : cm.id)}
                      className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-mono transition-colors"
                    >
                      <span>{isExpanded ? 'Hide Guide' : 'Implementation Guide'}</span>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    <button
                      onClick={() => toggleCountermeasure(cm.id)}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95 ${
                        cm.implemented
                          ? 'bg-emerald-500/20 border border-emerald-400 text-emerald-300 hover:bg-emerald-500/30'
                          : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-md shadow-emerald-500/20'
                      }`}
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>{cm.implemented ? 'Risk Fixed ✓' : 'Fix This Risk'}</span>
                    </button>
                  </div>
                </div>

                {/* Expanded Implementation Guide & Threat Context */}
                {isExpanded && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-800/80 bg-slate-950/60 space-y-4 text-xs">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <div className="p-3.5 rounded-lg bg-rose-950/20 border border-rose-900/40 space-y-1">
                        <span className="font-mono font-bold text-rose-400 flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>Simulated Threat Impact:</span>
                        </span>
                        <p className="text-slate-300 leading-relaxed">
                          {cm.threatImpact}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-lg bg-emerald-950/20 border border-emerald-900/40 space-y-1">
                        <span className="font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>Defensive Solution:</span>
                        </span>
                        <p className="text-slate-300 leading-relaxed">
                          {cm.defenseAction}
                        </p>
                      </div>
                    </div>

                    {/* Step-by-Step Implementation Guide */}
                    <div className="space-y-2 pt-2">
                      <span className="font-mono font-semibold text-slate-300 uppercase tracking-wide">
                        Step-by-Step Hardening Protocol:
                      </span>
                      <div className="space-y-1.5">
                        {cm.actionGuideSteps.map((step, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-slate-300 p-2 rounded bg-slate-900/40">
                            <span className="font-mono font-bold text-cyan-400 shrink-0">{idx + 1}.</span>
                            <span className="leading-relaxed">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation to Dashboard */}
      <div className="pt-4 flex justify-between items-center">
        <button
          onClick={() => navigateTo('security-check')}
          className="text-xs font-mono text-slate-400 hover:text-white transition-colors"
        >
          ← Retake Security Check
        </button>

        <button
          onClick={() => navigateTo('dashboard')}
          className="px-6 py-3 rounded-xl bg-cyan-500 text-slate-950 hover:bg-cyan-400 text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/20"
        >
          <span>View Updated Security Dashboard</span>
          <ArrowRight className="w-4 h-4 text-slate-950" />
        </button>
      </div>
    </div>
  );
};
