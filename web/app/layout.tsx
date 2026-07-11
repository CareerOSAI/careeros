import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";

import "./globals.css";
import { JobSearchProvider } from "@/context/JobSearchContext";
import { AuthProvider } from "@/context/AuthContext";
import { CareerProvider } from "@/context/CareerContext";
import { AIProvider } from "@/context/AIContext";
import { ActivityProvider } from "@/context/ActivityContext";
import { JobsProvider } from "@/context/JobsContext";
import { RoadmapProvider } from "@/context/RoadmapContext";
import { ProviderContextProvider } from "@/context/ProviderContext";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CareerOS",
  description: "Your AI Software Engineering Operating System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground">
        <AuthProvider>
          <CareerProvider>
            <AIProvider>
              <JobSearchProvider>
                <ProviderContextProvider>
               <ActivityProvider>
                <RoadmapProvider>
                  <JobsProvider>
                    {children}

                    <Toaster
                      richColors
                      position="top-right"
                      closeButton
                      expand
                      duration={3000}
                    />
                  </JobsProvider>
                </RoadmapProvider>
              </ActivityProvider>
              </ProviderContextProvider>
              </JobSearchProvider>
            </AIProvider>
          </CareerProvider>
        </AuthProvider>
      </body>
    </html>
  );
}