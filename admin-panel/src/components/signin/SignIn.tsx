import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signinUserApi } from "src/config/api/usersApi/usersApi";
import { authState, signIn } from "src/store/slices/auth/authSlice";

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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async function (
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    const email = event.currentTarget.email.value;
    const password = event.currentTarget.password.value;
    const response = await signinUserApi({ email, password });
    if (isApiResponse(response?.data)) {
      const { accessToken, refreshToken, userInfo } =
        response?.data as apiResponse;
      if (response?.status === 200) {
        localStorage.setItem("accToken", accessToken);
        localStorage.setItem("refToken", refreshToken);
        dispatch(signIn(userInfo));
        navigate("/");
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
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "30px",
        }}
        onSubmit={handleSubmit}
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
            placeholder="ایمیل خود را وارد کنید"
            name="email"
            type="email"
            fullWidth
          />
        </Grid>
        <Grid container item mb={3}>
          <TextField
            placeholder="رمز عبور خود را وارد کنید"
            name="password"
            type="password"
            fullWidth
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
              control={<Checkbox defaultChecked />}
              label="به خاطر سپاری"
            />
          </Grid>
          <Grid item>
            <Link to="#" style={{ textDecoration: "none", color: "#292727" }}>
              باز نشانی رمز عبور
            </Link>
          </Grid>
        </Grid>
        <Grid container justifyContent="center">
          <Button
            type="submit"
            fullWidth
            size="large"
            variant="contained"
            color="primary"
          >
            ورود
          </Button>
        </Grid>
      </form>
      <Divider />
      <Grid item mb={3}>
        <Typography textAlign="center" mt={3} sx={{ color: "#424040" }}>
          حسابی ندارید؟
        </Typography>
      </Grid>
      <Grid container justifyContent="center" alignItems="center">
        <Button type="submit" size="large" variant="outlined" color="primary">
          هم اکنون ثبت نام کنید!
        </Button>
      </Grid>
    </Grid>
  );
};

export default SignIn;
