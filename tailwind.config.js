/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        burtons: "burtons"
      },
      html: {
        scrollBehavior: "smooth"
      },
      height: {
        '10vh': '10vh',
        '25vh': '25vh',
        '50vh': '50vh',
        '75vh': '75vh',
        '80vh': '80vh',
        '90vh': '90vh',
      },
    },

  },
  plugins: [],

}