import { Box, Grid, InputAdornment, TextField } from "@mui/material";
import FullScreen from "../fullScreen/FullScreen";
import Message from "../messages/Message";
import Notification from "../notification/Notification";
import ToolbarBottomStyled from "./ToolbarBottom.styled";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
const ToolbarBottom = function () {
  return (
    <ToolbarBottomStyled>
      <Grid item className="gridSearchBoxToolbarBottomStyle">
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
          <FullScreen />
          <Message />
          <Notification />
        </Box>
      </Box>
    </ToolbarBottomStyled>
  );
};

export default ToolbarBottom;
