const onPrimary = '#fff';

function hexToRgba(hex: string, opacity: number = 1) {
  // Remove leading #
  hex = hex.replace(/^#/, '');

  // Handle shorthand (#fff -> #ffffff)
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map(c => c + c)
      .join('');
  }

  if (hex.length !== 6) {
    throw new Error('Invalid HEX color.');
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

const COLORS = {
  primaryColor: '#57c785',
  // $primary: linear-gradient(90deg, rgba(87, 199, 133, 1) 0%, rgba(93, 212, 143, 1) 100%);

  onPrimary,
  onPrimaryContainer: hexToRgba(onPrimary, 0.4),
  onPrimaryLight: hexToRgba(onPrimary, 0.8),

  accent: '#252525',
  accentLight: '#cdcdcd',
  surface: '#f0f0f0',
  surfaceDark: '#dfdfdf',
  onSurfaceDark: '#333',
  surfaceLight: '#fff',

  gray: '#999',
  errorAccent: 'rgb(194, 29, 29)',
  backdropBg: hexToRgba('#000', 0.4),
};

export default COLORS;
