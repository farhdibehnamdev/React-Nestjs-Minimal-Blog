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
    id: 1,
    title: "ردیف",
  },
  {
    id: 2,
    title: "عنوان",
  },
  {
    id: 3,
    title: "وضعیت",
  },
  {
    id: 4,
    title: "توضیحات",
  },

  {
    id: 5,
    title: "عملیات",
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
