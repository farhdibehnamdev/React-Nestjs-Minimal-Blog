import { SxProps } from "@mui/material";

export const CardMessageStyle: SxProps = {
  maxWidth: "300px",
  position: "absolute",
  willChange: "transform",
  top: 0,
  right: "100px",
  transform: " translate3d(0px, 55px, 0px)",
  ".gooz": {
    position: "relative",
  },
  ".gooz::after": {
    content: "''",
    background: "rgba(255, 255, 255, 0.8)",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
};
