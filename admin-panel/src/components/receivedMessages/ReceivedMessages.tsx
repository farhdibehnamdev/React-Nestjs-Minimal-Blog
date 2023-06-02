import { useAppSelector } from "src/store/hooks";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import { BreadcrumbsType } from "../common/BreadcrumbsProps";
import { Grid } from "@mui/material";
import DataTable from "../table/DataTable";
import useThunk from "src/hooks/useThunk";
import { RootState } from "src/store";
import { fetchReceivedMessages } from "src/store/thunks/messageThunks/fetchReceivedMessages";
import { useEffect } from "react";
const breadcrumbTitles: BreadcrumbsType = {
  titles: ["داشبورد", "پیام های دریافت شده"],
};
const columns = [
  {
    colId: 1,
    field: "colId",
    headerName: "ردیف",
    width: 20,
    type: "number",
  },
  {
    colId: 2,
    field: "firstName",
    headerName: "نام",
    width: 20,
    type: "string",
  },
  {
    colId: 3,
    field: "lastName",
    headerName: "نام خانوادگی",
    width: 20,
    type: "string",
  },
  {
    colId: 4,
    field: "messageTitle",
    headerName: "عنوان",
    width: 30,
    type: "string",
  },
  {
    colId: 5,
    field: "messageBody",
    headerName: "پیام",
    width: 30,
    type: "string",
  },

  {
    colId: 6,
    field: "readMessage",
    headerName: "",
    width: 30,
    type: "readMessage",
  },
];
const ReceivedMessages = function () {
  const { userInfo } = useAppSelector((state) => state.auth);
  const { count, data } = useAppSelector((state) => state.messages);
  const messagesDataSelector = (state: RootState) => state.messages;
  const [doFetchMessages] = useThunk(fetchReceivedMessages);

  useEffect(() => {
    doFetchMessages({ all: false, offset: 0, limit: 5, id: userInfo?.id });
  }, [doFetchMessages, userInfo?.id]);

  return (
    <>
      <Grid flexDirection="column" mb={5.2}>
        <h1>پیام های دریافت شده</h1>
        <Breadcrumbs {...breadcrumbTitles} />
      </Grid>
      <DataTable
        count={count}
        rows={data}
        columns={columns}
        thunkFetch={fetchReceivedMessages}
        typeOperation="پیام های دریافت شده"
        dataSelector={messagesDataSelector}
        currentUser={userInfo?.id}
      />
    </>
  );
};

export default ReceivedMessages;
