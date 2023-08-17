const generateColorClass = (variable) => {
  return ({ opacityValue }) =>
    opacityValue
      ? `rgba(var(--${variable}), ${opacityValue})`
      : `rgb(var(--${variable}))`
}

const textColor = {
  primary: generateColorClass('text-primary'),
}

const backgroundColor = {
  primary: generateColorClass('bg-primary'),
  secondary: generateColorClass('bg-secondary'),
  tertiary: generateColorClass('bg-tertiary'),
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {

      },
      fontSize: {
        0: ["0px", "0px"],
        h1: [
          "4rem",
          {
            lineHeight: "4.5rem",
            fontWeight: "600",
            letterSpacing: "-0.01em",
          },
        ],
        h2: [
          "3rem",
          {
            lineHeight: "3.5rem",
            fontWeight: "600",
            letterSpacing: "-0.01em",
          },
        ],
        h3: [
          "2.5rem",
          {
            lineHeight: "3rem",
            fontWeight: "600",
            letterSpacing: "-0.01em",
          },
        ],
        h4: [
          "2rem",
          {
            lineHeight: "2.5rem",
            fontWeight: "600",
            letterSpacing: "-0.01em",
          },
        ],
        h5: [
          "1.5rem",
          {
            lineHeight: "2rem",
            fontWeight: "600",
            letterSpacing: "-0.01em",
          },
        ],
        h6: [
          "1.25rem",
          {
            lineHeight: "1.5rem",
            fontWeight: "600",
            letterSpacing: "-0.01em",
          },
        ],
      },
      textColor,
      backgroundColor,
      colors: {
        primary: generateColorClass('primary'),
        bg: {
          ...backgroundColor
        },
        text: {
          ...textColor
        },
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}

