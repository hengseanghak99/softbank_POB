// login_logout_actions.js
const { expect } = require("@playwright/test");
import { credentials } from "../utils/credentials";
const { user, login_url } = credentials;

// Flow to login successful
const login_success = async (page) => {
  await page.goto(login_url);
  await page.getByPlaceholder("テナントIDを入力してください").click();
  await page.getByPlaceholder("テナントIDを入力してください").fill(user.tenant_id);
  await page.getByPlaceholder("登録したメールアドレスを入力してください").click();
  await page.getByPlaceholder("登録したメールアドレスを入力してください").fill(user.email);
  await page.getByPlaceholder("パスワードの入力").click();
  await page.getByPlaceholder("パスワードの入力").fill(user.password);
  await page.getByRole("button", { name: "ログイン" }).click();
  await page.waitForTimeout(5000);
};

// Flow to logout successful
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
  await expect(page).toHaveURL(login_url);
};

export const login_logout_action = { 
  login_success,
  logout_success
};
