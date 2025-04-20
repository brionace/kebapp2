/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./frontend/index.html",
    "./frontend/src/**/*.{js,ts,jsx,tsx}",
    "./shared/src/**/*.{js,ts,jsx,tsx}",
    "./backend/src/**",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
