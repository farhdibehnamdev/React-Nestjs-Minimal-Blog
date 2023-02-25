import { createSlice } from "@reduxjs/toolkit";
import { fetchPostsThunk } from "src/store/thunks/postThunks/fetchPosts";
type postType = {
  id: number;
  title: string;
  body: string;
  isPublished: boolean;
  publishedAt: string;
  mainImageUrl: string;
  categoryId: number;
  userId: string;
  tags: string[];
};
type postState = {
  isLoading: boolean;
  data: postType[];
  count: number;
  error: string | null;
};

const initialState: postState = {
  isLoading: false,
  data: [],
  count: 0,
  error: null,
};
export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers(builder) {
    //============ Fetch Tags =================
    builder.addCase(fetchPostsThunk.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPostsThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data;
      state.count = action.payload.count;
    });
    builder.addCase(fetchPostsThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
    });
  },
});

export const postReducer = postSlice.reducer;
