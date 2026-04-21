/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
      },
      colors: {
  background: 'var(--color-background)',
  surface: 'var(--color-surface)',
  foreground: 'var(--color-foreground)',
  muted: 'var(--color-muted)',
  accent: {
    blue: '#3B82F6',
    purple: '#8B5CF6',
  },
},
      boxShadow: {
        soft: '0 20px 60px rgba(15, 23, 42, 0.28)',
      },
      backgroundImage: {
        'subtle-grid':
          'linear-gradient(rgba(148, 163, 184, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.08) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '72px 72px',
      },
    },
  },
  plugins: [],
}