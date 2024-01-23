import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      foreground: string;
      accent: string;
      highlight: string;
      border: string;
    };
    fonts: {
      primary: string;
      secondary: string;
    };
    breakpoints: {
      mobile: number;
      tablet: number;
      desktop: number;
    };
  }
}

