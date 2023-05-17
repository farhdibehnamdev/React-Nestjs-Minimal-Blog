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
  background: "white",
};

export const tableContainerStyle: SxProps = {
  height: "400px",
  border: "1px solid #e9e5e5",

  ".customTableHeadStyle": {
    display: "table-header-group",
    background: "#f7f7f7",
    zIndex: 3,
    position: "sticky",
    top: "0px",
  },
  // ".customTableCell": {
  //   width: "150px",
  // },
  "::-webkit-scrollbar": {
    width: "10px",
  },

  /* Track */
  "::-webkit-scrollbar-track": {
    boxShadow: "inset 2px 2px 10px #f7f7f7",
    borderRadius: "2px",
  },

  /* Handle */
  "::-webkit-scrollbar-thumb": {
    background: "#cfd6d9",
    borderRadius: "2px",
  },

  /* Handle on hover */
  "::-webkit-scrollbar-thumb:hover": {
    background: "#869094",
  },
};

export const tableRowStyle: SxProps = {
  "&:last-child td, &:last-child th": { border: 0 },
};

export const chipStyle: SxProps = {
  padding: "6px",
  fontWeight: "bold",
  fontFamily: "IRANYekan",
  fontSize: "12px",
};

export default dataTableMUI;
