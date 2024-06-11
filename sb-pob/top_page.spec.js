
import { login_logout_action } from "./login_logout_action";
const { test, expect } = require("@playwright/test");
const { login_success } = login_logout_action;

test("validate Top page [ Check Text UI ]", async ({ page }) => {
  await login_success(page);
  const fs = 'font-size';
  const fw = 'font-weight';
// Validate Text UI
  await expect(page.getByRole('main').getByText('メッセージ配信', { exact: true })).toBeVisible();
  await expect(page.getByRole('main').getByText('メッセージ配信', { exact: true })).toHaveCSS(fs,'34px');
  await expect(page.getByRole('main').getByText('メッセージ配信', { exact: true })).toHaveCSS(fw,'700');

  await expect(page.getByText('メッセージ配信数を確認')).toBeVisible();
  await expect(page.getByText('メッセージ配信数を確認')).toHaveCSS(fs,'22px');
  await expect(page.getByText('メッセージ配信数を確認')).toHaveCSS(fw,'600');

  await expect(page.getByText('メッセージはご利用中のプランによって配信できる上限数が設定されています。')).toBeVisible();
  await expect(page.getByText('メッセージはご利用中のプランによって配信できる上限数が設定されています。')).toHaveCSS(fs,'16px');
  await expect(page.getByText('メッセージはご利用中のプランによって配信できる上限数が設定されています。')).toHaveCSS(fw,'400');

  await expect(page.getByText(' 現在のメッセージ配信数をLINE管理画面で確認し、上限数を超えた場合はプランの変更を行ってください。 ')).toBeVisible();
  await expect(page.getByText(' 現在のメッセージ配信数をLINE管理画面で確認し、上限数を超えた場合はプランの変更を行ってください。 ')).toHaveCSS(fs,'16px');
  await expect(page.getByText(' 現在のメッセージ配信数をLINE管理画面で確認し、上限数を超えた場合はプランの変更を行ってください。 ')).toHaveCSS(fw,'400');

  await expect(page.getByText('LINE Official Account Manager')).toBeVisible();
  await expect(page.getByText('LINE Official Account Manager')).toHaveCSS(fs,'16px');
  await expect(page.getByText('LINE Official Account Manager')).toHaveCSS(fw,'400');

  await expect(page.getByText('LINEメッセージ配信')).toBeVisible();
  await expect(page.getByText('LINEメッセージ配信')).toHaveCSS(fs,'22px');
  await expect(page.getByText('LINEメッセージ配信')).toBeVisible(fw,'600');

  await expect(page.getByText('LINE公式アカウントを友だち追加したユーザーへメッセージ配信ができます。')).toBeVisible();
  await expect(page.getByText('LINE公式アカウントを友だち追加したユーザーへメッセージ配信ができます。')).toHaveCSS(fs,'16px');
  await expect(page.getByText('LINE公式アカウントを友だち追加したユーザーへメッセージ配信ができます。')).toBeVisible(fw,'400');

  await expect(page.getByRole('button', { name: '自動配信予約' })).toBeVisible();
  await expect(page.getByRole('button', { name: '自動配信予約' })).toHaveCSS(fs,'16px');
  await expect(page.getByRole('button', { name: '自動配信予約' })).toHaveCSS(fw,'700');

  await expect(page.getByRole('button', { name: '下書き' })).toBeVisible();
  await expect(page.getByRole('button', { name: '履歴' })).toBeVisible();

  await expect(page.getByRole('cell', { name: '配信タイトル' }).getByRole('paragraph')).toBeVisible();
  await expect(page.getByRole('cell', { name: '配信タイトル' }).getByRole('paragraph')).toHaveCSS(fs,'16px');
  await expect(page.getByRole('cell', { name: '配信タイトル' }).getByRole('paragraph')).toHaveCSS(fw,'600');

  await expect(page.getByRole('cell', { name: '配信タイミング' }).getByRole('paragraph')).toBeVisible();
  await expect(page.getByRole('cell', { name: '配信タイミング' }).getByRole('paragraph')).toHaveCSS(fs,'16px');
  await expect(page.getByRole('cell', { name: '配信タイミング' }).getByRole('paragraph')).toHaveCSS(fw,'600');

  await expect(page.getByRole('cell', { name: '最終更新日時' }).getByRole('paragraph')).toBeVisible();
  await expect(page.getByRole('cell', { name: '最終更新日時' }).getByRole('paragraph')).toBeVisible(fs,'16px');
  await expect(page.getByRole('cell', { name: '最終更新日時' }).getByRole('paragraph')).toHaveCSS(fw,'600');

  await expect(page.getByRole('cell', { name: '編集' }).getByRole('paragraph')).toBeVisible();
  await expect(page.getByRole('cell', { name: '編集' }).getByRole('paragraph')).toHaveCSS(fs,'16px');
  await expect(page.getByRole('cell', { name: '編集' }).getByRole('paragraph')).toHaveCSS(fw,'600');

  await expect(page.getByRole('link', { name: 'メッセージ作成' })).toBeVisible();  
  await expect(page.getByRole('link', { name: 'メッセージ作成' })).toHaveCSS(fw,'400'); 
  await expect(page.getByRole('link', { name: 'メッセージ作成' })).toBeVisible(fs,'16px'); 
});



