import React, { useEffect, useState } from "react";
import Image from "next/image";
// internal
import insta_1 from "@assets/img/instagram/4/instagram-1.jpg";
import insta_2 from "@assets/img/instagram/4/instagram-2.jpg";
import insta_3 from "@assets/img/instagram/4/instagram-3.jpg";
import insta_4 from "@assets/img/instagram/4/instagram-4.jpg";
import insta_5 from "@assets/img/instagram/4/instagram-5.jpg";
import insta_6 from "@assets/img/instagram/4/instagram-6.jpg";
import {
  useAddWishlistMutation,
  useGetWishlistQuery,
  useProduct20PercentageMutation,
} from "@/redux/features/productApi";
import { checkChannel } from "@/utils/functions";
import { CompareThree, QuickView, Wishlist } from "@/svg";
import {
  useAddToCartMutation,
  useGetCartListQuery,
} from "@/redux/features/card/cardApi";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { handleProductModal } from "@/redux/features/productModalSlice";
import { add_to_wishlist } from "@/redux/features/wishlist-slice";
import { compare_list } from "@/redux/features/cartSlice";
import { profilePic } from "@/utils/constant";

const InstagramAreaFour = () => {
  const [discountProduct] = useProduct20PercentageMutation({});

  const { data: cartList, refetch: cartRefetch } = useGetCartListQuery();

  const compareList = useSelector((state) => state.cart.compare_list);

  const [addToCartMutation, { data: productsData, isError, isLoading }] =
    useAddToCartMutation();

  const dispatch = useDispatch();

  const [addWishlist, {}] = useAddWishlistMutation();

  const { data: wishlistData, refetch: wishlistRefetch } =
    useGetWishlistQuery();

  const [productList, setProduct] = useState([]);

  const router = useRouter();

  useEffect(() => {
    getDicountProduct();
  }, []);

  useEffect(() => {
    getWishlistList();
  }, [wishlistData]);

  const getDicountProduct = async () => {
    try {
      const res = await discountProduct();
      if (res.data?.data?.collections?.edges?.length > 0) {
        const list =
          res.data?.data?.collections?.edges[0]?.node?.products?.edges;
        if (list?.length > 0) {
          const data = list?.map((item) => item.node);
          setProduct(data);
        }
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const addToCartProductINR = async (item) => {
    try {
      const checkoutTokenINR = localStorage.getItem("checkoutTokenINR");
      const response = await addToCartMutation({
        checkoutToken: checkoutTokenINR,
        variantId: item?.defaultVariant?.id,
      });

      if (response.data?.data?.checkoutLinesAdd?.errors?.length > 0) {
        const err = response.data?.data?.checkoutLinesAdd?.errors[0]?.message;
        notifyError(err);
      } else {
        notifySuccess(`Product added to cart successfully`);
        cartRefetch();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const addToCartProductUSD = async (item) => {
    try {
      const checkoutTokenUSD = localStorage.getItem("checkoutTokenUSD");
      const response = await addToCartMutation({
        checkoutToken: checkoutTokenUSD,
        variantId: item?.defaultVariant?.id,
      });
      if (response.data?.data?.checkoutLinesAdd?.errors?.length > 0) {
        const err = response.data?.data?.checkoutLinesAdd?.errors[0]?.message;
        notifyError(err);
      } else {
        cartRefetch();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleWishlist = async (item) => {
    try {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("userInfo");

      if (token) {
        const users = JSON.parse(user);
        const input = {
          input: {
            user: users?.user?.id,
            variant: item?.id,
          },
        };

        const res = await addWishlist(input);
        notifySuccess("Product added to wishlist");
        wishlistRefetch();
      } else {
        router.push("/login");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getWishlistList = async (prd) => {
    try {
      if (wishlistData?.data?.wishlists?.edges?.length > 0) {
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

  const handleCompareProduct = (prd) => {
    const compare = localStorage.getItem("compareList");

    let arr = [];
    if (!compare) {
      arr = [];
    } else {
      arr = JSON.parse(compare);
    }
    arr.push(prd);
    localStorage.setItem("compareList", JSON.stringify(arr));
    notifySuccess("Product to added to compare list");
    dispatch(compare_list(arr));
  };

  return (
    <>
      <section className="tp-instagram-area tp-instagram-style-4  pb-20">
        <div className="container-fluid pl-20 pr-20 pt-30">
          {/* <div className="row">
            <div className="col-xl-12">
              <div className="tp-section-title-wrapper-4 mb-50 text-center">
                <h3 className="tp-section-title-4">Trends on image feed</h3>
                <p>After many months design and development of a modern online retailer</p>
              </div>
            </div>
          </div> */}

          <div className="row">
            <div className="col-md-4">
              <div className="main-discount">
                <span className="discound-1">DISCOUNT OF</span> <br />
                <span className="discound">20%</span>
                <br /> <span className="discount-2">ON ALL NECKLACES</span>
              </div>
              <p style={{ textAlign: "center", color: "black" }}>
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur.
              </p>
            </div>
            <div className="col-md-8">
              <div className="row row-cols-lg-6 row-cols-md-3 row-cols-sm-2 row-cols-1 gx-1 gy-1 gy-lg-0">
                {productList?.map((item, i) => (
                  <div className="col col-content-container" key={i}>
                    <div className="tp-instagram-item-2 w-img">
                      <div className="hi-message">
                        <ul style={{ listStyle: "none" }}>
                          <li>
                            <button
                              onClick={() => {
                                const isProductInWishlist =
                                  wishlistData?.data?.wishlists?.edges?.some(
                                    (prd) => prd?.node?.variant === item?.id
                                  );

                                if (!isProductInWishlist) {
                                  handleWishlist(item);
                                } else {
                                  router.push("/wishlist");
                                }
                              }}
                            >
                              <Wishlist />
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => {
                                if (
                                  compareList?.some((prd) => {
                                    return prd?.id == item?.id;
                                  })
                                ) {
                                  router.push("/compare");
                                } else {
                                  handleCompareProduct(item);
                                }
                              }}
                            >
                              <CompareThree />
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => dispatch(handleProductModal(item))}
                            >
                              <QuickView />
                            </button>
                          </li>
                        </ul>
                      </div>
                      <Image
                        src={profilePic(item?.thumbnail?.url)}
                        width={300}
                        height={300}
                        alt="instagram img"
                        className="actor-image"
                      />
                      <div className="tp-instagram-icon-2">
                        <p className="actor-hov-para">{item?.name}</p>
                        {item?.category && (
                          <p className="actor-hov-para">
                            {item?.category?.name}
                          </p>
                        )}
                        <p className="actor-hov-para">
                          Price :{" "}
                          {checkChannel() === "india-channel" ? "₹" : "$"}
                          {item?.pricing?.priceRange?.start?.gross?.amount?.toFixed(2)}
                        </p>
                        <button
                          type="button"
                          className="actor-hover-btn"
                          onClick={() => {
                            console.log("onClick: ");
                            if (
                              cartList?.data?.checkout?.lines?.some(
                                (prd) => prd?.variant?.product?.id == item?.id
                              )
                            ) {
                              console.log(" if: ");

                              router.push("/cart");
                            } else {
                              console.log(" else: ");

                              addToCartProductINR(item);
                              addToCartProductUSD(item);
                            }
                          }}
                        >
                          {cartList?.data?.checkout?.lines?.some(
                            (prd) => prd?.variant?.product?.id == item?.id
                          )
                            ? "View Card"
                            : "Add To Card"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default InstagramAreaFour;
