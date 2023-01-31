import { createAsyncThunk } from "@reduxjs/toolkit";
import { editTagData, editTagType } from "src/config/api/tagsApi/tagsApi";

const editTag = createAsyncThunk("tag/edit", async (tag: editTagType) => {
  const response = await editTagData(tag);

  return response.data;
});

export { editTag };
