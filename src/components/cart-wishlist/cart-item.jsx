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
import {
  addCommasToNumber,
  checkChannel,
  roundOff,
} from "../../utils/functions";
import { profilePic } from "@/utils/constant";
import { ClipLoader } from "react-spinners";

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

  const [removeToCart, { isLoading: removeLoading }] =
    useRemoveToCartMutation();

  const { data: AllListChannel, refetch: AllListChannelREfresh } =
    useGetCartAllListQuery({});

  const [channel, setChannel] = useState("");

  const [quantity, setQuantity] = useState(quantityCount);

  const { _id, orderQuantity = 0 } = product || {};

  const dispatch = useDispatch();

  const router = useRouter();
  const [productRemoveLoader, setProductRemoveLoader] = useState(false);

  const handleRemovePrd = async (val) => {
    setProductRemoveLoader(true);
    try {
      const newTokenData = await AllListChannelREfresh();
      const productId = product?.variant?.product?.id;
      const allListData = newTokenData?.data?.data?.checkout?.lines;
      const find = allListData?.find(
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
      await removeToCart({ checkoutToken: checkoutToken, lineId: find?.id });

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

  const isImage = (url) => {
    return /\.(jpg|webp|jpeg|png|gif)$/i.test(url);
  };

  return (
    <>
      {quantityAvailable >= quantity ? (
        <tr>
          <td className="tp-cart-img">
            <div
              onClick={() =>
                router.push(`/product-details/${product?.variant?.product?.slug}`)
              }
            >
              {/* <Image
                src={profilePic(img)}
                alt="product img"
                width={70}
                height={100}
              /> */}

              {isImage(profilePic(img)) ? (
                <img
                  src={profilePic(img)}
                  alt="product img"
                  width={70}
                  height={100}
                />
              ) : (
                <video
                  src={img}
                  alt="product video"
                  width={70}
                  height={100}
                  style={{ height: "100%" }}
                  muted
                  loop
                />
              )}
            </div>
          </td>
          <td className="tp-cart-title">
            <Link href={`/product-details/${product?.variant?.product?.slug}`}>
              {title}
            </Link>
          </td>

          <td className="tp-cart-price">
            {channel == "india-channel" ? (
              <span>&#8377;{addCommasToNumber(price)}</span>
            ) : (
              <span>${addCommasToNumber(price)}</span>
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
              {channel == "india-channel" ? (
                <>
                  {!isQuantity ? (
                    <span style={{ color: "gray" }}>
                      &#8377;{addCommasToNumber(price)}
                    </span>
                  ) : (
                    <span style={{ color: "gray" }}>
                      &#8377;{addCommasToNumber(price * quantity)}
                    </span>
                  )}
                </>
              ) : (
                <>
                  {!isQuantity ? (
                    <span style={{ color: "gray" }}>${addCommasToNumber(price)}</span>
                  ) : (
                    <span style={{ color: "gray" }}>
                      ${addCommasToNumber(price * quantity)}
                    </span>
                  )}
                </>
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
                {removeLoading ? (
                  <ClipLoader color="red" size={13} />
                ) : (
                  <Close />
                )}

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
                router.push(`/product-details/${product?.variant?.product?.slug}`)
              }
            >
              <Image
                src={profilePic(img)}
                alt="product img"
                width={70}
                height={100}
              />
            </div>
          </td>
          {/* title */}
          <td className="tp-cart-title">
            <Link href={`/product-details/${product?.variant?.product?.slug}`}>{title}</Link>
          </td>

          {/* <td className="tp-cart-price">
        <span>{product?.quantity}</span>
      </td> */}
          {/* price */}
          <td className="tp-cart-price">
            <span>&#8377;{addCommasToNumber(price * orderQuantity)}</span>
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
                <span>&#8377;{addCommasToNumber(price)}</span>
              ) : (
                <span>${addCommasToNumber(price * orderQuantity)}</span>
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
