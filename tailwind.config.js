export default {
  extends: ['airbnb', 'prettier'],
  plugins: ['@typescript-eslint', 'tailwind-animate', 'tailwindcss'],
  theme: {
    extend: {
      backgroundImage: {
        striped: 'repeating-linear-gradient(45deg, #3B3A3D, #3B3A3D 5px, transparent 5px, transparent 20px)',
      },
    },
  },
  content: [
    './src/**/*.{js,jsx,ts,tsx,html}', // Adjust to match your file structure
  ],
};
