import React from "react";
import { Grid, Stack, Container } from "@mui/material";
import Card from "../card/Card";
import mainStyleGrid, { DashboardGridStyled } from "./Dashboard.style";
import { useSelector } from "react-redux";
const Dashboard = function () {
  const { toggle } = useSelector((state: any) => state.toggle);
  return (
    <DashboardGridStyled sx={mainStyleGrid} open={toggle}>
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
    </DashboardGridStyled>
  );
};

export default Dashboard;
