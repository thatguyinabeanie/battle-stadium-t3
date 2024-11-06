import "~/styles/globals.css";

import { StrictMode } from "react";
import type { Metadata, Viewport } from "next";

import { type AppProps } from "next/app";
import { siteConfig } from "~/config/site";
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
const AwesomeParticles = dynamic(() => import("~/components/awesome-particles"));
const Cookies = dynamic(() => import("~/components/cookies"));

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
        // suppressHydrationWarning
        lang="en"
        className={`${GeistSans.variable}`}
      >
        <head />

        <body className="bg-background font-sans antialiased overflow-y-scroll">
          <NextSSRPlugin routerConfig={ extractRouterConfig(UploadThingRouter) } />
          <TRPCReactProvider>

            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >

              <div className="flex flex-col items-center min-h-screen ">
                <AwesomeParticles />

                <div className="flex flex-col items-center min-h-screen backdrop-blur shadow-2xl dark:shadow-white w-5/6 ">
                  <Navbar />

                  <main className="flex flex-col min-h-screen items-center w-full">
                    <section className="flex flex-col gap-4 w-full items-center z-0">
                      { children }
                    </section>
                  </main>

                  <Footer />
                </div>
              </div>

                <Cookies isSignedIn={ !!sessionId } userId={ userId } />

                <VercelAnalytics />

                { env.VERCEL_ENV === "production" && <VercelSpeedInsights /> }

                <GoogleAnalytics gaId={ env.MEASUREMENT_ID ?? "" } />

            </ThemeProvider>
          </TRPCReactProvider>
        </body>


      </html>
      </ClerkProvider>
    </StrictMode>
  );
}
