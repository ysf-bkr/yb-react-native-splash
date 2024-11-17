/**
 * Default YB logo SVG içeriği
 */
const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect width="200" height="200" fill="#FFFFFF"/>
  <circle cx="100" cy="100" r="90" fill="#3498DB"/>
  <text x="100" y="120" 
        font-family="Arial" 
        font-size="60" 
        fill="white" 
        text-anchor="middle"
        dominant-baseline="middle">
    YB
  </text>
</svg>
`;

/**
 * Base64 formatında kodlanmış SVG içeriği
 */
export const defaultLogoBase64 = `data:image/svg+xml;base64,${btoa(svgContent)}`;

/**
 * Base64 stringi'ni Image source formatına çevirir
 * @param base64 - Base64 formatında resim verisi
 * @returns React Native Image source objesi
 */
export const createImageFromBase64 = (base64: string) => {
  return { uri: base64 };
};

/**
 * Varsayılan logo renkleri
 */
export const defaultLogoColors = {
  background: '#FFFFFF',  // Arka plan rengi
  circle: '#3498DB',     // YB logosu daire rengi
  text: '#FFFFFF'        // YB yazı rengi
};

/**
 * Logo boyut ve oranları
 */
export const defaultLogoSize = {
  container: {
    width: 200,
    height: 200,
  },
  circle: {
    radius: 90
  },
  text: {
    size: 60,
    family: 'Arial'
  }
};