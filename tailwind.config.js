/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors:{
        primary:'#FE8C00',
        white:{
          DEFAULT:'#ffffff',
          100:'#fafafa',
          200:'FE8C00',
        },
        
        red:{
          100:'#FF3B30',
        },
        green:{
          100:'#34C759',
        },
        gray:{
          100:'#878787',
          200:'#878787',
          300:'#F2F2F2',
        },
        dark:{
          100:'181C2E',
        },
        orange:{
          100:'#FF9500',
        },
        error:'#F14141',
        success:'#2F9B65',
      },

      fontFamily:{
        Quicksand:['Quicksand-Regular','sans-serif'],
        QuicksandBold:['Quicksand-Bold','sans-serif'],
        QuicksandMedium:['Quicksand-Medium','sans-serif'],
        QuicksandSemiBold:['Quicksand-SemiBold','sans-serif'],
        QuicksandLight:['Quicksand-Light','sans-serif'],
      },
    },
  },
  plugins: [],
};