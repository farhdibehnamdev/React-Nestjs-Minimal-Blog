import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleNotification } from "../../store/slices/toggle/toggleSlice";
import { Box, ClickAwayListener } from "@mui/material";
import CardMessage from "../cardMessages/CardMessage";
import { CardType } from "../common/CardTypeEnum";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import IconButtonStyled from "../common/styles/IconButton.style";

const Notification = function () {
  const [colorIcon, setColorIcon] = useState(false);
  const dispatch = useDispatch();
  const { toggleCardNotification } = useSelector((state: any) => state.toggle);
  const handleClick = function () {
    dispatch(toggleNotification(!toggleCardNotification));
    setColorIcon(!colorIcon);
  };
  const handleClickAwady = function () {
    if (toggleCardNotification) {
      dispatch(toggleNotification(false));
    }
    setColorIcon(false);
  };
  const cardHeaderText = {
    title: "اعلان ها",
    underTitleText: "اعلان خوانده نشده",
    counts: 0,
  };
  const settings = {
    cardHeaderText,
    cardType: CardType.Notification,
    data: [],
  };
  return (
    <Box sx={{ position: "relative" }}>
      <ClickAwayListener onClickAway={handleClickAwady}>
        <Box>
          <IconButtonStyled colorIcon={colorIcon} onClick={handleClick}>
            <NotificationsOutlinedIcon />
          </IconButtonStyled>

          <CardMessage
            toggleMessageOpen={toggleCardNotification}
            settings={settings}
          />
        </Box>
      </ClickAwayListener>
    </Box>
  );
};

export default Notification;
