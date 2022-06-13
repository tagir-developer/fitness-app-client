import { DefaultTheme } from 'styled-components';

const myTheme: DefaultTheme = {
  borderRadius: '5px',
  marginBottom: '20px',
  width: '75%',

  shadow: {
    // ios shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    // android shadow
    elevation: 12,
  },

  fonts: {
    light: 'roboto-light',
    normal: 'roboto',
    bold: 'roboto-bold',
  },

  colors: {
    primary: 'cyan',
    secondary: 'magenta',
    primaryText: '#1E1E1E',
    secondaryText: '#3F3F3F',
    danger: 'red',
    accent: '#265BAA',
    empty: '#B7B7B7',
  },
};

export { myTheme };
