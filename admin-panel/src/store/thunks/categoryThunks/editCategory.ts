import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  categoriesDataType,
  editCategoryData,
} from "src/config/api/categoriesApi/categoriesApi";
const editCategory = createAsyncThunk(
  "category/edit",
  async (category: categoriesDataType) => {
    console.log("edit caetgory ::", category);
    const response = await editCategoryData(category.id, category);
    return response.data;
  }
);

export { editCategory };
