const { test, expect } = require("@playwright/test");

const FONT_SIZE = "font-size";
const FONT_WEIGHT = "font-weight";
const f12 = "12px";
const f14 = "14px";
const f16 = "16px";
const f22 = "22px";
const f28 = '28px';
const f34 = "34px";
const bold1 = "700";
const bold2 = "600";
const normal = "400";

const validateTextUI = async (locator, size, weight) => {
  await expect(locator).toBeVisible();
  await expect(locator).toHaveCSS(FONT_SIZE, size);
  await expect(locator).toHaveCSS(FONT_WEIGHT, weight);
};

export const func = { 
  validateTextUI,
  f12,
  f14,
  f16,
  f22,
  f28,
  f34,
  bold1,
  bold2,
  normal,
};