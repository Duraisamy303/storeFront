import React, { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
// internal
import { AskQuestion, CompareTwo, WishlistTwo } from "@/svg";
import DetailsBottomInfo from "./details-bottom-info";
import ProductDetailsCountdown from "./product-details-countdown";
import ProductQuantity from "./product-quantity";
import { add_cart_product, compare_list } from "@/redux/features/cartSlice";
import { add_to_wishlist } from "@/redux/features/wishlist-slice";
import { add_to_compare } from "@/redux/features/compareSlice";
import { handleModalClose } from "@/redux/features/productModalSlice";
import { capitalizeFLetter } from "@/utils/functions";
import {
  useAddToCartMutation,
  useGetCartListQuery,
} from "@/redux/features/card/cardApi";
import { useRouter } from "next/router";
import { notifySuccess } from "@/utils/toast";
import { checkWishlist, handleWishlistProduct } from "@/utils/common_function";
import ProductDetailsBreadcrumb from "../breadcrumb/product-details-breadcrumb";

const DetailsWrapper = ({
  productItem,
  handleImageActive,
  activeImg,
  detailsBottom = false,
}) => {
  const {
    sku,
    img,
    title,
    imageURLs,
    category,
    description,
    discount,
    price,
    status,
    reviews,
    tags,
    offerDate,
  } = productItem || {};
  const [ratingVal, setRatingVal] = useState(0);
  const [textMore, setTextMore] = useState(false);
  const [visibility, setVisibility] = useState({
    description: false,
    additionalInfo: false,
    shipping: false,
    maintenance: false,
  });

  const toggleVisibility = (section) => {
    setVisibility((prevState) => {
      // If the clicked section is currently active, toggle it off
      if (prevState[section]) {
        return {
          ...prevState,
          [section]: false,
        };
      }

      // If the clicked section is not active, toggle it on and toggle off all other sections
      const updatedVisibility = {};
      for (const key in prevState) {
        updatedVisibility[key] = key === section;
      }
      return updatedVisibility;
    });
  };

  const { data: tokens } = useGetCartListQuery();

  const { wishlist } = useSelector((state) => state.wishlist);

  const compareList = useSelector((state) => state.cart.compare_list);

  useEffect(() => {
    const compareList = localStorage.getItem("compareList");
    const arr = JSON.parse(compareList);
    dispatch(compare_list(arr));
  }, []);

  const [isAddWishlist, setWishlist] = useState(false);

  const cart = useSelector((state) => state.cart?.cart_list);
  let isAddedToCart = false;
  if (cart?.length > 0) {
    isAddedToCart = cart.some(
      (prd) => prd.variant.product.id === productItem.id
    );
  }

  let textValue = "";
  // Parse the JSON string
  if (productItem?.description || productItem?.node?.description) {
    const jsonObject = JSON.parse(
      productItem?.description || productItem?.node?.description
    );
    // Extract the text value
    textValue = jsonObject?.blocks[0]?.data?.text;
  }

  // Convert the text value to JSON format

  const dispatch = useDispatch();

  const router = useRouter();

  const [addToCartMutation, { data: productsData, isError, isLoading }] =
    useAddToCartMutation();

  useEffect(() => {
    if (reviews && reviews.length > 0) {
      const rating =
        reviews.reduce((acc, review) => acc + review.rating, 0) /
        reviews.length;
      setRatingVal(rating);
    } else {
      setRatingVal(0);
    }
  }, [reviews]);

  useEffect(() => {
    const whislist = checkWishlist(wishlist, productItem.id);
    setWishlist(whislist);
  }, [wishlist]);

  const handleWishlist = async (prd) => {
    if (isAddWishlist) {
      router.push("/wishlist");
    } else {
      addWishlistProduct(prd);
    }
  };

  const addWishlistProduct = async (prd) => {
    try {
      const modify = {
        node: prd,
      };
      const addedWishlist = handleWishlistProduct(modify);
      dispatch(add_to_wishlist(addedWishlist));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // handle add product

  const handleAddProduct = async (data) => {
    try {
      const checkoutToken = localStorage.getItem("checkoutToken");
      if (checkoutToken) {
        const response = await addToCartMutation({
          variantId: data?.variants[0]?.id,
        });
        console.log(
          "response: ",
          response?.data?.data?.checkoutLinesAdd?.checkout?.lines
        );

        notifySuccess(`${data.name} added to cart successfully`);
        updateData();
      } else {
        router.push("/login");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // const handleAddProduct = (prd) => {
  //   console.log("prd: ", prd);
  //   // dispatch(add_cart_product(prd));if (prd.`1
  // };

  // handle wishlist product

  // handle compare product
  const handleCompareProduct = (prd) => {
    const compare = localStorage.getItem("compareList");

    let arr = [];
    if (!compare) {
      arr = [];
    } else {
      arr = JSON.parse(compare);
    }
    arr.push(prd);
    console.log("compare: ", arr);
    localStorage.setItem("compareList", JSON.stringify(arr));
    dispatch(compare_list(arr));
  };

  return (
    <div className="tp-product-details-wrapper">
      <ProductDetailsBreadcrumb
        category={productItem?.category?.name}
        title={productItem?.name}
      />
      {/* <div className="tp-product-details-category">
        <span>
          {capitalizeFLetter(
            productItem?.category?.name || productItem?.node?.category?.name
          )}
        </span>
      </div> */}
      <h3 className="tp-product-details-title">
        {capitalizeFLetter(productItem?.name || productItem?.node?.name)}
      </h3>
      {/* price */}
      <div className="tp-product-details-price-wrapper mb-20">
        {discount > 0 ? (
          <>
            <span className="tp-product-details-price old-price">${price}</span>
            <span className="tp-product-details-price new-price">
              &#8377;{" "}
              {productItem?.pricing?.priceRange?.start?.gross?.amount ||
                productItem?.node?.pricing?.priceRange?.start?.gross?.amount}
              {/* {" "}${(Number(price) - (Number(price) * Number(discount)) / 100).toFixed(2)} */}
            </span>
          </>
        ) : (
          <span className="tp-product-details-price new-price">
            &#8377;{" "}
            {productItem?.pricing?.priceRange?.start?.gross?.amount ||
              productItem?.node?.pricing?.priceRange?.start?.gross?.amount}
            {/* &#8377; {productItem?.pricing?.priceRange?.start?.gross?.amount} */}
          </span>

          // <span className="tp-product-details-price new-price">${price?.toFixed(2)}</span>
        )}
      </div>

      {/* inventory details */}
      {/* <div className="tp-product-details-inventory d-flex align-items-center mb-10">
        <div className="tp-product-details-stock mb-10">
          <span>{status}</span>
        </div>
        <div className="tp-product-details-rating-wrapper d-flex align-items-center mb-10">
          <div className="tp-product-details-rating">
            <Rating allowFraction size={16} initialValue={ratingVal} readonly={true} />
          </div>
          <div className="tp-product-details-reviews">
            <span>({reviews && reviews.length > 0 ? reviews.length : 0} Review)</span>
          </div>
        </div>
      </div> */}
      <p style={{ color: "black" }}>
        {textValue}
        {/* {textMore
          ? description || productItem?.node?.description
          : `${
              description?.substring(0, 100) ||
              productItem?.node?.description?.substring(0, 100)
            }...`} */}
        {/* <span onClick={() => setTextMore(!textMore)}>
          {textMore ? "See less" : "See more"}
        </span> */}
      </p>

      {/* variations */}
      {imageURLs?.some((item) => item?.color && item?.color?.name) && (
        <div className="tp-product-details-variation">
          <div className="tp-product-details-variation-item">
            <h4 className="tp-product-details-variation-title">Color :</h4>
            <div className="tp-product-details-variation-list">
              {imageURLs?.map((item, i) => (
                <button
                  onClick={() => handleImageActive(item)}
                  key={i}
                  type="button"
                  className={`color tp-color-variation-btn ${
                    item.img === activeImg ? "active" : ""
                  }`}
                >
                  <span
                    data-bg-color={`${item?.color?.clrCode}`}
                    style={{ backgroundColor: `${item.color.clrCode}` }}
                  ></span>
                  {item?.color && item?.color.name && (
                    <span className="tp-color-variation-tootltip">
                      {item.color.name}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <p style={{ color: "gray" }}>
        Note : The stones we use are either natural or glass stones, the
        imperfections found on them are natural and inevitable. These
        imperfections add characteristics to the stones making it distinct and
        unique.
      </p>

      <p style={{ color: "black" }}>1 in stock</p>

      <div className="tp-product-details-action-item-wrapper d-sm-flex align-items-center">
        <div className="tp-product-details-add-to-cart mb-15">
          <button
            onClick={() => {
              if (isAddedToCart) {
                dispatch(handleModalClose());
                router.push("/cart");
              } else {
                handleAddProduct(productItem);
              }
            }}
            disabled={status === "out-of-stock"}
            className="tp-btn tp-btn-border"
          >
            {isAddedToCart ? "View Cart" : "Add To Cart"}
          </button>
        </div>
      </div>

      {/* product-details-action-sm start */}
      <div
        className="tp-product-details-action-sm"
        style={{
          paddingTop: "20px",
        }}
      >
        <button
          disabled={status === "out-of-stock"}
          onClick={() => {
            if (compareList?.some((prd) => prd?.id === productItem?.id)) {
              dispatch(handleModalClose());
              router.push("/compare");
            } else {
              handleCompareProduct(productItem);
            }
          }}
          // onClick={() => handleCompareProduct(productItem)}
          type="button"
          className="tp-product-details-action-sm-btn"
        >
          <CompareTwo />
          {compareList?.some((prd) => prd?.id === productItem?.id)
            ? " View Compare"
            : " Add  Compare"}
        </button>
        <button
          disabled={status === "out-of-stock"}
          onClick={() => handleWishlist(productItem)}
          // onClick={() => handleWishlistProduct(productItem)}
          type="button"
          className="tp-product-details-action-sm-btn"
        >
          <WishlistTwo />
          {isAddWishlist ? " View" : " Add"} To Wishlist
        </button>
        {/* <button type="button" className="tp-product-details-action-sm-btn">
          <AskQuestion />
          Ask a question
        </button> */}
      </div>
      {/* product-details-action-sm end */}

      {/* dESCRIPTION */}

      <div
        style={{
          borderBottom: "1px solid #EAEBED",
          paddingBottom: "25px",
          marginBottom: "25px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            cursor: "pointer",
          }}
          onClick={() => toggleVisibility("description")}
        >
          <div
            className={`${visibility.description ? "theme-color" : ""}`}
            style={{ fontSize: "16px" }}
          >
            DESCRIPTION
          </div>{" "}
          <div>{visibility.description ? "▲" : "▼"}</div>{" "}
          {/* Toggle arrow up/down based on content visibility */}
        </div>
        {visibility.description && (
          <ul style={{ paddingTop: "20px" }}>
            <li
              style={{
                fontSize: "16px",
                paddingBottom: "10px",
              }}
            >
              Pure silver jewellery has a tendency to oxidise especially when
              it’s worn regularly.
            </li>
            <li style={{ fontSize: "16px", paddingBottom: "10px" }}>
              To maintain the lustre of your jewellery, place it in re-sealable
              poly bags/ air-tight container to prevent it from oxidation.
            </li>
            <li style={{ fontSize: "16px" }}>
              A gentle wipe before storing is recommended. Avoid direct contact
              with moisture/perfumes.
            </li>
          </ul>
        )}
      </div>

      <div
        style={{
          borderBottom: "1px solid #EAEBED",
          paddingBottom: "25px",
          marginBottom: "25px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            cursor: "pointer",
          }}
          onClick={() => toggleVisibility("additionalInfo")}
        >
          <div
            className={`${visibility.additionalInfo ? "theme-color" : ""}`}
            style={{ fontSize: "16px" }}
          >
            ADDITIONAL INFORMATION
          </div>{" "}
          <div>{visibility.additionalInfo ? "▲" : "▼"}</div>{" "}
          {/* Toggle arrow up/down based on content visibility */}
        </div>
        {visibility.additionalInfo && (
          <ul
            style={{
              display: "flex",
              justifyContent: "space-between",
              listStyleType: "none",
              paddingTop: "20px",
            }}
          >
            <li style={{ fontSize: "16px", paddingBottom: "10px" }}>
              Item type
            </li>
            <li style={{ fontSize: "16px", paddingBottom: "10px" }}>
              Only Necklace, Necklace with Earrings
            </li>
          </ul>
        )}
      </div>

      <div
        style={{
          borderBottom: "1px solid #EAEBED",
          paddingBottom: "25px",
          marginBottom: "25px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            cursor: "pointer", // Add cursor pointer to indicate it's clickable
          }}
          onClick={() => toggleVisibility("shipping")}
        >
          <div
            className={`${visibility.shipping ? "theme-color" : ""}`}
            style={{ fontSize: "16px" }}
          >
            SHIPPING & DELIVERY
          </div>{" "}
          <div>{visibility.shipping ? "▲" : "▼"}</div>{" "}
          {/* Toggle arrow up/down based on content visibility */}
        </div>
        {visibility.shipping && (
          <div style={{ paddingTop: "10px" }}>
            <h5 style={{ fontWeight: "400" }}>MAECENAS IACULIS</h5>
            <p style={{ color: "#55585b" }}>
              Vestibulum curae torquent diam diam commodo parturient penatibus
              nunc dui adipiscing convallis bulum parturient suspendisse
              parturient a.Parturient in parturient scelerisque nibh lectus quam
              a natoque adipiscing a vestibulum hendrerit et pharetra fames nunc
              natoque dui.
            </p>
            <h5 style={{ fontWeight: "400" }}>ADIPISCING CONVALLIS BULUM</h5>
            <p style={{ color: "#55585b" }}>
              {" "}
              &#129174; Vestibulum penatibus nunc dui adipiscing convallis bulum
              parturient suspendisse.
            </p>

            <p style={{ color: "#55585b" }}>
              {" "}
              &#129174; Abitur parturient praesent lectus quam a natoque
              adipiscing a vestibulum hendre.
            </p>
            <p style={{ color: "#55585b" }}>
              {" "}
              &#129174; Diam parturient dictumst parturient scelerisque nibh
              lectus.
            </p>

            <p style={{ color: "#55585b" }}>
              Scelerisque adipiscing bibendum sem vestibulum et in a a a purus
              lectus faucibus lobortis tincidunt purus lectus nisl class
              eros.Condimentum a et ullamcorper dictumst mus et tristique
              elementum nam inceptos hac parturient scelerisque vestibulum amet
              elit ut volutpat.
            </p>
          </div>
        )}
      </div>

      <div
        style={{
          borderBottom: "1px solid #EAEBED",
          paddingBottom: "25px",
          marginBottom: "25px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            cursor: "pointer", // Add cursor pointer to indicate it's clickable
          }}
          onClick={() => toggleVisibility("maintenance")}
        >
          <div
            className={`${visibility.maintenance ? "theme-color" : ""}`}
            style={{ fontSize: "16px" }}
          >
            MAINTENENCE TIPS
          </div>{" "}
          <div>{visibility.maintenance ? "▲" : "▼"}</div>{" "}
          {/* Toggle arrow up/down based on content visibility */}
        </div>
        {visibility.maintenance && (
          <div style={{ paddingTop: "20px" }}>
            <h5 style={{ fontWeight: "400" }}>MAECENAS IACULIS</h5>
            <p style={{ color: "#55585b" }}>
              Vestibulum curae torquent diam diam commodo parturient penatibus
              nunc dui adipiscing convallis bulum parturient suspendisse
              parturient a.Parturient in parturient scelerisque nibh lectus quam
              a natoque adipiscing a vestibulum hendrerit et pharetra fames nunc
              natoque dui.
            </p>
            <h5 style={{ fontWeight: "400" }}>ADIPISCING CONVALLIS BULUM</h5>
            <p style={{ color: "#55585b" }}>
              {" "}
              &#129174; Vestibulum penatibus nunc dui adipiscing convallis bulum
              parturient suspendisse.
            </p>

            <p style={{ color: "#55585b" }}>
              {" "}
              &#129174; Abitur parturient praesent lectus quam a natoque
              adipiscing a vestibulum hendre.
            </p>
            <p style={{ color: "#55585b" }}>
              {" "}
              &#129174; Diam parturient dictumst parturient scelerisque nibh
              lectus.
            </p>

            <p style={{ color: "#55585b" }}>
              Scelerisque adipiscing bibendum sem vestibulum et in a a a purus
              lectus faucibus lobortis tincidunt purus lectus nisl class
              eros.Condimentum a et ullamcorper dictumst mus et tristique
              elementum nam inceptos hac parturient scelerisque vestibulum amet
              elit ut volutpat.
            </p>
          </div>
        )}
      </div>

      <div>
        <p style={{ color: "#55585b" }}>
          <b>SKU:</b> PBS_NP_33
        </p>
        <p style={{ color: "#55585b" }}>
          <b>Categories:</b> Necklaces, New Arrivals
        </p>
      </div>

      {/* if ProductDetailsCountdown true start */}
      {offerDate?.endDate && (
        <ProductDetailsCountdown offerExpiryTime={offerDate?.endDate} />
      )}
      {/* if ProductDetailsCountdown true end */}

      {/* actions */}
      <div className="tp-product-details-action-wrapper">
        {/* <h3 className="tp-product-details-action-title">Quantity</h3> */}
        {/* <div className="tp-product-details-action-item-wrapper d-sm-flex align-items-center">
         
          <div className="tp-product-details-add-to-cart mb-15 w-100">
            <button
              onClick={() => {
                if (isAddedToCart) {
                  dispatch(handleModalClose());
                  router.push("/cart");
                } else {
                  handleAddProduct(productItem);
                }
              }}
              disabled={status === "out-of-stock"}
              className="tp-product-details-add-to-cart-btn w-100"
            >
              {isAddedToCart ? "View Cart" : "Add To Cart"}
            </button>
          </div>
        </div> */}
        <Link href="/cart" onClick={() => dispatch(handleModalClose())}>
          <button className="tp-btn tp-btn-border ">SHARE THIS PAGE</button>
        </Link>
      </div>

      {detailsBottom && (
        <DetailsBottomInfo category={category?.name} sku={sku} tag={tags[0]} />
      )}
    </div>
  );
};

export default DetailsWrapper;
