const { test, expect } = require("@playwright/test");
import { credenttials } from "./credenttials";
import { login_logout_action } from "./login_logout_action";
const {user} = credenttials;
const {login_success} = login_logout_action;



test("validate to have url [ Privacy and policy ]", async ({ page }) => {
    await login_success(page);
    const newTabPromise = page.waitForEvent("popup");
    await page.getByText('防災 太郎').click();
    await page.getByRole('link', { name: 'プライバシーポリシー' }).click();
    const newTab = await newTabPromise;
    await expect(newTab).toHaveURL("https://sb-disaster-admin-pob.tagcast.group/legal/privacy-policy");
    await newTab.close();

  });

  test("validate to have url [ Term ]", async ({ page }) => {
   await login_success(page);

    // Get a reference to the promise that resolves when a new popup/tab is opened
    const newTabPromise = page.waitForEvent("popup");
    await page.getByText('防災 太郎').click();
    await page.getByRole('link', { name: '利用規約' }).click();
    const newTab = await newTabPromise;
    await expect(newTab).toHaveURL("https://sb-disaster-admin-pob.tagcast.group/legal/term");
    await newTab.close();
    await page.waitForTimeout(5000);
    
  });
  
  