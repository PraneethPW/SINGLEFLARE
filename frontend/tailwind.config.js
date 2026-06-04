/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#04070f",
        navy: "#07111f",
        ember: "#ff3d2e",
        flare: "#ff8a00",
        cyber: "#00d1ff",
        mint: "#4cffb3"
      },
      boxShadow: {
        glow: "0 0 48px rgba(255, 61, 46, 0.28)",
        cyber: "0 0 40px rgba(0, 209, 255, 0.24)"
      }
    }
  },
  plugins: []
};
