import React, { useEffect, useState } from "react";
import Image from "next/image";
// internal
import insta_1 from "@assets/img/instagram/4/instagram-1.jpg";
import insta_2 from "@assets/img/instagram/4/instagram-2.jpg";
import insta_3 from "@assets/img/instagram/4/instagram-3.jpg";
import insta_4 from "@assets/img/instagram/4/instagram-4.jpg";
import insta_5 from "@assets/img/instagram/4/instagram-5.jpg";
import insta_6 from "@assets/img/instagram/4/instagram-6.jpg";
import { useProduct20PercentageMutation } from "@/redux/features/productApi";
import { checkChannel } from "@/utils/functions";
import { CompareThree, QuickView, Wishlist } from "@/svg";

// instagram data
const instagram_data = [
  { id: 1, link: "https://www.instagram.com/", img: insta_1 },
  { id: 2, link: "https://www.instagram.com/", img: insta_2 },
  { id: 3, link: "https://www.instagram.com/", img: insta_3 },
  { id: 4, link: "https://www.instagram.com/", img: insta_4 },
  { id: 5, link: "https://www.instagram.com/", img: insta_5 },
  { id: 6, link: "https://www.instagram.com/", img: insta_6 },
];

const InstagramAreaFour = () => {
  const [discountProduct] = useProduct20PercentageMutation({});

  const [productList, setProduct] = useState([]);
  console.log("productList: ", productList);

  useEffect(() => {
    getDicountProduct();
  }, []);

  const getDicountProduct = async () => {
    try {
      const res = await discountProduct();
      if (res.data?.data?.collections?.edges?.length > 0) {
        const list =
          res.data?.data?.collections?.edges[0]?.node?.products?.edges;
        if (list?.length > 0) {
          const data = list?.map((item) => item.node);
          setProduct(data);
        }
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <>
      <section className="tp-instagram-area tp-instagram-style-4  pb-20">
        <div className="container-fluid pl-20 pr-20 pt-30">
          {/* <div className="row">
            <div className="col-xl-12">
              <div className="tp-section-title-wrapper-4 mb-50 text-center">
                <h3 className="tp-section-title-4">Trends on image feed</h3>
                <p>After many months design and development of a modern online retailer</p>
              </div>
            </div>
          </div> */}

          <div className="row">
            <div className="col-md-4">
              <div className="main-discount">
                <span className="discound-1">DISCOUNT OF</span> <br />
                <span className="discound">20%</span>
                <br /> <span className="discount-2">ON ALL NECKLACES</span>
              </div>
              <p style={{ textAlign: "center", color: "black" }}>
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur.
              </p>
            </div>
            <div className="col-md-8">
              <div className="row row-cols-lg-6 row-cols-md-3 row-cols-sm-2 row-cols-1 gx-1 gy-1 gy-lg-0">
                {productList.map((item, i) => (
                  <div className="col col-content-container" key={i}>
                    <div className="tp-instagram-item-2 w-img">
                      <div className="hi-message">
                        <ul style={{ listStyle: "none" }}>
                          <li>
                            {" "}
                            <Wishlist />
                          </li>
                          <li>
                            <CompareThree />
                          </li>
                          <li>
                            <QuickView />
                          </li>
                        </ul>
                      </div>
                      <Image
                        src={item?.thumbnail?.url}
                        width={300}
                        height={300}
                        alt="instagram img"
                        className="actor-image"
                      />
                      <div className="tp-instagram-icon-2">
                        <p className="actor-hov-para">{item?.name}</p>
                        {item?.category && (
                          <p className="actor-hov-para">
                            {item?.category?.name}
                          </p>
                        )}
                        <p className="actor-hov-para">
                          Price :{" "}
                          {checkChannel() === "india-channel" ? "₹" : "$"}
                          {item?.pricing?.priceRange?.start?.gross?.amount}
                        </p>
                        <button type="button" className="actor-hover-btn">
                          Add To Card
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default InstagramAreaFour;
