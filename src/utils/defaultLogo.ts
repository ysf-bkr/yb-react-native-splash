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

export const defaultLogoBase64 = `data:image/svg+xml;base64,${btoa(svgContent)}`;

export const createImageFromBase64 = (base64: string) => {
  return { uri: base64 };
};

export const defaultLogoColors = {
  background: '#FFFFFF',
  circle: '#3498DB',
  text: '#FFFFFF'
};