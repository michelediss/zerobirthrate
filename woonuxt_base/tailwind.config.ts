import type { Config } from 'tailwindcss';
const colors = require('./tailwindConf/colorPalette/colorPalette-1.json');

import { generateResponsiveBaseFontSize, generateTypographicScale } from './typography';
import { addGoogleFontsLink } from './fonts';

const fontFamily = require('./tailwindConf/fontPairing/fontFamily-1.json');
const typographyConfig = require('./tailwindConf/typographyConfig.json');

if (typeof document !== "undefined") {
  addGoogleFontsLink(fontFamily.url[0]);
}

const responsiveBaseFontSize = generateResponsiveBaseFontSize(typographyConfig.responsiveBaseFontSize.baseSize, typographyConfig.responsiveBaseFontSize.incrementFactor);
const customFontSizeScale = generateTypographicScale(typographyConfig.customFontSizeScale.f0, typographyConfig.customFontSizeScale.r, typographyConfig.customFontSizeScale.n, typographyConfig.customFontSizeScale.count);


export default <Partial<Config>>{
  content: [
    './public/**/*.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './components/**/*.{js,vue,ts}', 
    './layouts/**/*.vue', 
    './pages/**/*.vue', 
    './plugins/**/*.{js,ts}', 
    './nuxt.config.{js,ts}', 
    './app.vue'
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
        // primary: {
        //   light: '#AE7DDD',
        //   DEFAULT: process.env.PRIMARY_COLOR || '#7F54B2',
        //   dark: '#754fa3',
        // },
      },
      fontFamily: {
        'primary': fontFamily.primary,
        'primary-weight': fontFamily.primaryWeight,
        'primary-height': fontFamily.primaryHeight,
        'secondary': fontFamily.secondary,
        'secondary-weight': fontFamily.secondaryWeight,
        'secondary-height': fontFamily.secondaryHeight,
      },
      fontSize: {
        ...generateTypographicScale(typographyConfig.customFontSizeScale.f0, typographyConfig.customFontSizeScale.r, typographyConfig.customFontSizeScale.n, typographyConfig.customFontSizeScale.count)
      },
      screens: {
        '2xl': '1400px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    function({ addBase }) {
      addBase(generateResponsiveBaseFontSize(typographyConfig.responsiveBaseFontSize.baseSize, typographyConfig.responsiveBaseFontSize.incrementFactor));
    },
    function({ addUtilities, theme }) {
      const newFontUtilities = {
        '.font-primary': {
          fontFamily: theme('fontFamily.primary').toString(),
          fontWeight: theme('fontFamily.primary-weight').toString(),
          lineHeight: theme('fontFamily.primary-height').toString(),
        },
        '.font-secondary': {
          fontFamily: theme('fontFamily.secondary').toString(),
          fontWeight: theme('fontFamily.secondary-weight').toString(),
          lineHeight: theme('fontFamily.secondary-height').toString(),
        },
      };
      addUtilities(newFontUtilities, ['responsive']);
    },
  ],
};
