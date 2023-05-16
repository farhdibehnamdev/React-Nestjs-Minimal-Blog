import { Grid, Typography } from "@mui/material";
export const FormHeader = function () {
  return (
    <>
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
    </>
  );
};
