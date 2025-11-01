export const theme = {
  primary: '#2A3A6B',     
  primaryDark: '#1C2B4E',  
  secondary: '#8BC34A',    
  secondaryDark: '#689F38', 
  accent: '#FBC02D',        
  text: '#FFFFFF',
  textLight: '#E0E0E0',
  textMuted: '#A0A0A0',
};

export const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};