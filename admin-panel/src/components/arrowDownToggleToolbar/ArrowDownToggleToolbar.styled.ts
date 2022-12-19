import { IconButton, styled } from "@mui/material";

const ArrowDownToggleToolbarStyled = styled(IconButton)(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    display: "none",
  },
  [theme.breakpoints.down("lg")]: {
    marginLeft: "auto",
    color: "#000",
    display: "block",
  },
}));
export default ArrowDownToggleToolbarStyled;
