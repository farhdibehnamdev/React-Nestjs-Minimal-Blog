import { Snackbar, Alert } from "@mui/material";
export const Notice = function ({ open, alertType, message, onClose }: any) {
  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      autoHideDuration={5000}
      onClose={onClose}
    >
      <Alert onClose={onClose} severity={alertType} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
