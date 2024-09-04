"use client";

import { THEMES } from "@/theme/constants";
import type { Theme } from "daisyui";
import { CheckIcon, ChevronDown, Dices } from "lucide-react";
import { useState } from "react";
import { changeTheme } from "../actions/change-theme";
import {
  getAccentColor,
  getBackground,
  getPrimaryColor,
  getRadius,
  getSecondaryColor,
  getTextColor,
} from "./helpers";

export default function ThemeSelectorClient({
  initialTheme,
}: { initialTheme: Theme }) {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  const handleThemeChange = async (newTheme: Theme) => {
    await changeTheme(newTheme);
    setTheme(newTheme);
  };

  return (
    <div className="dropdown dropdown-bottom md:dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost rounded-btn">
        Theme <ChevronDown className="w-4 h-4" />
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content bg-base-200 rounded-box z-[1] mt-4 w-52 p-2 shadow max-h-[36rem] overflow-y-scroll block space-y-2"
      >
        <li key="random">
          <button
            type="button"
            onClick={() => {
              const availableThemes = THEMES.filter((t) => t !== theme);
              handleThemeChange(
                availableThemes[
                  Math.floor(Math.random() * availableThemes.length)
                ],
              );
            }}
            className="flex items-center justify-center w-full min-h-12 rounded-lg bg-base-100"
          >
            Random <Dices className="w-4 h-4" />
          </button>
        </li>
        {THEMES.map((themeOption) => (
          <li key={themeOption}>
            <button
              type="button"
              onClick={() => handleThemeChange(themeOption)}
              className="flex items-center justify-between w-full min-h-12"
              style={{
                backgroundColor: getBackground(themeOption),
                color: getTextColor(themeOption),
                borderRadius: getRadius(themeOption),
              }}
            >
              <div className="flex">
                {theme === themeOption ? (
                  <CheckIcon className="w-4 h-4 mr-1" />
                ) : null}
                {themeOption}
              </div>
              <div className="flex">
                {getPrimaryColor(themeOption) && (
                  <div
                    className="w-4 h-4 rounded-full mr-1"
                    style={{ backgroundColor: getPrimaryColor(themeOption) }}
                  />
                )}
                {getSecondaryColor(themeOption) && (
                  <div
                    className="w-4 h-4 rounded-full mr-1"
                    style={{ backgroundColor: getSecondaryColor(themeOption) }}
                  />
                )}
                {getAccentColor(themeOption) && (
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: getAccentColor(themeOption) }}
                  />
                )}
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
