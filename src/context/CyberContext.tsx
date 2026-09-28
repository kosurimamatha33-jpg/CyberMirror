import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  PageView, 
  RiskLevel, 
  ExposureMetrics, 
  HardeningCountermeasure 
} from '../types/cyber';
import { 
  SECURITY_QUESTIONS, 
  INITIAL_COUNTERMEASURES 
} from '../data/cyberData';

interface CyberContextType {
  currentView: PageView;
  setCurrentView: (view: PageView) => void;
  answers: Record<string, string>; // questionId -> optionId
  setAnswer: (questionId: string, optionId: string) => void;
  resetAnswers: () => void;
  metrics: ExposureMetrics;
  countermeasures: HardeningCountermeasure[];
  toggleCountermeasure: (id: string) => void;
  resetAll: () => void;
  // Navigation helpers
  navigateTo: (view: PageView) => void;
  // Learning tracking
  completedModules: string[];
  markModuleCompleted: (moduleId: string) => void;
  // Selected inspect items
  selectedAttackScenarioId: string;
  setSelectedAttackScenarioId: (id: string) => void;
  selectedMapNodeId: string;
  setSelectedMapNodeId: (id: string) => void;
  // Benchmark scores (before vs after defense)
  baselineScore: number;
}

const CyberContext = createContext<CyberContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'cybermirror_state_v1';

