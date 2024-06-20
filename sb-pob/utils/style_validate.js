const { expect } = require("@playwright/test");

const FONT_SIZE = "font-size";
const FONT_WEIGHT = "font-weight";
const COLOR = "color";
const f12 = "12px";
const f14 = "14px";
const f16 = "16px";
const f22 = "22px";
const f28 = "28px";
const f34 = "34px";
const bold700 = "700";
const bold600 = "600";
const bold400 = "400";

const hexToRgb = (hex) => {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgb(${r}, ${g}, ${b})`;
};

const validateTextUI = async (locator, size = 0, weight = 0, color = null) => {
  await expect(locator).toBeVisible();
  await expect(locator).toHaveCSS(FONT_SIZE, size);
  await expect(locator).toHaveCSS(FONT_WEIGHT, weight);
  await expect(locator).toHaveCSS(COLOR, hexToRgb(color));
};

export const func = {
  validateTextUI,
  f12,
  f14,
  f16,
  f22,
  f28,
  f34,
  bold700,
  bold600,
  bold400,
  hexToRgb,
};

export { validateTextUI, f12, f14, f16, f22, f28, f34, bold700,bold600,bold400,hexToRgb };
