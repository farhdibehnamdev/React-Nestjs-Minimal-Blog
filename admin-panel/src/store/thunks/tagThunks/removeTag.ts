import { createAsyncThunk } from "@reduxjs/toolkit";
import { removeTagData, removeTagType } from "src/config/api/tagsApi/tagsApi";

const removeTag = createAsyncThunk("tag/remove", async (tag: removeTagType) => {
  await removeTagData(tag.id);
  return tag;
});

export { removeTag };
