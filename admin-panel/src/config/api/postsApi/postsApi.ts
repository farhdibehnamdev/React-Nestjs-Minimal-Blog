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
export const fetchPosts = async (
  pagination?: paginationOptionType,
  title?: string
) => {
  return await api.get<postsCollectionType>(URLS.postUrl);
};

export const addPost = async (body: postType) => {
  try {
    return await api.post<postType>(URLS.postUrl, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error: any) {
    console.log("addPost ::", error.response);
    throw new Error(error.response.message);
  }
};
