import React, { useState } from "react";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { useTheme } from "@mui/system";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import {
  closeModal,
  deleteItemConfirm,
} from "src/store/slices/modal/modalSlice";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const DeleteConfirmation = function () {
  const { isOpen } = useSelector((state: any) => state.modal);
  const dispatch = useDispatch();
  const handleClose = () => dispatch(closeModal(false));
  const handleDelete = () => {
    dispatch(deleteItemConfirm(true));
    dispatch(closeModal(false));
  };
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xl"));
  return (
    <Dialog
      fullScreen={fullScreen}
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">{"حذف اطلاعات ؟"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          آیا از حذف Javascript اطمینان دارید؟
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDelete} autoFocus>
          حذف
        </Button>
        <Button autoFocus onClick={handleClose}>
          انصراف
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmation;
