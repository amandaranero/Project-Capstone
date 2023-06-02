import darkScrollbar from '@mui/material/darkScrollbar';
import { createTheme } from '@mui/material/styles';
import { purple } from '@mui/material/colors'

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
          main: '#ffe0b2',
        },
        secondary: {
          main: '#72cff8',
        },
        text: {
          secondary: 'rgba(24,22,22,0.6)',
        },
    },
  components: {
    MuiCssBaseline: {
      styleOverrides: (themeParam) => ({
        body: themeParam.palette.mode === 'dark' ? darkScrollbar() : null,
      }),
    },
  },
});

export default theme
