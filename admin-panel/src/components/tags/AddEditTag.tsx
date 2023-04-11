import React, { useState } from "react";
import {
  TextField,
  Grid,
  FormControl,
  Switch,
  Typography,
  Button,
} from "@mui/material";
import addEditFormStyle from "../common/styles/addEditForm.style";
import FormControlLabel from "@mui/material/FormControlLabel";
import DoDisturbAltOutlinedIcon from "@mui/icons-material/DoDisturbAltOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import RichTextEditor from "../richTextEditor/RichTextEditor";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormTagValidationType } from "./tags.types";
const schema = yup.object({
  title: yup.string().required(),
  isPublished: yup.boolean().notRequired(),
  description: yup.string().notRequired(),
});

const AddEditTag = function ({
  typeOperation,
  onAdd,
  onEdit,
  editFormData,
}: any) {
  const initialState = {
    isPublished: editFormData?.isPublished || true,
    title: editFormData?.title || "",
    description: editFormData?.description || "",
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormTagValidationType>({
    resolver: yupResolver(schema),
    defaultValues: initialState,
  });
  const [form, setForm] = useState(initialState);
  const onSumbit = function () {
    typeOperation === "Add" ? onAdd(form) : onEdit(form);
    reset({});
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
            <Controller
              name="title"
              control={control}
              render={({ field: { onChange, ...field } }) => (
                <TextField
                  {...field}
                  ref={null}
                  id="title"
                  fullWidth
                  label="عنوان تگ"
                  hiddenLabel={true}
                  placeholder="عنوان تگ"
                  error={!!errors.title}
                  helperText={errors.title ? "فیلد عنوان اجباری است" : null}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onChange(e);
                    handleChange(e);
                  }}
                />
              )}
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
                labelPlacement="end"
                label="منتشر شود"
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid item mb={3.1}>
          <RichTextEditor
            handleChange={handleChange}
            desc="description"
            elementName="description"
            Controller={Controller}
            control={control}
            errors={errors}
          />
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
