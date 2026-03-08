import { Language } from '@/types/terminal';

type TranslationKey =
  | 'helpTitle'
  | 'helpList'
  | 'helpFooter'
  | 'scanning'
  | 'scanResult1'
  | 'scanResult2'
  | 'scanResult3'
  | 'scanResult4'
  | 'scanResult5'
  | 'scanComplete'
  | 'decrypting'
  | 'decryptStep1'
  | 'decryptStep2'
  | 'decryptStep3'
  | 'decryptStep4'
  | 'decryptComplete'
  | 'accessing'
  | 'accessStep1'
  | 'accessStep2'
  | 'accessStep3'
  | 'accessGranted'
  | 'aboutTitle'
  | 'aboutDesc'
  | 'aboutStack'
  | 'aboutNext'
  | 'aboutTs'
  | 'aboutTailwind'
  | 'aboutFramer'
  | 'aboutZustand'
  | 'aboutAuthor'
  | 'aboutVersion'
  | 'clearMsg'
  | 'unknownCmd'
  | 'welcome1'
  | 'welcome2'
  | 'welcome3'
  | 'matrixStart'
  | 'pingStart'
  | 'pingResult1'
  | 'pingResult2'
  | 'pingResult3'
  | 'pingComplete'
  | 'whoamiDesc'
  | 'ls1'
  | 'ls2'
  | 'ls3'
  | 'ls4'
  | 'ls5'
  | 'statusTitle'
  | 'statusCpu'
  | 'statusRam'
  | 'statusDisk'
  | 'statusNet'
  | 'statusOk';

type Translations = Record<Language, Record<TranslationKey, string>>;

