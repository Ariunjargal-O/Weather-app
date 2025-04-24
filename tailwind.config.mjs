/** @type {import('tailwindcss').Config} */
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
        "cool-gray-400": "var(--cool-gray-400)",
        "cool-gray-900": "var(--cool-gray-900)",
        "cool-gray-600": "var(--cool-gray-600)",
        "orange-brigth": "var(--colors-orange-brigth)",
        "purple-brigth": "var(--colors-purple-brigth)",
      
    },
  },
  plugins: [],
}
}
