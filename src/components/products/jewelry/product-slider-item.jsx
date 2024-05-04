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
} from "@/redux/features/cartSlice";
import { add_to_wishlist } from "@/redux/features/wishlist-slice";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useAddToCartMutation } from "@/redux/features/card/cardApi";
import LoginForm from "@/components/forms/login-form";
import { useRouter } from "next/router";
import { checkWishlist, handleWishlistProduct } from "@/utils/common_function";
import {
  useAddWishlistMutation,
  useWishlistMutation,
} from "@/redux/features/productApi";

const ProductSliderItem = ({ product, loginPopup }) => {
  const { _id, title, price, status } = product || {};

  const router = useRouter();

  const [addWishlist, {}] = useAddWishlistMutation();

  const [isAddWishlist, setWishlist] = useState(false);
  const [isCartlist, setCartList] = useState(false);

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
    const compareList = localStorage.getItem("compareList");
    const arr = JSON.parse(compareList);
    dispatch(compare_list(arr));
  }, [dispatch]);

  const [addToCartMutation, { data: productsData, isError, isLoading }] =
    useAddToCartMutation();

  // handle add product
  // const handleAddProduct = () => {
  //     const checkoutToken = localStorage.getItem("checkoutToken");
  //     if (checkoutToken) {
  //       addProduct();
  //     } else {
  //       router.push("/login");
  //     }
  // };

  const handleAddProduct = async () => {
    try {
      const checkoutToken = localStorage.getItem("checkoutToken");
      const response = await addToCartMutation({
        checkoutToken: checkoutToken,
        variantId: product?.node?.variants[0]?.id,
      });
      console.log("response: ", response);
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
        updateData();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // handle wishlist product
  const handleWishlist = async (prd) => {
    if (isAddWishlist) {
      router.push("/wishlist");
    } else {
      addWishlistProduct(prd);
    }
  };

  const addWishlistProduct = async (prd) => {
    console.log("prd: ", prd);
    try {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("userInfo");

      if (token) {
        const users = JSON.parse(user);
        console.log("users: ", users);
        const input = {
          input: {
            user: users.user.id,
            variant: prd.node.id,
          },
        };
        console.log("input: ", input);

        const res = await addWishlist(input);
        console.log("res: ", res);
      } else {
        const addedWishlist = handleWishlistProduct(prd);
        dispatch(add_to_wishlist(addedWishlist));
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
    arr.push(prd.node);
    console.log("compare: ", arr);
    localStorage.setItem("compareList", JSON.stringify(arr));
    dispatch(compare_list(arr));
  };
  const img = product?.node?.thumbnail?.url;

  return (
    <>
      <div className="tp-category-item-4 p-relative z-index-1 fix text-center">
        <Link href={`/product-details/${product?.node?.id}`}>
          <div
            className="tp-category-thumb-4 include-bg"
            style={{
              backgroundImage: `url(${img})`,
              backgroundColor: "#FFFFFF",
              backgroundPosition: "0px -80px",
            }}
          ></div>
        </Link>
        <div className="tp-product-action-3 tp-product-action-4 tp-product-action-blackStyle tp-product-action-brownStyle">
          <div className="tp-product-action-item-3 d-flex">
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
              <button
                type="button"
                onClick={() => handleAddProduct(product)}
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
            <button
              type="button"
              className="tp-product-action-btn-3 tp-product-quick-view-btn"
              onClick={() => dispatch(handleProductModal(product.node))}
            >
              <QuickView />
              <span className="tp-product-tooltip tp-product-tooltip-top">
                Quick View
              </span>
            </button>
            <button
              type="button"
              onClick={() => handleWishlist(product)}
              className={`tp-product-action-btn-3 ${
                isAddWishlist ? "active" : ""
              } tp-product-add-to-wishlist-btn`}
            >
              <Wishlist />
              <span className="tp-product-tooltip tp-product-tooltip-top">
                {isAddWishlist ? "View" : "Add"} To Wishlist
              </span>
            </button>

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
                  ? "View To Compare"
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
    </>
  );
};

export default ProductSliderItem;
