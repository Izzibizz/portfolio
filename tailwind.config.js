/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
      
    },
    fontFamily: {
      heading: ["Baguile", "serif"],
    },
    screens: {
      tablet: "600px", 
      laptop: "1025px", 
      desktop: "1300px", 
    },
    keyframes: {
      fadeIn: {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' },
      },
      fadeInVideo: {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' },
      },
      fadeInOut: {
        '0%': { opacity: '0' },
        '50%': { opacity: '1' },
        '100%': { opacity: '0' },
      },
    },
    animation: {
      fadeIn: 'fadeIn 3s ease-out',
      fadeInVideo: 'fadeInVideo 2s ease-out',
      fadeInOut: 'fadeInOut 3s ease-in-out infinite',
    },
    cursor: {
      hollow: 'url(/hollow-circle.svg), pointer',
      hollowDark: 'url(/hollow-dark.svg), pointer',
       pointer: 'url(/circle.svg), pointer',
       default: 'url(/circle-beige.svg), default'
    }
  },
  },
  plugins: [],
}

