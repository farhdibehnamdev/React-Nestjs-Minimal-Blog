import AddEditTag from "./AddEditTag";
import { BreadcrumbsType } from "../common/BreadcrumbsProps";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import Box from "@mui/material/Box";
const breadcrumbTitles: BreadcrumbsType = {
  titles: ["تگ", "ویرایش تگ"],
};
const EditTag = function () {
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
        <h1>ویرایش تگ</h1>
        <Breadcrumbs {...breadcrumbTitles} />
      </Box>
      <AddEditTag />
    </>
  );
};

export default EditTag;
