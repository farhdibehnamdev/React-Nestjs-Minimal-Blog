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
import { Avatar, Badge, Stack } from "@mui/material";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import sidebarStyle from "./Sidebar.style";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { SidebarProps } from "./SidebarProps";

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
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
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

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  background: "#fff",
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

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
}));

const menuNamesAndIcons: SidebarProps[] = [
  { menuTitle: "داشبورد", menuIconMUI: <DashboardOutlinedIcon /> },
  { menuTitle: "پست ها", menuIconMUI: <FormatListBulletedOutlinedIcon /> },
  { menuTitle: "تگ ها", menuIconMUI: <LocalOfferOutlinedIcon /> },
  { menuTitle: "ارسال پیام", menuIconMUI: <EmailOutlinedIcon /> },
  { menuTitle: "مدیریت کاربران", menuIconMUI: <ManageAccountsOutlinedIcon /> },
  { menuTitle: "خروج", menuIconMUI: <LogoutIcon /> },
];

export default function MiniDrawer() {
  const [open, setOpen] = React.useState(true);

  return (
    <Box>
      <Drawer variant="permanent" open={open} sx={sidebarStyle}>
        <DrawerHeader className="logoWrapper">
          <img className="logo" src="/assets/images/logo.png" alt="logo" />
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
          <Typography component="h5">جان اسنو</Typography>
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
        <List className="menuList">
          <ListItem disablePadding sx={{ display: "block" }}>
            {menuNamesAndIcons.map((item) => {
              return (
                <ListItemButton
                  className="listStyleItemButton"
                  sx={{
                    justifyContent: open ? "initial" : "center",
                  }}
                >
                  <ListItemIcon
                    className="listStyleItemIcon"
                    sx={{
                      mr: open ? 3 : "auto",
                    }}
                  >
                    {item.menuIconMUI}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.menuTitle}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              );
            })}
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
