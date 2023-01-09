import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import { BreadcrumbsType } from "../common/BreadcrumbsProps";
import AddEditPost from "./AddEditPost";
const breadcrumbTitles: BreadcrumbsType = {
  titles: ["پست", "افزودن پست"],
};
const AddPost = function () {
  return (
    <>
      <Grid item mb={5.2}>
        <h1>افزودن پست</h1>
        <Breadcrumbs {...breadcrumbTitles} />
      </Grid>
      <AddEditPost />
    </>
  );
};

export default AddPost;
