import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories } from "src/store/thunks/categoryThunks/fetchCategories";

type categoriesData = {
  id: number | null;
  title: string;
  isPublished: boolean;
  description: string;
};

type categoryState = {
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
    //============ Fetch Tags =================
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
  },
});

export const categoryReducer = categorySlice.reducer;
