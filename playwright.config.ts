import { defineConfig, devices } from '@playwright/test';

const PORT = Number(process.env.E2E_PORT ?? 3100); // set E2E_PORT if 3100 is taken

// Runs against the real Worker build (OpenNext + wrangler dev, with a local D1), not `next dev`, which drops navigations
// mid-test and has no production runtime. E2E_BASE_URL tests a deployed site instead (the D1 check is then skipped).
const TURNSTILE_TEST_SECRET = '1x0000000000000000000000000000000AA';
export default defineConfig({
    testDir: 'e2e',
    retries: 0,
    reporter: process.env.CI ? [['github'], ['list'], ['html', { open: 'never' }]] : 'list',
    use: { baseURL: process.env.E2E_BASE_URL ?? `http://127.0.0.1:${PORT}`, trace: 'retain-on-failure' },
    projects: [
        { name: 'phone', use: devices['Pixel 7'] },
        { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
    ],
    webServer: process.env.E2E_BASE_URL
        ? undefined
        : { command: `npx opennextjs-cloudflare build && npm run db:migrate:local && npx wrangler dev --port ${PORT} --ip 127.0.0.1 --var TURNSTILE_SECRET_KEY:${TURNSTILE_TEST_SECRET}`, url: `http://127.0.0.1:${PORT}`, reuseExistingServer: !process.env.CI, timeout: 300_000, env: { APP_ENV: 'production' } },
});
