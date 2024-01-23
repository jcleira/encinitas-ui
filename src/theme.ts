import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#09feee', // Electric Teal
    },
    secondary: {
      main: '#067d97', // Deep Teal
    },
    background: {
      default: '#000000', // Black for the background
    },
    text: {
      primary: '#ffffff', // White for text
    },
    error: {
      main: '#f44336', // You can set this to any color you wish
    },
    warning: {
      main: '#ff9800', // You can set this to any color you wish
    },
    info: {
      main: '#2196f3', // You can set this to any color you wish
    },
    success: {
      main: '#4caf50', // You can set this to any color you wish
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif', // Sets default font family
    // You could add more specific typography settings here as needed
  },
  components: {
    // You can customize specific components here as needed
  },
  breakpoints: {
    values: {
      xs: 0, // small phone
      sm: 600, // phone
      md: 900, // tablet
      lg: 1200, // small laptop
      xl: 1536, // desktop
    },
  },
});

export default theme;

