/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        light: "#eeeeee"
      },
      fontFamily: {
        heading: ["Shadows Into Light", "cursive"],
        body: ["Lexend", "sans-serif"],
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
      gridTemplateColumns: {
        16: 'repeat(16, minmax(0, 1fr))', 
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        longFadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInVideo: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInOut: {
          "0%": { opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        slideIn: {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        smallSlideIn: {
          "0%": { transform: "translateX(-5%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        smallSlideInRight: {
          "0%": { transform: "translateX(10%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        mediumSlideIn: {
          "0%": { transform: "translateX(-20%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        }, 
        smallSlideUp: {
          "0%": { transform: "translateY(5%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slowSlide: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(100%)' },
        },
        bounceUpDown: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10%)' },
        },
        rotateCircle: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        shortFadeIn: "fadeIn 1s ease-out",
        fadeIn: "fadeIn 3s ease-out",
        longFadeIn: "fadeIn 4s ease-out",
        fadeInVideo: "fadeInVideo 2s ease-out",
        fadeInOut: "fadeInOut 3s ease-in-out infinite",
        fadeOut: "fadeOut 1s ease-out",
        slideIn: "slideIn 2s ease-out forwards",
        slideUp: "slideUp 2s ease-out forwards",
        smallSlideIn: "smallSlideIn 2s ease-out forwards",
        smallSlideInRight: "smallSlideInRight 2s ease-out forwards",
        mediumSlideIn: "mediumSlideIn 0.5s ease-out forwards",
        smallSlideUp: "smallSlideUp 2s ease-out forwards",
        slowSlide: 'slowSlide 2s ease-in-out',
        bounceUpDown: 'bounceUpDown 1s infinite',
        rotateCircle: 'rotateCircle 20s linear infinite',
      },
      cursor: {
        hollow: "url(/hollow-circle.svg), pointer",
        hollowDark: "url(/hollow-dark.svg), pointer",
        pointer: "url(/circle.svg), pointer",
        default: "url(/circle-white.svg), default",
      },
      transitionDuration: {
        2000: '2000ms',
        3000: '3000ms',
      },
    },
  },
  plugins: [],
};
