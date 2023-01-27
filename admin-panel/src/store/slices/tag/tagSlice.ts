import { createSlice, SerializedError } from "@reduxjs/toolkit";
import { removeTag } from "src/store/thunks/tagThunks/removeTag";
import { number } from "yup";
import { addTag } from "../../thunks/tagThunks/addTag";
import { fetchTags } from "../../thunks/tagThunks/fetchTags";
type tagsData = {
  id: number | null;
  title: string;
  description: string;
};

interface tagState {
  isLoading: boolean;
  data: tagsData[];
  count: number;
  error: string | null;
}

const initialState: tagState = {
  isLoading: false,
  data: [],
  count: 0,
  error: null,
};

const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {},
  extraReducers(builder) {
    //============ Fetch Tag =================

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
  },
});
export const tagReducer = tagSlice.reducer;
