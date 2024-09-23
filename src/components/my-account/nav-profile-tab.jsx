import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import * as Yup from "yup";
// internal
import ErrorMsg from "../common/error-msg";
import { EmailTwo, LocationTwo, PhoneThree, UserThree } from "@/svg";
import { useUpdateProfileMutation } from "@/redux/features/auth/authApi";
import { notifyError, notifySuccess } from "@/utils/toast";
import ProfileImage from "@assets/img/profile-1.webp";
import Image from "next/image";

const ProfileInfo = () => {
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("userInfo");
    const JsonUSer = JSON.parse(user);

    const UserFirstName = JsonUSer?.user?.firstName;
    setUserFirstName(UserFirstName);

    const UserLastName = JsonUSer?.user?.lastName;
    setUserLastName(UserLastName);

    const UserEmail = JsonUSer?.user?.email;
    setUserEmail(UserEmail);
  }, []);


  return (
    <div className="profile__info">
      <h3 className="profile__info-title">Personal Details</h3>
      <div className="profile__info-content">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ width: "50%" }}>
            <img
              src="assets/img/profile-1.webp"
              alt="profile"
              style={{ width: "50%" }}
            />
          </div>
          <div style={{ width: "50%" }}>
            <p
              className="profile__info-text"
              style={{ color: "gray", fontWeight: "500" }}
            >
              <b>First Name</b> : {userFirstName}
            </p>
            <p
              className="profile__info-text"
              style={{ color: "gray", fontWeight: "500" }}
            >
              <b>Last Name</b> : {userLastName}{" "}
            </p>
            <p
              className="profile__info-text"
              style={{ color: "gray", fontWeight: "500" }}
            >
              <b>Email</b> : {userEmail}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
