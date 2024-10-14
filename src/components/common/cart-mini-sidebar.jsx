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
  remove_product,
} from "@/redux/features/cartSlice";
import {
  useGetCartListQuery,
  useRemoveToCartMutation,
} from "@/redux/features/card/cardApi";
import { useRouter } from "next/router";
import { useGetCartAllListQuery } from "../../redux/features/card/cardApi";
import {
  addCommasToNumber,
  checkChannel,
  roundOff,
} from "../../utils/functions";
import { profilePic } from "@/utils/constant";
import { isPreOrderAndGiftCart } from "../../redux/features/cartSlice";
import ButtonLoader from "../loader/button-loader";
import { COLORS } from "../../utils/constant";

const CartMiniSidebar = () => {
  const { cartMiniOpen } = useSelector((state) => state.cart);
  const carts = useSelector((state) => state.cart);

  const [removeIndex, setRemoveIndex] = useState(null);

  const [removeToCart, { isLoading: removeLoading }] =
    useRemoveToCartMutation();

  const [channel, setChannel] = useState("");

  const cartData = useSelector((state) => state.cart?.cart_list);
  // const cart = cartData?.node || cartData;

  const { data: cartList, refetch: cartRefetch } = useGetCartListQuery();

  const { data: AllListChannel, refetch: AllListChannelREfresh } =
    useGetCartAllListQuery();

  const CartList = cartList?.data?.checkout?.lines;

  useEffect(() => {
    cartRefetch();
  }, []);

  useEffect(() => {
    AllListChannelREfresh();
  }, [AllListChannel]);

  useEffect(() => {
    const channels = checkChannel();
    setChannel(channels);
  }, []);

  const router = useRouter();

  const { total } = useCartInfo();
  const dispatch = useDispatch();

  const handleRemovePrd = async (val, index) => {
    try {
      setRemoveIndex(index);
      const newTokenData = await AllListChannelREfresh();

      const productId = val?.variant?.product?.id;
      const allListData = newTokenData?.data?.data?.checkout?.lines;
      const find = allListData?.find(
        (item) => item?.variant?.product?.id == productId
      );
      const checkoutTokenINR = localStorage.getItem("checkoutTokenINR");
      const checkoutTokenUSD = localStorage.getItem("checkoutTokenUSD");
      let checkoutToken =
        checkChannel() === "india-channel"
          ? checkoutTokenUSD
          : checkoutTokenINR;
      await removeToCart({
        checkoutToken: checkoutTokenINR,
        lineId: val.id,
      });
      await removeToCart({
        checkoutToken: checkoutToken,
        lineId: find?.id,
      });
      cartRefetch();
      const res = await AllListChannelREfresh();
      const checkIsPreOrderAndGiftCart = checkCollectionsAndCategory(
        res?.data?.data?.checkout?.lines
      );
      dispatch(isPreOrderAndGiftCart(checkIsPreOrderAndGiftCart));
    } catch (error) {
      console.log(error);
    }
  };

  function checkCollectionsAndCategory(products) {
    return products.some((product) => {
      const hasPreOrderCollection = product.variant.product.collections.some(
        (collection) => collection.name === "Pre Orders"
      );
      const isGiftCartCategory =
        product.variant.product.category.name === "Gift Card";
      if (hasPreOrderCollection) {
        return true;
      }
      if (isGiftCartCategory) {
        return true;
      }
    });
  }

  // handle close cart mini
  const handleCloseCartMini = () => {
    dispatch(closeCartMini());
  };

  const quantityDisable = CartList?.map((item) => {
    return item?.variant?.quantityAvailable >= item.quantity;
  });

  const isImage = (url) => {
    return /\.(jpg|webp|jpeg|png|gif)$/i.test(url);
  };

  const isLoading = (index) => {
    let loading = false;
    if (removeIndex == index && removeLoading) {
      loading = true;
    }
    return loading;
  };

  return (
    <>
      <div
        className={`cartmini__area tp-all-font-roboto ${
          cartMiniOpen ? "cartmini-opened" : ""
        }`}
      >
        <div className="cartmini__wrapper d-flex justify-content-between flex-column">
          <div className="cartmini__top-wrapper">
            <div className="cartmini__top p-relative">
              <div className="cartmini__top-title">
                <h4>Shopping cart</h4>
              </div>
              <div className="cartmini__close">
                <button
                  onClick={() => dispatch(closeCartMini())}
                  type="button"
                  className="cartmini__close-btn cartmini-close-btn"
                >
                  <i className="fal fa-times"></i>
                </button>
              </div>
            </div>
            {/* <div className="cartmini__shipping">
              <RenderCartProgress />
            </div> */}
            {CartList?.length > 0 && (
              <div className="cartmini__widget">
                {CartList?.map((item, index) => {
                  return (
                    <>
                      {item.variant.quantityAvailable >= item.quantity ? (
                        <div key={item.id} className="cartmini__widget-item">
                          <div className="cartmini__thumb">
                            <div
                              onClick={() => {
                                dispatch(closeCartMini());
                                router.push(
                                  `/product-details/${item?.variant?.product?.slug}`
                                );
                              }}
                            >
                              {/* <Image
                                src={profilePic(
                                  item?.variant?.product?.thumbnail?.url ||
                                    item?.node?.thumbnail?.url
                                )}
                                width={70}
                                height={60}
                                alt="product img"
                              /> */}

                              {isImage(
                                profilePic(
                                  item?.variant?.product?.thumbnail?.url ||
                                    item?.node?.thumbnail?.url
                                )
                              ) ? (
                                <img
                                  src={profilePic(
                                    item?.variant?.product?.thumbnail?.url ||
                                      item?.node?.thumbnail?.url
                                  )}
                                  width={70}
                                  height={60}
                                  alt="product img"
                                />
                              ) : (
                                <video
                                  src={
                                    item?.variant?.product?.thumbnail?.url ||
                                    item?.node?.thumbnail?.url
                                  }
                                  alt="product img"
                                  width={70}
                                  height={60}
                                  style={{ height: "100%" }}
                                  muted
                                  loop
                                />
                              )}
                              {/* <img
                                src={profilePic(
                                  item?.variant?.product?.thumbnail?.url ||
                                    item?.node?.thumbnail?.url
                                )}
                                width={70}
                                height={60}
                                alt="product img"
                              /> */}
                            </div>
                          </div>
                          <div className="cartmini__content">
                            <h5 className="cartmini__title">
                              <Link
                                href={`/product-details/${item?.variant?.product?.slug}`}
                              >
                                {item?.variant?.product?.name ||
                                  item?.node?.name}
                              </Link>
                            </h5>
                            <div>{item?.variant?.sku}</div>
                            <div className="cartmini__price-wrapper">
                              {channel == "india-channel" ? (
                                <span className="cartmini__price">
                                  &#8377;
                                  {addCommasToNumber(
                                    item?.totalPrice?.gross?.amount
                                  )}
                                </span>
                              ) : (
                                <span className="cartmini__price">
                                  ${addCommasToNumber(item?.totalPrice?.gross?.amount)}
                                </span>
                              )}
                              {/* )} */}
                              <span className="cartmini__quantity">
                                {" "}
                                x {item?.quantity}
                              </span>
                            </div>
                          </div>
                          {isLoading(index) ? (
                            <div className="cartmini__del cursor-pointer">
                              <ButtonLoader color={COLORS.primary} />
                            </div>
                          ) : (
                            <a
                              onClick={() => handleRemovePrd(item, index)}
                              className="cartmini__del cursor-pointer"
                            >
                              <i className="fa-regular fa-xmark"></i>
                            </a>
                          )}
                        </div>
                      ) : (
                        <div
                          key={item.id}
                          className="cartmini__widget-item"
                          style={{ opacity: 0.5 }}
                        >
                          <div className="cartmini__thumb">
                            <div
                              onClick={() => {
                                dispatch(closeCartMini());
                                router.push(
                                  `/product-details/${item?.variant?.product?.slug}`
                                );
                              }}
                            >
                              <Image
                                src={profilePic(
                                  item?.variant?.product?.thumbnail?.url ||
                                    item?.node?.thumbnail?.url
                                )}
                                width={70}
                                height={60}
                                alt="product img"
                              />
                            </div>
                          </div>
                          <div className="cartmini__content">
                            <h5 className="cartmini__title">
                              <Link
                                href={`/product-details/${item?.variant?.product?.slug}`}
                              >
                                {item?.variant?.product?.name ||
                                  item?.node?.name}
                              </Link>
                            </h5>
                            <div className="cartmini__price-wrapper">
                              {channel == "india-channel" ? (
                                <span className="cartmini__price">
                                  &#8377;
                                  {addCommasToNumber(
                                    item?.variant?.pricing?.price?.gross
                                      ?.amount ||
                                      item?.node?.pricing?.priceRange?.start
                                        ?.gross?.amount
                                  )}
                                </span>
                              ) : (
                                <span className="cartmini__price">
                                  $
                                  {addCommasToNumber(
                                    item?.variant?.pricing?.price?.gross
                                      ?.amount ||
                                      item?.node?.pricing?.priceRange?.start
                                        ?.gross?.amount
                                  )}
                                </span>
                              )}
                              {/* )} */}
                              <span className="cartmini__quantity">
                                {" "}
                                x {item?.quantity}
                              </span>
                            </div>
                          </div>
                          <a
                            onClick={() => handleRemovePrd(item, index)}
                            className="cartmini__del cursor-pointer"
                          >
                            <i className="fa-regular fa-xmark"></i>
                          </a>
                        </div>
                      )}
                    </>
                  );
                })}
              </div>
            )}
            {/* if no item in cart */}
            {CartList?.length === 0 && (
              <div className="cartmini__empty text-center">
                <Image src={empty_cart_img} alt="empty-cart-img" />
                <p>Your Cart is empty</p>
                <button
                  onClick={() => {
                    router.push("/shop");
                    handleCloseCartMini();
                  }}
                  className="tp-btn"
                >
                  Go to Shop
                </button>
              </div>
            )}
          </div>
          {CartList?.length === 0 ? (
            <></>
          ) : (
            <div className="cartmini__checkout">
              <div className="cartmini__checkout-title mb-30">
                <h4>Subtotal:</h4>
                {channel == "india-channel" ? (
                  <>
                    <span>
                      &#8377;
                      {addCommasToNumber(
                        cartList?.data?.checkout?.totalPrice?.gross?.amount
                      )}
                    </span>
                    <div
                      style={{
                        fontWeight: "400",
                        fontSize: "12px",
                        textAlign: "right",
                      }}
                    >
                      (includes &#8377;
                      {addCommasToNumber(
                        cartList?.data?.checkout?.totalPrice?.tax?.amount
                      )}{" "}
                      GST)
                    </div>
                  </>
                ) : (
                  <span>
                    $
                    {addCommasToNumber(
                      cartList?.data?.checkout?.totalPrice?.gross?.amount
                    )}
                    <div
                      style={{
                        fontWeight: "400",
                        fontSize: "14px",
                        justifyContent: "flex-end",
                      }}
                    >
                      (includes $
                      {addCommasToNumber(
                        cartList?.data?.checkout?.totalPrice?.tax?.amount
                      )}{" "}
                      GST)
                    </div>
                  </span>
                )}
              </div>
              <div className="cartmini__checkout-btn">
                <Link
                  href="/cart"
                  onClick={handleCloseCartMini}
                  className="tp-btn mb-10 w-100"
                >
                  {" "}
                  view cart
                </Link>

                {quantityDisable?.some((item) => item === false) ? (
                  <button
                    style={{ cursor: "not-allowed" }}
                    className="tp-btn tp-btn-border w-100"
                  >
                    Checkout
                  </button>
                ) : (
                  <Link
                    href="/checkout"
                    onClick={handleCloseCartMini}
                    className="tp-btn tp-btn-border w-100"
                  >
                    Checkout
                  </Link>
                )}

                <button
                  onClick={() => {
                    router.push("/shop");
                    handleCloseCartMini();
                  }}
                  className="tp-btn w-100 mt-20"
                >
                  Continue to Shop
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* overlay start */}
      <div
        onClick={handleCloseCartMini}
        className={`body-overlay ${cartMiniOpen ? "opened" : ""}`}
      ></div>
      {/* overlay end */}
    </>
  );
};

export default CartMiniSidebar;
