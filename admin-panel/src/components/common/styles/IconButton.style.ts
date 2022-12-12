import { IconButton, styled } from "@mui/material";

const IconButtonStyled = styled(IconButton)<any>(({ colorIcon }: any) => ({
  width: "24px",
  height: "24px",
  color: colorIcon ? "#004deb" : "#000",
}));

export default IconButtonStyled;
