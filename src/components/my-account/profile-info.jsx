import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
// internal
import { Box, DeliveryTwo, Processing, Truck } from "@/svg";
import { userLoggedOut } from "@/redux/features/auth/authSlice";
import Location from "@assets/img/location.png"
import Wishlist from "@assets/img/whislist.png"
import Order from "@assets/img/order.png"
import ChangePassword from "@assets/img/change-passwprd.png";
import Image from "next/image";
import { useLogoutMutation } from "../../redux/features/productApi";
const NavProfileTab = ({ orderData }) => {
  const {user} = useSelector(state => state.auth)
  const dispatch = useDispatch();
  const router = useRouter();

const [ userName, setUserName] = useState("");

const [logoutRefetch] = useLogoutMutation();
 

  const handleLogout = async () => {
    try {
      const res = await logoutRefetch({});

      dispatch(userLoggedOut());
      router.push("/login");
      if (localStorage.getItem("token")) {
        dispatch(cart_list([]));
        localStorage.clear();

      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {

    const user = localStorage.getItem("userInfo");
    const JsonUSer = JSON.parse(user);
    const UserName = JsonUSer?.user?.firstName;
    setUserName(UserName);
  }, []);

  return (
    <div className="profile__main">
      <div className="profile__main-top pb-80">
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="profile__main-inner d-flex flex-wrap align-items-center">
              <div className="profile__main-content">
                <h4 className="profile__main-title">Welcome {userName}</h4>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="profile__main-logout text-sm-end">
              <a onClick={handleLogout} className="cursor-pointer tp-logout-btn">
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="profile__main-info">
        <div className="row gx-3">
          <div className="col-md-3 col-sm-6">
            <div className="profile__main-info-item">
              <div className="profile__main-info-icon">
                <span>
                  {/* <span className="profile-icon-count profile-download">{orderData?.totalDoc}</span> */}
                  <Image src={Location} alt="location" height={60} width={60} />
                </span>
              </div>
              <h4 className="profile__main-info-title">Address</h4>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="profile__main-info-item">
              <div className="profile__main-info-icon">
                <span>
                  {/* <span className="profile-icon-count profile-order">{orderData?.pending}</span> */}
                  <Image src={Wishlist} alt="location" height={60} width={60} />                
                  </span>
              </div>
              <h4 className="profile__main-info-title">Wishlist</h4>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="profile__main-info-item">
              <div className="profile__main-info-icon">
                <span>
                  {/* <span className="profile-icon-count profile-wishlist">
                    {orderData?.processing}
                  </span> */}
                  <Image src={Order} alt="location" height={60} width={60} />   
                </span>
              </div>
              <h4 className="profile__main-info-title">My Orders</h4>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="profile__main-info-item">
              <div className="profile__main-info-icon">
                <span>
                  {/* <span className="profile-icon-count profile-wishlist">
                    {orderData?.delivered}
                  </span> */}
                  <Image src={ChangePassword} alt="location" height={60} width={60} />   
                  </span>
              </div>
              <h4 className="profile__main-info-title">Change Password</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavProfileTab;
