import React from "react";
import { Grid, Stack, Box } from "@mui/material";
import Card from "../card/Card";
import mainStyleGrid from "./Dashboard.style";
const Dashboard = function () {
  return (
    <Box component="main" sx={mainStyleGrid}>
      <Box className="boxCardStyleStack">
        <Stack flexDirection="row" sx={{ gap: "10px", marginBottom: "10px" }}>
          <Card title="تعداد پست ها" counts={10} />
          <Card title="تعداد فهرست ها" counts={30} />
          <Card title="تعداد کاربران" counts={60} />
        </Stack>
        <Stack flexDirection="row">
          <Card />
        </Stack>
      </Box>
    </Box>
  );
};

export default Dashboard;
