import { SxProps } from "@mui/material";

const sidebarStyle: SxProps = {
  ".logoWrapper": {
    display: "felx",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "20px",
    ".logo": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  ".boxProfileSidebar": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginBottom: "20px",
    gap: "10px",
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
  },
};

export default sidebarStyle;
