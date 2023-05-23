import React from "react";
import {
  Button,
  Grid,
  TextField,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { UserRole } from "src/config/api/usersApi/usersApi";
import addEditFormStyle from "../common/styles/addEditForm.style";
import DoDisturbAltOutlinedIcon from "@mui/icons-material/DoDisturbAltOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { UserFormData } from "./UserManagement.type";
import { LoadingButton } from "@mui/lab";
const schema = yup.object({
  firstName: yup.string().required("فیلد نام اجباری است"),
  lastName: yup.string().required("فیلد نام خانوادگی اجباری است"),
  email: yup.string().email().required("فیلد ایمیل اجباری است"),
  password: yup.string().required("فیلد رمز عبور اجباری است"),
  isActive: yup.boolean(),
  isVerified: yup.boolean(),
  userRole: yup.string().required(),
});
export const AddEditUser = function ({
  typeOperation,
  onAdd,
  onEdit,
  editFormData,
  loading,
  setLoading,
}: any) {
  const initialState = {
    firstName: editFormData?.firstName || "",
    lastName: editFormData?.lastName || "",
    email: editFormData?.email || "",
    isActive: editFormData?.isActive || false,
    isVerified: editFormData?.isVerified || false,
    password: editFormData?.password || "",
    userRole: editFormData?.userRole || UserRole.USER,
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm<UserFormData>({
    resolver: yupResolver(schema),
    defaultValues: initialState,
  });

  const watchedFields = watch();
  const onSubmit = function (formData: UserFormData) {
    const allFieldsChanged = Object.keys(formData).every((field) => {
      if (
        typeof formData[field] === "string" ||
        typeof formData[field] === "boolean"
      )
        return formData[field] === watchedFields[field];
    });
    if (typeOperation === "Edit" && allFieldsChanged) {
      setLoading(true);
      onEdit(formData, "put");
    } else if (typeOperation === "Edit" && !allFieldsChanged) {
      setLoading(true);
      onEdit(formData, "patch");
    } else {
      setLoading(true);
      onAdd(formData);
    }
  };

  return (
    <Grid container sx={addEditFormStyle}>
      <form
        style={{ width: "100%", flexWrap: "wrap" }}
        onSubmit={handleSubmit((data) => onSubmit(data))}
      >
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="center"
          mb={3}
        >
          <Grid item xl={6}>
            <TextField
              {...register("firstName", { required: true })}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
              name="firstName"
              type="text"
              label="نام"
              placeholder="نام"
              fullWidth
            />
          </Grid>
          <Grid item xl={6}>
            <TextField
              {...register("lastName", { required: true })}
              error={!!errors.lastName}
              helperText={errors.firstName?.message}
              name="lastName"
              type="text"
              label="نام خانوادگی"
              placeholder="نام خانوادگی"
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="center"
          mb={3}
        >
          <Grid item xl={6}>
            <TextField
              {...register("email", { required: true })}
              error={!!errors.email}
              helperText={errors.email?.message}
              name="email"
              type="email"
              label="ایمیل"
              placeholder="ایمیل"
              fullWidth
            />
          </Grid>
          <Grid item xl={6}>
            <TextField
              {...register("password", { required: true })}
              error={!!errors.password}
              helperText={errors.password?.message}
              name="password"
              type="password"
              label="رمز عبور"
              placeholder="رمز عبور"
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="center"
          mb={3}
          sx={{
            border: "1px dot grey",
            borderRadius: "5px",
            padding: "10px",
          }}
        >
          <Grid item xl={4}>
            <FormControl>
              <FormLabel id="isActive-label">وضعیت کاربر</FormLabel>
              <Controller
                name="isActive"
                control={control}
                render={({ field }) => (
                  <RadioGroup row aria-labelledby="isActive-label" {...field}>
                    <FormControlLabel
                      value={true}
                      control={<Radio />}
                      label="فعال"
                    />
                    <FormControlLabel
                      value={false}
                      control={<Radio />}
                      label="غیر فعال"
                    />
                  </RadioGroup>
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xl={4}>
            <FormControl>
              <FormLabel id="userRole-label">نقش کاربر</FormLabel>
              <Controller
                name="userRole"
                control={control}
                render={({ field }) => (
                  <RadioGroup row aria-labelledby="userRole-label" {...field}>
                    <FormControlLabel
                      value="admin"
                      control={<Radio />}
                      label="مدیر"
                    />
                    <FormControlLabel
                      value="user"
                      control={<Radio />}
                      label="کاربر"
                    />
                  </RadioGroup>
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xl={4}>
            <FormControl>
              <FormLabel id="isVerified-label">وضعیت تایید</FormLabel>
              <Controller
                name="isVerified"
                control={control}
                render={({ field }) => (
                  <RadioGroup row aria-labelledby="isVerified-label" {...field}>
                    <FormControlLabel
                      value={true}
                      control={<Radio />}
                      label="بله"
                    />
                    <FormControlLabel
                      value={false}
                      control={<Radio />}
                      label="خیر"
                    />
                  </RadioGroup>
                )}
              />
            </FormControl>
          </Grid>
        </Grid>

        <br />
        <Grid container spacing={2} justifyContent="center">
          <Grid item xl={6}>
            <LoadingButton
              loading={loading}
              loadingPosition="end"
              startIcon={<SaveOutlinedIcon />}
              fullWidth
              variant="contained"
              type="submit"
              size="large"
            >
              ذخیره
            </LoadingButton>
            {/* <Button startIcon={<SaveOutlinedIcon />}>
              <Typography sx={{ color: "#fff", fontSize: "20px" }}></Typography>
            </Button> */}
          </Grid>
          <Grid item xl={6}>
            <Button
              color="error"
              fullWidth
              variant="contained"
              size="large"
              startIcon={<DoDisturbAltOutlinedIcon />}
            >
              <Typography sx={{ color: "#fff", fontSize: "20px" }}>
                بازگشت
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};
