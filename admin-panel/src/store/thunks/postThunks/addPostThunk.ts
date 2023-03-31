import { createAsyncThunk } from "@reduxjs/toolkit";
import { addPost } from "src/config/api/postsApi/postsApi";
type postType = {
  id: number;
  title: string;
  body: string;
  isPublished: boolean;
  image: string;
  categoryId: number;
  userId: string;
  tags: string[];
};
const addPostThunk = createAsyncThunk("post/addPost", async (arg: postType) => {
  const response = await addPost(arg);
  return response.data;
});

export { addPostThunk };
