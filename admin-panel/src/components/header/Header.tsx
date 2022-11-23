import * as React from "react";
import { Grid, Box, TextField, InputAdornment } from "@mui/material";
import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import FullscreenOutlinedIcon from "@mui/icons-material/FullscreenOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
const drawerWidth = 240;

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
const Header = function () {
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
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
    </>
  );
};

export default Header;
