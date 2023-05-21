import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import { BreadcrumbsType } from "../common/BreadcrumbsProps";
import { Notice } from "../notice/Notice";
import { useAlert } from "src/hooks/useAlert";
import { UserFormData } from "./UserManagement.type";
import { Grid } from "@mui/material";
import { AddEditUser } from "./AddEditUser";
import { useNavigate } from "react-router-dom";
import { createUserApi } from "src/config/api/usersApi/usersApi";

const breadcrumbTitles: BreadcrumbsType = {
  titles: ["مدیریت کاربران", "افزودن کاربر"],
};

const AddUser = function () {
  const navigate = useNavigate();

  const { showNotice, open, message, setOpen, noticeType } = useAlert();

  const handleAddUser = async function (formData: UserFormData) {
    try {
      const response = await createUserApi(formData);
      if (response.status === 200) {
        showNotice("عملیات افزودن کاربر با موفقیت انجام شد", "success");
        setTimeout(() => {
          navigate("/user-management", { replace: true });
        }, 3000);
      } else {
        showNotice("عملیات افزودن کاربر با خطا مواجه شد", "error");
      }
    } catch (error) {
      showNotice("عملیات افزودن کاربر با خطا مواجه شد", "error");
      throw error;
    }
  };

  const handleClose = function () {
    setOpen(false);
  };

  return (
    <>
      <Notice
        open={open}
        alertType={noticeType}
        message={message}
        onClose={handleClose}
      />

      <Grid item mb={5.2}>
        <h1>ویرایش کاربر</h1>
        <Breadcrumbs {...breadcrumbTitles} />
      </Grid>

      <AddEditUser typeOperation="Add" onAdd={handleAddUser} />
    </>
  );
};

export default AddUser;
