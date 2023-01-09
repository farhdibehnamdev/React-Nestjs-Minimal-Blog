import { Grid, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "../card/Card";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import { BreadcrumbsType } from "../common/BreadcrumbsProps";
const breadcrumbTitles: BreadcrumbsType = {
  titles: ["داشبورد"],
};
const Home = function () {
  return (
    <>
      <Grid item mb={5.2}>
        <h1>داشبورد ها</h1>
        <Breadcrumbs {...breadcrumbTitles} />
      </Grid>
      <Stack flexDirection="row" className="stackStyleWrapperCards">
        <Card title="تعداد پست ها" counts={10} />
        <Card title="تعداد فهرست ها" counts={30} />
        <Card title="تعداد کاربران" counts={60} />
      </Stack>
      <Stack flexDirection="row">
        <Card />
      </Stack>
    </>
  );
};

export default Home;
