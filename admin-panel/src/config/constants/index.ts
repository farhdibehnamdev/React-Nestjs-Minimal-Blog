export const URLS = {
  tagUrl: "api/tag/",
  categoryUrl: "api/category/",
  postUrl: "api/article/",
  userUrl: "auth/users",
  messageUrl: "api/message",
  signUpUrl: "auth/signup",
  signinUrl: "auth/signin",
  verifiedEmailUrl: "auth/verify-email",
  verifyTokenUrl: "auth/verify-token",
  refreshToken: "auth/refresh-token",
  editUserUrl: "auth/user/update/",
};

export type paginationOptionType = {
  offset: number;
  limit: number;
};
