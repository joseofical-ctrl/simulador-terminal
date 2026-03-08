import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Hacker Terminal Simulator',
  description:
    'An interactive hacker terminal simulator built with Next.js 14, TypeScript, TailwindCSS, Framer Motion, and Zustand. A portfolio project showcasing advanced web development skills.',
  keywords: ['hacker terminal', 'terminal simulator', 'portfolio', 'next.js', 'typescript'],
  authors: [{ name: 'Jose' }],
  openGraph: {
    title: 'Hacker Terminal Simulator',
    description: 'Interactive hacker terminal simulator — portfolio project',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-green-400 antialiased`}>
        {children}
      </body>
    </html>
  );
}
