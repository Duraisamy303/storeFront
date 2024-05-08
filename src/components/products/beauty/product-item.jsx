import React, { useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
// internal
import { Cart, CompareThree, QuickView, Wishlist } from "@/svg";
import { handleProductModal } from "@/redux/features/productModalSlice";
import { add_to_wishlist } from "@/redux/features/wishlist-slice";
import { useAddToCartMutation } from "@/redux/features/card/cardApi";
import { cart_count } from "@/redux/features/card/cardSlice";
import { notifySuccess } from "@/utils/toast";
import { compare_list } from "@/redux/features/cartSlice";
import { handleWishlistProduct } from "@/utils/common_function";
import { useRouter } from "next/router";
import {
  useAddWishlistMutation,
  useGetWishlistQuery,
} from "@/redux/features/productApi";

const ProductItem = ({
  product,
  prdCenter = false,
  primary_style = false,
  data,
}) => {
  const [addToCart, {}] = useAddToCartMutation();

  const { id, thumbnail, name, discount, pricing, tags, status } =
    product || {};

  const cart = useSelector((state) => state.cart?.cart_list);
console.log("related",  product)
  const [addToCartMutation, { data: productsData, isError, isLoading }] =
    useAddToCartMutation();

  const router = useRouter();

  const { cart_products } = useSelector((state) => state.cart);

  const compareList = useSelector((state) => state.cart.compare_list);

  const { wishlist } = useSelector((state) => state.wishlist);

  const isAddedToCart = cart?.some(
    (prd) => prd?.variant?.product?.id === product?.id
  );

  // const isAddedToCart = cart_products.some((prd) => prd.id === id);
  // const isAddedToWishlist = data?.some((prd) => prd.id === id);
  // const dispatch = useDispatch();

  // wishlist added and show
  const { data: wishlistData, refetch: wishlistRefetch } = useGetWishlistQuery(
    {}
  );

  console.log("wishlistData", wishlistData);
  const WishListData = wishlistData?.data?.wishlists?.edges;
  console.log("✌️WishListData --->", WishListData);

  const isAddedToWishlist = wishlistData?.data?.wishlists?.edges?.some(
    (prd) => {
      return prd?.node?.variant === product?.defaultVariant?.id;
    }
  );

  console.log("✌️isAddedToWishlist --->", isAddedToWishlist);

  const [addWishlist, {}] = useAddWishlistMutation();

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

  const addWishlistProduct = async (product) => {
    console.log("✌️relatedproduct --->", product);
    try {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("userInfo");

      if (token) {
        const users = JSON.parse(user);
        const input = {
          input: {
            user: users.user.id,
            variant: product?.defaultVariant?.id,
          },
        };

        const res = await addWishlist(input);
        notifySuccess("Product added to wishlist");
        wishlistRefetch();
      } else {
        // const addedWishlist = handleWishlistProduct(prd);
        // dispatch(add_to_wishlist(addedWishlist));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // const addWishlistProduct = async () => {
  //   try {
  //     const modify = {
  //       node: product,
  //     };
  //     const addedWishlist = handleWishlistProduct(modify);
  //     dispatch(add_to_wishlist(addedWishlist));
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  const handleCompareProduct = (prd) => {
    console.log("prd: ", prd);
    const products = product || product.node;
    const compare = localStorage.getItem("compareList");

    let arr = [];
    if (!compare) {
      arr = [];
    } else {
      arr = JSON.parse(compare);
    }
    arr.push(products);
    console.log("compare: ", arr);
    localStorage.setItem("compareList", JSON.stringify(arr));
    dispatch(compare_list(arr));
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
            src={thumbnail?.url}
            alt="product image"
            width={282}
            height={320}
          />
        </Link>

        {/* <div className="tp-product-badge">
          {status === "out-of-stock" && (
            <span className="product-hot">out-stock</span>
          )}
        </div> */}

        <div className="tp-product-badge">
          {status === "out-of-stock" ? (
            <span className="product-hot">
              SOLD
              <br /> OUT
            </span>
          ) : (
            <div style={{ display: "none" }}></div>
          )}
        </div>

        <div className="tp-product-badge-2">
          {product?.defaultVariant?.quantityAvailable == 0 && (
            <span
              className="product-hot text-center"
              style={{ padding: "15px 12px " }}
            >
              SOLD
              <br /> OUT
            </span>
          )}
        </div>

        {/* <div className="tp-product-badge-2">
          <span className="product-hot">HOT</span>
        </div> */}

        {/* product action */}
        <div className="tp-product-action-3 tp-product-action-blackStyle">
          <div className="tp-product-action-item-3 d-flex ">
            {product?.defaultVariant?.quantityAvailable != 0 && (
              <>
                {isAddedToCart ? (
                  <Link
                    href="/cart"
                    className={`tp-product-action-btn-3 ${
                      isAddedToCart ? "active" : ""
                    } tp-product-add-cart-btn text-center`}
                  >
                    <Cart />
                    <span className="tp-product-tooltip  tp-product-tooltip-top">
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
                    disabled={status === "out-of-stock"}
                  >
                    <Cart />
                    <span className="tp-product-tooltip tp-product-tooltip-top">
                      Add to Cart
                    </span>
                  </button>
                )}
              </>
            )}
            <button
              onClick={() => dispatch(handleProductModal(product))}
              className="tp-product-action-btn-3 tp-product-quick-view-btn"
            >
              <QuickView />
              <span className="tp-product-tooltip tp-product-tooltip-top">
                Quick View
              </span>
            </button>

            {isAddedToWishlist === true ? (
              <button
                disabled={status === "out-of-stock"}
                onClick={() => router.push("/wishlist")}
                className={`tp-product-action-btn-3 active tp-product-add-to-wishlist-btn`}
              >
                <Wishlist />
                <span className="tp-product-tooltip tp-product-tooltip-top">
                  View To Wishlist
                </span>
              </button>
            ) : (
              <button
                disabled={status === "out-of-stock"}
                onClick={() => addWishlistProduct(product)}
                className={`tp-product-action-btn-3 tp-product-add-to-wishlist-btn`}
              >
                <Wishlist />
                <span className="tp-product-tooltip tp-product-tooltip-top">
                  Add To Wishlist
                </span>
              </button>
            )}

            <button
              type="button"
              className={`tp-product-action-btn-3 ${
                isAddedToWishlist ? "active" : ""
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

        {/* <div className="tp-product-add-cart-btn-large-wrapper">
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
        </div> */}
      </div>
      <div className="tp-product-content-3" style={{ textAlign: "center" }}>
        {/* <div className="tp-product-tag-3"><span>{tags[1]}</span></div> */}
        <h3 className="tp-product-title-3">
          <Link href={`/product-details/${id}`}>{name}</Link>
        </h3>
        <p style={{ color: "gray", marginBottom: "0px" }}>Neckless</p>
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
