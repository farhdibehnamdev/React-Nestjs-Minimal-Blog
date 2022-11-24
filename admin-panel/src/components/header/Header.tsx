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
import headerStyle from "./Header.style";
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
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <AppBar sx={headerStyle} open={open}>
        <Toolbar className="toolbarStyle">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="end"
            sx={{
              marginLeft: 5,
            }}
          >
            <Box className="boxHeaderMenuIconStyle">
              <MenuIcon className="menuIconHeaderColorStyle" />
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
                className: "textFieldHeaderInputPropsStyle",
              }}
              className="textFieldHeaderStyle"
              id="search"
              placeholder="جستجو"
            />
          </Grid>
          <Box className="boxContainerMenuIconsStyle">
            <IconButton className="headerIconButtonStyle">
              <FullscreenOutlinedIcon className="headerIconButtonSizeStyle" />
              <ChatBubbleOutlineOutlinedIcon className="headerIconButtonSizeStyle" />
              <NotificationsOutlinedIcon className="headerIconButtonSizeStyle" />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
