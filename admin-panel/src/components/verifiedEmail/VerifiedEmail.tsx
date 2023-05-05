import {
  Grid,
  Card,
  Box,
  Typography,
  CardContent,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { verifiedEmailApi } from "src/config/api/usersApi/usersApi";
export const VerifiedEmail = function () {
  const [status, setStatus] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") as string;
  useEffect(() => {
    const sendToken = async function () {
      const response = await verifiedEmailApi(token);
      if (response?.status === 200) {
        setStatus(true);
      } else {
        setStatus(false);
      }
    };
    sendToken();
  }, [token]);
  return (
    <Grid>
      <Card sx={{ minWidth: 475, padding: "20px", textAlign: "center" }}>
        <img
          width={85}
          height={85}
          src="/assets/images/sent.png"
          alt="mail-box"
        />
        {status && (
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
                ایمیمل شما با موفقیت فعال شد
              </Typography>
            </Box>
          </CardContent>
        )}
        <Button variant="contained" color="primary">
          <Link
            to="/auth/sign-in"
            style={{ color: "#fff", textDecoration: "none" }}
          >
            بازگشت به صفحه ورود
          </Link>
        </Button>
      </Card>
    </Grid>
  );
};
