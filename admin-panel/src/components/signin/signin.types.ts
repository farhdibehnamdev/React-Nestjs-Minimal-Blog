export type FormData = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type user = {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  email: string;
  role: string;
};

export type apiResponse = {
  accessToken: string;
  refreshToken: string;
  userInfo: user;
};
