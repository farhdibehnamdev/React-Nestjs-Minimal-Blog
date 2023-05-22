import { createAsyncThunk } from "@reduxjs/toolkit";
import { removeUserApi } from "src/config/api/usersApi/usersApi";
import { usersDataType } from "src/types/userTypes";

export const removeUserThunk = createAsyncThunk(
  "user/remove",
  async (user: usersDataType) => {
    await removeUserApi(user.id);
    return user;
  }
);
