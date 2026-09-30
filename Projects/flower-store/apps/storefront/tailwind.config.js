const path = require("path")

module.exports = {
  darkMode: "class",
  presets: [require("@medusajs/ui-preset")],
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/modules/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        width: "width margin",
        height: "height",
        bg: "background-color",
        display: "display opacity",
        visibility: "visibility",
        padding: "padding-top padding-right padding-bottom padding-left",
      },
      colors: {
        // ── Brand Identity Palette (Exact from Brand Guidelines) ──
        "fresh-bud": {
          DEFAULT: "#5D6F7D", // Slate dusty blue
          dark: "#41515E",
          light: "#7B8D9C",
        },
        "golden-stem": {
          DEFAULT: "#7897B3", // Soft cornflower / sky blue
          light: "#9BB3CB",
          dark: "#5B7994",
        },
        "petal-veil": {
          DEFAULT: "#DA888A", // Warm terracotta rose
          light: "#E7A5A7",
          dark: "#C26E70",
        },
        "blush-bloom": {
          DEFAULT: "#A5ACA5", // Eucalyptus sage grey-green
          light: "#C1C7C1",
          dark: "#899089",
          subtle: "#EFF2EF",
        },
        "coral-blossom": {
          DEFAULT: "#E9D2D8", // Soft powdery ballet blush pink
          light: "#F7EEF0",
          dark: "#D7B5BE",
        },

        // ── Harmonized Semantic Tokens across Store ──
        cream: {
          DEFAULT: "#FAF7F4",
          light: "#FFFFFF",
          dark: "#F0E9E2",
        },
        blush: {
          DEFAULT: "#DA888A", // Petal Veil
          light: "#E9D2D8",   // Coral Blossom
          muted: "#F7EEF0",
        },
        sage: {
          DEFAULT: "#A5ACA5", // Blush Bloom
          light: "#C1C7C1",
          subtle: "#EFF2EF",
        },
        "deep-sage": {
          DEFAULT: "#5D6F7D", // Fresh Bud
          dark: "#41515E",
          light: "#7B8D9C",
        },
        charcoal: {
          DEFAULT: "#2D3740", // Deep slate
          muted: "#5D6F7D",
          light: "#8292A0",
        },
        gold: {
          DEFAULT: "#DA888A", // Petal Veil rose accent
          light: "#E7A5A7",
          muted: "#F7EEF0",
          dark: "#C26E70",
        },
        grey: {
          0: "#FFFFFF",
          5: "#F9FAFB",
          10: "#F3F4F6",
          20: "#E5E7EB",
          30: "#D1D5DB",
          40: "#9CA3AF",
          50: "#6B7280",
          61: "#4B5563",
          70: "#374151",
          80: "#1F2937",
          90: "#111827",
        },
      },
      borderRadius: {
        none: "0px",
        soft: "2px",
        base: "4px",
        rounded: "8px",
        large: "16px",
        circle: "9999px",
      },
      maxWidth: {
        "8xl": "100rem",
      },
      screens: {
        "2xsmall": "320px",
        xsmall: "512px",
        small: "1024px",
        medium: "1280px",
        large: "1440px",
        xlarge: "1680px",
        "2xlarge": "1920px",
      },
      fontSize: {
        "3xl": "2rem",
      },
      fontFamily: {
        display: [
          "var(--font-geraldine)",
          "'Geraldine'",
          "'Cormorant Garamond'",
          "Georgia",
          "serif",
        ],
        heritage: [
          "'Playfair Display'",
          "'Cormorant Garamond'",
          "Georgia",
          "serif",
        ],
        cormorant: [
          "'Cormorant Garamond'",
          "Georgia",
          "serif",
        ],
        editorial: [
          "'Cormorant Garamond'",
          "Georgia",
          "serif",
        ],
        serif: [
          "'Cormorant Garamond'",
          "'Playfair Display'",
          "Georgia",
          "serif",
        ],
        sans: [
          "'Saira'",
          "sans-serif",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
        ],
        saira: [
          "'Saira'",
          "sans-serif",
        ],
        changa: [
          "'Changa'",
          "sans-serif",
        ],
      },
      keyframes: {
        ring: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "fade-in-right": {
          "0%": {
            opacity: "0",
            transform: "translateX(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        "fade-in-top": {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-out-top": {
          "0%": {
            height: "100%",
          },
          "99%": {
            height: "0",
          },
          "100%": {
            visibility: "hidden",
          },
        },
        "accordion-slide-up": {
          "0%": {
            height: "var(--radix-accordion-content-height)",
            opacity: "1",
          },
          "100%": {
            height: "0",
            opacity: "0",
          },
        },
        "accordion-slide-down": {
          "0%": {
            "min-height": "0",
            "max-height": "0",
            opacity: "0",
          },
          "100%": {
            "min-height": "var(--radix-accordion-content-height)",
            "max-height": "none",
            opacity: "1",
          },
        },
        enter: {
          "0%": { transform: "scale(0.9)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
        leave: {
          "0%": { transform: "scale(1)", opacity: 1 },
          "100%": { transform: "scale(0.9)", opacity: 0 },
        },
        "slide-in": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        ring: "ring 2.2s cubic-bezier(0.5, 0, 0.5, 1) infinite",
        "fade-in-right":
          "fade-in-right 0.3s cubic-bezier(0.5, 0, 0.5, 1) forwards",
        "fade-in-top": "fade-in-top 0.2s cubic-bezier(0.5, 0, 0.5, 1) forwards",
        "fade-out-top":
          "fade-out-top 0.2s cubic-bezier(0.5, 0, 0.5, 1) forwards",
        "accordion-open":
          "accordion-slide-down 300ms cubic-bezier(0.87, 0, 0.13, 1) forwards",
        "accordion-close":
          "accordion-slide-up 300ms cubic-bezier(0.87, 0, 0.13, 1) forwards",
        enter: "enter 200ms ease-out",
        "slide-in": "slide-in 1.2s cubic-bezier(.41,.73,.51,1.02)",
        leave: "leave 150ms ease-in forwards",
      },
    },
  },
  plugins: [require("tailwindcss-radix")()],
}
