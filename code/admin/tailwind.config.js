/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        "neon-blue": '#4369F2',
        "saffron": '#EEC643',
        "oxford-blue": '#011638',
        "night": '#141414',
        "antiflash": '#EEF0F2',
      }
    },
  },
  plugins: [],
}
