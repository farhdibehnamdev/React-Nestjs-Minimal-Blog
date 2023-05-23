import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import useThunk from "src/hooks/useThunk";
import { RootState } from "src/store";
import { useAppSelector } from "src/store/hooks";
import { fetchCategories } from "src/store/thunks/categoryThunks/fetchCategories";
import { removeCategory } from "src/store/thunks/categoryThunks/removeCategory";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import { BreadcrumbsType } from "../common/BreadcrumbsProps";
import DataTable from "../table/DataTable";
import { useLocation } from "react-router-dom";
const breadcrumbTitles: BreadcrumbsType = {
  titles: ["داشبورد", "فهرست"],
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
    field: "title",
    headerName: "عنوان",
    width: 20,
    type: "string",
  },
  {
    colId: 3,
    field: "isPublished",
    headerName: "وضعیت",
    width: 20,
    type: "boolean",
  },
  {
    colId: 4,
    field: "description",
    headerName: "توضیحات",
    width: 30,
    type: "string",
  },
  {
    colId: 5,
    field: "operation",
    headerName: "ویرایش / حذف",
    type: "operation",
  },
];
const Categories = function () {
  const { state } = useLocation();
  const categoryDataSelector = (state: RootState) => state.category;
  const [doFetchCategories] = useThunk(fetchCategories);
  const { data, count } = useAppSelector((state) => state.category);
  const [refreshTable, setRefreshTable] = useState(
    state?.refreshTable || false
  );
  useEffect(() => {
    if (refreshTable) {
      doFetchCategories({ all: false, offset: 0, limit: 5 }).then(() => {
        setRefreshTable(false);
      });
    }
  }, [doFetchCategories, refreshTable]);
  return (
    <>
      <Grid item mb={5.2}>
        <h1>فهرست ها</h1>
        <Breadcrumbs {...breadcrumbTitles} />
      </Grid>
      <DataTable
        columns={columns}
        rows={data}
        count={count}
        thunkFetch={fetchCategories}
        thunkRemove={removeCategory}
        typeOperation="فهرست"
        dataSelector={categoryDataSelector}
      />
    </>
  );
};

export default Categories;
