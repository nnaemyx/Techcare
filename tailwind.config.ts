import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primary: 'var(--unnamed-color-072635)',
      secondary: 'var(--unnamed-color-ffffff)'
    },
    fontFamily: {
      sans: ['Manrope', 'sans-serif'],
    },
    extend: {
    },
  },
  plugins: [],
};
export default config;
