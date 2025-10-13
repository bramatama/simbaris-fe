/** @type {import('tailwindcss').Config} */
export default {
  // Pastikan path ini menunjuk ke semua file yang menggunakan class Tailwind
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        // primary: #0C305E
        "simbaris-primary-lightest": "#E1E8F2",
        "simbaris-primary-light": "#A4B9D6",
        "simbaris-primary-baselight": "#5C7EAD",
        "simbaris-primary": "#0C305E",
        "simbaris-primary-dark": "#072140",
        "simbaris-primary-darkest": "#020E1A",

        // secondary: #3454D1
        "simbaris-secondary-lightest": "#E0E6FA",
        "simbaris-secondary-light": "#AAB8F0",
        "simbaris-secondary-baselight": "#5F78E0",
        "simbaris-secondary": "#3454D1",
        "simbaris-secondary-dark": "#253C94",
        "simbaris-secondary-darkest": "#141F4D",

        // accent: #EA7A2E
        "simbaris-accent-lightest": "#FDEBDD",
        "simbaris-accent-light": "#F6BC86",
        "simbaris-accent-baselight": "#F0914B",
        "simbaris-accent": "#EA7A2E",
        "simbaris-accent-dark": "#A8531C",
        "simbaris-accent-darkest": "#40210C",

        // success: #22C55E
        "simbaris-success-lightest": "#DFF8E9",
        "simbaris-success-light": "#8FE3B2",
        "simbaris-success-baselight": "#4DD784",
        "simbaris-success": "#22C55E",
        "simbaris-success-dark": "#167C3C",
        "simbaris-success-darkest": "#0A2B16",

        // warning: #EAB308
        "simbaris-warning-lightest": "#FFFBE6",
        "simbaris-warning-light": "#FBE58A",
        "simbaris-warning-baselight": "#F4CD35",
        "simbaris-warning": "#EAB308",
        "simbaris-warning-dark": "#D5A307",
        "simbaris-warning-darkest": "#382900",

        // hazard: #DC2626
        "simbaris-hazard-lightest": "#FDEDED",
        "simbaris-hazard-light": "#F59A9A",
        "simbaris-hazard-baselight": "#EF4444",
        "simbaris-hazard": "#DC2626",
        "simbaris-hazard-dark": "#991B1B",
        "simbaris-hazard-darkest": "#330808",

        "simbaris-text": "#111827",
        "simbaris-background": "gray-50",
        "simbaris-button-disabled": "gray-400",
      },
    },
    // Pastikan Anda sudah mendaftarkan daisyui di sini
    plugins: [require("daisyui")],
  },
};