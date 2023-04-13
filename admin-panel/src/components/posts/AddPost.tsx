import Grid from "@mui/material/Grid";
import { useState } from "react";
import { postType } from "src/config/api/postsApi/postsApi";
import useThunk from "src/hooks/useThunk";
import { addPostThunk } from "src/store/thunks/postThunks/addPostThunk";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import { BreadcrumbsType } from "../common/BreadcrumbsProps";
import AddEditPost from "./AddEditPost";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar/Snackbar";
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
  const handleClose = (event: React.SyntheticEvent | Event, reason: string) => {
    if (reason === "clickAway") return;
    setOpen(false);
  };
  return (
    <>
      {isCreatedPostError ? (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert severity="error"> افزودن پست با خطا مواجه شد </Alert>
        </Snackbar>
      ) : (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
            پست با موفقیت ایجاد شد
          </Alert>
        </Snackbar>
      )}
      <Grid item mb={5.2}>
        <h1>افزودن پست</h1>
        <Breadcrumbs {...breadcrumbTitles} />
      </Grid>

      <AddEditPost typeOperation="Add" onAdd={handlePostAdd} />
    </>
  );
};

export default AddPost;
