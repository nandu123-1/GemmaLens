export type AnalysisMode = 'scene' | 'chart' | 'document' | 'ui_to_code' | 'qa';

export interface Finding {
  label: string;
  detail: string;
  evidence?: string;
  confidence?: 'high' | 'medium' | 'low';
}

export interface AnalysisTable {
  columns: string[];
  rows: Array<Array<string | number | null>>;
}

export interface AnalysisResult {
  mode: AnalysisMode;
  title: string;
  summary: string;
  findings: Finding[];
  extractedText?: string;
  table?: AnalysisTable;
  json?: Record<string, unknown> | unknown[];
  html?: string;
  limitations: string[];
  followUpQuestions?: string[];
}

export interface AnalysisResponse {
  success: boolean;
  isDemo: boolean;
  illustrativeNotice?: string;
  result: AnalysisResult;
}

export interface ServerHealth {
  status: string;
  provider: string;
  model: string;
  hasApiKey: boolean;
  mode: 'live' | 'demo';
  message: string;
  maxUploadSizeMb: number;
}

export interface HistoryItem {
  id: string;
  timestamp: string;
  mode: AnalysisMode;
  title: string;
  summary: string;
  isDemo: boolean;
  result: AnalysisResult;
}
