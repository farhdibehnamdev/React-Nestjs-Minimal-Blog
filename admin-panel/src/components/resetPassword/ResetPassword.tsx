import { Grid, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

const ResetPassword = function () {
  return (
    <Grid
      sx={{
        width: "500px",
        background: "#fff",
        padding: "40px",
        borderRadius: "10px",
      }}
    >
      <Grid item mb={3} textAlign="center">
        <img src="../assets/images/logo.png" alt="logo_image" />
      </Grid>
      <Grid item mb={3} textAlign="center">
        <Typography>بازنشانی رمز عبور</Typography>
      </Grid>
      <form>
        <Grid item mb={3}>
          <TextField
            fullWidth
            name="email"
            placeholder="ایمیل خود را وارد کنید"
            type="email"
          />
        </Grid>
        <Grid item mb={3}>
          <Button color="primary" variant="contained" fullWidth>
            ثبت
          </Button>
        </Grid>
      </form>
      <Divider />
      <Grid item mt={3} textAlign="center">
        <Typography>یک عمل دیگر انجام دهید.</Typography>
      </Grid>
      <Grid
        mt={4}
        container
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Button variant="outlined" color="primary" sx={{ fontSize: "12px" }}>
          هم اکنون ثبت نام کنید!
        </Button>
        <p>یا</p>
        <Button variant="outlined" color="primary" sx={{ fontSize: "12px" }}>
          وارد شوید!
        </Button>
      </Grid>
    </Grid>
  );
};

export default ResetPassword;
