import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPosts } from "src/config/api/postsApi/postsApi";

export const fetchPostsThunk = createAsyncThunk(
  "post/fetchPosts",
  async (arg: any) => {
    let response: undefined | any[any];
    if (arg) {
      response = await fetchPosts(arg.pagination, arg.title);
    } else {
      response = await fetchPosts();
    }
    console.log("response :::", response.data);
    return response.data;
  }
);
