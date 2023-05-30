import { Divider, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { signinUserApi } from "src/config/api/usersApi/usersApi";
import { signIn } from "src/store/slices/auth/authSlice";
import { useState } from "react";
import { SignupLink } from "./SignupLink";
import { FormFields } from "./FormFields";
import { useAlert } from "src/hooks/useAlert";
import { FormData, apiResponse } from "./signin.types";
import { FormHeader } from "./FormHeader";
import { Notice } from "../notice/Notice";
import { SigninGridStyle } from "./SignInGridStyled.style";
import { setProfile } from "src/store/slices/profile/profileSlice";

const isApiResponse = function (data: any): data is apiResponse {
  return "accessToken" in data && "refreshToken" in data;
};

const SignIn = function () {
  const { showNotice, message, open, setOpen, noticeType } = useAlert();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const submitForm = async function (data: FormData) {
    try {
      const response = await signinUserApi(data);
      if (isApiResponse(response?.data)) {
        const { accessToken, refreshToken, userInfo } =
          response?.data as apiResponse;
        if (response?.status === 200) {
          localStorage.setItem("accToken", accessToken);
          localStorage.setItem("refToken", refreshToken);
          setIsLoading(true);
          showNotice("با موفقیت وارد شدید", "success");
          dispatch(
            setProfile({
              firstName: userInfo.firstName,
              lastName: userInfo.lastName,
              avatar: userInfo.avatar,
            })
          );
          setTimeout(() => {
            dispatch(signIn(userInfo));
          }, 3000);
        }
      }
    } catch (error: any) {
      if (error?.response.status === 404) {
        showNotice("کاربری با این مشخصات یافت نشد", "error");
      } else if (error?.response.status === 403) {
        showNotice("حساب کاربری غیرفعال یا تایید نشده است.", "error");
      } else {
        showNotice("خطا در ورود به پنل", "error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Grid sx={SigninGridStyle}>
      <FormHeader />
      <FormFields onSubmit={submitForm} isLoading={isLoading} />
      <Divider />
      <SignupLink />
      <Notice
        open={open}
        message={message}
        alertType={noticeType}
        onClose={handleClose}
      />
    </Grid>
  );
};

export default SignIn;
