import { paginationOptionType, URLS } from "src/config/constants";
import api from "../api";

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}
export type usersDataType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
};

type userTitleAndPagination = {
  pagination: paginationOptionType;
  title: string;
};

export const fetchUsersData = async (
  all: boolean,
  paginationTitle?: userTitleAndPagination
) => {
  const params = { all };
  if (paginationTitle) {
    const { pagination, title } = paginationTitle;
    Object.assign(params, { pagination, title });
  }
  return await api.get<usersDataType>(URLS.userUrl, { params });
};
