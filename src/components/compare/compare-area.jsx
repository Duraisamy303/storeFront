import React, { useEffect, useState } from "react";
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
  openCartMini,
} from "@/redux/features/cartSlice";
import { remove_compare_product } from "@/redux/features/compareSlice";
import {
  useAddToCartMutation,
  useGetCartAllListQuery,
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
import { RegularPrice, checkChannel, roundOff } from "@/utils/functions";

const CompareArea = () => {
  const cart = useSelector((state) => state.cart.cart_list);

  const { data: datacartList, refetch: cartRefetch } = useGetCartListQuery();

  const [addToCartMutation, { data: productsData, isError, isLoading }] =
    useAddToCartMutation();

  const { data: AllListChannel, refetch: AllListChannelREfresh } =
    useGetCartAllListQuery({});

  const [getProducts] = useGetProductByIdMutation();
  const [compareData, setCompareData] = useState([]);

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
        productIds = JSON.parse(compareList)?.map((item) =>
          item?.node ? item?.node?.id : item?.id
        );
      } else {
        productIds = [];
      }

      if (productIds?.length > 0) {
        const response = await getProducts({
          ids: productIds,
        });

        setCompareData(response?.data?.data?.products?.edges);
      } else {
        setCompareData([]);
      }
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
    const filter = compareData.filter(
      (item) => item?.node.id !== prd?.node?.id
    );
    localStorage.setItem("compareList", JSON.stringify(filter));
    dispatch(compare_list(filter));

    getProductListById();
  };

  const IndiaChannel = compareData?.map((item) => {
    return item?.node?.pricing?.priceRange?.start?.gross?.currency === "INR"
      ? true
      : false;
  });


  const addToCartProductINR = async (product) => {
    try {
      const checkoutTokenINR = localStorage.getItem("checkoutTokenINR");
      const response = await addToCartMutation({
        checkoutToken: checkoutTokenINR,
        variantId: product?.node?.defaultVariant?.id,
      });
      if (response.data?.data?.checkoutLinesAdd?.errors?.length > 0) {
        const err = response.data?.data?.checkoutLinesAdd?.errors[0]?.message;
        notifyError(err);
      } else {
        notifySuccess(`Product added to cart successfully`);
        cartRefetch();
        dispatch(openCartMini());
        AllListChannelREfresh();
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
        variantId: product?.node?.defaultVariant?.id,
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

  const isImage = (url) => {
    return /\.(jpg|webp|jpeg|png|gif)$/i.test(url);
  };


  return (
    <>
      <section className="tp-compare-area pb-50 pt-50">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-12">
              {compareData?.length === 0 && (
                <div className="text-center pt-0 pb-0 pt-md-50 pb-md-50 ">
                  <h3>No Compare Items Found</h3>
                  <Link href="/shop" className="tp-cart-checkout-btn mt-20">
                    Continue Shipping
                  </Link>
                </div>
              )}
              {compareData?.length > 0 && (
                <div className="tp-compare-table table-responsive text-center">
                  <table className="table">
                    <tbody>
                      <tr>
                        <th style={{ fontWeight: "400" }}>PRODUCT</th>
                        {compareData?.map((item, index) => {
                          return (
                            <td
                              key={item?.node?.id}
                              className=""
                              style={{ minWidth: "300px" }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <div
                                  className="tp-compare-thumb p-relative z-index-1"
                                  style={
                                    compareData?.length === 1 ||
                                    compareData?.length === 2
                                      ? { width: "300px" }
                                      : {
                                          width: "100%",
                                          height: "100%",
                                          objectFit: "cover",
                                        }
                                  }
                                >
                                  {/* <Image
                                  src={profilePic(item?.node?.thumbnail?.url)}
                                  alt="compare"
                                  width={500}
                                  height={500}
                                  className=""
                                /> */}
                                  {isImage(
                                    profilePic(item?.node?.thumbnail?.url)
                                  ) ? (
                                    <img
                                      src={profilePic(
                                        item?.node?.thumbnail?.url
                                      )}
                                      alt="compare"
                                    />
                                  ) : (
                                    <video
                                      src={item?.node?.thumbnail?.url}
                                      alt="compare"
                                      muted
                                      loop
                                    />
                                  )}

                                  <div className="tp-product-badge-2">
                                    {item?.node?.defaultVariant
                                      ?.quantityAvailable == 0 && (
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
                                    <Link
                                      href={`/product-details/${item?.node?.slug}`}
                                    >
                                      {item?.node?.name}
                                    </Link>
                                  </h4>

                                  <div
                                    className="tp-compare-add-to-cart"
                                    style={{ paddingBottom: "10px" }}
                                  >
                                    {checkChannel() == "india-channel" ? (
                                      <>
                                        {RegularPrice(
                                          item?.node?.defaultVariant?.costPrice,
                                          item?.node?.pricing?.priceRange?.start
                                            ?.gross?.amount
                                        ) && (
                                          <span
                                            className="tp-product-price-1 pr-5 line-through "
                                            style={{
                                              textDecoration: "line-through",
                                              color: "gray",
                                            }}
                                          >
                                            ₹{" "}
                                            {
                                              item?.node?.defaultVariant
                                                ?.costPrice
                                            }
                                          </span>
                                        )}

                                        <span
                                          style={{
                                            color: "#c2882b",
                                            fontWeight: "500",
                                          }}
                                        >
                                          {" "}
                                          ₹
                                          {roundOff(
                                            item?.node?.pricing?.priceRange
                                              ?.start?.gross?.amount
                                          )}
                                        </span>
                                      </>
                                    ) : (
                                      <>
                                        {RegularPrice(
                                          item?.node?.defaultVariant?.costPrice,
                                          item?.node?.pricing?.priceRange?.start
                                            ?.gross?.amount
                                        ) && (
                                          <span
                                            className="tp-product-price-1 pr-5 line-through "
                                            style={{
                                              textDecoration: "line-through",
                                              color: "gray",
                                            }}
                                          >
                                            ${" "}
                                            {
                                              item?.node?.defaultVariant
                                                ?.costPrice
                                            }
                                          </span>
                                        )}
                                        <span
                                          style={{
                                            color: "#c2882b",
                                            fontWeight: "500",
                                          }}
                                        >
                                          $
                                          {roundOff(
                                            item?.node?.pricing?.priceRange
                                              ?.start?.gross?.amount
                                          )}
                                        </span>
                                      </>
                                    )}
                                  </div>
                                  {item?.node?.defaultVariant
                                    ?.quantityAvailable != 0 && (
                                    <div className="tp-compare-add-to-cart">
                                      {datacartList?.data?.checkout?.lines?.some(
                                        (prd) =>
                                          prd?.variant?.product?.id ===
                                          item?.node?.id
                                      ) ? (
                                        <button
                                          onClick={() => router.push("/cart")}
                                          className="tp-btn"
                                          type="button"
                                          style={{
                                            backgroundColor: "#c2882b",
                                            color: "white",
                                          }}
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
                                          style={{
                                            backgroundColor: "#c2882b",
                                            color: "white",
                                          }}
                                        >
                                          Add to Cart
                                        </button>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </td>
                          );
                        })}
                      </tr>

                      {/* Description */}
                      <tr>
                        <th style={{ fontWeight: "400" }}>DESCRIPTION</th>
                        {compareData?.map(({ node }) => {
                          const descriptionBlocks = JSON.parse(
                            node.description
                          )?.blocks;

                          return (
                            <td key={node.id}>
                              {/* Render description blocks */}
                              {descriptionBlocks?.map((block) => (
                                <div
                                  key={block.id}
                                  style={{ marginTop: "10px" }}
                                >
                                  {/* Handle paragraph type */}
                                  {block.type === "paragraph" && (
                                    <p
                                      style={{
                                        color: "gray",
                                        marginBottom: "5px",
                                      }}
                                    >
                                      <span
                                        dangerouslySetInnerHTML={{
                                          __html: block.data.text,
                                        }}
                                      />
                                    </p>
                                  )}

                                  {/* Handle header type */}
                                  {block.type === "header" && (
                                    <h5 style={{ fontWeight: "400" }}>
                                      {block.data.text}
                                    </h5>
                                  )}

                                  {/* Handle list type */}
                                  {block.type === "list" && (
                                    <ul style={{ paddingLeft: "20px" }}>
                                      {block?.data?.items?.map((item, index) => (
                                        <li
                                          key={index}
                                          style={{ color: "gray" }}
                                          dangerouslySetInnerHTML={{
                                            __html: item?.includes("<b>")
                                              ? `<b>${item}</b>`
                                              : item,
                                          }}
                                        />
                                      ))}
                                    </ul>
                                  )}
                                </div>
                              ))}
                            </td>
                          );
                        })}
                      </tr>

                      {/* SKU */}
                      <tr>
                        <th style={{ fontWeight: "400" }}>SKU</th>
                        {compareData.map((item) => (
                          <td key={item?.node?.id}>
                            <div className="tp-compare-add-to-cart">
                              <span style={{ color: "gray" }}>
                                {item?.node?.variants[0]?.sku}
                              </span>
                            </div>
                          </td>
                        ))}
                      </tr>

                      {/* availability */}
                      <tr>
                        <th style={{ fontWeight: "400" }}>AVAILABILITY</th>
                        {compareData.map((item) => (
                          <td key={item?.node?.id}>
                            {/* <div className="tp-compare-add-to-cart">
                              &#8377;
                              {item?.pricing?.priceRange?.start?.gross?.amount?.toFixed(
                                2
                              )}
                            </div> */}
                            <div className="tp-compare-add-to-cart">
                              <span style={{ color: "gray" }}>
                                {item?.node?.defaultVariant?.quantityAvailable}
                              </span>
                            </div>
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
                        <th style={{ fontWeight: "400" }}>REMOVE</th>
                        {compareData?.map((item) => (
                          <td key={item?.node?.id}>
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
