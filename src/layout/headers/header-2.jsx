import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
// internal
import Menus from "./header-com/menus";
import logo from "@assets/img/logo/logo.svg";
import useSticky from "@/hooks/use-sticky";
import useCartInfo from "@/hooks/use-cart-info";
import {
  compare_list,
  openCartMini,
  openUserSidebar,
} from "@/redux/features/cartSlice";
import HeaderTopRight from "./header-com/header-top-right";
import CartMiniSidebar from "@/components/common/cart-mini-sidebar";
import {
  CartTwo,
  Compare,
  Facebook,
  Menu,
  PhoneTwo,
  Wishlist,
  Search,
  User,
  UserTwo,
  UserThree,
} from "@/svg";
import useSearchFormSubmit from "@/hooks/use-search-form-submit";
import OffCanvas from "@/components/common/off-canvas";
import pradeLogo from "@assets/img/prade-logo.png";
import UserMiniSidebar from "@/components/common/user-sidebar";
import { useGetCartListQuery } from "@/redux/features/card/cardApi";
import { useGetCartAllListQuery } from "../../redux/features/card/cardApi";
import { add_to_wishlist } from "@/redux/features/wishlist-slice";
import { useGetWishlistQuery } from "@/redux/features/productApi";

const HeaderTwo = ({ style_2 = false, data }) => {
  const cart = useSelector((state) => state.cart?.cart_list);
  const compareList = useSelector((state) => state.cart.compare_list);

  const { wishlist } = useSelector((state) => state.wishlist);

  const { data: cartList, refetch: cartRefetch } = useGetCartListQuery();

  const { data: AllListChannel, refetch: AllListChannelREfresh } =
    useGetCartAllListQuery({});

  const [isOffCanvasOpen, setIsCanvasOpen] = useState(false);
  const { setSearchText, handleSubmit, searchText } = useSearchFormSubmit();
  const { quantity } = useCartInfo();
  const { sticky } = useSticky();
  const dispatch = useDispatch();

  const [token, setToken] = useState("");

  const { data: wishlistData, refetch: wishlistRefetch } =
    useGetWishlistQuery();

  console.log("✌️wishlistData --->", wishlistData);
  const WishListLength = wishlistData?.data?.wishlists?.edges;
  console.log("✌️constWishListLength --->", WishListLength?.length.toString());

  useEffect(() => {
    wishlistRefetch();
  }, []);

  useEffect(() => {
    getWishlistList();
  }, [wishlistData]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  const getWishlistList = async (prd) => {
    try {
      if (wishlistData?.data?.wishlists?.edges?.length > 0) {
        const isAddWishlist = wishlistData?.data?.wishlists?.edges
          ?.map((item) => item?.node)
          ?.some((node) => node?.id === product?.id);

        dispatch(
          add_to_wishlist(
            wishlistData?.data?.wishlists?.edges?.map((item) => item?.node)
          )
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close the dropdown if the user clicks outside of it
  const handleOutsideClick = (event) => {
    if (!event.target.closest(".tp-header-action-item")) {
      setIsOpen(false);
    }
  };

  // Attach event listener for clicks outside the dropdown
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    // Cleanup function to remove the event listener when component unmounts
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <header>
        <div
          className={`tp-header-area tp-header-style-${
            style_2 ? "primary" : "darkRed"
          } tp-header-height`}
        >
          <div
            className="tp-header-top-2 p-relative z-index-11 tp-header-top-border d-none d-md-block"
            style={{ backgroundColor: "rgba(29, 30, 32, 1)" }}
          >
            <div className="container-fluid">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <div className="tp-header-info d-flex align-items-center">
                    <p
                      style={{
                        color: "white",
                        fontWeight: "500",
                        margin: "0px",
                        fontSize: "14px",
                        padding: "8px 0px",
                      }}
                    >
                      ADD ANYTHING HERE OR JUST REMOVE IT...
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="tp-header-top-right tp-header-top-black d-flex align-items-center justify-content-end">
                    {/* <HeaderTopRight /> */}
                    <ul
                      style={{
                        color: "white",
                        listStyle: "none",
                        display: "flex",
                      }}
                    >
                      <li style={{ paddingRight: "20px" }}>News Letter</li>
                      <li>FAQ</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            id="header-sticky"
            className={`tp-header-bottom-2 tp-header-sticky ${
              sticky ? "header-sticky" : ""
            }`}
          >
            <div style={{ padding: "0px 15px" }}>
              <div className="tp-mega-menu-wrapper p-relative">
                <div className="row align-items-center">
                  <div className="col-xl-2 col-lg-5 col-md-5 col-sm-4 col-6">
                    <div className="logo">
                      <Link href="/">
                        <Image
                          src={pradeLogo}
                          alt="logo"
                          priority
                          className="prade-navbar-logo"
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="col-xl-6 d-none d-xl-block">
                    <div className="main-menu menu-style-2">
                      <nav className="tp-main-menu-content">
                        <Menus />
                      </nav>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-7 col-md-7 col-sm-8 col-6">
                    <div className="tp-header-bottom-right d-flex align-items-center justify-content-end pl-30">
                      <div className="tp-header-search-2 d-none d-sm-block">
                        <form onSubmit={handleSubmit}>
                          <input
                            onChange={(e) => setSearchText(e.target.value)}
                            value={searchText}
                            type="text"
                            placeholder="Search for Products..."
                          />
                          <button type="submit">
                            <Search />
                          </button>
                        </form>
                      </div>
                      <div className="tp-header-action d-flex align-items-center ml-30">
                        <div className="tp-header-action-item d-none d-lg-block">
                          <Link
                            href="/compare"
                            className="tp-header-action-btn"
                          >
                            <Compare />
                            <span className="tp-header-action-badge">
                              {compareList?.length || 0}
                            </span>
                          </Link>
                        </div>
                        <div className="tp-header-action-item d-none d-lg-block">
                          <Link
                            href="/wishlist"
                            className="tp-header-action-btn"
                          >
                            <Wishlist />
                            <span className="tp-header-action-badge">
                              {WishListLength?.length || 0}
                            </span>
                          </Link>
                        </div>
                        <div className="tp-header-action-item">
                          <button
                            onClick={() => {
                              dispatch(openCartMini());
                              cartRefetch();
                              AllListChannelREfresh();
                            }}
                            className="tp-header-action-btn cartmini-open-btn"
                          >
                            <CartTwo />
                            <span className="tp-header-action-badge">
                              {cart?.length || 0}
                            </span>
                          </button>
                        </div>
                        <div className="tp-header-action-item tp-header-hamburger mr-20 d-xl-none">
                          <button
                            onClick={() => setIsCanvasOpen(true)}
                            type="button"
                            className="tp-offcanvas-open-btn"
                          >
                            <Menu />
                          </button>
                        </div>
                        {/* {token && ( */}
                        <div
                          className="tp-header-action-item "
                          style={{ position: "relative" }}
                        >
                          <button
                            onClick={toggleDropdown}
                            className="tp-header-action-btn cartmini-open-btn"
                          >
                            <UserThree />
                          </button>
                          {isOpen && (
                            <div
                              className="dropdown-content  d-flex flex-column"
                              style={{
                                position: "absolute",
                                top: "35px",
                                background: "white",
                                padding: "30px 20px",
                                right: "-10px",
                                width: "250px",
                                boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
                              }}
                            >
                              {/* Content of the dropdown menu goes here */}
                              {/* For example: */}
                              <div className="pb-20">
                                <p
                                  style={{
                                    color: "black",
                                    fontWeight: "500",
                                    color: "gray",
                                    margin: "0px",
                                  }}
                                >
                                  Welcome
                                </p>
                                <p style={{ color: "gray",margin:"0px" }}>
                                  To access account and manage orders
                                </p>
                              </div>
                              <div className="pb-20">
                                <button
                                  className="tp-login-btn "
                                  style={{
                                    padding: "5px 10px",
                                    background: "none",
                                    border: "1px solid gray",
                                    color: "gray",
                                    fontSize: "14px",
                                  }}
                                >
                                  LOGIN / SIGNUP
                                </button>
                              </div>
                              <div className="d-flex flex-column" >
                                <a href="/profile" style={{paddingBottom:"5px"}}>Order</a>
                                <a href="/wishlist" style={{paddingBottom:"5px"}}>WishList</a>
                                <a href="/compare" style={{paddingBottom:"5px"}}>Compare</a>
                                <a href="/coupon" style={{paddingBottom:"5px"}}>Gift Cards</a>
                              </div>
                            </div>
                          )}
                        </div>
                        {/* )} */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* cart mini sidebar start */}
      <CartMiniSidebar />
      {/* cart mini sidebar end */}

      <UserMiniSidebar />

      {/* off canvas start */}
      <OffCanvas
        isOffCanvasOpen={isOffCanvasOpen}
        setIsCanvasOpen={setIsCanvasOpen}
        categoryType="fashion"
      />
      {/* off canvas end */}
    </>
  );
};

export default HeaderTwo;
