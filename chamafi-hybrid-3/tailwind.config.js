/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['Space Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        // Earth tones - Landing page palette
        soil: '#3D2B1F',
        clay: '#6B3A2A',
        sand: '#C4A47C',
        forest: '#2D5016',
        leaf: '#4A8025',
        lime: '#7ABF42',
        mint: '#C4E86A',
        'sun-gold': '#F5A623',
        ochre: '#D4821A',
        cream: '#F5ECD7',
        parchment: '#EFE4CC',
        // Earth tone range
        earth: {
          50: '#fdf8f0',
          100: '#f5ead6',
          200: '#e8d5b0',
          300: '#d4b886',
          400: '#c49a5c',
          500: '#b07d3a',
          600: '#96642e',
          700: '#7a4e26',
          800: '#5e3b1e',
          900: '#422916',
        },
        // Dark theme surface colors
        surface: {
          DEFAULT: '#050c08',
          50: '#1a2520',
          100: '#152019',
          200: '#0f1a14',
          300: '#0a140f',
          400: '#060e09',
          500: '#030804',
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        'shimmer': 'shimmer 2s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(34, 197, 94, 0.1)' },
          '50%': { boxShadow: '0 0 40px rgba(34, 197, 94, 0.3)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-forest-lime': 'linear-gradient(90deg, #2D5016 0%, #4A8025 50%, #7ABF42 100%)',
      },
      boxShadow: {
        'brutalist': '4px 4px 0px #1A1A1A',
        'brutalist-sm': '2px 2px 0px #1A1A1A',
      },
    },
  },
  plugins: [],
}
