import Box from "@mui/material/Box";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import { BreadcrumbsType } from "../common/BreadcrumbsProps";
import AddEditTag from "./AddEditTag";
const breadcrumbTitles: BreadcrumbsType = {
  titles: ["تگ", "افزودن تگ"],
};
const AddTag = function () {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginBottom: "50px",
        }}
      >
        <h1>افزودن تگ</h1>
        <Breadcrumbs {...breadcrumbTitles} />
      </Box>
      <AddEditTag />
    </>
  );
};

export default AddTag;
