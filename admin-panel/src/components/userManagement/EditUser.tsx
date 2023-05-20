import { useParams } from "react-router-dom";
import { BreadcrumbsType } from "../common/BreadcrumbsProps";
import useThunk from "src/hooks/useThunk";
import { editUserThunk } from "src/store/thunks/userThunks/editUser";
import { useAppSelector } from "src/store/hooks";
import { selectUserById } from "src/store/slices/user/userSlice";
import { useAlert } from "src/hooks/useAlert";
import { Notice } from "../notice/Notice";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import { Grid } from "@mui/material";
import { AddEditUser } from "./AddEditUser";
import { UserFormData } from "./UserManagement.type";

const breadcrumbTitles: BreadcrumbsType = {
  titles: ["مدیریت کاربران", "ویرایش کاربر"],
};
export const EditUser = function () {
  const { id } = useParams();
  const { showNotice, message, open, setOpen, noticeType } = useAlert();
  const [editUserInfo, isEditingUser, isEditingUserError] =
    useThunk(editUserThunk);
  const user = useAppSelector((state) => selectUserById(state, id as string));
  const handleUserEdit = function (
    formData: UserFormData,
    typeRequest: string
  ) {
    editUserInfo({ ...formData, id, typeRequest });
    if (isEditingUserError) {
      showNotice("مشکلی در ویرایش اطلاعات بوجود آمد", "error");
    } else {
      showNotice("کاربر با موفقیت ویرایش شد", "success");
    }
  };

  const handleClose = function () {
    setOpen(false);
  };
  return (
    <>
      {open && (
        <Notice
          open={open}
          alertType={noticeType}
          onClose={handleClose}
          message={message}
        />
      )}
      <Grid item mb={5.2}>
        <h1>ویرایش کاربر</h1>
        <Breadcrumbs {...breadcrumbTitles} />
      </Grid>
      <AddEditUser
        typeOperation="Edit"
        onEdit={handleUserEdit}
        editFormData={user}
      />
    </>
  );
};
