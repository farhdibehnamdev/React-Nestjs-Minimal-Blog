import { Card, styled } from "@mui/material";
import { CardType } from "../common/CardTypeEnum";
interface CardMessageProps {
  isOpen: boolean;
  cardType: CardType;
}

const CardMessageStyled = styled(Card)(
  ({ isOpen, cardType }: CardMessageProps) => ({
    visibility: isOpen ? "visible" : "hidden",
    maxWidth: "300px",
    position: "absolute",
    willChange: "transform",
    width: "100vw",
    top: 0,
    right: 0,
    transform: " translate3d(0px, 50px, 0px)",
    ".boxImageHeaderMessageStyle": {
      position: "relative",
      width: "100%",
      height: "100px",
      background: "url(/assets/images/image-message.png)",
      backgroundPosition: "center",
      backgroundSize: "cover",
      ".boxMessageInCardMediaStyle": {
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        zIndex: 99999,
        height: "100%",
        ".typoH6MessageCardMediaStyle": {
          marginBottom: "5px",
        },
        ".typoSmallCardMediaStyle": {
          opacity: 0.7,
          fontSize: "11px",
        },
      },
    },
    ".boxImageHeaderMessageStyle::after": {
      content: "''",
      background: "rgba(255, 255, 255, 0.8)",
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
  })
);

export default CardMessageStyled;
