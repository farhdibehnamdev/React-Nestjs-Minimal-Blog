import {
  Alert,
  Button,
  Divider,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { signupUserApi } from "src/config/api/usersApi/usersApi";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { AlertColor } from "@mui/lab/Alert";
import { Notice } from "../notice/Notice";
import { useAlert } from "src/hooks/useAlert";
type SignupFormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

const schema = yup.object({
  email: yup.string().email().required("فیلد ایمیل اجباری است"),
  password: yup.string().required("فیلد پسورد اجباری است"),
  confirmPassword: yup.string().required("فیلد تکرار پسورد اجباری است"),
});

const SignUp = function () {
  const { showNotice, message, open, noticeType } = useAlert();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({ resolver: yupResolver(schema) });
  const navigate = useNavigate();
  const onSubmit = async function (data: SignupFormData) {
    const email = data.email;
    const password = data.password;
    const confirmPassword = data.confirmPassword;

    try {
      setIsLoading(true);
      const response = await signupUserApi({
        email,
        password,
        confirmPassword,
      });
      if (response?.status === 200) {
        showNotice("", "success");
        setIsLoading(false);
        navigate("/auth/verify-email");
      }
    } catch (error: any) {
      if (error?.response.status === 400) {
        setIsLoading(false);
        showNotice("کاربر با ایمیل مورد نظر قبلآ ثبت شده است", "error");
      } else {
        setIsLoading(false);
        showNotice("خطایی در ارسال اطلاعات بوجود آمد", "error");
      }
    }
  };

  return (
    <Grid
      sx={{
        background: "#fff",
        padding: "40px",
        borderRadius: "10px",
        width: "500px",
      }}
    >
      <Notice />
      <form
        onSubmit={handleSubmit((data) => onSubmit(data))}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <Grid item xl={12} mb={6}>
          <img src="../assets/images/logo.png" alt="logo_image" />
        </Grid>
        <Grid item mb={6}>
          <Typography
            component="h5"
            sx={{ fontWeight: "bold", fontSize: "20px" }}
          >
            ایجاد حساب
          </Typography>
        </Grid>
        <Grid container item mb={3}>
          <TextField
            {...register("email", { required: true })}
            placeholder="ایمیل خود را وارد کنید"
            name="email"
            type="email"
            fullWidth
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </Grid>
        <Grid container item mb={3}>
          <TextField
            {...register("password", { required: true })}
            placeholder="رمز عبور خود را وارد کنید"
            name="password"
            type="password"
            fullWidth
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        </Grid>
        <Grid container item mb={3}>
          <TextField
            {...register("confirmPassword", { required: true })}
            placeholder="تکرار رمز عبور"
            name="confirmPassword"
            type="password"
            fullWidth
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
        </Grid>

        <Grid container justifyContent="center">
          <LoadingButton
            size="small"
            endIcon={<SendIcon />}
            loading={isLoading}
            loadingPosition="end"
            variant="contained"
            type="submit"
            fullWidth
            sx={{ padding: "10px", fontSize: "15px" }}
          >
            ثبت نام
          </LoadingButton>
        </Grid>
      </form>
      <Divider />
      <Grid item mb={3}>
        <Typography textAlign="center" mt={3} sx={{ color: "#c7c1c1" }}>
          حساب کاربری دارید؟
        </Typography>
      </Grid>
      <Grid container justifyContent="center" alignItems="center">
        <Button type="submit" size="large" variant="outlined" color="primary">
          وارد شوید!
        </Button>
      </Grid>
    </Grid>
  );
};

export default SignUp;
