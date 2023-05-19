import React, { useEffect, useState } from "react";
import AddEditTag from "./AddEditTag";
import { BreadcrumbsType } from "../common/BreadcrumbsProps";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import useThunk from "src/hooks/useThunk";
import { editTag } from "src/store/thunks/tagThunks/editTag";
import { editTagType } from "src/config/api/tagsApi/tagsApi";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useParams } from "react-router-dom";
import { useAppSelector } from "src/store/hooks";
import { selectTagById } from "src/store/slices/tag/tagSlice";
import { fetchTags } from "src/store/thunks/tagThunks/fetchTags";

const breadcrumbTitles: BreadcrumbsType = {
  titles: ["تگ", "ویرایش تگ"],
};
const EditTag = function () {
  const { id } = useParams();
  const [currentTag, setCurrentTag] = useState();
  const [editTagInfo, isEditingTag, editingTagError] = useThunk(editTag);
  const tag = useAppSelector((state) =>
    selectTagById(state, parseInt(id as string))
  );
  const [open, setOpen] = useState<boolean>(false);
  const handleTagEdit = function (formData: editTagType) {
    editTagInfo({ ...formData, id });
    setOpen(true);
  };

  const handleClose = function () {
    setOpen(false);
  };
  return (
    <>
      {!!editingTagError ? (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          autoHideDuration={3000}
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
            تگ با موفقیت ویرایش شد
          </Alert>
        </Snackbar>
      )}
      <Grid item mb={5.2}>
        <h1>ویرایش تگ</h1>
        <Breadcrumbs {...breadcrumbTitles} />
      </Grid>
      <AddEditTag
        typeOperation="Edit"
        onEdit={handleTagEdit}
        editFormData={tag}
      />
    </>
  );
};

export default EditTag;
