import {
  Box,
  Button,
  FormControl,
  SelectChangeEvent,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import addEditFormStyle from "../common/styles/addEditForm.style";
import RichTextEditor from "../richTextEditor/RichTextEditor";
import DoDisturbAltOutlinedIcon from "@mui/icons-material/DoDisturbAltOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import { BreadcrumbsType } from "../common/BreadcrumbsProps";
import * as yup from "yup";
import { FormSendMessageValidationType } from "./sendMessage.type";
import { yupResolver } from "@hookform/resolvers/yup";
const schema = yup.object({
  title: yup.string().required(),
  body: yup.string().required(),
});
const breadcrumbTitles: BreadcrumbsType = {
  titles: ["داشبورد", "ارسال پیام"],
};
const SendMessage = function () {
  const initialState = { title: "", body: "" };
  const [value, setValue] = useState<string>();
  const [form, setForm] = useState(initialState);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSendMessageValidationType>({
    resolver: yupResolver(schema),
    defaultValues: initialState,
  });
  const onSumbit = function (data: any) {
    console.log("data:", data);
  };
  const handleChange = function (event: React.ChangeEvent<HTMLInputElement>) {
    setForm((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };
  const handleSelectUserChange = function (event: SelectChangeEvent<any>) {
    const name = event.target.name;
    const value = event.target.value;
    setForm((state) => ({
      ...state,
      [name]: value,
    }));
    setValue(value);
  };
  return (
    <>
      <Grid item mb={5.2}>
        <h1>ارسال پیام</h1>
        <Breadcrumbs {...breadcrumbTitles} />
      </Grid>
      <Grid container sx={addEditFormStyle}>
        <form style={{ width: "100%" }} onSubmit={handleSubmit(onSumbit)}>
          <Box mb={3}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-helper-label">
                لیست کاربران
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={value}
                label="کاربر"
                onChange={handleSelectUserChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box mb={3}>
            <TextField
              fullWidth
              required
              id="outlined-required"
              label="عنوان پیام"
              hiddenLabel={true}
              placeholder="عنوان پیام"
            />
          </Box>
          <Grid item mb={3.1}>
            <RichTextEditor
              desc="description"
              Controller={Controller}
              control={control}
              handleChange={handleChange}
            />
          </Grid>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xl={6}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                startIcon={<SaveOutlinedIcon />}
              >
                <Typography sx={{ color: "#fff", fontSize: "20px" }}>
                  ارسال پیام
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

export default SendMessage;
