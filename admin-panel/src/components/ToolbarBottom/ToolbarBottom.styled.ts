import { styled, Toolbar } from "@mui/material";

const ToolbarBottomStyled = styled(Toolbar)(({ theme }) => ({
  [theme.breakpoints.down("lg")]: {
    padding: 0,
    margin: 0,
    borderBottom: "1px solid #000",
    ".gridSearchBoxStyle": {
      display: "block",
    },
  },
}));

export default ToolbarBottomStyled;
