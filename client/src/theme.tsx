import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { createContext, useMemo, useState } from "react";




export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default function ToggleColorMode({children}: {children: React.ReactNode}) {
    const [mode, setMode] = useState<'light' | 'dark'>(localStorage.getItem('theme') === 'dark' ? 'dark' : 'light');
    const colorMode = useMemo(
      () => ({
        toggleColorMode: () => {
          setMode((prevMode) => {
            localStorage.setItem('theme', prevMode === 'light' ? 'dark' : 'light');
            return prevMode === 'light' ? 'dark' : 'light'
        });
        },
      }),
      [],
    );
  
    const theme = useMemo(
      () =>
        createTheme({
          palette: {
            mode,
            primary: {
              main: '#388e3c',
            },
            secondary: {
              main: '#094d92',
            },
          },
        }),
      [mode],
    );
  
    return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
         {children}
        </ThemeProvider>
      </ColorModeContext.Provider>
    );
  }