/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: "#121212",
        bone: "#F5F5F7",
        sand: "#C2B280",
      },
    },
  },
  plugins: [],
};