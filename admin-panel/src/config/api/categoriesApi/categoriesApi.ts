import { paginationOptionType, URLS } from "src/config/constants";
import api from "../api";

export type categoriesDataType = {
  id: number;
  title: string;
  isPublished: boolean;
  description: string;
};

export type categoriesCollectionType = {
  data: categoriesDataType[];
  count: number;
};

export type postCategoryType = {
  id: number | null;
  title: string;
  isPublished: boolean;
  description: string;
};
type categoryTitleAndPagination = {
  pagination: paginationOptionType;
  title: string;
};

export const fetchCategoriesData = async (
  all: boolean,
  paginationTitle?: categoryTitleAndPagination
) => {
  const params = { all };
  if (paginationTitle) {
    Object.assign(params, paginationTitle);
  }
  return await api.get<categoriesCollectionType>(URLS.categoryUrl, {
    params,
  });
};

export const postCategoryData = async (body: postCategoryType) => {
  return await api.post<postCategoryType>(URLS.categoryUrl, body);
};

export const removeCategoryData = async (id: number) => {
  return await api.delete<categoriesDataType>(`${URLS.categoryUrl}${id}`);
};

export const editCategoryData = async (
  id: number,
  body: categoriesDataType
) => {
  return await api.patch<categoriesDataType>(`${URLS.categoryUrl}${id}`, body);
};
