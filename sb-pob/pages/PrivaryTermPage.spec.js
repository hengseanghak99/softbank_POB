const { test, expect } = require("@playwright/test");
import { login_logout_action } from "../compoment/LoginLogoutActoins";
const { login_success } = login_logout_action;

test("validate to have url [ Privacy and policy ]", async ({ page }) => {
  await login_success(page);
  const newTabPromise = page.waitForEvent("popup");
  await page.getByText("防災 太郎").click();
  await page.getByRole("link", { name: "プライバシーポリシー" }).click();
  const newTab = await newTabPromise;
  await expect(newTab).toHaveURL(
    "https://sb-disaster-admin-pob.tagcast.group/legal/privacy-policy"
  );
  await newTab.close();
});

test("validate to have url [ Term ]", async ({ page }) => {
  await login_success(page);

  // Get a reference to the promise that resolves when a new popup/tab is opened
  const newTabPromise = page.waitForEvent("popup");
  await page.getByText("防災 太郎").click();
  await page.getByRole("link", { name: "利用規約" }).click();
  const newTab = await newTabPromise;
  await expect(newTab).toHaveURL(
    "https://sb-disaster-admin-pob.tagcast.group/legal/term"
  );
  await newTab.close();
  await page.waitForTimeout(5000);
});

test('validate to have url [ Maintennace ]', async ({ page }) => {
  await page.goto('https://sb-disaster-admin-pob.tagcast.group/maintenance');
  await expect(page.getByText('システムメンテナンスのお知らせ')).toBeVisible();
  await expect(page.getByText('現在、システム障害の影響で一部ページが正しく表示されない事象が発生しています。ただいま復旧作業を行なっております。大変ご迷惑をおかけし申し訳ありません。')).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^現在ログインできません。メンテナンス終了までお待ちください。$/ }).locator('i')).toBeVisible();
  await expect(page.getByText('現在ログインできません。')).toBeVisible();
  await expect(page.getByText('メンテナンス終了までお待ちください。')).toBeVisible();
  await expect(page.getByText('SERVICE LOGO')).toBeVisible();
});