export const CyberProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<PageView>('home');
  const [answers, setAnswers] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.answers) return parsed.answers;
      }
    } catch {
      // Fallback
    }
    // Default initial answers simulating a typical user with mixed habits (approx 72/100 baseline exposure)
    return {
      'q-password-reuse': 'pw-reuse-often', // High risk
      'q-mfa-status': 'mfa-sms-only',      // Moderate risk
      'q-public-wifi': 'wifi-careless',    // High risk
      'q-email-visibility': 'email-public', // High risk
      'q-social-osint': 'social-moderate', // Moderate risk
      'q-app-sideloading': 'apps-sometimes', // Moderate risk
      'q-device-updates': 'update-delay-some', // Moderate risk
      'q-unknown-links': 'links-inspect-sometimes', // Moderate risk
      'q-app-permissions': 'perm-never-check', // High risk
      'q-backup-hygiene': 'backup-sync-only'   // Moderate risk
    };
  });

  const [countermeasures, setCountermeasures] = useState<HardeningCountermeasure[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.countermeasures) return parsed.countermeasures;
      }
    } catch {
      // Fallback
    }
    return INITIAL_COUNTERMEASURES;
  });

  const [completedModules, setCompletedModules] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.completedModules) return parsed.completedModules;
      }
    } catch {
      // Fallback
    }
    return ['mod-basics'];
  });

  const [selectedAttackScenarioId, setSelectedAttackScenarioId] = useState<string>('scenario-phishing');
  const [selectedMapNodeId, setSelectedMapNodeId] = useState<string>('node-user');

  // Calculate baseline score from raw answers alone (before defensive countermeasures)
  const calculateBaselineScore = (ans: Record<string, string>): number => {
    let totalScore = 0;
    let maxPossible = 0;

    SECURITY_QUESTIONS.forEach(q => {
      maxPossible += 10;
      const selectedOptionId = ans[q.id];
      const opt = q.options.find(o => o.id === selectedOptionId);
      if (opt) {
        totalScore += opt.riskScore;
      } else {
        totalScore += 5; // average default if unselected
      }
    });

    const normalized = Math.min(100, Math.max(5, Math.round((totalScore / maxPossible) * 100)));
    return normalized;
  };

  const baselineScore = calculateBaselineScore(answers);

  // Compute live metrics factoring in answered questions AND applied countermeasures
  const calculateMetrics = (): ExposureMetrics => {
    let pwRisk = 0;
    let accRisk = 0;
    let netRisk = 0; // mapped to deviceSecurity & network
    let privRisk = 0;
    let socRisk = 0;
    let devRisk = 0;
    let bakRisk = 0;

    let answeredCount = 0;

    SECURITY_QUESTIONS.forEach(q => {
      const optId = answers[q.id];
      if (optId) answeredCount++;
      const opt = q.options.find(o => o.id === optId);
      const score = opt ? opt.riskScore : 5;

      switch (q.category) {
        case 'password':
          pwRisk = score * 10;
          break;
        case 'account':
          accRisk = score * 10;
          break;
        case 'privacy':
          privRisk = (privRisk === 0) ? score * 10 : (privRisk + score * 10) / 2;
          break;
        case 'social':
          socRisk = (socRisk === 0) ? score * 10 : (socRisk + score * 10) / 2;
          break;
        case 'device':
          devRisk = (devRisk === 0) ? score * 10 : (devRisk + score * 10) / 2;
          netRisk = score * 10;
          break;
        case 'backup':
          bakRisk = score * 10;
          break;
      }
    });

    // Calculate countermeasure reductions
    let totalReduction = 0;
    countermeasures.forEach(cm => {
      if (cm.implemented) {
        totalReduction += cm.impactScoreReduction;
        // Also reduce corresponding category
        if (cm.category === 'account') accRisk = Math.max(5, accRisk - 40);
        if (cm.category === 'password') pwRisk = Math.max(5, pwRisk - 45);
        if (cm.category === 'social') socRisk = Math.max(5, socRisk - 35);
        if (cm.category === 'device') devRisk = Math.max(5, devRisk - 35);
        if (cm.category === 'privacy') privRisk = Math.max(5, privRisk - 35);
        if (cm.category === 'backup') bakRisk = Math.max(5, bakRisk - 45);
      }
    });

    // Overall exposure score
    const rawOverall = baselineScore - totalReduction;
    const finalScore = Math.max(12, Math.min(98, rawOverall));

    let level: RiskLevel = 'low';
    if (finalScore >= 75) level = 'critical';
    else if (finalScore >= 55) level = 'high';
    else if (finalScore >= 35) level = 'moderate';
    else level = 'low';

    return {
      overallScore: finalScore,
      level,
      passwordSecurity: Math.round(pwRisk),
      accountSecurity: Math.round(accRisk),
      socialEngineeringRisk: Math.round(socRisk),
      privacyExposure: Math.round(privRisk),
      deviceSecurity: Math.round(devRisk),
      backupRecovery: Math.round(bakRisk),
      completedQuestionsCount: answeredCount,
      totalQuestionsCount: SECURITY_QUESTIONS.length
    };
  };

  const metrics = calculateMetrics();

  // Persist to local storage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({
        answers,
        countermeasures,
        completedModules
      }));
    } catch {
      // Ignore
    }
  }, [answers, countermeasures, completedModules]);

  const setAnswer = (questionId: string, optionId: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const resetAnswers = () => {
    const empty: Record<string, string> = {};
    setAnswers(empty);
  };

  const toggleCountermeasure = (id: string) => {
    setCountermeasures(prev => prev.map(cm => {
      if (cm.id === id) {
        return { ...cm, implemented: !cm.implemented };
      }
      return cm;
    }));
  };

  const markModuleCompleted = (moduleId: string) => {
    if (!completedModules.includes(moduleId)) {
      setCompletedModules(prev => [...prev, moduleId]);
    }
  };

  const resetAll = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setAnswers({
      'q-password-reuse': 'pw-reuse-often',
      'q-mfa-status': 'mfa-sms-only',
      'q-public-wifi': 'wifi-careless',
      'q-email-visibility': 'email-public',
      'q-social-osint': 'social-moderate',
      'q-app-sideloading': 'apps-sometimes',
      'q-device-updates': 'update-delay-some',
      'q-unknown-links': 'links-inspect-sometimes',
      'q-app-permissions': 'perm-never-check',
      'q-backup-hygiene': 'backup-sync-only'
    });
    setCountermeasures(INITIAL_COUNTERMEASURES);
    setCompletedModules(['mod-basics']);
  };

  const navigateTo = (view: PageView) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <CyberContext.Provider value={{
      currentView,
      setCurrentView,
      answers,
      setAnswer,
      resetAnswers,
      metrics,
      countermeasures,
      toggleCountermeasure,
      resetAll,
      navigateTo,
      completedModules,
      markModuleCompleted,
      selectedAttackScenarioId,
      setSelectedAttackScenarioId,
      selectedMapNodeId,
      setSelectedMapNodeId,
      baselineScore
    }}>
      {children}
    </CyberContext.Provider>
  );
};

export const useCyber = () => {
  const context = useContext(CyberContext);
  if (!context) {
    throw new Error('useCyber must be used within a CyberProvider');
  }
  return context;
};
