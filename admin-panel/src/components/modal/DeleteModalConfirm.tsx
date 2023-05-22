import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { useTheme } from "@mui/system";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch } from "react-redux";
import { closeModal } from "src/store/slices/modal/modalSlice";
import useThunk from "src/hooks/useThunk";
import Chip from "@mui/material/Chip";
import { Typography, Grid } from "@mui/material";
import { useAppSelector } from "src/store/hooks";

const DeleteModalConfirm = function ({
  state,
  perPage,
  thunkFetch,
  thunkRemove,
  offset,
}: any) {
  const { isOpen } = useAppSelector((state) => state.modal);
  const dispatch = useDispatch();
  const handleClose = () => dispatch(closeModal(false));
  const [doDeleteItem] = useThunk(thunkRemove);
  const [doFetchItems] = useThunk(thunkFetch);
  const handleDelete = async () => {
    doDeleteItem(state)
      .then(() => {
        dispatch(closeModal(false));
      })
      .then(() => {
        return doFetchItems({ all: false, offset, limit: perPage });
      })

      .catch((error: any) => {
        console.error("Error during delete or fetch:", error);
      });
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xl"));
  return (
    <Dialog
      fullScreen={fullScreen}
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="responsive-dialog-title">{"حذف اطلاعات ؟"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            gap="10px"
          >
            <Typography>آیا از حذف</Typography>
            <Chip
              label={state.title || state.email}
              color="error"
              variant="outlined"
            />
            <Typography>اطمینان دارید؟</Typography>
          </Grid>
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
