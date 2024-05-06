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
  const { wishlist } = useSelector((state) => state.wishlist);
  const [ids, setIds] = useState([]);

  const { data: localData } = useGetProductByIdQuery({
    ids: ids?.length > 0 ? ids : undefined,
  });
  console.log("querys: ", localData);

  const dispatch = useDispatch();

  const { data: wishlistData, isError, isLoading } = useGetWishlistQuery();

  // useEffect(() => {
  //   if (wishlistData) {
  //     if (wishlistData?.data?.wishlists?.edges?.length > 0) {
  //       const modify = wishlistData?.data?.wishlists.edges;
  //       dispatch(get_wishlist_products(modify?.map((item) => item.node)));
  //     } else {
  //       dispatch(get_wishlist_products([]));
  //     }
  //   } else {
  //     dispatch(get_wishlist_products([]));
  //   }
  // }, [wishlistData]);

  useEffect(() => {
    if (localData) {
      if (localData?.data?.products?.edges?.length > 0) {
        const modify = localData?.data?.products?.edges;
        console.log("modify: ", modify);
        dispatch(get_wishlist_products(modify?.map((item) => item.node)));
      } else {
        dispatch(get_wishlist_products([]));
      }
    } else {
      dispatch(get_wishlist_products([]));
    }
  }, [localData]);

  useEffect(() => {
    datss();
  }, []);
  const datss = async () => {
    try {
      const data = localStorage.getItem("wishlist");
      console.log("Stored wishlist: ", JSON.parse(data));
      const parsedData = JSON.parse(data);
      console.log("parsedData: ", parsedData);
      setIds(parsedData);
    } catch (error) {
      console.error("Error fetching wishlist data:", error);
    }
  };

  return (
    <>
      <section className="tp-cart-area pb-50">
        <div className="container-fluid">
          {wishlist?.length === 0 && (
            <div className="text-center pt-50">
              {/* <Wishlist style={{ width: "200px !important", height: "200px !important", opacity:"0.1", color:"#dedede" }} /> */}
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
          {wishlist?.length > 0 && (
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
                        <th>Action</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {wishlist?.map((item, i) => (
                        <WishlistItem key={i} product={item} />
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
