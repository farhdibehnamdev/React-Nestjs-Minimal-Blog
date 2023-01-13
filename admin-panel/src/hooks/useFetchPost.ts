import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchPost } from "../config/api/postsApi/postsApi";

const useFetchPost = () => {
  const {} = useDispatch();
  const [post, setPost] = useState<string>();
  const initFetchPost = async () => {
    const response = await fetchPost();
    setPost(JSON.stringify(response.data));
  };
  useEffect(() => {
    initFetchPost();
  }, []);
  return { post };
};
export default useFetchPost;
