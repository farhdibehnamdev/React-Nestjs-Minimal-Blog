import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCategoriesData } from "src/config/api/categoriesApi/categoriesApi";
import { paginationOptionType } from "src/config/constants";

type categoryTitleAndPagination = {
  pagination: paginationOptionType;
  title: string;
};

const categoryType: categoryTitleAndPagination = {
  title: "",
  pagination: { limit: 5, offset: 0 },
};

const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async (arg: any) => {
    let response: undefined | any[any];
    if (arg) {
      categoryType.title = arg.title;
      categoryType.pagination.limit = arg.limit;
      categoryType.pagination.offset = arg.offset;
      response = await fetchCategoriesData(arg.all, categoryType);
    } else {
      response = await fetchCategoriesData(arg.all);
    }

    return response.data;
  }
);

export { fetchCategories };
