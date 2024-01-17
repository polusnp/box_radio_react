/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "custom-gray": "rgba(30, 30, 30, 0.6)",
        "custom-gray-hover": "rgba(98, 9, 66, 0.6)",
      },
    },
  },
  plugins: [],
}
