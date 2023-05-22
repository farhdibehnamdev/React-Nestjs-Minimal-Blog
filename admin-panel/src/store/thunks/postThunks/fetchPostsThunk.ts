import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import {
  fetchPosts,
  postsCollectionType,
} from "src/config/api/postsApi/postsApi";
import { ThunkDataType } from "src/store/thunk.type";

const fetchPostsThunk = createAsyncThunk(
  "post/fetchPosts",
  async (arg: ThunkDataType) => {
    let response: AxiosResponse<postsCollectionType>;
    const { all, offset, limit, title } = arg;
    if (!all) {
      response = await fetchPosts(all, {
        title,
        pagination: { offset, limit },
      });
    } else {
      response = await fetchPosts(all);
    }

    return response.data;
  }
);

export { fetchPostsThunk };
