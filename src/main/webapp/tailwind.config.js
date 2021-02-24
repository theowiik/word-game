module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        peach: '#ffadad',
        beach: '#ffd6a5',
        grass: '#caffbf',
        ocean: '#9bf6ff'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
