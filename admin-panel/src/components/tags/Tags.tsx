import Box from "@mui/material/Box";
import DataTable from "../table/DataTable";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import { BreadcrumbsType } from "../common/BreadcrumbsProps";
const breadcrumbTitles: BreadcrumbsType = {
  titles: ["تگ"],
};
const Tags = function () {
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
        <h1>تگ ها</h1>
        <Breadcrumbs {...breadcrumbTitles} />
      </Box>
      <DataTable />
    </>
  );
};

export default Tags;
