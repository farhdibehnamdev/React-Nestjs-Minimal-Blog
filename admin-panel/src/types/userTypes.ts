import { UserRole } from "src/config/api/usersApi/usersApi";
import { paginationOptionType } from "src/config/constants";

export type usersDataType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole.USER;
};

export type signupUserTypeDto = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type userTitleAndPagination = {
  pagination: paginationOptionType;
  title: string;
};

export type verifiedEmailType = {
  status: number;
  message: string;
};

export type signinUserTypeDto = {
  email: string;
  password: string;
};

export type RefreshTokenApiResponse = {
  data: {
    accessToken: string;
  };
};
