import { Grid, TextField, Typography, Button } from "@mui/material";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import { BreadcrumbsType } from "../common/BreadcrumbsProps";
import addEditFormStyle from "../common/styles/addEditForm.style";
import DoDisturbAltOutlinedIcon from "@mui/icons-material/DoDisturbAltOutlined";
import ReplyIcon from "@mui/icons-material/Reply";
import { useLocation } from "react-router-dom";
import Chip from "@mui/material/Chip";
const breadcrumbTitles: BreadcrumbsType = {
  titles: ["داشبورد", "پیام دریافت شده"],
};
const MessageView = function () {
  const { state } = useLocation();
  const { messageTitle, messageBody, firstName, lastName, receivedDate } =
    state;

  return (
    <>
      <Grid flexDirection="column" mb={5.2}>
        <h1>پیام </h1>
        <Breadcrumbs {...breadcrumbTitles} />
      </Grid>
      <Grid container sx={addEditFormStyle}>
        <Grid container justifyContent="space-between" xl={12} mb={4}>
          <Grid item>
            <Chip
              label={
                <Grid item>
                  <Typography
                    component="span"
                    sx={{ color: "#fff", pr: "5px" }}
                  >
                    فرستنده پیام :
                  </Typography>

                  <Typography component="span" sx={{ color: "#fff" }}>
                    {firstName} {lastName}
                  </Typography>
                </Grid>
              }
              variant="filled"
              color="secondary"
            />
          </Grid>
          <Grid item>
            <Chip
              label={
                <Grid item>
                  <Typography
                    component="span"
                    sx={{ color: "#fff", pr: "5px" }}
                  >
                    تاریخ دریافت :
                  </Typography>

                  <Typography component="span" sx={{ color: "#fff" }}>
                    {receivedDate}
                  </Typography>
                </Grid>
              }
              variant="filled"
              color="secondary"
            />
          </Grid>
        </Grid>
        <Grid item xl={12} mb={4}>
          <TextField
            disabled
            type="text"
            placeholder="عنوان پیام"
            variant="outlined"
            fullWidth
            sx={{ backgroundColor: "#fff", borderRadius: "5px" }}
            value={messageTitle}
          />
        </Grid>
        <Grid item xl={12} mb={4}>
          <TextField
            disabled
            id="outlined-multiline-static"
            placeholder="متن پیام"
            multiline
            rows={12}
            variant="outlined"
            fullWidth
            value={messageBody}
          />
        </Grid>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xl={6}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              endIcon={<ReplyIcon />}
              type="submit"
            >
              <Typography sx={{ color: "#fff", fontSize: "20px" }}>
                پاسخ به {firstName} {lastName}
              </Typography>
            </Button>
          </Grid>
          <Grid item xl={6}>
            <Button
              color="error"
              fullWidth
              variant="contained"
              size="large"
              startIcon={<DoDisturbAltOutlinedIcon />}
            >
              <Typography sx={{ color: "#fff", fontSize: "20px" }}>
                بازگشت
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default MessageView;
