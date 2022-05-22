import { DefaultTheme } from 'styled-components';

const myTheme: DefaultTheme = {
  borderRadius: '5px',
  marginBottom: '20px',
  width: '75%',

  fonts: {
    light: 'roboto-light',
    normal: 'roboto',
    bold: 'roboto-bold',
  },

  colors: {
    primary: 'cyan',
    secondary: 'magenta',
    primaryText: '#1E1E1E',
    danger: 'red',
    accent: '#265BAA',
    empty: '#B7B7B7',
  },
};

export { myTheme };
