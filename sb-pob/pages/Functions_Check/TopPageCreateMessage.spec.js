
const { login_success, logout_success } = require("../../component/login_logout_actions");
import { func } from "../../utils/style_validate";
const { test, expect } = require("@playwright/test");
const toppage_url ="https://sb-disaster-admin-pob.tagcast.group/message-deliveries";

test.beforeEach(async ({ page }) => {
  await login_success(page);
  await page.waitForTimeout(5000);
  await page.getByRole("link", { name: "メッセージ作成" }).click();
  await page.waitForTimeout(5000);
});

test("Create Message [ Check Error Message ]",async ({page}) => {
    //Check Error Message
    try {
        //User focus out require fields
        await page.getByPlaceholder('例）避難指示メッセージ').click();
        await page.getByPlaceholder('例：〇〇ため、警戒レベル3高齢者等避難を発令しました。').click();
        await page.getByPlaceholder('アクションリンク1').click();
        await expect(page.getByText('タイトルを入力してください。')).toBeVisible();
        await expect(page.getByText('メッセージを入力してください。')).toBeVisible();

        // User copy past text that more than 30 and 500 require fields
        await page.getByPlaceholder('例）避難指示メッセージ').click();
        await page.getByPlaceholder('例）避難指示メッセージ').fill('These assertions allow to test any conditions, but do not auto-retry. Most of the time, web pages show information asynchronously, and using non-retrying assertions can lead to a flaky test.');
        await expect(page.getByText('タイトルは30文字以内で入力してください。')).toBeVisible();
        await page.getByPlaceholder('例：〇〇ため、警戒レベル3高齢者等避難を発令しました。').click();
        await page.getByPlaceholder('例：〇〇ため、警戒レベル3高齢者等避難を発令しました。').fill('It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).');
        await expect(page.getByText('メッセージは500文字以内で入力してください。')).toBeVisible();
      }
     catch (error) {
        console.log(error)
    }
})

test("Create Message [ If user leave page, show alert pop-up ]", async ({page}) => {
  //check Pop-up message UI - breadcrum
  await page.getByLabel("breadcrumb").getByText("メッセージ作成").click();
  await page.getByText("ダッシュボード").click();
  await expect(
    page
      .locator("div")
      .filter({
        hasText:
          "メッセージが保存されていません。入力中の内容を破棄して戻りますか？いいえはい",
      })
      .nth(3)
  ).toBeVisible();
  await page.getByRole("button", { name: "いいえ" }).click();

  //check Pop-up message UI - back button at bottom page
  await page.getByRole("button", { name: "戻る" }).click();
  await expect(
    page
      .locator("div")
      .filter({
        hasText:
          "メッセージが保存されていません。入力中の内容を破棄して戻りますか？いいえはい",
      })
      .nth(3)
  ).toBeVisible();
  await page.getByRole("button", { name: "いいえ" }).click();

  //check Pop-up message UI - breadcrum -> expect to to top page
  await page.getByLabel("breadcrumb").getByText("メッセージ作成").click();
  await page.getByText("ダッシュボード").click();
  await page.waitForTimeout(5000);
  await expect(
    page
      .locator("div")
      .filter({
        hasText:
          "メッセージが保存されていません。入力中の内容を破棄して戻りますか？いいえはい",
      })
      .nth(3)
  ).toBeVisible();
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'はい' }).click();
  await page.waitForTimeout(2000);
  await expect(page).toHaveURL(toppage_url);
  await page.waitForTimeout(2000);


  //check Pop-up message UI - back at bottom page -> expect to to top page
  await page.getByRole('link', { name: 'メッセージ作成' }).click();
  await page.getByRole("button", { name: "戻る" }).click();
  await expect(
    page
      .getByRole("dialog")
      .locator("div")
      .filter({
        hasText:
          "メッセージが保存されていません。入力中の内容を破棄して戻りますか？いいえはい",
      })
      .nth(2)
  ).toBeVisible();
  await page.getByRole("button", { name: "はい" }).click();
  await expect(page).toHaveURL(toppage_url);
});

