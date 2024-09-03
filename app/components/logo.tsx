import { THEME_COOKIE_NAME } from "@/theme/constants";
import { isLightTheme } from "@/theme/helpers";
import type { Theme } from "daisyui";
import { cookies } from "next/headers";
import Image from "next/image";

export default function Logo() {
  const cookieStore = cookies();
  const theme = cookieStore.get(THEME_COOKIE_NAME)?.value as Theme;

  return (
    <Image
      src={isLightTheme(theme) ? "/logo-light.png" : "/logo-dark.png"}
      alt="pyngme"
      width={32}
      height={32}
      priority
    />
  );
}
