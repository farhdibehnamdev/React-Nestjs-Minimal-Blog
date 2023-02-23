import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCategoriesData } from "src/config/api/categoriesApi/categoriesApi";
import { paginationOptionType } from "src/config/constants";

type FetchCategoriesType = {
  pagination: paginationOptionType;
  title: string;
};
const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async (arg: any) => {
    let response: undefined | any[any];

    if (arg) {
      response = await fetchCategoriesData(arg.pagination, arg.title);
    } else {
      response = await fetchCategoriesData(undefined);
    }

    return response.data;
  }
);

export { fetchCategories };
