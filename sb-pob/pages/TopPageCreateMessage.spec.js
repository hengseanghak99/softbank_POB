import { login_logout_action } from "../compoment/LoginLogoutActoins";
import { func } from "../utils/style_validate";
const { test, expect } = require("@playwright/test");
const { login_success } = login_logout_action;
const toppage_url =
  "https://sb-disaster-admin-pob.tagcast.group/message-deliveries";

test.beforeEach(async ({ page }) => {
  await login_success(page);
  await page.waitForTimeout(5000);
  await page.getByRole("link", { name: "メッセージ作成" }).click();
  await page.waitForTimeout(5000);
});

test("Create Message [ Check Text UI]", async ({ page }) => {
  const { validateTextUI, f14, f16,f22,f12, f34, bold1,bold2, normal } = func;
  await validateTextUI(
    page.getByLabel("breadcrumb").getByText("メッセージ作成"),
    f14,
    normal
  );
  await validateTextUI(
    page.locator("div").filter({ hasText: /^メッセージ作成$/ }),
    f34,
    bold1
  );
  await validateTextUI(page.getByText("配信設定"), f22, bold2);
  await validateTextUI(page.getByText("配信タイトル"), f16, bold1);
  await validateTextUI(page.getByText("必須").first(), f12, normal);
  await validateTextUI(
    page.getByPlaceholder("例）避難指示メッセージ"),
    f16,
    normal
  );
  await validateTextUI(page.getByText("/30文字"), f12, normal);
  await validateTextUI(
    page.getByText("※タイトルは管理画面のみで使用され、LINE"),
    f14,
    normal
  );
  await validateTextUI(page.getByText("配信タイミング"), f16, bold1);
  await validateTextUI(page.getByText("必須").nth(1), f12, normal);
  await validateTextUI(page.getByText("今すぐ配信"), f16, normal);
  await validateTextUI(page.getByText("指定した日時に自動配信"), f16, normal);
  await validateTextUI(page.getByText("トリガー条件で自動配信"), f16, normal);
  await validateTextUI(page.getByText("2.メッセージ作成"), f22, bold2);
  await validateTextUI(page.getByText("画像", { exact: true }), f16, bold1);
  await validateTextUI(page.getByText("任意").first(), f12, normal);
  await validateTextUI(page.getByRole("button", { name: "テンプレートから選択" }),f16,normal);
  await validateTextUI(
    page.getByText("メッセージ", { exact: true }),
    f16,
    bold1
  );
  await validateTextUI(page.getByText("必須").nth(2), f12, normal);
  await validateTextUI(
    page.getByPlaceholder(
      "例：〇〇ため、警戒レベル3高齢者等避難を発令しました。"
    ),
    f16,
    normal
  );
  await validateTextUI(page.getByText("/500文字"), f12, normal);
  await validateTextUI(
    page.getByText("アクションリンク", { exact: true }),
    f16,
    bold1
  );
  await validateTextUI(
    page.getByText(
      "メッセージに災害情報や防災マップなどのページへ遷移するアクションリンクを最大４つ設定できます。"
    ),
    f16,
    normal
  );
  await validateTextUI(
    page.getByText(
      "上から順にクリックされる可能性があるため、優先度の高いリンクを上位に設定しましょう。"
    ),
    f16,
    normal
  );
  await expect(page.getByPlaceholder("アクションリンク1")).toBeVisible();
  await expect(
    page
      .locator("div")
      .filter({ hasText: /^1選択$/ })
      .getByRole("button")
  ).toBeVisible();
  await expect(page.getByPlaceholder("アクションリンク2")).toBeVisible();
  await expect(
    page
      .locator("div")
      .filter({ hasText: /^2選択$/ })
      .getByRole("button")
  ).toBeVisible();
  await expect(page.getByPlaceholder("アクションリンク3")).toBeVisible();
  await expect(
    page
      .locator("div")
      .filter({ hasText: /^3選択$/ })
      .getByRole("button")
  ).toBeVisible();
  await expect(page.getByPlaceholder("アクションリンク4")).toBeVisible();
  await expect(
    page
      .locator("div")
      .filter({ hasText: /^4選択$/ })
      .getByRole("button")
  ).toBeVisible();
  await expect(page.getByText("配信下書き保存 テスト配信")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "配信", exact: true })
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "下書き保存" })).toBeVisible();
  await expect(page.getByRole("button", { name: "テスト配信" })).toBeVisible();
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

