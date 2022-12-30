import { Box, Grid } from "@mui/material";
import { fileUploadGridContainerStyle } from "./Uploader.style";

const Uploader = function () {
  return (
    <Grid sx={fileUploadGridContainerStyle}>
      <Grid className="fileUpload">
        <input
          name="file-upload-field"
          type="file"
          className="file-upload-field"
          value=""
          accept="image/*"
        />
      </Grid>
    </Grid>
  );
};

export default Uploader;
