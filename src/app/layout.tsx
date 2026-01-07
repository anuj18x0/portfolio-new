import "./globals.css";
import clsx from "clsx";
import type { Metadata } from "next";
import { Urbanist } from "next/font/google";

const urbanist = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Arth Arvind - Software Engineer",
  description: "Fullstack Developer & AI Engineer | Building intelligent, scalable web applications with React, Next.js, Python, and AI/ML technologies",
  keywords: ["Arth Arvind", "Software Engineer", "Fullstack Developer", "AI Engineer", "React", "Next.js", "Python", "Machine Learning", "Web Development", "Portfolio"],
  authors: [{ name: "Arth Arvind" }],
  creator: "Arth Arvind",
  publisher: "Arth Arvind",
  openGraph: {
    title: "Arth Arvind - Software Engineer & AI Developer",
    description: "Fullstack Developer & AI Engineer specializing in React, Next.js, Python, and AI/ML technologies",
    url: "https://artharvind.com",
    siteName: "Arth Arvind Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arth Arvind - Software Engineer",
    description: "Fullstack Developer & AI Engineer",
  },
  robots: {
    index: true,
    follow: true,
  },
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
