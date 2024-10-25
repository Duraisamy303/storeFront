import React, { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
// internal
import { AskQuestion, CompareTwo, WishlistTwo } from "@/svg";
import DetailsBottomInfo from "./details-bottom-info";
import ProductDetailsCountdown from "./product-details-countdown";
import ProductQuantity from "./product-quantity";
import {
  add_cart_product,
  cart_list,
  compare_list,
  openCartMini,
} from "@/redux/features/cartSlice";
import { add_to_wishlist } from "@/redux/features/wishlist-slice";
import { add_to_compare } from "@/redux/features/compareSlice";
import { handleModalClose } from "@/redux/features/productModalSlice";
import {
  RegularPrice,
  addCommasToNumber,
  capitalizeFLetter,
  checkChannel,
} from "@/utils/functions";
import {
  useAddToCartMutation,
  useGetCartAllListQuery,
  useGetCartListQuery,
} from "@/redux/features/card/cardApi";
import { useRouter } from "next/router";
import { notifyError, notifySuccess } from "@/utils/toast";
import { checkWishlist, handleWishlistProduct } from "@/utils/common_function";
import ProductDetailsBreadcrumb from "../breadcrumb/product-details-breadcrumb";
import {
  useAddWishlistMutation,
  useGetNextProductQuery,
  useGetPrevProductQuery,
  useGetProductQuery,
  useGetWishlistQuery,
} from "@/redux/features/productApi";
import { roundOff } from "../../utils/functions";
import ButtonLoader from "../loader/button-loader";
import {
  RightOutlined,
  LeftOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { Tooltip } from "antd";
import { profilePic } from "@/utils/constant";
import Image from "next/image";

const DetailsWrapper = ({
  productItem,
  handleImageActive,
  activeImg,
  detailsBottom = false,
  parentSlug,
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
  const [channel, setChannel] = useState("india-channel");
  const [cartLoader, setCartLoader] = useState(false);
  const [wishlistLoader, setWishlistLoader] = useState(false);
  const [index, setIndex] = useState(0);
  const [variantId, setVariantId] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");

  const [visibility, setVisibility] = useState({
    description: false,
    additionalInfo: false,
    shipping: false,
    maintenance: false,
  });

  const {
    data: productData,
    isLoading: productLoading,
    isError: productError,
    refetch: productRefetch,
  } = useGetProductQuery({ productId: productItem?.slug });
  const { data: AllListChannel, refetch: AllListChannelREfresh } =
    useGetCartAllListQuery({});

  const ProductData = productData?.data?.product;

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
  const { data: wishlistData, refetch: wishlistRefetch } =
    useGetWishlistQuery();

  const isAddedToWishlist = wishlistData?.data?.wishlists?.edges?.some(
    (prd) => {
      return prd?.node?.variant === productItem?.id;
    }
  );

  const [addWishlist, {}] = useAddWishlistMutation();

  const { wishlist } = useSelector((state) => state.wishlist);

  const compareList = useSelector((state) => state.cart.compare_list);

  useEffect(() => {
    const compareList = localStorage.getItem("compareList");
    const arr = JSON.parse(compareList);
    dispatch(compare_list(arr));
  }, []);

  const [isAddWishlist, setWishlist] = useState(false);

  const cart = useSelector((state) => state.cart?.cart_list);

  const { data: datacartList, refetch: cartRefetch } = useGetCartListQuery();

  let isAddedToCart = false;
  if (datacartList?.data?.checkout?.lines?.length > 0) {
    isAddedToCart = datacartList?.data?.checkout?.lines?.some(
      (prd) => prd.variant.product.id === productItem?.id
    );
  }

  // let textValue = "";
  // // Parse the JSON string
  // if (productItem?.description || productItem?.node?.description) {
  //   const jsonObject = JSON.parse(
  //     productItem?.description || productItem?.node?.description
  //   );
  //   // Extract the text value
  //   textValue = jsonObject?.blocks[0]?.data?.text;
  // }

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

  const [token, setToken] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  useEffect(() => {
    const whislist = checkWishlist(wishlist, productItem?.id);
    setWishlist(whislist);
  }, [wishlist]);

  useEffect(() => {
    getWishlistList();
  }, [wishlistData]);

  const getWishlistList = async (prd) => {
    try {
      if (wishlistData?.data?.wishlists?.edges?.length > 0) {
        const isAddWishlist = wishlistData?.data?.wishlists?.edges
          ?.map((item) => item?.node)
          ?.some((node) => {
            return node?.id === productItem?.id;
          });

        dispatch(
          add_to_wishlist(
            wishlistData?.data?.wishlists?.edges?.map((item) => item?.node)
          )
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleWishlist = async (prd) => {
    if (token) {
      setWishlistLoader(true);
      try {
        setWishlistLoader(true);
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("userInfo");

        if (token) {
          const users = JSON.parse(user);
          const input = {
            input: {
              user: users.user.id,
              variant: prd?.id,
            },
          };

          const res = await addWishlist(input);
          notifySuccess("Product added to wishlist");
          wishlistRefetch();
        } else {
          router.push("/login");
          // const addedWishlist = handleWishlistProduct(prd);
          // dispatch(add_to_wishlist(addedWishlist));
        }

        setWishlistLoader(false);
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      notifyError(
        "Only logged-in users can add items to their wishlist or view it"
      );
    }
  };

  // handle add product

  const addToCartProductINR = async () => {
    try {
      setCartLoader(true);
      let variantID = "";
      if (productItem?.variants?.length > 1) {
        if (variantId == "") {
          notifyError("Please select a variant");
          setCartLoader(false);
          return false;
        } else {
          variantID = variantId;
        }
      } else {
        variantID = productItem?.defaultVariant?.id;
      }
      const checkoutTokenINR = localStorage.getItem("checkoutTokenINR");
      const response = await addToCartMutation({
        checkoutToken: checkoutTokenINR,
        variantId: variantID,
      });
      if (response.data?.data?.checkoutLinesAdd?.errors?.length > 0) {
        const err = response.data?.data?.checkoutLinesAdd?.errors[0]?.message;
        notifyError(err);
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
    try {
      setCartLoader(true);
      let variantID = "";
      if (productItem?.variants?.length > 1) {
        if (variantId == "") {
          setCartLoader(false);
          return false;
        } else {
          variantID = variantId;
        }
      } else {
        variantID = productItem?.defaultVariant?.id;
      }
      const checkoutTokenUSD = localStorage.getItem("checkoutTokenUSD");
      const response = await addToCartMutation({
        checkoutToken: checkoutTokenUSD,
        variantId: variantID,
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
    localStorage.setItem("compareList", JSON.stringify(arr));
    dispatch(compare_list(arr));
    notifySuccess("Product to added to compare list");

  };

  useEffect(() => {
    const channel = localStorage.getItem("channel");
    if (channel) {
      setChannel(channel);
    }
  }, []);

  const multiVariantPrice = () => {
    if (checkChannel() == "india-channel") {
      if (productItem?.variants?.length > 1) {
        {
          RegularPrice(
            productItem?.variants[0]?.costPrice,
            productItem?.pricing?.price?.gross?.amount
          ) && (
            <span
              className="pr-5"
              style={{ textDecoration: "line-through", color: "gray" }}
            >
              &#8377;
              {roundOff(productItem?.variants[0]?.costPrice?.gross?.amount)}
            </span>
          );
        }
        <span className="tp-product-price-2 new-price">
          &#8377;
          {roundOff(productItem?.pricing?.price?.gross?.amount)}
        </span>;
      } else {
        {
          RegularPrice(
            productItem?.defaultVariant?.costPrice,
            productItem?.pricing?.priceRange?.start?.gross?.amount
          ) && (
            <span
              className="pr-5"
              style={{ textDecoration: "line-through", color: "gray" }}
            >
              &#8377;{roundOff(productItem?.defaultVariant?.costPrice)}
            </span>
          );
        }
        <span className="tp-product-price-2 new-price">
          &#8377;
          {roundOff(
            productItem?.pricing?.priceRange?.start?.gross?.amount ||
              productItem?.node?.pricing?.priceRange?.start?.gross?.amount
          )}
        </span>;
      }
    } else {
      if (productItem?.variants?.length > 1) {
        {
          RegularPrice(
            productItem?.variants[0]?.costPrice,
            productItem?.pricing?.price?.gross?.amount
          ) && (
            <span
              className="pr-5"
              style={{ textDecoration: "line-through", color: "gray" }}
            >
              {"$"}
              {roundOff(productItem?.variants[0]?.costPrice?.gross?.amount)}
            </span>
          );
        }
        <span className="tp-product-price-2 new-price">
          {"$"}
          {roundOff(productItem?.pricing?.price?.gross?.amount)}
        </span>;
      } else {
        {
          RegularPrice(
            productItem?.defaultVariant?.costPrice,
            productItem?.pricing?.priceRange?.start?.gross?.amount
          ) && (
            <span
              className="pr-5"
              style={{ textDecoration: "line-through", color: "gray" }}
            >
              {"$"}
              {roundOff(productItem?.defaultVariant?.costPrice)}
            </span>
          );
        }
        <span className="tp-product-price-2 new-price">
          {"$"}
          {roundOff(
            productItem?.pricing?.priceRange?.start?.gross?.amount ||
              productItem?.node?.pricing?.priceRange?.start?.gross?.amount
          )}
        </span>;
      }
    }
  };

  const [variantDetails, setVariantDetails] = useState();
  const variantsChange = (e) => {
    setVariantId(e.target.value);
    productRefetch();
    const variantDetails = ProductData?.variants?.find(
      (variant) => variant?.id == e.target.value
    );
    setVariantDetails(variantDetails);
  };

  const CategoryList = productItem?.category;

  const saveOff = () => {
    const discountedPrice =
      productItem?.pricing?.priceRange?.start?.gross?.amount;
    const originalPrice =
      productItem?.pricing?.priceRangeUndiscounted?.start?.gross?.amount;
    const discountPercentage =
      ((originalPrice - discountedPrice) / originalPrice) * 100;
    if (discountPercentage) {
      return discountPercentage.toFixed(2);
    } else {
      return 0;
    }
  };

  useEffect(() => {
    if (productItem?.variants?.length > 1) {
      const amounts = productItem?.variants?.map(
        (product) => product?.pricing?.price?.gross?.amount
      );
      const minAmount = Math.min(...amounts);
      const maxAmount = Math.max(...amounts);
      setMaxAmount(maxAmount);
      setMinAmount(minAmount);
    }
  }, [productItem]);

  return (
    <div className="tp-product-details-wrapper">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <ProductDetailsBreadcrumb
            category={productItem?.category[0]?.name}
            title={productItem?.name}
            parentSlug={parentSlug}
          />
        </div>
      </div>
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
      <div className="tp-product-details-price-wrapper">
        {channel == "india-channel" ? (
          <div className="tp-product-price-wrapper-2">
            {productItem?.variants?.length <= 1 &&
              RegularPrice(
                productItem?.defaultVariant?.costPrice,
                productItem?.pricing?.priceRange?.start?.gross?.amount
              ) && (
                <span
                  className="pr-5"
                  style={{ textDecoration: "line-through", color: "gray" }}
                >
                  {variantDetails ? (
                    <>
                      &#8377;
                      {addCommasToNumber(
                        variantDetails?.pricing?.price?.gross?.amount
                      ) || 0}
                    </>
                  ) : (
                    <>
                      &#8377;
                      {addCommasToNumber(
                        productItem?.defaultVariant?.costPrice
                      ) || 0}
                    </>
                  )}
                </span>
              )}
            <span
              className="tp-product-price-2 new-price"
              style={{ fontSize: "22px", fontWeight: "500" }}
            >
              <>
                {/* For normal product */}
                {productItem?.variants?.length > 1 ? (
                  <>
                    &#8377;{addCommasToNumber(minAmount)} - &#8377;
                    {addCommasToNumber(maxAmount)}
                  </>
                ) : (
                  <>
                    &#8377;
                    {addCommasToNumber(
                      productItem?.pricing?.priceRange?.start?.gross?.amount ||
                        productItem?.node?.pricing?.priceRange?.start?.gross
                          ?.amount
                    ) || 0}
                  </>
                )}
              </>
            </span>
          </div>
        ) : (
          <div className="tp-product-price-wrapper-2">
            {productItem?.variants?.length <= 1 &&
              RegularPrice(
                productItem?.defaultVariant?.costPrice,
                productItem?.pricing?.priceRange?.start?.gross?.amount
              ) && (
                <span
                  className="pr-5"
                  style={{ textDecoration: "line-through", color: "gray" }}
                >
                  {variantDetails ? (
                    <>
                      {"$"}
                      {addCommasToNumber(
                        variantDetails?.pricing?.price?.gross?.amount
                      ) || 0}
                    </>
                  ) : (
                    <>
                      {"$"}
                      {addCommasToNumber(
                        productItem?.defaultVariant?.costPrice
                      ) || 0}
                    </>
                  )}
                </span>
              )}
            <span
              className="tp-product-price-2 new-price"
              style={{ fontSize: "22px", fontWeight: "500" }}
            >
              <>
                {/* For normal product */}
                {productItem?.variants?.length > 1 ? (
                  <>
                    {"$"}
                    {addCommasToNumber(minAmount)} - {"$"}
                    {addCommasToNumber(maxAmount)}
                  </>
                ) : (
                  <>
                    {"$"}
                    {addCommasToNumber(
                      productItem?.pricing?.priceRange?.start?.gross?.amount ||
                        productItem?.node?.pricing?.priceRange?.start?.gross
                          ?.amount
                    ) || 0}
                  </>
                )}
              </>
            </span>
          </div>
        )}
      </div>

      {productItem?.metadata?.length > 0 && (
        <p style={{ color: "black" }}>
          {
            productItem?.metadata?.find(
              (item) => item.key == "short_description"
            )?.value
          }
        </p>
      )}
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

      <div className="w-full row">
        {productItem?.variants?.length > 1 && (
          <>
            <div
              className="text-bold text-lg gap-3"
              style={{
                alignItems: variantId ? "end" : "center",
                fontSize: "16px",
                color: "black",
                display: "flex",
                paddingBottom: "10px",
                borderBottom: "1px dashed #ddd",
                marginBottom: "10px",
              }}
            >
              <div>
                <span>Select Variant:</span>
              </div>
              <div style={{ textAlign: "end" }}>
                {variantId && variantDetails && (
                  <div className="">
                    <button
                      style={{ fontSize: "14px", color: "grey" }}
                      onClick={() => {
                        setVariantId("");
                        setVariantDetails("");
                      }}
                    >
                      Clear
                    </button>
                  </div>
                )}
                <select
                  name="country"
                  id="country"
                  value={variantId}
                  className="nice-select"
                  onChange={(e) => {
                    variantsChange(e);
                  }}
                >
                  <option value="">Select Variant</option>
                  {productItem?.variants?.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item?.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {variantDetails && (
              <span
                className="tp-product-price-2 new-price "
                style={{
                  fontSize: "22px",
                  fontWeight: "500",
                  paddingBottom: "10px",
                }}
              >
                <>
                  {/* giftwrap changed price product */}
                  {checkChannel() === "india-channel" ? (
                    <>
                      &#8377;{" "}
                      {addCommasToNumber(
                        variantDetails?.pricing?.price?.gross?.amount
                      )}
                    </>
                  ) : (
                    <>
                      $
                      {addCommasToNumber(
                        variantDetails?.pricing?.price?.gross?.amount
                      )}
                    </>
                  )}
                </>
              </span>
            )}
          </>
        )}
      </div>
      {productItem?.pricing?.discount !== null && (
        <div
          style={{
            color: "#c3935b",
            fontSize: "16px",
            paddingBottom: "10px",
          }}
        >{`Save ${saveOff()}% OFF`}</div>
      )}
      {/* {productItem?.variants?.length > 1 && (
        <div
          style={{
            display: "flex",
            gap: 10,
          }}
        >
          {productItem?.variants?.map((item, i) => (
            <button
              key={i}
              onClick={() => {
                setVariantId(item?.id);
                setIndex(i);
              }}
              type="button"
              style={{
                borderWidth: 1,
                borderColor: "grey",
                padding: 10,
                borderStyle: "solid",
                borderRadius: 10,
                backgroundColor: index == i ? "black" : "white",
                color: index == i ? "white" : "black",
              }}
            >
              {item?.name}
            </button>
          ))}
        </div>
      )} */}
      {productItem?.variants?.length > 1 ? (
        variantId && variantDetails ? (
          variantDetails?.quantityAvailable == 0 ||
          productItem?.defaultVariant?.quantityAvailable == 0 ? (
            <span style={{ color: "red", fontWeight: "500" }}>
              Out of Stock
            </span>
          ) : (
            <span>In Stock</span>
          )
        ) : null
      ) : productItem?.defaultVariant?.quantityAvailable == 0 ? (
        <span style={{ color: "red", fontWeight: "500" }}>Out of Stock</span>
      ) : (
        <span>In Stock</span>
      )}

      <div className="tp-product-details-action-item-wrapper d-sm-flex align-items-center">
        <div className="tp-product-details-add-to-cart mb-15">
          {productItem?.defaultVariant?.quantityAvailable != 0 && (
            <button
              onClick={() => {
                // if (isAddedToCart) {
                //   dispatch(handleModalClose());
                //   router.push("/cart");
                // } else {
                addToCartProductINR();
                addToCartProductUSD();
                // }
              }}
              disabled={status === "out-of-stock"}
              className={`tp-btn tp-btn-border`}
            >
              {cartLoader ? (
                <ButtonLoader loader={cartLoader} />
              ) : (
                <>{"Add To Cart"}</>
              )}
            </button>
          )}
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
        {}

        {isAddedToWishlist === true ? (
          <button
            disabled={status === "out-of-stock"}
            onClick={() => {
              if (token) {
                router.push("/wishlist");
              } else {
                notifyError(
                  "Only logged-in users can add items to their wishlist or view it"
                );
              }
              // router.push("/wishlist");
            }}
            // onClick={() => handleWishlistProduct(productItem)}
            type="button"
            className="tp-product-details-action-sm-btn"
          >
            <WishlistTwo />
            View Wishlist
          </button>
        ) : (
          <button
            disabled={status === "out-of-stock"}
            onClick={() => handleWishlist(productItem)}
            // onClick={() => handleWishlistProduct(productItem)}
            type="button"
            className="tp-product-details-action-sm-btn"
          >
            <WishlistTwo />
            {wishlistLoader ? "Loading..." : "Add To Wishlist"}
          </button>
        )}

        {/* <button type="button" className="tp-product-details-action-sm-btn">
          <AskQuestion />
          Ask a question
        </button> */}
      </div>
      {/* product-details-action-sm end */}

      <div>
        <p style={{ color: "#55585b" }}>
          <b>SKU:</b>{" "}
          {variantDetails
            ? variantDetails?.sku
            : ProductData?.defaultVariant?.sku}
        </p>
        <p
          style={{ color: "#55585b", cursor: "pointer" }}
          // onClick={() => {
          //   router.push({
          //     pathname: "/shop",
          //     query: { category: ProductData?.category?.slug }, // Your parameters
          //   });
          //   dispatch(handleModalClose());
          // }}
        >
          <b>Categories:</b>{" "}
          {productItem?.category?.map((category, index) => {
            return (
              <span
                key={category?.id}
                style={{ marginRight: "3px", cursor: "pointer" }}
                onClick={() => {
                  router.push({
                    pathname: "/shop",
                    query: { category: category?.slug }, // Your parameters
                  });
                  dispatch(handleModalClose());
                }}
              >
                {category?.name}
                {index < productItem.category.length - 1 ? ", " : ""}
              </span>
            );
          })}
        </p>
        {ProductData?.tags?.length > 0 && (
          <p style={{ color: "#55585b" }}>
            <b>Tags:</b>{" "}
            {ProductData?.tags?.map((tag, index) => {
              return (
                <span
                  key={tag?.id}
                  style={{ marginRight: "3px", cursor: "pointer" }}
                  onClick={() => {
                    router.push({
                      pathname: "/shop",
                      query: { tag: tag?.id }, // Your parameters
                    });
                    dispatch(handleModalClose());
                  }}
                >
                  {tag?.name}
                  {index < ProductData.tags.length - 1 ? ", " : ""}
                </span>
              );
            })}
          </p>
        )}
      </div>

      {/* if ProductDetailsCountdown true start */}
      {offerDate?.endDate && (
        <ProductDetailsCountdown offerExpiryTime={offerDate?.endDate} />
      )}
      {/* if ProductDetailsCountdown true end */}

      {/* actions */}
      <div className="tp-product-details-action-wrapper"></div>

      {detailsBottom && (
        <DetailsBottomInfo category={category?.name} sku={sku} tag={tags[0]} />
      )}
    </div>
  );
};

export default DetailsWrapper;
