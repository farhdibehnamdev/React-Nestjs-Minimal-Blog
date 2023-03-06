import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  Switch,
  Autocomplete,
  Typography,
  Button,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { Controller, useForm } from "react-hook-form";
import addEditFormStyle from "../common/styles/addEditForm.style";
import FormControlLabel from "@mui/material/FormControlLabel";
import Uploader from "../uploader/Uploader";
import RichTextEditor from "../richTextEditor/RichTextEditor";
import DoDisturbAltOutlinedIcon from "@mui/icons-material/DoDisturbAltOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import * as yup from "yup";
import { formPostValidationType } from "./Post.type";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppSelector } from "src/store/hooks";

const schema = yup.object({
  title: yup.string().required(),
  isPublished: yup.boolean().notRequired(),
  body: yup.string().required(),
  publishedAt: yup.string().required(),
  mainImageUrl: yup.string().required(),
  userId: yup.string().required(),
  tags: yup.string().required(),
});
const AddEditPost = function ({
  typeOperation,
  onAdd,
  onEdit,
  editFormData,
}: any) {
  const initialState = {
    isPublished: editFormData?.isPublished || true,
    title: editFormData?.title || "",
    body: editFormData?.body || "",
    mainImageUrl: editFormData?.mainImageUrl || "",
    publishedAt: editFormData?.publishedAt || "",
    userId: editFormData?.userId || "",
    tags: editFormData?.tags || [],
  };
  const { data } = useAppSelector((state) => state.category);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<formPostValidationType>({
    resolver: yupResolver(schema),
    defaultValues: initialState,
  });
  const [form, setForm] = useState(initialState);
  const [category, setCategory] = useState("");
  const onSumbit = function () {
    typeOperation === "Add" ? onAdd(form) : onEdit(form);
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

  const handleSelectChange = (event: SelectChangeEvent<any>) => {
    const name = event.target.name;
    const value = event.target.value;
    setForm((state) => ({
      ...state,
      [name]: value,
    }));
    console.log("set from ::", form);
    setCategory(value);
  };

  useEffect(() => {
    console.log("data ::", data);
  }, [data]);

  return (
    <>
      <Grid container sx={addEditFormStyle}>
        <form
          style={{ width: "100%", flexWrap: "wrap" }}
          onSubmit={handleSubmit(onSumbit)}
        >
          <Grid container mb={3} spacing={2}>
            <Grid item xl={6}>
              <Controller
                control={control}
                name="title"
                render={({ field: { onChange, ...field } }) => (
                  <TextField
                    {...field}
                    ref={null}
                    id="title"
                    fullWidth
                    required
                    label="عنوان پست"
                    hiddenLabel={true}
                    placeholder="عنوان پست"
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
            <Grid item xl={6}>
              <FormControl fullWidth>
                <InputLabel id="category">فهرست</InputLabel>
                <Select
                  labelId="categoryLabel"
                  id="category"
                  value={category}
                  label="فهرست"
                  onChange={handleSelectChange}
                >
                  <MenuItem value="">
                    <em>هیچکدام</em>
                  </MenuItem>
                  {data.map((dt: any) => (
                    <MenuItem value={dt.id}>{dt.title}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container mb={3} spacing={2}>
            <Grid item xl={6}>
              {/* <Autocomplete
                multiple
                limitTags={2}
                fullWidth
                sx={{ marginRight: "10px" }}
                id="multiple-limit-tags"
                // options={top100Films}
                // getOptionLabel={(option) => option.title}
                // defaultValue={[
                //   top100Films[13],
                //   top100Films[12],
                //   top100Films[11],
                // ]}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="تگ ها"
                    placeholder="Favorites"
                  />
                )}
              /> */}
            </Grid>
            <Grid item xl={6}>
              <FormControl
                fullWidth
                sx={{
                  minWidth: 120,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "5px",
                  border: "1px solid #c6c6ce",
                  padding: "8px",
                }}
              >
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="منتشر شود"
                />
              </FormControl>
            </Grid>
          </Grid>
          <Uploader />
          <br />
          <RichTextEditor
            handleChange={handleChange}
            desc="description"
            Controller={Controller}
            control={control}
          />
          <br />
        </form>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xl={6}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              startIcon={<SaveOutlinedIcon />}
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
      </Grid>
    </>
  );
};

export default AddEditPost;
