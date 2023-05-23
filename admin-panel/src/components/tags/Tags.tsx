import { useEffect, useState } from "react";
import { useAppSelector } from "src/store/hooks";
import useThunk from "src/hooks/useThunk";
import { fetchTags } from "src/store/thunks/tagThunks/fetchTags";
import { removeTag } from "src/store/thunks/tagThunks/removeTag";
import { Grid, setRef } from "@mui/material";
import DataTable from "../table/DataTable";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import { BreadcrumbsType } from "../common/BreadcrumbsProps";
import { RootState } from "src/store";
import { useLocation } from "react-router-dom";

const breadcrumbTitles: BreadcrumbsType = {
  titles: ["داشبورد", "تگ"],
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
const Tags = function () {
  const { state } = useLocation();
  const tagsDataSelector = (state: RootState) => state.tags;
  const [doFetchTags] = useThunk(fetchTags);
  const { data, count } = useAppSelector((state) => state.tags);
  const [refreshTable, setRefreshTable] = useState(
    state?.refreshTable || false
  );
  useEffect(() => {
    if (refreshTable) {
      doFetchTags({ all: false, offset: 0, limit: 5 }).then(() => {
        setRefreshTable(false);
      });
    }
  }, [doFetchTags, refreshTable]);

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
