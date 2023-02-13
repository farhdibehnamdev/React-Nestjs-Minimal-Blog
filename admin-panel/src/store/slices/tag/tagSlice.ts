import { createSlice } from "@reduxjs/toolkit";
import { editTag } from "src/store/thunks/tagThunks/editTag";
import { fetchTag } from "src/store/thunks/tagThunks/fetchTag";
import { removeTag } from "src/store/thunks/tagThunks/removeTag";
import { addTag } from "../../thunks/tagThunks/addTag";
import { fetchTags } from "../../thunks/tagThunks/fetchTags";
type tagsData = {
  id: number | null;
  title: string;
  isPublished: boolean;
  description: string;
};

type tagState = {
  isLoading: boolean;
  data: tagsData[];
  count: number;
  error: string | null;
};

const initialState: tagState = {
  isLoading: false,
  data: [],
  // removeTagItem: null,
  count: 0,
  error: null,
  // selectedTagItem: null,
};

const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {},
  extraReducers(builder) {
    //============ Fetch Tags =================

    builder.addCase(fetchTags.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTags.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data;
      state.count = action.payload.count;
    });
    builder.addCase(fetchTags.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
    });

    //============ Add Tag =================
    builder.addCase(addTag.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addTag.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data.push(action.payload);
    });
    builder.addCase(addTag.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
    });
    //============ Remove Tag =================
    builder.addCase(removeTag.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(removeTag.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = state.data.filter((tag) => tag.id !== action.payload.id);
    });
    builder.addCase(removeTag.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
    });
    //============ Edit Tag =================
    builder.addCase(editTag.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(editTag.fulfilled, (state, action) => {
      state.isLoading = false;
      const tag = state.data.filter((tag) => tag.id === action.payload.id);
      state.data = tag;
    });
    builder.addCase(editTag.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
    });
  },
});

export const selectTagById = (state: any, id: number) =>
  state.tags.data.find((tag: any) => tag.id === id);
export const tagReducer = tagSlice.reducer;
