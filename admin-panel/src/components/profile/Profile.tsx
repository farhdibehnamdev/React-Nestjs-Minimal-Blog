import { Button, Grid, TextField } from "@mui/material";

const Profile = function () {
  return (
    <>
      <Grid
        container
        mb={5}
        sx={{
          background: "#cf1010",
          width: "100%",
          height: "25vh",
          borderRadius: "10px",
        }}
      ></Grid>
      <Grid
        container
        justifyContent="center"
        sx={{
          background: "#fff",
          borderRadius: "10px",
          width: "100%",
          padding: "40px",
        }}
      >
        <form style={{ width: "100%" }}>
          <Grid
            container
            justifyContent="space-around"
            spacing={2}
            xl={12}
            mb={3}
          >
            <Grid item xl={6}>
              <TextField
                placeholder="نام"
                fullWidth
                name="firstName"
                type="text"
              />
            </Grid>
            <Grid item xl={6}>
              <TextField
                placeholder="نام خانوادگی"
                fullWidth
                name="lastName"
                type="text"
              />
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="space-around"
            spacing={2}
            xl={12}
            mb={3}
          >
            <Grid item xl={6}>
              <TextField
                placeholder="ایمیل"
                fullWidth
                name="email"
                type="email"
              />
            </Grid>
            <Grid item xl={6}>
              <TextField placeholder="نقش" name="role" type="text" />
            </Grid>
          </Grid>
          <Grid item>
            <Button color="primary" variant="contained">
              بروز رسانی پروفایل
            </Button>
          </Grid>
        </form>
      </Grid>
    </>
  );
};

export default Profile;
