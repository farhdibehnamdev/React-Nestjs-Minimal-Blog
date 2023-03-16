import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUsersData } from "src/config/api/usersApi/usersApi";

const fetchUsers = createAsyncThunk("users/fetch", async (arg: any) => {
  let response: undefined | any[any];
  if (arg) {
    response = await fetchUsersData(arg.all, {
      pagination: arg.pagination,
      title: arg.title,
    });
  } else {
    response = await fetchUsersData(arg.all);
  }
  return response.data;
});

export { fetchUsers };
