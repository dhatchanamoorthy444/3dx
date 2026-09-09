import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CalisthenicsProvider } from "../context/CalisthenicsContext";
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
  title: "CaliGym — Complete Calisthenics Learning & Progression Platform",
  description: "Personal calisthenics roadmap taking athletes from beginner fundamentals to advanced skills like Muscle-Up, Handstand, Front Lever, and Planche.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 font-sans">
        <CalisthenicsProvider>
          <Navigation />
          <main className="flex-1">{children}</main>
        </CalisthenicsProvider>
      </body>
    </html>
  );
}
