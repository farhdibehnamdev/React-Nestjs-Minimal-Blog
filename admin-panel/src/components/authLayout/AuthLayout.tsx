import Grid from "@mui/material/Grid";
import { Outlet } from "react-router-dom";

const AuthLayout = function () {
  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{
          height: "100vh",
        }}
      >
        <Outlet />
      </Grid>
    </>
  );
};

export default AuthLayout;
