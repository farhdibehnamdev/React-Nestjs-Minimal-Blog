import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Box,
  TextField,
  InputAdornment,
  useMediaQuery,
  useTheme,
  ClickAwayListener,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import headerStyle, {
  FullscreenOutlinedIconStyled,
  IconButtonStyled,
  ToolbarStyled,
} from "./Header.style";
import { AppBar } from "./Header.style";
import {
  toggleFullScreenMode,
  toggleSidebar,
} from "../../features/toggle/toggleSlice";
import Notification from "../notification/Notification";
import Message from "../messages/Message";

const Header = function () {
  const theme = useTheme();
  const [colorIcon, setColorIcon] = useState(false);
  const dispatch = useDispatch();
  const { toggle, toggleFullScreen } = useSelector(
    (state: any) => state.toggle
  );
  const mediaQ = useMediaQuery(theme.breakpoints.down("lg"));

  const handleDrawerOpen = () => {
    dispatch(toggleSidebar(!toggle));
  };
  const handleFullScreen = () => {
    setColorIcon(!colorIcon);
    dispatch(toggleFullScreenMode(!toggleFullScreen));
  };
  const handleClickAway = function () {
    // dispatch(toggleMessage(false));
  };
  useEffect(() => {
    mediaQ ? dispatch(toggleSidebar(false)) : dispatch(toggleSidebar(true));
  }, [mediaQ]);

  return (
    <AppBar sx={headerStyle} open={toggle}>
      <ToolbarStyled className="toolbarStyle">
        <IconButtonStyled
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="end"
          open={toggle}
        >
          <Box className="boxHeaderMenuIconStyle">
            <MenuIcon className="menuIconHeaderColorStyle" />
          </Box>
        </IconButtonStyled>
        <Grid item className="gridSearchBoxStyle">
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
          <Box className="headerIconButtonStyle">
            <ClickAwayListener onClickAway={handleClickAway}>
              <IconButton onClick={handleFullScreen}>
                <FullscreenOutlinedIconStyled
                  colorIcon={colorIcon}
                  className="headerIconButtonSizeStyle"
                />
              </IconButton>
            </ClickAwayListener>

            <Message />
            <Notification />
          </Box>
        </Box>
      </ToolbarStyled>
    </AppBar>
  );
};

export default Header;
