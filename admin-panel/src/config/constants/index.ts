export const URLS = {
  tagUrl: "api/tag/",
  categoryUrl: "api/category/",
  postUrl: "api/article/",
  userUrl: "auth/users",
  receivedMessageUrl: "api/message/inbox/",
  messageUrl: "api/message",
  signUpUrl: "auth/signup",
  signinUrl: "auth/signin",
  verifiedEmailUrl: "auth/verify-email",
  verifyTokenUrl: "auth/verify-token",
  refreshToken: "auth/refresh-token",
  editUserUrl: "auth/user/update/",
  addUserUrl: "auth/user/add",
  deleteUserUrl: "auth/user/remove/",
  userProfileUrl: "auth/user/profile/",
};

export type paginationOptionType = {
  offset: number;
  limit: number;
};
