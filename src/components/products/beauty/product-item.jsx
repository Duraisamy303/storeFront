import React, { useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
// internal
import { Cart, QuickView, Wishlist } from "@/svg";
import { handleProductModal } from "@/redux/features/productModalSlice";
import { add_to_wishlist } from "@/redux/features/wishlist-slice";
import { useAddToCartMutation } from "@/redux/features/card/cardApi";
import { cart_count } from "@/redux/features/card/cardSlice";
import { notifySuccess } from "@/utils/toast";

const ProductItem = ({ product, prdCenter = false, primary_style = false }) => {
  const [addToCart, {}] = useAddToCartMutation();

  const { id, thumbnail, name, discount, pricing, tags, status } =
    product || {};

  const cart = useSelector((state) => state.cart?.cart_list);

  const [addToCartMutation, { data: productsData, isError, isLoading }] =
    useAddToCartMutation();

  const { cart_products } = useSelector((state) => state.cart);

  const { wishlist } = useSelector((state) => state.wishlist);

  const isAddedToCart = cart?.some(
    (prd) => prd?.variant?.product?.id === product?.id
  );
  // const isAddedToCart = cart_products.some((prd) => prd.id === id);
  const isAddedToWishlist = wishlist.some((prd) => prd.id === id);
  const dispatch = useDispatch();


  const handleAddProduct = async (data) => {
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


  useEffect(() => {
    getToken();
  }, []);

  const getToken = () => {
    const token = localStorage.getItem("checkoutToken");
  };

  // handle wishlist product
  const handleWishlistProduct = (prd) => {
    dispatch(add_to_wishlist(prd));
  };

  return (
    <div
      className={`tp-product-item-3 mb-50 ${
        primary_style ? "tp-product-style-primary" : ""
      } ${prdCenter ? "text-center" : ""}`}
    >
      <div className="tp-product-thumb-3 mb-15 fix p-relative z-index-1">
        <Link href={`/product-details/${id}`}>
          <Image
            src={thumbnail.url}
            alt="product image"
            width={282}
            height={320}
          />
        </Link>

        <div className="tp-product-badge">
          {status === "out-of-stock" && (
            <span className="product-hot">out-stock</span>
          )}
        </div>

        {/* product action */}
        <div className="tp-product-action-3 tp-product-action-blackStyle">
          <div className="tp-product-action-item-3 d-flex flex-column">
            {isAddedToCart ? (
              <Link
                href="/cart"
                className={`tp-product-action-btn-3 ${
                  isAddedToCart ? "active" : ""
                } tp-product-add-cart-btn text-center`}
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
                disabled={status === "out-of-stock"}
              >
                <Cart />
                <span className="tp-product-tooltip">Add to Cart</span>
              </button>
            )}
            <button
              onClick={() => dispatch(handleProductModal(product))}
              className="tp-product-action-btn-3 tp-product-quick-view-btn"
            >
              <QuickView />
              <span className="tp-product-tooltip">Quick View</span>
            </button>

            <button
              disabled={status === "out-of-stock"}
              onClick={() => handleWishlistProduct(product)}
              className={`tp-product-action-btn-3 
            ${
              isAddedToWishlist ? "active" : ""
            } tp-product-add-to-wishlist-btn`}
            >
              <Wishlist />
              <span className="tp-product-tooltip">Add To Wishlist</span>
            </button>
          </div>
        </div>

        <div className="tp-product-add-cart-btn-large-wrapper">
          {isAddedToCart ? (
            <Link
              href="/cart"
              className="tp-product-add-cart-btn-large text-center"
            >
              View To Cart
            </Link>
          ) : (
            <button
              onClick={() => handleAddProduct(product)}
              type="button"
              className="tp-product-add-cart-btn-large"
              disabled={status === "out-of-stock"}
            >
              Add To Cart
            </button>
          )}
        </div>
      </div>
      <div className="tp-product-content-3">
        {/* <div className="tp-product-tag-3"><span>{tags[1]}</span></div> */}
        <h3 className="tp-product-title-3">
          <Link href={`/product-details/${id}`}>{name}</Link>
        </h3>
        <div className="tp-product-price-wrapper-3">
          <span className="tp-product-price-3">
            ${pricing?.priceRange?.start?.gross?.amount.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
