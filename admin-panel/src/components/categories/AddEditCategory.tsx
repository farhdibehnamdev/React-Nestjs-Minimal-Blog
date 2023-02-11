import { useState } from "react";
import {
  Box,
  TextField,
  Grid,
  FormControl,
  SelectChangeEvent,
  Switch,
  Typography,
  Button,
} from "@mui/material";
import { useForm } from "react-hook-form";
import FormControlLabel from "@mui/material/FormControlLabel";
import DoDisturbAltOutlinedIcon from "@mui/icons-material/DoDisturbAltOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import addEditFormStyle from "../common/styles/addEditForm.style";

const AddEditCategory = function () {
  const [age, setAge] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSumbit = function (data: any) {
    console.log("data:", data);
  };
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <>
      <Grid container sx={addEditFormStyle}>
        <form
          style={{ width: "100%", flexWrap: "wrap" }}
          onSubmit={handleSubmit(onSumbit)}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "25px",
            }}
          >
            <TextField
              fullWidth
              required
              id="outlined-required"
              label="عنوان پست"
              hiddenLabel={true}
              placeholder="عنوان پست"
              sx={{ marginRight: "10px" }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              marginBottom: "25px",
            }}
          >
            <FormControl
              fullWidth
              sx={{
                m: 1.2,
                minWidth: 120,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "5px",
                border: "1px solid #c6c6ce",
                padding: "6px",
              }}
            >
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="منتشر شود"
              />
            </FormControl>
          </Box>
          <br />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              fullWidth
              variant="contained"
              size="large"
              startIcon={<SaveOutlinedIcon />}
              sx={{ m: 1.2 }}
            >
              <Typography sx={{ color: "#fff", fontSize: "20px" }}>
                ذخیره
              </Typography>
            </Button>
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
          </Box>
        </form>
      </Grid>
    </>
  );
};

export default AddEditCategory;
