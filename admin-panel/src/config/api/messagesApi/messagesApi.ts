import { paginationOptionType, URLS } from "src/config/constants";
import api from "../api";

type messagesDataType = {
  id: number;
  messageTitle: string;
  messageBody: string;
};

type messageTitleAndPagination = {
  pagination: paginationOptionType;
  title: string;
};

export const fetchSentMessagesData = async (
  all: boolean,
  userId: string,
  paginationTitle?: messageTitleAndPagination
) => {
  const params = { all };
  if (paginationTitle) {
    const { pagination, title } = paginationTitle;
    Object.assign(params, { pagination, title });
  }
  return await api.get<messagesDataType>(URLS.messageUrl, { params: userId });
};
