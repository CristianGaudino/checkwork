import { defineConfig, devices } from '@playwright/test';

const PORT = 3100;

// Runs against a production build (the dev server drops navigations mid-test). E2E_BASE_URL tests a deployed site instead.
export default defineConfig({
    testDir: 'e2e',
    retries: 0,
    reporter: process.env.CI ? [['github'], ['list'], ['html', { open: 'never' }]] : 'list',
    use: { baseURL: process.env.E2E_BASE_URL ?? `http://localhost:${PORT}`, trace: 'retain-on-failure' },
    projects: [
        { name: 'phone', use: devices['Pixel 7'] },
        { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
    ],
    webServer: process.env.E2E_BASE_URL
        ? undefined
        : { command: `APP_ENV=production npm run build && APP_ENV=production npm run start -- -p ${PORT}`, url: `http://localhost:${PORT}`, reuseExistingServer: !process.env.CI, timeout: 180_000 },
});
