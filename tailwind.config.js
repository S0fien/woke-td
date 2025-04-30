import animate from "tailwindcss-animate";

export default {
  // plugins: [
  //   animate
  // ],
  theme: {
    extend: {
      backgroundImage: {
        striped:
          "repeating-linear-gradient(45deg, #3B3A3D, #3B3A3D 5px, transparent 5px, transparent 20px)",
      },
    },
  },
  plugins: [
	 animate,
	],
}