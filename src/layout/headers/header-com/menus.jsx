import React, { useEffect, useState } from "react";
import menu_data from "@/data/menu-data";
import Link from "next/link";
import Image from "next/image";
import categoryImages from "@assets/img/sub-menu.jpg";
import commonImage from "@assets/img/earring-menu-pic-1.png";
import earingModel from "@assets/img/earring-menu-pic-1.png";
import { useRouter } from "next/router";
import Anklet from "@assets/img/banner/anklet.jpg";
import Ring from "@assets/img/banner/ring.jpg";
import Bangles from "@assets/img/banner/bangle.jpg";

const Menus = () => {
  const router = useRouter();
  // State to store the currently hovered category
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [token, setToken] = useState("");

  const [lastHoveredCategory, setLastHoveredCategory] = useState("Earrings");

  const handleCategoryHover = (category) => {
    setHoveredCategory(category);
    setLastHoveredCategory(category);
  };

  const handleCategoryLeave = () => {
    setLastHoveredCategory(hoveredCategory);
    setHoveredCategory(hoveredCategory);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  // Render category-related content based on the hovered category
  const renderCategoryContent = () => {
    if (hoveredCategory === "Earrings" || lastHoveredCategory === "Earrings") {
      return (
        <div
          className="row"
          style={{ paddingBottom: "30px", }}
        >
          <div className="col-3" style={{ paddingLeft: "30px" }}>
            {/* <div style={{ paddingLeft: "25px" }}>
              <h6 style={{ paddingBottom: "15px", fontWeight: "500" }}>
                ALLEARRINGS
              </h6>
              <ul>
                <li style={{ fontSize: "14px", paddingBottom: "10px" }}>
                  Handpainted Earrings
                </li>
                <li style={{ fontSize: "14px", paddingBottom: "10px" }}>
                  Studs & Hooks
                </li>
                <li style={{ fontSize: "14px", paddingBottom: "10px" }}>
                  Statement Earrings
                </li>
                <li style={{ fontSize: "14px", paddingBottom: "10px" }}>
                  Oxidized Silver Earrings
                </li>
                <li style={{ fontSize: "14px", paddingBottom: "10px" }}>
                  Jhumkas
                </li>
                <li style={{ fontSize: "14px", paddingBottom: "10px" }}>
                  Gold Plated Silver
                </li>
                <li style={{ fontSize: "14px", paddingBottom: "10px" }}>
                  Dual Tones
                </li>
                <li style={{ fontSize: "14px", paddingBottom: "10px" }}>
                  Cuff Earrings
                </li>
              </ul>
            </div> */}
          
          <div style={{ paddingLeft: "25px" }}>
              <h6 style={{ paddingBottom: "15px", fontWeight: "500" }}>
              ALL EARRINGS
              </h6>
           
            </div>
            <div>
              <Image
                src={commonImage}
                alt="category image"
                style={{ width: "100%", height: "200px" }}
              />
            </div>
            <div style={{ textAlign: "center", padding: "20px 0px" }}>
              <h4 style={{ fontWeight: "400" }}>
                Excepteur sint occaecat
                <br /> cupidatat
              </h4>
              <button className="tp-btn tp-btn-border">
                {" "}
                <Link href="/shop">Shop Now</Link>
              </button>
            </div>

            
          </div>
          <div className="col-9">
            <div className="row" style={{ padding: "20px" }}>
              <div className="col-lg-3" style={{ padding: "0px 8px 0px 0px" }}>
                <Image
                  src={categoryImages}
                  alt="category image"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
              <div className="col-lg-3" style={{ padding: "0px 8px 0px 0px" }}>
                <Image
                  src={categoryImages}
                  alt="category image"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
              <div className="col-lg-3" style={{ padding: "0px 8px 0px 0px" }}>
                <Image
                  src={categoryImages}
                  alt="category image"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
              <div className="col-lg-3" style={{ padding: "0px 8px 0px 0px" }}>
                <Image
                  src={categoryImages}
                  alt="category image"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            </div>
          </div>
        </div>
      );
    } else if (
      hoveredCategory === "Necklaces" ||
      lastHoveredCategory === "Necklaces"
    ) {
      return (
        <div
          className="row"
          style={{ paddingBottom: "30px",  }}
        >
          <div className="col-3" style={{ paddingLeft: "30px" }}>
            {/* <div style={{ paddingLeft: "25px" }}>
              <h6 style={{ paddingBottom: "15px", fontWeight: "500" }}>
                ALLNECKLACES
              </h6>
              <ul>
                <li style={{ fontSize: "14px", paddingBottom: "10px" }}>
                  Gold Plated Silver
                </li>
                <li style={{ fontSize: "14px", paddingBottom: "10px" }}>
                  Everyday Jewellery
                </li>
                <li style={{ fontSize: "14px", paddingBottom: "10px" }}>
                  Mope Chains
                </li>
                <li style={{ fontSize: "14px", paddingBottom: "10px" }}>
                  Chokers
                </li>
                <li style={{ fontSize: "14px", paddingBottom: "10px" }}>
                  Dual Tones
                </li>
                <li style={{ fontSize: "14px", paddingBottom: "10px" }}>
                  Hasli
                </li>
                <li style={{ fontSize: "14px", paddingBottom: "10px" }}>
                  Long Necklaces
                </li>
                <li style={{ fontSize: "14px", paddingBottom: "10px" }}>
                  Pearls & Beads
                </li>
                <li style={{ fontSize: "14px", paddingBottom: "10px" }}>
                  Short Necklaces
                </li>
                <li style={{ fontSize: "14px", paddingBottom: "10px" }}>
                  Statement Necklaces
                </li>
                <li style={{ fontSize: "14px", paddingBottom: "10px" }}>
                  Mangalsutras
                </li>
                <li style={{ fontSize: "14px", paddingBottom: "10px" }}>
                  LOOT SALE
                </li>
              </ul>
            </div> */}


<div style={{ paddingLeft: "25px" }}>
              <h6 style={{ paddingBottom: "15px", fontWeight: "500" }}>
              ALL NECKLACES
              </h6>
              {/* <ul>
                <li style={{ fontSize: "14px", paddingBottom: "10px" }}>
                  Rope Anklet
                </li>
                <li style={{ fontSize: "14px", paddingBottom: "10px" }}>
                  Stone Anklets
                </li>
              </ul> */}
            </div>
            <div>
              <Image
                src={commonImage}
                alt="category image"
                style={{ width: "100%", height: "200px" }}
              />
            </div>
            <div style={{ textAlign: "center", padding: "20px 0px" }}>
              <h4 style={{ fontWeight: "400" }}>
                Excepteur sint occaecat
                <br /> cupidatat
              </h4>
              <button className="tp-btn tp-btn-border">
                {" "}
                <Link href="/shop">Shop Now</Link>
              </button>
            </div>



          </div>
          <div className="col-9">
            <div className="row" style={{ padding: "20px" }}>
              <div className="col-lg-3" style={{ padding: "0px 8px 0px 0px" }}>
                <Image
                  src={categoryImages}
                  alt="category image"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
              <div className="col-lg-3" style={{ padding: "0px 8px 0px 0px" }}>
                <Image
                  src={categoryImages}
                  alt="category image"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
              <div className="col-lg-3" style={{ padding: "0px 8px 0px 0px" }}>
                <Image
                  src={categoryImages}
                  alt="category image"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
              <div className="col-lg-3" style={{ padding: "0px 8px 0px 0px" }}>
                <Image
                  src={categoryImages}
                  alt="category image"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            </div>
          </div>
        </div>
      );
    } else if (
      hoveredCategory === "Bangles" ||
      lastHoveredCategory === "Bangles"
    ) {
      return (
        <div
          className="row"
          style={{ paddingBottom: "30px",  }}
        >
          <div className="col-3" style={{ paddingLeft: "30px" }}>
            <div style={{ paddingLeft: "25px" }}>
              <h6 style={{ paddingBottom: "15px", fontWeight: "500" }}>
                ALL BANGLES & BRACELETS
              </h6>
              {/* <ul>
                <li style={{ fontSize: "16px", paddingBottom: "10px" }}>
                Chokers
                </li>
                <li style={{ fontSize: "16px", paddingBottom: "10px" }}>
                Everyday Jewellery
                </li>
                <li style={{ fontSize: "16px", paddingBottom: "10px" }}>
                Gold Plated Silver
                </li>
                <li style={{ fontSize: "16px", paddingBottom: "10px" }}>
                Mope Chains
                </li>
              </ul> */}
            </div>
            <div>
              <Image
                src={commonImage}
                alt="category image"
                style={{ width: "100%", height: "200px" }}
              />
            </div>
            <div style={{ textAlign: "center", padding: "20px 0px" }}>
              <h4 style={{ fontWeight: "400" }}>
                Excepteur sint occaecat
                <br /> cupidatat
              </h4>
              <button className="tp-btn tp-btn-border">
                <Link href="/shop">Shop Now</Link>
              </button>
            </div>
          </div>
          <div className="col-9">
            <div className="row" style={{ padding: "20px" }}>
              <div className="col-lg-3" style={{ padding: "0px 8px 0px 0px" }}>
                <Image
                  src={categoryImages}
                  alt="category image"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
              <div className="col-lg-3" style={{ padding: "0px 8px 0px 0px" }}>
                <Image
                  src={categoryImages}
                  alt="category image"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
              <div className="col-lg-3" style={{ padding: "0px 8px 0px 0px" }}>
                <Image
                  src={categoryImages}
                  alt="category image"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>

              <div className="col-lg-3" style={{ padding: "0px 8px 0px 0px" }}>
                <Image
                  src={categoryImages}
                  alt="category image"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            </div>
          </div>
        </div>
      );
    } else if (
      hoveredCategory === "Pendants" ||
      lastHoveredCategory === "Pendants"
    ) {
      return (
        <div
          className="row"
          style={{ paddingBottom: "30px",  }}
        >
          <div className="col-3" style={{ paddingLeft: "30px" }}>
            {/* <div style={{ paddingLeft: "25px" }}>
              <ul>
                <li style={{ fontSize: "14px", paddingBottom: "10px" }}>
                  Nose Pins
                </li>
                <li style={{ fontSize: "14px", paddingBottom: "10px" }}>
                  Pendants
                </li>
                <li style={{ fontSize: "14px", paddingBottom: "10px" }}>
                  Waist Keychains
                </li>
                <li style={{ fontSize: "14px", paddingBottom: "10px" }}>
                  Maang Tikkas
                </li>
                <li style={{ fontSize: "14px", paddingBottom: "10px" }}>
                  Hair Accessories
                </li>
              </ul>
            </div>

            <div>
              <Image
                src={earingModel}
                alt="category image"
                style={{ width: "100%", height: "200px" }}
              />
            </div> */}
            <div style={{ paddingLeft: "25px" }}>
              <h6 style={{ paddingBottom: "15px", fontWeight: "500" }}>
              ALL RINGS
              </h6>
              {/* <ul>
                <li style={{ fontSize: "14px", paddingBottom: "10px" }}>
                  Rope Anklet
                </li>
                <li style={{ fontSize: "14px", paddingBottom: "10px" }}>
                  Stone Anklets
                </li>
              </ul> */}
            </div>
            <div>
              <Image
                src={commonImage}
                alt="category image"
                style={{ width: "100%", height: "200px" }}
              />
            </div>
            <div style={{ textAlign: "center", padding: "20px 0px" }}>
              <h4 style={{ fontWeight: "400" }}>
                Excepteur sint occaecat
                <br /> cupidatat
              </h4>
              <button className="tp-btn tp-btn-border">
                {" "}
                <Link href="/shop">Shop Now</Link>
              </button>
            </div>


          </div>
          <div className="col-9">
            <div className="row" style={{ padding: "20px" }}>
              <div className="col-lg-3" style={{ padding: "0px 8px 0px 0px" }}>
                <Image
                  src={categoryImages}
                  alt="category image"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
              <div className="col-lg-3" style={{ padding: "0px 8px 0px 0px" }}>
                <Image
                  src={categoryImages}
                  alt="category image"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
              <div className="col-lg-3" style={{ padding: "0px 8px 0px 0px" }}>
                <Image
                  src={categoryImages}
                  alt="category image"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>

              <div className="col-lg-3" style={{ padding: "0px 8px 0px 0px" }}>
                <Image
                  src={categoryImages}
                  alt="category image"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            </div>
          </div>
        </div>
      );
    } else if (hoveredCategory === "Rings" || lastHoveredCategory === "Rings") {
      return (
        <div
          className="row"
          style={{ paddingBottom: "30px",}}
        >
          <div className="col-3" style={{ paddingLeft: "30px" }}>
            {/* <div style={{ paddingLeft: "25px" }}>
              <h6 style={{ paddingBottom: "15px", fontWeight: "500" }}>
                ALL RINGS
              </h6>
            </div>
            <div>
              <Image
                src={Ring}
                alt="category image"
                style={{ width: "100%", height: "200px" }}
              />
            </div>
            <div style={{ textAlign: "center", padding: "20px 0px" }}>
              <h4 style={{ fontWeight: "400" }}>
                Excepteur sint occaecat
                <br /> cupidatat
              </h4>
              <button className="tp-btn tp-btn-border">
                {" "}
                <Link href="/shop">Shop Now</Link>
              </button>
            </div> */}
            


            <div style={{ paddingLeft: "25px" }}>
              <h6 style={{ paddingBottom: "15px", fontWeight: "500" }}>
              ALL RINGS
              </h6>
              {/* <ul>
                <li style={{ fontSize: "14px", paddingBottom: "10px" }}>
                  Rope Anklet
                </li>
                <li style={{ fontSize: "14px", paddingBottom: "10px" }}>
                  Stone Anklets
                </li>
              </ul> */}
            </div>
            <div>
              <Image
                src={commonImage}
                alt="category image"
                style={{ width: "100%", height: "200px" }}
              />
            </div>
            <div style={{ textAlign: "center", padding: "20px 0px" }}>
              <h4 style={{ fontWeight: "400" }}>
                Excepteur sint occaecat
                <br /> cupidatat
              </h4>
              <button className="tp-btn tp-btn-border">
                {" "}
                <Link href="/shop">Shop Now</Link>
              </button>
            </div>






          </div>
          <div className="col-9">
            <div className="row" style={{ padding: "20px" }}>
              <div className="col-lg-3" style={{ padding: "0px 8px 0px 0px" }}>
                <Image
                  src={categoryImages}
                  alt="category image"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
              <div className="col-lg-3" style={{ padding: "0px 8px 0px 0px" }}>
                <Image
                  src={categoryImages}
                  alt="category image"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
              <div className="col-lg-3" style={{ padding: "0px 8px 0px 0px" }}>
                <Image
                  src={categoryImages}
                  alt="category image"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
              <div className="col-lg-3" style={{ padding: "0px 8px 0px 0px" }}>
                <Image
                  src={categoryImages}
                  alt="category image"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            </div>
          </div>
        </div>
      );
    } else if (
      hoveredCategory === "Anklets" ||
      lastHoveredCategory === "Anklets"
    ) {
      return (
        <div
          className="row"
          style={{
            paddingBottom: "30px",
          }}
        >
          <div className="col-3" style={{ paddingLeft: "30px" }}>
            <div style={{ paddingLeft: "25px" }}>
              <h6 style={{ paddingBottom: "15px", fontWeight: "500" }}>
                ALL ANKLETS
              </h6>
              {/* <ul>
                <li style={{ fontSize: "14px", paddingBottom: "10px" }}>
                  Rope Anklet
                </li>
                <li style={{ fontSize: "14px", paddingBottom: "10px" }}>
                  Stone Anklets
                </li>
              </ul> */}
            </div>
            <div>
              <Image
                src={commonImage}
                alt="category image"
                style={{ width: "100%", height: "200px" }}
              />
            </div>
            <div style={{ textAlign: "center", padding: "20px 0px" }}>
              <h4 style={{ fontWeight: "400" }}>
                Excepteur sint occaecat
                <br /> cupidatat
              </h4>
              <button className="tp-btn tp-btn-border">
                {" "}
                <Link href="/shop">Shop Now</Link>
              </button>
            </div>
          </div>
          <div className="col-9">
            <div className="row" style={{ padding: "20px" }}>
              <div className="col-lg-3" style={{ padding: "0px 8px 0px 0px" }}>
                <Image
                  src={categoryImages}
                  alt="category image"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
              <div className="col-lg-3" style={{ padding: "0px 8px 0px 0px" }}>
                <Image
                  src={categoryImages}
                  alt="category image"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
              <div className="col-lg-3" style={{ padding: "0px 8px 0px 0px" }}>
                <Image
                  src={categoryImages}
                  alt="category image"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
              <div className="col-lg-3" style={{ padding: "0px 8px 0px 0px" }}>
                <Image
                  src={categoryImages}
                  alt="category image"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
    // Add conditions for other categories as needed

    return null; // If no category is hovered, return null
  };

  return (
    <ul style={{ display: "flex", justifyContent: "end" }}>
      {/* {menu_data.map((menu) =>
        menu.homes ? (
          <li key={menu.id} className="has-dropdown has-mega-menu">
            <Link href={menu.link}>{menu.title}</Link>
            <div className="home-menu tp-submenu tp-mega-menu">
              <div className="row row-cols-1 row-cols-lg-4 row-cols-xl-4">
                {menu.home_pages.map((home, i) => (
                  <div key={i} className="col">
                    <div className="home-menu-item">
                      <Link href={home.link}>
                        <div className="home-menu-thumb p-relative fix">
                          <Image src={home.img} alt="home img" />
                        </div>
                        <div className="home-menu-content">
                          <h5 className="home-menu-title">{home.title}</h5>
                        </div>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </li>
        ) : menu.products ? (
          <li key={menu.id} className="has-dropdown has-mega-menu ">
            <Link href={menu.link}>{menu.title}</Link>
            <ul className="tp-submenu tp-mega-menu mega-menu-style-2">
              {menu.product_pages.map((p, i) => (
                <li key={i} className="has-dropdown">
                  <Link href={p.link} className="mega-menu-title">
                    {p.title}
                  </Link>
                  <ul className="tp-submenu">
                    {p.mega_menus.map((m, i) => (
                      <li key={i}>
                        <Link href={m.link}>{m.title}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </li>
        ) : menu.sub_menu ? (
          <li key={menu.id} className="has-dropdown">
            <Link href={menu.link}>{menu.title}</Link>
            <ul className="tp-submenu">
              {menu.sub_menus.map((b, i) => (
                <li key={i}>
                  <Link href={b.link}>{b.title}</Link>
                </li>
              ))}
            </ul>
          </li>
        ) : (
          <li key={menu.id}>
            <Link href={menu.link}>{menu.title}</Link>
          </li>
        )
      )} */}

      <li>
        <Link href="/" style={{ fontWeight: "500" }}>
          HOME
        </Link>
      </li>

      <li className="has-dropdown has-mega-menu">
        <Link href="/shop" style={{ fontWeight: "500" }}>
          SHOP
        </Link>
        <div className="home-menu tp-submenu tp-mega-menu">
          <div className="row">
            <div
              className="col-lg-2"
              style={{ backgroundColor: "#c3935b", padding: "0px" }}
            >
              <ul>
                <li
                  className={`shop-submenu-catageroy-list ${
                    lastHoveredCategory === "Earrings" ? "active" : ""
                  }`}
                  onMouseEnter={() => handleCategoryHover("Earrings")}
                  onMouseLeave={() => handleCategoryLeave()}
                  onClick={() => {
                    router.push({
                      pathname: "/shop",
                      query: { categoryId: "Q2F0ZWdvcnk6NQ==" }, // Your parameters
                    });
                  }}
                >
                  <p
                    style={{ cursor: "pointer", marginBottom: "0px" }}
                    // href="#"
                    className={`shop-submenu-catageroy-list-a ${
                      lastHoveredCategory === "Earrings" ? "active" : ""
                    }`}
                  >
                    Earrings
                  </p>
                </li>

                <li
                  className={`shop-submenu-catageroy-list ${
                    lastHoveredCategory === "Necklaces" ? "active" : ""
                  }`}
                  onMouseEnter={() => handleCategoryHover("Necklaces")}
                  onMouseLeave={() => handleCategoryLeave()}
                  onClick={() => {
                    router.push({
                      pathname: "/shop",
                      query: { categoryId: "Q2F0ZWdvcnk6NzA=" }, // Your parameters
                    });
                  }}
                >
                  <p
                    style={{ cursor: "pointer", marginBottom: "0px" }}
                    className={`shop-submenu-catageroy-list-a ${
                      lastHoveredCategory === "Necklaces" ? "active" : ""
                    }`}
                  >
                    Necklaces
                  </p>
                </li>

                <li
                  className={`shop-submenu-catageroy-list ${
                    lastHoveredCategory === "Bangles" ? "active" : ""
                  }`}
                  onMouseEnter={() => handleCategoryHover("Bangles")}
                  onMouseLeave={() => handleCategoryLeave()}
                  onClick={() => {
                    router.push({
                      pathname: "/shop",
                      query: { categoryId: "Q2F0ZWdvcnk6Njc=" }, // Your parameters
                    });
                  }}
                >
                  <p
                    style={{ cursor: "pointer", marginBottom: "0px" }}
                    // href="#"
                    className={`shop-submenu-catageroy-list-a ${
                      lastHoveredCategory === "Bangles" ? "active" : ""
                    }`}
                  >
                    Bangles & Bracelets
                  </p>
                </li>

                <li
                  className={`shop-submenu-catageroy-list ${
                    lastHoveredCategory === "Rings" ? "active" : ""
                  }`}
                  onMouseEnter={() => handleCategoryHover("Rings")}
                  onMouseLeave={() => handleCategoryLeave()}
                  onClick={() => {
                    router.push({
                      pathname: "/shop",
                      query: { categoryId: "Q2F0ZWdvcnk6MTIwNw==" }, // Your parameters
                    });
                  }}
                >
                  <p
                    style={{ cursor: "pointer", marginBottom: "0px" }}
                    // href="#"
                    className={`shop-submenu-catageroy-list-a ${
                      lastHoveredCategory === "Rings" ? "active" : ""
                    }`}
                  >
                    Rings
                  </p>
                </li>

                <li
                  className={`shop-submenu-catageroy-list ${
                    lastHoveredCategory === "Anklets" ? "active" : ""
                  }`}
                  onMouseEnter={() => handleCategoryHover("Anklets")}
                  onMouseLeave={() => handleCategoryLeave()}
                  onClick={() => {
                    router.push({
                      pathname: "/shop",
                      query: { categoryId: "Q2F0ZWdvcnk6NzM1" }, // Your parameters
                    });
                  }}
                >
                  <p
                    style={{ cursor: "pointer", marginBottom: "0px" }}
                    className={`shop-submenu-catageroy-list-a ${
                      lastHoveredCategory === "Anklets" ? "active" : ""
                    }`}
                  >
                    Anklets
                  </p>
                </li>

                {/* <li
                  className={`shop-submenu-catageroy-list ${
                    lastHoveredCategory === "Pendants" ? "active" : ""
                  }`}
                  onMouseEnter={() => handleCategoryHover("Pendants")}
                  onMouseLeave={() => handleCategoryLeave()}
                >
                  <Link
                    href="#"
                    className={`shop-submenu-catageroy-list-a ${
                      lastHoveredCategory === "Pendants" ? "active" : ""
                    }`}
                  >
                    Other Accessories
                  </Link>
                </li> */}
              </ul>
            </div>

            <div className="col-lg-10">{renderCategoryContent()}</div>
          </div>
        </div>
      </li>

      <li>
        <Link href="/about" style={{ fontWeight: "500" }}>
          ABOUT US
        </Link>
      </li>

      <li>
        <Link href="/coupon" style={{ fontWeight: "500" }}>
          GIFT CARD
        </Link>
      </li>
      {/* {token && (
        <li>
          <Link href="/myOrders" style={{ fontWeight: "500" }}>
            MY-ORDERS
          </Link>
        </li>
      )} */}

      <li>
        <Link href="/pre-orders" style={{ fontWeight: "500" }}>
          PRE-ORDERS
        </Link>
      </li>

      <li>
        <Link href="/sale" style={{ fontWeight: "500" }}>
          SALE
        </Link>
      </li>

      <li>
        <Link href="/contact" style={{ fontWeight: "500" }}>
          CONTACT US
        </Link>
      </li>
    </ul>
  );
};

export default Menus;
