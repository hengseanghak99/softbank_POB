const { test, expect } = require("@playwright/test");
const { log } = require("console");

const user = {
  tenant_id: "takeshiba_001",
  email: "admin@sb-disaster-admin-pob.tagcast.group",
  password: "Abc12345678901",
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

test("validate login text", async ({ page }) => {
  await page.goto("https://sb-disaster-admin-pob.tagcast.group/login");
  await expect(page.getByText("ログイン").first()).toBeVisible();
  await expect(page.getByText("テナントID")).toBeVisible();
  await expect(
    page.getByPlaceholder("テナントIDを入力してください")
  ).toBeVisible();
  await expect(page.getByText("メールアドレス")).toBeVisible();
  await expect(
    page.getByPlaceholder("登録したメールアドレスを入力してください")
  ).toBeVisible();
  await expect(page.getByText("パスワード")).toBeVisible();
  await expect(page.getByPlaceholder("パスワードの入力")).toBeVisible();
  await expect(
    page.locator("div").filter({ hasText: "ログイン" }).nth(2)
  ).toBeVisible();
});

test("login successful", async ({ page }) => {
  await login_success(page);
  await expect(page).toHaveURL(
    "https://sb-disaster-admin-pob.tagcast.group/message-delivery"
  );
  await expect(
    page.getByRole("main").getByText("メッセージ配信", { exact: true })
  ).toBeVisible();
});

test("logout successufl", async ({page}) =>{
    await logout_success(page);
});
