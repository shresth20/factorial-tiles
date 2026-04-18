export const THEMES = {
  blue: {
    squareBg: '#3B5BFF',
    squareText: '#ffffff',
    varBg: '#A8B8FF',
    varText: '#11215E',
    accent: '#3B5BFF',
    labelBg: '#E6EBFF',
    labelText: '#11215E'
  },
  coral: {
    squareBg: '#FF5A43',
    squareText: '#ffffff',
    varBg: '#FFB3A4',
    varText: '#5E1608',
    accent: '#FF5A43',
    labelBg: '#FFE4DD',
    labelText: '#5E1608'
  },
  yellow: {
    squareBg: '#FFB020',
    squareText: '#3B2300',
    varBg: '#FFD97A',
    varText: '#4E3100',
    accent: '#FFB020',
    labelBg: '#FFF0CC',
    labelText: '#4E3100'
  },
  violet: {
    squareBg: '#7A57FF',
    squareText: '#ffffff',
    varBg: '#C9B8FF',
    varText: '#24105E',
    accent: '#7A57FF',
    labelBg: '#EDE6FF',
    labelText: '#24105E'
  },
  teal: {
    squareBg: '#12B5A6',
    squareText: '#ffffff',
    varBg: '#8AE5DC',
    varText: '#0A4A43',
    accent: '#12B5A6',
    labelBg: '#D6F5F1',
    labelText: '#0A4A43'
  },
  pink: {
    squareBg: '#F04A9A',
    squareText: '#ffffff',
    varBg: '#FBB3D2',
    varText: '#5E1540',
    accent: '#F04A9A',
    labelBg: '#FCDCE9',
    labelText: '#5E1540'
  },
  lime: {
    squareBg: '#57C738',
    squareText: '#ffffff',
    varBg: '#BDE9B0',
    varText: '#1C4A10',
    accent: '#57C738',
    labelBg: '#E1F5DA',
    labelText: '#1C4A10'
  }
};

export function getTheme(name) {
  return THEMES[name] || THEMES.blue;
}
