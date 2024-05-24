const { test, expect } = require("@playwright/test");

const user = {
    tenant_id: "takeshiba_001",
    email: "admin@sb-disaster-admin-pob.tagcast.group",
    password: "Abc12345678901",
  };
  
  const reset_password = {
    currentPassword: "Abc12345678901",
    newPassword: "Abc123456789012",
  };
  
  const incorrectUser = {
    tenant_id: "takeshiba",
    email: "admin@sb-disaster-admin-pob",
    password: "Abc12345678",
  };

const login_success = async (page) => {
  await page.goto("https://sb-disaster-admin-pob.tagcast.group/login");
  await page.getByPlaceholder("テナントIDを入力してください").click();
  await page
    .getByPlaceholder("テナントIDを入力してください")
    .fill(user.tenant_id);
  await page
    .getByPlaceholder("登録したメールアドレスを入力してください")
    .click();
  await page
    .getByPlaceholder("登録したメールアドレスを入力してください")
    .fill(user.email);
  await page.getByPlaceholder("パスワードの入力").click();
  await page.getByPlaceholder("パスワードの入力").fill(user.password);
  await page.getByRole("button", { name: "ログイン" }).click();
};
const logout_success = async (page) => {
  await login_success(page);
  await page
    .locator("div")
    .filter({ hasText: /^防災 太郎$/ })
    .click();
  await page.getByText("ログアウト").click();
  await expect(page.getByText("ログイン").first()).toBeVisible();
};

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
    
  });
  
  