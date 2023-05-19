import AddEditCategory from "./AddEditCategory";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import { BreadcrumbsType } from "../common/BreadcrumbsProps";
import { useParams } from "react-router-dom";
import useThunk from "src/hooks/useThunk";
import { editCategory } from "src/store/thunks/categoryThunks/editCategory";
import { useAppSelector } from "src/store/hooks";
import { selectCategoryById } from "src/store/slices/category/categorySlice";
import { useState } from "react";
import { categoriesDataType } from "src/config/api/categoriesApi/categoriesApi";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";

const breadcrumbTitles: BreadcrumbsType = {
  titles: ["فهرست", "ویرایش فهرست"],
};
const EditCategory = function () {
  const { id } = useParams();
  const [editCategoryInfo, isEditingCategory, isEditingCategoryError] =
    useThunk(editCategory);
  const category = useAppSelector((state) =>
    selectCategoryById(state, parseInt(id as string))
  );
  const [open, setOpen] = useState<boolean>(false);
  const handleCategoryEdit = function (formData: categoriesDataType) {
    editCategoryInfo({ ...formData, id });
    setOpen(true);
  };

  const handleClose = function () {
    setOpen(false);
  };
  return (
    <>
      {!!isEditingCategoryError ? (
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
            فهرست با موفقیت ویرایش شد
          </Alert>
        </Snackbar>
      )}
      <Grid item mb={5.2}>
        <h1>ویرایش فهرست</h1>
        <Breadcrumbs {...breadcrumbTitles} />
      </Grid>

      <AddEditCategory
        typeOperation="Edit"
        onEdit={handleCategoryEdit}
        editFormData={category}
      />
    </>
  );
};

export default EditCategory;
