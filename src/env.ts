import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    AUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string()
        : z.string().optional(),
    AUTH_DISCORD_ID: z.string(),
    AUTH_DISCORD_SECRET: z.string(),
    DATABASE_URL: z.string().url(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    UPLOADTHING_TOKEN: z.string().optional(),
    VERCEL_URL: z.string().optional(),
    VERCEL_ENV: z.string().optional(),
    VERCEL_OIDC_TOKEN: z.string().optional(),
    COOKIE_DOMAIN: z.string().optional(),
    MEASUREMENT_ID: z.string().optional().default("G-XXXXXXXXXX"),
    PROD_API_BASE_URL: z.string().optional(),
    WEBSOCKET_URL: z.string().optional(),
    CLERK_SECRET_KEY: z.string(),
    CLERK_SIGN_IN_URL: z.string().optional().default("/sign-in"),
    CLERK_SIGN_UP_URL: z.string().optional().default("/sign-up"),
    LOCAL_DEV_BACKEND_HOST: z.string().optional().default("localhost"),
    LOCAL_DEV_BACKEND_PORT: z.string().optional().default("10000"),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    AUTH_SECRET: process.env.AUTH_SECRET,
    AUTH_DISCORD_ID: process.env.AUTH_DISCORD_ID,
    AUTH_DISCORD_SECRET: process.env.AUTH_DISCORD_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    UPLOADTHING_TOKEN: process.env.UPLOADTHING_TOKEN,
    VERCEL_URL: process.env.VERCEL_URL,
    VERCEL_ENV: process.env.VERCEL_ENV,
    VERCEL_OIDC_TOKEN: process.env.VERCEL_OIDC_TOKEN,
    COOKIE_DOMAIN: process.env.COOKIE_DOMAIN,
    MEASUREMENT_ID: process.env.MEASUREMENT_ID,
    PROD_API_BASE_URL: process.env.PROD_API_BASE_URL,
    WEBSOCKET_URL: process.env.WEBSOCKET_URL,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    CLERK_SIGN_IN_URL: process.env.CLERK_SIGN_IN_URL,
    CLERK_SIGN_UP_URL: process.env.CLERK_SIGN_UP_URL,
    LOCAL_DEV_BACKEND_HOST: process.env.LOCAL_DEV_BACKEND_HOST,
    LOCAL_DEV_BACKEND_PORT: process.env.LOCAL_DEV_BACKEND_PORT,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,

  onInvalidAccess: (error) => {
    throw new Error(`❌ Attempted to access a server-side environment variable on the client: ${error}`);
  },
});
