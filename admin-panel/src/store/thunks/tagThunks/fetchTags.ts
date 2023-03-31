import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTagsData } from "src/config/api/tagsApi/tagsApi";
import { paginationOptionType } from "src/config/constants";

type fetchTagsType = {
  pagination: paginationOptionType;
  title: string;
};

const fetchTags = createAsyncThunk("tags/fetch", async (arg: any) => {
  let response: undefined | any[any];

  if (arg) {
    response = await fetchTagsData(arg.all, {
      pagination: arg.pagination,
      title: arg.title,
    });
  } else {
    response = await fetchTagsData(arg.all);
  }

  return response.data;
});

export { fetchTags };
