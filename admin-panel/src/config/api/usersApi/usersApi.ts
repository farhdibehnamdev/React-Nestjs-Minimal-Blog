import { URLS } from "src/config/constants";
import api from "../api";
import {
  RefreshTokenApiResponse,
  signinUserTypeDto,
  signupUserTypeDto,
  usersDataType,
  userTitleAndPagination,
} from "src/types/userTypes";

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

export const fetchUsersData = async function (
  all: boolean,
  paginationTitle?: userTitleAndPagination
) {
  const params = { all };
  if (paginationTitle) {
    const { pagination, title } = paginationTitle;
    Object.assign(params, { pagination, title });
  }
  return await api.get<usersDataType>(URLS.userUrl, { params });
};

export const editPatchUserApi = async function (
  id: string,
  body: usersDataType
) {
  return await api.patch<usersDataType>(`${URLS.editUserUrl}${id}`, body);
};
export const editPutUserApi = async function (body: usersDataType) {
  return await api.put<usersDataType>(URLS.editUserUrl, body);
};

export const signupUserApi = async function (signUpUserDto: signupUserTypeDto) {
  if (signUpUserDto) {
    return await api.post<signupUserTypeDto>(URLS.signUpUrl, signUpUserDto);
  }
};

export const signinUserApi = async function (signinUserDto: signinUserTypeDto) {
  if (signinUserDto) {
    return await api.post<string>(URLS.signinUrl, signinUserDto);
  }
};

export const verifiedEmailApi = async function (token: string) {
  if (token) {
    return await api.get<string>(URLS.verifiedEmailUrl, { params: { token } });
  }
};

export const verifyTokenApi = async function (
  accessToken: string,
  refreshToken: string
) {
  if (accessToken && refreshToken) {
    return await api.post<string>(URLS.verifyTokenUrl, {
      accessToken,
      refreshToken,
    });
  }
};

export const refreshTokenApi = async function (
  refreshToken: string
): Promise<RefreshTokenApiResponse | undefined> {
  if (refreshToken) {
    return await api.post<{ accessToken: string }>(
      URLS.refreshToken,
      refreshToken
    );
  }
};
