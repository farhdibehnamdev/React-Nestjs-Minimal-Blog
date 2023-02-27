import { useEffect } from "react";
import { useAppSelector } from "src/store/hooks";
import useThunk from "src/hooks/useThunk";
import { fetchTags } from "src/store/thunks/tagThunks/fetchTags";
import { removeTag } from "src/store/thunks/tagThunks/removeTag";
import { Grid } from "@mui/material";
import DataTable from "../table/DataTable";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import { BreadcrumbsType } from "../common/BreadcrumbsProps";
import { RootState } from "src/store";

const breadcrumbTitles: BreadcrumbsType = {
  titles: ["داشبورد", "تگ"],
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
const Tags = function () {
  const tagsDataSelector = (state: RootState) => state.tags;
  const [doFetchTags] = useThunk(fetchTags);
  const { data, count } = useAppSelector((state) => state.tags);

  useEffect(() => {
    doFetchTags();
  }, [doFetchTags]);

  return (
    <>
      <Grid flexDirection="column" mb={5.2}>
        <h1>تگ ها</h1>
        <Breadcrumbs {...breadcrumbTitles} />
      </Grid>
      <DataTable
        count={count}
        rows={data}
        columns={columns}
        thunkFetch={fetchTags}
        thunkRemove={removeTag}
        typeOperation="تگ"
        dataSelector={tagsDataSelector}
      />
    </>
  );
};

export default Tags;
