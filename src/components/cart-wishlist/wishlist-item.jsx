import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import {
  useDeleteWishlistMutation,
  useGetCartAllListQuery,
  useGetCartListQuery,
} from "@/redux/features/card/cardApi";

// internal
import { Close, Minus, Plus } from "@/svg";
import {
  add_cart_product,
  cart_list,
  openCartMini,
  quantityDecrement,
} from "@/redux/features/cartSlice";
import {
  useWishlistDeleteMutation,
  useAddToCartMutation,
} from "@/redux/features/card/cardApi";
import { useRouter } from "next/router";
import { notifyError, notifySuccess } from "@/utils/toast";

import { useGetWishlistQuery } from "@/redux/features/productApi";
import { checkChannel, roundOff } from "../../utils/functions";
import { profilePic } from "@/utils/constant";
import ButtonLoader from "../loader/button-loader";
import { ClipLoader } from "react-spinners";

const WishlistItem = ({ product, refetchWishlist }) => {
  const { variant, img, title, price } = product || {};

  const dispatch = useDispatch();

  const [cartLoader, setCartLoader] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);

  const { data: wishlistData, refetch: wishlistRefetch } =
    useGetWishlistQuery();

  const { data: AllListChannel, refetch: AllListChannelREfresh } =
    useGetCartAllListQuery({});

  const { wishlist } = useSelector((state) => state.wishlist);

  const [addToCartMutation, { data: productsData, isError, isLoading }] =
    useAddToCartMutation();

  const router = useRouter();

  const data = product?.product;
  const cart = useSelector((state) => state.cart.cart_list);

  const [wishlistDelete] = useDeleteWishlistMutation();
  const [channelSelect, setChannelSelect] = useState();

  const { data: datacartList, refetch: cartRefetch } = useGetCartListQuery();

  const isAddToCart = datacartList?.data?.checkout?.lines?.some(
    (item) => item?.variant?.product?.id === product?.variant || data?.id
  );

  useEffect(() => {
    const channels = checkChannel();
    setChannelSelect(channels);
  }, []);

  // handle decrement product
  const handleDecrement = (prd) => {
    dispatch(quantityDecrement(prd));
  };

  // handle remove product
  const handleRemovePrd = async () => {
    setDeleteLoader(true);
    try {
      setDeleteLoader(true);
      await wishlistDelete({
        variant: product?.variant,
      });
      refetchWishlist();
      setDeleteLoader(false);
    } catch (error) {}
  };

  const addToCartProductINR = async () => {
    setCartLoader(true);
    try {
      setCartLoader(true);
      const checkoutTokenINR = localStorage.getItem("checkoutTokenINR");
      const response = await addToCartMutation({
        checkoutToken: checkoutTokenINR,
        variantId: product?.product?.variants[0]?.id,
      });

      if (response.data?.data?.checkoutLinesAdd?.errors?.length > 0) {
        const err = response.data?.data?.checkoutLinesAdd?.errors[0]?.message;
        // notifyError(err);
      } else {
        notifySuccess(`Product added to cart successfully`);
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
        variantId: product?.product?.variants[0]?.id,
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

  const isHiddenCategory = data?.category?.some(
    (item) => item.name === "Hidden"
  );
  console.log("✌️isHiddenCategory --->", isHiddenCategory);

  const isImage = (url) => {
    return /\.(jpg|webp|jpeg|png|gif)$/i.test(url);
  };

  return (
    <>
      <tr
        className={`${
          isHiddenCategory ? "wishlistOpacity0" : "wishlistOpacity1"
        }`}
      >
        <td className="tp-cart-img">
          <Link href={`/product-details/${variant}`}>
            {/* <Image
            src={
              profilePic(product?.product?.media[0]?.url) ||
              profilePic(data?.media[0]?.url)
            }
            width={70}
            height={100}
          /> */}
            {isImage(profilePic(product?.product?.media[0]?.url)) ||
            isImage(profilePic(data?.media[0]?.url)) ? (
              <img
                src={
                  profilePic(product?.product?.media[0]?.url) ||
                  profilePic(data?.media[0]?.url)
                }
                width={70}
                height={100}
              />
            ) : (
              <video
                src={product?.product?.media[0]?.url || data?.media[0]?.url}
                width={70}
                muted
                loop
                height={100}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            )}
          </Link>
        </td>
        <td className="tp-cart-title">
          <Link href={`/product-details/${product?.product?.id}`}>{title}</Link>
        </td>
        <td>
          <span>{product?.product?.name || data?.name}</span>
        </td>
        <td className="tp-cart-price">
          <span>
            {channelSelect == "india-channel" ? (
              <>₹{roundOff(data?.indiaChannelPricing)}</>
            ) : (
              <>${roundOff(data?.defaultChannelPricing)}</>
            )}
          </span>
        </td>

        {/* <td className="tp-cart-quantity">
        <div className="tp-product-quantity mt-10 mb-10">
          <span
            onClick={() => handleDecrement(product)}
            className="tp-cart-minus"
          >
            <Minus />
          </span>
          <input
            className="tp-cart-input"
            type="text"
            value={isAddToCart ? isAddToCart?.orderQuantity : 0}
            readOnly
          />
          <span
            onClick={() => handleAddProduct(product)}
            className="tp-cart-plus"
          >
            <Plus />
          </span>
        </div>
      </td> */}

        <td
          className="tp-cart-add-to-cart"
          style={{
            pointerEvents: isHiddenCategory ? "none" : "auto",
          }}
        >
          <button
            onClick={() => {
              if (isAddToCart) {
                router.push("/cart");
              } else {
                addToCartProductINR();
                addToCartProductUSD();
              }
            }}
            type="button"
            className="tp-btn tp-btn-2 tp-btn-blue"
          >
            {isAddToCart ? (
              "View Cart"
            ) : (
              <>
                {cartLoader ? (
                  <ButtonLoader loader={cartLoader} />
                ) : (
                  "Add To Cart"
                )}
              </>
            )}
          </button>
        </td>

        <td className="tp-cart-action">
          <button
            onClick={() => handleRemovePrd()}
            className="tp-cart-action-btn"
          >
            {deleteLoader ? <ClipLoader color="red" size={13} /> : <Close />}

            <span> Remove</span>
          </button>
        </td>
      </tr>
    </>
  );
};

export default WishlistItem;
