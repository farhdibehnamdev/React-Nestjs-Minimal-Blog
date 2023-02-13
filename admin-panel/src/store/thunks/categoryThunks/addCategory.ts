import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  postCategoryData,
  postCategoryType,
} from "src/config/api/categoriesApi/categoriesApi";

const addCategory = createAsyncThunk(
  "category/add",
  async (category: postCategoryType) => {
    const response = await postCategoryData(category);
    return response.data;
  }
);
export { addCategory };
