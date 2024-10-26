import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
// internal
import useCartInfo from "@/hooks/use-cart-info";
import RenderCartProgress from "./render-cart-progress";
import empty_cart_img from "@assets/img/product/cartmini/empty-cart.png";
import {
  cart_list,
  closeCartMini,
  closeUserSidebar,
  remove_product,
} from "@/redux/features/cartSlice";
import {
  useGetCartListQuery,
  useRemoveToCartMutation,
} from "@/redux/features/card/cardApi";
import SEO from "../seo";
import { useRouter } from "next/router";
import { userLoggedOut } from "@/redux/features/auth/authSlice";
import { useLogoutMutation } from "@/redux/features/productApi";

const UserMiniSidebar = () => {
  const { userMiniOpen } = useSelector((state) => state.cart);
  const [token, setToken] = useState("");

  const router = useRouter();

  const [removeToCart, {}] = useRemoveToCartMutation();

  const [logoutRefetch] = useLogoutMutation();


  const cartData = useSelector((state) => state.cart?.cart_list);
  const cart = cartData?.node || cartData;

  const totalAmount = cart?.reduce(
    (acc, curr) =>
      acc + curr?.variant?.pricing?.price?.gross?.amount ||
      acc + curr?.node?.pricing?.priceRange?.start?.gross?.amount,
    0
  );

  const { total } = useCartInfo();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  // handle close cart mini

  const closeCart = async () => {
    try {
      await logoutRefetch();
    dispatch(closeUserSidebar());
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

  return (
    <>
      <div
        className={`cartmini__area tp-all-font-roboto ${
          userMiniOpen ? "cartmini-opened" : ""
        }`}
      >
        <div className="cartmini__wrapper d-flex justify-content-between flex-column">
          <div className="cartmini__top-wrapper">
            <div className="cartmini__top p-relative">
              <div className="cartmini__top-title">
                <h4>Menu</h4>
              </div>
              <div className="cartmini__close">
                <button
                  onClick={() => dispatch(closeUserSidebar())}
                  type="button"
                  className="cartmini__close-btn cartmini-close-btn"
                >
                  <i className="fal fa-times"></i>
                </button>
              </div>
            </div>
            {!token && (
              <>
                <div>
                  <button onClick={() => closeCart()}>
                    <div>Login</div>
                  </button>
                </div>

                <div>
                  <button
                    onClick={() => {
                      dispatch(closeUserSidebar());
                      router.push("/register");
                    }}
                  >
                    <div>Register</div>
                  </button>
                </div>

               
              </>
            )}
              <>
               <div>
               <button
                 onClick={() => {
                   dispatch(closeUserSidebar());
                   router.push("/profile");
                 }}
               >
                 <div>Profile</div>
               </button>
             </div>
              <div>
                <button onClick={() => closeCart()}>
                  <div>Logout</div>
                </button>
              </div>
              </>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserMiniSidebar;
