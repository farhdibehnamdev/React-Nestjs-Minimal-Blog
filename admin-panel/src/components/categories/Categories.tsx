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
  { id: 1, title: "ردیف" },
  { id: 2, title: "عنوان" },
  { id: 3, title: "وضعیت" },
  { id: 4, title: "توضیحات" },
  { id: 5, title: "عملیات" },
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
