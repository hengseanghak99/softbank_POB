import { login_logout_action } from "../compoment/LoginLogoutActoins";
const { expect } = require('@playwright/test');
const { login_success } = login_logout_action;

class NavigatePage {
  constructor(page) {
    this.page = page;
  }

  async FormLayoutPage() {
    await login_success(this.page);  // Await the async function and use 'this.page'
    try {
      await expect(this.page.locator("aside")).toHaveClass("sb-sidebar sb-sidebar-sm");
      // If the above assertion passes, collapse the sidebar
      await this.page.locator('div').filter({ hasText: '折りたたむ' }).nth(2).click();
      await expect(this.page.locator("aside")).toHaveClass("sb-sidebar");
      // Expand the sidebar again
      await this.page.locator('div').filter({ hasText: '折りたたむ' }).nth(2).click();
      await expect(this.page.locator("aside")).toHaveClass("sb-sidebar sb-sidebar-sm");
    } catch (e) {
      // If the sidebar is not in the expected initial state, expand it
      await this.page.locator('div').filter({ hasText: '折りたたむ' }).nth(2).click();
      await expect(this.page.locator("aside")).toHaveClass("sb-sidebar sb-sidebar-sm");
    }
  }
}

module.exports = { NavigatePage };
