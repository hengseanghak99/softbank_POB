const { test, expect } = require("@playwright/test");
import { credenttials } from "./credenttials";
import { login_logout_action } from "./login_logout_action";
const { user, reset_password, incorrectUser } = credenttials;
const { login_success, logout_success } = login_logout_action;

test("validate login [ Check Text UI ]", async ({ page }) => {
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

test("validate login [ Error message ]", async ({ page }) => {
  //user focus out of textbox
  await page.goto("https://sb-disaster-admin-pob.tagcast.group/login");
  await page.getByPlaceholder("テナントIDを入力してください").click();
  await page
    .getByPlaceholder("登録したメールアドレスを入力してください")
    .click();
  await page.getByPlaceholder("パスワードの入力").click();
  await page.getByRole("main").click();
  
  await expect(page.getByText('テナントIDを入力してください。')).toBeVisible();
  await expect(page.getByText('メールアドレスを入力してください')).toBeVisible();
  await expect(page.getByText('パスワードを入力してください')).toBeVisible();

  //user input wrong email format
  //     ・Tenant ID, mail or password is incorrect.​
  // ・Tenant ID is not existed​
  // ・Email address is not existed​
  // ・Email is not belong to tenant​
  // ・Email address or password is not correct.​
  await page.getByPlaceholder("テナントIDを入力してください").click();
  await page
    .getByPlaceholder("テナントIDを入力してください")
    .fill(incorrectUser.tenant_id);
  await page
    .getByPlaceholder("登録したメールアドレスを入力してください")
    .click();
  await page
    .getByPlaceholder("登録したメールアドレスを入力してください")
    .fill(incorrectUser.email);
  await page.getByPlaceholder("パスワードの入力").click();
  await page.getByPlaceholder("パスワードの入力").fill(incorrectUser.password);
  await page.getByRole("button", { name: "ログイン" }).click();
  await expect(
    page.locator("div").filter({
      hasText:
        /^入力項目に誤りがあります。ご確認いただき、正しく入力してください。$/,
    })
  ).toBeVisible();
});

test("login successful [ Action ]", async ({ page }) => {
  await login_success(page);
  await expect(page).toHaveURL(
    "https://sb-disaster-admin-pob.tagcast.group/message-delivery"
  );
  await expect(
    page.getByRole("main").getByText("メッセージ配信", { exact: true })
  ).toBeVisible();
});

test("logout successful [ Action ]", async ({ page }) => {
  await logout_success(page);
});

test("validate change password pop-up [Check Text UI]", async ({ page }) => {
  await login_success(page);
  await page.getByText("防災 太郎").click();
  await page.getByRole("banner").getByText("パスワード変更").click();
  await expect(
    page.getByRole("heading", { name: "パスワード変更" })
  ).toBeVisible();
  await expect(
    page.getByText("現在のパスワード", { exact: true })
  ).toBeVisible();
  await expect(page.getByPlaceholder("現在のパスワードの入力")).toBeVisible();
  await expect(
    page.getByText("新しいパスワード", { exact: true })
  ).toBeVisible();
  await expect(page.getByPlaceholder("新しいパスワードの入力")).toBeVisible();
  await expect(page.getByText("パスワード条件")).toBeVisible();
  await expect(page.getByText("文字以上、99文字以下")).toBeVisible();
  await expect(
    page.getByText("英大文字、英小文字、半角数字を含む")
  ).toBeVisible();
  await expect(page.getByText("記号とスペースは使用しない")).toBeVisible();
  await expect(page.getByText("新しいパスワードの再入力")).toBeVisible();
  await expect(page.getByPlaceholder("新しいパスワードの再入力")).toBeVisible();
});

test("validate change password pop-up [ Error message ]", async ({ page }) => {
  await login_success(page);
  // If user focus out off fileds
  await page.getByText("防災 太郎").click();
  await page.getByRole("banner").getByText("パスワード変更").click();
  await page.getByPlaceholder("現在のパスワードの入力").click();
  await page.getByPlaceholder("新しいパスワードの入力").click();
  await page.getByPlaceholder("新しいパスワードの再入力").click();
  await page
    .locator("#app div")
    .filter({
      hasText:
        "現在のパスワード現在のパスワードを入力してください。新しいパスワード以下のパスワード条件を満たす必要があります。パスワード条件14文字以上、99",
    })
    .nth(3)
    .click();
  //current password
  await expect(
    page.getByText("現在のパスワードを入力してください。")
  ).toBeVisible();
  //new and confirm password
  await expect(
    page.getByText("以下のパスワード条件を満たす必要があります。")
  ).toBeVisible();
  await expect(
    page.getByText("パスワードを入力してください。", { exact: true })
  ).toBeVisible();
  await page.getByRole("button", { name: "キャンセル" }).click();

  // If user less than 14 and over 99 character
  const saveButton = await page.getByRole("button", { name: " 変更 " }).first();
  await page.getByText("防災 太郎").click();
  await page.getByRole("banner").getByText("パスワード変更").click();
  await page.getByPlaceholder("現在のパスワードの入力").click();
  await page.getByPlaceholder("現在のパスワードの入力").fill(user.password);
  await page.getByPlaceholder("新しいパスワードの入力").click();
  await page.getByPlaceholder("新しいパスワードの入力").fill("1231123Hak");
  await page.getByPlaceholder("新しいパスワードの再入力").click();
  await page.getByPlaceholder("新しいパスワードの再入力").fill("1231123Hak");
  const isSaveButtonDisabledLessOver = await saveButton.isDisabled();
  if (isSaveButtonDisabledLessOver) {
    await page.getByRole("button", { name: "キャンセル" }).click();
  } else {
    console.log("Save button is enabled. Skipping cancellation.");
  }

  // If user input symbol
  await page.getByText("防災 太郎").click();
  await page.getByRole("banner").getByText("パスワード変更").click();
  await page.getByPlaceholder("現在のパスワードの入力").click();
  await page.getByPlaceholder("現在のパスワードの入力").fill(user.password);
  await page.getByPlaceholder("新しいパスワードの入力").click();
  await page.getByPlaceholder("新しいパスワードの入力").fill("123112@Hak");
  await page.getByPlaceholder("新しいパスワードの再入力").click();
  await page.getByPlaceholder("新しいパスワードの再入力").fill("123112@Hak");
  const isSaveButtonDisabled_input_symbol = await saveButton.isDisabled();
  if (isSaveButtonDisabled_input_symbol) {
    await page.getByRole("button", { name: "キャンセル" }).click();
  } else {
    console.log("Save button is enabled. Skipping cancellation.");
  }

  // If user input space
  await page.getByText("防災 太郎").click();
  await page.getByRole("banner").getByText("パスワード変更").click();
  await page.getByPlaceholder("現在のパスワードの入力").click();
  await page.getByPlaceholder("現在のパスワードの入力").fill(user.password);
  await page.getByPlaceholder("新しいパスワードの入力").click();
  await page.getByPlaceholder("新しいパスワードの入力").fill("123112 Hak");
  await page.getByPlaceholder("新しいパスワードの再入力").click();
  await page.getByPlaceholder("新しいパスワードの再入力").fill("123112 Hak");
  const isSaveButtonDisabled_input_space = await saveButton.isDisabled();
  if (isSaveButtonDisabled_input_space) {
    await page.getByRole("button", { name: "キャンセル" }).click();
  } else {
    console.log("Save button is enabled. Skipping cancellation.");
  }
  // If user input no match between new password and confirm password
await page.getByText("防災 太郎").click();
await page.getByRole("banner").getByText("パスワード変更").click();
await page.getByPlaceholder("現在のパスワードの入力").click();
await page.getByPlaceholder("現在のパスワードの入力").fill(user.password);
await page.getByPlaceholder("新しいパスワードの入力").click();
await page.getByPlaceholder("新しいパスワードの入力").fill("12311asHak");
await page.getByPlaceholder("新しいパスワードの再入力").click();
await page.getByPlaceholder("新しいパスワードの再入力").fill("12311asdfHak");
await expect(page.getByText('パスワードが一致する必要があります。')).toBeVisible();
});

test("validate change password pop-up [ success ]", async ({ page }) => {
  await login_success(page);
  await page.getByText("防災 太郎").click();
  await page.getByRole("banner").getByText("パスワード変更").click();
  await page
    .getByPlaceholder("現在のパスワードの入力")
    .fill(reset_password.currentPassword);
  await page
    .getByPlaceholder("新しいパスワードの入力")
    .fill(reset_password.newPassword);
  await page
    .getByPlaceholder("新しいパスワードの再入力")
    .fill(reset_password.newPassword);
  await page.getByRole("button", { name: "変更" }).click();
  await expect(
    page.getByRole("main").getByText("メッセージ配信", { exact: true })
  ).toBeVisible();

  //logout
  await page.waitForTimeout(5000);
  await page.getByText('防災 太郎').click();
  await page.getByText('ログアウト', { exact: true }).click();
  await page.getByRole('button', { name: 'はい' }).click();
  await page.getByText('ログイン').first().click();
  await expect(page).toHaveURL("https://sb-disaster-admin-pob.tagcast.group/login");

  //validate by login new password
  await page
    .getByPlaceholder("テナントIDを入力してください")
    .fill(user.tenant_id);
  await page
    .getByPlaceholder("登録したメールアドレスを入力してください")
    .fill(user.email);
  await page
    .getByPlaceholder("パスワードの入力")
    .fill(reset_password.newPassword);
  await page.getByRole("button", { name: "ログイン" }).click();
  //set back to current password
  await page.getByText("防災 太郎").click();
  await page.getByRole("banner").getByText("パスワード変更").click();
  await page
    .getByPlaceholder("現在のパスワードの入力")
    .fill(reset_password.newPassword);
  await page
    .getByPlaceholder("新しいパスワードの入力")
    .fill(reset_password.currentPassword);
  await page
    .getByPlaceholder("新しいパスワードの再入力")
    .fill(reset_password.currentPassword);
    await page.waitForTimeout(5000);
  await page.getByRole("button", { name: "変更" }).click();
  await page.waitForTimeout(5000);
  await expect(
    page.getByRole("main").getByText("メッセージ配信", { exact: true })
  ).toBeVisible();
});
