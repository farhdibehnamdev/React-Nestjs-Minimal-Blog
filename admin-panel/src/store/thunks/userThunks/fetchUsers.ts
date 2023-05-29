import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUsersData } from "src/config/api/usersApi/usersApi";
interface FetchUsersArguments {
  arg: {
    all: boolean;
    offset: number;
    limit: number;
    title: string;
  };
}

const fetchUsers = createAsyncThunk(
  "users/fetch",
  async (arg: any, { rejectWithValue }) => {
    try {
      let response: undefined | any[any];
      const { all, offset, limit, title } = arg;
      if (!all) {
        response = await fetchUsersData(all, {
          title,
          pagination: { offset, limit },
        });
      } else {
        response = await fetchUsersData(all);
      }
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err);
    }
  }
);

export { fetchUsers };
