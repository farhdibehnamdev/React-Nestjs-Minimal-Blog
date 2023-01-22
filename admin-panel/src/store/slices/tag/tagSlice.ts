import { createSlice, SerializedError } from "@reduxjs/toolkit";
import { addTag } from "../../thunks/tagThunks/addTag";
import { fetchTags } from "../../thunks/tagThunks/fetchTags";
type tagsData = {
  title: string;
  description: string;
};

interface tagState {
  isLoading: boolean;
  data: tagsData[];
  error: string | null;
}

const initialState: tagState = {
  isLoading: false,
  data: [],
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
      state.data = action.payload;
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

    //============ Edit Tag =================
    //============ Remove Tag =================
  },
});
export const tagReducer = tagSlice.reducer;
