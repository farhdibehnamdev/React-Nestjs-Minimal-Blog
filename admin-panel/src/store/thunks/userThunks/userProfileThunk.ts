import { createAsyncThunk } from "@reduxjs/toolkit";
import { userProfileApi } from "src/config/api/usersApi/usersApi";
import { usersDataType } from "src/types/userTypes";

export type UserProfileBodyData = {
  firstName: string;
  lastName: string;
  newPassword: string;
  avatar: File;
};

type UserProfileType = {
  id: string;
  data: UserProfileBodyData;
};

export const userProfileThunk = createAsyncThunk(
  "user/profileEdit",
  async (arg: UserProfileType): Promise<usersDataType> => {
    const { id, data } = arg;
    const response = await userProfileApi(id, data);
    return response.data;
  }
);
