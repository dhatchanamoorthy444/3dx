import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CalisthenicsProvider } from "../context/CalisthenicsContext";
import { AuthProvider } from "../context/AuthContext";
import { Navigation } from "../components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CaliGym — Calisthenics Workout Programs & Bodyweight Training for Beginners",
  description: "Master your bodyweight with online fitness coaching and home workouts with no equipment. Take a 2-minute assessment, unlock your Level 1-8 roadmap, and progress to Muscle-Up, Handstand, Front Lever and Planche.",
  keywords: ["calisthenics workout programs", "bodyweight training for beginners", "online fitness coaching", "home workouts no equipment", "planche progression", "muscle up training"],
  openGraph: {
    title: "CaliGym — Master Your Bodyweight. Build Lasting Strength.",
    description: "Ditch heavy weights and gym memberships. Get your Level 1-8 roadmap and daily bodyweight plan.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 font-sans">
        <AuthProvider>
          <CalisthenicsProvider>
            <Navigation />
            <main className="flex-1">{children}</main>
          </CalisthenicsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
