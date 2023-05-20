import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUsersData } from "src/config/api/usersApi/usersApi";
import { paginationOptionType } from "src/config/constants";

type userTitleAndPagination = {
  pagination: paginationOptionType;
  title: string;
};
const usersType: userTitleAndPagination = {
  title: "",
  pagination: { limit: 5, offset: 0 },
};

const fetchUsers = createAsyncThunk("users/fetch", async (arg: any) => {
  let response: undefined | any[any];
  if (!arg.all) {
    usersType.title = arg.title;
    usersType.pagination.limit = arg.limit;
    usersType.pagination.offset = arg.offset;
    response = await fetchUsersData(arg.all, usersType);
  } else {
    response = await fetchUsersData(arg.all);
  }
  return response.data;
});

export { fetchUsers };
