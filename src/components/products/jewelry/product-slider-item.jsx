import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
// internal
import { AddCart, Cart, CompareThree, QuickView, Wishlist } from "@/svg";
import {
  handleModalClose,
  handleProductModal,
} from "@/redux/features/productModalSlice";
import {
  add_cart_product,
  add_compare,
  cart_list,
  compare_list,
  openCartMini,
} from "@/redux/features/cartSlice";
import { add_to_wishlist } from "@/redux/features/wishlist-slice";
import { notifyError, notifySuccess } from "@/utils/toast";
import {
  useAddToCartMutation,
  useGetCartAllListQuery,
} from "@/redux/features/card/cardApi";
import LoginForm from "@/components/forms/login-form";
import { useRouter } from "next/router";
import { checkWishlist, handleWishlistProduct } from "@/utils/common_function";
import {
  useAddWishlistMutation,
  useGetWishlistQuery,
  useWishlistMutation,
} from "@/redux/features/productApi";
import { useGetCartListQuery } from "../../../redux/features/card/cardApi";
import { RegularPrice, checkChannel, roundOff } from "../../../utils/functions";
import { profilePic } from "@/utils/constant";
import ButtonLoader from "../../loader/button-loader";
const ProductSliderItem = ({ product, loginPopup, loading }) => {
  const { _id, title, price, status } = product || {};

  const router = useRouter();

  const [cartLoader, setCartLoader] = useState(false);
  const [wishlistLoader, setWishlistLoader] = useState(false);

  const RelatedProduct = product.node;

  const { data: wishlistData, refetch: wishlistRefetch } =
    useGetWishlistQuery();

  const { data: AllListChannel, refetch: AllListChannelREfresh } =
    useGetCartAllListQuery({});

  const isAddedToWishlist = wishlistData?.data?.wishlists?.edges?.some(
    (prd) => {
      return prd?.node?.variant === product?.node?.id;
    }
  );

  const [addWishlist, {}] = useAddWishlistMutation();

  const [isAddWishlist, setWishlist] = useState(false);
  const [isCartlist, setCartList] = useState(false);
  const [token, setToken] = useState("");

  const cart = useSelector((state) => state.cart.cart_list);

  const { wishlist } = useSelector((state) => state.wishlist);

  const compareList = useSelector((state) => state.cart.compare_list);

  const isAddedToCart = cart?.some(
    (prd) => prd?.variant?.product?.id == product?.node?.id
  );

  const dispatch = useDispatch();

  // useEffect(() => {
  //   const whislist = checkWishlist(wishlist, product?.node?.id);
  //   setWishlist(whislist);
  // }, [wishlist]);

  useEffect(() => {
    const cartlist = checkWishlist(cart, product?.node?.id);
    setCartList(cartlist);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  useEffect(() => {
    const compareList = localStorage.getItem("compareList");
    const arr = JSON.parse(compareList);
    dispatch(compare_list(arr));
  }, [dispatch]);

  const [addToCartMutation] = useAddToCartMutation();

  const { data: datacartList, refetch: cartRefetch } = useGetCartListQuery();

  // handle wishlist product
  // const handleWishlist = async (prd) => {
  //   if (isAddWishlist) {
  //     router.push("/wishlist");
  //   } else {
  //     addWishlistProduct(prd);
  //   }
  // };

  const handleWishlist = async (product) => {
    if (token) {
      setWishlistLoader(true);
      try {
        setWishlistLoader(true);
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("userInfo");

        if (token) {
          const users = JSON.parse(user);
          const input = {
            input: {
              user: users.user.id,
              variant: product?.node?.id,
            },
          };

          const res = await addWishlist(input);
          notifySuccess("Product added to wishlist");
          wishlistRefetch();
        } else {
          router.push("/login");

          // const addedWishlist = handleWishlistProduct(prd);
          // dispatch(add_to_wishlist(addedWishlist));
        }
        setWishlistLoader(false);
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      notifyError(
        "Only logged-in users can add items to their wishlist or view it"
      );
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
    arr.push(prd.node);
    localStorage.setItem("compareList", JSON.stringify(arr));
    dispatch(compare_list(arr));
    notifySuccess("Product to added to compare list");

  };
  const img = product?.node?.thumbnail?.url;
  const Product_name = product?.node?.name;
  const Category_Name = product?.node?.category?.name;
  const Price = product?.node?.pricing?.priceRange?.start?.gross?.amount;

  const openModal = () => {
    const datas = { ...product?.node, images: product?.node?.media };
    dispatch(handleProductModal(datas));
  };

  const addToCartProductINR = async () => {
    setCartLoader(true);
    try {
      setCartLoader(true);
      const checkoutTokenINR = localStorage.getItem("checkoutTokenINR");
      const response = await addToCartMutation({
        checkoutToken: checkoutTokenINR,
        variantId: product?.node?.defaultVariant?.id,
      });
      if (response.data?.data?.checkoutLinesAdd?.errors?.length > 0) {
        const err = response.data?.data?.checkoutLinesAdd?.errors[0]?.message;
        notifyError(err);
      } else {
        notifySuccess(`${product.node.name} added to cart successfully`);
        cartRefetch();
        dispatch(openCartMini());
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
        variantId: product?.node?.defaultVariant?.id,
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

  const isImage = (url) => {
    return /\.(jpg|webp|jpeg|png|gif)$/i.test(url);
  };

  return (
    <>
      <div className="tp-category-item-4 p-relative z-index-1 fix text-center">
        <Link href={`/product-details/${product?.node?.id}`}>
          <div
            className="tp-category-thumb-4 include-bg"
            style={{
              backgroundImage: isImage(profilePic(img)) ? `url(${img})` : "none",
              backgroundColor: "#FFFFFF",
              // backgroundPosition: "0px -80px",
            }}
          >
            {!isImage(profilePic(img)) &&
              img && ( // Ensure img is not empty before rendering <video>
                <video
                  src={img}
                  autoPlay
                  muted // Ensure it's muted to autoplay without user interaction
                  loop // Ensure it loops indefinitely
                  playsInline // Ensure it plays inline on iOS devices
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  alt="instagram video"
                  className="actor-video"
                />
              )}
          </div>

          <div className="tp-product-badge-2">
            {RelatedProduct?.defaultVariant?.quantityAvailable == 0 && (
              <span className="product-hot text-center soldout-badge">
                SOLD
                <br /> OUT
              </span>
            )}
          </div>

          <div
            className={`${
              RelatedProduct?.defaultVariant?.quantityAvailable == 0
                ? "tp-product-badge"
                : "tp-product-badge-2"
            }`}
          >
            {RelatedProduct?.metadata?.filter((item) => item.key === "label")
              .length > 0 &&
              RelatedProduct.metadata
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
        </Link>
        <div className="tp-product-action-3 tp-product-action-4 tp-product-action-blackStyle tp-product-action-brownStyle">
          <div className="tp-product-action-item-3 d-flex">
            {RelatedProduct?.defaultVariant?.quantityAvailable != 0 && (
              <>
                {isAddedToCart ? (
                  <Link
                    href="/cart"
                    className={`tp-product-action-btn-3 ${
                      isAddedToCart ? "active" : ""
                    } tp-product-add-cart-btn`}
                  >
                    <Cart />
                    <span className="tp-product-tooltip tp-product-tooltip-top">
                      View Cart
                    </span>
                  </Link>
                ) : (
                  <>
                    {cartLoader ? (
                      <button
                        type="button"
                        className={`tp-product-action-btn-3 ${
                          isAddedToCart ? "active" : ""
                        } tp-product-add-cart-btn`}
                      >
                        <ButtonLoader loader={cartLoader} />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          addToCartProductINR();
                          addToCartProductUSD();
                        }}
                        className={`tp-product-action-btn-3 ${
                          isAddedToCart ? "active" : ""
                        } tp-product-add-cart-btn`}
                      >
                        <Cart />
                        <span className="tp-product-tooltip tp-product-tooltip-top">
                          Add to Cart
                        </span>
                      </button>
                    )}
                  </>
                )}
              </>
            )}

            <button
              type="button"
              className="tp-product-action-btn-3 tp-product-quick-view-btn"
              onClick={() => openModal()}
            >
              <QuickView />
              <span className="tp-product-tooltip tp-product-tooltip-top">
                Quick View
              </span>
            </button>

            <>
              {isAddedToWishlist === true ? (
                <button
                  type="button"
                  onClick={() => {
                    if (token) {
                      router.push("/wishlist");
                    } else {
                      notifyError(
                        "Only logged-in users can add items to their wishlist or view it"
                      );
                    }
                    // router.push("/wishlist");
                  }}
                  className={`tp-product-action-btn-3 active tp-product-add-to-wishlist-btn`}
                >
                  <Wishlist />
                  <span className="tp-product-tooltip tp-product-tooltip-top">
                    View Wishlist
                  </span>
                </button>
              ) : (
                <>
                  {wishlistLoader ? (
                    <button
                      type="button"
                      className={`tp-product-action-btn-3 active tp-product-add-to-wishlist-btn`}
                    >
                      <ButtonLoader loader={wishlistLoader} />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleWishlist(product)}
                      className={`tp-product-action-btn-3 tp-product-add-to-wishlist-btn`}
                    >
                      <Wishlist />
                      <span className="tp-product-tooltip tp-product-tooltip-top">
                        Add To Wishlist
                      </span>
                    </button>
                  )}
                </>
              )}
            </>

            <button
              type="button"
              className={`tp-product-action-btn-3 ${
                isAddWishlist ? "active" : ""
              } tp-product-add-to-wishlist-btn`}
              onClick={() => {
                if (compareList?.some((prd) => prd?.id === product?.node?.id)) {
                  router.push("/compare");
                } else {
                  handleCompareProduct(product);
                }
              }}
              // onClick={() => handleCompare()}
            >
              <CompareThree />
              <span className="tp-product-tooltip tp-product-tooltip-top">
                {compareList?.some((prd) => prd?.id === product?.node?.id)
                  ? "View Compare"
                  : "Add To Compare"}
              </span>
            </button>
          </div>
        </div>
        <div className="tp-category-content-4">
          <h3 className="tp-category-title-4">
            <Link href={`/product-details/${_id}`}>{title}</Link>
          </h3>
          {/* <div className="tp-category-price-wrapper-4"> */}
          {/* <span className="tp-category-price-4">${price.toFixed(2)}</span> */}
          {/* <div className="tp-category-add-to-cart">
              {isAddedToCart ? (
                <Link
                  href="/cart"
                  className="tp-category-add-to-cart-4"
                  onClick={() => dispatch(handleModalClose())}
                >
                  <AddCart /> View Cart
                </Link>
              ) : (
                <button
                  onClick={() => handleAddProduct(product)}
                  className="tp-category-add-to-cart-4"
                >
                  <AddCart /> Add to Cart
                </button>
              )}
            </div>
          </div> */}
        </div>
      </div>
      <div className="text-center mt-5">
        <p style={{ color: "black", fontWeight: "400", margin: "0px" }}>
          {Product_name}
        </p>
        <p style={{ color: "gray", margin: "0px", fontSize: "14px" }}>
          {Category_Name}
        </p>
        {checkChannel() === "india-channel" ? (
          <>
            {RegularPrice(RelatedProduct?.defaultVariant?.costPrice, Price) && (
              <span
                style={{
                  color: "black",
                  margin: "0px",
                  fontSize: "14px",
                  textDecoration: "line-through",
                }}
                className="tp-product-price-1 pr-5 line-through "
              >
                ₹{roundOff(RelatedProduct?.defaultVariant?.costPrice)}
              </span>
            )}
            <span
              className="tp-product-price-2 new-price"
              style={{ color: "#c2882b", margin: "0px", fontSize: "14px" }}
            >
              ₹{roundOff(Price)}
            </span>
          </>
        ) : (
          <>
            {RegularPrice(RelatedProduct?.defaultVariant?.costPrice, Price) && (
              <span
                style={{
                  color: "black",
                  margin: "0px",
                  fontSize: "14px",
                  textDecoration: "line-through",
                }}
                className="tp-product-price-1 pr-5 line-through "
              >
                ${roundOff(RelatedProduct?.defaultVariant?.costPrice)}
              </span>
            )}
            <span style={{ color: "#c2882b", margin: "0px", fontSize: "14px" }}>
              ${roundOff(Price)}
            </span>
          </>
        )}
      </div>
    </>
  );
};

export default ProductSliderItem;