export const translations: Translations = {
  en: {
    helpTitle: '╔══════════════════════════════════════╗',
    helpList: `║         AVAILABLE COMMANDS           ║
╠══════════════════════════════════════╣
║  help          → Show this help      ║
║  scan network  → Scan the network    ║
║  decrypt file  → Decrypt a file      ║
║  access system → Access the system   ║
║  ping <host>   → Ping a host         ║
║  whoami        → Current user info   ║
║  ls            → List files          ║
║  status        → System status       ║
║  matrix        → Matrix animation    ║
║  about         → About this project  ║
║  clear         → Clear terminal      ║`,
    helpFooter: '╚══════════════════════════════════════╝',
    scanning: '[ SCANNING ] Initializing network scanner...',
    scanResult1: '  ✓ Host scan started on 192.168.1.0/24',
    scanResult2: '  ► IP Found: 192.168.1.1  [Router]     [OPEN]',
    scanResult3: '  ► IP Found: 192.168.1.23 [Unknown]    [OPEN]',
    scanResult4: '  ► IP Found: 192.168.1.45 [Server]     [FILTERED]',
    scanResult5: '  ⚠ Firewall detected on port 443. Attempting bypass...',
    scanComplete: '  ✓ Scan complete. 3 hosts found. Firewall bypassed.',
    decrypting: '[ DECRYPT ] Loading encrypted file...',
    decryptStep1: '  ► Reading file: /secret/data.enc',
    decryptStep2: '  ► Applying AES-256 decryption algorithm...',
    decryptStep3: '  ► Brute-forcing key: [████████████] 100%',
    decryptStep4: '  ⚠ Key found: 7f4a9b3c2d1e8f6a',
    decryptComplete: '  ✓ File decrypted successfully → /tmp/data.txt',
    accessing: '[ ACCESS ] Connecting to protected system...',
    accessStep1: '  ► Establishing secure tunnel...',
    accessStep2: '  ► Bypassing firewall rules...',
    accessStep3: '  ► Injecting credentials...',
    accessGranted: '  ✓ ACCESS GRANTED — Welcome, root.',
    aboutTitle: '╔══════════════════════════════════════╗\n║       HACKER TERMINAL SIMULATOR      ║\n╠══════════════════════════════════════╣',
    aboutDesc: '║  A portfolio project simulating a    ║\n║  professional hacker terminal UI.    ║',
    aboutStack: '╠══════════════════════════════════════╣\n║  TECH STACK:                         ║',
    aboutNext: '║  ◆ Next.js 14 (App Router)          ║',
    aboutTs: '║  ◆ TypeScript                        ║',
    aboutTailwind: '║  ◆ TailwindCSS                       ║',
    aboutFramer: '║  ◆ Framer Motion                     ║',
    aboutZustand: '║  ◆ Zustand                           ║',
    aboutAuthor: '╠══════════════════════════════════════╣\n║  Author: Jose (Portfolio Dev)        ║',
    aboutVersion: '║  Version: 1.0.0                      ║\n╚══════════════════════════════════════╝',
    clearMsg: 'Terminal cleared.',
    unknownCmd: (cmd: string) => `Command not found: ${cmd}. Type 'help' for available commands.`,
    welcome1: '  ██╗  ██╗ █████╗  ██████╗██╗  ██╗███████╗██████╗',
    welcome2: '  Hacker Terminal Simulator v1.0.0',
    welcome3: "  Type 'help' to see all available commands.",
    matrixStart: '[ MATRIX ] Initiating Matrix sequence...',
    pingStart: (host: string) => `[ PING ] Pinging ${host}...`,
    pingResult1: (host: string) => `  ► Reply from ${host}: bytes=32 time=12ms TTL=64`,
    pingResult2: (host: string) => `  ► Reply from ${host}: bytes=32 time=9ms TTL=64`,
    pingResult3: (host: string) => `  ► Reply from ${host}: bytes=32 time=11ms TTL=64`,
    pingComplete: (host: string) => `  ✓ Ping to ${host} complete — 3 packets sent, 0 lost.`,
    whoamiDesc: '  root@system — uid=0(root) gid=0(root) groups=0(root)',
    ls1: '  drwxr-xr-x  secret/',
    ls2: '  drwxr-xr-x  logs/',
    ls3: '  -rw-r--r--  config.enc',
    ls4: '  -rw-r--r--  data.db',
    ls5: '  -rwxr-xr-x  exploit.sh',
    statusTitle: '[ STATUS ] System report:',
    statusCpu: '  CPU Usage:    ██████████░░░░░░ 63%',
    statusRam: '  RAM Usage:    ████████████░░░░ 71%',
    statusDisk: '  Disk Usage:   ██████░░░░░░░░░░ 38%',
    statusNet: '  Network:      ████████████████ ACTIVE',
    statusOk: '  ✓ All systems operational.',
  } as unknown as Record<TranslationKey, string>,
  es: {
    helpTitle: '╔══════════════════════════════════════╗',
    helpList: `║         COMANDOS DISPONIBLES         ║
╠══════════════════════════════════════╣
║  help          → Mostrar esta ayuda  ║
║  scan network  → Escanear la red     ║
║  decrypt file  → Desencriptar archivo║
║  access system → Acceder al sistema  ║
║  ping <host>   → Hacer ping a host   ║
║  whoami        → Info usuario actual ║
║  ls            → Listar archivos     ║
║  status        → Estado del sistema  ║
║  matrix        → Animación Matrix    ║
║  about         → Sobre este proyecto ║
║  clear         → Limpiar terminal    ║`,
    helpFooter: '╚══════════════════════════════════════╝',
    scanning: '[ ESCANEANDO ] Iniciando escáner de red...',
    scanResult1: '  ✓ Escaneo iniciado en 192.168.1.0/24',
    scanResult2: '  ► IP Encontrada: 192.168.1.1  [Router]   [ABIERTO]',
    scanResult3: '  ► IP Encontrada: 192.168.1.23 [Desconocido] [ABIERTO]',
    scanResult4: '  ► IP Encontrada: 192.168.1.45 [Servidor] [FILTRADO]',
    scanResult5: '  ⚠ Firewall detectado en puerto 443. Intentando bypass...',
    scanComplete: '  ✓ Escaneo completo. 3 hosts encontrados. Firewall burlado.',
    decrypting: '[ DESCIFRAR ] Cargando archivo encriptado...',
    decryptStep1: '  ► Leyendo archivo: /secret/data.enc',
    decryptStep2: '  ► Aplicando algoritmo de descifrado AES-256...',
    decryptStep3: '  ► Fuerza bruta en clave: [████████████] 100%',
    decryptStep4: '  ⚠ Clave encontrada: 7f4a9b3c2d1e8f6a',
    decryptComplete: '  ✓ Archivo descifrado exitosamente → /tmp/data.txt',
    accessing: '[ ACCESO ] Conectando al sistema protegido...',
    accessStep1: '  ► Estableciendo túnel seguro...',
    accessStep2: '  ► Evadiendo reglas de firewall...',
    accessStep3: '  ► Inyectando credenciales...',
    accessGranted: '  ✓ ACCESO CONCEDIDO — Bienvenido, root.',
    aboutTitle: '╔══════════════════════════════════════╗\n║       HACKER TERMINAL SIMULATOR      ║\n╠══════════════════════════════════════╣',
    aboutDesc: '║  Proyecto de portfolio que simula    ║\n║  una terminal hacker profesional.    ║',
    aboutStack: '╠══════════════════════════════════════╣\n║  TECNOLOGÍAS:                        ║',
    aboutNext: '║  ◆ Next.js 14 (App Router)          ║',
    aboutTs: '║  ◆ TypeScript                        ║',
    aboutTailwind: '║  ◆ TailwindCSS                       ║',
    aboutFramer: '║  ◆ Framer Motion                     ║',
    aboutZustand: '║  ◆ Zustand                           ║',
    aboutAuthor: '╠══════════════════════════════════════╣\n║  Autor: Jose (Portfolio Dev)         ║',
    aboutVersion: '║  Versión: 1.0.0                      ║\n╚══════════════════════════════════════╝',
    clearMsg: 'Terminal limpiada.',
    unknownCmd: (cmd: string) => `Comando no encontrado: ${cmd}. Escribe 'help' para ver los comandos disponibles.`,
    welcome1: '  ██╗  ██╗ █████╗  ██████╗██╗  ██╗███████╗██████╗',
    welcome2: '  Hacker Terminal Simulator v1.0.0',
    welcome3: "  Escribe 'help' para ver todos los comandos disponibles.",
    matrixStart: '[ MATRIX ] Iniciando secuencia Matrix...',
    pingStart: (host: string) => `[ PING ] Haciendo ping a ${host}...`,
    pingResult1: (host: string) => `  ► Respuesta de ${host}: bytes=32 tiempo=12ms TTL=64`,
    pingResult2: (host: string) => `  ► Respuesta de ${host}: bytes=32 tiempo=9ms TTL=64`,
    pingResult3: (host: string) => `  ► Respuesta de ${host}: bytes=32 tiempo=11ms TTL=64`,
    pingComplete: (host: string) => `  ✓ Ping a ${host} completo — 3 paquetes enviados, 0 perdidos.`,
    whoamiDesc: '  root@sistema — uid=0(root) gid=0(root) grupos=0(root)',
    ls1: '  drwxr-xr-x  secreto/',
    ls2: '  drwxr-xr-x  registros/',
    ls3: '  -rw-r--r--  config.enc',
    ls4: '  -rw-r--r--  datos.db',
    ls5: '  -rwxr-xr-x  exploit.sh',
    statusTitle: '[ ESTADO ] Reporte del sistema:',
    statusCpu: '  Uso de CPU:   ██████████░░░░░░ 63%',
    statusRam: '  Uso de RAM:   ████████████░░░░ 71%',
    statusDisk: '  Uso de Disco: ██████░░░░░░░░░░ 38%',
    statusNet: '  Red:          ████████████████ ACTIVA',
    statusOk: '  ✓ Todos los sistemas operativos.',
  } as unknown as Record<TranslationKey, string>,
};

export type { TranslationKey };
