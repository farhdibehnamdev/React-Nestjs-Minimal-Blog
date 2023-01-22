import { URLS } from "src/config/constants";
import api from "../api";

type tagsDataType = {
  id: number;
  title: string;
  isPublished: boolean;
  description: string;
};

export type postTagsType = {
  title: string;
  isPublished: boolean;
  description: string;
};

export const fetchTagsData = async () => {
  return await api.get<tagsDataType[]>(URLS.fetchTagUrl);
};

export const postTagData = async (body: any) => {
  return await api.post<postTagsType>(URLS.postTagUrl, body);
};
