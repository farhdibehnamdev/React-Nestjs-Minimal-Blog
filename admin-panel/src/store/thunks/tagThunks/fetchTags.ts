import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import {
  fetchTagsData,
  tagsCollectionType,
} from "src/config/api/tagsApi/tagsApi";
import { ThunkDataType } from "src/store/thunk.type";

const fetchTags = createAsyncThunk(
  "tags/fetch",
  async (arg: ThunkDataType): Promise<tagsCollectionType> => {
    let response: AxiosResponse<tagsCollectionType>;
    const { all, offset, limit, title } = arg;
    if (!all) {
      response = await fetchTagsData(all, {
        title,
        pagination: { offset, limit },
      });
    } else {
      response = await fetchTagsData(all);
    }

    return response.data;
  }
);

export { fetchTags };
