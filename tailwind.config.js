/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        padding: {
          default: "20px",
        },
        center: true,
      },
      maxWidth: {
        1600: "1600px",
      },
    },
  },
  plugins: [],
};
