import { Grid } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
type loadingType = {
  loading: boolean;
};
export const SubmitButton = function ({ loading }: loadingType) {
  return (
    <Grid container justifyContent="center">
      <LoadingButton
        size="small"
        endIcon={<SendIcon />}
        loading={loading}
        loadingPosition="end"
        variant="contained"
        type="submit"
        fullWidth
        sx={{ padding: "10px", fontSize: "15px" }}
      >
        ورود
      </LoadingButton>
    </Grid>
  );
};
