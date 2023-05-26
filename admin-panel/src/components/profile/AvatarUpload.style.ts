import { SxProps } from "@mui/material";

export const avatarWrapper: SxProps = {
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  transition: "background ease-out 200ms",
  ".uploadButton": {
    position: "absolute",
    background: "grey",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    cursor: "pointer",
    bottom: "20%",
    right: "65%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow:
      "0px 3px 5px -1px rgba(0, 0, 0, 0.2) 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)",
    transition: "background-color ease-out 120ms",
  },
  ".profile-pic": {
    width: "120px",
    height: "120px",
    border: "2px solid grey",
  },
  ".file-upload": {
    bottom: "0%",
    rigth: "50%",
    opacity: 0,
    width: "100%",
    height: "100%",
  },
};
