import api from "../api";

const URLS = {
  fetchTagUrl: "api/tag",
  postTagUrl: "api/tag",
};

type tagsData = {
  id: number;
  title: string;
  description: string;
};

type postTagsType = {
  title: string;
  description: string;
};
export const fetchTagsData = async () => {
  return await api.get<tagsData[]>(URLS.fetchTagUrl);
};

export const postTagData = async (body: any) => {
  return await api.post<postTagsType>(URLS.postTagUrl, body);
};
