import { paginationOptionType, URLS } from "src/config/constants";
import api from "../api";

export type categoriesDataType = {
  id: number;
  title: string;
  isPublished: boolean;
  description: string;
};

type categoriesCollectionType = {
  data: categoriesDataType[];
  count: number;
};

export type postCategoryType = {
  id: number | null;
  title: string;
  isPublished: boolean;
  description: string;
};

export const fetchCategoriesData = async (
  pagination?: paginationOptionType
) => {
  return await api.get<categoriesCollectionType>(URLS.fetchCategoryUrl, {
    params: pagination,
  });
};

export const postCategoryData = async (body: postCategoryType) => {
  return await api.post<postCategoryType>(URLS.fetchCategoryUrl, body);
};
