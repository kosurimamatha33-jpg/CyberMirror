import React from 'react';
import { useCyber } from '../context/CyberContext';
import { PageView } from '../types/cyber';
import { ShieldCheck, Terminal, AlertTriangle, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo } = useCyber();

  const links: { id: PageView; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'security-check', label: 'Security Check' },
    { id: 'exposure-map', label: 'Exposure Map' },
    { id: 'attack-simulator', label: 'Attack Simulator' },
    { id: 'defender-mode', label: 'Defender Mode' },
    { id: 'learn', label: 'Learn' },
    { id: 'quiz', label: 'Quiz' },
    { id: 'mirror-ai', label: 'MirrorAI' },
    { id: 'dashboard', label: 'Dashboard' }
  ];

  return (
    <footer className="border-t border-slate-800 bg-[#050810] text-slate-400 py-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                Cyber<span className="text-cyan-400">Mirror</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              An interactive cybersecurity awareness and digital-risk simulation platform. Understand your exposure, simulate attack scenarios safely, and learn how to defend yourself.
            </p>
            <div className="text-[11px] font-mono text-cyan-400/80">
              Assess → Visualize → Simulate → Understand → Defend → Improve
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-[11px] font-mono">
              Quick Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {links.map((link) => (
                <button
                  key={link.id}
                  onClick={() => navigateTo(link.id)}
                  className="text-left text-slate-400 hover:text-cyan-300 transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Privacy & Safety Guarantee */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-[11px] font-mono flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Safety Guarantee</span>
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              CyberMirror never collects real passwords, OTPs, API keys, or financial secrets. All simulations are client-side conceptual models for education only.
            </p>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-400">
              STATUS: ZERO-TELEMETRY MODE ACTIVE
            </div>
          </div>
        </div>

        {/* Legal & Bottom bar */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} CyberMirror Simulation Lab. Purely educational awareness. Not an official security audit.
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-slate-400">SOC-THEME v2.4</span>
            <span>·</span>
            <span>English & Telugu Support</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
