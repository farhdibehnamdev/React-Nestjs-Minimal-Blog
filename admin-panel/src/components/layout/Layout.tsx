import React from "react";
import { Grid } from "@mui/material";
import Sidebar from "../sidebar/Sidebar";
const Layout = function () {
  return (
    <>
      <Grid container columnGap={5}>
        <Grid item>
          <Sidebar />
        </Grid>
        <Grid></Grid>
      </Grid>
    </>
  );
};

export default Layout;
