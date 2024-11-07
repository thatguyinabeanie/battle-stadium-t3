import "~/styles/globals.css";

import { StrictMode } from "react";
import type { Metadata, Viewport } from "next";

import { type AppProps } from "next/app";
import { siteConfig } from "~/lib/config/site";
import { GeistSans } from "geist/font/sans";
import dynamic from "next/dynamic";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import { SpeedInsights as VercelSpeedInsights } from "@vercel/speed-insights/next";
import { ClerkProvider } from "@clerk/nextjs";
import { GoogleAnalytics } from "@next/third-parties/google";

import { auth } from "@clerk/nextjs/server";

import ThemeProvider from "~/components/theme-provider";
import { type ChildrenProps } from "~/types";
import Footer from "~/components/footer";
import { TRPCReactProvider } from "~/trpc/react";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { UploadThingRouter } from "~/app/api/uploadthing/core";
import { env } from "~/env.ts";
import Navbar from "~/components/navbar/navbar";
const AwesomeParticles = dynamic(
  () => import("~/components/awesome-particles"),
);
const Cookies = dynamic(() => import("~/components/cookies/cookies"));

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<ChildrenProps & AppProps>) {
  const { userId, sessionId } = await auth();

  return (
    <StrictMode>
      <ClerkProvider>
        <html
          suppressHydrationWarning
          lang="en"
          className={`${GeistSans.variable}`}
        >
          <head />

          <body className="overflow-y-scroll bg-background font-sans antialiased">
            <NextSSRPlugin
              routerConfig={extractRouterConfig(UploadThingRouter)}
            />
            <TRPCReactProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <div className="flex min-h-screen flex-col items-center">
                  <AwesomeParticles />

                  <div className="flex min-h-screen w-5/6 flex-col items-center shadow-2xl backdrop-blur dark:shadow-white">
                    <Navbar />

                    <main className="flex min-h-screen w-full flex-col items-center">
                      <section className="z-0 flex w-full flex-col items-center gap-4">
                        {children}
                      </section>
                    </main>

                    <Footer />
                  </div>
                </div>

                <Cookies isSignedIn={!!sessionId} userId={userId} />

                <VercelAnalytics />

                {env.VERCEL_ENV === "production" && <VercelSpeedInsights />}

                <GoogleAnalytics gaId={env.MEASUREMENT_ID ?? ""} />
              </ThemeProvider>
            </TRPCReactProvider>
          </body>
        </html>
      </ClerkProvider>
    </StrictMode>
  );
}
