import React from "react";
import { Grid, Container } from "@mui/material";
import mainStyleGrid, { DashboardGridStyled } from "./Dashboard.style";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
const Dashboard = function () {
  const { toggle } = useSelector((state: any) => state.toggle);
  return (
    <DashboardGridStyled sx={mainStyleGrid} open={toggle}>
      <Grid component="main" className="mainContent">
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </Grid>
    </DashboardGridStyled>
  );
};

export default Dashboard;
