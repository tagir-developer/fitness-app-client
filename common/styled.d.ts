import 'styled-components';
declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: string;
    marginBottom: string;
    width: string;

    shadow: {
      // ios shadow
      shadowColor: string;
      shadowOffset: {
        width: number;
        height: number;
      };
      shadowOpacity: number;
      shadowRadius: number;
      // android shadow
      elevation: number;
    };

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
