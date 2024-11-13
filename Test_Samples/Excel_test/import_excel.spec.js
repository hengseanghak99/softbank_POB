const { test, expect } = require('@playwright/test');
const XLSX = require('xlsx');

test.use({
    viewport: { width: 1600, height: 1200 },
  });

// Specify the path to your Excel file here
const filePath = './excelData/testDataDriven.xlsx';

// Function to read Excel data
function readExcelData(filePath) {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    return jsonData;
}

// Use data from Excel in Playwright tests
test.describe('Excel Data-Driven Tests', () => {
    const excelData = readExcelData(filePath);

    // Loop through rows of data in the Excel sheet
    excelData.forEach((row, index) => {
        if (index === 0 || row.length === 0 || row.some(cell => cell === undefined || cell === null || cell === '')) {
            return; // Skip header row and blank rows
        }

        const [username, email, password] = row; // Extract values for each row
        
        test(`Test with data from row ${index} And email = ${email}`, async ({ page }) => {
            await page.goto('https://sb-disaster-admin-pob.tagcast.group/login');
            
            // Fill the login form using data from the Excel sheet
            await page.getByPlaceholder('テナントIDを入力してください').fill(username);
            await page.getByPlaceholder('登録したメールアドレスを入力してください').fill(email);
            await page.getByPlaceholder('パスワードの入力').fill(password);

            // Click the login button and verify the next page
            await page.getByRole('button', { name: 'ログイン' }).click();
            await expect(page.getByRole('main').getByText('メッセージ配信', { exact: true })).toBeVisible();
        });
    });
});
