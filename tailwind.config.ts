import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      
      fontFamily: {
        sans: ['Roboto', 'font-sans'],  // Add Poppins as sans-serif
        serif: ['Merriweather', 'serif'], // Add Merriweather as serif
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'custom-lyellow': '#f9f4ce',
        'custom-myellow': '#ffcc24',
        'custom-dyellow': '#f9f4ce',
      },
      animation: {
        'slide-in-4': 'slide-in 0.5s ease-out forwards',
        'slide-in-1': 'slide-in 1.8s ease-out forwards',
        'slide-in-2': 'slide-in 2.3s ease-out forwards',
        'slide-in-3': 'slide-in 2.8s ease-out forwards',
      },
      keyframes: {
        'slide-in': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
