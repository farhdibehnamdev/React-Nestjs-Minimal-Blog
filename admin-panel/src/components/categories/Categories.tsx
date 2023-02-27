import Grid from "@mui/material/Grid";
import { useEffect } from "react";
import useThunk from "src/hooks/useThunk";
import { RootState } from "src/store";
import { useAppSelector } from "src/store/hooks";
import { fetchCategories } from "src/store/thunks/categoryThunks/fetchCategories";
import { removeCategory } from "src/store/thunks/categoryThunks/removeCategory";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import { BreadcrumbsType } from "../common/BreadcrumbsProps";
import DataTable from "../table/DataTable";
const breadcrumbTitles: BreadcrumbsType = {
  titles: ["داشبورد", "فهرست"],
};
const columns = [
  {
    colId: 1,
    field: "colId",
    headerName: "ردیف",
    width: 20,
  },
  {
    colId: 2,
    field: "title",
    headerName: "عنوان",
    width: 20,
  },
  {
    colId: 3,
    field: "isPublished",
    headerName: "وضعیت",
    width: 20,
  },
  {
    colId: 4,
    field: "description",
    headerName: "توضیحات",
    width: 30,
  },
  {
    colId: 5,
    field: "operation",
    headerName: "ویرایش / حذف",
  },
];
const Categories = function () {
  const categoryDataSelector = (state: RootState) => state.category;
  const [doFetchCategories] = useThunk(fetchCategories);
  const { data, count } = useAppSelector((state) => state.category);
  useEffect(() => {
    doFetchCategories();
  }, [doFetchCategories]);
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
