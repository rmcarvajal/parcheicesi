/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: "#5353F1",          // color principal (bg-brand, text-brand)
        brandLight: "#C9C9F0",     // --color-brand-light
        secondary: "#01BA77",      // --color-secondary
        orange: "#FB5D28",         // --color-orange
        purple: "#8D59F8",         // --color-purple
        yellow: "#E2EB3D",         // --color-yellow
      }
    }
  },
  plugins: []
};
