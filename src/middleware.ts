import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { env } from "./env.ts";

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};

const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  if (
    [env.NODE_ENV, env.VERCEL_ENV].includes("production") &&
    !isPublicRoute(request)
  ) {
    await auth.protect();
  }
});
