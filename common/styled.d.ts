import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: string;
    marginBottom: string;
    width: string;

    fonts: {
      light: string;
      normal: string;
      bold: string;
    };

    colors: {
      primary: string;
      secondary: string;
      primaryText: string;
      danger: string;
      accent: string;
      empty: string;
    };
  }
}
