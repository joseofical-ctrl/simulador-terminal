import { Language } from '@/types/terminal';
import { translations } from './translations';

interface CommandStep {
  text: string;
  type: 'output' | 'success' | 'error' | 'system' | 'matrix';
  delay: number;
}

export function getWelcomeMessages(lang: Language): CommandStep[] {
  const t = translations[lang];
  return [
    { text: '', type: 'system', delay: 0 },
    { text: '  ██╗  ██╗ █████╗  ██████╗██╗  ██╗███████╗██████╗ ', type: 'success', delay: 50 },
    { text: '  ██║  ██║██╔══██╗██╔════╝██║ ██╔╝██╔════╝██╔══██╗', type: 'success', delay: 100 },
    { text: '  ███████║███████║██║     █████╔╝ █████╗  ██████╔╝', type: 'success', delay: 150 },
    { text: '  ██╔══██║██╔══██║██║     ██╔═██╗ ██╔══╝  ██╔══██╗', type: 'success', delay: 200 },
    { text: '  ██║  ██║██║  ██║╚██████╗██║  ██╗███████╗██║  ██║', type: 'success', delay: 250 },
    { text: '  ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝', type: 'success', delay: 300 },
    { text: '', type: 'system', delay: 350 },
    { text: t.welcome2 as string, type: 'system', delay: 400 },
    { text: t.welcome3 as string, type: 'output', delay: 450 },
    { text: '', type: 'system', delay: 500 },
  ];
}

export function parseCommand(
  input: string,
  lang: Language
): CommandStep[] {
  const t = translations[lang];
  const trimmed = input.trim().toLowerCase();

  if (trimmed === 'help') {
    return [
      { text: t.helpTitle as string, type: 'output', delay: 0 },
      { text: t.helpList as string, type: 'output', delay: 50 },
      { text: t.helpFooter as string, type: 'output', delay: 100 },
    ];
  }

  if (trimmed === 'scan network') {
    return [
      { text: t.scanning as string, type: 'system', delay: 0 },
      { text: t.scanResult1 as string, type: 'output', delay: 300 },
      { text: t.scanResult2 as string, type: 'output', delay: 700 },
      { text: t.scanResult3 as string, type: 'output', delay: 1100 },
      { text: t.scanResult4 as string, type: 'output', delay: 1500 },
      { text: t.scanResult5 as string, type: 'error', delay: 1900 },
      { text: t.scanComplete as string, type: 'success', delay: 2600 },
    ];
  }

  if (trimmed === 'decrypt file') {
    return [
      { text: t.decrypting as string, type: 'system', delay: 0 },
      { text: t.decryptStep1 as string, type: 'output', delay: 400 },
      { text: t.decryptStep2 as string, type: 'output', delay: 900 },
      { text: t.decryptStep3 as string, type: 'output', delay: 1500 },
      { text: t.decryptStep4 as string, type: 'error', delay: 2200 },
      { text: t.decryptComplete as string, type: 'success', delay: 2900 },
    ];
  }

  if (trimmed === 'access system') {
    return [
      { text: t.accessing as string, type: 'system', delay: 0 },
      { text: t.accessStep1 as string, type: 'output', delay: 500 },
      { text: t.accessStep2 as string, type: 'output', delay: 1100 },
      { text: t.accessStep3 as string, type: 'output', delay: 1800 },
      { text: t.accessGranted as string, type: 'success', delay: 2500 },
    ];
  }

  if (trimmed === 'about') {
    return [
      { text: t.aboutTitle as string, type: 'output', delay: 0 },
      { text: t.aboutDesc as string, type: 'output', delay: 100 },
      { text: t.aboutStack as string, type: 'output', delay: 150 },
      { text: t.aboutNext as string, type: 'output', delay: 200 },
      { text: t.aboutTs as string, type: 'output', delay: 250 },
      { text: t.aboutTailwind as string, type: 'output', delay: 300 },
      { text: t.aboutFramer as string, type: 'output', delay: 350 },
      { text: t.aboutZustand as string, type: 'output', delay: 400 },
      { text: t.aboutAuthor as string, type: 'output', delay: 450 },
      { text: t.aboutVersion as string, type: 'output', delay: 500 },
    ];
  }

  if (trimmed === 'whoami') {
    return [
      { text: t.whoamiDesc as string, type: 'success', delay: 0 },
    ];
  }

  if (trimmed === 'ls') {
    return [
      { text: t.ls1 as string, type: 'output', delay: 0 },
      { text: t.ls2 as string, type: 'output', delay: 80 },
      { text: t.ls3 as string, type: 'output', delay: 160 },
      { text: t.ls4 as string, type: 'output', delay: 240 },
      { text: t.ls5 as string, type: 'output', delay: 320 },
    ];
  }

  if (trimmed === 'status') {
    return [
      { text: t.statusTitle as string, type: 'system', delay: 0 },
      { text: t.statusCpu as string, type: 'output', delay: 200 },
      { text: t.statusRam as string, type: 'output', delay: 400 },
      { text: t.statusDisk as string, type: 'output', delay: 600 },
      { text: t.statusNet as string, type: 'output', delay: 800 },
      { text: t.statusOk as string, type: 'success', delay: 1000 },
    ];
  }

  if (trimmed === 'matrix') {
    return [
      { text: t.matrixStart as string, type: 'success', delay: 0 },
      { text: '__MATRIX__', type: 'matrix', delay: 200 },
    ];
  }

  if (trimmed.startsWith('ping ')) {
    const host = trimmed.replace('ping ', '').trim() || '8.8.8.8';
    const pingStart = translations[lang].pingStart as unknown as (h: string) => string;
    const pingResult1 = translations[lang].pingResult1 as unknown as (h: string) => string;
    const pingResult2 = translations[lang].pingResult2 as unknown as (h: string) => string;
    const pingResult3 = translations[lang].pingResult3 as unknown as (h: string) => string;
    const pingComplete = translations[lang].pingComplete as unknown as (h: string) => string;
    return [
      { text: pingStart(host), type: 'system', delay: 0 },
      { text: pingResult1(host), type: 'output', delay: 500 },
      { text: pingResult2(host), type: 'output', delay: 1000 },
      { text: pingResult3(host), type: 'output', delay: 1500 },
      { text: pingComplete(host), type: 'success', delay: 2000 },
    ];
  }

  if (trimmed === 'clear') {
    return [{ text: '__CLEAR__', type: 'system', delay: 0 }];
  }

  const unknownCmd = translations[lang].unknownCmd as unknown as (cmd: string) => string;
  return [
    { text: unknownCmd(trimmed), type: 'error', delay: 0 },
  ];
}
