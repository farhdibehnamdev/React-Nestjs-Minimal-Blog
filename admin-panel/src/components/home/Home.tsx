import { Stack } from "@mui/material";
import Card from "../card/Card";

const Home = function () {
  return (
    <>
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
