/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      flex: {
        chat: "0 1 15%",
        game: "1 0 55%",
        // game2: "1 0 60%",
        map: "0 1 30%",
      },
    },
    fontFamily: {
      sans: ["ui-sans-serif", "system-ui"],
      serif: ["ui-serif", "Georgia"],
      mono: ["ui-monospace", "SFMono-Regular"],
      rubik: ['"Rubik Wet Paint"', "system-ui"],
      permanent: ['"Permanent Marker"', "system-ui"],
    },
  },
  plugins: [],
}
