import {
  Grid,
  Card,
  Box,
  Typography,
  CardContent,
  Button,
} from "@mui/material";
export const VerifyEmail = function () {
  return (
    <>
      <Grid>
        <Card sx={{ minWidth: 475, padding: "20px", textAlign: "center" }}>
          <img
            width={85}
            height={85}
            src="/assets/images/mail-box.png"
            alt="mail-box"
          />
          <CardContent>
            <Box
              mb={3}
              border="2px solid #2192d0"
              borderRadius="5px"
              sx={{ backgroundColor: "#21ccf3" }}
            >
              <Typography
                sx={{
                  fontSize: "25px",
                  border: "2px solid #2192d0",
                  borderRadius: "5px",
                }}
              >
                لطفآ ایمیل خود را چک کنید
              </Typography>
            </Box>
            <Typography component="h1" sx={{ fontSize: "15px" }} mb={3}>
              ما یک لینک فعالسازی به ایمیل شما ارسال کردیم
            </Typography>
          </CardContent>
          <Button color="primary" variant="contained">
            بازگشت به صفحه ورود
          </Button>
        </Card>
      </Grid>
    </>
  );
};
