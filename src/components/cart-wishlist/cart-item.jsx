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
import { useRouter } from "next/router";
import { notifyError } from "@/utils/toast";
import { useGetCartAllListQuery } from "../../redux/features/card/cardApi";
import { checkChannel } from "../../utils/functions";

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
  quantityAvailable,
  refetch,
}) => {
  const cartData = useSelector((state) => state.cart.cart_list);
  const cart = cartData?.node || cartData;

  const [removeToCart, {}] = useRemoveToCartMutation();

  const { data: AllListChannel, refetch: AllListChannelREfresh } =
    useGetCartAllListQuery({});

  const [channel, setChannel] = useState("");

  const [quantity, setQuantity] = useState(quantityCount);

  const { _id, orderQuantity = 0 } = product || {};

  const dispatch = useDispatch();

  const router = useRouter();

  // const handleRemovePrd = () => {
  //   const checkoutToken = localStorage.getItem("checkoutToken");
  //   removeToCart({
  //     checkoutToken,
  //     lineId: product.id,
  //   }).then((data) => {
  //     const filter = cart.filter((item) => item.id != product.id);
  //     dispatch(cart_list(filter));
  //     refetch()
  //   });
  // };

  useEffect(() => {
    AllListChannelREfresh();
  }, []);

  const handleRemovePrd = async (val) => {
    try {
      const productId = product?.variant?.product?.id;
      const allListData = AllListChannel?.data?.checkout?.lines;
      const fine = allListData?.find(
        (item) => item?.variant?.product?.id === productId
      );

      const checkoutTokenINR = localStorage.getItem("checkoutTokenINR");
      const checkoutTokenUSD = localStorage.getItem("checkoutTokenUSD");
      let checkoutToken =
        localStorage.getItem("channel") === "india-channel"
          ? checkoutTokenUSD
          : checkoutTokenINR;

      await removeToCart({
        checkoutToken: checkoutTokenINR,
        lineId: product.id,
      });
      await removeToCart({ checkoutToken: checkoutToken, lineId: fine?.id });

      refetch();
      AllListChannelREfresh();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const channels = checkChannel();
    setChannel(channels);
  }, []);

  return (
    <>
      {quantityAvailable >= quantity ? (
        <tr>
          <td className="tp-cart-img">
            <div
              onClick={() =>
                router.push(`/product-details/${product?.variant?.product?.id}`)
              }
            >
              <Image src={img} alt="product img" width={70} height={100} />
            </div>
          </td>
          <td className="tp-cart-title">
            <Link href={`/product-details/${_id}`}>{title}</Link>
          </td>

          <td className="tp-cart-price">
            {channel == "india-channel" ? (
              <span>&#8377;{price?.toFixed(2)}</span>
            ) : (
              <span>${price?.toFixed(2)}</span>
            )}
          </td>
          {/* quantity */}
          {isQuantity && (
            <td className="tp-cart-quantity">
              <div className="tp-product-quantity mt-10 mb-10">
                <span
                  onClick={() => {
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
                    if (quantity >= 1 && quantity < quantityAvailable) {
                      setQuantity(quantity + 1);
                      incQuantity(quantity + 1);
                    } else {
                      notifyError(
                        "Only " + quantityAvailable + " left in stock"
                      );
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
      ) : (
        <tr style={{ opacity: 0.5 }}>
          {/* img */}
          <td className="tp-cart-img">
            <div
              onClick={() =>
                router.push(`/product-details/${product?.variant?.product?.id}`)
              }
            >
              <Image src={img} alt="product img" width={70} height={100} />
            </div>
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
            <td className="tp-cart-quantity" style={{ pointerEvents: "none" }}>
              <div className="tp-product-quantity mt-10 mb-10">
                <span
                  onClick={() => {
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
      )}
    </>
  );
};

export default CartItem;
