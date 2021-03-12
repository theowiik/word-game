module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        peach: "#ffadad",
        beach: "#ffd6a5",
        grass: "#caffbf",
        ocean: "#9bf6ff",
      },
      minWidth: {
        xl: "16rem",
      },
      width: {
        150: "50rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
