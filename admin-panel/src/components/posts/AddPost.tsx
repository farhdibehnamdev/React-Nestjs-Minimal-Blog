import Grid from "@mui/material/Grid";
import { useState } from "react";
import { postType } from "src/config/api/postsApi/postsApi";
import useThunk from "src/hooks/useThunk";
import { addPostThunk } from "src/store/thunks/postThunks/addPostThunk";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import { BreadcrumbsType } from "../common/BreadcrumbsProps";
import AddEditPost from "./AddEditPost";
const breadcrumbTitles: BreadcrumbsType = {
  titles: ["پست", "افزودن پست"],
};
const AddPost = function () {
  const [createPost, isCreatingPost, isCreatedPostError] =
    useThunk(addPostThunk);
  const [open, setOpen] = useState<boolean>(false);
  const handlePostAdd = function (formData: postType) {
    createPost(formData);
    setOpen(true);
  };
  return (
    <>
      <Grid item mb={5.2}>
        <h1>افزودن پست</h1>
        <Breadcrumbs {...breadcrumbTitles} />
      </Grid>
      <AddEditPost typeOperation="Add" onAdd={handlePostAdd} />
    </>
  );
};

export default AddPost;
