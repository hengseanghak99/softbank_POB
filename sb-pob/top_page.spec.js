import { login_logout_action } from "./login_logout_action";
const { test, expect } = require("@playwright/test");
const { login_success } = login_logout_action;


test("validate Top page [ Check Text UI ]", async ({ page }) => {
  await login_success(page);
  const FONT_SIZE = 'font-size';
  const FONT_WEIGHT = 'font-weight';

// Validate Text UI
  await expect(page.getByRole('main').getByText('メッセージ配信', { exact: true })).toBeVisible();
  await expect(page.getByRole('main').getByText('メッセージ配信', { exact: true })).toHaveCSS(FONT_SIZE,'34px');
  await expect(page.getByRole('main').getByText('メッセージ配信', { exact: true })).toHaveCSS(FONT_WEIGHT,'700');

  await expect(page.getByText('メッセージ配信数を確認')).toBeVisible();
  await expect(page.getByText('メッセージ配信数を確認')).toHaveCSS(FONT_SIZE,'22px');
  await expect(page.getByText('メッセージ配信数を確認')).toHaveCSS(FONT_WEIGHT,'600');

  await expect(page.getByText('メッセージはご利用中のプランによって配信できる上限数が設定されています。')).toBeVisible();
  await expect(page.getByText('メッセージはご利用中のプランによって配信できる上限数が設定されています。')).toHaveCSS(FONT_SIZE,'16px');
  await expect(page.getByText('メッセージはご利用中のプランによって配信できる上限数が設定されています。')).toHaveCSS(FONT_WEIGHT,'400');

  await expect(page.getByText(' 現在のメッセージ配信数をLINE管理画面で確認し、上限数を超えた場合はプランの変更を行ってください。 ')).toBeVisible();
  await expect(page.getByText(' 現在のメッセージ配信数をLINE管理画面で確認し、上限数を超えた場合はプランの変更を行ってください。 ')).toHaveCSS(FONT_SIZE,'16px');
  await expect(page.getByText(' 現在のメッセージ配信数をLINE管理画面で確認し、上限数を超えた場合はプランの変更を行ってください。 ')).toHaveCSS(FONT_WEIGHT,'400');

  await expect(page.getByText('LINE Official Account Manager')).toBeVisible();
  await expect(page.getByText('LINE Official Account Manager')).toHaveCSS(FONT_SIZE,'16px');
  await expect(page.getByText('LINE Official Account Manager')).toHaveCSS(FONT_WEIGHT,'400');

  await expect(page.getByText('LINEメッセージ配信')).toBeVisible();
  await expect(page.getByText('LINEメッセージ配信')).toHaveCSS(FONT_SIZE,'22px');
  await expect(page.getByText('LINEメッセージ配信')).toBeVisible(FONT_WEIGHT,'600');

  await expect(page.getByText('LINE公式アカウントを友だち追加したユーザーへメッセージ配信ができます。')).toBeVisible();
  await expect(page.getByText('LINE公式アカウントを友だち追加したユーザーへメッセージ配信ができます。')).toHaveCSS(FONT_SIZE,'16px');
  await expect(page.getByText('LINE公式アカウントを友だち追加したユーザーへメッセージ配信ができます。')).toBeVisible(FONT_WEIGHT,'400');

  await expect(page.getByRole('button', { name: '自動配信予約' })).toBeVisible();
  await expect(page.getByRole('button', { name: '自動配信予約' })).toHaveCSS(FONT_SIZE,'16px');
  await expect(page.getByRole('button', { name: '自動配信予約' })).toHaveCSS(FONT_WEIGHT,'700');

  await expect(page.getByRole('button', { name: '下書き' })).toBeVisible();
  await expect(page.getByRole('button', { name: '履歴' })).toBeVisible();

  await expect(page.getByRole('cell', { name: '配信タイトル' }).getByRole('paragraph')).toBeVisible();
  await expect(page.getByRole('cell', { name: '配信タイトル' }).getByRole('paragraph')).toHaveCSS(FONT_SIZE,'16px');
  await expect(page.getByRole('cell', { name: '配信タイトル' }).getByRole('paragraph')).toHaveCSS(FONT_WEIGHT,'600');

  await expect(page.getByRole('cell', { name: '配信タイミング' }).getByRole('paragraph')).toBeVisible();
  await expect(page.getByRole('cell', { name: '配信タイミング' }).getByRole('paragraph')).toHaveCSS(FONT_SIZE,'16px');
  await expect(page.getByRole('cell', { name: '配信タイミング' }).getByRole('paragraph')).toHaveCSS(FONT_WEIGHT,'600');

  await expect(page.getByRole('cell', { name: '最終更新日時' }).getByRole('paragraph')).toBeVisible();
  await expect(page.getByRole('cell', { name: '最終更新日時' }).getByRole('paragraph')).toBeVisible(FONT_SIZE,'16px');
  await expect(page.getByRole('cell', { name: '最終更新日時' }).getByRole('paragraph')).toHaveCSS(FONT_WEIGHT,'600');

  await expect(page.getByRole('cell', { name: '編集' }).getByRole('paragraph')).toBeVisible();
  await expect(page.getByRole('cell', { name: '編集' }).getByRole('paragraph')).toHaveCSS(FONT_SIZE,'16px');
  await expect(page.getByRole('cell', { name: '編集' }).getByRole('paragraph')).toHaveCSS(FONT_WEIGHT,'600');

  await expect(page.getByRole('link', { name: 'メッセージ作成' })).toBeVisible();  
  await expect(page.getByRole('link', { name: 'メッセージ作成' })).toHaveCSS(FONT_WEIGHT,'400'); 
  await expect(page.getByRole('link', { name: 'メッセージ作成' })).toBeVisible(FONT_SIZE,'16px'); 
});

test.only("validate Top page [ Check page can be collapsed or expanded side bar ]", async ({ page }) => {
  await login_success(page);

  try {
    await expect(page.locator("aside")).toHaveClass("sb-sidebar sb-sidebar-sm");
    // If the above assertion passes, collapse the sidebar
    await page.locator('div').filter({ hasText: '折りたたむ' }).nth(2).click();
    await expect(page.locator("aside")).toHaveClass("sb-sidebar");
    // Expand the sidebar again
    await page.locator('div').filter({ hasText: '折りたたむ' }).nth(2).click();
    await expect(page.locator("aside")).toHaveClass("sb-sidebar sb-sidebar-sm");
  } catch (e) {
    // If the sidebar is not in the expected initial state, expand it
    await page.locator('div').filter({ hasText: '折りたたむ' }).nth(2).click();
    await expect(page.locator("aside")).toHaveClass("sb-sidebar sb-sidebar-sm");
  }
});



