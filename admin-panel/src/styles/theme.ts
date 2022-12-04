import { createTheme } from "@mui/material";
import "./font.theme.css";

const theme = createTheme({
  direction: "rtl",
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    background: {
      default: "#f1f2f7",
    },
  },

  typography: {
    allVariants: {
      fontFamily: "IRANYekan,tahoma",
      textTransform: "none",
      fontSize: 14,
      fontWeight: "bold",
    },

    body1: {
      fontFamily: "IRANYekan,tahoma",
      fontSize: 14,
      fontWeight: "bold",
      color: "#505050",
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          border: "none",
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "13px",
          fontFamily: "IRANYekan,tahoma",
          opacity: 0.2,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          ":hover": {
            background: "none",
          },
        },
      },
    },

    MuiCssBaseline: {
      styleOverrides: {
        html: {
          fontFamily: "IRANYekan,tahoma",
          textTransform: "none",
          fontSize: 14,
        },
        body: {
          fontFamily: "IRANYekan,tahoma",
          fontSize: 14,
          fontWeight: "bold",
        },
      },
    },
  },
});

export default theme;
