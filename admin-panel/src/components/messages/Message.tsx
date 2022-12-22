import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMessage } from "../../features/toggle/toggleSlice";
import { Box, ClickAwayListener } from "@mui/material";
import CardMessage from "../cardMessages/CardMessage";
import { CardType } from "../common/CardTypeEnum";
import IconButtonStyled from "../common/styles/IconButton.style";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";

const Message = function () {
  const [colorIcon, setColorIcon] = useState(false);
  const dispatch = useDispatch();
  const { toggleCardMessage } = useSelector((state: any) => state.toggle);
  const handleClick = function () {
    dispatch(toggleMessage(!toggleCardMessage));
    setColorIcon(!colorIcon);
  };
  const handleClickAway = function () {
    dispatch(toggleMessage(false));
    setColorIcon(false);
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
        <Box>
          <IconButtonStyled colorIcon={colorIcon} onClick={handleClick}>
            <ChatBubbleOutlineOutlinedIcon />
          </IconButtonStyled>
          <CardMessage
            toggleMessageOpen={toggleCardMessage}
            settings={settings}
          />
        </Box>
      </Box>
    </ClickAwayListener>
  );
};

export default Message;
