"use client";

import type { Theme } from "daisyui";
import ThemeSelectorClient from "./theme-selector-client";

type ThemeSelectorProps = {
  initialTheme: Theme;
};

export default function ThemeSelector({ initialTheme }: ThemeSelectorProps) {
  return <ThemeSelectorClient initialTheme={initialTheme} />;
}
