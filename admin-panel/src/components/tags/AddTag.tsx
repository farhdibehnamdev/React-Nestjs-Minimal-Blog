import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import { BreadcrumbsType } from "../common/BreadcrumbsProps";
import AddEditTag from "./AddEditTag";
const breadcrumbTitles: BreadcrumbsType = {
  titles: ["تگ", "افزودن تگ"],
};
const AddTag = function () {
  return (
    <>
      <Grid item mb={5.2}>
        <h1>افزودن تگ</h1>
        <Breadcrumbs {...breadcrumbTitles} />
      </Grid>
      <AddEditTag />
    </>
  );
};

export default AddTag;
