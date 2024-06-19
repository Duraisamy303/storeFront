import React, { useEffect, useState } from "react";
import { SmDot } from "@/svg";
import Link from "next/link";
import { useRouter } from "next/router";

const ProductDetailsBreadcrumb = ({ category, title }) => {
  console.log("✌️category --->", category);

  const router = useRouter();

  const categories = category.split(" / ");
  console.log("✌️categories --->", categories[0]);
  const [categoryId, setCategoryId] = useState("Q2F0ZWdvcnk6NQ==");

  // Initialize ParentCategoryId
  useEffect(() => {
    let ParentCategoryId = "";

    // Set ParentCategoryId based on categories[1]
    if (categories[1] === "Earrings") {
      ParentCategoryId = "Q2F0ZWdvcnk6NQ==";
    }
    if (categories[1] === "Necklaces") {
      ParentCategoryId = "Q2F0ZWdvcnk6NzA=";
    }
    if (categories[1] === "Bangles & Bracelets") {
      ParentCategoryId = "Q2F0ZWdvcnk6Njc=";
    }
    if (categories[1] === "Finger Rings") {
      ParentCategoryId = "Q2F0ZWdvcnk6MTIwNw==";
    }
    if (categories[1] === "Anklets data") {
      ParentCategoryId = "Q2F0ZWdvcnk6NzM1";
    }
    if (categories[1] === " Other Accessories") {
      ParentCategoryId = "Q2F0ZWdvcnk6Mzk0Nw==";
    }
 
    setCategoryId(ParentCategoryId);
  }, [categories[1]]);

  console.log("categoryId: ", categoryId);
  return (
    <section className="breadcrumb__area breadcrumb__style-2 include-bg pb-20">
      <div className="container-fluid">
        <div className="row">
          <div className="col-xxl-12">
            <div className="breadcrumb__content p-relative z-index-1">
              <div>
                <span className="breadcrumb-icon"></span>
                <span>
                  <a href="#">Home</a>
                </span>{" "}
                /
                <span>
                  <Link href="/shop"> {categories[0]}</Link>{" "}
                  {categories[1] && (
                    <span
                      onClick={() => {
                        if (categories[1] === "Gift Card") {
                          router.push("/giftCart");
                        } else {
                          router.push({
                            pathname: "/shop",
                            query: { categoryId: categoryId }, // Your parameters
                          });
                        }
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      / {categories[1]}
                    </span>
                  )}
                  {categories[2] && (
                    <span style={{ cursor: "pointer" }}>/ {categories[2]}</span>
                  )}
                </span>
                {/* <span>{title}</span> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsBreadcrumb;
