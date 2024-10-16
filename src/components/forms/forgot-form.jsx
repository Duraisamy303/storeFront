import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// internal
import ErrorMsg from "../common/error-msg";
import {
  useForgetPasswordMutation,
  useResetPasswordMutation,
} from "@/redux/features/auth/authApi";
import { notifyError, notifySuccess } from "@/utils/toast";
import ButtonLoader from "../loader/button-loader";

// schema
const schema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
});

const ForgotForm = () => {
  const [resetPassword, { loading: loading }] = useForgetPasswordMutation();
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  // onSubmit
  const onSubmit = (data) => {
    resetPassword({
      email: data.email,
      redirectUrl: "https://www1.prade.in/password_reset/",
    }).then((result) => {
      const res = result?.data?.data?.requestPasswordReset;
      if (res?.errors?.length > 0) {
        notifyError(res?.errors[0]?.message);
      } else {
        notifySuccess("Password reset link sent. Please check your email");
      }
    });
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="tp-login-input-wrapper">
        <div className="tp-login-input-box">
          <div className="tp-login-input">
            <input
              {...register("email", { required: `Email is required!` })}
              name="email"
              id="email"
              type="email"
              placeholder="Prade@mail.com"
            />
          </div>
          <div className="tp-login-input-title">
            <label htmlFor="email">Your Email</label>
          </div>
          <ErrorMsg msg={errors.email?.message} />
        </div>
      </div>
      <div className="tp-login-bottom mb-15">
        <button type="submit" className="tp-login-btn w-100">
          {loading ? <ButtonLoader /> : "Send Mail"}
        </button>
      </div>
    </form>
  );
};

export default ForgotForm;
