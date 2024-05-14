import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import {
  useDeleteWishlistMutation,
  useGetCartListQuery,
} from "@/redux/features/card/cardApi";

// internal
import { Close, Minus, Plus } from "@/svg";
import {
  add_cart_product,
  cart_list,
  quantityDecrement,
} from "@/redux/features/cartSlice";
import {
  useWishlistDeleteMutation,
  useAddToCartMutation,
} from "@/redux/features/card/cardApi";
import { useRouter } from "next/router";
import { notifyError, notifySuccess } from "@/utils/toast";

import { useGetWishlistQuery } from "@/redux/features/productApi";
import { checkChannel } from "../../utils/functions";
import { profilePic } from "@/utils/constant";

const WishlistItem = ({ product, refetchWishlist }) => {
  const { variant, img, title, price } = product || {};

  const dispatch = useDispatch();

  const { data: wishlistData, refetch: wishlistRefetch } =
    useGetWishlistQuery();

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
    try {
      await wishlistDelete({
        variant: product?.variant,
      });
      refetchWishlist();
    } catch (error) {}
  };

  const addToCartProductINR = async () => {
    try {
      const checkoutTokenINR = localStorage.getItem("checkoutTokenINR");
      const response = await addToCartMutation({
        checkoutToken: checkoutTokenINR,
        variantId: product?.product?.variants[0]?.id,
      });

      if (response.data?.data?.checkoutLinesAdd?.errors?.length > 0) {
        const err = response.data?.data?.checkoutLinesAdd?.errors[0]?.message;
        notifyError(err);
      } else {
        notifySuccess(`Product added to cart successfully`);
        cartRefetch();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const addToCartProductUSD = async () => {
    try {
      const checkoutTokenUSD = localStorage.getItem("checkoutTokenUSD");
      const response = await addToCartMutation({
        checkoutToken: checkoutTokenUSD,
        variantId: product?.product?.variants[0]?.id,
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

  return (
    <tr>
      <td className="tp-cart-img">
        <Link href={`/product-details/${variant}`}>
          <Image
            src={
              profilePic(product?.product?.media[0]?.url) ||
              profilePic(data?.media[0]?.url)
            }
            width={70}
            height={100}
          />
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
            <>₹{parseFloat(data?.indiaChannelPricing)?.toFixed(2)}</>
          ) : (
            <>${parseFloat(data?.defaultChannelPricing)?.toFixed(2)}</>
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

      <td className="tp-cart-add-to-cart">
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
          {isAddToCart ? "View Cart" : "Add To Cart"}
        </button>
      </td>

      <td className="tp-cart-action">
        <button
          onClick={() => handleRemovePrd()}
          className="tp-cart-action-btn"
        >
          <Close />
          <span> Remove</span>
        </button>
      </td>
    </tr>
  );
};

export default WishlistItem;
