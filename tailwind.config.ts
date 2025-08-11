import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        blue: {
          50: "#e6f0ff",
          100: "#cce0ff",
          200: "#99c2ff",
          300: "#66a3ff",
          400: "#3385ff",
          500: "#0066ff",
          600: "#0052cc",
          700: "#003d99",
          800: "#002966",
          900: "#001433",
          950: "#000a1a",
        },
        purple: {
          50: "#f5e6ff",
          100: "#ebccff",
          200: "#d699ff",
          300: "#c266ff",
          400: "#ad33ff",
          500: "#9900ff",
          600: "#7a00cc",
          700: "#5c0099",
          800: "#3d0066",
          900: "#1f0033",
          950: "#0f001a",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in-scale": {
          from: { opacity: "0", transform: "translateY(20px) scale(0.95)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "slide-in-blur": {
          from: { opacity: "0", transform: "translateX(-30px)", filter: "blur(4px)" },
          to: { opacity: "1", transform: "translateX(0)", filter: "blur(0)" },
        },
        "slide-in-blur-right": {
          from: { opacity: "0", transform: "translateX(30px)", filter: "blur(4px)" },
          to: { opacity: "1", transform: "translateX(0)", filter: "blur(0)" },
        },
        "float-soft": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-6px) rotate(1deg)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)" },
          "50%": { boxShadow: "0 0 30px rgba(139, 92, 246, 0.5)" },
        },
        "morph-gradient": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "progress-fill": {
          from: { width: "0%", opacity: "0" },
          to: { width: "94%", opacity: "1" },
        },
        "text-shimmer": {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "particle-float": {
          "0%, 100%": { transform: "translateY(0px) translateX(0px) rotate(0deg)", opacity: "0.4" },
          "25%": { transform: "translateY(-10px) translateX(5px) rotate(90deg)", opacity: "0.8" },
          "50%": { transform: "translateY(-5px) translateX(-5px) rotate(180deg)", opacity: "0.6" },
          "75%": { transform: "translateY(-15px) translateX(3px) rotate(270deg)", opacity: "0.9" },
        },
        "card-hover": {
          from: { transform: "translateY(0) scale(1)", boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)" },
          to: { transform: "translateY(-4px) scale(1.02)", boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)" },
        },
        "button-press": {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(0.98)" },
          "100%": { transform: "scale(1)" },
        },
        "glow-teal": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(20, 184, 166, 0.4)" },
          "50%": { boxShadow: "0 0 30px rgba(20, 184, 166, 0.6)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in-scale": "fade-in-scale 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-in-blur": "slide-in-blur 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-in-blur-right": "slide-in-blur-right 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        "float-soft": "float-soft 6s ease-in-out infinite",
        "shimmer": "shimmer 2s infinite",
        "glow": "glow 3s ease-in-out infinite",
        "morph-gradient": "morph-gradient 8s ease infinite",
        "progress-fill": "progress-fill 2.5s cubic-bezier(0.16, 1, 0.3, 1) 0.5s forwards",
        "text-shimmer": "text-shimmer 3s ease-in-out infinite",
        "particle-float": "particle-float 15s ease-in-out infinite",
        "card-hover": "card-hover 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "button-press": "button-press 0.15s cubic-bezier(0.16, 1, 0.3, 1)",
        "glow-teal": "glow-teal 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
  // Performance optimizations
  future: {
    hoverOnlyWhenSupported: true,
  },
  experimental: {
    optimizeUniversalDefaults: true,
  },
} satisfies Config

export default config
