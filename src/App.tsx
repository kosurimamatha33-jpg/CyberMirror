/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { CyberProvider, useCyber } from './context/CyberContext';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { SecurityCheck } from './components/SecurityCheck';
import { ExposureMap } from './components/ExposureMap';
import { AttackSimulator } from './components/AttackSimulator';
import { DefenderMode } from './components/DefenderMode';
import { LearningHub } from './components/LearningHub';
import { SecurityQuiz } from './components/SecurityQuiz';
import { MirrorAI } from './components/MirrorAI';
import { Dashboard } from './components/Dashboard';
import { Footer } from './components/Footer';

const AppContent: React.FC = () => {
  const { currentView } = useCyber();

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <LandingPage />;
      case 'security-check':
        return <SecurityCheck />;
      case 'exposure-map':
        return <ExposureMap />;
      case 'attack-simulator':
        return <AttackSimulator />;
      case 'defender-mode':
        return <DefenderMode />;
      case 'learn':
        return <LearningHub />;
      case 'quiz':
        return <SecurityQuiz />;
      case 'mirror-ai':
        return <MirrorAI />;
      case 'dashboard':
        return <Dashboard />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#070b14] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      <Navbar />
      <main className="flex-1">
        {renderCurrentView()}
      </main>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <CyberProvider>
      <AppContent />
    </CyberProvider>
  );
}

// Self-mounting bootstrap for HTML entry point
const rootElement = typeof document !== 'undefined' ? document.getElementById('root') : null;
if (rootElement && !rootElement.hasChildNodes()) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

