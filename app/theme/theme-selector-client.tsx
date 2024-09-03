"use client";

import { THEMES } from "@/theme/constants";
import type { Theme } from "daisyui";
import { CheckIcon, ChevronDown } from "lucide-react";
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
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost rounded-btn">
        Theme <ChevronDown className="w-4 h-4" />
      </div>
      <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-52 p-2 shadow max-h-[36rem] overflow-y-scroll block space-y-2">
        {THEMES.map((themeOption) => (
          <li key={themeOption}>
            <button
              type="button"
              onClick={() => handleThemeChange(themeOption)}
              className={`flex items-center justify-between w-full min-h-12 ${getRadius(themeOption) ? `rounded-[${getRadius(themeOption)}]` : "rounded-lg"}`}
              style={{
                backgroundColor: getBackground(themeOption),
                color: getTextColor(themeOption),
              }}
            >
              <div className="flex items-center">
                {theme === themeOption ? (
                  <CheckIcon className="w-4 h-4 mr-2" />
                ) : (
                  <div className="w-4 mr-2" />
                )}
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
