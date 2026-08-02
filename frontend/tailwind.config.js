/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Warm near-black backgrounds
        ink: {
          DEFAULT: "#0A0807",
          900: "#050404",
          800: "#0A0807",
          700: "#100C09",
        },
        // Dark cards / panels
        charcoal: {
          DEFAULT: "#17130D",
          50: "#211B12",
          100: "#1B1610",
          200: "#17130D",
        },
        // Brand gold scale (muted antique -> bright highlight)
        gold: {
          DEFAULT: "#C9A961",
          deep: "#A89060",
          dark: "#8C7747",
          bright: "#E6C25A",
          soft: "#D8BE84",
        },
        // Warm cream light sections
        cream: {
          DEFAULT: "#F4EDE8",
          50: "#FBF8F4",
          100: "#F4EDE8",
          200: "#EDE3D6",
          300: "#E3D6C3",
        },
        sand: "#BBAE97",
        // Text
        parchment: "#F5F1EA",
        muted: "#B7AE9F",
        cocoa: "#2A241B",
      },
      fontFamily: {
        display: ['"Sora"', "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ['"Inter"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      maxWidth: {
        shell: "1200px",
      },
      borderRadius: {
        card: "18px",
      },
      boxShadow: {
        gold: "0 10px 40px -12px rgba(168,144,96,0.45)",
        lift: "0 24px 60px -24px rgba(0,0,0,0.6)",
        cream: "0 18px 50px -28px rgba(42,36,27,0.35)",
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg, #E6C25A 0%, #C9A961 45%, #A89060 100%)",
        "ink-radial":
          "radial-gradient(120% 100% at 50% 0%, #1A140C 0%, #0A0807 55%, #050404 100%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "ticker": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.22,1,0.36,1) both",
        ticker: "ticker 32s linear infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
    },
  },
  plugins: [],
};
