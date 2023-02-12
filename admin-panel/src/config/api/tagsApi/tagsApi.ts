import { paginationOptionType, URLS } from "src/config/constants";
import api from "../api";

export type tagsDataType = {
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

export type editTagType = {
  id: number;
  title: string;
  isPublished: boolean;
  description: string;
};

export type fetchTagType = {
  id: number;
};

export const fetchTagsData = async (pagination?: paginationOptionType) => {
  return await api.get<tagsCollectionType>(URLS.fetchTagUrl, {
    params: pagination,
  });
};

export const fetchFiltersData = async (
  pagination?: paginationOptionType,
  title?: string
) => {
  return await api.get<tagsCollectionType>(URLS.fetchTagUrl, {
    params: {
      pagination: pagination,
      title: title,
    },
  });
};

export const postTagData = async (body: postTagsType) => {
  return await api.post<postTagsType>(URLS.postTagUrl, body);
};

export const removeTagData = async (id: number) => {
  return await api.delete<removeTagType>(`${URLS.removeTagUrl}${id}`);
};

export const editTagData = async (body: editTagType) => {
  return await api.patch<editTagType>(URLS.editTagUrl, body);
};

export const fetchTagData = async (id: fetchTagType) => {
  return await api.get<fetchTagType>(`${URLS.fetchTagUrl}/${id}`);
};
