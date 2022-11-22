import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import {
  Avatar,
  Badge,
  TextField,
  InputAdornment,
  Stack,
  Grid,
} from "@mui/material";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import sidebarStyle from "./Sidebar.style";
import FullscreenOutlinedIcon from "@mui/icons-material/FullscreenOutlined";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
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

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
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
  }),
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

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          textAlign: "right",
          background: "none",
          boxShadow: "none",
          marginTop: "10px",
        }}
        open={open}
      >
        <Toolbar sx={{ display: "flex", alignItems: "center", gap: "30px" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="end"
            // sx={{
            //   marginRight: 5,
            //   ...(open && { display: "none" }),
            // }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "8px",
                background: "#fff",
                borderRadius: "4px",
              }}
            >
              <MenuIcon sx={{ color: "#000" }} />
            </Box>
          </IconButton>
          <Grid item>
            <TextField
              variant="filled"
              hiddenLabel
              InputLabelProps={{
                disableAnimation: true,
                shrink: false,
              }}
              InputProps={{
                disableUnderline: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchOutlinedIcon />
                  </InputAdornment>
                ),
                style: {
                  background: "#fff",
                  borderRadius: "5px",
                  height: 40,
                  width: "30vw",
                },
              }}
              sx={{
                background: "#fff",
                outline: 0,
                margin: 0,
                borderRadius: "5px",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
              }}
              id="search"
              placeholder="جستجو"
            />
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "auto",
            }}
          >
            <IconButton
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <FullscreenOutlinedIcon
                sx={{ color: "#000", width: "24px", height: "24px" }}
              />
              <ChatBubbleOutlineOutlinedIcon
                sx={{ color: "#000", width: "24px", height: "24px" }}
              />
              <NotificationsOutlinedIcon
                sx={{ color: "#000", width: "24px", height: "24px" }}
              />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

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
              sx={{
                background: "rgba(34, 185, 255, 0.3)",
                boxShadow: "none",
                padding: "10px 15px",
                borderRadius: "4px",
              }}
              size="small"
            >
              <Person2OutlinedIcon fontSize="inherit" />
            </IconButton>
            <IconButton
              sx={{
                background: "rgba(16, 183, 89, 0.3) ",
                boxShadow: "none",
                padding: "10px 15px",
                borderRadius: "4px",
              }}
              size="small"
            >
              <SettingsOutlinedIcon fontSize="inherit" />
            </IconButton>
            <IconButton
              sx={{
                background: "rgba(255, 63, 63, 0.3)",
                boxShadow: "none",
                padding: "10px 15px",
                borderRadius: "4px",
              }}
              size="small"
            >
              <LogoutIcon fontSize="inherit" />
            </IconButton>
          </Stack>
        </Box>
        <List className="menuList">
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                marginRight: "10px",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <DashboardOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="داشبورد" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <FormatListBulletedOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="پست ها" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <LocalOfferOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="تگ ها" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <EmailOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                primary="ارسال پیام"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <ManageAccountsOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                primary="مدیریت کاربران"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="خروج" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