test("Create Message [Action Link: Pop-up]", async ({ page }) => {
  
     //Select Action Link [Action Link: Pop-up]
     try {
        await page.locator('div').filter({ hasText: /^1選択$/ }).getByRole('button').click();
        await page.locator('#disaster-info').check();
        await page.getByRole('button', { name: '決定' }).click();
        await page.locator('div').filter({ hasText: /^2選択$/ }).getByRole('button').click();
        await page.locator('#warning-advisory').check();
        await page.getByRole('button', { name: '決定' }).click();
        await page.locator('div').filter({ hasText: /^3選択$/ }).getByRole('button').click();
        await page.locator('#weather-forecast').check();
        await page.getByRole('button', { name: '決定' }).click();
        await page.locator('div').filter({ hasText: /^4選択$/ }).getByRole('button').click();
        await page.locator('#rain-cloud-radar').check();
        await page.getByRole('button', { name: '決定' }).click();
        console.log("Test: Select Action Link [Action Link: Pop-up] - Done");
        } catch (error) {
            console.log(error);
        }

     //Clear Action Link [Action Link: Pop-up]
     try {
        await page.locator('div').filter({ hasText: /^1選択$/ }).getByRole('button').first().click();
        await expect(page.getByPlaceholder('アクションリンク1')).toBeVisible();
        await page.locator('div').filter({ hasText: /^2選択$/ }).getByRole('button').first().click();
        await expect(page.getByPlaceholder('アクションリンク2')).toBeVisible();
        await page.locator('div').filter({ hasText: /^3選択$/ }).getByRole('button').first().click();
        await expect(page.getByPlaceholder('アクションリンク3')).toBeVisible();
        await page.locator('div').filter({ hasText: /^4選択$/ }).getByRole('button').first().click();
        await expect(page.getByPlaceholder('アクションリンク4')).toBeVisible();
        console.log("Test: Clear Action Link [Action Link: Pop-up] - Done");
        } catch (error) {
            console.log(error);
        }

       //Check all radio buttons Action Link [Action Link: Pop-up]
       try {
        await page.locator('div').filter({ hasText: /^1選択$/ }).getByRole('button').click();
        await page.locator('#disaster-info').check();
        await page.getByRole('button', { name: '決定' }).click();
        await page.getByRole('button', { name: '選択' }).nth(1).click();

        await page.locator('#warning-advisory').check();
        await page.getByRole('button', { name: '決定' }).click();
        await page.getByRole('button', { name: '選択' }).nth(1).click();

        await page.locator('#weather-forecast').check();
        await page.getByRole('button', { name: '決定' }).click();
        await page.getByRole('button', { name: '選択' }).nth(1).click();

        await page.locator('#rain-cloud-radar').check();
        await page.getByRole('button', { name: '決定' }).click();
        await page.getByRole('button', { name: '選択' }).nth(1).click();

        await page.locator('#typhoon-info').check();
        await page.getByRole('button', { name: '決定' }).click();
        await page.getByRole('button', { name: '選択' }).nth(1).click();

        await page.locator('#earthquake-info').check();
        await page.getByRole('button', { name: '決定' }).click();
        await page.getByRole('button', { name: '選択' }).nth(1).click();

        await page.locator('#tsunami-info').check();
        await page.getByRole('button', { name: '決定' }).click();
        await page.getByRole('button', { name: '選択' }).nth(1).click();

        await page.locator('#snowfall-info').check();
        await page.getByRole('button', { name: '決定' }).click();
        await page.getByRole('button', { name: '選択' }).nth(1).click();

        await page.locator('#disaster-map').check();
        await page.getByRole('button', { name: '決定' }).click();
        await page.getByRole('button', { name: '選択' }).nth(1).click();

        await page.locator('#evacuation-destination').check();
        await page.getByRole('button', { name: '決定' }).click();
        await page.getByRole('button', { name: '選択' }).nth(1).click();

        await page.locator('#typhoon-info').check();
        await page.getByRole('button', { name: '決定' }).click();
        await page.getByRole('button', { name: '選択' }).nth(1).click();

        await page.locator('#action-link div').filter({ hasText: '防災情報港区防災情報本管理画面の「LINE' }).nth(2).click();
        await page.locator('div').filter({ hasText: /^地震情報を確認する気象庁の地震情報が表示されたページ$/ }).first().click();
        await page.locator('#earthquake-info').check();
        await page.getByRole('button', { name: '決定' }).click();
        await page.getByRole('button', { name: '選択' }).nth(1).click();

        await page.locator('#snowfall-info').check();
        await page.getByRole('button', { name: '決定' }).click();
        await page.getByRole('button', { name: '選択' }).nth(1).click();

        await page.locator('#train-service-info').check();
        await page.getByRole('button', { name: '決定' }).click();
        await page.getByRole('button', { name: '選択' }).nth(1).click();

        await page.locator('div').filter({ hasText: /^周辺のSNS災害投稿を確認するSNSで投稿された災害に関連する投稿が一覧で確認できるページ$/ }).first().click();
        await page.locator('#sns-disaster-post').check();
        await page.getByRole('button', { name: '決定' }).click();
        await page.locator('div').filter({ hasText: /^1選択$/ }).getByRole('button').first().click();
        console.log("Test: Check all radio buttons Action Link [Action Link: Pop-up] - Done");
        } catch (error) {
            console.log(error);
        }


});