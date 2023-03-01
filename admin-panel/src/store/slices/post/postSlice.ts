import { createSlice } from "@reduxjs/toolkit";
import { postType } from "src/config/api/postsApi/postsApi";
import { addPostThunk } from "src/store/thunks/postThunks/addPostThunk";
import { fetchPostsThunk } from "src/store/thunks/postThunks/fetchPostsThunk";

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
    //============ Fetch Posts =================
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

    //============ Add Post =================

    builder.addCase(addPostThunk.pending, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(addPostThunk.fulfilled, (state, action) => {
      state.isLoading = true;
      state.data.push(action.payload);
    });

    builder.addCase(addPostThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
    });
  },
});

export const postReducer = postSlice.reducer;
