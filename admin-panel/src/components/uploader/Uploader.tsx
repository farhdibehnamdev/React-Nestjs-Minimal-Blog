import { useRef, useState } from "react";
import { Grid, Box } from "@mui/material";
import { fileUploadGridContainerStyle, uploadedRow } from "./Uploader.style";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import PhotoIcon from "@mui/icons-material/Photo";

const Uploader = function ({ handleChange }: any) {
  const inputRef = useRef<any>(null);
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState("فایلی انتخاب نشده است");
  const handleClick = function () {
    inputRef.current.click();
  };
  const handleOnChange = function (event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      event.target.files[0] && setFileName(event.target.files[0].name);
      setImage(URL.createObjectURL(event.target.files[0]));
      handleChange(event);
    }
  };
  return (
    <>
      <Grid sx={fileUploadGridContainerStyle} onClick={handleClick}>
        <Grid className="fileUpload">
          <input
            type="file"
            ref={inputRef}
            className="inputField"
            value=""
            accept="image/*"
            hidden
            onChange={(event) => handleOnChange(event)}
          />
          {image ? (
            <img
              src={image}
              alt={fileName}
              width="400"
              height="300"
              style={{ objectFit: "contain" }}
            />
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <CloudUploadIcon sx={{ color: "#1475cf", fontSize: "45px" }} />
              <Typography>فایل خود را برای آپلود انتخاب کنید</Typography>
            </Box>
          )}
        </Grid>
      </Grid>
      <Box sx={uploadedRow}>
        <span
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              color: "#1475cf",
            }}
          >
            <PhotoIcon />
            <Typography>{fileName}</Typography>
          </Box>
          <DeleteIcon
            onClick={() => {
              setFileName("فایلی انتخاب نشده است");
              setImage(null);
            }}
            sx={{ color: "#1475cf", cursor: "pointer" }}
          />
        </span>
      </Box>
    </>
  );
};

export default Uploader;
