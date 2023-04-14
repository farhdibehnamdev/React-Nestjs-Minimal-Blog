import React, { useEffect, useRef, useState } from "react";
import {
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
  FormHelperText,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { Controller, useController, useForm } from "react-hook-form";
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
import useThunk from "src/hooks/useThunk";
import { fetchTags } from "src/store/thunks/tagThunks/fetchTags";
import { fetchCategories } from "src/store/thunks/categoryThunks/fetchCategories";

type tagsData = {
  id: number | null;
  title: string;
};
const schema = yup.object({
  title: yup.string().required(),
  isPublished: yup.boolean().notRequired(),
  body: yup.string().notRequired(),
  image: yup.string().required(),
  userId: yup.string().required(),
  tags: yup.array().min(1, "انتخاب حداقل یک تگ اجباری است"),
  categoryId: yup.string().required(),
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
    image: editFormData?.image || "",
    userId: editFormData?.userId || "da154cf1-aacb-46cf-a407-290c318244a7",
    tags: editFormData?.tags || [],
    categoryId: editFormData?.categoryId || "",
  };
  const [doFetchTags] = useThunk(fetchTags);
  const [doFetchCategories] = useThunk(fetchCategories);
  const { data: categoryData } = useAppSelector((state) => state.category);
  const { data: tagData } = useAppSelector((state) => state.tags);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    register,
    setValue,
  } = useForm<formPostValidationType>({
    resolver: yupResolver(schema),
    defaultValues: { ...initialState, tags: [] },
  });

  const [form, setForm] = useState(initialState);
  const onSubmit = function (data: any) {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("body", data.body);
    formData.append("image", form.image); // append File object directly
    formData.append("userId", data.userId);

    formData.append("categoryId", data.categoryId);
    formData.append("isPublished", data.isPublished);
    formData.append("publishedAt", "");

    for (let i = 0; i < form.tags.length; i++) {
      formData.append("tags[]", form.tags[i]);
    }

    typeOperation === "Add" ? onAdd(formData) : onEdit(formData);
    reset();
    setValue("tags", []);
    setSelectedTags([]);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((state) => ({
      ...state,
      [event.target.name]:
        event.target.name === "isPublished"
          ? event.target.checked
          : event.target.name === "image"
          ? event?.target?.files![0]
          : event.target.value,
    }));
  };

  const handleSelectChange = (event: SelectChangeEvent<any>) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setForm((state) => ({
      ...state,
      [name]: value,
    }));
  };
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    register("tags");
  }, [register]);
  const handleAutocompleteChange = (
    event: React.ChangeEvent<{}> | null,
    newValue: Array<any>
  ) => {
    const value = newValue.map((option: tagsData) => option.id);
    setForm((prevForm) => ({ ...prevForm, tags: value }));
    setSelectedTags(value as never);
    setValue("tags", value as never);
  };
  const onError = function (data: any) {
    console.log("errors:: ", data);
  };
  useEffect(() => {
    doFetchTags({ all: true });
    doFetchCategories({ all: true });
  }, [doFetchTags, doFetchCategories]);

  useEffect(() => {
    console.log("formm :::", form);
  }, [form]);
  return (
    <>
      <Grid container sx={addEditFormStyle}>
        <form
          style={{ width: "100%", flexWrap: "wrap" }}
          onSubmit={handleSubmit(onSubmit, (data) => onError(data))}
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
                    label="عنوان پست"
                    hiddenLabel={true}
                    placeholder="عنوان پست"
                    error={errors.title ? true : false}
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
                <Controller
                  control={control}
                  name="categoryId"
                  render={({ field }) => {
                    return (
                      <Select
                        {...field}
                        id="categoryId"
                        value={field.value}
                        error={errors.categoryId ? true : false}
                        label="فهرست"
                        onChange={(e) => {
                          field.onChange(e);
                          handleSelectChange(e);
                        }}
                      >
                        {categoryData.map((dt: any) => (
                          <MenuItem key={dt.id} value={dt.id}>
                            {dt.title}
                          </MenuItem>
                        ))}
                      </Select>
                    );
                  }}
                />

                {errors.categoryId && (
                  <FormHelperText error>
                    شما هیچ فهرستی انتخاب نکرده اید
                  </FormHelperText>
                )}
                <InputLabel id="category">فهرست</InputLabel>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container mb={3} spacing={2}>
            <Grid item xl={6}>
              {/* <Controller
                name="tags"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    id="tags"
                    multiple
                    options={tagData}
                    getOptionLabel={(option: any) => option?.title || ""}
                    fullWidth
                    sx={{ marginRight: "10px" }}
                    value={tagData.filter((option: tagsData) => {
                      return form.tags.includes(option.id);
                    })}
                    onChange={(event, newValue) => {
                      const value = newValue.map(
                        (option: tagsData) => option.id
                      );
                      field.onChange(value);
                      handleAutocompleteChange(event, newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        error={errors.tags ? true : false}
                        {...params}
                        label="تگ ها"
                        helperText={errors.tags && errors.tags.message}
                      />
                    )}
                  />
                )}
              /> */}

              <Autocomplete
                id="tags"
                multiple
                options={tagData}
                getOptionLabel={(option: any) => option?.title || ""}
                fullWidth
                sx={{ marginRight: "10px" }}
                value={tagData.filter((option: tagsData) => {
                  return selectedTags.includes(option.id as never);
                })}
                onChange={handleAutocompleteChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="تگ ها"
                    error={errors.tags ? true : false}
                    helperText={errors.tags && errors.tags.message}
                  />
                )}
              />
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
                  control={
                    <Controller
                      name="isPublished"
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <Switch
                          id="isPublished"
                          value={value}
                          onChange={onChange}
                          defaultChecked
                        />
                      )}
                    />
                  }
                  label="منتشر شود"
                />
              </FormControl>
            </Grid>
          </Grid>
          <Uploader
            Controller={Controller}
            control={control}
            errors={errors}
            handleChange={handleChange}
          />
          <br />
          <RichTextEditor
            handleChange={handleChange}
            desc="body"
            elementName="body"
            Controller={Controller}
            control={control}
            errors={errors}
          />
          <br />
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
    </>
  );
};

export default AddEditPost;
