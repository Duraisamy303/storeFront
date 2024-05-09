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
import { channel, checkChannel } from "../../utils/functions";

const CartMiniSidebar = () => {
  const { cartMiniOpen } = useSelector((state) => state.cart);

  const [removeToCart, {}] = useRemoveToCartMutation();

  const [channel, setChannel] = useState("");

  const cartData = useSelector((state) => state.cart?.cart_list);
  // const cart = cartData?.node || cartData;

  const { data: cartList, refetch: cartRefetch } = useGetCartListQuery();

  const { data: AllListChannel, refetch: AllListChannelREfresh } =
    useGetCartAllListQuery({});

  const CartList = cartList?.data?.checkout?.lines;

  useEffect(() => {
    cartRefetch();
  }, []);

  useEffect(() => {
    AllListChannelREfresh();
  }, []);

  useEffect(() => {
    const channels = checkChannel();
    setChannel(channels);
  }, []);

  const router = useRouter();

  const { total } = useCartInfo();
  const dispatch = useDispatch();

  const handleRemovePrd = async (val) => {
    try {
      const productId = val?.variant?.product?.id;
      const allListData = AllListChannel?.data?.checkout?.lines;
      const fine = allListData?.find(
        (item) => item?.variant?.product?.id === productId
      );
      const checkoutTokenINR = localStorage.getItem("checkoutTokenINR");
      const checkoutTokenUSD = localStorage.getItem("checkoutTokenUSD");
      let checkoutToken =
        localStorage.getItem("channel") === "india-channel"
          ? checkoutTokenUSD
          : checkoutTokenINR;

      await removeToCart({ checkoutToken: checkoutTokenINR, lineId: val.id });
      await removeToCart({ checkoutToken: checkoutToken, lineId: fine?.id });

      cartRefetch();
      AllListChannelREfresh();
    } catch (error) {
      console.log(error);
    }
  };

  // handle close cart mini
  const handleCloseCartMini = () => {
    dispatch(closeCartMini());
  };

  const quantityDisable = CartList?.map((item) => {
    return item?.variant?.quantityAvailable >= item.quantity;
  });

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
            <div className="cartmini__shipping">
              <RenderCartProgress />
            </div>
            {CartList?.length > 0 && (
              <div className="cartmini__widget">
                {CartList?.map((item) => {
                  return (
                    <>
                      {item.variant.quantityAvailable >= item.quantity ? (
                        <div key={item.id} className="cartmini__widget-item">
                          <div className="cartmini__thumb">
                            <div
                              onClick={() => {
                                dispatch(closeCartMini());
                                router.push(
                                  `/product-details/${item?.variant?.product?.id}`
                                );
                              }}
                            >
                              <Image
                                src={
                                  item?.variant?.product?.thumbnail?.url ||
                                  item?.node?.thumbnail?.url
                                }
                                width={70}
                                height={60}
                                alt="product img"
                              />
                            </div>
                          </div>
                          <div className="cartmini__content">
                            <h5 className="cartmini__title">
                              <Link
                                href={`/product-details/${item?.variant?.product?.id}`}
                              >
                                {item?.variant?.product?.name ||
                                  item?.node?.name}
                              </Link>
                            </h5>
                            <div className="cartmini__price-wrapper">
                              {/* {item?.discount > 0 ? (
                                <span className="cartmini__price">
                                  &#8377;
                                  {(
                                    Number(item?.price) -
                                    (Number(item?.price) *
                                      Number(item?.discount)) /
                                      100
                                  )?.toFixed(2)}
                                </span>
                              ) : ( */}
                              {channel == "india-channel" ? (
                                <span className="cartmini__price">
                                  &#8377;
                                  {item?.totalPrice?.gross?.amount?.toFixed(2)}
                                </span>
                              ) : (
                                <span className="cartmini__price">
                                  ${item?.totalPrice?.gross?.amount?.toFixed(2)}
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
                            onClick={() => handleRemovePrd(item)}
                            className="cartmini__del cursor-pointer"
                          >
                            <i className="fa-regular fa-xmark"></i>
                          </a>
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
                                  `/product-details/${item?.variant?.product?.id}`
                                );
                              }}
                            >
                              <Image
                                src={
                                  item?.variant?.product?.thumbnail?.url ||
                                  item?.node?.thumbnail?.url
                                }
                                width={70}
                                height={60}
                                alt="product img"
                              />
                            </div>
                          </div>
                          <div className="cartmini__content">
                            <h5 className="cartmini__title">
                              <Link
                                href={`/product-details/${item?.variant?.product?.id}`}
                              >
                                {item?.variant?.product?.name ||
                                  item?.node?.name}
                              </Link>
                            </h5>
                            <div className="cartmini__price-wrapper">
                              {/* {item?.discount > 0 ? (
                                <span className="cartmini__price">
                                  &#8377;
                                  {(
                                    Number(item?.price) -
                                    (Number(item?.price) *
                                      Number(item?.discount)) /
                                      100
                                  )?.toFixed(2)}
                                </span>
                              ) : ( */}
                              {channel == "india-channel" ? (
                                <span className="cartmini__price">
                                  &#8377;
                                  {item?.variant?.pricing?.price?.gross?.amount?.toFixed(
                                    2
                                  ) ||
                                    item?.node?.pricing?.priceRange?.start?.gross?.amount?.toFixed(
                                      2
                                    )}
                                </span>
                              ) : (
                                <span className="cartmini__price">
                                  $
                                  {item?.variant?.pricing?.price?.gross?.amount?.toFixed(
                                    2
                                  ) ||
                                    item?.node?.pricing?.priceRange?.start?.gross?.amount?.toFixed(
                                      2
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
                            onClick={() => handleRemovePrd(item)}
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
                <Link href="/shop" className="tp-btn">
                  Go to Shop
                </Link>
              </div>
            )}
          </div>
          <div className="cartmini__checkout">
            <div className="cartmini__checkout-title mb-30">
              <h4>Subtotal:</h4>
              {channel == "india-channel" ? (
                <span>
                  &#8377;
                  {cartList?.data?.checkout?.totalPrice?.gross?.amount?.toFixed(
                    2
                  )}
                </span>
              ) : (
                <span>
                  $
                  {cartList?.data?.checkout?.totalPrice?.gross?.amount?.toFixed(
                    2
                  )}
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
            </div>
          </div>
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
