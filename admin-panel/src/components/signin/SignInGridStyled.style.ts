import { SxProps } from "@mui/material";

export const SigninGridStyle: SxProps = {
  background: "#fff",
  padding: "40px",
  borderRadius: "10px",
  width: "500px",
  ".formSignInStyle": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "30px",
    ".GridInsideFormStyle": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "24px",
    },
  },
};
