import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { Rating } from "react-simple-star-rating";
// internal
import {
  add_cart_product,
  add_compare,
  cart_list,
  compare_list,
} from "@/redux/features/cartSlice";
import { remove_compare_product } from "@/redux/features/compareSlice";
import {
  useAddToCartMutation,
  useGetCartListQuery,
} from "@/redux/features/card/cardApi";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useRouter } from "next/router";
import {
  useGetProductByIdMutation,
  useGetProductByIdQuery,
  useGetWishlistQuery,
} from "@/redux/features/productApi";
import { profilePic } from "@/utils/constant";
import { roundOff } from "@/utils/functions";

const CompareArea = () => {
  const { data: wishlistData } = useGetWishlistQuery();

  const { compareItems } = useSelector((state) => state.compare);

  const compareList = useSelector((state) => state.cart.compare_list);

  const cart = useSelector((state) => state.cart.cart_list);

  const { data: datacartList, refetch: cartRefetch } = useGetCartListQuery();

  const [addToCartMutation, { data: productsData, isError, isLoading }] =
    useAddToCartMutation();

  const [getProducts] = useGetProductByIdMutation();

  const dispatch = useDispatch();

  const router = useRouter();

  useEffect(() => {
    const compareList = localStorage.getItem("compareList");
    const arr = JSON.parse(compareList);
    dispatch(compare_list(arr));
  }, []);

  useEffect(() => {
    getProductListById();
  }, []);

  const getProductListById = async (item) => {
    try {
      const compareList = localStorage.getItem("compareList");
      let productIds = [];
      if (compareList) {
        productIds = JSON.parse(compareList)?.map((item) => item.id);
      } else {
        productIds = [];
      }
      const response = await getProducts({
        ids: productIds,
      });
      console.log("response: ", response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAddProduct = async (item) => {
    try {
      const checkoutToken = localStorage.getItem("checkoutToken");
      const response = await addToCartMutation({
        checkoutToken: checkoutToken,
        variantId: item?.variants[0]?.id,
      });
      if (response.data?.data?.checkoutLinesAdd?.errors?.length > 0) {
        const err = response.data?.data?.checkoutLinesAdd?.errors[0]?.message;
        notifyError(err);
        dispatch(cart_list(cart));
      } else {
        notifySuccess(`${product.node.name} added to cart successfully`);
        // cart_list.push
        dispatch(
          cart_list(response?.data?.data?.checkoutLinesAdd?.checkout?.lines)
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // handle add product
  const handleRemoveComparePrd = (prd) => {
    const filter = compareList.filter((item) => item.id !== prd.id);
    localStorage.setItem("compareList", JSON.stringify(filter));
    dispatch(compare_list(filter));
  };

  const IndiaChannel = compareList?.map((item) => {
    return item?.pricing?.priceRange?.start?.gross?.currency === "INR"
      ? true
      : false;
  });

  const description = (item) => {
    if (item) {
      const jsonObject = JSON.parse(item);
      const textValue = jsonObject?.blocks[0]?.data?.text;
      return textValue;
    }
  };

  const addToCartProductINR = async (product) => {
    try {
      const checkoutTokenINR = localStorage.getItem("checkoutTokenINR");
      const response = await addToCartMutation({
        checkoutToken: checkoutTokenINR,
        variantId: product?.defaultVariant?.id,
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

  const addToCartProductUSD = async (product) => {
    try {
      const checkoutTokenUSD = localStorage.getItem("checkoutTokenUSD");
      const response = await addToCartMutation({
        checkoutToken: checkoutTokenUSD,
        variantId: product?.defaultVariant?.id,
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

  return (
    <>
      <section className="tp-compare-area pb-50 pt-50">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-12">
              {compareList?.length === 0 && (
                <div className="text-center pt-50">
                  <h3>No Compare Items Found</h3>
                  <Link href="/shop" className="tp-cart-checkout-btn mt-20">
                    Continue Shipping
                  </Link>
                </div>
              )}
              {compareList?.length > 0 && (
                <div className="tp-compare-table table-responsive text-center">
                  <table className="table">
                    <tbody>
                      <tr>
                        <th>Product</th>
                        {compareList?.map((item, index) => {
                          return (
                            <td
                              key={item?.id}
                              className=""
                              style={{ minWidth: "300px" }}
                            >
                              <div className="tp-compare-thumb p-relative z-index-1">
                                <Image
                                  src={profilePic(item?.thumbnail?.url)}
                                  alt="compare"
                                  width={500}
                                  height={500}
                                  className=""
                                />
                                <div className="tp-product-badge-2">
                                  {item?.defaultVariant?.quantityAvailable ==
                                    0 && (
                                    <span
                                      className="product-hot text-center"
                                      style={{ padding: "15px 12px " }}
                                    >
                                      SOLD
                                      <br /> OUT
                                    </span>
                                  )}
                                </div>

                                <h4 className="tp-compare-product-title">
                                  <Link href={`/product-details/${item?.id}`}>
                                    {item?.name}
                                  </Link>
                                </h4>

                                <div
                                  className="tp-compare-add-to-cart"
                                  style={{ paddingBottom: "10px" }}
                                >
                                  {IndiaChannel[index] ? (
                                    <>
                                      ₹
                                      {roundOff(
                                        item?.pricing?.priceRange?.start?.gross
                                          ?.amount
                                      )}
                                    </>
                                  ) : (
                                    <>
                                      $
                                      {roundOff(
                                        item?.pricing?.priceRange?.start?.gross
                                          ?.amount
                                      )}
                                    </>
                                  )}
                                </div>
                                {item?.defaultVariant?.quantityAvailable !=
                                  0 && (
                                  <div className="tp-compare-add-to-cart">
                                    {datacartList?.data?.checkout?.lines?.some(
                                      (prd) =>
                                        prd?.variant?.product?.id === item?.id
                                    ) ? (
                                      <button
                                        onClick={() => router.push("/cart")}
                                        className="tp-btn"
                                        type="button"
                                      >
                                        View Cart
                                      </button>
                                    ) : (
                                      <button
                                        onClick={() => {
                                          addToCartProductINR(item);
                                          addToCartProductUSD(item);
                                        }}
                                        type="button"
                                        className="tp-btn "
                                      >
                                        Add to Cart
                                      </button>
                                    )}
                                    {/* <button
                                onClick={() => handleAddProduct(item)}
                                type="button"
                                className="tp-btn"
                              >
                                Add to Cart
                              </button> */}
                                  </div>
                                )}
                              </div>
                            </td>
                          );
                        })}
                      </tr>

                      {/* Price */}
                      {/* <tr>
                        <th>Price</th>
                        {compareList.map((item) => (
                          <td key={item?.id}>
                            <div className="tp-compare-add-to-cart">
                              &#8377;
                              {item?.pricing?.priceRange?.start?.gross?.amount?.toFixed(
                                2
                              )}
                            </div>
                          </td>
                        ))}
                      </tr> */}

                      {/* Add to cart*/}
                      {/* <tr>
                        <th>Add to cart</th>
                        {compareList.map((item) => (
                          <td key={item?.id}>
                            <div className="tp-compare-add-to-cart">
                              {cart.some(
                                (prd) => prd?.variant?.product?.id === item?.id
                              ) ? (
                                <button
                                  onClick={() => router.push("/cart")}
                                  className="tp-btn"
                                  type="button"
                                >
                                  View Cart
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleAddProduct(item)}
                                  type="button"
                                  className="tp-btn"
                                >
                                  Add to Cart
                                </button>
                              )}
                              <button
                                onClick={() => handleAddProduct(item)}
                                type="button"
                                className="tp-btn"
                              >
                                Add to Cart
                              </button>
                            </div>
                          </td>
                        ))}
                      </tr> */}

                      {/* Description */}
                      <tr>
                        <th>Description</th>
                        {compareList?.map((item) => (
                          <td key={item?.id}>
                            <div className="tp-compare-add-to-cart">
                              <span>{description(item?.description)}</span>
                            </div>
                          </td>
                        ))}
                      </tr>
                      {/* SKU */}
                      <tr>
                        <th>SKU</th>
                        {compareList.map((item) => (
                          <td key={item?.id}>
                            {/* <div className="tp-compare-add-to-cart">
                              &#8377;
                              {item?.pricing?.priceRange?.start?.gross?.amount?.toFixed(
                                2
                              )}
                            </div> */}
                          </td>
                        ))}
                      </tr>

                      {/* availability */}
                      <tr>
                        <th>Availability</th>
                        {compareList.map((item) => (
                          <td key={item?.id}>
                            {/* <div className="tp-compare-add-to-cart">
                              &#8377;
                              {item?.pricing?.priceRange?.start?.gross?.amount?.toFixed(
                                2
                              )}
                            </div> */}
                          </td>
                        ))}
                      </tr>

                      {/* Rating */}
                      {/* <tr>
                        <th>Rating</th>
                        {compareItems.map(item => (
                          <td key={item._id}>
                            <div className="tp-compare-rating">
                              <Rating
                                allowFraction
                                size={16}
                                initialValue={item.reviews.length > 0 ? item.reviews.reduce((acc, review) => acc + review.rating, 0) / item.reviews.length : 0}
                                readonly={true}
                              />
                            </div>
                          </td>
                        ))}
                      </tr> */}
                      {/* Remove */}
                      <tr>
                        <th>Remove</th>
                        {compareList?.map((item) => (
                          <td key={item?.id}>
                            <div className="tp-compare-remove">
                              <button
                                onClick={() => handleRemoveComparePrd(item)}
                              >
                                <i className="fal fa-trash-alt"></i>
                              </button>
                            </div>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CompareArea;
