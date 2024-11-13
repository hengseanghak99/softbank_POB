const { test, expect, devices } = require('@playwright/test');

// Define your mobile device (iPhone 12 in this example)
const iPhone12 = devices['iPhone 12'];

test.use({
    ...iPhone12, // Use the iPhone 12 preset
    viewport: iPhone12.viewport, // Set the viewport for mobile size
});

test.describe('Mobile Testing on iPhone 12', () => {
    test('Login page displays correctly on mobile', async ({ page }) => {
        await page.goto('https://ssdap-site.beniten.net/');
        await page.getByText('LOG IN').click();
        await page.getByPlaceholder('Email').fill('admin@beniten.com');
        await page.getByPlaceholder('Password').fill('VFMuGarUIZbHgoS');
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.getByText('Siem Reap Smart City Data Platform', { exact: true })).toBeVisible();


    });
});

