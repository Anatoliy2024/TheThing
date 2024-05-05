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
        chat: "1 1 20%",
        game: "1 1 80%",
        map: "1 1 20%",
        // trick: "0 0 33,33%",
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
