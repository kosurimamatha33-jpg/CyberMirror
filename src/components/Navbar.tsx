import React, { useState } from 'react';
import { useCyber } from '../context/CyberContext';
import { PageView } from '../types/cyber';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Activity, 
  Network, 
  Swords, 
  Shield, 
  BookOpen, 
  HelpCircle, 
  Bot, 
  LayoutDashboard, 
  Menu, 
  X,
  ChevronRight
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentView, navigateTo, metrics } = useCyber();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageView; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Activity className="w-4 h-4" /> },
    { id: 'security-check', label: 'Security Check', icon: <ShieldAlert className="w-4 h-4" /> },
    { id: 'exposure-map', label: 'Exposure Map', icon: <Network className="w-4 h-4" /> },
    { id: 'attack-simulator', label: 'Attack Simulator', icon: <Swords className="w-4 h-4" /> },
    { id: 'defender-mode', label: 'Defender Mode', icon: <Shield className="w-4 h-4" /> },
    { id: 'learn', label: 'Learn', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'quiz', label: 'Quiz', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'mirror-ai', label: 'MirrorAI', icon: <Bot className="w-4 h-4 text-cyan-400" /> },
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-rose-400 border-rose-500/30 bg-rose-950/30';
    if (score >= 40) return 'text-amber-400 border-amber-500/30 bg-amber-950/30';
    return 'text-emerald-400 border-emerald-500/30 bg-emerald-950/30';
  };

  const handleNavClick = (view: PageView) => {
    navigateTo(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-cyan-500/10 bg-[#070b14]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow">
              <div className="w-full h-full bg-[#070b14] rounded-[7px] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                Cyber<span className="text-cyan-400">Mirror</span>
                <span className="text-[10px] uppercase font-mono tracking-widest px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
                  SIM-LAB
                </span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
                Digital Exposure & Threat Defense
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                    isActive
                      ? 'text-cyan-300 bg-cyan-500/15 border border-cyan-500/30 shadow-sm shadow-cyan-500/10'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Status & Action */}
          <div className="flex items-center gap-3">
            {/* Live Simulated Exposure Score indicator */}
            <button
              onClick={() => handleNavClick('dashboard')}
              title="Click to view full security dashboard"
              className={`hidden md:flex items-center gap-2 px-2.5 py-1 rounded-md border text-xs font-mono transition-all ${getScoreColor(metrics.overallScore)}`}
            >
              <span className="w-2 h-2 rounded-full animate-ping bg-current" />
              <span className="text-slate-400 text-[11px] font-sans">Simulated Risk:</span>
              <span className="font-bold">{metrics.overallScore}/100</span>
            </button>

            {/* Primary Action Button */}
            <button
              onClick={() => handleNavClick('security-check')}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 hover:from-cyan-400 hover:to-blue-500 shadow-md shadow-cyan-500/20 active:scale-95 transition-all"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-slate-950" />
              <span>Start Security Check</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-cyan-500/20 bg-[#090e1a] px-4 pt-3 pb-5 space-y-1">
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-800 text-xs text-slate-400">
            <span>Simulated Exposure Level:</span>
            <span className={`px-2 py-0.5 rounded font-mono font-bold ${getScoreColor(metrics.overallScore)}`}>
              {metrics.overallScore}/100 · {metrics.level.toUpperCase()}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-1.5 pt-1">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg text-left transition-colors ${
                    isActive
                      ? 'text-cyan-300 bg-cyan-950/60 border border-cyan-500/40'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3">
            <button
              onClick={() => handleNavClick('security-check')}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold rounded-lg bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-colors"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Check My Security Risk Now</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
