import { createTheme, ThemeProvider } from "@mui/material";

export const customContainer = createTheme({
    components: {
        MuiContainer: {
            styleOverrides: {
                root: {
                    "&.MuiContainer-maxWidthXl": {
                        maxWidth: "1800px",
                    }
                }
            }
        }
    }
});

export const eventDetailContainer = createTheme({
    components: {
        MuiContainer: {
            styleOverrides: {
                root: {
                    "&.MuiContainer-maxWidthXl": {
                        maxWidth: "1600px",
                    }
                }
            }
        }
    }
});