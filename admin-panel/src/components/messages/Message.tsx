import { useDispatch, useSelector } from "react-redux";
import { toggleMessage } from "../../features/toggle/toggleSlice";
import { Box, ClickAwayListener } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CardMessage from "../cardMessages/CardMessage";
import { CardType } from "../common/CardTypeEnum";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";

const Message = function () {
  const dispatch = useDispatch();
  const { toggleCardMessage } = useSelector((state: any) => state.toggle);
  const handleClick = function () {
    dispatch(toggleMessage(!toggleCardMessage));
  };
  const handleClickAway = function () {
    dispatch(toggleMessage(false));
  };
  const cardHeaderText = {
    title: "پیام ها",
    underTitleText: "پیام خوانده نشده",
    counts: 0,
  };
  const settings = {
    cardHeaderText,
    cardType: CardType.Message,
    data: [],
  };
  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box
        sx={{
          position: "relative",
        }}
      >
        <IconButton onClick={handleClick}>
          <ChatBubbleOutlineOutlinedIcon className="headerIconButtonSizeStyle" />
        </IconButton>
        <CardMessage toggleMessage={toggleCardMessage} settings={settings} />
      </Box>
    </ClickAwayListener>
  );
};

export default Message;
