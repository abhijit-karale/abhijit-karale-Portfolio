import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        die: "#080B11",
        substrate: "#0D121F",
        card: "#121826",
        "card-hover": "#172033",
        edge: "#1E293B",
        "edge-subtle": "rgba(255, 255, 255, 0.08)",
        trace: "#00F2FE",
        "trace-dim": "rgba(0, 242, 254, 0.15)",
        pass: "#10B981",
        clock: "#F59E0B",
        bus: "#8B5CF6",
      },
      boxShadow: {
        "glow-trace": "0 0 25px -4px rgba(0, 242, 254, 0.3)",
        "glow-pass": "0 0 25px -4px rgba(16, 185, 129, 0.3)",
        "glow-clock": "0 0 25px -4px rgba(245, 158, 11, 0.3)",
        "glow-bus": "0 0 25px -4px rgba(139, 92, 246, 0.3)",
        "card-luxury": "0 10px 30px -10px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.06)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float-slow": "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
