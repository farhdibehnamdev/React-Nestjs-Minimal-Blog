import { IconButton, styled } from "@mui/material";

const IconButtonStyled = styled(IconButton, {
  shouldForwardProp: (props) => props !== "colorIcon",
})<any>((p) => ({
  width: "24px",
  height: "24px",
  color: p.colorIcon ? "#004deb" : "#000",
}));

export default IconButtonStyled;
