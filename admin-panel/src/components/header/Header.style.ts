import { styled, Toolbar, SxProps, IconButton } from "@mui/material";
import { OpenProps } from "../common/CommonPorps";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import FullscreenOutlinedIcon from "@mui/icons-material/FullscreenOutlined";

const drawerWidth = 240;

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
    [theme.breakpoints.down("lg")]: {
      width: "100%",
    },
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
  [theme.breakpoints.down("lg")]: {
    width: "100%",
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

const headerStyle: SxProps = {
  position: "fixed",
  textAlign: "right",
  background: "none",
  boxShadow: "none",
  marginTop: "10px",
  ".toolbarStyle": {
    display: "flex",
    alignItems: "center",
    gap: "30px",
    ".gridSearchBoxStyle": {
      marginLeft: -1,
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
    ".textFieldHeaderStyle": {
      background: "#fff",
      outline: 0,
      margin: 0,
      borderRadius: "5px",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
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
};

export default headerStyle;
