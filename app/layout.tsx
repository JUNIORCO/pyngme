import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { THEMES, THEME_COOKIE_NAME } from "@/theme/constants";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import type { Theme } from "daisyui";
import { cookies } from "next/headers";
import Header from "./components/header";
import {
  getBackground,
  getErrorColor,
  getPrimaryColor,
  getSuccessColor,
  getWarningColor,
  isLightTheme,
} from "./theme/helpers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pyngme",
  description: "Pyngme",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const theme =
    (cookieStore.get(THEME_COOKIE_NAME)?.value as Theme) ||
    THEMES[Math.floor(Math.random() * THEMES.length)];

  return (
    <ClerkProvider
      appearance={{
        baseTheme: isLightTheme(theme) ? undefined : dark,
        variables: {
          colorPrimary: getPrimaryColor(theme),
          colorBackground: getBackground(theme),
          colorDanger: getErrorColor(theme),
          colorWarning: getWarningColor(theme),
          colorSuccess: getSuccessColor(theme),
        },
      }}
    >
      <html lang="en" data-theme={theme}>
        <body className={inter.className}>
          <main>
            <Header />
            <main>{children}</main>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
