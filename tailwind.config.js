/** @type {import('tailwindcss').Config} */
const config = {
  // purge: [
  //   './*.html',
  //   './src/client/*.js',
  //   './src/server/*.js'
  // ],
  content: [
    "./src/**/*.{js,jsx,css}",
  ],
  theme: {
    fontFamily: {
      "sg": '"Space Grotesk", sans-serif',
      "barlowCondensed": '"Barlow Condensed", sans-serif',
    },
    extend: {
      colors: {
	'bgg': '#F4F7FA',
	'lbgg': '#474747',
	'red': '#F76C6C',
	'txtn': '#333333',
      }
    },
  },
  plugins: [],
};

export default config;
