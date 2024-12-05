import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      boxShadow: {
        'custom': '0px 4px 4px rgba(0, 0, 0, 0.25)',
        'custom2': '0px 3px 3px rgba(0, 0, 0, 0.30)'
      },
    },
  },
  plugins: [],
} satisfies Config;
