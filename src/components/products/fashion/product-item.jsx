import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Rating } from "react-simple-star-rating";
import Link from "next/link";
// internal
import { Cart, CompareThree, QuickView, Wishlist } from "@/svg";
import { handleProductModal } from "@/redux/features/productModalSlice";
import {
  add_cart_product,
  cart_list,
  compare_list,
  openCartMini,
} from "@/redux/features/cartSlice";
import { add_to_wishlist } from "@/redux/features/wishlist-slice";
import { add_to_compare } from "@/redux/features/compareSlice";
import {
  capitalizeFLetter,
  roundOff,
  RegularPrice,
  addCommasToNumber,
} from "@/utils/functions";
import { notifyError, notifySuccess } from "@/utils/toast";
import {
  useAddToCartMutation,
  useGetCartAllListQuery,
} from "@/redux/features/card/cardApi";
import { useRouter } from "next/router";
import { checkWishlist } from "@/utils/common_function";
import { useGetCartListQuery } from "@/redux/features/card/cardApi";
import {
  useAddWishlistMutation,
  useGetProductByIdQuery,
  useGetWishlistQuery,
} from "../../../redux/features/productApi";
import { profilePic } from "@/utils/constant";
import ButtonLoader from "@/components/loader/button-loader";

const ProductItem = ({ products, style_2 = false, updateData }) => {
  const [channel, setChannel] = useState("india-channel");

  let product = products.node;

  const router = useRouter();

  const dispatch = useDispatch();

  const [isAddWishlist, setWishlist] = useState(false);
  const [cartLoader, setCartLoader] = useState(false);
  const [wishlistLoader, setWishlistLoader] = useState(false);

  const [addWishlist, {}] = useAddWishlistMutation();

  const { _id, category, title, reviews, price, discount, tags, status } =
    product || {};

  const cart = useSelector((state) => state.cart?.cart_list);

  const { data: datacartList, refetch: cartRefetch } = useGetCartListQuery();
  const { data: AllListChannel, refetch: AllListChannelREfresh } =
    useGetCartAllListQuery({});

  const { data: wishlistData, refetch: wishlistRefetch } =
    useGetWishlistQuery();

  useEffect(() => {
    getWishlistList();
  }, [wishlistData]);

  const compareList = useSelector((state) => state.cart.compare_list);

  const { wishlist } = useSelector((state) => state.wishlist);

  const isAddedToCart = cart?.some(
    (prd) => prd?.variant?.product?.id === product?.id
  );

  const isAddedToWishlist = wishlistData?.data?.wishlists?.edges?.some(
    (prd) => {
      return prd?.node?.variant === product?.id;
    }
  );

  const [addToCartMutation, { data: productsData, isError, isLoading }] =
    useAddToCartMutation();

  useEffect(() => {
    const whislist = checkWishlist(wishlist, product.id);
    setWishlist(whislist);
  }, [wishlist]);

  useEffect(() => {
    const compareList = localStorage.getItem("compareList");
    const arr = JSON.parse(compareList);
    dispatch(compare_list(arr));
  }, [dispatch]);

  const [token, setToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  const addToCartProductINR = async () => {
    setCartLoader(true);
    try {
      setCartLoader(true);
      const checkoutTokenINR = localStorage.getItem("checkoutTokenINR");
      const response = await addToCartMutation({
        checkoutToken: checkoutTokenINR,
        variantId: product?.defaultVariant?.id,
      });
      if (response.data?.data?.checkoutLinesAdd?.errors?.length > 0) {
        const err = response.data?.data?.checkoutLinesAdd?.errors[0]?.message;
        // notifyError(err);
      } else {
        notifySuccess(`Product added to cart successfully`);
        dispatch(openCartMini());
        cartRefetch();
        AllListChannelREfresh();
      }
      setCartLoader(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const addToCartProductUSD = async () => {
    setCartLoader(true);
    try {
      setCartLoader(true);
      const checkoutTokenUSD = localStorage.getItem("checkoutTokenUSD");
      const response = await addToCartMutation({
        checkoutToken: checkoutTokenUSD,
        variantId: product?.defaultVariant?.id,
      });
      if (response.data?.data?.checkoutLinesAdd?.errors?.length > 0) {
        const err = response.data?.data?.checkoutLinesAdd?.errors[0]?.message;
        // notifyError(err);
      } else {
        cartRefetch();
      }
      setCartLoader(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleWishlist = async () => {
    setWishlistLoader(true);
    try {
      setWishlistLoader(true);
      // const token = localStorage.getItem("token");
      const user = localStorage.getItem("userInfo");

      if (token) {
        const users = JSON.parse(user);
        const input = {
          input: {
            user: users.user.id,
            variant: product?.id,
          },
        };

        const res = await addWishlist(input);
        notifySuccess("Product added to wishlist");
        wishlistRefetch();
      } else {
        notifyError(
          "Only logged-in users can add items to their wishlist or view it"
        );
        // const addedWishlist = handleWishlistProduct(prd);
        // dispatch(add_to_wishlist(addedWishlist));
      }
      setWishlistLoader(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

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

  // handle compare product
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
  const img = product?.thumbnail?.url;
  useEffect(() => {
    const channel = localStorage.getItem("channel");
    if (channel) {
      setChannel(channel);
    }
  }, []);

  return (
    <div
      className={`tp-product-item-2 ${style_2 ? "" : "mb-40"}${
        product?.defaultVariant?.quantityAvailable == 0 && "bg-opacity-100"
      }`}
    >
      <div className="tp-product-thumb-2 p-relative z-index-1 fix">
        <Link href={`/product-details/${product?.id}`}>
          {/* <Image
            // src={img}
            src={profilePic(img)}
            alt="product img"
            width={284}
            height={302}
          /> */}

          <img src={profilePic(img)} width={284} height={302} />
        </Link>
        <div className="tp-product-badge">
          {status === "out-of-stock" ? (
            <span
              className="product-hot text-center"
              style={{ padding: "15px 12px" }}
            >
              SOLD
              <br /> OUT
            </span>
          ) : (
            <div style={{ display: "none" }}></div>
          )}
        </div>

        {/* <div className="tp-product-badge-2">
          {product?.defaultVariant?.quantityAvailable == 0 && (
            <span className="product-hot">HOT</span>
          )}
        </div> */}

        <div className="tp-product-badge-2">
          {product?.defaultVariant?.quantityAvailable == 0 && (
            <span className="product-hot text-center soldout-badge">
              SOLD
              <br /> OUT
            </span>
          )}
        </div>

        <div
          className={`${
            product?.defaultVariant?.quantityAvailable == 0
              ? "tp-product-badge"
              : "tp-product-badge-2"
          }`}
        >
          {product?.metadata?.filter((item) => item.key === "label").length >
            0 &&
            product.metadata
              .filter((item) => item.key === "label")
              .map((item, index) => (
                <span
                  key={index}
                  className="product-trending text-center"
                  style={{
                    padding: "18px 12px",
                    textTransform: "capitalize",
                  }}
                >
                  {item.value}
                </span>
              ))}
        </div>

        {/* product action */}
        <div className="tp-product-action-2 tp-product-action-blackStyle">
          <div className="tp-product-action-item-2 d-flex ">
            {product?.defaultVariant?.quantityAvailable != 0 && (
              <>
                {isAddedToCart ? (
                  <Link
                    href="/cart"
                    className={`tp-product-action-btn-2 ${
                      isAddedToCart ? "active" : ""
                    } tp-product-add-cart-btn`}
                  >
                    <Cart />
                    <span className="tp-product-tooltip tp-product-tooltip-top">
                      View Cart
                    </span>
                  </Link>
                ) : (
                  <button
                    type="button"
                    style={{ marginRight: "5px" }}
                    onClick={() => {
                      addToCartProductINR();
                      addToCartProductUSD();
                    }}
                    className={`tp-product-action-btn-2 ${
                      isAddedToCart ? "active" : ""
                    } tp-product-add-cart-btn`}
                    disabled={status === "out-of-stock"}
                  >
                    {cartLoader ? (
                      <ButtonLoader loader={cartLoader} />
                    ) : (
                      <>
                        <Cart />
                        <span className="tp-product-tooltip tp-product-tooltip-top">
                          Add to Cart
                        </span>
                      </>
                    )}
                  </button>
                )}
              </>
            )}

            {/* <button
              type="button"
              style={{ marginRight: "5px" }}
              onClick={() => {
                if (isAddedToCart) {
                  router.push("/cart");
                } else {
                  handleAddProduct(product);
                }
              }}
              className={`tp-product-action-btn-2 ${
                isAddedToCart ? "active" : ""
              } tp-product-add-cart-btn`}
              disabled={status === "out-of-stock"}
            >
              <Cart />
              <span className="tp-product-tooltip tp-product-tooltip-top">
                Add to Cart
              </span>
            </button> */}
            <button
              style={{ marginRight: "5px" }}
              onClick={() => dispatch(handleProductModal(product))}
              className="tp-product-action-btn-2 tp-product-quick-view-btn"
            >
              <QuickView />
              <span className="tp-product-tooltip tp-product-tooltip-top">
                Quick View
              </span>
            </button>

            {isAddedToWishlist == true ? (
              <button
                style={{ marginRight: "5px" }}
                disabled={status === "out-of-stock"}
                onClick={() => {
                  if (token) {
                    router.push("/wishlist");
                  } else {
                    notifyError(
                      "Only logged-in users can add items to their wishlist or view it"
                    );
                  }
                }}
                // onClick={() => addWishlistProduct(product)}
                className={`tp-product-action-btn-2 active tp-product-add-to-wishlist-btn`}
              >
                <Wishlist />
                <span className="tp-product-tooltip tp-product-tooltip-top">
                  View Wishlist
                </span>
              </button>
            ) : (
              <button
                style={{ marginRight: "5px" }}
                disabled={status === "out-of-stock"}
                onClick={() => handleWishlist(product)}
                // onClick={() => addWishlistProduct(product)}
                className={`tp-product-action-btn-2 
                tp-product-add-to-wishlist-btn`}
              >
                {wishlistLoader ? (
                  <ButtonLoader loader={wishlistLoader} />
                ) : (
                  <>
                    <Wishlist />
                    <span className="tp-product-tooltip tp-product-tooltip-top">
                      Add To Wishlist
                    </span>
                  </>
                )}
              </button>
            )}

            <button
              style={{ marginRight: "5px" }}
              disabled={status === "out-of-stock"}
              onClick={() => {
                if (compareList?.some((prd) => prd?.id === product?.id)) {
                  router.push("/compare");
                } else {
                  handleCompareProduct(product);
                }
              }}
              className="tp-product-action-btn-2 tp-product-add-to-compare-btn"
            >
              <CompareThree />
              <span className="tp-product-tooltip tp-product-tooltip-top">
                {compareList?.some((prd) => prd?.id === product?.id)
                  ? "View Compare"
                  : "Add To Compare"}
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="tp-product-content-2 pt-15">
        <div className="tp-product-tag-2">
          {tags?.map((t, i) => (
            <a key={i} href="#">
              {t}
              {i < tags.length - 1 && ","}
            </a>
          ))}
        </div>
        <div style={{ textAlign: "center" }}>
          <h3 className="tp-product-title-2">
            <Link href={`/product-details/${_id}`}>
              {capitalizeFLetter(product?.name)}
            </Link>
          </h3>
          <h3
            className="tp-product-title-2"
            style={{ fontSize: "14px", color: "rgb(144 141 141)" }}
          >
            <Link href={`/product-details/${_id}`}>
              {capitalizeFLetter(product?.category?.name)}
            </Link>
          </h3>
          {/* <div className="tp-product-rating-icon tp-product-rating-icon-2">
          <Rating allowFraction size={16} initialValue={ratingVal} readonly={true} />
        </div> */}
          {channel == "india-channel" ? (
            <div className="tp-product-price-wrapper ">
              {RegularPrice(
                addCommasToNumber(product?.defaultVariant?.costPrice),
                addCommasToNumber(
                  product?.pricing?.priceRange?.start?.gross?.amount
                )
              ) && (
                <span
                  className="tp-product-price-1 pr-5 line-through "
                  style={{
                    textDecoration: "line-through",
                    color: "rgb(144 141 141)",
                    fontSize: "14px",
                  }}
                >
                  &#8377;
                  {addCommasToNumber(
                    roundOff(product?.defaultVariant?.costPrice)
                  )}
                </span>
              )}
              <span
                className="tp-product-price-2 new-price "
                style={{ fontSize: "14px" }}
              >
                &#8377;
                {addCommasToNumber(
                  product?.pricing?.priceRange?.start?.gross?.amount
                )}
              </span>
            </div>
          ) : (
            <div className="tp-product-price-wrapper-2">
              {RegularPrice(
                product?.defaultVariant?.costPrice,
                product?.pricing?.priceRange?.start?.gross?.amount
              ) && (
                <span
                  className="tp-product-price-1 pr-5 line-through "
                  style={{
                    textDecoration: "line-through",
                    color: "rgb(144 141 141)",
                    fontSize: "14px",
                  }}
                >
                  {"$"}
                  {addCommasToNumber(product?.defaultVariant?.costPrice)}
                </span>
              )}
              <span
                className="tp-product-price-2 new-price"
                style={{ fontSize: "14px" }}
              >
                {"$"}
                {addCommasToNumber(
                  product?.pricing?.priceRange?.start?.gross?.amount
                )}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
