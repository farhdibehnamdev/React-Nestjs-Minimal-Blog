import React from "react";
import { Grid, Stack, Box, Container } from "@mui/material";
import Card from "../card/Card";
import mainStyleGrid from "./Dashboard.style";
const Dashboard = function () {
  return (
    <Grid sx={mainStyleGrid}>
      <Grid component="main" className="mainContent">
        <Container maxWidth="lg">
          <Stack flexDirection="row" className="stackStyleWrapperCards">
            <Card title="تعداد پست ها" counts={10} />
            <Card title="تعداد فهرست ها" counts={30} />
            <Card title="تعداد کاربران" counts={60} />
          </Stack>
          <Stack flexDirection="row">
            <Card />
          </Stack>
        </Container>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
