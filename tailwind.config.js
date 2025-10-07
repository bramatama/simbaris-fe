/** @type {import('tailwindcss').Config} */
export default {
  // Pastikan path ini menunjuk ke semua file yang menggunakan class Tailwind
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        'simbaris-primary': '#0C305E',
        'simbaris-secondary': '#3454D1',
        'simbaris-accent': '#EA7A2E',
    },
  },
  // Pastikan Anda sudah mendaftarkan daisyui di sini
  plugins: [require("daisyui")], 
}}