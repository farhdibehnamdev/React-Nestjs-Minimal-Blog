import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import {
  categoriesCollectionType,
  fetchCategoriesData,
} from "src/config/api/categoriesApi/categoriesApi";
import { ThunkDataType } from "src/store/thunk.type";

const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async (arg: ThunkDataType) => {
    let response: AxiosResponse<categoriesCollectionType>;
    const { all, offset, limit, title } = arg;
    if (!all) {
      response = await fetchCategoriesData(all, {
        title,
        pagination: { offset, limit },
      });
    } else {
      response = await fetchCategoriesData(all);
    }

    return response.data;
  }
);

export { fetchCategories };
