import * as yup from "yup";

export const validationSchema = yup.object().shape({
  firstName: yup.string(),
  lastName: yup.string(),
  avatar: yup.mixed(),
  oldPassword: yup
    .string()
    .test(
      "oldPasswordRequired",
      "Old password is required",
      function (value: any) {
        const { newPassword, confirmNewPassword } = this.parent;
        return newPassword || confirmNewPassword ? value : true;
      }
    ),
  newPassword: yup
    .string()
    .test(
      "newPasswordRequired",
      "New password is required",
      function (value: any) {
        const { confirmNewPassword } = this.parent;
        return confirmNewPassword ? value : true;
      }
    ),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), "null"], "Passwords must match")
    .test(
      "confirmNewPasswordRequired",
      "Confirm new password is required",
      function (value: any) {
        const { newPassword } = this.parent;
        return newPassword ? value : true;
      }
    ),
});
