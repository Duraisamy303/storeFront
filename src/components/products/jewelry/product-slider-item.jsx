import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
// internal
import { AddCart, Cart, QuickView, Wishlist } from "@/svg";
import { handleProductModal } from "@/redux/features/productModalSlice";
import { add_cart_product } from "@/redux/features/cartSlice";
import { add_to_wishlist } from "@/redux/features/wishlist-slice";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useAddToCartMutation } from "@/redux/features/card/cardApi";
import LoginForm from "@/components/forms/login-form";
import { useRouter } from "next/router";

const ProductSliderItem = ({ product,loginPopup }) => {
  const { _id, title, price, status } = product || {};

  const router=useRouter()


  const cart = useSelector((state) => state.cart.cart_list);

  const { wishlist } = useSelector((state) => state.wishlist);
  const isAddedToCart = cart?.some(
    (prd) => prd?.variant?.product?.id == product?.node?.id
  );
  const isAddedToWishlist = wishlist.some((prd) => prd.id === _id);
  const dispatch = useDispatch();

  const [addToCartMutation, { data: productsData, isError, isLoading }] =
    useAddToCartMutation();

  // handle add product
  const handleAddProduct = (prd) => {
    if (prd.status === "out-of-stock") {
      notifyError(`This product out-of-stock`);
    } else {
      const checkoutToken = localStorage.getItem("checkoutToken");
      if (checkoutToken) {
        addProduct(prd);
      } else {
        router.push('/login')
      }
      // dispatch(add_cart_product(prd));
    }
  };

  const addProduct = async (data) => {
    try {
      const checkoutToken = localStorage.getItem("checkoutToken");
      const response = await addToCartMutation({
        checkoutToken: checkoutToken,
        variantId: data?.node?.variants[0]?.id,
      });
      notifySuccess(
        `${data.node.name} added to cart successfully`
      );
      // cart_list.push
      dispatch(
        cart_list(response?.data?.data?.checkoutLinesAdd?.checkout?.lines)
      );
      updateData();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // handle wishlist product
  const handleWishlistProduct = (prd) => {
    dispatch(add_to_wishlist(prd));
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
          <div className="tp-product-action-item-3 d-flex flex-column">
            {isAddedToCart ? (
              <Link
                href="/cart"
                className={`tp-product-action-btn-3 ${
                  isAddedToCart ? "active" : ""
                } tp-product-add-cart-btn`}
              >
                <Cart />
                <span className="tp-product-tooltip">View Cart</span>
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
                <span className="tp-product-tooltip">Add to Cart</span>
              </button>
            )}
            <button
              type="button"
              className="tp-product-action-btn-3 tp-product-quick-view-btn"
              onClick={() => dispatch(handleProductModal(product))}
            >
              <QuickView />
              <span className="tp-product-tooltip">Quick View</span>
            </button>
            <button
              type="button"
              onClick={() => handleWishlistProduct(product)}
              className={`tp-product-action-btn-3 ${
                isAddedToWishlist ? "active" : ""
              } tp-product-add-to-wishlist-btn`}
            >
              <Wishlist />
              <span className="tp-product-tooltip">Add To Wishlist</span>
            </button>
          </div>
        </div>
        <div className="tp-category-content-4">
          <h3 className="tp-category-title-4">
            <Link href={`/product-details/${_id}`}>{title}</Link>
          </h3>
          <div className="tp-category-price-wrapper-4">
            {/* <span className="tp-category-price-4">${price.toFixed(2)}</span> */}
            <div className="tp-category-add-to-cart">
              {isAddedToCart ? (
                <Link href="/cart" className="tp-category-add-to-cart-4">
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
          </div>
        </div>
      </div>
      
    </>
  );
};

export default ProductSliderItem;
