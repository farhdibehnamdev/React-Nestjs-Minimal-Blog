import React, { useState } from "react";
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
import addEditFormStyle from "../common/styles/addEditForm.style";
import FormControlLabel from "@mui/material/FormControlLabel";
import DoDisturbAltOutlinedIcon from "@mui/icons-material/DoDisturbAltOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import RichTextEditor from "../richTextEditor/RichTextEditor";

const AddEditTag = function ({ typeOperation, onAdd }: any) {
  const initialState = {};
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [form, setForm] = useState(initialState);
  const onSumbit = function () {
    console.log("form::", form);
    onAdd(form);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((state) => ({
      ...state,
      [event.target.name]:
        event.target.name === "isPublished"
          ? event.target.checked
          : event.target.value,
    }));
  };

  return (
    <Grid container sx={addEditFormStyle}>
      <form
        style={{ width: "100%", flexWrap: "wrap" }}
        onSubmit={handleSubmit(onSumbit)}
      >
        <Grid container spacing={2}>
          <Grid
            item
            xl={6}
            alignItems="center"
            justifyContent="space-between"
            mb={3.1}
          >
            <TextField
              fullWidth
              required
              label="عنوان تگ"
              hiddenLabel={true}
              placeholder="عنوان تگ"
              onChange={handleChange}
              name="title"
            />
          </Grid>
          <Grid
            item
            xl={6}
            alignItems="center"
            justifyContent="space-between"
            mb={3.1}
          >
            <FormControl
              fullWidth
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "5px",
                border: "1px solid #c6c6ce",
                padding: "6px",
              }}
            >
              <FormControlLabel
                control={
                  <Switch
                    defaultChecked
                    onChange={handleChange}
                    name="isPublished"
                  />
                }
                label="منتشر شود"
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid item mb={3.1}>
          <RichTextEditor handleChange={handleChange} desc="description" />
        </Grid>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xl={6}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              startIcon={<SaveOutlinedIcon />}
              type="submit"
            >
              <Typography sx={{ color: "#fff", fontSize: "20px" }}>
                ذخیره
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
      </form>
    </Grid>
  );
};

export default AddEditTag;
