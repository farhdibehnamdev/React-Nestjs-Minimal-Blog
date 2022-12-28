import { styled, Toolbar, IconButton, Box } from "@mui/material";
import { OpenProps } from "../common/CommonPorps";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";

const drawerWidth = 240;
const headerStyleStatus = {
  marginTop: 0,
  background: "#fff",
  padding: "10px 0px 0px 0px",
  boxShadow: "1px 2px 10px 0px rgba(0,0,0,0.1)",
  ".gridSearchBoxStyle": {
    display: "none",
  },
};
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),

  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.down("lg")]: {
      ...headerStyleStatus,
      width: "100% !important",
      marginLeft: 0,
    },
  }),
  ...(!open && {
    [theme.breakpoints.down("lg")]: {
      ...headerStyleStatus,
    },
  }),
  position: "fixed",
  textAlign: "right",
  background: "none",
  boxShadow: "none",
  marginTop: "10px",
  WebkitTransition: "right .2s",
  ".toolbarStyle": {
    display: "flex",
    alignItems: "center",
    gap: "30px",
    ".gridSearchBoxStyle": {
      marginLeft: -1,
      ".textFieldHeaderStyle": {
        background: "#fff",
        outline: 0,
        margin: 0,
        borderRadius: "5px",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
      },
    },
    ".boxHeaderMenuIconStyle": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "8px",
      background: "#fff",
      borderRadius: "4px",
    },
    ".textFieldHeaderInputPropsStyle": {
      background: "#fff",
      borderRadius: "5px",
      height: 40,
      width: "30vw",
    },

    ".boxContainerMenuIconsStyle": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginLeft: "auto",
      ".headerIconButtonStyle": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
        ".headerIconButtonSizeStyle:hover": {
          color: "#004deb",
        },
      },
    },
  },
}));

export const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
  ".arrowDownIconStyle": {
    display: "none",
  },
  [theme.breakpoints.down("lg")]: {
    width: "100%",
    ".boxContainerMenuIconsStyle": {
      display: "none !important",
    },
  },
}));

export const HamburgerMenuStyled = styled(IconButton)<OpenProps>(
  ({ theme, open }) => ({
    ".menuIconHeaderColorStyle": {
      color: open ? "#000" : "#004deb",
    },
    ...(!open && {
      [theme.breakpoints.up("lg")]: {
        marginLeft: "65px",
      },
    }),
    ...(open && {
      [theme.breakpoints.up("lg")]: {
        marginLeft: 0,
      },
    }),

    [theme.breakpoints.down("lg")]: {
      marginLeft: 0,
    },
  })
);
