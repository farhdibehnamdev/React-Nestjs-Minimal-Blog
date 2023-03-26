import { messagesDataType } from "src/components/common/common.type";
import { paginationOptionType, URLS } from "src/config/constants";
import api from "../api";

export type messageTitleAndPagination = {
  pagination: paginationOptionType;
  title: string;
};

export const fetchMessagesData = async (
  all: boolean,
  userId: string,
  typeMessage: string,
  paginationTitle?: messageTitleAndPagination
) => {
  const params = { all };
  if (paginationTitle) {
    const { pagination, title } = paginationTitle;
    Object.assign(params, { pagination, title });
  }
  return await api.get<messagesDataType>(URLS.messageUrl, {
    params: { typeMessage, userId },
  });
};

export const createMessageApi = async (
  senderId: string,
  messageTitle: string,
  messageBody: string,
  receivers: []
) => {
  return await api.post<messagesDataType>(URLS.messageUrl, {
    senderId,
    messageTitle,
    messageBody,
    receivers,
  });
};
