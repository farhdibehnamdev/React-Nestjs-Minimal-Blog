import { createSlice } from "@reduxjs/toolkit";
import { usersDataType } from "src/types/userTypes";
import { fetchUsers } from "src/store/thunks/userThunks/fetchUsers";
import { editUserThunk } from "src/store/thunks/userThunks/editUser";

type userState = {
  isLoading: boolean;
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
      state.isLoading = true;
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
    //================= Edit User ==============
    builder.addCase(editUserThunk.pending, (state) => {
      state.isLoading = false;
    });

    builder.addCase(editUserThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = state.data.filter((user) => user.id === action.payload.id);
    });

    builder.addCase(editUserThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
    });
  },
});
export const selectUserById = (state: any, id: string) =>
  state.users.data.find((user: usersDataType) => user.id === id);
export const userReducer = userSlice.reducer;
