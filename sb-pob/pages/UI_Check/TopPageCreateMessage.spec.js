const { test, expect } = require("@playwright/test");
const { login_success } = require("../../component/login_logout_actions");
const { validateTextUI, f14, f16, f22, f12, f34, bold700, bold600, bold400, f28 , hexToRgb} = require("../../utils/style_validate.js");


const primary_color = '#000000';
const secondary_color = '#666666';
const info_color = '#0066FF';
const warning_color = '#E02D2D';
const activeButton_color = '#FFFFFF';
const inactiveButton_color = '#CCCCCC';

test("Create Message [ Check Text UI]", async ({ page }) => {
  await login_success(page);
  await page.getByRole("link", { name: "メッセージ作成" }).click();
  await validateTextUI(page.getByLabel("breadcrumb").getByText("メッセージ作成"),f14,bold400,primary_color);
  await validateTextUI(page.locator("div").filter({ hasText: /^メッセージ作成$/ }),f34,bold700,primary_color);
  await validateTextUI(page.getByText("配信設定"), f22, bold600,primary_color);
  await validateTextUI(page.getByText("配信タイトル"), f16, bold700,primary_color)
  await validateTextUI(page.getByText("必須").first(), f12, bold400,warning_color);
  await validateTextUI(page.getByPlaceholder("例）避難指示メッセージ"),f16,bold400,primary_color);
  await validateTextUI(page.getByText("/30文字"), f12, bold400,"#212529");
  await validateTextUI(page.getByText("※タイトルは管理画面のみで使用され、LINE"),f14,bold400,"#212529");
  await validateTextUI(page.getByText("配信タイミング"), f16, bold700,primary_color);
  await validateTextUI(page.getByText("必須").nth(1), f12, bold400,warning_color);
  await validateTextUI(page.getByText("今すぐ配信"), f16, bold400,"#212529");
  await validateTextUI(page.getByText("指定した日時に自動配信"), f16, bold400,"#212529");
  await validateTextUI(page.getByText("トリガー条件で自動配信"), f16, bold400,"#212529");
  await validateTextUI(page.getByText("2.メッセージ作成"), f22, bold600,primary_color);
  await validateTextUI(page.getByText("画像", { exact: true }), f16, bold700,primary_color);
  await validateTextUI(page.getByText("任意").first(), f12, bold400,secondary_color);
  await validateTextUI(page.getByRole("button", { name: "テンプレートから選択" }),f16,bold400,primary_color);
  await validateTextUI(page.getByText("メッセージ", { exact: true }),f16,bold700,primary_color);
  await validateTextUI(page.getByText("必須").nth(2), f12, bold400,warning_color);
  await validateTextUI(page.getByPlaceholder("例：〇〇ため、警戒レベル3高齢者等避難を発令しました。"),f16,bold400,primary_color);
  await validateTextUI(page.getByText("/500文字"), f12, bold400,"#212529");
  await validateTextUI(page.getByText("アクションリンク", { exact: true }),f16,bold700,primary_color);
  await validateTextUI(page.getByText("メッセージに災害情報や防災マップなどのページへ遷移するアクションリンクを最大４つ設定できます。"),f16, bold400,primary_color);
  await validateTextUI(page.getByText("上から順にクリックされる可能性があるため、優先度の高いリンクを上位に設定しましょう。"),f16,bold400,primary_color);
  await validateTextUI(page.getByPlaceholder("アクションリンク1"),f16,bold400,"#212529")
  await validateTextUI(page.locator("div").filter({ hasText: /^1選択$/ }).getByRole("button"),f16,bold400,info_color)
  await validateTextUI(page.getByPlaceholder("アクションリンク2"),f16,bold400,"#212529")
  await validateTextUI(page.locator("div").filter({ hasText: /^2選択$/ }).getByRole("button"),f16,bold400,info_color)
  await validateTextUI(page.getByPlaceholder("アクションリンク3"),f16,bold400,"#212529")
  await validateTextUI(page.locator("div").filter({ hasText: /^3選択$/ }).getByRole("button"),f16,bold400,info_color)
  await validateTextUI(page.getByPlaceholder("アクションリンク4"),f16,bold400,"#212529")
  await validateTextUI(page.locator("div").filter({ hasText: /^4選択$/ }).getByRole("button"),f16,bold400,info_color)
  await validateTextUI(page.getByRole("button", { name: "配信", exact: true }),f16,bold400,activeButton_color)
  await validateTextUI(page.getByRole("button", { name: "下書き保存", exact: true }),f16,bold400,inactiveButton_color)
  await validateTextUI(page.getByRole("button", { name: "テスト配信", exact: true }),f16,bold400,inactiveButton_color)

    // // Click the button to open the pop-up
    // await page.locator("div").filter({ hasText: /^1選択$/ }).getByRole("button").click();
    // await validateTextUI(page.getByRole('heading', { name: 'アクションリンクを選択' }),f28,bold1);
    // await validateTextUI(
    //   page.getByText("防災情報", { exact: true }),
    //   f16,
    //   bold1
    // );
    // await validateTextUI(page.getByText("港区防災情報"), f14, normal);
    // await validateTextUI(
    //   page
    //     .locator("div")
    //     .filter({
    //       hasText:
    //         /^港区防災情報本管理画面の「LINEコンテンツ設定」メニューから編集できます。$/,
    //     })
    //     .first(),
    //   f16,
    //   normal
    // );
    // await validateTextUI(page.getByText("警報・注意報"), f14, normal);
    // await validateTextUI(
    //   page
    //     .locator("div")
    //     .filter({
    //       hasText:
    //         /^警報・注意報本管理画面の「LINEコンテンツ設定」メニューから編集できます。$/,
    //     })
    //     .first(),
    //   f16,
    //   normal
    // );
    // await validateTextUI(page.getByText("気象・地震情報"), f16, bold1);
    // await validateTextUI(page.getByText("天気予報を確認する"), f14, normal);
    // await validateTextUI(
    //   page.getByText("Yahoo JAPANの天気予報が表示されたページ"),
    //   f16,
    //   normal
    // );
    // await validateTextUI(
    //     page.getByText('雨雲レーダーを確認する'),
    //   f14,
    //   normal
    // );
    // await validateTextUI(
    //   page.getByText("Yahoo JAPANの雨雲レーダーが表示されたページ"),
    //   f16,
    //   normal
    // );
    // await validateTextUI(page.getByText("台風情報を確認する"), f14, normal);
    // await validateTextUI(
    //   page.getByText("気象庁の台風情報が表示されたページ"),
    //   f16,
    //   normal
    // );

    // await validateTextUI(page.getByText("地震情報を確認する"), f14, normal);
    // await validateTextUI(
    //   page.getByText("気象庁の地震情報が表示されたページ"),
    //   f16,
    //   normal
    // );
    // await validateTextUI(page.getByText("津波情報を確認する"), f14, normal);
    // await validateTextUI(
    //   page.getByText("気象庁の津波情報が表示されたページ"),
    //   f16,
    //   normal
    // );

    // await validateTextUI(
    //   page.getByText("防災マップ", { exact: true }),
    //   f16,
    //   bold1
    // );
    // await validateTextUI(page.getByText("防災マップを確認する"), f14, normal);
    // await validateTextUI(
    //   page.getByText(
    //     "ハザードマップ、避難施設、混雑情報、河川水位が全て表示された防災マップ"
    //   ),
    //   f16,
    //   normal
    // );
    // await validateTextUI(page.getByText("避難先を確認する"), f14, normal);
    // await validateTextUI(
    //   page.getByText(
    //     "避難施設（避難所・避難場所・一時滞在施設）が表示された防災マップ"
    //   ),
    //   f16,
    //   normal
    // );
    // await validateTextUI(
    //   page.getByText("ハザードマップを確認する"),
    //   f14,
    //   normal
    // );
    // await validateTextUI(
    //   page.getByText("ハザードマップが表示された防災マップ"),
    //   f16,
    //   normal
    // );
    // await validateTextUI(page.getByText("混雑を確認する"), f14, normal);
    // await validateTextUI(
    //   page.getByText("混雑度が表示された防災マップ"),
    //   f16,
    //   normal
    // );

    // await validateTextUI(
    //   page.getByText("電車運行情報", { exact: true }),
    //   f16,
    //   bold1
    // );
    // await validateTextUI(
    //   page.getByText("周辺の電車運行情報を確認する"),
    //   f14,
    //   normal
    // );
    // await validateTextUI(
    //   page.getByText("電車の運行情報が確認できるページ"),
    //   f16,
    //   normal
    // );

    // await validateTextUI(page.getByText("Twitter投稿情報"), f16, bold1);
    // await validateTextUI(
    //   page.getByText("周辺のSNS災害投稿を確認する"),
    //   f14,
    //   normal
    // );
    // await validateTextUI(
    //   page.getByText(
    //     "SNSで投稿された災害に関連する投稿が一覧で確認できるページ"
    //   ),
    //   f16,
    //   normal
    // );
});

