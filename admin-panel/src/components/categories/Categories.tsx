import Grid from "@mui/material/Grid";
import useThunk from "src/hooks/useThunk";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import { BreadcrumbsType } from "../common/BreadcrumbsProps";
import DataTable from "../table/DataTable";
const breadcrumbTitles: BreadcrumbsType = {
  titles: ["فهرست"],
};
const columns = [
  { id: 1, title: "ردیف" },
  { id: 2, title: "عنوان" },
  { id: 3, title: "وضعیت" },
  { id: 4, title: "توضیحات" },
  { id: 5, title: "عملیات" },
];
const Categories = function () {
  // const [doFetchCategories] = useThunk(fetchCategories);
  return (
    <>
      <Grid item mb={5.2}>
        <h1>فهرست ها</h1>
        <Breadcrumbs {...breadcrumbTitles} />
      </Grid>
      <DataTable columns={columns} />
    </>
  );
};

export default Categories;
