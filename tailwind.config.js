/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // primary: '#000000',
        // secondary: '#000000',
        blue: '#0087FF',
        red: '#FF0043',
        green: '#00C870',
        toastBg: '#7E838A',
        // grayBgText: '#475A6B',
        mainText: '#151F2A',
        subText: '#8695A3',
        // accentText: '#EB5757',
        buttonText: '#FFFFFF',
        bg: '#ffffff',
        secondaryBg: '#f2f4f6',
      },
      fontFamily: {
        pretendard: ['Pretendard', 'sans-serif'],
        pretendardMedium: ['Pretendard-Medium', 'sans-serif'],
        pretendardBold: ['Pretendard-Bold', 'sans-serif'],
      },
    },
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  corePlugins: {
    preflight: true,
  },
};
