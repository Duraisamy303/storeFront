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
  remove_product,
} from "@/redux/features/cartSlice";
import {
  useRemoveToCartMutation,
  useUpdateCartQuantity,
  useUpdateCartQuantityMutation,
} from "@/redux/features/card/cardApi";

const CartItem = ({
  product,
  img,
  price,
  isRemove,
  title,
  incQuantity,
  decQuantity,
  quantityCount,
  isQuantity,
}) => {
  const cartData = useSelector((state) => state.cart.cart_list);
  const cart = cartData?.node || cartData;

  const [removeToCart, {}] = useRemoveToCartMutation();

  const [quantity, setQuantity] = useState(quantityCount);

  const { _id, orderQuantity = 0 } = product || {};

  const dispatch = useDispatch();

  const handleRemovePrd = () => {
    const checkoutToken = localStorage.getItem("checkoutToken");
    removeToCart({
      checkoutToken,
      lineId: product.id,
    }).then((data) => {
      const filter = cart.filter((item) => item.id != product.id);
      dispatch(cart_list(filter));
    });
  };

  return (
    <tr>
      {/* img */}
      <td className="tp-cart-img">
        <Link href={`/product-details/${_id}`}>
          <Image src={img} alt="product img" width={70} height={100} />
        </Link>
      </td>
      {/* title */}
      <td className="tp-cart-title">
        <Link href={`/product-details/${_id}`}>{title}</Link>
      </td>

      {/* <td className="tp-cart-price">
        <span>{product?.quantity}</span>
      </td> */}
      {/* price */}
      <td className="tp-cart-price">
        {/* <span>${(price * orderQuantity).toFixed(2)}</span> */}
        <span>&#8377;{price?.toFixed(2)}</span>
      </td>
      {/* quantity */}
      {isQuantity && (
        <td className="tp-cart-quantity">
          <div className="tp-product-quantity mt-10 mb-10">
            <span
              onClick={() => {
                console.log("quantity: ", quantity);

                if (quantity != 1) {
                  setQuantity(quantity - 1);
                  decQuantity(quantity - 1);
                }
              }}
              className="tp-cart-minus"
            >
              <Minus />
            </span>
            <input
              className="tp-cart-input"
              type="text"
              value={quantity}
              readOnly
            />
            <span
              onClick={() => {
                if (quantity >= 1) {
                  setQuantity(quantity + 1);
                  incQuantity(quantity + 1);
                }
              }}
              className="tp-cart-plus"
            >
              <Plus />
            </span>
          </div>
        </td>
      )}
      {/* subtotal */}
      <td className="tp-cart-quantity">
        <div className="tp-product-quantity mt-10 mb-10">
          {!isQuantity ? (
            <span>&#8377;{price?.toFixed(2)}</span>
          ) : (
            <span>${(price * quantity).toFixed(2)}</span>
          )}
        </div>
      </td>

      {/* action */}
      {!isRemove && (
        <td className="tp-cart-action">
          <button
            onClick={() => handleRemovePrd()}
            className="tp-cart-action-btn"
          >
            <Close />
            <span> Remove</span>
          </button>
        </td>
      )}
    </tr>
  );
};

export default CartItem;
