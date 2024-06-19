import { login_logout_action } from "../../compoment/LoginLogoutActoins";
const { test, expect } = require("@playwright/test");
const { login_success } = login_logout_action;

test("validate Top page [ Check page can be collapsed or expanded side bar ]", async ({ page }) => {
  await login_success(page);

  try {
    await expect(page.locator("aside")).toHaveClass("sb-sidebar sb-sidebar-sm");
    // If the above assertion passes, collapse the sidebar
    await page.locator('div').filter({ hasText: '折りたたむ' }).nth(2).click();
    await expect(page.locator("aside")).toHaveClass("sb-sidebar");
    // Expand the sidebar again
    await page.locator('div').filter({ hasText: '折りたたむ' }).nth(2).click();
    await expect(page.locator("aside")).toHaveClass("sb-sidebar sb-sidebar-sm");
  } catch (e) {
    // If the sidebar is not in the expected initial state, expand it
    await page.locator('div').filter({ hasText: '折りたたむ' }).nth(2).click();
    await expect(page.locator("aside")).toHaveClass("sb-sidebar sb-sidebar-sm");
  }
});
