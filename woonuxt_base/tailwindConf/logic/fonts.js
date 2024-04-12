// fonts.js
function addGoogleFontsLink(url) {
    const link = document.createElement('link');
    link.href = url;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }
  
  module.exports = { addGoogleFontsLink };
  