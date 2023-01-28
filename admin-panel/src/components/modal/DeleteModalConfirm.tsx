import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { useTheme } from "@mui/system";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "src/store/slices/tag/tagSlice";

import { closeModal } from "src/store/slices/modal/modalSlice";

const DeleteModalConfirm = function ({ state }: any) {
  const { isOpen } = useSelector((state: any) => state.modal);
  const dispatch = useDispatch();
  const handleClose = () => dispatch(closeModal(false));
  const handleDelete = () => {
    dispatch(removeItem(state));
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
          آیا از حذف {state.title} اطمینان دارید؟
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDelete} autoFocus>
          بله
        </Button>
        <Button autoFocus onClick={handleClose}>
          خیر
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModalConfirm;
