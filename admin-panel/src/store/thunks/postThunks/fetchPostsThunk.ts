import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPosts } from "src/config/api/postsApi/postsApi";

type paginationType = {
  limit: number;
  offset: number;
};

type paginationTitleType = {
  pagination: paginationType;
  title: string;
};

const postType: paginationTitleType = {
  pagination: { limit: 5, offset: 0 },
  title: "",
};
const fetchPostsThunk = createAsyncThunk(
  "post/fetchPosts",
  async (arg: any) => {
    let response: undefined | any[any];
    if (arg) {
      postType.title = arg.title;
      postType.pagination.limit = arg.limit;
      postType.pagination.offset = arg.offset;
      response = await fetchPosts(arg.all, postType);
    } else {
      response = await fetchPosts(arg.all);
    }

    return response.data;
  }
);

export { fetchPostsThunk };
