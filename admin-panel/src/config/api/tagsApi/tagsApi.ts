import { URLS } from "src/config/constants";
import api from "../api";

type tagsDataType = {
  id: number;
  title: string;
  isPublished: boolean;
  description: string;
};

type tagsCollectionType = {
  data: tagsDataType[];
  count: number;
};

export type postTagsType = {
  id: number | null;
  title: string;
  isPublished: boolean;
  description: string;
};

export type removeTagType = {
  id: number;
  title: string;
  isPublished: boolean;
  description: string;
};

type paginationOptionType = {
  offset: number;
  limit: number;
};

export const fetchTagsData = async (pagination?: paginationOptionType) => {
  return await api.get<tagsCollectionType>(URLS.fetchTagUrl, {
    params: pagination,
  });
};

export const postTagData = async (body: any) => {
  return await api.post<postTagsType>(URLS.postTagUrl, body);
};

export const removeTagData = async (id: number) => {
  return await api.delete<removeTagType>(`${URLS.removeTagUrl}${id}`);
};
