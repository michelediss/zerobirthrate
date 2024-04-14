// Importazioni necessarie
const fontFamily = require('./tailwindConf/fontPairing/fontFamily-1.json');
const colors = require('./tailwindConf/colorPalette/colorPalette-1.json');
const typographyConfig = require('./tailwindConf/typographyConfig.json'); // Adjust the path as necessary


// This function dynamically adds the Google Fonts link to the document's head
function addGoogleFontsLink(url) {
  const link = document.createElement('link');
  link.href = url;
  link.rel = 'stylesheet';
  document.head.appendChild(link);
}

// Call the function with the URL from your JSON file
if (typeof document !== "undefined") { // Check if document is defined to avoid errors in environments without a DOM
  addGoogleFontsLink(fontFamily.url[0]);
}


//--- incrementi base font
function generateResponsiveBaseFontSize(baseSize, incrementFactor, customBreakpoints = {}) {
  const defaultBreakpoints = {
    'sm': '640px',
    'md': '768px',
    'lg': '1024px',
    'xl': '1280px',
    '2xl': '1536px',
  };
  const breakpoints = { ...defaultBreakpoints, ...customBreakpoints };
  let responsiveBaseFontSize = {
    'html': { fontSize: `${baseSize}px` },
  };

  Object.entries(breakpoints).forEach(([key, value], index) => {
    let size = baseSize * Math.pow(incrementFactor, index + 1);
    size = Math.round(size * 100) / 100;
    responsiveBaseFontSize[`@media (min-width: ${value})`] = {
      'html': { fontSize: `${size}px` },
    };
  });

  return responsiveBaseFontSize;
}

// Generate the responsiveBaseFontSize using values from the JSON
const responsiveBaseFontSize = generateResponsiveBaseFontSize(typographyConfig.responsiveBaseFontSize.baseSize, typographyConfig.responsiveBaseFontSize.incrementFactor);


//--- scala tipografica
function generateTypographicScale(f0, r, n, count) {
    const scaleNamesAboveBase = ['base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl'];
    const scaleNamesBelowBase = ['xs', 'sm'];
    let scale = {};

    for (let i = 0; i <= count; i++) {
        let size = f0 * Math.pow(r, i);
        size = Math.round(size * 100) / 100;
        let scaleName = scaleNamesAboveBase[i] ? scaleNamesAboveBase[i] : `scale-${i + 1}`;
        scale[scaleName] = `${size}rem`;
    }

    for (let i = 1; i <= scaleNamesBelowBase.length; i++) {
        let size = f0 / Math.pow(r, i);
        size = Math.round(size * 100) / 100;
        scale[scaleNamesBelowBase[scaleNamesBelowBase.length - i]] = `${size}rem`;
    }

    return scale;
}

const customFontSizeScale = generateTypographicScale(typographyConfig.customFontSizeScale.f0, typographyConfig.customFontSizeScale.r, typographyConfig.customFontSizeScale.n, typographyConfig.customFontSizeScale.count);

module.exports = {
  content: [
    './public/**/*.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontSize: customFontSizeScale,
      colors: colors,
      fontFamily: {
        'primary': fontFamily.primary,
        'primary-weight': fontFamily.primaryWeight,
        'primary-height': fontFamily.primaryHeight,
        'secondary': fontFamily.secondary,
        'secondary-weight': fontFamily.secondaryWeight,
        'secondary-height': fontFamily.secondaryHeight,
      },
    },
  },
  plugins: [
    function({ addBase }) {
      addBase(responsiveBaseFontSize);
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
