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
      heading: ["Shadows Into Light", "cursive"],
      body: ["Lexend", "sans-serif"]

    },
    fontWeight: {
      light: "100",
      medium: "200",
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
      semiFadeIn: {
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
      slideIn: {
        '0%': { transform: 'translateX(-100%)', opacity: '0' },
        '100%': { transform: 'translateX(0)', opacity: '1' },
      },
      slideUp: {
        '0%': { transform: 'translateY(100%)', opacity: '0' },
        '100%': { transform: 'translateY(0)', opacity: '1' },
      },
    },
    animation: {
      fadeIn: 'fadeIn 3s ease-out',
      semiFadeIn: 'fadeIn 0.5s ease-out',
      fadeInVideo: 'fadeInVideo 2s ease-out',
      fadeInOut: 'fadeInOut 3s ease-in-out infinite',
      slideIn: 'slideIn 1s ease-out forwards',
      slideUp: 'slideUp 1s ease-out forwards',
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

