const { test, expect } = require("@playwright/test");

const selectImage = async (NAME,NUMBEROFIMAGE,CLASSNAME) => {
    test(`${NAME}`,async ({page}) => {
        await page.getByRole('button', { name: 'テンプレートから選択' }).click();
        await page.locator(`div:nth-child(${NUMBEROFIMAGE}) > .cursor-pointer > .sb-image`).first().click();
        await page.getByRole('button', { name: '保存', exact: true }).click();
        const test = page.locator('#app div').filter({ hasText: '画像任意メッセージ必須 0/500' }).locator('i').nth(2);
        await expect.soft(test).toHaveClass(`sb-image sb-image-image-selection ${CLASSNAME} bg-contain`)
       })
};
module.exports = {
selectImage
};
