import { SxProps } from "@mui/material";

export const fileUploadGridContainerStyle: SxProps = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  border: "2px dashed #1475cf",
  height: "300px",
  width: "100%",
  cursor: "pointer",
  borderRadius: "5px",
  marginBottom: "15px",
  ".fileUpload": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};
export const uploadedRow: SxProps = {
  margin: "10px 0",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px 20px",
  borderRadius: "5px",
  backgroundColor: "#e9f0ff",
};
