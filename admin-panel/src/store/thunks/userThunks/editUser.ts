import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  editPatchUserApi,
  editPutUserApi,
} from "src/config/api/usersApi/usersApi";

export const editUserThunk = createAsyncThunk("user/edit", async (arg: any) => {
  let response;
  const { ...body } = arg;

  if (arg.typeRequest === "patch") {
    response = await editPatchUserApi(body.id, body);
  } else {
    response = await editPutUserApi(body);
  }
  return response.data;
});
