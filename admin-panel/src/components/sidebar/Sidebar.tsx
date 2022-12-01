import * as React from "react";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import { Avatar, Badge, Divider, Stack } from "@mui/material";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import sidebarStyle from "./Sidebar.style";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { SidebarProps } from "./SidebarProps";
import { useSelector } from "react-redux";

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

const StyledBadge = styled(Badge)(({ theme }) => ({
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

const DrawerHeader = styled("div")<BoxRootSidebarStyledProps>(
  ({ theme, open }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(0, 1),
    background: "#fff",
    marginBottom: "20px",

    // ".logo": {
    //   display: "flex",
    //   justifyContent: "center",
    //   alignItems: "center",
    // },
    ...theme.mixins.toolbar,
    [theme.breakpoints.up("lg")]: {
      ...(!open && {
        opacity: 0,
      }),
      ...(open && {
        opacity: 1,
      }),
    },
  })
);

const Drawer = styled(MuiDrawer, {
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
    }),
  },
}));
interface BoxRootSidebarStyledProps {
  open?: boolean;
}
const BoxRootSidebarStyled = styled(Box)<BoxRootSidebarStyledProps>(
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

const menuNamesAndIcons: SidebarProps[] = [
  { menuTitle: "داشبورد", menuIconMUI: <DashboardOutlinedIcon /> },
  { menuTitle: "پست ها", menuIconMUI: <FormatListBulletedOutlinedIcon /> },
  { menuTitle: "تگ ها", menuIconMUI: <LocalOfferOutlinedIcon /> },
  { menuTitle: "ارسال پیام", menuIconMUI: <EmailOutlinedIcon /> },
  { menuTitle: "مدیریت کاربران", menuIconMUI: <ManageAccountsOutlinedIcon /> },
  { menuTitle: "خروج", menuIconMUI: <LogoutIcon /> },
];

export default function Sidebar() {
  const { toggle } = useSelector((state: any) => state.toggle);

  return (
    <BoxRootSidebarStyled
      sx={{
        display: { lg: "block" },
      }}
      open={toggle}
    >
      <Drawer
        variant="permanent"
        ModalProps={{ keepMounted: true }}
        open={toggle}
        sx={sidebarStyle}
      >
        <DrawerHeader open={toggle}>
          <img src="/assets/images/logo.png" alt="logo" />
        </DrawerHeader>
        <Box className="boxProfileSidebar">
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            variant="dot"
          >
            <Avatar
              className="avatar"
              alt="Remy Sharp"
              src="/assets/images/avatar.jpg"
            />
          </StyledBadge>
          <Box className="boxUserInfoStyle">
            <Typography className="typographyName" component="h5">
              جان اسنو
            </Typography>
            <Typography component="span" className="typographyUserRoleSpan">
              مدیر
            </Typography>
            <Stack direction="row" spacing={2}>
              <IconButton
                className="profileStyleIconButton personIconButton"
                size="small"
              >
                <Person2OutlinedIcon fontSize="inherit" />
              </IconButton>
              <IconButton
                className="profileStyleIconButton settingIconButton"
                size="small"
              >
                <SettingsOutlinedIcon fontSize="inherit" />
              </IconButton>
              <IconButton
                className="profileStyleIconButton exitIconButton"
                size="small"
              >
                <LogoutIcon fontSize="inherit" />
              </IconButton>
            </Stack>
          </Box>
        </Box>
        <Divider className="dividerProfileStyle" />
        <List className="menuList">
          <ListItem disablePadding sx={{ display: "block" }}>
            {menuNamesAndIcons.map((item) => {
              return (
                <ListItemButton
                  className="listStyleItemButton"
                  sx={{
                    justifyContent: toggle ? "initial" : "center",
                  }}
                >
                  <ListItemIcon
                    className="listStyleItemIcon"
                    sx={{
                      mr: toggle ? 3 : "auto",
                    }}
                  >
                    {item.menuIconMUI}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.menuTitle}
                    sx={{ opacity: toggle ? 1 : 0 }}
                  />
                </ListItemButton>
              );
            })}
          </ListItem>
        </List>
      </Drawer>
    </BoxRootSidebarStyled>
  );
}
