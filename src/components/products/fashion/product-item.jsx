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
} from "@/redux/features/cartSlice";
import { add_to_wishlist } from "@/redux/features/wishlist-slice";
import { add_to_compare } from "@/redux/features/compareSlice";
import { capitalizeFLetter } from "@/utils/functions";
import {
  useAddToCartMutation,
  useGetCartListQuery,
} from "@/redux/features/card/cardApi";
import { notifySuccess } from "@/utils/toast";
import { useRouter } from "next/router";
import { checkWishlist, handleWishlistProduct } from "@/utils/common_function";

const ProductItem = ({ products, style_2 = false, updateData }) => {
  let product = products.node;
  const router = useRouter();

  const [isAddWishlist, setWishlist] = useState(false);

  const { _id, category, title, reviews, price, discount, tags, status } =
    product || {};

  const cart = useSelector((state) => state.cart?.cart_list);

  const compareList = useSelector((state) => state.cart.compare_list);

  const { wishlist } = useSelector((state) => state.wishlist);
  const isAddedToCart = cart?.some(
    (prd) => prd?.variant?.product?.id === product?.id
  );
  const dispatch = useDispatch();

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

  const handleAddProduct = async (data) => {
    try {
      const checkoutToken = localStorage.getItem("checkoutToken");
      if (checkoutToken) {
        const response = await addToCartMutation({
          variantId: data?.variants[0]?.id,
        });

        notifySuccess(`${data.name} added to cart successfully`);
        updateData();
      } else {
        router.push("/login");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleWishlist = async (prd) => {
    if (isAddWishlist) {
      router.push("/wishlist");
    } else {
      addWishlistProduct(prd);
    }
  };

  const addWishlistProduct = async (prd) => {
    try {
      const modify = {
        node: prd,
      };
      const addedWishlist = handleWishlistProduct(modify);
      dispatch(add_to_wishlist(addedWishlist));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // handle compare product
  const handleCompareProduct = (prd) => {
    console.log("prd: ", prd);
    const compare = localStorage.getItem("compareList");

    let arr = [];
    if (!compare) {
      arr = [];
    } else {
      arr = JSON.parse(compare);
    }
    arr.push(prd);
    console.log("compare: ", arr);
    localStorage.setItem("compareList", JSON.stringify(arr));
    dispatch(compare_list(arr));
  };
  const img = product?.thumbnail?.url;

  return (
    <div className={`tp-product-item-2 ${style_2 ? "" : "mb-40"}`}>
      <div className="tp-product-thumb-2 p-relative z-index-1 fix">
        <Link href={`/product-details/${product?.id}`}>
          <Image
            // src={product?.thumbnail.url}
            src={img}
            alt="product img"
            width={284}
            height={302}
          />
        </Link>
        <div className="tp-product-badge">
          {status === "out-of-stock" && (
            <span className="product-hot">out-stock</span>
          )}
        </div>
        {/* product action */}
        <div className="tp-product-action-2 tp-product-action-blackStyle">
          <div className="tp-product-action-item-2 d-flex flex-column">
            {isAddedToCart ? (
              <Link
                href="/cart"
                className={`tp-product-action-btn-2 ${
                  isAddedToCart ? "active" : ""
                } tp-product-add-cart-btn`}
              >
                <Cart />
                <span className="tp-product-tooltip tp-product-tooltip-right">
                  View Cart
                </span>
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => handleAddProduct(product)}
                className={`tp-product-action-btn-2 ${
                  isAddedToCart ? "active" : ""
                } tp-product-add-cart-btn`}
                disabled={status === "out-of-stock"}
              >
                <Cart />
                <span className="tp-product-tooltip tp-product-tooltip-right">
                  Add to Cart
                </span>
              </button>
            )}
            <button
              onClick={() => dispatch(handleProductModal(product))}
              className="tp-product-action-btn-2 tp-product-quick-view-btn"
            >
              <QuickView />
              <span className="tp-product-tooltip tp-product-tooltip-right">
                Quick View
              </span>
            </button>
            <button
              disabled={status === "out-of-stock"}
              onClick={() => handleWishlist(product)}
              // onClick={() => addWishlistProduct(product)}
              className={`tp-product-action-btn-2 ${
                isAddWishlist ? "active" : ""
              } tp-product-add-to-wishlist-btn`}
            >
              <Wishlist />
              <span className="tp-product-tooltip tp-product-tooltip-right">
                {isAddWishlist ? "View" : "Add"} To Wishlist
              </span>
            </button>
            <button
              disabled={status === "out-of-stock"}
              onClick={() => {
                if (compareList?.some((prd) => prd?.id === product?.id)) {
                  router.push("/compare")
                } else {
                  handleCompareProduct(product);
                }
              }}
              className="tp-product-action-btn-2 tp-product-add-to-compare-btn"
            >
              <CompareThree />
              <span className="tp-product-tooltip tp-product-tooltip-right">
                {compareList?.some((prd) => prd?.id === product?.id)
                  ? "View To Compare"
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
        <h3 className="tp-product-title-2">
          <Link href={`/product-details/${_id}`}>
            {capitalizeFLetter(product?.name)}
          </Link>
        </h3>
        <h3 className="tp-product-title-2">
          <Link href={`/product-details/${_id}`}>
            {capitalizeFLetter(product?.category?.name)}
          </Link>
        </h3>
        {/* <div className="tp-product-rating-icon tp-product-rating-icon-2">
          <Rating allowFraction size={16} initialValue={ratingVal} readonly={true} />
        </div> */}
        <div className="tp-product-price-wrapper-2">
          <span className="tp-product-price-2 new-price">
            &#8377; {product?.pricing?.priceRange?.start?.gross?.amount}
          </span>
          {/* {discount > 0 ? (

            <>
              <span className="tp-product-price-2 new-price">
                ${price.toFixed(2)}{" "}
              </span>
              <span className="tp-product-price-2 old-price">
                {"&#8377;"}{(Number(price) - (Number(price) * Number(discount)) / 100).toFixed(2)}
              </span>
            </>
          ) : (
            <span className="tp-product-price-2 new-price">
              ${price?.toFixed(2)}
            </span>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
