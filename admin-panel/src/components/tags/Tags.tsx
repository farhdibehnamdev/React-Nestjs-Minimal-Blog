import { Grid } from "@mui/material";
import DataTable from "../table/DataTable";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import { BreadcrumbsType } from "../common/BreadcrumbsProps";
import { fetchTags } from "src/store/thunks/tagThunks/fetchTags";
import useThunk from "src/hooks/useThunk";
import { useSelector } from "react-redux";
import { useEffect } from "react";
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
  const [doFetchTags, isLoading, loadingTagsError] = useThunk(fetchTags);
  const { data, count } = useSelector((state: any) => state.tags);
  useEffect(() => {
    if (typeof doFetchTags === "function") {
      doFetchTags();
    }
  }, [doFetchTags]);
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
        typeOperation="تگ"
      />
    </>
  );
};

export default Tags;
