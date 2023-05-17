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
import { generateThumbnail } from "src/utils/generateThumbnail";
const breadcrumbTitles: BreadcrumbsType = {
  titles: ["داشبورد", "پست ها"],
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
    width: 180,
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
    field: "publishedAt",
    headerName: "تاریخ انتشار",
    width: 150,
    type: "date",
  },
  {
    colId: 5,
    field: "updatedAt",
    headerName: "تاریخ بروزرسانی",
    width: 150,
    type: "date",
  },
  {
    colId: 6,
    field: "views",
    width: 120,
    headerName: "تعداد بازدید",
    type: "number",
  },
  {
    colId: 7,
    field: "likes",
    width: 120,
    headerName: "تعداد لایک ها",
    type: "number",
  },
  {
    colId: 8,
    field: "slug",
    width: 120,
    headerName: "عنوان آدرس",
    type: "string",
  },
  {
    colId: 9,
    field: "image",
    width: 20,
    headerName: "تصویر",
    type: "image",
    render: (row: any, column: any) => {
      return (
        <img src={generateThumbnail(row[column.field])} alt="articleImage" />
      );
    },
  },
  {
    colId: 10,
    field: "body",
    width: 10,
    headerName: "متن مقاله",
    type: "body",
  },
  {
    colId: 11,
    field: "operation",
    headerName: "ویرایش / حذف",
    type: "operation",
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
