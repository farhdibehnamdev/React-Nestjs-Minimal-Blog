import { Badge, Box, CSSObject, SxProps, Theme } from "@mui/material";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import { OpenProps } from "../common/CommonPorps";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("lg")]: {
    width: `calc(${theme.spacing(10)} + 1px)`,
  },
});

export const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export const DrawerHeader = styled("div")<OpenProps>(({ theme, open }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(0, 1),
  background: "#fff",
  marginBottom: "20px",

  ...theme.mixins.toolbar,
  [theme.breakpoints.up("lg")]: {
    ...(!open && {
      opacity: 0,
    }),
    ...(open && {
      opacity: 1,
    }),
  },
}));

export const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
  ".boxUserInfoStyle": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "15px",
  },
  ".dividerProfileStyle": {
    display: "none",
  },
  [theme.breakpoints.up("lg")]: {
    ...(!open && {
      ".logoWrapper": {
        display: "none",
      },
      ".boxUserInfoStyle": {
        // opacity: 0,
        display: "none !important",
      },
      ".dividerProfileStyle": {
        display: "block !important",
      },
      ".listStyleItemButton.menuSelected": {
        ".listStyleItemIcon": {
          backgroundColor: " #004deb",
          padding: " 15px",
          borderRadius: "10px",
          color: "white",
        },
      },
      ".listStyleItemButton.menuSelected:before": {
        display: "none",
      },
      ".menuList": {
        ".listStyleItemButton": {
          marginLeft: "-5px",
        },
      },
    }),
  },
}));

export const BoxRootSidebarStyled = styled(Box)<OpenProps>(
  ({ theme, open }) => ({
    [theme.breakpoints.down("lg")]: {
      ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-root": {
          display: "block !important",
          "& .MuiDrawer-paper": {
            width: "240px",
            display: "block",
            zIndex: 999999,
          },
        },
      }),
      ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-root": {
          display: "none",
          zIndex: 999999,
        },
      }),
    },
  })
);

const sidebarStyle: SxProps = {
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
    ".listStyleItemButton": {
      minHeight: 48,
      px: 2.5,
      marginRight: "10px",
      paddingLeft: "33px",
      width: "100%",
      ".listStyleItemIcon": {
        minWidth: 0,
        justifyContent: "center",
      },
    },
    ".listStyleItemButton.menuSelected": {
      ".menuName span": {
        color: "#004deb",
      },
    },
    ".listStyleItemButton.menuSelected:before": {
      content: "''",
      height: "80%",
      background: "#004deb",
      width: "3%",
      color: "#004deb",
      position: "absolute",
      left: 0,
      borderRadius: "15px",
    },
  },
};

export default sidebarStyle;
