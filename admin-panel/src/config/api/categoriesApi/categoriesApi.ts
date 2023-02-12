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

export const fetchCategoriesData = async (
  pagination?: paginationOptionType
) => {
  return await api.get<categoriesCollectionType>(URLS.fetchCategoryUrl, {
    params: pagination,
  });
};
