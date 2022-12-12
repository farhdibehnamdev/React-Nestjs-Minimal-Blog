import { useState } from "react";
import { ClickAwayListener } from "@mui/material";
import IconButtonStyled from "../common/styles/IconButton.style";
import FullscreenOutlinedIcon from "@mui/icons-material/FullscreenOutlined";

const FullScreen = function () {
  const [colorIcon, setColorIcon] = useState(false);

  const handleFullScreen = () => {
    setColorIcon(!colorIcon);
  };
  const handleClickAway = function () {
    // dispatch(toggleMessage(false));
    setColorIcon(false);
  };
  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <IconButtonStyled colorIcon={colorIcon} onClick={handleFullScreen}>
        <FullscreenOutlinedIcon />
      </IconButtonStyled>
    </ClickAwayListener>
  );
};

export default FullScreen;
