import React from 'react';
import { useCyber } from '../context/CyberContext';
import { 
  LayoutDashboard, 
  ShieldAlert, 
  ShieldCheck, 
  TrendingDown, 
  Key, 
  Lock, 
  Eye, 
  Smartphone, 
  Database, 
  Network, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Download, 
  Sparkles,
  RotateCcw
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { metrics, baselineScore, countermeasures, toggleCountermeasure, navigateTo, resetAll } = useCyber();

  const implementedCountermeasures = countermeasures.filter(c => c.implemented);
  const pendingCountermeasures = countermeasures.filter(c => !c.implemented);

  // Top 3 Recommended Actions (pending countermeasures with highest impact)
  const top3Recommended = [...pendingCountermeasures]
    .sort((a, b) => b.impactScoreReduction - a.impactScoreReduction)
    .slice(0, 3);

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

  const domainCards = [
    { label: 'Password Security', score: metrics.passwordSecurity, icon: <Key className="w-4 h-4 text-cyan-400" />, tip: 'Eliminate shared credentials; use a password vault' },
    { label: 'Account Security', score: metrics.accountSecurity, icon: <Lock className="w-4 h-4 text-sky-400" />, tip: 'Enforce Authenticator TOTP or FIDO2 Passkeys' },
    { label: 'Privacy Exposure', score: metrics.privacyExposure, icon: <Eye className="w-4 h-4 text-rose-400" />, tip: 'Use email aliasing and revoke idle app permissions' },
    { label: 'Device Security', score: metrics.deviceSecurity, icon: <Smartphone className="w-4 h-4 text-indigo-400" />, tip: 'Enable automated patches & avoid third-party APKs' },
    { label: 'Social Engineering Risk', score: metrics.socialEngineeringRisk, icon: <Network className="w-4 h-4 text-amber-400" />, tip: 'Adopt zero-trust protocol for urgent notification links' },
    { label: 'Backup & Recovery', score: metrics.backupRecovery, icon: <Database className="w-4 h-4 text-emerald-400" />, tip: 'Maintain 3-2-1 encrypted offline cold backups' },
  ];

  const handleExportSummary = () => {
    const reportText = `CYBERMIRROR PERSONAL SECURITY REPORT
Generated: ${new Date().toLocaleString()}

EXPOSURE SCORE: ${metrics.overallScore}/100 (${metrics.level.toUpperCase()} RISK)
Baseline Score: ${baselineScore}/100
Mitigated Points: ${baselineScore - metrics.overallScore}

DOMAIN METRICS:
- Password Security Risk: ${metrics.passwordSecurity}%
- Account Security Risk: ${metrics.accountSecurity}%
- Privacy Exposure: ${metrics.privacyExposure}%
- Device Security Risk: ${metrics.deviceSecurity}%
- Social Engineering Risk: ${metrics.socialEngineeringRisk}%
- Backup & Recovery Risk: ${metrics.backupRecovery}%

TOP 3 DEFENSIVE ACTIONS:
${top3Recommended.map((r, i) => `${i + 1}. ${r.title} (Impact: -${r.impactScoreReduction} Exposure)`).join('\n')}

*Educational simulation report only. Not an accredited penetration test.`;

    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cybermirror-defense-report-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen cyber-grid py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header and Quick Stats */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-cyan-950/70 border border-cyan-500/30 text-xs font-mono text-cyan-300 uppercase mb-2">
            <LayoutDashboard className="w-3.5 h-3.5 text-cyan-400" />
            <span>SOC COMMAND CENTER</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Personal Security Dashboard
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time digital exposure telemetry and defensive posture tracking.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportSummary}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-700 hover:bg-slate-800 text-xs text-slate-300 font-mono transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Report</span>
          </button>

          <button
            onClick={() => navigateTo('security-check')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 hover:bg-cyan-400 text-xs font-bold transition-colors shadow-md shadow-cyan-500/20"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-slate-950" />
            <span>Retake Security Check</span>
          </button>
        </div>
      </div>

      {/* Main Exposure Overview Metrics Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Big Exposure Meter (5 cols) */}
        <div className="lg:col-span-5 glass-panel rounded-2xl p-6 sm:p-8 border border-cyan-500/25 flex flex-col justify-between space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
              SIMULATED DIGITAL EXPOSURE
            </span>
            <span className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-bold border ${getScoreRiskColor(metrics.overallScore)}`}>
              {metrics.level.toUpperCase()} RISK
            </span>
          </div>

          <div className="text-center py-2 space-y-2">
            <div className="text-6xl sm:text-7xl font-extrabold font-mono tracking-tight text-white">
              <span className={metrics.overallScore >= 70 ? 'text-rose-400' : metrics.overallScore >= 40 ? 'text-amber-400' : 'text-emerald-400'}>
                {metrics.overallScore}
              </span>
              <span className="text-2xl text-slate-400 font-sans font-normal">/100</span>
            </div>
            <p className="text-xs text-slate-300 max-w-xs mx-auto">
              Simulated risk of compromise based on your habit questionnaire and applied defenses.
            </p>
          </div>

          {/* Progress Bar & Diff */}
          <div className="space-y-3 pt-2">
            <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden p-0.5 border border-slate-800">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${getBarColor(metrics.overallScore)}`}
                style={{ width: `${metrics.overallScore}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Baseline: {baselineScore}/100</span>
              <span className="text-emerald-400 font-bold">
                -{baselineScore - metrics.overallScore} Points Reduced
              </span>
            </div>
          </div>

          <button
            onClick={() => navigateTo('defender-mode')}
            className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 text-slate-950 hover:bg-emerald-400 text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
          >
            <ShieldCheck className="w-4 h-4 text-slate-950" />
            <span>Launch Defender Mode Hardening</span>
          </button>
        </div>

        {/* Right Column: Top 3 Recommended Priority Actions (7 cols) */}
        <div className="lg:col-span-7 glass-panel rounded-2xl p-6 sm:p-8 border border-cyan-500/25 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="space-y-0.5">
              <span className="text-xs font-mono uppercase font-bold text-amber-400 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>TOP 3 RECOMMENDED ACTIONS</span>
              </span>
              <p className="text-xs text-slate-400">
                Highest impact countermeasures to immediately reduce your simulated exposure.
              </p>
            </div>

            <span className="text-xs font-mono text-slate-400">
              {implementedCountermeasures.length} of {countermeasures.length} Hardened
            </span>
          </div>

          {top3Recommended.length > 0 ? (
            <div className="space-y-3">
              {top3Recommended.map((action, idx) => (
                <div
                  key={action.id}
                  className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-md bg-cyan-950 text-cyan-300 border border-cyan-500/30 flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white">
                          {action.title}
                        </h4>
                        <span className="text-[10px] font-mono text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/30">
                          -{action.impactScoreReduction} Pts
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                        {action.defenseAction}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleCountermeasure(action.id)}
                    className="px-3.5 py-1.5 rounded-lg bg-emerald-500 text-slate-950 hover:bg-emerald-400 text-xs font-bold transition-all shrink-0 self-end sm:self-center"
                  >
                    Fix Now
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <h4 className="text-sm font-bold text-white">All Priority Countermeasures Active!</h4>
              <p className="text-xs text-emerald-300">
                You have simulated full defense implementation across all 6 core categories.
              </p>
            </div>
          )}

          <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800">
            <span>Progress: {Math.round((implementedCountermeasures.length / countermeasures.length) * 100)}% Defense Coverage</span>
            <button
              onClick={() => navigateTo('defender-mode')}
              className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
            >
              <span>View All Countermeasures</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Domain Risk Matrix (6 Core Categories) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-mono uppercase font-semibold text-cyan-400">
            DEFENSIVE POSTURE BY CATEGORY:
          </span>
          <span>Lower percentage indicates lower exposure (higher security)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {domainCards.map((domain, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  {domain.icon}
                  <span>{domain.label}</span>
                </div>
                <span className={`font-mono text-xs font-bold ${
                  domain.score >= 70 ? 'text-rose-400' :
                  domain.score >= 40 ? 'text-amber-400' : 'text-emerald-400'
                }`}>
                  {domain.score}% Risk
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${getBarColor(domain.score)}`}
                  style={{ width: `${Math.max(8, domain.score)}%` }}
                />
              </div>

              <p className="text-xs text-slate-400 leading-relaxed pt-1">
                {domain.tip}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Launchpad to other modules */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-white">Continue Your Simulation Journey</h4>
          <p className="text-xs text-slate-400">
            Explore how an attacker pivots across nodes or test your awareness with our 10-question evaluation.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => navigateTo('exposure-map')}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-cyan-300 transition-colors"
          >
            Digital Exposure Map
          </button>
          <button
            onClick={() => navigateTo('attack-simulator')}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-cyan-300 transition-colors"
          >
            Attack Simulator
          </button>
          <button
            onClick={() => navigateTo('quiz')}
            className="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 hover:bg-cyan-400 text-xs font-bold transition-colors"
          >
            Take Security Quiz
          </button>
        </div>
      </div>
    </div>
  );
};
