import React from "react";
import CardMessage from "../cardMessages/CardMessage";
import { CardType } from "../common/CardTypeEnum";

interface NotificationText {
  title: string;
  underTitleText: string;
  notificationCounts: number;
}

const Notification = function ({ toggleMessage }: any) {
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
  return <CardMessage toggleMessage={toggleMessage} settings={settings} />;
};

export default Notification;
