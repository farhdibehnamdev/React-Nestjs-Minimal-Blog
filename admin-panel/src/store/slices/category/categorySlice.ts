import { createSlice } from "@reduxjs/toolkit";
import { addCategory } from "src/store/thunks/categoryThunks/addCategory";
import { fetchCategories } from "src/store/thunks/categoryThunks/fetchCategories";
import { removeCategory } from "src/store/thunks/categoryThunks/removeCategory";

type categoriesData = {
  id: number | null;
  title: string;
  isPublished: boolean;
  description: string;
};

export type categoryState = {
  isLoading: boolean;
  data: categoriesData[];
  count: number;
  error: string | null;
};

const initialState: categoryState = {
  isLoading: false,
  data: [],
  count: 0,
  error: null,
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers(builder) {
    //============ Fetch Categories =================
    builder.addCase(fetchCategories.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data;
      state.count = action.payload.count;
    });

    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
    });

    //============ Add Category =================

    builder.addCase(addCategory.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(addCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data.push(action.payload);
    });

    builder.addCase(addCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
    });

    //============ Remove Category =================
    builder.addCase(removeCategory.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(removeCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = state.data.filter(
        (category) => category.id !== action.payload.id
      );
    });

    builder.addCase(removeCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
    });

    //============ Remove Category =================
  },
});

export const selectCategoryById = (state: any, id: number) =>
  state.category.data.find((category: any) => category.id === id);

export const categoryReducer = categorySlice.reducer;
