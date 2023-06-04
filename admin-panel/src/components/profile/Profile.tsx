import { Typography, Divider, Button, Grid, TextField } from "@mui/material";
import KeyboardBackspaceSharpIcon from "@mui/icons-material/KeyboardBackspaceSharp";
import AvatarUpload from "./AvatarUpload";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import { BreadcrumbsType } from "../common/BreadcrumbsProps";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useThunk from "src/hooks/useThunk";
import { userProfileThunk } from "src/store/thunks/userThunks/userProfileThunk";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { useUserUpdated } from "src/hooks/useUserUpdated";
import { selectUserById } from "src/store/slices/user/userSlice";
import { isJSON } from "src/utils/generateThumbnail";
import { validationSchema } from "./ValidationSchema";
import { setProfile } from "src/store/slices/profile/profileSlice";
const breadcrumbTitles: BreadcrumbsType = {
  titles: ["داشبورد", "پروفایل"],
};

type FormUploadData = {
  firstName: string;
  lastName: string;
  oldPassword: string;
  avatar: FileList | null;
  newPassword: string;
  confirmNewPassword: string;
};

const Profile = function () {
  const { setUserUpdated } = useUserUpdated();
  const { profileData } = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.auth);
  const currentUser = useAppSelector((state) =>
    selectUserById(state, userInfo?.id as string)
  );

  const img = profileData?.avatar || currentUser?.avatar;

  const { image } = img
    ? !isJSON(img!)
    : (img as any)
    ? (JSON.parse(img) as any)
    : { image: "" };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormUploadData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      firstName: currentUser?.firstName!,
      lastName: currentUser?.lastName!,
      avatar: image,
    },
  });
  const [userProfileEdit, isEdittingProfile, isProfileCreatedError] =
    useThunk(userProfileThunk);

  const onSubmit = function (formUploadData: FormUploadData) {
    let file: File;
    const formData = new FormData();
    formData.append("firstName", formUploadData.firstName);
    formData.append("lastName", formUploadData.lastName);
    file = formUploadData?.avatar?.[0] as File;
    formData.append("avatar", file);
    formData.append("newPassword", formUploadData.newPassword);
    userProfileEdit({ id: userInfo?.id, data: formData });
    if (isProfileCreatedError) {
      setUserUpdated(true);
      dispatch(
        setProfile({
          firstName: formUploadData.firstName,
          lastName: formUploadData.lastName,
          avatar: URL.createObjectURL(file) || "",
        })
      );
    }
  };

  return (
    <>
      <Grid flexDirection="column" mb={5.2}>
        <h1>پروفایل</h1>
        <Breadcrumbs {...breadcrumbTitles} />
      </Grid>
      <Grid
        container
        justifyContent="center"
        sx={{
          background: "#fff",
          borderRadius: "10px",
          width: "100%",
          padding: "40px",
          position: "relative",
        }}
      >
        <form
          style={{ width: "100%" }}
          onSubmit={handleSubmit((data: FormUploadData) => onSubmit(data))}
        >
          <Grid container justifyContent="space-around" alignItems="center">
            <AvatarUpload currentUser={profileData} register={register} />
            <Grid item xl={8} md={8}>
              <Grid
                item
                mb={5}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography>ویرایش پروفایل</Typography>
                <Link
                  to="/"
                  style={{
                    textDecoration: "none",
                    color: "#000",
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      justifyContent: "end",
                      alignItems: "center",
                    }}
                  >
                    <span>بازگشت به داشبورد</span>
                    <KeyboardBackspaceSharpIcon />
                  </span>
                </Link>
              </Grid>
              <Grid item mb={2}>
                <TextField
                  placeholder="نام"
                  fullWidth
                  type="text"
                  sx={{ mb: "20px" }}
                  {...register("firstName")}
                />
                <TextField
                  placeholder="نام خانوادگی"
                  fullWidth
                  type="text"
                  sx={{ mb: "20px" }}
                  {...register("lastName")}
                />
                <TextField
                  placeholder="رمز عبور فعلی"
                  fullWidth
                  type="password"
                  sx={{ mb: "20px" }}
                  {...register("oldPassword")}
                />
                <TextField
                  placeholder="رمز عبور"
                  fullWidth
                  type="password"
                  sx={{ mb: "20px" }}
                  {...register("newPassword")}
                />
                <TextField
                  fullWidth
                  placeholder="تکرار رمز عبور"
                  type="password"
                  sx={{ mb: "20px" }}
                  {...register("confirmNewPassword")}
                />
              </Grid>
              <Button color="primary" variant="contained" type="submit">
                بروز رسانی پروفایل
              </Button>
            </Grid>
          </Grid>
        </form>
        <Divider
          orientation="vertical"
          sx={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: "30%",
            width: "1px",
            bgcolor: "divider",
          }}
        />
      </Grid>
    </>
  );
};

export default Profile;
