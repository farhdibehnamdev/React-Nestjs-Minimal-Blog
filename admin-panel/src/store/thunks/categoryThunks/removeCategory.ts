import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  categoriesDataType,
  removeCategoryData,
} from "src/config/api/categoriesApi/categoriesApi";

const removeCategory = createAsyncThunk(
  "category/remove",
  async (category: categoriesDataType) => {
    await removeCategoryData(category.id);
    return category;
  }
);
export { removeCategory };
