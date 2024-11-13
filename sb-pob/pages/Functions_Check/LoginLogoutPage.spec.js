const { test, expect } = require("@playwright/test");
const {
  login_success,
  logout_success,
} = require("../../component/login_logout_actions");
const {
  user,
  reset_password,
  incorrectUser,
  login_url,
  toppage_url,
} = require("../../utils/credentials");

test("login successful[ TC_001 ]", async ({ page }) => {
  await login_success(page);
  await page.waitForTimeout(5000);
  await expect(page).toHaveURL(toppage_url);
  await expect(
    page.getByRole("main").getByText("メッセージ配信", { exact: true })
  ).toBeVisible();
  await logout_success(page);
});

test.describe("Login Fail", async ({ page }) => {
  test("login error message -> User focus out the fields and show error [TC_002]", async ({
    page,
  }) => {
    // User focus out of textbox
    await page.goto(login_url);
    await page.getByPlaceholder("テナントIDを入力してください").click();
    await page
      .getByPlaceholder("登録したメールアドレスを入力してください")
      .click();
    await page.getByPlaceholder("パスワードの入力").click();
    await page.getByRole("main").click();

    await expect(
      page.getByText("テナントIDを入力してください。")
    ).toBeVisible();
    await expect(
      page.getByText("メールアドレスを入力してください")
    ).toBeVisible();
    await expect(page.getByText("パスワードを入力してください")).toBeVisible();
  });
  test("login error message -> Error specifications [TC_003]", async ({
    page,
  }) => {
    // User input wrong email format
    await page
      .getByPlaceholder("テナントIDを入力してください")
      .fill(incorrectUser.tenant_id);
    await page
      .fill(incorrectUser.email);
    await page
      .getByPlaceholder("パスワードの入力")
      .fill(incorrectUser.password);
    await page.getByRole("button", { name: "ログイン" }).click();

    await expect(
      page.locator("div").filter({
        hasText: /^入力項目に誤りがあります。ご確認いただき、正しく入力してください。$/,
      })
    ).toBeVisible();
  });
});

test("logout successful [ Action ]", async ({ page }) => {
  await logout_success(page);
});

