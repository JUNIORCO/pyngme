"use server";

import { THEME_COOKIE_NAME } from "@/theme/constants";
import type { Theme } from "daisyui";
import { cookies } from "next/headers";

export async function changeTheme(theme: Theme) {
  cookies().set(THEME_COOKIE_NAME, theme, { maxAge: 31536000, path: "/" });
}
