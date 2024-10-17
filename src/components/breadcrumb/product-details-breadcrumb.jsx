import React, { useEffect, useState } from "react";
import { SmDot } from "@/svg";
import Link from "next/link";
import { useRouter } from "next/router";

const ProductDetailsBreadcrumb = ({ category, title, parentSlug }) => {
  const router = useRouter();

  const categories = category?.split(" / ");
  const [categoryId, setCategoryId] = useState("earrings");

  // Initialize ParentCategoryId
  useEffect(() => {
    let ParentCategoryId = "";

    // Set ParentCategoryId based on categories[1]
    if (categories[1] === "Earrings") {
      ParentCategoryId = "earrings";
    } else if (categories[1] === "Necklaces") {
      ParentCategoryId = "necklaces";
    } else if (categories[1] === "Bangles & Bracelets") {
      ParentCategoryId = "bangles__bracelets";
    } else if (categories[1] === "Finger Rings") {
      ParentCategoryId = "finger_rings";
    } else if (categories[1] === "Anklets data") {
      ParentCategoryId = "anklets";
    } else if (categories[1] === " Other Accessories") {
      ParentCategoryId = "other_accessories";
    } else {
      ParentCategoryId = parentSlug;
    }
    setCategoryId(ParentCategoryId);
  }, [categories[1]]);

  return (
    <section className="breadcrumb__area breadcrumb__style-2 include-bg pb-20">
      <div className="container-fluid">
        <div className="row">
          <div className="col-xxl-12">
            <div className="breadcrumb__content p-relative z-index-1">
              <div>
                <span className="breadcrumb-icon"></span>
                <span>
                  <>Home</>
                </span>{" "}
                <span>
                  <span
                    onClick={() => {
                      if (categories[0] == "Shop") {
                        router.push({
                          pathname: "/shop",
                        });
                      }
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    / {categories[0]}
                  </span>
                  {/* <Link href="/shop"> {categories[0]}</Link>{" "} */}
                  {categories[1] && (
                    <span
                    // onClick={() => {
                    //   if (categories[1] === "Gift Card") {
                    //     router.push("/gift-card");
                    //   } else {
                    //     router.push({
                    //       pathname: "/shop",
                    //       query: { category: categoryId }, // Your parameters
                    //     });
                    //   }
                    // }}
                    // style={{ cursor: "pointer" }}
                    >
                      / {categories[1]}
                    </span>
                  )}
                  {categories[2] && <span style={{}}>/ {categories[2]}</span>}
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
