import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { THEME_COOKIE_NAME } from "@/theme/constants";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Theme } from "daisyui";
import { cookies } from "next/headers";
import Script from "next/script";
import { Toaster } from "react-hot-toast";
import Header from "./components/header/header";
import { CSPostHogProvider } from "./providers/posthog";
import Routes from "./routes";
import {
  getBackground,
  getErrorColor,
  getPrimaryColor,
  getSuccessColor,
  getTextColor,
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
  const theme = (cookieStore.get(THEME_COOKIE_NAME)?.value || "light") as Theme;

  return (
    <ClerkProvider
      afterSignOutUrl={`${process.env.NEXT_PUBLIC_APP_URL}${Routes.hub}`}
      signInFallbackRedirectUrl={`${process.env.NEXT_PUBLIC_APP_URL}${Routes.hub}`}
      signUpFallbackRedirectUrl={`${process.env.NEXT_PUBLIC_APP_URL}${Routes.welcome}`}
      appearance={{
        baseTheme: isLightTheme(theme) ? undefined : dark,
        variables: {
          colorPrimary: getPrimaryColor(theme),
          colorBackground: getBackground(theme),
          colorDanger: getErrorColor(theme),
          colorWarning: getWarningColor(theme),
          colorSuccess: getSuccessColor(theme),
          colorInputBackground: getBackground(theme),
          colorInputText: getTextColor(theme),
        },
      }}
    >
      <CSPostHogProvider>
        <html lang="en" data-theme={theme}>
          <body className={inter.className}>
            <main>
              <Header
                src={isLightTheme(theme) ? "/logo-light.png" : "/logo-dark.png"}
                initialTheme={theme}
              />
              <main>{children}</main>
              <Toaster
                toastOptions={{
                  style: {
                    background: getBackground(theme),
                    color: getTextColor(theme),
                  },
                }}
              />
              <SpeedInsights />
            </main>
          </body>
        </html>
      </CSPostHogProvider>
      <Script
        src="https://app.lemonsqueezy.com/js/lemon.js"
        strategy="lazyOnload"
      />
    </ClerkProvider>
  );
}
