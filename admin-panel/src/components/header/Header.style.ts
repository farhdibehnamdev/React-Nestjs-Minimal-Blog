import { Toolbar, SxProps, AppBar, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";

export const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
  [theme.breakpoints.down("lg")]: {
    width: "100%",
  },
}));

export const IconButtonStyled = styled(IconButton)(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    marginLeft: "40px",
  },
  [theme.breakpoints.down("lg")]: {
    marginLeft: 0,
  },
}));

const headerStyle: SxProps = {
  position: "fixed",
  textAlign: "right",
  background: "none",
  boxShadow: "none",
  marginTop: "10px",
  ".toolbarStyle": {
    display: "flex",
    alignItems: "center",
    gap: "30px",

    ".boxHeaderMenuIconStyle": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "8px",
      background: "#fff",
      borderRadius: "4px",
      ".menuIconHeaderColorStyle": {
        color: "#000",
      },
    },
    ".textFieldHeaderInputPropsStyle": {
      background: "#fff",
      borderRadius: "5px",
      height: 40,
      width: "30vw",
    },
    ".textFieldHeaderStyle": {
      background: "#fff",
      outline: 0,
      margin: 0,
      borderRadius: "5px",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
    },
    ".boxContainerMenuIconsStyle": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginLeft: "auto",
      ".headerIconButtonStyle": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
        ".headerIconButtonSizeStyle": {
          color: "#000",
          width: "24px",
          height: "24px",
        },
      },
    },
  },
};

export default headerStyle;
