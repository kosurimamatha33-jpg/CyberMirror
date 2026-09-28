import React, { useState } from 'react';
import { useCyber } from '../context/CyberContext';
import { LEARNING_MODULES } from '../data/cyberData';
import { LearningModule } from '../types/cyber';
import { 
  BookOpen, 
  Search, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ShieldCheck, 
  HelpCircle, 
  X, 
  ChevronRight, 
  ArrowRight,
  Sparkles,
  RotateCcw
} from 'lucide-react';

export const LearningHub: React.FC = () => {
  const { completedModules, markModuleCompleted } = useCyber();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModule, setActiveModule] = useState<LearningModule | null>(null);
  
  // Quiz state inside active module modal
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [hasSubmittedQuiz, setHasSubmittedQuiz] = useState(false);

  const categories = ['All', 'Fundamentals', 'Threat Vectors', 'Data & Privacy', 'Enterprise & SOC'];

  const filteredModules = LEARNING_MODULES.filter(m => {
    const matchesCategory = selectedCategory === 'All' || m.category === selectedCategory;
    const matchesSearch = m.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          m.summary.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const openModule = (mod: LearningModule) => {
    setActiveModule(mod);
    setSelectedQuizOption(null);
    setHasSubmittedQuiz(false);
  };

  const handleQuizAnswer = (index: number) => {
    if (hasSubmittedQuiz) return;
    setSelectedQuizOption(index);
    setHasSubmittedQuiz(true);
    if (activeModule) {
      markModuleCompleted(activeModule.id);
    }
  };

  return (
    <div className="min-h-screen cyber-grid py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-cyan-950/70 border border-cyan-500/30 text-xs font-mono text-cyan-300 uppercase mb-2">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span>DEFENSIVE KNOWLEDGE BASE</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Cybersecurity Learning Hub
            </h1>
          </div>

          <div className="text-xs font-mono text-slate-400">
            Progress: <span className="text-cyan-400 font-bold">{completedModules.length}</span> of {LEARNING_MODULES.length} Completed
          </div>
        </div>

        <p className="text-sm text-slate-300 max-w-2xl">
          13 beginner-friendly modules covering attack vectors, operational defense, enterprise SOC workflows, and OWASP foundations — each with real-world case studies and quick comprehension quizzes.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-2">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search modules (e.g. MFA, Phishing)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>
      </div>

      {/* Modules Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredModules.map((mod) => {
          const isCompleted = completedModules.includes(mod.id);
          return (
            <div
              key={mod.id}
              onClick={() => openModule(mod)}
              className={`p-6 rounded-2xl border cursor-pointer glass-panel glass-panel-hover flex flex-col justify-between transition-all select-none ${
                isCompleted 
                  ? 'border-emerald-500/30 bg-emerald-950/10' 
                  : 'border-slate-800 bg-slate-900/60'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30 text-[10px]">
                    {mod.category}
                  </span>
                  <div className="flex items-center gap-1 text-slate-400 font-mono text-[11px]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{mod.readTime}</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {mod.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                  {mod.summary}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                {isCompleted ? (
                  <span className="text-emerald-400 flex items-center gap-1 font-mono font-medium">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Completed</span>
                  </span>
                ) : (
                  <span className="text-slate-400 font-mono">Unread</span>
                )}

                <span className="text-cyan-400 flex items-center gap-1 font-semibold group-hover:translate-x-1 transition-transform">
                  <span>Start Module</span>
                  <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Module Reader Modal */}
      {activeModule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#090f1d] border border-cyan-500/30 p-6 sm:p-8 space-y-6 shadow-2xl">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                    {activeModule.category}
                  </span>
                  <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {activeModule.readTime}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-white">{activeModule.title}</h2>
              </div>

              <button
                onClick={() => setActiveModule(null)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Explanation / Summary */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                Core Explanation
              </h4>
              <p className="text-sm text-slate-200 leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                {activeModule.summary}
              </p>
            </div>

            {/* Real World Example */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Real-World Case Example</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-amber-950/15 p-4 rounded-xl border border-amber-900/40 italic">
                "{activeModule.realWorldExample}"
              </p>
            </div>

            {/* Warning Signs & Prevention Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <h4 className="text-xs font-mono uppercase text-rose-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Warning Signs & Red Flags</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {activeModule.warningSigns.map((sign, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-rose-400 shrink-0">•</span>
                      <span>{sign}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <h4 className="text-xs font-mono uppercase text-emerald-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Prevention & Countermeasures</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {activeModule.preventionTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-400 shrink-0">✓</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Quick Comprehension Quiz */}
            <div className="p-5 rounded-xl bg-slate-950 border border-cyan-500/30 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-cyan-400" />
                  <span>Quick Knowledge Check</span>
                </span>
                {hasSubmittedQuiz && (
                  <span className={selectedQuizOption === activeModule.quickQuiz.correctIndex ? 'text-emerald-400' : 'text-rose-400'}>
                    {selectedQuizOption === activeModule.quickQuiz.correctIndex ? 'Correct! ✓' : 'Incorrect'}
                  </span>
                )}
              </div>

              <p className="text-sm font-semibold text-white">
                {activeModule.quickQuiz.question}
              </p>

              <div className="space-y-2">
                {activeModule.quickQuiz.options.map((option, idx) => {
                  const isSelected = selectedQuizOption === idx;
                  const isCorrect = idx === activeModule.quickQuiz.correctIndex;
                  return (
                    <button
                      key={idx}
                      disabled={hasSubmittedQuiz}
                      onClick={() => handleQuizAnswer(idx)}
                      className={`w-full p-3 rounded-lg text-xs text-left transition-all border ${
                        hasSubmittedQuiz
                          ? isCorrect
                            ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                            : isSelected
                            ? 'bg-rose-950/60 border-rose-500 text-rose-200'
                            : 'bg-slate-900 border-slate-800 text-slate-500 opacity-60'
                          : isSelected
                          ? 'bg-cyan-950/80 border-cyan-400 text-white'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span className="font-mono font-bold mr-2">{String.fromCharCode(65 + idx)}.</span>
                      <span>{option}</span>
                    </button>
                  );
                })}
              </div>

              {hasSubmittedQuiz && (
                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-300 space-y-1">
                  <span className="font-mono font-bold text-cyan-300">Explanation:</span>
                  <p className="leading-relaxed">{activeModule.quickQuiz.explanation}</p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <span className="text-xs text-slate-400 font-mono">
                {completedModules.includes(activeModule.id) ? 'Module Completed ✓' : 'Finish Quiz to Complete'}
              </span>

              <button
                onClick={() => {
                  markModuleCompleted(activeModule.id);
                  setActiveModule(null);
                }}
                className="px-5 py-2 rounded-lg bg-cyan-500 text-slate-950 hover:bg-cyan-400 text-xs font-bold transition-colors"
              >
                Close & Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
