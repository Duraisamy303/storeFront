import React from 'react';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import * as Yup from "yup";
// internal
import ErrorMsg from '../common/error-msg';
import { EmailTwo, LocationTwo, PhoneThree, UserThree } from '@/svg';
import { useUpdateProfileMutation } from '@/redux/features/auth/authApi';
import { notifyError, notifySuccess } from '@/utils/toast';

const ProfileInfo = () => {
 
  return (
    <div className="profile__info">
      <h3 className="profile__info-title">Personal Details</h3>
      <div className="profile__info-content">
       <div className='d-flex align-items-center justify-between'>
        <div className="profile__info-icon">
          <UserThree />
        </div>
        <div>
<p className="profile__info-text" style={{color:"gray", fontWeight:"500"}}>First Name :</p>
<p className="profile__info-text" style={{color:"gray", fontWeight:"500"}}>Last Name : </p>
<p className="profile__info-text" style={{color:"gray", fontWeight:"500"}}>Email : </p>
          
        </div>

       </div>
      </div>
    </div>
  );
};

export default ProfileInfo;