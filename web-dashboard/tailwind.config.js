module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        solana: {
          purple: '#9945FF',
          green: '#14F195',
          blue: '#00C2FF',
        },
      },
      backgroundImage: {
        'glow-gradient': 'linear-gradient(135deg, #1a0533 0%, #0d1b4b 50%, #0a0a2e 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(153,69,255,0.15) 0%, rgba(20,241,149,0.05) 100%)',
      },
      boxShadow: {
        'glow-purple': '0 0 20px rgba(153, 69, 255, 0.3)',
        'glow-green': '0 0 20px rgba(20, 241, 149, 0.3)',
        'glow-blue': '0 0 20px rgba(0, 194, 255, 0.3)',
        'glow-card': '0 4px 24px rgba(153, 69, 255, 0.2), 0 0 0 1px rgba(153, 69, 255, 0.1)',
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(153, 69, 255, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(153, 69, 255, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
