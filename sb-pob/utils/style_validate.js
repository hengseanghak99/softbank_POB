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

const validateTextUI = async (locator, size = "", weight = "", color = "") => {
  await expect.soft(locator).toBeVisible();
  await expect.soft(locator).toHaveCSS(FONT_SIZE, size);
  await expect.soft(locator).toHaveCSS(FONT_WEIGHT, weight);
  await expect.soft(locator).toHaveCSS(COLOR, hexToRgb(color));
};

module.exports = {
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
  hexToRgb
};
