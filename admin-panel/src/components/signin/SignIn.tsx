import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Snackbar,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { signinUserApi } from "src/config/api/usersApi/usersApi";
import { signIn } from "src/store/slices/auth/authSlice";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import LoadingButton from "@mui/lab/LoadingButton";
const schema = yup.object({
  email: yup.string().email().required("فیلد ایمیل اجباری است"),
  password: yup
    .string()
    .required("فیلد پسورد اجباری است")
    .min(8, "پسورد باید حداقل 8 کاراکتر باشد"),
});

type FormData = {
  email: string;
  password: string;
};

type user = {
  id: number;
  email: string;
  role: string;
};

export interface apiResponse {
  accessToken: string;
  refreshToken: string;
  userInfo: user;
}

const isApiResponse = function (data: any): data is apiResponse {
  return "accessToken" in data && "refreshToken" in data;
};

const SignIn = function () {
  const [open, setOpen] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });
  const dispatch = useDispatch();
  const handleRememberMe = function () {
    setRememberMe(!rememberMe);
  };
  const onSubmit = async function (data: FormData) {
    const email = data.email;
    const password = data.password;

    const response = await signinUserApi({ email, password, rememberMe });
    if (isApiResponse(response?.data)) {
      const { accessToken, refreshToken, userInfo } =
        response?.data as apiResponse;
      if (response?.status === 200) {
        setOpen(true);
        localStorage.setItem("accToken", accessToken);
        localStorage.setItem("refToken", refreshToken);
        setIsLoading(true);
        setTimeout(() => {
          dispatch(signIn(userInfo));
        }, 3000);
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
      {isLoading ? (
        <Snackbar
          open={open}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          autoHideDuration={2000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            با موفقیت وارد شدید
          </Alert>
        </Snackbar>
      ) : (
        <Snackbar
          open={open}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          autoHideDuration={2000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            مشکلی در ورود به پنل ادمین بوجود آمد
          </Alert>
        </Snackbar>
      )}
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "30px",
        }}
        onSubmit={handleSubmit((data) => onSubmit(data))}
      >
        <Grid item xl={12} mb={6}>
          <img src="../assets/images/logo.png" alt="logo_image" />
        </Grid>
        <Grid item mb={6}>
          <Typography
            component="h5"
            sx={{ fontWeight: "bold", fontSize: "20px" }}
          >
            ورود
          </Typography>
        </Grid>
        <Grid container item mb={3}>
          <TextField
            {...register("email", { required: true })}
            error={!!errors.email}
            placeholder="ایمیل خود را وارد کنید"
            name="email"
            type="email"
            fullWidth
            helperText={errors.email?.message}
          />
        </Grid>
        <Grid container item mb={3}>
          <TextField
            {...register("password", { required: true })}
            error={!!errors.password}
            placeholder="رمز عبور خود را وارد کنید"
            name="password"
            type="password"
            fullWidth
            helperText={errors.password?.message}
          />
        </Grid>
        <Grid
          container
          item
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          mb={3}
        >
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox value={rememberMe} onChange={handleRememberMe} />
              }
              label="به خاطر سپاری"
            />
          </Grid>
          <Grid item>
            <Link
              to="/auth/forget-password"
              style={{ textDecoration: "none", color: "#292727" }}
            >
              باز نشانی رمز عبور
            </Link>
          </Grid>
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
            ورود
          </LoadingButton>
        </Grid>
      </form>
      <Divider />
      <Grid item mb={3}>
        <Typography textAlign="center" mt={3} sx={{ color: "#424040" }}>
          حسابی ندارید؟
        </Typography>
      </Grid>
      <Grid container justifyContent="center" alignItems="center">
        <NavLink to="/auth/sign-up">
          <Button type="submit" size="large" variant="outlined" color="primary">
            هم اکنون ثبت نام کنید!
          </Button>
        </NavLink>
      </Grid>
    </Grid>
  );
};

export default SignIn;
