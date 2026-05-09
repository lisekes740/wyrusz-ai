import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "wyruszAI - Twój asystent podróży",
  description: "Inteligentne planowanie podróży na całym świecie.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative">
        {children}
        <div className="fixed bottom-6 left-6 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-white/90 border border-emerald-200 backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.2)] font-serif text-2xl font-bold text-emerald-600">
          W
        </div>
      </body>
    </html>
  );
}
