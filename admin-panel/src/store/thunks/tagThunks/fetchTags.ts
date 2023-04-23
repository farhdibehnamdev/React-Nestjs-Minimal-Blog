import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTagsData } from "src/config/api/tagsApi/tagsApi";
import { paginationOptionType } from "src/config/constants";

type fetchTagsType = {
  pagination: paginationOptionType;
  title: string;
};
type tagTitleAndPagination = {
  pagination: paginationOptionType;
  title: string;
};
const tagsType: tagTitleAndPagination = {
  title: "",
  pagination: { limit: 5, offset: 0 },
};
const fetchTags = createAsyncThunk("tags/fetch", async (arg: any) => {
  let response: undefined | any[any];
  if (arg) {
    tagsType.title = arg.title;
    tagsType.pagination.limit = arg.limit;
    tagsType.pagination.offset = arg.offset;
    response = await fetchTagsData(arg.all, tagsType);
  } else {
    response = await fetchTagsData(arg.all);
  }

  return response.data;
});

export { fetchTags };
