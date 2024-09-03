import daisyui from "daisyui";
import type { Config } from "tailwindcss";

const config: Config = {
	content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {},
	plugins: [daisyui],
	daisyui: {
		themes: true,
	},
};
export default config;
