import React from "react";
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
import { useAddToCartMutation } from "@/redux/features/card/cardApi";
import { useRouter } from "next/router";
import { notifyError, notifySuccess } from "@/utils/toast";
import {
  get_wishlist_products,
  add_to_wishlist,
  remove_wishlist_product,
} from "../../redux/features/wishlist-slice";

const WishlistItem = ({ product }) => {
  const { _id, img, title, price } = product || {};

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

  // handle add product

  const handleAddProduct = async () => {
    try {
      const checkoutToken = localStorage.getItem("checkoutToken");
      console.log("checkoutToken: ", checkoutToken);
      const response = await addToCartMutation({
        checkoutToken: checkoutToken,
        variantId: product?.defaultVariant?.id,
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

  // handle decrement product
  const handleDecrement = (prd) => {
    dispatch(quantityDecrement(prd));
  };

  // handle remove product
  const handleRemovePrd = () => {
    console.log("wishlist: ", wishlist);

    const filter = wishlist?.filter(
      (item) => item.id !== product?.id || data?.id
    );
    console.log("filter: ", filter);

    localStorage.setItem("wishlist", JSON.stringify(filter));
    dispatch(add_to_wishlist(filter));

    // notifyError(`${data.name} removed from wishlist`);
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
        <span>{product?.name || data?.name}</span>
      </td>
      <td className="tp-cart-price">
        <span>
          &#8377;
          {parseFloat(
            product?.pricing?.priceRange?.start?.gross?.amount
          )?.toFixed(2) || parseFloat(data?.indiaChannelPricing)?.toFixed(2)}
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
              handleAddProduct(product);
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
