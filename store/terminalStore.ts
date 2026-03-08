import { create } from 'zustand';
import { OutputLine, TerminalState } from '@/types/terminal';

function generateId(): string {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}

export const useTerminalStore = create<TerminalState>((set, get) => ({
  history: [],
  commandHistory: [],
  historyIndex: -1,
  isProcessing: false,

  addOutput: (line) => {
    const newLine: OutputLine = {
      ...line,
      id: generateId(),
      timestamp: Date.now(),
    };
    set((state) => ({ history: [...state.history, newLine] }));
  },

  addCommand: (command: string) => {
    if (!command.trim()) return;
    set((state) => ({
      commandHistory: [command, ...state.commandHistory.filter((c) => c !== command)].slice(0, 50),
      historyIndex: -1,
    }));
  },

  clearHistory: () => set({ history: [] }),

  setHistoryIndex: (index: number) => set({ historyIndex: index }),

  setProcessing: (processing: boolean) => set({ isProcessing: processing }),
}));
