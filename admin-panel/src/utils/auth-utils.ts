import { verifyTokenApi } from "src/config/api/usersApi/usersApi";

type user = {
  id: number;
  email: string;
  role: string;
};
export type verifyTokenType = {
  isAuthenticated: boolean;
  userInfo: user;
};

export const verifyTokens = async function (
  accessToken: string,
  refreshToken: string
): Promise<any> {
  const response = await verifyTokenApi(accessToken, refreshToken);
  if (response?.status === 200) {
    return response?.data;
  } else {
    return false;
  }
};
