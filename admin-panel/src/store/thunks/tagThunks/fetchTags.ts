import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTagsData } from "src/config/api/tagsApi/tagsApi";
import { paginationOptionType } from "src/config/constants";

const fetchTags = createAsyncThunk(
  "tags/fetch",
  async (pagination: paginationOptionType) => {
    const response = await fetchTagsData(pagination);
    return response.data;
  }
);

export { fetchTags };
