import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Grid, Checkbox, FormControlLabel } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { FormData } from "./signin.types";
import { SubmitButton } from "./SubmitButton";

const schema = yup.object({
  email: yup.string().email().required("فیلد ایمیل اجباری است"),
  password: yup
    .string()
    .required("فیلد پسورد اجباری است")
    .min(8, "پسورد باید حداقل 8 کاراکتر باشد"),
});

export const FormFields = function ({ onSubmit, isLoading }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  return (
    <form
      className="formSignInStyle"
      onSubmit={handleSubmit((data) => onSubmit(data))}
    >
      <Grid container item mb={3}>
        <TextField
          {...register("email", { required: true })}
          error={!!errors?.email}
          helperText={errors.email?.message}
          placeholder="ایمیل خود را وارد کنید"
          name="email"
          type="email"
          fullWidth
        />
      </Grid>
      <Grid container item mb={3}>
        <TextField
          {...register("password", { required: true })}
          error={!!errors.password}
          helperText={errors.password?.message}
          name="password"
          type="password"
          fullWidth
        />
      </Grid>
      <Grid container item className="GridInsideFormStyle">
        <Grid item>
          <FormControlLabel
            control={
              <Checkbox {...register("rememberMe", { required: false })} />
            }
            label="به خاطر سپاری"
          />
        </Grid>
        <Grid item>
          <Link
            to="/auth/forget-password"
            style={{ textDecoration: "none", color: "#292727" }}
          >
            باز نشانی رمز عبور
          </Link>
        </Grid>
      </Grid>
      <SubmitButton loading={isLoading} />
    </form>
  );
};
