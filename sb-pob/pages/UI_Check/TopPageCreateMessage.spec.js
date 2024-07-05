const { test, expect } = require("@playwright/test");
const { login_success } = require("../../component/login_logout_actions");
const { validateTextUI, f14, f16, f22, f12, f34, bold700, bold600, bold400, f28 , hexToRgb} = require("../../utils/style_validate.js");


const primary_color = '#000000';
const secondary_color = '#666666';
const info_color = '#0066FF';
const warning_color = '#E02D2D';
const activeButton_color = '#FFFFFF';
const inactiveButton_color = '#CCCCCC';

test.beforeEach(async({page})=>{
  await login_success(page);
  await page.getByRole("link", { name: "メッセージ作成" }).click();
})

test.describe("Create Message [ Check fontsize, fontweight, color ]", () => {
  //this case still has some issue
  test("Create Message [Check all texts]", async({page}) =>{
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
  })

  test("Create Message [Check error text messages]",async({page}) => {
  await page.getByPlaceholder('例）避難指示メッセージ').click();
  await page.getByPlaceholder('例：〇〇ため、警戒レベル3高齢者等避難を発令しました。').click();
  await page.getByPlaceholder('例）避難指示メッセージ').click();
  //require text
  await validateTextUI(page.getByText('タイトルを入力してください。'),f12,bold400,warning_color);
  await validateTextUI(page.getByText('メッセージを入力してください。'),f12,bold400,warning_color);
  // Boundary Testing
  await page.getByPlaceholder('例）避難指示メッセージ').fill("Google LLC is an American multinational corporation and technology");
  await validateTextUI(page.getByText('タイトルは30文字以内で入力してください。'),f12,bold400,warning_color);
  await page.getByPlaceholder('例：〇〇ため、警戒レベル3高齢者等避難を発令しました。').fill('Google LLC (/ˈɡuːɡəl/ ⓘ, GOO-ghəl) is an American multinational corporation and technology company focusing on online advertising, search engine technology, cloud computing, computer software, quantum computing, e-commerce, consumer electronics, and artificial intelligence (AI).[9] It has been referred to as "the most powerful company in the world"[10] and is one of the worlds most valuable brands due to its market dominance, data collection, and technological advantages in the field of AI.[11][12][13] Googles parent company, Alphabet Inc. is one of the five Big Tech companies, alongside Amazon, Apple, Meta, and Microsoft.');
  await validateTextUI(page.getByText('メッセージは500文字以内で入力してください。'),f12,bold400,warning_color);
  })
  

});

