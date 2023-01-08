import Grid from "@mui/material/Grid";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import DataTable from "../table/DataTable";
import { BreadcrumbsType } from "../common/BreadcrumbsProps";
const breadcrumbTitles: BreadcrumbsType = {
  titles: ["داشبورد", "مدیریت کاربران"],
};
const UserManagement = function () {
  return (
    <>
      <Grid item mb={5.2}>
        <h1>مدیریت کاربران</h1>
        <Breadcrumbs {...breadcrumbTitles} />
      </Grid>
      <DataTable />
    </>
  );
};

export default UserManagement;
