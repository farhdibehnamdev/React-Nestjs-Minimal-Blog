import { createTheme } from "@mui/material";

const theme = createTheme({
  direction: "rtl",
  // typography: {
  //   allVariants: {
  //     fontFamily: "IRANYekan",
  //     textTransform: "none",
  //     fontSize: 13.36,
  //   },
  //   subtitle1: {
  //     fontSize: 14,
  //   },
  //   body: {
  //     fontFamily: "Poppins",
  //     fontSize: 15,

  //     fontWeight: "bold",
  //   },
  // },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          fontFamily: "IRANYekan",
          textTransform: "none",
          fontSize: 16,
        },
        body: {
          fontFamily: "IRANYekan",
          fontSize: 16,
          fontWeight: "bold",
        },
      },
    },
  },
});

export default theme;
