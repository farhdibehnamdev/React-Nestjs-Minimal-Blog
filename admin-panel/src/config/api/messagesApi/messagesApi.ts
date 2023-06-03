import { messagesDataType } from "src/components/common/common.type";
import { paginationOptionType, URLS } from "src/config/constants";
import api from "../api";
import { AxiosResponse } from "axios";

export type messageTitleAndPagination = {
  pagination: paginationOptionType;
  title: string;
};

export type receivedMessagesDataType = {
  data: messagesDataType[];
  count: number;
};
export const fetchReceivedMessagesApi = async (
  all: boolean,
  id: string,
  paginationTitle?: messageTitleAndPagination
): Promise<AxiosResponse<receivedMessagesDataType>> => {
  const params = { all };
  if (paginationTitle) {
    Object.assign(params, paginationTitle);
  }
  return await api.get<receivedMessagesDataType>(
    `${URLS.receivedMessageUrl}${id}`,
    {
      params,
    }
  );
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
