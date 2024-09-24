import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import * as Yup from "yup";
// internal
import { CloseEye, OpenEye } from "@/svg";
import ErrorMsg from "../common/error-msg";
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";
import { notifyError, notifySuccess } from "@/utils/toast";
import ButtonLoader from "../loader/button-loader";

// schema
const schema = Yup.object().shape({
  password: Yup.string().required().min(1).label("Password"),
  newPassword: Yup.string().required().min(1).label("New Password"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("newPassword"), null],
    "Passwords must match"
  ),
});
// schemaTwo
const schemaTwo = Yup.object().shape({
  newPassword: Yup.string().required().min(6).label("New Password"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("newPassword"), null],
    "Passwords must match"
  ),
});

const ChangePassword = () => {
  const { user } = useSelector((state) => state.auth);
  const [changePassword, { isLoading: submitLoading }] =
    useChangePasswordMutation();

  const [showPass, setShowPass] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(user?.googleSignIn ? schemaTwo : schema),
  });

  // on submit
  const onSubmit = (data) => {
    changePassword({
      old_password: data.password,
      new_password: data.newPassword,
    })
      .then((result) => {
        if (result?.data?.data?.passwordChange?.errors?.length > 0) {
          // If there are errors returned by the mutation, display the first error message
          notifyError(result?.data?.data?.passwordChange?.errors[0]?.message);
        } else {
          // If there are no errors, display a success message
          notifySuccess("Password changed successfully");
          reset();
        }
      })
      .catch((error) => {
        // Handle any errors that occur during the API call
        console.error("Error occurred while changing password:", error);
        notifyError(
          "An error occurred while changing password. Please try again later."
        );
      });
  };

  return (
    <div className="profile__password">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          {!user?.googleSignIn && (
            <div className="col-xxl-12">
              <div className="tp-profile-input-box">
                <div className="p-relative">
                  <div className="tp-contact-input">
                    <input
                      {...register("password", {
                        required: `Password is required!`,
                      })}
                      name="password"
                      id="password"
                      type={showPass ? "text" : "password"}
                    />
                  </div>
                  <div className="tp-login-input-eye" id="password-show-toggle">
                    <span
                      className="open-eye"
                      onClick={() => setShowPass(!showPass)}
                    >
                      {showPass ? <CloseEye /> : <OpenEye />}
                    </span>
                  </div>
                  <div className="tp-profile-input-title">
                    <label htmlFor="password">Old Password</label>
                  </div>
                </div>
                <ErrorMsg msg={errors.password?.message} />
              </div>
            </div>
          )}
          <div className="col-xxl-6 col-md-6">
            <div className="tp-profile-input-box">
              <div className="p-relative">
                <div className="tp-profile-input">
                  <input
                    {...register("newPassword", {
                      required: `New Password is required!`,
                    })}
                    name="newPassword"
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                  />
                </div>
                <div className="tp-login-input-eye" id="password-show-toggle">
                  <span
                    className="open-eye"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <CloseEye /> : <OpenEye />}
                  </span>
                </div>

                <div className="tp-profile-input-title">
                  <label htmlFor="new_pass">New Password</label>
                </div>
              </div>
              <ErrorMsg msg={errors.newPassword?.message} />
            </div>
          </div>
          <div className="col-xxl-6 col-md-6">
            <div className="tp-profile-input-box">
              <div className="p-relative">
                <div className="tp-profile-input">
                  <input
                    {...register("confirmPassword")}
                    name="confirmPassword"
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                  />
                </div>
                <div className="tp-login-input-eye" id="password-show-toggle">
                  <span
                    className="open-eye"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <CloseEye /> : <OpenEye />}
                  </span>
                </div>
                <div className="tp-profile-input-title">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                </div>
              </div>
              <ErrorMsg msg={errors.confirmPassword?.message} />
            </div>
          </div>
          <div className="col-xxl-6 col-md-6">
            <div className="profile__btn">
              <button type="submit" className="tp-btn">
                {submitLoading ? <ButtonLoader /> : "Update"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
