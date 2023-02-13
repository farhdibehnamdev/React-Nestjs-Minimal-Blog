import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCategoriesData } from "src/config/api/categoriesApi/categoriesApi";
import { paginationOptionType } from "src/config/constants";

const fetchCategories = createAsyncThunk(
  "categories/fetch",
  async (pagination: paginationOptionType) => {
    const response = await fetchCategoriesData(pagination);
    return response.data;
  }
);

export { fetchCategories };
