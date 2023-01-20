import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Box,
  TextField,
  InputAdornment,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { ToolbarStyled, HamburgerMenuStyled } from "./Header.style";
import { AppBar } from "./Header.style";
import { toggleSidebar } from "../../store/slices/toggle/toggleSlice";
import Notification from "../notification/Notification";
import Message from "../messages/Message";
import FullScreen from "../fullScreen/FullScreen";
import ArrowDownToggleToolbar from "../arrowDownToggleToolbar/ArrowDownToggleToolbar";
import ToolbarBottom from "../ToolbarBottom/ToolbarBottom";

const Header = function () {
  const theme = useTheme();
  const [toolbarShow, setToolbarShow] = useState(false);
  const dispatch = useDispatch();
  const { toggle } = useSelector((state: any) => state.toggle);
  const mediaQ = useMediaQuery(theme.breakpoints.down("lg"));

  const handleDrawerOpen = () => {
    dispatch(toggleSidebar(!toggle));
  };

  useEffect(() => {
    mediaQ ? dispatch(toggleSidebar(false)) : dispatch(toggleSidebar(true));
    mediaQ ? setToolbarShow(true) : setToolbarShow(false);
  }, [mediaQ]);

  return (
    <AppBar position="static" open={toggle}>
      <ToolbarStyled variant="dense" className="toolbarStyle">
        <HamburgerMenuStyled
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="end"
          open={toggle}
        >
          <Box className="boxHeaderMenuIconStyle">
            <MenuIcon className="menuIconHeaderColorStyle" />
          </Box>
        </HamburgerMenuStyled>
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
        {!toolbarShow && (
          <Box className="boxContainerMenuIconsStyle">
            <Box className="headerIconButtonStyle">
              <FullScreen />
              <Message />
              <Notification />
            </Box>
          </Box>
        )}
        <ArrowDownToggleToolbar />
      </ToolbarStyled>
      {toolbarShow && <ToolbarBottom />}
    </AppBar>
  );
};

export default Header;
