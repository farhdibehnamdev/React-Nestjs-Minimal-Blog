import { SxProps, Theme } from "@mui/material";
import { styled } from "@mui/material/styles";

const sidebarStyle: SxProps<Theme> = {
  ".boxProfileSidebar": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginBottom: "20px",
    gap: "10px",
    ".profileStyleIconButton": {
      boxShadow: "none",
      padding: "10px 15px",
      borderRadius: "4px",
    },
    ".personIconButton": {
      background: "rgba(34, 185, 255, 0.3)",
    },
    ".settingIconButton": {
      background: "rgba(16, 183, 89, 0.3)",
    },
    ".exitIconButton": {
      background: "rgba(255, 63, 63, 0.3)",
    },
    ".avatar": {
      width: "56px",
      height: "56px",
    },
  },
  h5: {
    fontSize: "15px",
  },
  ".typographyUserRoleSpan": {
    color: "#a7abc3",
    marginTop: "0px",
    marginBottom: "10px",
  },
  ".menuList": {
    paddingLeft: "10px",
    ".listStyleItemButton": {
      minHeight: 48,
      px: 2.5,
      marginRight: "10px",
      ".listStyleItemIcon": {
        minWidth: 0,
        justifyContent: "center",
      },
    },
  },
};

export default sidebarStyle;
