import { Snackbar, Grid } from "@mui/material";
import React, { useState } from "react";
import { postTagsType } from "src/config/api/tagsApi/tagsApi";
import useThunk from "src/hooks/useThunk";
import { addTag } from "src/store/thunks/tagThunks/addTag";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import { BreadcrumbsType } from "../common/BreadcrumbsProps";
import AddEditTag from "./AddEditTag";
import Alert from "@mui/material/Alert";
const breadcrumbTitles: BreadcrumbsType = {
  titles: ["تگ", "افزودن تگ"],
};
const AddTag = function () {
  const [createTag, isCreatingTag, creatingTagError] = useThunk(addTag);
  const [open, setOpen] = useState<boolean>(false);
  const handleTagAdd = function (formData: postTagsType) {
    if (typeof createTag === "function") {
      createTag(formData);
      setOpen(true);
    }
  };
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  return (
    <>
      {!!creatingTagError === true ? (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            variant="filled"
            severity="error"
            sx={{ width: "100%" }}
          >
            مشکلی در ارسال دیتا بوجود آمده است
          </Alert>
        </Snackbar>
      ) : (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            تگ با موفقیت ایجاد شد
          </Alert>
        </Snackbar>
      )}
      <Grid item mb={5.2}>
        <h1>افزودن تگ</h1>
        <Breadcrumbs {...breadcrumbTitles} />
      </Grid>
      <AddEditTag typeOperation="Add" onAdd={handleTagAdd} />
    </>
  );
};

export default AddTag;
