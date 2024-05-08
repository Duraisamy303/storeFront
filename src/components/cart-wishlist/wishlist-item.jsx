import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
// internal
import { Close, Minus, Plus } from "@/svg";
import {
  add_cart_product,
  cart_list,
  quantityDecrement,
} from "@/redux/features/cartSlice";
import {
  useAddToCartMutation,
  useDeleteWishlistMutation,
} from "@/redux/features/card/cardApi";
import { useRouter } from "next/router";
import { notifyError, notifySuccess } from "@/utils/toast";
import {
  get_wishlist_products,
  add_to_wishlist,
  remove_wishlist_product,
} from "../../redux/features/wishlist-slice";

const WishlistItem = ({ product, refetchWishlist }) => {
  const { _id, img, title, price } = product || {};
  console.log("✌️product --->", product);

  const { wishlist } = useSelector((state) => state.wishlist);

  const [addToCartMutation, { data: productsData, isError, isLoading }] =
    useAddToCartMutation();

  const router = useRouter();

  const data = product?.product;
  const cart = useSelector((state) => state.cart.cart_list);
  const isAddToCart = cart?.some(
    (item) => item?.variant?.product?.id === product?.id || data?.id
  );
  const dispatch = useDispatch();
  const [addToCart, {}] = useAddToCartMutation();
  const [removeWishlist, {}] = useDeleteWishlistMutation();
  const [channelSelect, setChannelSelect] = useState();

  useEffect(() => {
    let channel = "";
    const channels = localStorage.getItem("channel");
    if (!channels) {
      channel = "india-channel";
    } else {
      channel = channels;
    }
    setChannelSelect(channel);
  }, []);

  console.log("channelSelect", channelSelect);
  // handle add product

  // const handleAddProduct = async () => {
  //   try {
  //     const checkoutToken = localStorage.getItem("checkoutToken");
  //     console.log("checkoutToken: ", checkoutToken);
  //     const response = await addToCartMutation({
  //       checkoutToken: checkoutToken,
  //       variantId: product?.defaultVariant?.id,
  //     });
  //     console.log("response: ", response);

  //     if (response.data?.data?.checkoutLinesAdd?.errors?.length > 0) {
  //       const err = response.data?.data?.checkoutLinesAdd?.errors[0]?.message;
  //       notifyError(err);
  //       dispatch(cart_list(cart));
  //     } else {
  //       notifySuccess(`${product.node.name} added to cart successfully`);
  //       // cart_list.push
  //       dispatch(
  //         cart_list(response?.data?.data?.checkoutLinesAdd?.checkout?.lines)
  //       );
  //       updateData();
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  // handle decrement product
  const handleDecrement = (prd) => {
    dispatch(quantityDecrement(prd));
  };

  // handle remove product
  const handleRemovePrd = async () => {
    try {
      const data = await removeWishlist({
        variant: product?.variant,
      });
      refetchWishlist();
      console.log("data: ", data);
    } catch (error) {}
  };

  const addToCartProductINR = async () => {
    try {
      console.log("product: ", product);

      const checkoutTokenINR = localStorage.getItem("checkoutTokenINR");
      const response = await addToCartMutation({
        checkoutToken: checkoutTokenINR,
        variantId: product?.defaultVariant?.id,
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
        variantId: product?.defaultVariant?.id,
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
        <Link href={`/product-details/${_id}`}>
          <Image
            src={product?.thumbnail?.url || data?.media[0]?.url}
            alt="product img"
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
            <>
              ₹
              {parseFloat(data?.indiaChannelPricing)?.toFixed(2) ||
                parseFloat(data?.defaultChannelPricing)?.toFixed(2)}
            </>
          ) : (
            <>
              $
              {parseFloat(data?.indiaChannelPricing)?.toFixed(2) ||
                parseFloat(data?.defaultChannelPricing)?.toFixed(2)}
            </>
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
              // addToCartProductUSD();
            }
          }}
          type="button"
          className="tp-btn tp-btn-2 tp-btn-blue"
        >
          {isAddToCart ? "View" : "Add"} To Cart
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
