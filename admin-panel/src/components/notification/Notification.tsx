import { useDispatch, useSelector } from "react-redux";
import { toggleNotification } from "../../features/toggle/toggleSlice";
import { Box, ClickAwayListener } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CardMessage from "../cardMessages/CardMessage";
import { CardType } from "../common/CardTypeEnum";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";

const Notification = function () {
  const dispatch = useDispatch();
  const { toggleCardNotification } = useSelector((state: any) => state.toggle);
  const handleClick = function () {
    dispatch(toggleNotification(!toggleCardNotification));
  };
  const handleClickAwady = function () {
    dispatch(toggleNotification(false));
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
        <IconButton onClick={handleClick}>
          <NotificationsOutlinedIcon className="headerIconButtonSizeStyle" />
        </IconButton>
        <CardMessage
          toggleMessage={toggleCardNotification}
          settings={settings}
        />
      </Box>
    </ClickAwayListener>
  );
};

export default Notification;
