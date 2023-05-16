import { Button, Grid, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
export const SignupLink = function () {
  return (
    <>
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
    </>
  );
};
