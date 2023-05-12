import { createSlice } from "@reduxjs/toolkit";
import { usersDataType } from "src/types/userTypes";
import { fetchUsers } from "src/store/thunks/userThunks/fetchUsers";

type userState = {
  isLoading: false;
  data: usersDataType[];
  count: number;
  error: string | null;
};
const initialState: userState = {
  isLoading: false,
  data: [],
  count: 0,
  error: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    //============ Fetch Users =================
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data;
      state.count = action.payload.count;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
    });
  },
});
export const userReducer = userSlice.reducer;
