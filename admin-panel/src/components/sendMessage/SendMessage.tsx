import {
  Button,
  FormControl,
  SelectChangeEvent,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import addEditFormStyle from "../common/styles/addEditForm.style";
import RichTextEditor from "../richTextEditor/RichTextEditor";
import DoDisturbAltOutlinedIcon from "@mui/icons-material/DoDisturbAltOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import { BreadcrumbsType } from "../common/BreadcrumbsProps";
import * as yup from "yup";
import { FormSendMessageValidationType } from "./sendMessage.type";
import { yupResolver } from "@hookform/resolvers/yup";
import { fetchUsers } from "src/store/thunks/userThunks/fetchUsers";
import useThunk from "src/hooks/useThunk";
import { useAppSelector } from "src/store/hooks";
import { createMessageThunk } from "src/store/thunks/messageThunks/createMessage";
const schema = yup.object({
  receivers: yup.array().min(1, "حداقل یک دریافت کننده پیام باید مشخص شود."),
  messageTitle: yup.string().required(),
  messageBody: yup.string().required(),
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const breadcrumbTitles: BreadcrumbsType = {
  titles: ["داشبورد", "ارسال پیام"],
};
const SendMessage = function () {
  const [open, setOpen] = useState<boolean>(false);
  const initialState = { receivers: [], messageTitle: "", messageBody: "" };
  const [doFetchUsers] = useThunk(fetchUsers);
  const [sendMessage, isSendingMessage, createMessageError] =
    useThunk(createMessageThunk);
  const { data } = useAppSelector((state) => state.users);
  const [value, setValue] = useState<string[]>([]);
  const [form, setForm] = useState(initialState);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormSendMessageValidationType>({
    resolver: yupResolver(schema),
    defaultValues: initialState,
  });

  const onSubmit = function () {
    const senderId = "da154cf1-aacb-46cf-a407-290c318244a7";
    Object.assign(form, { senderId });
    sendMessage({ args: form });
    setOpen(true);
    reset({});
  };

  const handleChange = function (
    event: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<any>
  ) {
    const { name, value } = event.target;
    setForm((state) => ({
      ...state,
      [name]: value,
    }));
    if (Array.isArray(value)) setValue(value);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickAway") return;
    setOpen(false);
  };

  useEffect(() => {
    doFetchUsers({ all: true });
  }, [doFetchUsers]);
  return (
    <>
      {!!createMessageError ? (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            variant="filled"
            severity="error"
            sx={{ width: "100%" }}
          >
            مشکلی در ارسال دیتا بوجود آمده است
          </Alert>
        </Snackbar>
      ) : (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            پیام شما با موفقیت ارسال شد.
          </Alert>
        </Snackbar>
      )}
      <Grid item mb={5.2}>
        <h1>ارسال پیام</h1>
        <Breadcrumbs {...breadcrumbTitles} />
      </Grid>
      <Grid container sx={addEditFormStyle}>
        <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
          <Grid mb={3}>
            <FormControl fullWidth>
              <InputLabel id="users">لیست کاربران</InputLabel>
              <Controller
                name="receivers"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="receivers"
                    id="receivers"
                    multiple
                    value={field.value || []}
                    error={!!errors.receivers}
                    onChange={(e) => {
                      field.onChange(e);
                      handleChange(e);
                    }}
                    MenuProps={MenuProps}
                  >
                    {data.length > 0
                      ? data?.map((user: any) => (
                          <MenuItem value={user.id} key={user.id}>
                            <em>{`${user.firstName}${user.lastName}`}</em>
                          </MenuItem>
                        ))
                      : false}
                  </Select>
                )}
              />
            </FormControl>
            {errors.receivers && (
              <Typography>حداقل یک دریافت کننده پیام باید مشخص شود.</Typography>
            )}
          </Grid>
          <Grid item mb={3}>
            <Controller
              name="messageTitle"
              control={control}
              render={({ field: { onChange, ...field } }) => (
                <TextField
                  {...field}
                  ref={null}
                  id="messageTitle"
                  fullWidth
                  hiddenLabel={true}
                  required
                  label="عنوان پیام"
                  placeholder="عنوان پیام"
                  error={!!errors.messageTitle}
                  helperText={
                    errors.messageTitle ? "فیلد عنوان اجباری است" : null
                  }
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onChange(e);
                    handleChange(e);
                  }}
                />
              )}
            />
          </Grid>
          <Grid item mb={3.1}>
            <RichTextEditor
              desc="messageBody"
              elementName="messageBody"
              Controller={Controller}
              control={control}
              handleChange={handleChange}
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
