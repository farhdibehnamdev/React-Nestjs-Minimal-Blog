import * as React from "react";
import {
  Grid,
  Box,
  TextField,
  InputAdornment,
  useMediaQuery,
  useTheme,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import FullscreenOutlinedIcon from "@mui/icons-material/FullscreenOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import headerStyle, { IconButtonStyled, ToolbarStyled } from "./Header.style";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../features/toggle/toggleSlice";
import { useSelector } from "react-redux";

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
    [theme.breakpoints.down("lg")]: {
      width: "100%",
    },
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const Header = function () {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { toggle } = useSelector((state: any) => state.toggle);
  const mediaQ = useMediaQuery(theme.breakpoints.down("lg"));
  // const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    dispatch(toggleSidebar(!toggle));
  };
  React.useEffect(() => {
    mediaQ ? dispatch(toggleSidebar(false)) : dispatch(toggleSidebar(true));
  }, [mediaQ]);

  const handleDrawerClose = () => {
    dispatch(toggleSidebar(false));
  };

  return (
    <AppBar sx={headerStyle} open={toggle}>
      <ToolbarStyled className="toolbarStyle">
        <IconButtonStyled
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="end"
        >
          <Box className="boxHeaderMenuIconStyle">
            <MenuIcon className="menuIconHeaderColorStyle" />
          </Box>
        </IconButtonStyled>
        <Grid item sx={{ marginLeft: "-10px" }}>
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
        <Button onClick={handleDrawerClose} variant="contained">
          Close
        </Button>
      </ToolbarStyled>
    </AppBar>
  );
};

export default Header;
