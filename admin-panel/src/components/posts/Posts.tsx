import Grid from "@mui/material/Grid";
import { useEffect } from "react";
import { fetchPosts } from "src/config/api/postsApi/postsApi";
import useThunk from "src/hooks/useThunk";
import { RootState } from "src/store";
import { useAppSelector } from "src/store/hooks";
import { fetchPostsThunk } from "src/store/thunks/postThunks/fetchPostsThunk";
import { removeTag } from "src/store/thunks/tagThunks/removeTag";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import { BreadcrumbsType } from "../common/BreadcrumbsProps";
import DataTable from "../table/DataTable";
const breadcrumbTitles: BreadcrumbsType = {
  titles: ["داشبورد", "پست ها"],
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
    width: 180,
  },
  {
    colId: 3,
    field: "isPublished",
    headerName: "وضعیت",
    width: 20,
  },
  {
    colId: 4,
    field: "publishedAt",
    headerName: "تاریخ انتشار",
    width: 150,
  },
  {
    colId: 5,
    field: "updatedAt",
    headerName: "تاریخ بروزرسانی",
    width: 150,
  },
  {
    colId: 6,
    field: "views",
    width: 120,
    headerName: "تعداد بازدید",
  },
  {
    colId: 7,
    field: "likes",
    width: 120,
    headerName: "تعداد لایک ها",
  },
  {
    colId: 8,
    field: "slug",
    width: 120,
    headerName: "عنوان آدرس",
  },
  {
    colId: 9,
    field: "image",
    width: 20,
    headerName: "تصویر",
  },
  {
    colId: 10,
    field: "body",
    width: 10,
    headerName: "متن مقاله",
  },
  {
    colId: 11,
    field: "operation",
    headerName: "ویرایش / حذف",
  },
];
const Posts = function () {
  const postsDataSelector = (state: RootState) => state.post;
  const [doFetchPosts] = useThunk(fetchPostsThunk);
  const { data, count } = useAppSelector((state) => state.post);

  useEffect(() => {
    doFetchPosts({ all: false, offset: 0, limit: 5 });
  }, [doFetchPosts]);
  return (
    <>
      <Grid item mb={5.2}>
        <h1>پست ها</h1>
        <Breadcrumbs {...breadcrumbTitles} />
      </Grid>
      <DataTable
        count={count}
        rows={data}
        columns={columns}
        thunkFetch={fetchPostsThunk}
        thunkRemove={removeTag}
        typeOperation="پست ها"
        dataSelector={postsDataSelector}
      />
    </>
  );
};
export default Posts;