test.describe("validate change password pop-up [ Error message ]", () => {
  test("If user focus out of fields", async ({ page }) => {
    await login_success(page);
    await page.getByText("防災 太郎").click();
    await page.getByRole("banner").getByText("パスワード変更").click();
    await page.getByPlaceholder("現在のパスワードの入力").click();
    await page.getByPlaceholder("新しいパスワードの入力").click();
    await page.getByPlaceholder("新しいパスワードの再入力").click();
    await page.getByPlaceholder("現在のパスワードの入力").click();

    await expect(
      page.getByText("現在のパスワードを入力してください。")
    ).toBeVisible();
    await expect(
      page.getByText("以下のパスワード条件を満たす必要があります。")
    ).toBeVisible();
    await expect(
      page.getByText("パスワードを入力してください。", { exact: true })
    ).toBeVisible();
    await page.getByRole("button", { name: "キャンセル" }).click();
  });

  test("If user inputs less than 14 and more than 99 characters", async ({
    page,
  }) => {
    await login_success(page);
    await page.getByText("防災 太郎").click();
    await page.getByRole("banner").getByText("パスワード変更").click();
    await page.getByPlaceholder("現在のパスワードの入力").fill(user.password);
    await page.getByPlaceholder("新しいパスワードの入力").fill("1231123Hak");
    await page.getByPlaceholder("新しいパスワードの再入力").fill("1231123Hak");
    //check valid icon
    await expect(
      page
        .locator("li")
        .filter({ hasText: "文字以上、99文字以下" })
        .locator("i")
    ).toHaveClass("sb-icon sb-icon-xs sb-icon-check-invalid");
    await expect(
      page
        .locator("li")
        .filter({ hasText: "記号とスペースは使用しない" })
        .locator("i")
    ).toHaveClass("sb-icon sb-icon-xs sb-icon-check-valid");
    await expect(
      page
        .locator("li")
        .filter({ hasText: "英大文字、英小文字、半角数字を含む" })
        .locator("i")
    ).toHaveClass("sb-icon sb-icon-xs sb-icon-check-valid");

    const saveButton = await page.getByRole("button", { name: "変更" }).first();
    const isSaveButtonDisabledLessOver = await saveButton.isDisabled();
    if (isSaveButtonDisabledLessOver) {
      await page.getByRole("button", { name: "キャンセル" }).click();
    } else {
      console.log("Save button is enabled. Skipping cancellation.");
    }
  });

  test("If user inputs symbols", async ({ page }) => {
    await login_success(page);
    await page.getByText("防災 太郎").click();
    await page.getByRole("banner").getByText("パスワード変更").click();
    await page.getByPlaceholder("現在のパスワードの入力").fill(user.password);
    await page.getByPlaceholder("新しいパスワードの入力").fill("123112@Hak");
    await page.getByPlaceholder("新しいパスワードの再入力").fill("123112@Hak");

    await expect(
      page
        .locator("li")
        .filter({ hasText: "文字以上、99文字以下" })
        .locator("i")
    ).toHaveClass("sb-icon sb-icon-xs sb-icon-check-invalid");
    await expect(
      page
        .locator("li")
        .filter({ hasText: "記号とスペースは使用しない" })
        .locator("i")
    ).toHaveClass("sb-icon sb-icon-xs sb-icon-check-invalid");
    await expect(
      page
        .locator("li")
        .filter({ hasText: "英大文字、英小文字、半角数字を含む" })
        .locator("i")
    ).toHaveClass("sb-icon sb-icon-xs sb-icon-check-valid");

    const saveButton = await page.getByRole("button", { name: "変更" }).first();
    const isSaveButtonDisabledInputSymbol = await saveButton.isDisabled();
    if (isSaveButtonDisabledInputSymbol) {
      await page.getByRole("button", { name: "キャンセル" }).click();
    } else {
      console.log("Save button is enabled. Skipping cancellation.");
    }
  });

  test("If user inputs spaces", async ({ page }) => {
    await login_success(page);
    await page.getByText("防災 太郎").click();
    await page.getByRole("banner").getByText("パスワード変更").click();
    await page.getByPlaceholder("現在のパスワードの入力").fill(user.password);
    await page.getByPlaceholder("新しいパスワードの入力").fill("123112 Hak");
    await page.getByPlaceholder("新しいパスワードの再入力").fill("123112 Hak");

    await expect(
      page
        .locator("li")
        .filter({ hasText: "文字以上、99文字以下" })
        .locator("i")
    ).toHaveClass("sb-icon sb-icon-xs sb-icon-check-invalid");
    await expect(
      page
        .locator("li")
        .filter({ hasText: "記号とスペースは使用しない" })
        .locator("i")
    ).toHaveClass("sb-icon sb-icon-xs sb-icon-check-invalid");
    await expect(
      page
        .locator("li")
        .filter({ hasText: "英大文字、英小文字、半角数字を含む" })
        .locator("i")
    ).toHaveClass("sb-icon sb-icon-xs sb-icon-check-valid");

    const saveButton = await page.getByRole("button", { name: "変更" }).first();
    const isSaveButtonDisabledInputSpace = await saveButton.isDisabled();
    if (isSaveButtonDisabledInputSpace) {
      await page.getByRole("button", { name: "キャンセル" }).click();
    } else {
      console.log("Save button is enabled. Skipping cancellation.");
    }
  });

  test("If user inputs only lowercase letter", async ({ page }) => {
    await login_success(page);
    await page.getByText("防災 太郎").click();
    await page.getByRole("banner").getByText("パスワード変更").click();
    await page.getByPlaceholder("現在のパスワードの入力").fill(user.password);
    await page.getByPlaceholder("新しいパスワードの入力").fill("@hakhakhak");
    await page.getByPlaceholder("新しいパスワードの再入力").fill("@hakhakhak");

    await expect(
      page
        .locator("li")
        .filter({ hasText: "文字以上、99文字以下" })
        .locator("i")
    ).toHaveClass("sb-icon sb-icon-xs sb-icon-check-invalid");
    await expect(
      page
        .locator("li")
        .filter({ hasText: "記号とスペースは使用しない" })
        .locator("i")
    ).toHaveClass("sb-icon sb-icon-xs sb-icon-check-invalid");
    await expect(
      page
        .locator("li")
        .filter({ hasText: "英大文字、英小文字、半角数字を含む" })
        .locator("i")
    ).toHaveClass("sb-icon sb-icon-xs sb-icon-check-invalid");

    const saveButton = await page.getByRole("button", { name: "変更" }).first();
    const isSaveButtonDisabledInputSpace = await saveButton.isDisabled();
    if (isSaveButtonDisabledInputSpace) {
      await page.getByRole("button", { name: "キャンセル" }).click();
    } else {
      console.log("Save button is enabled. Skipping cancellation.");
    }
  });

  test("If user inputs non-matching passwords", async ({ page }) => {
    await login_success(page);
    await page.getByText("防災 太郎").click();
    await page.getByRole("banner").getByText("パスワード変更").click();
    await page.getByPlaceholder("現在のパスワードの入力").fill(user.password);
    await page.getByPlaceholder("新しいパスワードの入力").fill("12311asHak");
    await page
      .getByPlaceholder("新しいパスワードの再入力")
      .fill("12311asdfHak");
    await expect(
      page.getByText("パスワードが一致する必要があります。")
    ).toBeVisible();
  });
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

  // Logout
  await page.waitForTimeout(5000);
  await page.getByText("防災 太郎").click();
  await page.getByText("ログアウト", { exact: true }).click();
  await page.getByRole("button", { name: "はい" }).click();
  await page.getByText("ログイン").first().click();
  await expect(page).toHaveURL(login_url);

  // Validate by logging in with new password
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

  // Set back to current password
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
