import { paginationOptionType } from "src/config/constants";

export type usersDataType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isActive: boolean;
  isVerified: boolean;
  userRole: string;
  avatar: string;
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
  rememberMe: boolean;
};

export type RefreshTokenApiResponse = {
  data: {
    accessToken: string;
  };
};
