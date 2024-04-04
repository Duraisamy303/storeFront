import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { Rating } from "react-simple-star-rating";
// internal
import {
  add_cart_product,
  add_compare,
  compare_list,
} from "@/redux/features/cartSlice";
import { remove_compare_product } from "@/redux/features/compareSlice";
import {
  useAddToCartMutation,
  useGetCartListQuery,
} from "@/redux/features/card/cardApi";
import { notifySuccess } from "@/utils/toast";
import { useRouter } from "next/router";

const CompareArea = () => {
  const { compareItems } = useSelector((state) => state.compare);

  const { data: tokens } = useGetCartListQuery();

  const compareList = useSelector((state) => state.cart.compare_list);

  const cart = useSelector((state) => state.cart.cart_list);

  const [addToCartMutation, { data: productsData, isError, isLoading }] =
    useAddToCartMutation();

  const dispatch = useDispatch();

  const router = useRouter();

  useEffect(() => {
    const compareList = localStorage.getItem("compareList");
    const arr = JSON.parse(compareList);
    dispatch(compare_list(arr));
  }, []);

  // handle add product
  // const handleAddProduct = (prd) => {
  //   dispatch(add_cart_product(prd));
  // };

  const handleAddProduct = async (data) => {
    console.log("data: ", data);
    try {
      const checkoutToken = localStorage.getItem("checkoutToken");
      if (checkoutToken) {
        const response = await addToCartMutation({
          variantId: data?.variants[0]?.id,
        });

        notifySuccess(`${data.name} added to cart successfully`);
      } else {
        router.push("/login");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // handle add product
  const handleRemoveComparePrd = (prd) => {
    console.log("prd: ", prd);
    const filter = compareList.filter((item) => item.id !== prd.id);
    console.log("filter: ", filter);
    localStorage.setItem("compareList", JSON.stringify(filter));
    dispatch(compare_list(filter));
  };

  const description = (item) => {
    if (item) {
      const jsonObject = JSON.parse(item);
      const textValue = jsonObject?.blocks[0]?.data?.text;
      return textValue;
    }
  };

  console.log("compareList: ", compareList);

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
                        {compareList?.map((item) => (
                          <td key={item?.id} className="">
                            <div className="tp-compare-thumb">
                              <Image
                                src={item?.thumbnail?.url}
                                alt="compare"
                                width={500}
                                height={500}
                              />
                              <h4 className="tp-compare-product-title">
                                <Link href={`/product-details/${item?.id}`}>
                                  {item?.name}
                                </Link>
                              </h4>
                              <div className="tp-compare-add-to-cart" style={{paddingBottom: '10px'}}>
                                &#8377;
                                {item?.pricing?.priceRange?.start?.gross?.amount?.toFixed(
                                  2
                                )}
                              </div>

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
                              {/* <button
                                onClick={() => handleAddProduct(item)}
                                type="button"
                                className="tp-btn"
                              >
                                Add to Cart
                              </button> */}
                            </div>
                            </div>
                          </td>
                        ))}
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
