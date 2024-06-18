import { test, expect } from '@playwright/test';
import { NavigatePage } from './pages/NavigationPage';

const login_url = "https://sb-disaster-admin-pob.tagcast.group/login";

test.beforeEach(async ({ page }) => {
  await page.goto(login_url);
});

test("Navigate to page", async ({ page }) => {
  const navigateTo = new NavigatePage(page);
  await navigateTo.FormLayoutPage();
});
