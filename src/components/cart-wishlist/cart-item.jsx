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
  remove_product,
} from "@/redux/features/cartSlice";
import { useRemoveToCartMutation } from "@/redux/features/card/cardApi";

const CartItem = ({ product, img, price, isRemove, title }) => {
  const cartData = useSelector((state) => state.cart.cart_list);
  const cart = cartData?.node || cartData;

  const [removeToCart, {}] = useRemoveToCartMutation();

  const { _id, orderQuantity = 0 } = product || {};

  const dispatch = useDispatch();

  // handle add product
  const handleAddProduct = (prd) => {
    dispatch(add_cart_product(prd));
  };
  // handle decrement product
  const handleDecrement = (prd) => {
    dispatch(quantityDecrement(prd));
  };

  // handle remove product
  // const handleRemovePrd = (prd) => {
  //   dispatch(remove_product(prd))
  // }

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
      {/* price */}
      <td className="tp-cart-price">
        {/* <span>${(price * orderQuantity).toFixed(2)}</span> */}
        <span>&#8377;{price?.toFixed(2)}</span>
      </td>
      {/* quantity */}
      <td className="tp-cart-quantity">
        <div className="tp-product-quantity mt-10 mb-10">
          <span onClick={()=> handleDecrement(product)} className="tp-cart-minus">
            <Minus />
          </span>
          <input className="tp-cart-input" type="text" value={orderQuantity} readOnly />
          <span onClick={()=> handleAddProduct(product)} className="tp-cart-plus">
            <Plus />
          </span>
        </div>
      </td>

       {/* subtotal */}
       <td className="tp-cart-quantity">
        <div className="tp-product-quantity mt-10 mb-10">
                 <span>${(price * orderQuantity).toFixed(2)}</span>

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
