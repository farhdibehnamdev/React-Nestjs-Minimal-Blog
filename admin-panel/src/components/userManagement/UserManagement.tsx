import Grid from "@mui/material/Grid";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import DataTable from "../table/DataTable";
import { BreadcrumbsType } from "../common/BreadcrumbsProps";
import { RootState } from "src/store";
import { fetchUsers } from "src/store/thunks/userThunks/fetchUsers";
import { useAppSelector } from "src/store/hooks";
import { removeUserThunk } from "src/store/thunks/userThunks/removeUser";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useThunk from "src/hooks/useThunk";
const breadcrumbTitles: BreadcrumbsType = {
  titles: ["داشبورد", "مدیریت کاربران"],
};

const columns = [
  {
    colId: 1,
    field: "colId",
    headerName: "ردیف",
    width: 20,
    type: "number",
  },
  {
    colId: 2,
    field: "firstName",
    headerName: "نام",
    width: 20,
    type: "string",
  },
  {
    colId: 3,
    field: "lastName",
    headerName: "نام خانوادگی",
    width: 20,
    type: "string",
  },
  {
    colId: 4,
    field: "email",
    headerName: "ایمیل",
    width: 30,
    type: "string",
  },

  {
    colId: 5,
    field: "userRole",
    headerName: "نقش",
    type: "enum",
  },
  {
    colId: 6,
    field: "isVerified",
    headerName: "وضعیت تایید",
    type: "boolean",
  },
  {
    colId: 7,
    field: "isActive",
    headerName: "فعال/غیرفعال",
    type: "boolean",
  },
  {
    colId: 8,
    field: "operation",
    headerName: "ویرایش / حذف",
    type: "operation",
  },
];
const UserManagement = function () {
  const userDataSelector = (state: RootState) => state.users;
  const [doFetchUsers] = useThunk(fetchUsers);
  const { count, data } = useAppSelector((state) => state.users);
  const { state } = useLocation();
  const [refreshTable, setRefreshTable] = useState(
    state?.refreshTable || false
  );
  useEffect(() => {
    if (refreshTable) {
      doFetchUsers({ all: false, offset: 0, limit: 5 }).then(() => {
        setRefreshTable(false);
      });
    }
  }, [refreshTable, data, doFetchUsers]);

  return (
    <>
      <Grid item mb={5.2}>
        <h1>مدیریت کاربران</h1>
        <Breadcrumbs {...breadcrumbTitles} />
      </Grid>
      <DataTable
        count={count}
        rows={data}
        columns={columns}
        thunkFetch={fetchUsers}
        thunkRemove={removeUserThunk}
        typeOperation="کاربر"
        dataSelector={userDataSelector}
      />
    </>
  );
};

export default UserManagement;
