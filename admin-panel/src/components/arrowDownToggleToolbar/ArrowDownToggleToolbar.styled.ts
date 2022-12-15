import { IconButton, styled } from "@mui/material";
import theme from "../../globalStyles/theme";

const BottomToolbarStyled = styled(IconButton)(() => ({
  [theme.breakpoints.up("lg")]: {
    display: "none",
  },
  [theme.breakpoints.down("lg")]: {
    marginLeft: "auto",
    color: "#000",
    display: "block",
  },
}));
export default BottomToolbarStyled;
