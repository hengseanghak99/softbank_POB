const { test, expect } = require("@playwright/test");
import { credenttials } from "./credenttials";
const {user} = credenttials;

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
    await page.waitForTimeout(5000);
    await page.getByText('防災 太郎').click();
    await page.getByText('ログアウト', { exact: true }).click();
    await page.waitForTimeout(5000);
    await page.getByRole('button', { name: 'はい' }).click();
    await page.waitForTimeout(5000);
    await page.getByText('ログイン').first().click();
    await page.waitForTimeout(5000);
    await expect(page).toHaveURL("https://sb-disaster-admin-pob.tagcast.group/login");
  };

  export const login_logout_action = { 
    login_success,
    logout_success
  }