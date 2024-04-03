import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import WishlistItem from "./wishlist-item";
import { Wishlist } from "@/svg";

const WishlistArea = () => {
  const { wishlist } = useSelector((state) => state.wishlist);
  return (
    <>
      <section className="tp-cart-area pb-50">
        <div className="container-fluid">
          {wishlist?.length === 0 && (
            <div className="text-center pt-50">
              {/* <Wishlist style={{ width: "200px !important", height: "200px !important", opacity:"0.1", color:"#dedede" }} /> */}
              <h3 style={{ paddingBottom: "15px" }}>This wishlist is empty.</h3>
              <p style={{ color: "gray" }}>
                You don't have any products in the wishlist yet.
                <br /> You will find a lot of interesting products on our "Shop"
                page.
              </p>
              <Link href="/shop" className="tp-cart-checkout-btn mt-20">
                RETURN TO SHOP
              </Link>
            </div>
          )}
          {wishlist.length > 0 && (
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
                      {wishlist.map((item, i) => (
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
