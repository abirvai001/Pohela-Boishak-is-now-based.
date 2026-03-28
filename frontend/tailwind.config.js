
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        baseBlue: {
          DEFAULT: "#0b63ff", // Base primary-ish
          600: "#0a58e6",
          700: "#084bc2",
        },
        boishak: {
          saffron: "#ff8a00", // হলুদ-অরেঞ্জ লাইন
          red: "#d62828", // লালের ছোঁয়া
          green: "#2a9d8f",
          light: "#fff6e6",
        },
      },
      fontFamily: {
        sans: ["'Hind Siliguri'", "Noto Sans Bengali", "ui-sans-serif", "system-ui"],
        bengali: ["'Hind Siliguri'", "Noto Sans Bengali"],
      },
      backgroundImage: {
        "boishak-pattern": "url('/textures/bg-pattern.png')",
        "boishak-elements": "url('/textures/boishak-elements.png')",
        "boishak-gradient": "linear-gradient(135deg, rgba(255,138,0,0.08), rgba(11,99,255,0.06))",
      },
      boxShadow: {
        "soft-3xl": "0 10px 30px rgba(10, 37, 76, 0.08)",
      },
      borderRadius: {
        xl: "1rem",
      },
    },
