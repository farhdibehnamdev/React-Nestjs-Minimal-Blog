import AddEditCategory from "./AddEditCategory";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import { BreadcrumbsType } from "../common/BreadcrumbsProps";
import { addCategory } from "src/store/thunks/categoryThunks/addCategory";
import useThunk from "src/hooks/useThunk";
import { postCategoryType } from "src/config/api/categoriesApi/categoriesApi";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar/Snackbar";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
const breadcrumbTitles: BreadcrumbsType = {
  titles: ["فهرست", "افزودن فهرست"],
};
const AddCategory = function () {
  const navigate = useNavigate();
  const [createCategory, isCreatingCategory, creatingCategoryError] =
    useThunk(addCategory);
  const [open, setOpen] = useState<boolean>(false);
  const handleCategoryAdd = function (formData: postCategoryType) {
    createCategory(formData);
    setOpen(true);
    navigate("/categories", { state: { refreshTable: true } });
  };
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickAway") return;
    setOpen(false);
  };

  return (
    <>
      {!!creatingCategoryError ? (
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
            تگ با موفقیت ایجاد شد
          </Alert>
        </Snackbar>
      )}
      <Grid item mb={5.2}>
        <h1>افزودن فهرست</h1>
        <Breadcrumbs {...breadcrumbTitles} />
      </Grid>
      <AddEditCategory typeOperation="Add" onAdd={handleCategoryAdd} />
    </>
  );
};

export default AddCategory;
