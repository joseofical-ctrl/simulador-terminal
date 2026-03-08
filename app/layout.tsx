import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Excuse Generator AI — Generate the perfect excuse for any situation",
  description:
    "Use AI to generate creative, funny, and believable excuses for work, university, relationships, family, and more. Powered by GPT-4.",
  keywords: [
    "excuse generator",
    "AI excuses",
    "funny excuses",
    "excuse maker",
    "GPT excuses",
  ],
  openGraph: {
    title: "Excuse Generator AI",
    description: "Generate the perfect excuse for any situation.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-zinc-950`}>
        {children}
        {/* Global toast notifications */}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#18181b",
              border: "1px solid #3f3f46",
              color: "#f4f4f5",
            },
          }}
        />
      </body>
    </html>
  );
}
