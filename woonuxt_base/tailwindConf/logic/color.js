import chroma from 'chroma-js';

function generateColorScales(colorInput) {
  const hue = chroma(colorInput).get('hsl.h');
  const complementHue = (hue + 180) % 360;
  
  let primaryScale = {}, secondaryScale = {}, grayscale = {};

  for (let i = 1; i <= 9; i++) {
    // Inverte la scala di luminosità: 100 è il più chiaro, 900 il più scuro
    const lightness = 1 - (i / 10);

    primaryScale[`primary-${i}00`] = chroma.hsl(hue, chroma(colorInput).get('hsl.s'), lightness).hex();
    secondaryScale[`secondary-${i}00`] = chroma.hsl(complementHue, chroma(colorInput).get('hsl.s'), lightness).hex();
    grayscale[`gray-${i}00`] = chroma.hsl(hue, 0.1, lightness).hex();
  }

  return { primaryScale, secondaryScale, grayscale };
}

// Esempio di utilizzo
let colorInput = "#007bff"; // Blu
let { primaryScale, secondaryScale, grayscale } = generateColorScales(colorInput);

console.log("Primary Scale:", primaryScale);
console.log("Secondary Scale:", secondaryScale);
console.log("Grayscale:", grayscale);