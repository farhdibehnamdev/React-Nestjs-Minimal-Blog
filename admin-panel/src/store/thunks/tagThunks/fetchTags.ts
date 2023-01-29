import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTagsData } from "src/config/api/tagsApi/tagsApi";
type paginationOptionType = {
  offset: number;
  limit: number;
};
const fetchTags = createAsyncThunk(
  "tags/fetch",
  async (pagination: paginationOptionType) => {
    const response = await fetchTagsData(pagination);
    return response.data;
  }
);

export { fetchTags };
