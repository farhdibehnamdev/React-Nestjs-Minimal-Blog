import { createTheme } from "@mui/material";
import "./font.theme.css";

const theme = createTheme({
  direction: "rtl",
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
