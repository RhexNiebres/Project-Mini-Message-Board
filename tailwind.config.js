/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit", // ✅ Enable Just-In-Time mode to prevent purging issues
  content: ["./views/**/*.ejs", "./public/**/*.js"], 
  theme: {
    extend: {},
  },
  plugins: [],
};
