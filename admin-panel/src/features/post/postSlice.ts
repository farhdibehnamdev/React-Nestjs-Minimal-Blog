import { createSlice } from "@reduxjs/toolkit";
interface PostState {
  title: string;
  body: string;
  isPublished: boolean;
  publishedAt: string;
  mainImageUrl: string;
  categoryId: string;
  userId: string;
  tags: string[];
}
const initialState: PostState[] = [];
export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.push(action.payload);
    },
    deletePost: (state, action) => {},
    allPost: (state, action) => {},
    editPost: (state, action) => {},
    singlePost: (state, action) => {},
    deleteAllPost: (state, action) => {},
  },
});
