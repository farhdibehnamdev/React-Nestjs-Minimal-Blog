import { SxProps } from "@mui/material";

export const filterTable: SxProps = {
  marginBottom: "20px",
  background: "#fff",
  padding: "10px 25px 10px 25px",
  borderRadius: "10px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",

  ".textFieldFilterStyle": {
    outline: 0,
    margin: 0,

    ".filterTableHeaderInputPropsStyle": {
      background: "#fff",
      borderRadius: "5px",
      height: 40,
      width: "20vw",
    },
  },
};

const dataTableMUI: SxProps = {
  padding: "40px",
  boxShadow: "none",
  borderRadius: "10px",
  marginBottom: "30px",
};

export default dataTableMUI;
