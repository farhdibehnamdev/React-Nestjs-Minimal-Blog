import { useDispatch, useSelector } from "react-redux";
import { toggleNotification } from "../../features/toggle/toggleSlice";
import { Box, ClickAwayListener } from "@mui/material";
import CardMessage from "../cardMessages/CardMessage";
import { CardType } from "../common/CardTypeEnum";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import IconButtonStyled from "../common/styles/IconButton.style";
import { useState } from "react";

const Notification = function () {
  const [colorIcon, setColorIcon] = useState(false);
  const dispatch = useDispatch();
  const { toggleCardNotification } = useSelector((state: any) => state.toggle);
  const handleClick = function () {
    dispatch(toggleNotification(!toggleCardNotification));
    setColorIcon(!colorIcon);
  };
  const handleClickAwady = function () {
    dispatch(toggleNotification(false));
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
    <ClickAwayListener onClickAway={handleClickAwady}>
      <Box sx={{ position: "relative" }}>
        <IconButtonStyled colorIcon={colorIcon} onClick={handleClick}>
          <NotificationsOutlinedIcon />
        </IconButtonStyled>
        <CardMessage
          toggleMessage={toggleCardNotification}
          settings={settings}
        />
      </Box>
    </ClickAwayListener>
  );
};

export default Notification;
