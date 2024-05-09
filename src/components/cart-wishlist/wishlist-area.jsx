import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import WishlistItem from "./wishlist-item";
import { Wishlist } from "@/svg";
import {
  useGetProductByIdQuery,
  useGetWishlistQuery,
} from "@/redux/features/productApi";
import { get_wishlist_products } from "@/redux/features/wishlist-slice";

const WishlistArea = () => {
  const [ids, setIds] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const { data: wishlistData, refetch: wishlistRefetch } =
    useGetWishlistQuery();

  useEffect(() => {
    getWishlistList();
  }, [wishlistData]);

  const list =wishlistData?.data?.wishlists?.edges?.map((item) => item?.node)

  const getWishlistList = async (prd) => {
    try {
      if (wishlistData?.data?.wishlists?.edges?.length > 0) {
        setWishlist(wishlistData?.data?.wishlists?.edges?.map((item) => item?.node))
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <section className="tp-cart-area pb-50">
        <div className="container-fluid">
          {list?.length === 0 && (
            <div className="text-center pt-50">
              <h3 style={{ paddingBottom: "15px" }}>This wishlist is empty.</h3>
              <p style={{ color: "gray" }}>
                You dont have any products in the wishlist yet.
                <br /> You will find a lot of interesting products on our Shop
                page.
              </p>
              <Link href="/shop" className="tp-cart-checkout-btn mt-20">
                RETURN TO SHOP
              </Link>
            </div>
          )}
          {list?.length > 0 && (
            <div className="row">
              <div className="col-xl-12">
                <div className="tp-cart-list mb-45 mr-30">
                  <table className="table">
                    <thead>
                      <tr>
                        <th colSpan="2" className="tp-cart-header-product">
                          Product
                        </th>
                        <th className="tp-cart-header-quantity">
                          Product name
                        </th>
                        <th className="tp-cart-header-price">Price</th>
                        <th>Add to Cart</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {list?.map((item, i) => (
                        <WishlistItem key={i} product={item} refetchWishlist={wishlistRefetch} />
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="tp-cart-bottom">
                  <div className="row align-items-end">
                    <div className="col-xl-6 col-md-4">
                      <div className="tp-cart-update">
                        <Link href="/cart" className="tp-cart-update-btn">
                          Go To Cart
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default WishlistArea;
