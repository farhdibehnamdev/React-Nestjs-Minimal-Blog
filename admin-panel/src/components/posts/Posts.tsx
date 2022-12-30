import { Outlet } from "react-router-dom";
import useFetchPost from "../../hooks/useFetchPost";
import DataTable from "../table/DataTable";

const Posts = function () {
  const { post } = useFetchPost();

  return <DataTable />;
};
export default Posts;
