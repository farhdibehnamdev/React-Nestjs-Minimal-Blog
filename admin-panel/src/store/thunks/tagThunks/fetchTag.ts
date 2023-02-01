import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTagData, fetchTagType } from "src/config/api/tagsApi/tagsApi";

const fetchTag = createAsyncThunk("tags/fetchTag", async (id: fetchTagType) => {
  const response = await fetchTagData(id);
  console.log("boo resonse di ::", response.data);
  return response.data;
});

export { fetchTag };
