import { execFileSync } from 'node:child_process';
import { expect, test } from '@playwright/test';
import { ROUTES } from '@/lib/config';

// By email, or by name for an enquiry that left only a number
const rowsFor = (key: string) =>
    execFileSync(process.execPath, ['node_modules/wrangler/bin/wrangler.js', 'd1', 'execute', 'DB', '--local', '--json', '--command', `select name, business, need, details from enquiries where email = '${key}' or name = '${key}'`], { encoding: 'utf8' });

test.describe.configure({ mode: 'serial' });
test.skip(!!process.env.E2E_BASE_URL, 'These tests read the local D1');

test('empty form asks only for a name and a way to reply, and moves focus to the first', async ({ page }) => {
    await page.goto(ROUTES.contact);
    await page.getByRole('button', { name: 'Send now' }).click();
    await expect(page.getByText('Enter your name.')).toBeVisible();
    await expect(page.getByText('Add a phone number or an email so we can reply.')).toBeVisible();
    await expect(page.getByLabel('Your name')).toHaveAttribute('aria-invalid', 'true');
    await expect(page.getByLabel('Your name')).toBeFocused();
});

test('a name and a number is enough: sent as a call-back, need not sure', async ({ page }) => {
    const name = `Caller ${Date.now()}`;
    await page.goto(ROUTES.contact);
    await expect(page.getByRole('heading', { name: 'About your dealership' })).toBeHidden();
    await page.getByLabel('Your name').fill(name);
    await page.getByLabel('Phone', { exact: true }).fill('087 000 0000');
    await page.getByText('Call me', { exact: true }).click();
    // Turnstile's test key passes on its own; wait for its token before sending
    await expect(page.locator('input[name="cf-turnstile-response"]')).not.toHaveValue('', { timeout: 20_000 });
    await page.getByRole('button', { name: 'Send now' }).click();
    await expect(page.getByRole('status')).toContainText('Message sent');
    const row = rowsFor(name);
    expect(row).toContain('Not sure yet');
    expect(row).toContain('A phone call');
});

test('a filled honeypot looks like success but stores nothing', async ({ page }) => {
    const email = `bot-${Date.now()}@example.ie`;
    await page.goto(ROUTES.contact);
    await page.getByLabel('Your name').fill('Bot');
    await page.getByLabel('Email', { exact: true }).fill(email);
    await page.getByLabel('Anything else?').fill('Buy now');
    await page.locator('input[name="company_website"]').evaluate((el: HTMLInputElement) => { el.value = 'http://spam.example'; });
    await page.getByRole('button', { name: 'Send message' }).click();
    await expect(page.getByRole('status')).toContainText('Message sent');
    expect(rowsFor(email)).not.toContain('Bot');
});

test('a dealer arriving from the dealer page gets the dealer questions, and can send without a message', async ({ page }, info) => {
    const email = `dealer-${Date.now()}@example.ie`;
    await page.goto(`${ROUTES.contact}?need=dealer`);
    await expect(page.getByRole('radio', { name: /A website for my dealership/ })).toBeChecked();
    await expect(page.getByRole('heading', { name: 'About your dealership' })).toBeVisible();
    // A problem ticked shows how the demo answers it; one not ticked shows nothing
    const answer = page.getByRole('figure').filter({ hasText: 'Every lead lands in one list' });
    await expect(answer).toBeHidden();
    await page.getByText('Enquiries get lost or answered late').click();
    await expect(answer).toBeVisible();
    await expect(page.getByRole('figure').filter({ hasText: 'Fast on a mid-range phone' })).toBeHidden();
    await page.getByText('In the next few months').click();
    await page.screenshot({ path: `test-results/screenshots/${info.project.name}-contact-dealer.png`, fullPage: true });
    await page.getByText('25 to 75 cars').click();
    await page.getByText('Tell us more').click();
    await page.getByText('On DoneDeal', { exact: true }).click();
    await page.getByLabel('Your name').fill('Dealer Tester');
    await page.getByLabel('Email', { exact: true }).fill(email);
    // A call needs a number: asked for, then sent once it is there
    await page.getByText('Call me', { exact: true }).click();
    await page.getByRole('button', { name: 'Send message' }).click();
    await expect(page.getByText('Add a number so we can call you.')).toBeVisible();
    await expect(page.getByRole('radio', { name: '25 to 75 cars' })).toBeChecked(); // answers survive a failed send
    await expect(page.getByRole('radio', { name: 'On DoneDeal' })).toBeChecked(); // the folded questions too
    await expect(page.getByRole('checkbox', { name: 'Enquiries get lost or answered late' })).toBeChecked();
    await expect(answer).toBeVisible();
    await page.getByLabel('Phone', { exact: true }).fill('087 000 0000');
    await expect(page.locator('input[name="cf-turnstile-response"]')).not.toHaveValue('', { timeout: 20_000 });
    await page.getByRole('button', { name: 'Send message' }).click();
    await expect(page.getByRole('status')).toContainText('try the demo');
    const row = rowsFor(email);
    expect(row).toContain('A website for my dealership');
    expect(row).toContain('25 to 75 cars');
    expect(row).toContain('A phone call');
    expect(row).toContain('Enquiries get lost or answered late');
    expect(row).toContain('In the next few months');
});
