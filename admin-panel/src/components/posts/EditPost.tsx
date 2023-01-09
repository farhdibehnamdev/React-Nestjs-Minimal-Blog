import Grid from "@mui/material/Grid";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import { BreadcrumbsType } from "../common/BreadcrumbsProps";
import AddEditPost from "./AddEditPost";
const breadcrumbTitles: BreadcrumbsType = {
  titles: ["پست", "ویرایش پست"],
};
const EditPost = function () {
  return (
    <>
      <Grid item mb={5.2}>
        <h1>ویرایش پست</h1>
        <Breadcrumbs {...breadcrumbTitles} />
      </Grid>
      <AddEditPost />;
    </>
  );
};

export default EditPost;
