export type FormData = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type user = {
  id: number;
  email: string;
  role: string;
};

export type apiResponse = {
  accessToken: string;
  refreshToken: string;
  userInfo: user;
};
