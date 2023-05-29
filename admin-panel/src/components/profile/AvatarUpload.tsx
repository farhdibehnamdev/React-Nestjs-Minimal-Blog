import { Box, Avatar, Typography, Chip, Grid } from "@mui/material";
import { avatarWrapper } from "./AvatarUpload.style";
import { useState } from "react";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import { generateThumbnail, isJSON } from "src/utils/generateThumbnail";
import { useAppSelector } from "src/store/hooks";

const AvatarUpload = function ({ currentUser, register }: any) {
  const { userInfo } = useAppSelector((state) => state.auth);
  const { image } = !isJSON(currentUser?.avatar!)
    ? (currentUser?.avatar! as any)
    : (JSON.parse(currentUser?.avatar!) as any);

  const [imagePreview, setImagePreview] = useState<string | null>(
    image ? generateThumbnail(image) : ""
  );
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImagePreview(URL.createObjectURL(e.target?.files[0]));
    }
  };

  return (
    <Grid item sx={{ marginRight: "10px" }}>
      <Grid item>
        <Box sx={avatarWrapper}>
          <Avatar className="profile-pic" src={imagePreview || ""} />
          <Box>
            <input
              id="avatar-image"
              className="file-upload"
              type="file"
              accept="image/*"
              {...register("avatar", {
                valueAsFile: true,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  handleImageChange(e),
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
        <Typography component="span">
          {currentUser.firstName} {currentUser.lastName}
        </Typography>
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
              {userInfo?.role === "admin" ? "مدیر" : "نویسنده"}
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
