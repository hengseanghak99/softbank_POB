const { login_url } = require("../../utils/credentials");
const { login_success } = require("../../component/login_logout_actions");
const { validateTextUI, f14, f16, f22, f12, f34, bold700, bold600, bold400, f28 , hexToRgb} = require("../../utils/style_validate");
const { test, expect } = require("@playwright/test");

const primary_color = '#000000';
const secondary_color = '##666666';
const warning_color = '#E02D2D'

test.beforeEach(async ({ page }) => {
  await page.goto(login_url);
});

test.describe("validate login error message [ Check Text UI ]", () => {

  test("[User focus out of the fields ]", async ({ page }) => {
  
    await page.getByPlaceholder('テナントIDを入力してください').click();
    await page.getByPlaceholder('登録したメールアドレスを入力してください').click();
    await page.getByPlaceholder('パスワードの入力').click();
    await page.getByText('ログイン').first().click();

    await validateTextUI(page.getByText('テナントIDを入力してください。'),f12,bold400,warning_color)
    await validateTextUI(page.getByText('メールアドレスを入力してください'),f12,bold400,warning_color)
    await validateTextUI(page.getByText('パスワードを入力してください'),f12,bold400,warning_color)    
  });

  test.describe("[User input not incorrect email format]", () => {
   
    //Enter only text
    test("User input not incorrect email format [Only Text]", async ({ page }) => {
      //Enter only text
      await page.getByPlaceholder('登録したメールアドレスを入力してください').fill('helloworld');
      await validateTextUI(page.getByText('メールアドレスを正しく入力してください'),f12,bold400,warning_color)
      
    });

    test("User input not incorrect email format [Only Number]", async ({ page }) => {
      //Enter only number
      await page.getByPlaceholder('登録したメールアドレスを入力してください').fill('1234567890');
      await validateTextUI(page.getByText('メールアドレスを正しく入力してください'),f12,bold400,warning_color)
    });

    test("User input not incorrect email format [No symbol @ or .]", async ({ page }) => {
      //Enter no symbol email format
      await page.getByPlaceholder('登録したメールアドレスを入力してください').fill('!#$%^&*()_+,/\][');
      await validateTextUI(page.getByText('メールアドレスを正しく入力してください'),f12,bold400,warning_color)
    });  
  });
  test("[Account Credential is not correct]", async({page})=> {
  await page.getByPlaceholder('テナントIDを入力してください').fill('testing');
  await page.getByPlaceholder('登録したメールアドレスを入力してください').fill('helloworld@gmail.com');
  await page.getByPlaceholder('パスワードの入力').fill('1234567890');
  await page.getByRole('button', { name: 'ログイン' }).click();

  //validate css
 //   ・Tenant ID, mail or password is incorrect.
// ・Tenant ID is not existed
// ・Email address is not existed
// ・Email is not belong to tenant
// ・Email address or password is not correct.

  await expect(page.locator('div').filter({ hasText: /^入力項目に誤りがあります。ご確認いただき、正しく入力してください。$/ })).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^入力項目に誤りがあります。ご確認いただき、正しく入力してください。$/ }).locator('i')).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^入力項目に誤りがあります。ご確認いただき、正しく入力してください。$/ })).toHaveCSS('border', `1px solid ${hexToRgb(warning_color)}`);
  await expect(page.locator('div').filter({ hasText: /^入力項目に誤りがあります。ご確認いただき、正しく入力してください。$/ })).toHaveCSS('border-radius','4px');
  await validateTextUI(page.getByText('入力項目に誤りがあります。ご確認いただき、正しく入力してください。'),f16,bold700,warning_color);

  })
});

test("validate login [ Check Text UI ]", async ({ page }) => {
  await validateTextUI(page.getByText("ログイン").first(), f34, bold700, primary_color);
  await validateTextUI(page.getByText("テナントID"), f16, bold700, primary_color);
  await validateTextUI(page.getByPlaceholder("テナントIDを入力してください"),f16,bold400,secondary_color)
  await validateTextUI(page.getByText("メールアドレス"), f16, bold700, primary_color);
  await validateTextUI(page.getByPlaceholder("登録したメールアドレスを入力してください"),f16,bold400,secondary_color)
  await validateTextUI(page.getByText("パスワード"), f16, bold700, primary_color);
 // await validateTextUI(page.getByPlaceholder("パスワードの入力"),f16,bold400,secondary_color);
  await validateTextUI(page.locator("div").filter({ hasText: "ログイン" }).nth(2), f16, bold400, secondary_color);
});

test("validate change password pop-up [Check Text UI]", async ({ page }) => {
  await login_success(page);
  await page.getByText('h-seanghak').click();
  await page.getByRole('banner').getByText('パスワード変更').click();

  await validateTextUI(page.getByRole("heading", { name: "パスワード変更" }),f28,bold700,primary_color)
  await validateTextUI(page.getByText("現在のパスワード", { exact: true }),f16,bold700,primary_color)

  // await validateTextUI(page.getByPlaceholder("現在のパスワードの入力"),f20,bold400,primary_color)
  await validateTextUI(page.getByText("新しいパスワード", { exact: true }),f16,bold700,primary_color)

  // await validateTextUI(page.getByPlaceholder("新しいパスワードの入力"),f16,bold400,primary_color)
  await validateTextUI(page.getByText("パスワード条件"),f16,bold700,primary_color)
  await validateTextUI(page.getByText("文字以上、99文字以下"),f14,bold400,primary_color)
  await validateTextUI(page.getByText("英大文字、英小文字、半角数字を含む"),f14,bold400,primary_color)
  await validateTextUI(page.getByText("記号とスペースは使用しない"),f14,bold400,primary_color)

  await validateTextUI(page.getByText("新しいパスワードの再入力"),f16,bold700,primary_color)
  // await validateTextUI(page.getByPlaceholder("新しいパスワードの再入力"),f16,bold400,primary_color)

});

