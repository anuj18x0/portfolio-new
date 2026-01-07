import "./globals.css";
import clsx from "clsx";
import type { Metadata } from "next";
import { Urbanist } from "next/font/google";

const urbanist = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Arth Arvind - Software Engineer",
  description: "Fullstack Developer & AI Engineer | Building intelligent, scalable web applications with React, Next.js, Python, and AI/ML technologies",
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' }
    ],
    apple: [
      { url: '/icon.svg' }
    ]
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-slate-900">
      <body className={clsx(urbanist.className, "relative min-h-screen")}>
        {children}
        <div className="background-gradient absolute inset-0 -z-50 max-h-screen" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background pointer-events-none -z-40" />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none -z-30"
          style={{
            backgroundImage: `linear-gradient(hsl(175, 80%, 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(175, 80%, 50%) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
        <div className="pointer-events-none absolute inset-0 -z-40 h-full opacity-20 mix-blend-soft-light"></div>
      </body>
    </html>
  );
}
