import { Box, styled, Toolbar } from "@mui/material";

const ToolbarBottomStyled = styled(Toolbar)(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    ".gridSearchBoxToolbarBottomStyle": {
      display: "none",
    },
    ".boxContainerMenuIconsStyle": {
      display: "none",
    },
  },
  [theme.breakpoints.down("lg")]: {
    display: "flex",
    paddingLeft: 25,
    paddingRight: 25,
    borderBottom: "1px solid #c3c3c3",
    borderTop: "1px solid #ebebeb",
    ".boxHeaderMenuIconStyle": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "8px",
      background: "#fff",
      borderRadius: "4px",
    },
    ".boxContainerMenuIconsStyle": {
      marginLeft: "auto",
    },
    ".headerIconButtonStyle": {
      display: "flex",
      justifyContent: "space-between",
      gap: "20px",
    },
    ".gridSearchBoxToolbarBottomStyle": {
      display: "block",
      ".textFieldHeaderInputPropsStyle": {
        background: "#fafafa",
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
    },
  },
}));

export default ToolbarBottomStyled;
