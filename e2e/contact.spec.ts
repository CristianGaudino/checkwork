import { execFileSync } from 'node:child_process';
import { expect, test } from '@playwright/test';
import { ROUTES } from '@/lib/config';

const rowsFor = (email: string) =>
    execFileSync(process.execPath, ['node_modules/wrangler/bin/wrangler.js', 'd1', 'execute', 'DB', '--local', '--json', '--command', `select name, business, need from enquiries where email = '${email}'`], { encoding: 'utf8' });

test.describe.configure({ mode: 'serial' });
test.skip(!!process.env.E2E_BASE_URL, 'These tests read the local D1');

test('empty form shows plain errors and moves focus to the first one', async ({ page }) => {
    await page.goto(ROUTES.contact);
    await page.getByRole('button', { name: 'Send message' }).click();
    await expect(page.getByText('Enter your name.')).toBeVisible();
    await expect(page.getByText('Enter an email address we can reply to')).toBeVisible();
    await expect(page.getByText('Write a few lines about what you need.')).toBeVisible();
    await expect(page.getByLabel('Your name')).toHaveAttribute('aria-invalid', 'true');
    await expect(page.getByLabel('Your name')).toBeFocused();
});

test('a valid enquiry is stored in D1 and the visitor is told', async ({ page }) => {
    const email = `e2e-${Date.now()}@example.ie`;
    await page.goto(ROUTES.contact);
    await page.getByLabel('Your name').fill('E2E Tester');
    await page.getByLabel('Email').fill(email);
    await page.getByLabel('Tell us about it').fill('Testing the form.');
    // Turnstile's test key passes on its own; wait for its token before sending
    await expect(page.locator('input[name="cf-turnstile-response"]')).not.toHaveValue('', { timeout: 20_000 });
    await page.getByRole('button', { name: 'Send message' }).click();
    await expect(page.getByRole('status')).toContainText('Message sent');
    expect(rowsFor(email)).toContain('E2E Tester');
});

test('a filled honeypot looks like success but stores nothing', async ({ page }) => {
    const email = `bot-${Date.now()}@example.ie`;
    await page.goto(ROUTES.contact);
    await page.getByLabel('Your name').fill('Bot');
    await page.getByLabel('Email').fill(email);
    await page.getByLabel('Tell us about it').fill('Buy now');
    await page.locator('input[name="company_website"]').evaluate((el: HTMLInputElement) => { el.value = 'http://spam.example'; });
    await page.getByRole('button', { name: 'Send message' }).click();
    await expect(page.getByRole('status')).toContainText('Message sent');
    expect(rowsFor(email)).not.toContain('Bot');
});
