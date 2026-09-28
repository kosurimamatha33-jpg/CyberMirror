import React, { useState } from 'react';
import { useCyber } from '../context/CyberContext';
import { SECURITY_QUIZ_QUESTIONS } from '../data/cyberData';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  AlertTriangle, 
  Info,
  ChevronRight
} from 'lucide-react';

export const SecurityQuiz: React.FC = () => {
  const { navigateTo } = useCyber();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const question = SECURITY_QUIZ_QUESTIONS[currentIdx];
  const selectedOption = selectedAnswers[currentIdx];
  const isAnswered = selectedOption !== undefined;

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedAnswers(prev => ({ ...prev, [currentIdx]: idx }));
  };

  const handleNext = () => {
    if (currentIdx < SECURITY_QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setCurrentIdx(0);
    setIsCompleted(false);
  };

  // Calculate final score
  const correctCount = SECURITY_QUIZ_QUESTIONS.filter((q, idx) => selectedAnswers[idx] === q.correctIndex).length;
  const percentage = Math.round((correctCount / SECURITY_QUIZ_QUESTIONS.length) * 100);

  const getAwarenessLevel = (pct: number) => {
    if (pct >= 90) return { label: 'Advanced Awareness', color: 'text-emerald-400', border: 'border-emerald-500/40', desc: 'Exceptional cybersecurity instinct. You recognize sophisticated psychological and technical vectors.' };
    if (pct >= 71) return { label: 'Security Conscious', color: 'text-cyan-400', border: 'border-cyan-500/40', desc: 'Strong defensive fundamentals. Minor gaps in edge-case threat containment.' };
    if (pct >= 41) return { label: 'Aware', color: 'text-amber-400', border: 'border-amber-500/40', desc: 'Basic familiarity with digital risks. Susceptible to advanced spear-phishing and credential attacks.' };
    return { label: 'Beginner', color: 'text-rose-400', border: 'border-rose-500/40', desc: 'High vulnerability to everyday attack lures. Recommended to study the CyberMirror Learning Hub.' };
  };

  const level = getAwarenessLevel(percentage);

  return (
    <div className="min-h-screen cyber-grid py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-cyan-950/70 border border-cyan-500/30 text-xs font-mono text-cyan-300 uppercase mb-2">
              <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
              <span>DEFENSIVE SCENARIO EVALUATION</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Security Awareness Quiz
            </h1>
          </div>

          <div className="text-xs font-mono text-slate-400">
            {Object.keys(selectedAnswers).length} of {SECURITY_QUIZ_QUESTIONS.length} Questions Answered
          </div>
        </div>

        {/* Clear Educational Non-Certification Notice required by prompt */}
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-cyan-500/20 text-xs text-slate-300 flex items-center gap-2">
          <Info className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>
            <strong>Educational Notice:</strong> This quiz is an awareness self-assessment designed for learning. It is not an accredited certification or formal credential.
          </span>
        </div>
      </div>

      {/* Quiz Card or Result Screen */}
      {!isCompleted ? (
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-cyan-500/25 space-y-6">
          
          {/* Stepper Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <span className="text-xs font-mono text-cyan-400 uppercase font-semibold">
              Scenario {currentIdx + 1} of {SECURITY_QUIZ_QUESTIONS.length} · {question.category}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Score: {correctCount}/{currentIdx + (isAnswered ? 1 : 0)}
            </span>
          </div>

          {/* Context and Question */}
          <div className="space-y-2">
            <div className="text-xs font-mono text-slate-400 uppercase">
              {question.context}
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white leading-snug">
              {question.question}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3 pt-2">
            {question.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === question.correctIndex;

              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-4 rounded-xl text-xs sm:text-sm text-left transition-all border flex items-start gap-3 select-none ${
                    isAnswered
                      ? isCorrect
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                        : isSelected
                        ? 'bg-rose-950/60 border-rose-500 text-rose-200'
                        : 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-60'
                      : isSelected
                      ? 'bg-cyan-950/80 border-cyan-400 text-white'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/80'
                  }`}
                >
                  <span className={`w-6 h-6 rounded-md flex items-center justify-center font-mono font-bold shrink-0 text-xs ${
                    isAnswered && isCorrect ? 'bg-emerald-500 text-slate-950' :
                    isAnswered && isSelected ? 'bg-rose-500 text-white' :
                    'bg-slate-800 text-slate-300'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="flex-1 mt-0.5 leading-relaxed">{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Answer Explanation Box */}
          {isAnswered && (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center gap-2">
                {selectedOption === question.correctIndex ? (
                  <span className="text-emerald-400 font-bold flex items-center gap-1 font-mono">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>CORRECT DEFENSIVE CHOICE</span>
                  </span>
                ) : (
                  <span className="text-rose-400 font-bold flex items-center gap-1 font-mono">
                    <XCircle className="w-4 h-4" />
                    <span>INCORRECT — ATTACK SURFACE REMAINED OPEN</span>
                  </span>
                )}
              </div>
              <p className="text-slate-300 leading-relaxed">
                {question.explanation}
              </p>
            </div>
          )}

          {/* Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <span className="text-xs text-slate-500 font-mono">
              {isAnswered ? 'Review feedback then proceed' : 'Select an answer to reveal analysis'}
            </span>

            <button
              disabled={!isAnswered}
              onClick={handleNext}
              className="px-5 py-2.5 rounded-lg bg-cyan-500 text-slate-950 hover:bg-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <span>{currentIdx === SECURITY_QUIZ_QUESTIONS.length - 1 ? 'View Final Assessment' : 'Next Scenario'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Results Card */
        <div className="glass-panel rounded-2xl p-8 sm:p-10 border border-cyan-500/30 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center mx-auto text-cyan-400 shadow-xl shadow-cyan-500/20">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
              ASSESSMENT EVALUATION COMPLETE
            </span>
            <div className="text-5xl font-extrabold font-mono text-white">
              {percentage}%
            </div>
            <div className="text-xs font-mono text-slate-400">
              {correctCount} of {SECURITY_QUIZ_QUESTIONS.length} Questions Correct
            </div>
          </div>

          {/* Level Badge Card */}
          <div className={`p-5 rounded-xl bg-slate-950 border ${level.border} max-w-md mx-auto space-y-2`}>
            <div className={`text-base font-bold uppercase font-mono ${level.color}`}>
              Awareness Level: {level.label}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {level.desc}
            </p>
          </div>

          <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
            *This assessment is for educational awareness only. To strengthen your posture, implement recommended countermeasures in Defender Mode or test scenarios in the Attack Simulator.
          </p>

          {/* Post-quiz Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={handleRestart}
              className="px-5 py-2.5 rounded-lg border border-slate-700 hover:bg-slate-800 text-xs font-medium text-slate-300 transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Quiz</span>
            </button>

            <button
              onClick={() => navigateTo('defender-mode')}
              className="px-5 py-2.5 rounded-lg bg-emerald-500 text-slate-950 hover:bg-emerald-400 text-xs font-bold transition-colors flex items-center gap-1.5 shadow-lg shadow-emerald-500/20"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Fix Risks in Defender Mode</span>
            </button>

            <button
              onClick={() => navigateTo('dashboard')}
              className="px-5 py-2.5 rounded-lg bg-cyan-500 text-slate-950 hover:bg-cyan-400 text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <span>View Security Dashboard</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
