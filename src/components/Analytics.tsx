import { ANALYTICS_TOKEN } from '@/lib/config';

/** Cloudflare Web Analytics: cookieless, no consent banner needed. Loads nothing until ANALYTICS_TOKEN is set. */
export function Analytics() {
    if (!ANALYTICS_TOKEN) return null;
    return <script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon={JSON.stringify({ token: ANALYTICS_TOKEN })} />;
}
