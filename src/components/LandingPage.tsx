import React, { useState } from 'react';
import { useCyber } from '../context/CyberContext';
import { 
  ShieldAlert, 
  Shield,
  Swords, 
  Network, 
  Lock, 
  Terminal, 
  Radio, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  Cpu, 
  Eye, 
  FileText, 
  Sparkles,
  ChevronRight,
  TrendingDown,
  Layers,
  HelpCircle,
  KeyRound
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { navigateTo, metrics } = useCyber();
  const [activeTab, setActiveTab] = useState<'assess' | 'simulate' | 'defend'>('assess');
  const [interactiveSample, setInteractiveSample] = useState({
    reusedPassword: true,
    mfaEnabled: false,
    publicWifiVpn: false
  });

  // Calculate live preview score for the interactive hero teaser
  const calculateTeaserScore = () => {
    let score = 30;
    if (interactiveSample.reusedPassword) score += 30;
    if (!interactiveSample.mfaEnabled) score += 25;
    if (!interactiveSample.publicWifiVpn) score += 15;
    return score;
  };

  const teaserScore = calculateTeaserScore();

  return (
    <div className="relative min-h-screen cyber-grid pb-24 overflow-hidden">
      {/* Background ambient glowing orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-2/3 right-10 w-[400px] h-[300px] bg-blue-600/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      {/* Top Banner Notice */}
      <div className="bg-slate-900/80 border-b border-cyan-500/20 py-2 px-4 text-center text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="font-mono text-cyan-300 font-semibold">EDUCATIONAL SIMULATION:</span>
          <span className="text-slate-300">CyberMirror never scans real networks, requests passwords, or executes real malware.</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-12 md:pt-20 lg:pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 text-xs font-mono">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>DIGITAL RISK & ATTACK SURFACE SIMULATOR</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              See Your Digital Risk <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
                Before an Attacker Does.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              CyberMirror turns cybersecurity awareness into an interactive experience — identify risky habits, simulate common attack scenarios, and learn how to defend yourself.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => navigateTo('security-check')}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-lg text-sm font-bold bg-cyan-400 text-slate-950 hover:bg-cyan-300 shadow-lg shadow-cyan-500/25 active:scale-95 transition-all"
              >
                <ShieldAlert className="w-4 h-4 text-slate-950" />
                <span>Check My Security</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>

              <button
                onClick={() => navigateTo('attack-simulator')}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-lg text-sm font-semibold bg-slate-900/90 text-cyan-200 border border-cyan-500/30 hover:border-cyan-400 hover:bg-slate-800/80 active:scale-95 transition-all"
              >
                <Swords className="w-4 h-4 text-cyan-400" />
                <span>Explore Attack Simulator</span>
              </button>
            </div>

            {/* Quick Trust Badges */}
            <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Zero Credentials Collected</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>100% Client-Side Simulation</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>MITRE ATT&CK Aligned</span>
              </div>
            </div>
          </div>

          {/* Right Column: Animated Digital-Security Visualization */}
          <div className="lg:col-span-5">
            <div className="relative glass-panel rounded-2xl p-6 border border-cyan-500/20 shadow-2xl shadow-cyan-950/40">
              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-xs font-mono font-bold tracking-wide text-cyan-300 uppercase">
                    Live Threat Radar Simulation
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">SOC-VIEW v2.4</span>
              </div>

              {/* Radar Graphic & Live Attack Vector Visualizer */}
              <div className="relative my-6 h-56 rounded-xl bg-slate-950/90 border border-slate-800 overflow-hidden flex items-center justify-center">
                {/* Concentric radar rings */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-48 h-48 rounded-full border border-cyan-500/10" />
                  <div className="absolute w-36 h-36 rounded-full border border-cyan-500/20" />
                  <div className="absolute w-24 h-24 rounded-full border border-cyan-500/30" />
                  <div className="absolute w-12 h-12 rounded-full border border-cyan-500/40" />
                  {/* Crosshairs */}
                  <div className="absolute w-full h-[1px] bg-cyan-500/10" />
                  <div className="absolute h-full w-[1px] bg-cyan-500/10" />
                </div>

                {/* Rotating Radar Sweep Line */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-48 h-48 rounded-full overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-transparent to-transparent origin-center animate-radar" />
                  </div>
                </div>

                {/* Interactive Simulated Target Points on Radar */}
                <div className="relative z-10 w-full h-full flex flex-col justify-between p-4 text-xs font-mono">
                  <div className="flex justify-between items-start">
                    <span className="px-2 py-0.5 rounded bg-rose-950/70 border border-rose-500/40 text-rose-300 text-[10px]">
                      🔴 EXPOSURE DETECTED
                    </span>
                    <span className="text-slate-400 text-[10px]">HOST: USER-LOCAL</span>
                  </div>

                  {/* Center Node */}
                  <div className="self-center flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-cyan-950/80 border border-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                      <Lock className="w-4 h-4 text-cyan-300" />
                    </div>
                    <span className="text-[10px] text-cyan-200 mt-1">IDENTITY TARGET</span>
                  </div>

                  <div className="flex justify-between items-end text-[10px] text-slate-400">
                    <span>ATTACK PATHS: 3 ACTIVE</span>
                    <span className="text-rose-400 font-bold">PROBABILITY: {teaserScore}%</span>
                  </div>
                </div>
              </div>

              {/* Interactive Habit Toggles (Live Exposure Calculation Demo) */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-medium">Test Real-Time Exposure Recalculation:</span>
                  <span className={`font-mono font-bold text-sm ${teaserScore > 60 ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {teaserScore}/100 Exposure
                  </span>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs cursor-pointer hover:border-slate-700 transition-colors">
                    <span className="text-slate-300">Reuse same password across accounts</span>
                    <input
                      type="checkbox"
                      checked={interactiveSample.reusedPassword}
                      onChange={(e) => setInteractiveSample({ ...interactiveSample, reusedPassword: e.target.checked })}
                      className="accent-cyan-400 w-4 h-4"
                    />
                  </label>

                  <label className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs cursor-pointer hover:border-slate-700 transition-colors">
                    <span className="text-slate-300">Enable Authenticator 2FA (MFA)</span>
                    <input
                      type="checkbox"
                      checked={interactiveSample.mfaEnabled}
                      onChange={(e) => setInteractiveSample({ ...interactiveSample, mfaEnabled: e.target.checked })}
                      className="accent-cyan-400 w-4 h-4"
                    />
                  </label>

                  <label className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs cursor-pointer hover:border-slate-700 transition-colors">
                    <span className="text-slate-300">Use VPN or Hotspot on Public Wi-Fi</span>
                    <input
                      type="checkbox"
                      checked={interactiveSample.publicWifiVpn}
                      onChange={(e) => setInteractiveSample({ ...interactiveSample, publicWifiVpn: e.target.checked })}
                      className="accent-cyan-400 w-4 h-4"
                    />
                  </label>
                </div>

                <button
                  onClick={() => navigateTo('security-check')}
                  className="w-full mt-3 py-2 text-xs font-semibold text-center text-cyan-300 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Launch Complete 10-Point Questionnaire</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: What is CyberMirror? */}
      <section className="mt-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400">
              <Zap className="w-4 h-4" />
              <span>Rethinking Security Awareness</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Traditional Cyber Training Is Passive. <br />
              <span className="text-cyan-400">CyberMirror Is Simulated Impact.</span>
            </h2>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              Reading bullet points about "creating strong passwords" does not change human habits. What changes behavior is seeing what actually happens behind the scenes when an attacker discovers your reused password or crafts an urgent spear-phishing bait tailored to your social footprint.
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              CyberMirror models the adversary perspective using fictional, safe simulation logic. We bridge the gap between everyday digital convenience and adversary exploitation mechanics, empowering you with defensive countermeasures that neutralize risks before they manifest.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="text-2xl font-bold font-mono text-rose-400">95%</div>
                <div className="text-xs text-slate-300 mt-1">Breaches Caused by Human Error</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Phishing & weak credentials remain the top vector</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="text-2xl font-bold font-mono text-emerald-400">99.2%</div>
                <div className="text-xs text-slate-300 mt-1">Attacks Blocked by Enforcing MFA</div>
                <div className="text-[11px] text-slate-400 mt-0.5">CISA & Microsoft research benchmark</div>
              </div>
            </div>
          </div>

          {/* Interactive Feature Showcase Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div 
              onClick={() => navigateTo('security-check')}
              className="p-5 rounded-xl glass-panel glass-panel-hover cursor-pointer group text-left"
            >
              <div className="w-10 h-10 rounded-lg bg-cyan-950 border border-cyan-500/30 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <ShieldAlert className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                1. Security Check
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Answer 10 zero-credential habit questions to calculate your simulated Digital Exposure Score.
              </p>
            </div>

            <div 
              onClick={() => navigateTo('exposure-map')}
              className="p-5 rounded-xl glass-panel glass-panel-hover cursor-pointer group text-left"
            >
              <div className="w-10 h-10 rounded-lg bg-cyan-950 border border-cyan-500/30 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Network className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                2. Digital Exposure Map
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Visualize how public breadcrumbs flow from email and social footprints into targeted compromise.
              </p>
            </div>

            <div 
              onClick={() => navigateTo('attack-simulator')}
              className="p-5 rounded-xl glass-panel glass-panel-hover cursor-pointer group text-left"
            >
              <div className="w-10 h-10 rounded-lg bg-cyan-950 border border-cyan-500/30 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Swords className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                3. Attack Simulator
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Step through 7 "What If?" scenarios: phishing clicks, ransomware, lost phones, and rogue APs.
              </p>
            </div>

            <div 
              onClick={() => navigateTo('defender-mode')}
              className="p-5 rounded-xl glass-panel glass-panel-hover cursor-pointer group text-left"
            >
              <div className="w-10 h-10 rounded-lg bg-cyan-950 border border-cyan-500/30 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Shield className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                4. Defender Mode
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Fix identified risks with step-by-step guidance and watch your simulated score drop instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: How It Works */}
      <section className="mt-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
            THE CYBERMIRROR LIFECYCLE
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Assess · Visualize · Simulate · Understand · Defend · Improve
          </h2>
          <p className="text-sm text-slate-300">
            A continuous loop from habit evaluation to actionable personal hardening.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { step: '01', title: 'Assess', desc: 'Audit everyday habits without exposing passwords' },
            { step: '02', title: 'Visualize', desc: 'Trace attack surface propagation across nodes' },
            { step: '03', title: 'Simulate', desc: 'Watch step-by-step MITRE attack kill chains' },
            { step: '04', title: 'Understand', desc: 'Learn attacker psychology and deception triggers' },
            { step: '05', title: 'Defend', desc: 'Apply concrete countermeasures (Passkeys, MFA, Vaults)' },
            { step: '06', title: 'Improve', desc: 'Track your hardened posture in the SOC dashboard' },
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 text-left relative overflow-hidden group hover:border-cyan-500/30 transition-colors">
              <div className="text-3xl font-extrabold font-mono text-cyan-500/30 mb-2 group-hover:text-cyan-400/50 transition-colors">
                {item.step}
              </div>
              <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Common Digital Risks */}
      <section className="mt-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">THREAT INTELLIGENCE</span>
            <h2 className="text-3xl font-bold text-white mt-1">Common Digital Risks We Simulate</h2>
          </div>
          <button
            onClick={() => navigateTo('attack-simulator')}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 self-start"
          >
            <span>Launch All 7 Attack Scenarios</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl glass-panel border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <KeyRound className="w-5 h-5 text-amber-400" />
              <span className="text-[10px] font-mono text-amber-400 uppercase">T1110.004</span>
            </div>
            <h3 className="text-base font-bold text-white">Credential Stuffing & Reuse</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              When an old forum or shopping site gets breached, automated botnets try those same leaked combinations across thousands of banking, email, and cloud logins.
            </p>
            <div className="pt-2 text-xs text-cyan-300 font-mono flex items-center gap-1">
              <span>Countermeasure:</span>
              <span className="text-slate-300 font-sans">Unique 16+ char vault passwords</span>
            </div>
          </div>

          <div className="p-6 rounded-xl glass-panel border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <AlertTriangle className="w-5 h-5 text-rose-400" />
              <span className="text-[10px] font-mono text-rose-400 uppercase">T1566.002</span>
            </div>
            <h3 className="text-base font-bold text-white">Spear-Phishing & Cloned Portals</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Attackers register lookalike domains and send urgent alerts ("Account suspended in 2 hours") to trick you into typing credentials on an Evilginx reverse proxy.
            </p>
            <div className="pt-2 text-xs text-cyan-300 font-mono flex items-center gap-1">
              <span>Countermeasure:</span>
              <span className="text-slate-300 font-sans">FIDO2 Passkeys & Independent navigation</span>
            </div>
          </div>

          <div className="p-6 rounded-xl glass-panel border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <Radio className="w-5 h-5 text-sky-400" />
              <span className="text-[10px] font-mono text-sky-400 uppercase">T1040</span>
            </div>
            <h3 className="text-base font-bold text-white">Evil Twin Wi-Fi Interception</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Rogue access points at airports and coffee shops impersonate legitimate Wi-Fi networks to snoop on DNS traffic and present fake captive portals.
            </p>
            <div className="pt-2 text-xs text-cyan-300 font-mono flex items-center gap-1">
              <span>Countermeasure:</span>
              <span className="text-slate-300 font-sans">Encrypted WireGuard VPN & Hotspots</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: AI Cyber Assistant Teaser */}
      <section className="mt-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-slate-900/90 via-[#0d1627] to-cyan-950/40 border border-cyan-500/25 relative overflow-hidden">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>MEET MIRROR-AI</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Have Questions? Ask Our Defensive Cybersecurity Advisor.
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Wondering if an email is phishing? Need an explanation of ransomware or guidance on hardening your Instagram? MirrorAI provides instant, clear, and actionable defensive insights — in both English and Telugu!
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => navigateTo('mirror-ai')}
                className="px-5 py-2.5 rounded-lg text-xs font-bold bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-colors flex items-center gap-2"
              >
                <span>Open MirrorAI Assistant</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => navigateTo('learn')}
                className="px-5 py-2.5 rounded-lg text-xs font-medium text-slate-300 border border-slate-700 hover:bg-slate-800 transition-colors"
              >
                <span>Browse 13 Learning Modules</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="mt-28 max-w-4xl mx-auto px-4 text-center space-y-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
          Ready to See Your Digital Risk?
        </h2>
        <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
          Start the free, private 10-question evaluation now. No real passwords required. Instant exposure calculation and hardening roadmap.
        </p>
        <button
          onClick={() => navigateTo('security-check')}
          className="px-8 py-4 rounded-xl text-base font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 hover:from-cyan-300 hover:to-blue-400 shadow-xl shadow-cyan-500/20 active:scale-95 transition-all inline-flex items-center gap-2"
        >
          <ShieldAlert className="w-5 h-5 text-slate-950" />
          <span>Launch Security Check Now</span>
          <ChevronRight className="w-5 h-5 text-slate-950" />
        </button>
      </section>
    </div>
  );
};
