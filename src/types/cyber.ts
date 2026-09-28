/**
 * Core Types for CyberMirror Platform
 */

export type PageView = 
  | 'home'
  | 'security-check'
  | 'exposure-map'
  | 'attack-simulator'
  | 'defender-mode'
  | 'learn'
  | 'quiz'
  | 'mirror-ai'
  | 'dashboard';

export type RiskLevel = 'low' | 'moderate' | 'high' | 'critical';

export interface QuestionOption {
  id: string;
  label: string;
  subtext?: string;
  riskScore: number; // 0 (safest) to 10 (most exposed)
  riskFactor: string;
  countermeasureTitle: string;
  countermeasureAction: string;
  countermeasureCategory: 'password' | 'account' | 'privacy' | 'device' | 'backup' | 'social';
}

export interface SecurityQuestion {
  id: string;
  category: 'password' | 'account' | 'privacy' | 'device' | 'backup' | 'social';
  categoryLabel: string;
  title: string;
  scenarioContext: string;
  whyItMatters: string;
  options: QuestionOption[];
}

export interface CategoryMetric {
  name: string;
  key: 'password' | 'account' | 'privacy' | 'device' | 'backup' | 'social';
  score: number; // 0 - 100 (where 0 is completely safe, 100 is maximum exposure)
  level: RiskLevel;
  summary: string;
}

export interface ExposureMetrics {
  overallScore: number; // 0 to 100
  level: RiskLevel;
  passwordSecurity: number;
  accountSecurity: number;
  socialEngineeringRisk: number;
  privacyExposure: number;
  deviceSecurity: number;
  backupRecovery: number;
  completedQuestionsCount: number;
  totalQuestionsCount: number;
}

export interface HardeningCountermeasure {
  id: string;
  title: string;
  category: 'password' | 'account' | 'privacy' | 'device' | 'backup' | 'social';
  categoryLabel: string;
  impactScoreReduction: number; // e.g. -8 points
  riskTrigger: string;
  threatImpact: string;
  defenseAction: string;
  implemented: boolean;
  difficulty: 'Quick (2 min)' | 'Moderate (10 min)' | 'Advanced (30 min)';
  actionGuideSteps: string[];
}

export interface AttackStep {
  stepNumber: number;
  phaseName: string;
  attackerAction: string;
  systemOrUserImpact: string;
  technicalMechanism: string;
  severity: RiskLevel;
}

export interface AttackScenario {
  id: string;
  title: string;
  userQuestion: string; // "What if I click a phishing link?"
  triggerHook: string;
  mitreTechnique: string;
  category: string;
  estimatedSuccessRateWithoutDefense: string;
  chainSteps: AttackStep[];
  defenseChecklist: string[];
  recommendedControl: string;
}

export interface ExposureNode {
  id: string;
  label: string;
  shortTag: string;
  category: string;
  summary: string;
  riskDescription: string;
  whyItMatters: string;
  exampleScenario: string;
  recommendedProtection: string;
  severity: RiskLevel;
  downstreamIds: string[];
}

export interface LearningModule {
  id: string;
  title: string;
  category: 'Fundamentals' | 'Threat Vectors' | 'Data & Privacy' | 'Enterprise & SOC';
  readTime: string;
  summary: string;
  realWorldExample: string;
  warningSigns: string[];
  preventionTips: string[];
  quickQuiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface QuizQuestion {
  id: string;
  question: string;
  context: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  isStreaming?: boolean;
  suggestedPrompts?: string[];
  actionLink?: {
    page: PageView;
    label: string;
  };
}