test.only("Create Message [ If user leave page, show alert pop-up ]", async ({
  page,
}) => {
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
  const { validateTextUI, f14, f16, f28, bold1, normal } = func;
      // Check the Pop-up Text UI
  try {
    // Click the button to open the pop-up
    await page
      .locator("div")
      .filter({ hasText: /^1選択$/ })
      .getByRole("button")
      .click();
    await validateTextUI(
      page.getByRole("heading", { name: "アクションリンクを選択" }),
      f28,
      bold1
    );
    await validateTextUI(
      page.getByText("防災情報", { exact: true }),
      f16,
      bold1
    );
    await validateTextUI(page.getByText("港区防災情報"), f14, normal);
    await validateTextUI(
      page
        .locator("div")
        .filter({
          hasText:
            /^港区防災情報本管理画面の「LINEコンテンツ設定」メニューから編集できます。$/,
        })
        .first(),
      f16,
      normal
    );
    await validateTextUI(page.getByText("警報・注意報"), f14, normal);
    await validateTextUI(
      page
        .locator("div")
        .filter({
          hasText:
            /^警報・注意報本管理画面の「LINEコンテンツ設定」メニューから編集できます。$/,
        })
        .first(),
      f16,
      normal
    );
    await validateTextUI(page.getByText("気象・地震情報"), f16, bold1);
    await validateTextUI(page.getByText("天気予報を確認する"), f14, normal);
    await validateTextUI(
      page.getByText("Yahoo JAPANの天気予報が表示されたページ"),
      f16,
      normal
    );
    await validateTextUI(
        page.getByText('雨雲レーダーを確認する'),
      f14,
      normal
    );
    await validateTextUI(
      page.getByText("Yahoo JAPANの雨雲レーダーが表示されたページ"),
      f16,
      normal
    );
    await validateTextUI(page.getByText("台風情報を確認する"), f14, normal);
    await validateTextUI(
      page.getByText("気象庁の台風情報が表示されたページ"),
      f16,
      normal
    );

    await validateTextUI(page.getByText("地震情報を確認する"), f14, normal);
    await validateTextUI(
      page.getByText("気象庁の地震情報が表示されたページ"),
      f16,
      normal
    );
    await validateTextUI(page.getByText("津波情報を確認する"), f14, normal);
    await validateTextUI(
      page.getByText("気象庁の津波情報が表示されたページ"),
      f16,
      normal
    );

    await validateTextUI(
      page.getByText("防災マップ", { exact: true }),
      f16,
      bold1
    );
    await validateTextUI(page.getByText("防災マップを確認する"), f14, normal);
    await validateTextUI(
      page.getByText(
        "ハザードマップ、避難施設、混雑情報、河川水位が全て表示された防災マップ"
      ),
      f16,
      normal
    );
    await validateTextUI(page.getByText("避難先を確認する"), f14, normal);
    await validateTextUI(
      page.getByText(
        "避難施設（避難所・避難場所・一時滞在施設）が表示された防災マップ"
      ),
      f16,
      normal
    );
    await validateTextUI(
      page.getByText("ハザードマップを確認する"),
      f14,
      normal
    );
    await validateTextUI(
      page.getByText("ハザードマップが表示された防災マップ"),
      f16,
      normal
    );
    await validateTextUI(page.getByText("混雑を確認する"), f14, normal);
    await validateTextUI(
      page.getByText("混雑度が表示された防災マップ"),
      f16,
      normal
    );

    await validateTextUI(
      page.getByText("電車運行情報", { exact: true }),
      f16,
      bold1
    );
    await validateTextUI(
      page.getByText("周辺の電車運行情報を確認する"),
      f14,
      normal
    );
    await validateTextUI(
      page.getByText("電車の運行情報が確認できるページ"),
      f16,
      normal
    );

    await validateTextUI(page.getByText("Twitter投稿情報"), f16, bold1);
    await validateTextUI(
      page.getByText("周辺のSNS災害投稿を確認する"),
      f14,
      normal
    );
    await validateTextUI(
      page.getByText(
        "SNSで投稿された災害に関連する投稿が一覧で確認できるページ"
      ),
      f16,
      normal
    );
   
    console.log("Test: Check the Pop-up Text UI - Done");
  } catch (error) {
    console.log(error);
  }

      // Close Pop-up the [Action Link: Pop-up]
    try {
    //close the pop-up with button "cancel button"
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'キャンセル' }).click();
    console.log("Test: Close Pop-up the [Action Link: Pop-up] - Done");
    } catch (error) {
        console.log(error);
    }

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
