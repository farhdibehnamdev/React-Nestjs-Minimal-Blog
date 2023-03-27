import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const SignUp = function () {
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
        <Grid container item mb={3}>
          <TextField
            placeholder="تکرار رمز عبور"
            name="password"
            type="password"
            fullWidth
          />
        </Grid>

        <Grid container justifyContent="center">
          <Button
            type="submit"
            fullWidth
            size="large"
            variant="contained"
            color="primary"
          >
            ثبت نام
          </Button>
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
