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
import { remove_wishlist_product } from "@/redux/features/wishlist-slice";
import { useAddToCartMutation } from "@/redux/features/card/cardApi";
import { useRouter } from "next/router";
import { notifyError, notifySuccess } from "@/utils/toast";


const WishlistItem = ({ product }) => {
  const { _id, img, title, price } = product || {};
  const { wishlist } = useSelector((state) => state.wishlist);

  const [addToCartMutation, { data: productsData, isError, isLoading }] =
    useAddToCartMutation();

  const router = useRouter();

  const data = product?.product;
  const cart = useSelector((state) => state.cart.cart_list);
  const isAddToCart = cart?.some(
    (item) => item?.variant?.product?.id === data?.id
  );
  const dispatch = useDispatch();
  const [addToCart, {}] = useAddToCartMutation();

  // handle add product

  const handleAddProduct = async (data) => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        const checkoutToken = localStorage.getItem("checkoutToken");
        console.log("data: ", data);

        if (checkoutToken) {
          const response = await addToCart({
            variantId: data?.product.defaultVariant?.id,
          });
          console.log("response: ", response);

          // notifySuccess(`${data.name} added to cart successfully`);
          // updateData();
        } else {
          router.push("/login");
        }
      } else {
        let cartList = localStorage.getItem("cartList");

        if (!cartList) {
          cartList = [];
        } else {
          cartList = JSON.parse(cartList);
        }
        cartList.push(data);
        localStorage.setItem("cartList", JSON.stringify(cartList));
        // dispatch(add_cart_product(cartList));
        dispatch(cart_list(cartList));
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
    console.log("data: ", data);
    // const filter = wishlist?.filter((item) => item.id !== data.id);
   
    // localStorage.setItem("whishlist", JSON.stringify(filter));
    // dispatch(remove_wishlist_product(filter));
    // notifyError(`${data.name} removed from wishlist`);
  };
  return (
    <tr>
      <td className="tp-cart-img">
        <Link href={`/product-details/${_id}`}>
          <Image
            src={data?.media[0]?.url}
            alt="product img"
            width={70}
            height={100}
          />
        </Link>
      </td>
      <td className="tp-cart-title">
        <Link href={`/product-details/${_id}`}>{title}</Link>
      </td>
      <td>
        <span>{data?.name}</span>
      </td>
      <td className="tp-cart-price">
        <span>&#8377;{parseFloat(data.indiaChannelPricing)?.toFixed(2)}</span>
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
