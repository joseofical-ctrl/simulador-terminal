export type Language = "es" | "en";

export interface OutputLine {
  id: string;
  type: 'command' | 'output' | 'error' | 'system' | 'success' | 'matrix';
  content: string;
  timestamp: number;
}

export interface TerminalState {
  history: OutputLine[];
  commandHistory: string[];
  historyIndex: number;
  isProcessing: boolean;
  addOutput: (line: Omit<OutputLine, "id" | "timestamp">) => void;
  addCommand: (command: string) => void;
  clearHistory: () => void;
  setHistoryIndex: (index: number) => void;
  setProcessing: (processing: boolean) => void;
}

export interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export interface CommandResponse {
  lines: string[];
  type: OutputLine["type"];
  delay?: number;
}
