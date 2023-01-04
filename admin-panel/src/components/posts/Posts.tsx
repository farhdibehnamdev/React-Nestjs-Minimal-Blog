import Grid from "@mui/material/Grid";
import useFetchPost from "../../hooks/useFetchPost";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import { BreadcrumbsType } from "../common/BreadcrumbsProps";
import DataTable from "../table/DataTable";
const breadcrumbTitles: BreadcrumbsType = {
  titles: ["داشبورد", "پست ها"],
};
const Posts = function () {
  const { post } = useFetchPost();

  return (
    <>
      <Grid item mb={5.2}>
        <h1>پست ها</h1>
        <Breadcrumbs {...breadcrumbTitles} />
      </Grid>
      <DataTable />
    </>
  );
};
export default Posts;
