// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',   // your React/Next code
    // './app/**/*.{js,ts,jsx,tsx}', // you can remove this if your app folder is under src/
  ],
  theme: {
    extend: {
      // any custom colors or spacing you want
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: false,   // disable built-in themes if you just want utility classes
    // or list your favorite themes here, e.g. ['light', 'dark']
  },
};
