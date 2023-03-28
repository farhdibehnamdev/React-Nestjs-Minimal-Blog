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

type tagTitleAndPagination = {
  pagination: paginationOptionType;
  title: string;
};

export const fetchTagsData = async (
  all: boolean,
  paginationTitle?: tagTitleAndPagination
) => {
  const params = { all };
  if (paginationTitle) {
    const { pagination, title } = paginationTitle;
    Object.assign(params, { pagination, title });
  }
  return await api.get<tagsCollectionType>(URLS.tagUrl, { params });
};

export const fetchFiltersData = async (
  pagination?: paginationOptionType,
  title?: string
) => {
  return await api.get<tagsCollectionType>(URLS.tagUrl, {
    params: {
      ...pagination,
      title,
    },
  });
};

export const postTagData = async (body: postTagsType) => {
  return await api.post<postTagsType>(URLS.tagUrl, body);
};

export const removeTagData = async (id: number) => {
  return await api.delete<removeTagType>(`${URLS.tagUrl}${id}`);
};

export const editTagData = async (id: number, body: editTagType) => {
  return await api.patch<editTagType>(`${URLS.tagUrl}${id}`, body);
};

export const fetchTagData = async (id: fetchTagType) => {
  return await api.get<fetchTagType>(`${URLS.tagUrl}/${id}`);
};
