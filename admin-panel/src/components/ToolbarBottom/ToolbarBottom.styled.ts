import { Box, styled, Toolbar } from "@mui/material";

const ToolbarBottomStyled = styled(Toolbar)(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    ".gridSearchBoxStyle": {
      display: "none",
    },
  },
  [theme.breakpoints.down("lg")]: {
    display: "flex",
    paddingLeft: 25,
    paddingRight: 25,
    borderBottom: "1px solid #000",
    borderTop: "1px solid #000",
    margin: 0,
    ".boxContainerMenuIconsStyle": {
      marginLeft: "auto",
    },
    ".headerIconButtonStyle": {
      display: "flex",
      justifyContent: "space-between",
      gap: "20px",
    },
    ".gridSearchBoxStyle": {
      display: "block",
    },
  },
}));

export default ToolbarBottomStyled;
