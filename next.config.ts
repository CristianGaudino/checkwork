import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import type { NextConfig } from "next";

// Lets `next dev` reach the D1 binding in wrangler.jsonc (local SQLite)
initOpenNextCloudflareForDev();

/** First-party plus Turnstile (the contact form's spam check). Cloudflare Web Analytics is added with its issue. */
const TURNSTILE = "https://challenges.cloudflare.com";
const directives: Record<string, string> = {
    "default-src": "'self'",
    // Next's inline bootstrap scripts need 'unsafe-inline' on static pages; React's dev build uses eval
    "script-src": `'self' 'unsafe-inline' ${process.env.NODE_ENV === "development" ? "'unsafe-eval'" : ""} ${TURNSTILE}`,
    "style-src": "'self' 'unsafe-inline'",
    "img-src": "'self' data:",
    "font-src": "'self'",
    "connect-src": `'self' ${TURNSTILE}`,
    "frame-src": TURNSTILE,
    "form-action": "'self'",
    "base-uri": "'self'",
    "object-src": "'none'",
    "frame-ancestors": "'none'",
};
const csp = Object.entries(directives).map(([k, v]) => `${k} ${v.replace(/\s+/g, " ").trim()}`).join("; ");

const SECURITY_HEADERS = [
    { key: "X-Frame-Options", value: "DENY" },
    { key: "Content-Security-Policy", value: csp },
    { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
];

const nextConfig: NextConfig = {
    // No cacheComponents / partialPrefetching: OpenNext on Cloudflare Workers can't run them yet (opennextjs-cloudflare#1450)
    poweredByHeader: false,
    // Next's image optimiser needs sharp, which the Worker bundle leaves out; assets are served as they are
    images: { unoptimized: true },
    outputFileTracingExcludes: {
        "/*": ["node_modules/sharp/**", "node_modules/@img/**", "node_modules/next/dist/compiled/@vercel/og/**"],
    },
    async headers() {
        return [{ source: "/:path*", headers: SECURITY_HEADERS }];
    },
    turbopack: { rules: { "*.css": { loaders: ["@tailwindcss/turbopack"], as: "*.css" } } },
};

export default nextConfig;
