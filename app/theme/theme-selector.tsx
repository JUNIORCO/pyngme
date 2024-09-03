import { THEMES, THEME_COOKIE_NAME } from "@/theme/constants";
import type { Theme } from "daisyui";
import { cookies } from "next/headers";
import ThemeSelectorClient from "./theme-selector-client";

export default function ThemeSelector() {
  const cookieStore = cookies();
  const theme =
    (cookieStore.get(THEME_COOKIE_NAME)?.value as Theme) ||
    THEMES[Math.floor(Math.random() * THEMES.length)];

  return <ThemeSelectorClient initialTheme={theme} />;
}
