import React, { useState } from 'react';
import { useCyber } from '../context/CyberContext';
import { SECURITY_QUESTIONS } from '../data/cyberData';
import { 
  ShieldAlert, 
  ShieldCheck, 
  HelpCircle, 
  AlertTriangle, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  RotateCcw, 
  TrendingUp, 
  Key, 
  Lock, 
  Network, 
  Eye, 
  Smartphone, 
  Database,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export const SecurityCheck: React.FC = () => {
  const { answers, setAnswer, resetAnswers, metrics, navigateTo } = useCyber();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  const currentQ = SECURITY_QUESTIONS[activeQuestionIndex];
  const selectedOptionId = answers[currentQ.id];

  const handleSelectOption = (optionId: string) => {
    setAnswer(currentQ.id, optionId);
  };

  const getScoreRiskColor = (score: number) => {
    if (score >= 70) return 'text-rose-400 border-rose-500/40 bg-rose-950/30';
    if (score >= 40) return 'text-amber-400 border-amber-500/40 bg-amber-950/30';
    return 'text-emerald-400 border-emerald-500/40 bg-emerald-950/30';
  };

  const getBarColor = (score: number) => {
    if (score >= 70) return 'bg-rose-500';
    if (score >= 40) return 'bg-amber-500';
    return 'bg-emerald-500';
  };

  // Category metrics mapping
  const categoryBreakdown = [
    { label: 'Password Security', score: metrics.passwordSecurity, icon: <Key className="w-4 h-4 text-cyan-400" /> },
    { label: 'Account Security', score: metrics.accountSecurity, icon: <Lock className="w-4 h-4 text-sky-400" /> },
    { label: 'Social Engineering Risk', score: metrics.socialEngineeringRisk, icon: <Network className="w-4 h-4 text-amber-400" /> },
    { label: 'Privacy Exposure', score: metrics.privacyExposure, icon: <Eye className="w-4 h-4 text-rose-400" /> },
    { label: 'Device Security', score: metrics.deviceSecurity, icon: <Smartphone className="w-4 h-4 text-indigo-400" /> },
    { label: 'Backup & Recovery', score: metrics.backupRecovery, icon: <Database className="w-4 h-4 text-emerald-400" /> },
  ];

  return (
    <div className="min-h-screen cyber-grid py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Educational Banner Guarantee */}
      <div className="mb-6 p-4 rounded-xl bg-slate-900/80 border border-cyan-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-cyan-300">
          <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
          <span>
            <strong>Zero Data Collection Policy:</strong> This questionnaire tests behavioral patterns only. CyberMirror NEVER asks for your actual passwords, OTPs, bank credentials, email logins, or private personal data.
          </span>
        </div>
        <button
          onClick={resetAnswers}
          className="flex items-center gap-1.5 px-3 py-1 rounded border border-slate-700 hover:bg-slate-800 text-slate-300 transition-colors shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Answers</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Interactive Questionnaire (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Question Stepper Indicator */}
          <div className="glass-panel rounded-xl p-4 border border-slate-800">
            <div className="flex items-center justify-between text-xs mb-3">
              <span className="font-mono text-cyan-400 uppercase font-semibold">
                Question {activeQuestionIndex + 1} of {SECURITY_QUESTIONS.length}
              </span>
              <span className="text-slate-400 font-mono">
                {metrics.completedQuestionsCount}/{SECURITY_QUESTIONS.length} Answered
              </span>
            </div>

            {/* Stepper bar */}
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden flex gap-1">
              {SECURITY_QUESTIONS.map((q, idx) => {
                const isAnswered = !!answers[q.id];
                const isCurrent = idx === activeQuestionIndex;
                return (
                  <button
                    key={q.id}
                    onClick={() => setActiveQuestionIndex(idx)}
                    title={`Question ${idx + 1}: ${q.categoryLabel}`}
                    className={`h-full flex-1 transition-all ${
                      isCurrent 
                        ? 'bg-cyan-400 ring-2 ring-cyan-300 ring-offset-1 ring-offset-slate-900' 
                        : isAnswered 
                          ? 'bg-cyan-600 hover:bg-cyan-500' 
                          : 'bg-slate-700 hover:bg-slate-600'
                    }`}
                  />
                );
              })}
            </div>
          </div>

          {/* Question Card */}
          <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-cyan-500/25 space-y-6 relative overflow-hidden">
            {/* Header category badge */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-900 border border-cyan-500/30 text-cyan-300 uppercase">
                {currentQ.categoryLabel}
              </span>
              <span className="text-xs text-slate-400 font-mono">ID: {currentQ.id}</span>
            </div>

            {/* Question Title */}
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
              {currentQ.title}
            </h2>

            {/* Real-world Threat Context */}
            <div className="p-3.5 rounded-lg bg-slate-950/70 border border-slate-800 text-xs text-slate-300 space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-cyan-400">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <span>Threat Context & Impact:</span>
              </div>
              <p className="leading-relaxed text-slate-300">{currentQ.scenarioContext}</p>
              <p className="text-[11px] text-slate-400 italic pt-1">{currentQ.whyItMatters}</p>
            </div>

            {/* Answer Options */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                Select Your Typical Practice:
              </span>

              {currentQ.options.map((option) => {
                const isSelected = selectedOptionId === option.id;
                const isHighRisk = option.riskScore >= 7;
                return (
                  <div
                    key={option.id}
                    onClick={() => handleSelectOption(option.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-cyan-400 bg-cyan-950/40 shadow-md shadow-cyan-500/10 ring-1 ring-cyan-400/50'
                        : 'border-slate-800 bg-slate-900/50 hover:border-slate-700 hover:bg-slate-900/80'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full border mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                        isSelected 
                          ? 'border-cyan-400 bg-cyan-400 text-slate-950' 
                          : 'border-slate-600 bg-slate-800'
                      }`}>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>

                      <div className="flex-1 space-y-1">
                        <div className="text-sm font-semibold text-white">
                          {option.label}
                        </div>
                        {option.subtext && (
                          <div className="text-xs text-slate-400">
                            {option.subtext}
                          </div>
                        )}
                        {isSelected && (
                          <div className={`mt-2 pt-2 border-t border-slate-800 text-xs flex items-center justify-between ${
                            isHighRisk ? 'text-rose-400' : 'text-emerald-400'
                          }`}>
                            <span>Simulated Risk: {option.riskFactor}</span>
                            <span className="font-mono font-bold">Impact: +{option.riskScore}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Question Navigation Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                disabled={activeQuestionIndex === 0}
                onClick={() => setActiveQuestionIndex(prev => Math.max(0, prev - 1))}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-lg text-slate-300 border border-slate-700 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>

              {activeQuestionIndex < SECURITY_QUESTIONS.length - 1 ? (
                <button
                  onClick={() => setActiveQuestionIndex(prev => Math.min(SECURITY_QUESTIONS.length - 1, prev + 1))}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-colors"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={() => navigateTo('defender-mode')}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20"
                >
                  <span>Proceed to Defender Mode</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Live Simulated Exposure Score & Category Breakdown (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Main Simulated Exposure Score Card */}
          <div className="glass-panel rounded-2xl p-6 border border-cyan-500/25 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                SIMULATED EXPOSURE SCORE
              </span>
              <span className="text-[11px] font-mono text-slate-400">DYNAMIC TELEMETRY</span>
            </div>

            {/* Score Big Display */}
            <div className="text-center py-4 space-y-2">
              <div className="inline-block relative">
                <div className={`text-6xl sm:text-7xl font-extrabold font-mono tracking-tight ${
                  metrics.overallScore >= 70 ? 'text-rose-400' :
                  metrics.overallScore >= 40 ? 'text-amber-400' : 'text-emerald-400'
                }`}>
                  {metrics.overallScore}
                  <span className="text-2xl text-slate-400 font-sans font-normal">/100</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2">
                <span className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold uppercase tracking-wider border ${getScoreRiskColor(metrics.overallScore)}`}>
                  {metrics.level} RISK LEVEL
                </span>
              </div>

              <p className="text-xs text-slate-400 max-w-xs mx-auto pt-1 leading-relaxed">
                {metrics.overallScore >= 70 
                  ? 'Significant attack vectors identified. High probability of credential stuffing or phishing exploitation.'
                  : metrics.overallScore >= 40
                  ? 'Moderate digital exposure. Key identity and network boundaries require hardening.'
                  : 'Robust defensive posture. Low adversary exposure profile.'}
              </p>
            </div>

            {/* Overall Exposure Meter Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-slate-400 font-mono">
                <span>Hardened (0)</span>
                <span>Critical Exposure (100)</span>
              </div>
              <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden p-0.5 border border-slate-800">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${getBarColor(metrics.overallScore)}`}
                  style={{ width: `${metrics.overallScore}%` }}
                />
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="space-y-3 pt-3 border-t border-slate-800">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Risk by Domain:
              </span>

              <div className="space-y-2.5">
                {categoryBreakdown.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-slate-300">
                        {item.icon}
                        <span>{item.label}</span>
                      </div>
                      <span className={`font-mono font-semibold ${
                        item.score >= 70 ? 'text-rose-400' :
                        item.score >= 40 ? 'text-amber-400' : 'text-emerald-400'
                      }`}>
                        {item.score}% Risk
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${getBarColor(item.score)}`}
                        style={{ width: `${Math.max(8, item.score)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Next Step Buttons */}
            <div className="pt-2 space-y-2">
              <button
                onClick={() => navigateTo('defender-mode')}
                className="w-full py-2.5 px-4 rounded-lg bg-emerald-500 text-slate-950 hover:bg-emerald-400 text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                <ShieldCheck className="w-4 h-4 text-slate-950" />
                <span>Fix Identified Risks in Defender Mode</span>
              </button>

              <button
                onClick={() => navigateTo('exposure-map')}
                className="w-full py-2.5 px-4 rounded-lg bg-slate-800 text-cyan-300 hover:bg-slate-700 text-xs font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Network className="w-4 h-4 text-cyan-400" />
                <span>View My Digital Exposure Map</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
