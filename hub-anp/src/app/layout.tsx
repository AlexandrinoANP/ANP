import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HUB ANP - Plataforma Digital Futurista",
  description: "Hub integrado com IA, automação, avatar digital e gestão de serviços para profissionais e negócios.",
  keywords: ["IA", "automação", "avatar digital", "gestão de serviços", "social media", "reputação"],
  authors: [{ name: "ANP Team" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap" 
          rel="stylesheet" 
        />
        <meta name="theme-color" content="#0ea5e9" />
      </head>
      <body className={`${inter.className} cyber-grid min-h-screen`}>
        <div className="relative z-10">
          {children}
        </div>
        {/* Background Effects */}
        <div className="fixed inset-0 bg-gradient-to-br from-primary-900/20 via-transparent to-accent-900/20 pointer-events-none" />
        <div className="fixed top-0 left-0 w-full h-full bg-cyber-grid opacity-30 pointer-events-none" />
      </body>
    </html>
  );
}
