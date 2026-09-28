import React, { useState } from 'react';
import { useCyber } from '../context/CyberContext';
import { EXPOSURE_MAP_NODES } from '../data/cyberData';
import { 
  Network, 
  ShieldAlert, 
  ShieldCheck, 
  ArrowDown, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  ChevronRight, 
  User, 
  Mail, 
  Share2, 
  Search, 
  Cpu, 
  Terminal, 
  Lock,
  ArrowRight
} from 'lucide-react';

export const ExposureMap: React.FC = () => {
  const { selectedMapNodeId, setSelectedMapNodeId, navigateTo } = useCyber();
  const [highlightDownstream, setHighlightDownstream] = useState(true);

  const activeNode = EXPOSURE_MAP_NODES.find(n => n.id === selectedMapNodeId) || EXPOSURE_MAP_NODES[0];

  // Helper to determine if a node is downstream of the currently selected node
  const isDownstream = (targetId: string): boolean => {
    if (!highlightDownstream) return false;
    const findDescendants = (id: string, visited: Set<string>): boolean => {
      const node = EXPOSURE_MAP_NODES.find(n => n.id === id);
      if (!node) return false;
      if (node.downstreamIds.includes(targetId)) return true;
      for (const dId of node.downstreamIds) {
        if (!visited.has(dId)) {
          visited.add(dId);
          if (findDescendants(dId, visited)) return true;
        }
      }
      return false;
    };
    return findDescendants(selectedMapNodeId, new Set());
  };

  const getNodeIcon = (id: string) => {
    switch (id) {
      case 'node-user': return <User className="w-5 h-5 text-cyan-400" />;
      case 'node-email': return <Mail className="w-5 h-5 text-sky-400" />;
      case 'node-social': return <Share2 className="w-5 h-5 text-amber-400" />;
      case 'node-public-info': return <Search className="w-5 h-5 text-indigo-400" />;
      case 'node-social-eng': return <Cpu className="w-5 h-5 text-orange-400" />;
      case 'node-phishing': return <Terminal className="w-5 h-5 text-rose-400" />;
      case 'node-account-comp': return <Lock className="w-5 h-5 text-rose-500" />;
      default: return <Network className="w-5 h-5 text-cyan-400" />;
    }
  };

  const getSeverityBadge = (sev: string) => {
    switch (sev) {
      case 'critical':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-950/80 text-rose-300 border border-rose-500/40">CRITICAL IMPACT</span>;
      case 'high':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-orange-950/80 text-orange-300 border border-orange-500/40">HIGH RISK</span>;
      case 'moderate':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-950/80 text-amber-300 border border-amber-500/40">MODERATE VECTOR</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-500/40">ORIGIN ROOT</span>;
    }
  };

  return (
    <div className="min-h-screen cyber-grid py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header and Disclaimer */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-cyan-950/70 border border-cyan-500/30 text-xs font-mono text-cyan-300 uppercase mb-2">
              <Network className="w-3.5 h-3.5" />
              <span>ATTACK SURFACE PROPAGATION CHAIN</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Digital Exposure Map
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-xs font-mono text-slate-300 cursor-pointer bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
              <input 
                type="checkbox" 
                checked={highlightDownstream}
                onChange={(e) => setHighlightDownstream(e.target.checked)}
                className="accent-cyan-400"
              />
              <span>Highlight Adversary Pivot Path</span>
            </label>
          </div>
        </div>

        {/* Clear Educational Label */}
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-cyan-500/20 text-xs text-slate-300 flex items-center gap-2">
          <Info className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>
            <strong>Educational Simulation:</strong> This diagram models how public breadcrumbs correlate into attack chains. Click any node below to inspect risk implications, real-world breach mechanics, and recommended mitigations.
          </span>
        </div>
      </div>

      {/* Main Grid: Interactive Map (7 cols) + Node Inspector (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Visual Graph / Node Hierarchy */}
        <div className="lg:col-span-7 space-y-4">
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-3">
              <span>SELECT A NODE TO TRACE ADVERSARY PIVOTING:</span>
              <span className="font-mono text-cyan-400">7 SIMULATED STAGES</span>
            </div>

            {/* Vertical Flow Pipeline */}
            <div className="space-y-2 py-2">
              {EXPOSURE_MAP_NODES.map((node, index) => {
                const isSelected = node.id === activeNode.id;
                const isDown = isDownstream(node.id);

                return (
                  <React.Fragment key={node.id}>
                    {/* Node Card */}
                    <div
                      onClick={() => setSelectedMapNodeId(node.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 select-none ${
                        isSelected
                          ? 'border-cyan-400 bg-cyan-950/60 shadow-lg shadow-cyan-500/20 ring-1 ring-cyan-400'
                          : isDown
                          ? 'border-rose-500/40 bg-rose-950/20 hover:border-rose-500/60'
                          : 'border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/80'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-lg flex items-center justify-center border ${
                            isSelected 
                              ? 'bg-cyan-500/20 border-cyan-400' 
                              : 'bg-slate-800 border-slate-700'
                          }`}>
                            {getNodeIcon(node.id)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-white">
                                {node.label}
                              </span>
                              <span className="text-[10px] font-mono text-slate-400 px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700">
                                {node.shortTag}
                              </span>
                            </div>
                            <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                              {node.summary}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          {getSeverityBadge(node.severity)}
                          <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'rotate-90 text-cyan-400' : 'text-slate-600'}`} />
                        </div>
                      </div>

                      {/* Small Downstream Indicator if active */}
                      {isDown && !isSelected && (
                        <div className="mt-2 pt-2 border-t border-rose-900/40 text-[11px] text-rose-300 font-mono flex items-center gap-1.5">
                          <AlertTriangle className="w-3 h-3 text-rose-400" />
                          <span>Downstream Compromise Risk Path from selected node</span>
                        </div>
                      )}
                    </div>

                    {/* Connecting Arrow between nodes */}
                    {index < EXPOSURE_MAP_NODES.length - 1 && (
                      <div className="flex justify-center py-0.5">
                        <div className={`flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded ${
                          isDown ? 'text-rose-400 bg-rose-950/30' : 'text-slate-600'
                        }`}>
                          <ArrowDown className="w-3.5 h-3.5" />
                          <span className="text-[10px]">propagates to</span>
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Node Inspector Panel (Detailed View) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel rounded-2xl p-6 sm:p-7 border border-cyan-500/30 space-y-6 sticky top-24">
            
            {/* Header info */}
            <div className="space-y-2 border-b border-slate-800 pb-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                  NODE INSPECTOR
                </span>
                {getSeverityBadge(activeNode.severity)}
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                {getNodeIcon(activeNode.id)}
                <span>{activeNode.label}</span>
              </h2>
              <span className="text-xs text-slate-400 font-mono">
                Category: {activeNode.category} · Stage: {activeNode.shortTag}
              </span>
            </div>

            {/* 1. What the Risk Means */}
            <div className="space-y-1.5">
              <span className="text-xs font-mono text-cyan-300 uppercase tracking-wide flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-cyan-400" />
                <span>1. What the Risk Means</span>
              </span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                {activeNode.riskDescription}
              </p>
            </div>

            {/* 2. Why It Matters */}
            <div className="space-y-1.5">
              <span className="text-xs font-mono text-amber-400 uppercase tracking-wide flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <span>2. Why It Matters</span>
              </span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                {activeNode.whyItMatters}
              </p>
            </div>

            {/* 3. Example Scenario */}
            <div className="space-y-1.5">
              <span className="text-xs font-mono text-rose-400 uppercase tracking-wide flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-rose-400" />
                <span>3. Simulated Real-World Scenario</span>
              </span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-lg border border-rose-950/60 font-mono text-[12px]">
                "{activeNode.exampleScenario}"
              </p>
            </div>

            {/* 4. Recommended Protection */}
            <div className="space-y-1.5">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wide flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>4. Recommended Defensive Protection</span>
              </span>
              <div className="p-3.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-xs sm:text-sm text-emerald-200 leading-relaxed">
                {activeNode.recommendedProtection}
              </div>
            </div>

            {/* Actions: Jump to Attack Simulator or Defender Mode */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => navigateTo('attack-simulator')}
                className="flex-1 py-2.5 px-3 rounded-lg bg-cyan-500 text-slate-950 hover:bg-cyan-400 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Simulate Attack</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => navigateTo('defender-mode')}
                className="flex-1 py-2.5 px-3 rounded-lg bg-emerald-500 text-slate-950 hover:bg-emerald-400 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Fix in Defender Mode</span>
                <ShieldCheck className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
