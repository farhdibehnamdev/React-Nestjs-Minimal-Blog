import { Box, Avatar, Typography, Chip, Grid } from "@mui/material";
import { avatarWrapper } from "./AvatarUpload.style";
import { useRef, useState } from "react";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
const AvatarUpload = function ({ register }: any) {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | null>(null);
  const handleClick = function () {
    if (inputFileRef?.current) {
      (inputFileRef?.current as HTMLInputElement).click();
    }
  };

  const handleOnChange = function (event: React.ChangeEvent<HTMLInputElement>) {
    console.log("salam");

    if (event.target.files) {
      setImage(URL.createObjectURL(event.target.files[0]));
      console.log("set value ::", event.target.files);
      // setValue(event.target.files[0]);
    }
  };
  return (
    <Grid item sx={{ marginRight: "10px" }}>
      <Grid item>
        <Box sx={avatarWrapper}>
          <Avatar
            className="profile-pic"
            src={image || "assets/images/avatar.jpg"}
          />
          <Box>
            <input
              id="avatar-image"
              type="file"
              ref={inputFileRef}
              accept="image/*"
              className="file-upload"
              {...register("avatar", {
                onChange: (e: any) => handleOnChange(e),
              })}
            />
            <label htmlFor="avatar-image" className="uploadButton">
              <CameraAltOutlinedIcon sx={{ color: "#fff", opacity: "0.8" }} />
            </label>
          </Box>
        </Box>
      </Grid>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "15px",
        }}
      >
        <Typography component="span">بهنام فرهادی</Typography>
        <Chip
          sx={{
            backgroundColor: "#d36008",
            border: "2px solid #deddda",
          }}
          variant="filled"
          label={
            <Typography
              sx={{
                color: "#fff",
              }}
            >
              مدیر
            </Typography>
          }
        />
        <Chip
          sx={{ color: "Background", border: "2px solid #dedada" }}
          variant="filled"
          label={<Typography component="span">behnam@gmail.com</Typography>}
        />
      </Box>
    </Grid>
  );
};

export default AvatarUpload;
