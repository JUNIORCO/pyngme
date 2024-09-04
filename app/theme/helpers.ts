import parse from "color-parse";
import type { Theme } from "daisyui";
import DaisyThemes from "daisyui/src/theming/themes";

export const isLightTheme = (theme: Theme): boolean => {
  return DaisyThemes[theme]["color-scheme"] === "light";
};

const isHexColor = (color: string): boolean => {
  return /^#[0-9A-Fa-f]{6}$/.test(color);
};

type TRGB = { r: number; g: number; b: number };
type TLCH = { l: number; c: number; h: number };

const oklchToRGB = (lch: TLCH): TRGB => {
  // Convert Oklch to OKLab
  let { l, c, h } = lch;
  const hRad = (h * Math.PI) / 180;
  const a = c * Math.cos(hRad);
  let b = c * Math.sin(hRad);

  // Convert OKLab to linear sRGB
  const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = l - 0.0894841775 * a - 1.291485548 * b;

  l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;

  // Convert linear sRGB to sRGB
  const r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  b = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;

  // Clamp and round the values to get valid RGB
  const clamp = (x: number) => Math.max(0, Math.min(255, Math.round(x * 255)));

  return {
    r: clamp(r),
    g: clamp(g),
    b: clamp(b),
  };
};

const rgbToHex = (rgb: TRGB): string => {
  const { r, g, b } = rgb;
  const toHex = (c: number): string => {
    return c.toString(16).padStart(2, "0");
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

const oklchToHex = (oklch: string): string | undefined => {
  const parsed = parse(oklch);
  const rgb = oklchToRGB({
    l: parsed.values[0],
    c: parsed.values[1],
    h: parsed.values[2],
  });
  const hex = rgbToHex(rgb);
  return isHexColor(hex) ? hex : undefined;
};

export const getPrimaryColor = (theme: Theme): string | undefined => {
  const color = DaisyThemes[theme].primary;
  return isHexColor(color) ? color : oklchToHex(color);
};

export const getSecondaryColor = (theme: Theme): string | undefined => {
  const color = DaisyThemes[theme].secondary;
  return isHexColor(color) ? color : oklchToHex(color);
};

export const getAccentColor = (theme: Theme): string | undefined => {
  const color = DaisyThemes[theme].accent;
  return isHexColor(color) ? color : oklchToHex(color);
};

export const getBackground = (theme: Theme): string | undefined => {
  const bg = DaisyThemes[theme]["base-100"];
  return isHexColor(bg) ? bg : oklchToHex(bg);
};

export const getErrorColor = (theme: Theme): string | undefined => {
  const error = DaisyThemes[theme].error;
  return isHexColor(error) ? error : oklchToHex(error);
};

export const getWarningColor = (theme: Theme): string | undefined => {
  const warning = DaisyThemes[theme].warning;
  return isHexColor(warning) ? warning : oklchToHex(warning);
};

export const getSuccessColor = (theme: Theme): string | undefined => {
  const success = DaisyThemes[theme].success;
  return isHexColor(success) ? success : oklchToHex(success);
};

export const getTextColor = (theme: Theme): string | undefined => {
  const text =
    DaisyThemes[theme]["base-content"] ||
    (isLightTheme(theme) ? "#000000" : "#ffffff");
  return isHexColor(text) ? text : oklchToHex(text);
};

export const getRadius = (theme: Theme): string => {
  return (
    DaisyThemes[theme]["--rounded-box"] ||
    DaisyThemes[theme]["--rounded-btn"] ||
    "0.5rem"
  );
};
