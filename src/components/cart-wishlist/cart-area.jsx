import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
// internal
import { cart_list, clearCart } from "@/redux/features/cartSlice";
import CartCheckout from "./cart-checkout";
import CartItem from "./cart-item";
import RenderCartProgress from "../common/render-cart-progress";
import {
  useGetCartListQuery,
  useUpdateCartQuantityMutation,
} from "@/redux/features/card/cardApi";
import { notifySuccess } from "@/utils/toast";
import { useGetCartAllListQuery } from "../../redux/features/card/cardApi";
import { useRouter } from "next/router";
import ProductItem from "../products/beauty/product-item";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, Navigation, Autoplay } from "swiper";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useGetYouMayLikeMutation } from "@/redux/features/productApi";
import { slider_setting } from "@/utils/functions";

const CartArea = () => {
  const router = useRouter();

  const { data: list, refetch } = useGetCartListQuery();
  const { data: allList, refetch: cartAllList } = useGetCartAllListQuery();
  const [getYouMayLike] = useGetYouMayLikeMutation();

  const CartList = list?.data?.checkout?.lines;

  const [cartData, setCartData] = useState([]);
  const [allcartData, setAllCartData] = useState([]);

  const [youMayLikeData, setYouMayLikeData] = useState([]);

  useEffect(() => {
    const data = list?.data?.checkout?.lines?.map((item) => {
      return { ...item, quantity: item.quantity ? item.quantity : 1 };
    });
    setCartData(data);
    getYouMayLikeData();
  }, [list]);

  useEffect(() => {
    const data = allList?.data?.checkout?.lines?.map((item) => {
      return { ...item, quantity: item.quantity ? item.quantity : 1 };
    });
    setAllCartData(data);
  }, [allList]);

  const [updateCartQuantity, {}] = useUpdateCartQuantityMutation();

  const updateCart = () => {
    cartData?.map((item) =>
      updateCartQuantity({
        checkoutId: list?.data?.checkout?.id,
        lineId: item.id,
        quantity: item.quantity,
      }).then((data) => {
        allcartData?.map((item) =>
          updateCartQuantity({
            checkoutId: allList?.data?.checkout?.id,
            lineId: item.id,
            quantity: item.quantity,
          }).then((data) => {})
        );
        refetch();
        cartAllList();
      })
    );
    notifySuccess("Quantity update completed");
  };

  const Quantity = (quantity, val) => {
    const data = cartData.map((item) => {
      if (item.variant?.product?.id == val?.variant?.product?.id) {
        return { ...item, quantity: quantity };
      }
      return item;
    });

    const allListData = allcartData.map((item) => {
      if (item.variant?.product?.id == val?.variant?.product?.id) {
        return { ...item, quantity: quantity };
      }
      return item;
    });

    setAllCartData(allListData);
    setCartData(data);
  };

  const getYouMayLikeData = async () => {
    try {
      let productDetails = [];
      if (CartList?.length === 1) {
        if (CartList[0]?.variant?.product?.getCrosssells?.length > 0)
          for (let item of CartList[0]?.variant?.product?.getCrosssells) {
            try {
              const res = await getYouMayLike({ productId: item?.slug });
              productDetails.push(res?.data);
            } catch (error) {
              console.error(
                `Error fetching data for productId ${item?.productId}:`,
                error
              );
            }
          }

        setYouMayLikeData(productDetails);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <section className="tp-cart-area pb-50 mt-50">
        <div className="container-fluid">
          {CartList?.length === 0 && (
            <div className="text-center pt-50 pb-50">
              <h3>No Cart Items Found</h3>
              <Link href="/shop" className="tp-cart-checkout-btn mt-20">
                Continue Shopping
              </Link>
            </div>
          )}
          {CartList?.length > 0 && (
            <>
              <div className="row">
                <div className="col-xl-9 col-lg-8">
                  <div className="tp-cart-list mb-25 mr-30">
                    {/* <div className="cartmini__shipping">
                    <RenderCartProgress />
                  </div> */}
                    <table className="table">
                      <thead>
                        <tr>
                          <th colSpan="2" className="tp-cart-header-product">
                            PRODUCT
                          </th>
                          <th className="tp-cart-header-price">PRICE</th>
                          <th className="tp-cart-header-price">QUANTITY</th>
                          <th className="tp-cart-header-price">SUBTOTAL</th>
                          <th className="tp-cart-header-quantity">Action</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {CartList?.map((item, i) => {
                          return (
                            <CartItem
                              isQuantity={true}
                              key={i}
                              product={item}
                              title={
                                item?.variant?.product?.name || item?.node?.name
                              }
                              img={
                                item?.variant?.product?.thumbnail?.url ||
                                item?.node?.thumbnail?.url
                              }
                              price={
                                item?.variant?.pricing?.price?.gross?.amount ||
                                item?.node?.pricing?.priceRange?.start?.gross
                                  ?.amount
                              }
                              quantityAvailable={
                                item?.variant?.quantityAvailable ||
                                item?.node?.quantityAvailable
                              }
                              incQuantity={(quantity) =>
                                Quantity(quantity, item)
                              }
                              decQuantity={(quantity) =>
                                Quantity(quantity, item)
                              }
                              quantityCount={item.quantity}
                              refetch={() => refetch()}
                            />
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className="tp-cart-bottom">
                    <div className="row align-items-end">
                      <div className="col-xl-12 col-md-12">
                        <div className="tp-checkout-verify-item mr-30">
                          <p className="tp-checkout-verify-reveal">
                            Have a coupon?{" "}
                            <Link
                              href="/checkout"
                              type="button"
                              style={{ color: "#c3935b" }}
                              className="tp-checkout-coupon-form-reveal-btn"
                            >
                              Apply Coupon Code in Checkout
                            </Link>
                          </p>
                        </div>
                        <div className="tp-cart-update text-md-end mr-30">
                          <button
                            type="button"
                            className="tp-cart-update-btn mr-10"
                            style={{ border: "1px solid #ececec" }}
                            onClick={() => {
                              router.push("shop");
                            }}
                          >
                            Continue Shopping
                          </button>
                          <button
                            type="button"
                            className="tp-cart-update-btn "
                            style={{ background: "#ececec" }}
                            onClick={() => updateCart()}
                          >
                            UPDATE CART
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6 mb-0 md-mb-30">
                  <CartCheckout cartData={cartData} />
                </div>
              </div>
              {CartList?.length === 1 && youMayLikeData?.length > 0 && (
                <section className="tp-related-product pt-50">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="tp-section-title-wrapper-6 mb-40">
                        <h3 className="tp-section-title-6">
                          YOU MAY BE INTERESTED IN…
                        </h3>
                      </div>
                    </div>

                    <div className="row">
                      <Swiper
                        {...slider_setting}
                        modules={[Autoplay, Navigation]}
                        className="tp-product-related-slider-active swiper-container mb-10"
                      >
                        {youMayLikeData?.map((item) => (
                          <SwiperSlide key={item?.slug}>
                            <ProductItem
                              product={item?.data?.product}
                              primary_style={true}
                              data={youMayLikeData}
                            />
                          </SwiperSlide>
                        ))}
                        <div className="tp-related-slider-button-prev swiper-button-prev">
                          <LeftOutlined />
                        </div>
                        <div className="tp-related-slider-button-next swiper-button-next">
                          <RightOutlined />
                        </div>
                      </Swiper>
                    </div>
                  </div>
                </section>
              )}
            </>
          )}

          {/* <div style={{ paddingTop: "50px" }}>
            <h5>YOU MAY BE INTERESTED IN…</h5>
          </div> */}
        </div>
      </section>
    </>
  );
};

export default CartArea;
