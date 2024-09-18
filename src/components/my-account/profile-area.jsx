import React from "react";
import ProfileNavTab from "./profile-nav-tab";
import ProfileShape from "./profile-shape";
import NavProfileTab from "./nav-profile-tab";
import ProfileInfo from "./profile-info";
import ChangePassword from "./change-password";
import MyOrders from "./my-orders";
import { Wishlist } from "@/svg";
import AddressInfo from "./AddressInfo";

const ProfileArea = ({ orderData }) => {
  return (
    <>
      <section className="profile__area pt-120 pb-120">
        <div className="container">
          <div className="profile__inner p-relative">
            <ProfileShape />
            <div className="row">
              <div className="col-xxl-3 col-lg-3">
                <div className="profile__tab mr-40">
                  <ProfileNavTab />
                </div>
              </div>
              <div className="col-xxl-9 col-lg-9">
                <div className="profile__tab-content">
                  <div className="tab-content" id="profile-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="nav-profile"
                      role="tabpanel"
                      aria-labelledby="nav-profile-tab"
                    >
                      <NavProfileTab orderData={orderData} />
                    </div>

                    <div
                      className="tab-pane fade"
                      id="nav-information"
                      role="tabpanel"
                      aria-labelledby="nav-information-tab"
                    >
                      <ProfileInfo />
                    </div>

                    <div
                      className="tab-pane fade"
                      id="nav-address"
                      role="tabpanel"
                      aria-labelledby="nav-address-tab"
                    >
                      <AddressInfo />
                    </div>

                    <div
                      className="tab-pane fade"
                      id="nav-password"
                      role="tabpanel"
                      aria-labelledby="nav-password-tab"
                    >
                      <ChangePassword />
                    </div>

                    <div
                      className="tab-pane fade"
                      id="nav-order"
                      role="tabpanel"
                      aria-labelledby="nav-order-tab"
                    >
                      <MyOrders orderData={orderData} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfileArea;
