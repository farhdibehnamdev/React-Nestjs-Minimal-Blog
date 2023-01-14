import api from "../api";

const URLS = {
  fetchPostUrl: "api/article",
};

export type PostData = {
  //   message: string;
  //   status: "success" | "error";
};

export const fetchPost = () => {
  return api.get<PostData>(URLS.fetchPostUrl);
};
