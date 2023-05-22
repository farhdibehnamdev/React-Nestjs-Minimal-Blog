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
  const { all, offset, limit, title } = arg;
  if (arg) {
    response = await fetchUsersData(all, {
      title,
      pagination: { offset, limit },
    });
  } else {
    response = await fetchUsersData(all);
  }
  return response.data;
});

export { fetchUsers };
