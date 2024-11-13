import { login} from "../../component/login_logout_actions";
import { validateTextUI, f14, f16, f22, f12, f34, bold700, bold600, bold400, f28 , hexToRgb} from "../../utils/style_validate";
const { test, expect } = require("@playwright/test");
const { login_success } = login;

const primary_color = '#000000';
const info_color = '#0066FF';
const linkButton_color = '#FFFFFF';

test("validate Top page [ Check Text UI ]", async ({ page }) => {
  await login_success(page);
// Validate Text UI
  await validateTextUI(page.getByRole('main').getByText('メッセージ配信', { exact: true }),f34,bold700,primary_color);
  await validateTextUI(page.getByText('メッセージ配信数を確認'),f22,bold600,primary_color);
  await validateTextUI(page.getByText('メッセージはご利用中のプランによって配信できる上限数が設定されています。'),f16,bold400,primary_color);
  await validateTextUI(page.getByText(' 現在のメッセージ配信数をLINE管理画面で確認し、上限数を超えた場合はプランの変更を行ってください。 '),f16,bold400,primary_color)
  await validateTextUI(page.getByText('LINE Official Account Manager'),f16,bold400,info_color)
  await validateTextUI(page.getByText('LINEメッセージ配信'),f22,bold600,primary_color)
  await validateTextUI(page.getByText('LINE公式アカウントを友だち追加したユーザーへメッセージ配信ができます。'),f16,bold400,primary_color)
  await validateTextUI(page.getByRole('button', { name: '自動配信予約' }),f16,bold700,primary_color)
  await validateTextUI(page.getByRole('button', { name: '下書き' }),f16,bold400,primary_color)
  await validateTextUI(page.getByRole('button', { name: '履歴' }),f16,bold400,primary_color)
  await validateTextUI(page.getByRole('cell', { name: '配信タイトル' }).getByRole('paragraph'),f16,bold600,primary_color)
  await validateTextUI(page.getByRole('cell', { name: '配信タイミング' }).getByRole('paragraph'),f16,bold600,primary_color)
  await validateTextUI(page.getByRole('cell', { name: '最終更新日時' }).getByRole('paragraph'),f16,bold600,primary_color)
  await validateTextUI(page.getByRole('cell', { name: '編集' }).getByRole('paragraph'),f16,bold600,primary_color)
  await  validateTextUI(page.getByRole('link', { name: 'メッセージ作成' }),f16,bold400,linkButton_color)
});
