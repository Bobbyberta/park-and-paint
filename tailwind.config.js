/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,html}"
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors - updated with custom palette
        primary: {
          50: '#f0f8ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        // Standard gray scale for text and backgrounds
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
        },
        // Custom brand colors from the provided palette
        brand: {
          1: '#8c8c8c', // --color_13: Light gray
          2: '#a1cbff', // --color_16: Light blue
          3: '#4297ff', // --color_17: Medium blue (now main brand color)
          4: '#006DE0', // Main brand color (updated)
          5: '#00224c', // --color_20: Dark navy
        },
        // Additional grays from the palette
        custom: {
          gray: {
            light: '#c5c5c5', // --color_12: Very light gray
            medium: '#8c8c8c', // --color_13: Medium gray
            dark: '#525252',   // --color_14: Dark gray
            darker: '#181818', // --color_15: Very dark gray
          },
          blue: {
            light: '#a1cbff', // --color_16: Light blue
            medium: '#4297ff', // --color_17: Medium blue
            dark: '#0066e3',  // --color_18: Dark blue
            brand: '#004497', // --color_19: Main brand color
            navy: '#00224c',  // --color_20: Navy blue
          }
        }
      },
      spacing: {
        '15': '60px',
      },
      fontFamily: {
        'barlow': ['Barlow', 'sans-serif'],
        'sans': ['Work Sans', 'sans-serif'],
      },
      fontSize: {
        'heading-1': ['88px', { lineHeight: '1.2em', fontWeight: '600' }],
        'heading-2': ['72px', { lineHeight: '1.25em', fontWeight: '600' }],
        'heading-3': ['50px', { lineHeight: '1.34em', fontWeight: '600' }],
        'heading-4': ['40px', { lineHeight: '1.35em', fontWeight: '600' }],
        'heading-5': ['28px', { lineHeight: '1.375em', fontWeight: '600' }],
        'heading-6': ['22px', { lineHeight: '1.41em', fontWeight: '300' }],
        'body-large': ['20px', { lineHeight: '1.67em', fontWeight: '300' }],
        'body-medium': ['18px', { lineHeight: '1.75em', fontWeight: '300' }],
        'body-small': ['15px', { lineHeight: '1.875em', fontWeight: '300' }],
        'body-xsmall': ['14px', { lineHeight: '1.79em', fontWeight: '300' }],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      maxWidth: {
        'site': '980px',
      }
    },
  },
  plugins: [],
}

