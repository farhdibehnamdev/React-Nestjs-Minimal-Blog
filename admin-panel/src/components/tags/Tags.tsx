import { Grid } from "@mui/material";
import DataTable from "../table/DataTable";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import { BreadcrumbsType } from "../common/BreadcrumbsProps";
import { fetchTags } from "src/store/thunks/tagThunks/fetchTags";
import useThunk from "src/hooks/useThunk";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { removeTag } from "src/store/thunks/tagThunks/removeTag";
import { removeItem } from "src/store/slices/tag/tagSlice";
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
    title: "توضیحات",
  },
  {
    id: 4,
    title: "عملیات",
  },
];
const Tags = function () {
  const { isDeleted } = useSelector((state: any) => state.modal);
  const [doFetchTags, isLoading, loadingTagsError] = useThunk(fetchTags);
  const [doDeleteItem] = useThunk(removeTag);
  const dispatch = useDispatch();
  const { data, count, removeTagItem } = useSelector(
    (state: any) => state.tags
  );
  useEffect(() => {
    if (typeof doFetchTags === "function") {
      doFetchTags();
    }
  }, [doFetchTags]);
  useEffect(() => {
    if (
      typeof doDeleteItem === "function" &&
      removeTagItem &&
      typeof doFetchTags === "function"
    ) {
      doDeleteItem(removeTagItem);
      doFetchTags();
      dispatch(removeItem(null));
    }
  }, [isDeleted, doDeleteItem, dispatch, removeTagItem]);

  return (
    <>
      <Grid flexDirection="column" mb={6.2}>
        <h1>تگ ها</h1>
        <Breadcrumbs {...breadcrumbTitles} />
      </Grid>
      <DataTable
        count={count}
        rows={data}
        columns={columns}
        thunkFunction={removeTag}
        typeOperation="تگ"
      />
    </>
  );
};

export default Tags;
