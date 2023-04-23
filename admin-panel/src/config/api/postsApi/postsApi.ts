import { paginationOptionType, URLS } from "src/config/constants";
import api from "../api";

export type postType = {
  id: number;
  title: string;
  body: string;
  isPublished: boolean;
  image: string;
  categoryId: number;
  userId: string;
  tags: string[];
};

type postsCollectionType = {
  data: postType[];
  count: number;
};

type paginationTitleType = {
  pagination: paginationOptionType;
  title: string;
};
export const fetchPosts = async (
  all: boolean,
  paginationTitle?: paginationTitleType
) => {
  const params = { all };
  Object.assign(params, paginationTitle);
  return await api.get<postsCollectionType>(URLS.postUrl, { params });
};

export const addPost = async (body: postType) => {
  try {
    return await api.post<postType>(URLS.postUrl, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error: any) {
    throw new Error(error.response.message);
  }
};
