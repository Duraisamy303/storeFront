import React, { useState } from "react";
import menu_data from "@/data/menu-data";
import Link from "next/link";
import Image from "next/image";
import categoryImages from "@assets/img/sub-menu.jpg";
import earingModel from "@assets/img/earring-menu-pic-1.png";

const Menus = () => {
  // State to store the currently hovered category
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [lastHoveredCategory, setLastHoveredCategory] = useState("Earrings");

  const handleCategoryHover = (category) => {
    setHoveredCategory(category);
    setLastHoveredCategory(category);
  };

  const handleCategoryLeave = () => {
    setLastHoveredCategory(hoveredCategory);
    setHoveredCategory(hoveredCategory);
  };

  // Render category-related content based on the hovered category
  const renderCategoryContent = () => {
    if (hoveredCategory === "Earrings" || lastHoveredCategory === "Earrings") {
      return (
        <div className="row" style={{ paddingBottom: "30px" }}>
          <div className="col-3" style={{ paddingLeft: "30px" }}>
            <div style={{ paddingLeft: "25px" }}>
              <h6 style={{ paddingBottom: "15px" }}>ALLEARRINGS</h6>
              <ul>
                <li style={{ fontSize: "16px", paddingBottom: "10px" }}>
                  Handpainted Earrings
                </li>
                <li style={{ fontSize: "16px", paddingBottom: "10px" }}>
                  One of a Kind Earrings
                </li>
                <li style={{ fontSize: "16px", paddingBottom: "10px" }}>
                  Statement Earrings
                </li>
                <li style={{ fontSize: "16px", paddingBottom: "10px" }}>
                  Studs & Hooks
                </li>
              </ul>
            </div>
            <div>
              <Image
                src={earingModel}
                alt="category image"
                style={{ width: "100%", height: "200px" }}
              />
            </div>
          </div>
          <div className="col-9">
            <div className="row" style={{ padding: "20px" }}>
              <div className="col-lg-3">
                <Image
                  src={categoryImages}
                  alt="category image"
                  style={{ width: "100%", height: "300px" }}
                />
              </div>
              <div className="col-lg-3">
                <Image
                  src={categoryImages}
                  alt="category image"
                  style={{ width: "100%", height: "300px" }}
                />
              </div>
              <div className="col-lg-3">
                <Image
                  src={categoryImages}
                  alt="category image"
                  style={{ width: "100%", height: "300px" }}
                />
              </div>
              <div className="col-lg-3">
                <Image
                  src={categoryImages}
                  alt="category image"
                  style={{ width: "100%", height: "300px" }}
                />
              </div>
            </div>
          </div>
        </div>
      );
    } else if (
      hoveredCategory === "Neckless" ||
      lastHoveredCategory === "Neckless"
    ) {
      return (
        <div className="row" style={{ paddingBottom: "30px" }}>
          <div className="col-3" style={{ paddingLeft: "30px" }}>
            <div style={{ paddingLeft: "25px" }}>
              <h6 style={{ paddingBottom: "15px" }}>ALLNECKLESS</h6>
              <ul>
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
              </ul>
            </div>
            <div>
              <Image
                src={earingModel}
                alt="category image"
                style={{ width: "100%", height: "200px" }}
              />
            </div>
          </div>
          <div className="col-9">
            <div className="row" style={{ padding: "20px" }}>
              <div className="col-lg-4">
                <Image
                  src={categoryImages}
                  alt="category image"
                  style={{ width: "100%", height: "300px" }}
                />
              </div>
              <div className="col-lg-4">
                <Image
                  src={categoryImages}
                  alt="category image"
                  style={{ width: "100%", height: "300px" }}
                />
              </div>
              <div className="col-lg-4">
                <Image
                  src={categoryImages}
                  alt="category image"
                  style={{ width: "100%", height: "300px" }}
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
        <div className="row" style={{ paddingBottom: "30px" }}>
          <div className="col-3" style={{ paddingLeft: "30px" }}>
            <div style={{ paddingLeft: "25px" }}>
              <h6 style={{ paddingBottom: "15px" }}>ALL BANGLES & BRACELETS</h6>
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
                src={earingModel}
                alt="category image"
                style={{ width: "100%", height: "200px" }}
              />
            </div>
            <div style={{ textAlign: "center", padding: "20px 0px" }}>
              <h4>
                Excepteur sint occaecat
                <br /> cupidatat
              </h4>
              <button className="tp-btn">Shop Now</button>
            </div>
          </div>
          <div className="col-9">
            <div className="row" style={{ padding: "20px" }}>
              <div className="col-lg-4">
                <Image
                  src={categoryImages}
                  alt="category image"
                  style={{ width: "100%", height: "300px" }}
                />
              </div>
              <div className="col-lg-4">
                <Image
                  src={categoryImages}
                  alt="category image"
                  style={{ width: "100%", height: "300px" }}
                />
              </div>
              <div className="col-lg-4">
                <Image
                  src={categoryImages}
                  alt="category image"
                  style={{ width: "100%", height: "300px" }}
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
        <div className="row" style={{ paddingBottom: "30px" }}>
          <div className="col-3" style={{ paddingLeft: "30px" }}>
            <div style={{ paddingLeft: "25px" }}>
              <h6 style={{ paddingBottom: "15px" }}>ALL PENDANTS</h6>
            </div>
            <div>
              <Image
                src={earingModel}
                alt="category image"
                style={{ width: "100%", height: "200px" }}
              />
            </div>
            <div style={{ textAlign: "center", padding: "20px 0px" }}>
              <h4>
                Excepteur sint occaecat
                <br /> cupidatat
              </h4>
              <button className="tp-btn">Shop Now</button>
            </div>
          </div>
          <div className="col-9">
            <div className="row" style={{ padding: "20px" }}>
              <div className="col-lg-4">
                <Image
                  src={categoryImages}
                  alt="category image"
                  style={{ width: "100%", height: "300px" }}
                />
              </div>
              <div className="col-lg-4">
                <Image
                  src={categoryImages}
                  alt="category image"
                  style={{ width: "100%", height: "300px" }}
                />
              </div>
              <div className="col-lg-4">
                <Image
                  src={categoryImages}
                  alt="category image"
                  style={{ width: "100%", height: "300px" }}
                />
              </div>
            </div>
          </div>
        </div>
      );
    } else if (hoveredCategory === "Rings" || lastHoveredCategory === "Rings") {
      return (
        <div className="row" style={{ paddingBottom: "30px" }}>
          <div className="col-3" style={{ paddingLeft: "30px" }}>
            <div style={{ paddingLeft: "25px" }}>
              <h6 style={{ paddingBottom: "15px" }}>ALL RINGS</h6>
            </div>
            <div>
              <Image
                src={earingModel}
                alt="category image"
                style={{ width: "100%", height: "200px" }}
              />
            </div>
            <div style={{ textAlign: "center", padding: "20px 0px" }}>
              <h4>
                Excepteur sint occaecat
                <br /> cupidatat
              </h4>
              <button className="tp-btn">Shop Now</button>
            </div>
          </div>
          <div className="col-9">
            <div className="row" style={{ padding: "20px" }}>
              <div className="col-lg-4">
                <Image
                  src={categoryImages}
                  alt="category image"
                  style={{ width: "100%", height: "300px" }}
                />
              </div>
              <div className="col-lg-4">
                <Image
                  src={categoryImages}
                  alt="category image"
                  style={{ width: "100%", height: "300px" }}
                />
              </div>
              <div className="col-lg-4">
                <Image
                  src={categoryImages}
                  alt="category image"
                  style={{ width: "100%", height: "300px" }}
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
        <div className="row" style={{ paddingBottom: "30px" }}>
          <div className="col-3" style={{ paddingLeft: "30px" }}>
            <div style={{ paddingLeft: "25px" }}>
              <h6 style={{ paddingBottom: "15px" }}>ALL ANKLETS</h6>
              <ul>
                <li style={{ fontSize: "16px", paddingBottom: "10px" }}>
                  Rope Anklet
                </li>
              </ul>
            </div>
            <div>
              <Image
                src={earingModel}
                alt="category image"
                style={{ width: "100%", height: "200px" }}
              />
            </div>
            <div style={{ textAlign: "center", padding: "20px 0px" }}>
              <h4>
                Excepteur sint occaecat
                <br /> cupidatat
              </h4>
              <button className="tp-btn">Shop Now</button>
            </div>
          </div>
          <div className="col-9">
            <div className="row" style={{ padding: "20px" }}>
              <div className="col-lg-4">
                <Image
                  src={categoryImages}
                  alt="category image"
                  style={{ width: "100%", height: "300px" }}
                />
              </div>
              <div className="col-lg-4">
                <Image
                  src={categoryImages}
                  alt="category image"
                  style={{ width: "100%", height: "300px" }}
                />
              </div>
              <div className="col-lg-4">
                <Image
                  src={categoryImages}
                  alt="category image"
                  style={{ width: "100%", height: "300px" }}
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
  console.log("categoryImages", categoryImages);

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
        <Link href="/" style={{fontWeight:'500'}}>HOME</Link>
      </li>

      <li className="has-dropdown has-mega-menu">
        <Link href="/shop" style={{fontWeight:'500'}}>SHOP</Link>
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
                >
                  <Link
                    href="#"
                    className={`shop-submenu-catageroy-list-a ${
                      lastHoveredCategory === "Earrings" ? "active" : ""
                    }`}
                  >
                    Earrings
                  </Link>
                </li>

                <li
                  className={`shop-submenu-catageroy-list ${
                    lastHoveredCategory === "Neckless" ? "active" : ""
                  }`}
                  onMouseEnter={() => handleCategoryHover("Neckless")}
                  onMouseLeave={() => handleCategoryLeave()}
                >
                  <Link
                    href="#"
                    className={`shop-submenu-catageroy-list-a ${
                      lastHoveredCategory === "Neckless" ? "active" : ""
                    }`}
                  >
                    Neckless
                  </Link>
                </li>

                <li
                  className={`shop-submenu-catageroy-list ${
                    lastHoveredCategory === "Bangles" ? "active" : ""
                  }`}
                  onMouseEnter={() => handleCategoryHover("Bangles")}
                  onMouseLeave={() => handleCategoryLeave()}
                >
                  <Link
                    href="#"
                    className={`shop-submenu-catageroy-list-a ${
                      lastHoveredCategory === "Bangles" ? "active" : ""
                    }`}
                  >
                    Bangles & Bracelets
                  </Link>
                </li>

                <li
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
                    Pendants
                  </Link>
                </li>

                <li
                  className={`shop-submenu-catageroy-list ${
                    lastHoveredCategory === "Rings" ? "active" : ""
                  }`}
                  onMouseEnter={() => handleCategoryHover("Rings")}
                  onMouseLeave={() => handleCategoryLeave()}
                >
                  <Link
                    href="#"
                    className={`shop-submenu-catageroy-list-a ${
                      lastHoveredCategory === "Rings" ? "active" : ""
                    }`}
                  >
                    Rings
                  </Link>
                </li>

                <li
                  className={`shop-submenu-catageroy-list ${
                    lastHoveredCategory === "Anklets" ? "active" : ""
                  }`}
                  onMouseEnter={() => handleCategoryHover("Anklets")}
                  onMouseLeave={() => handleCategoryLeave()}
                >
                  <Link
                    href="#"
                    className={`shop-submenu-catageroy-list-a ${
                      lastHoveredCategory === "Anklets" ? "active" : ""
                    }`}
                  >
                    Anklets
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-lg-10">{renderCategoryContent()}</div>
          </div>
        </div>
      </li>

      <li>
        <Link href="/about" style={{fontWeight:'500'}}>ABOUT US</Link>
      </li>

      <li>
        <Link href="/coupon" style={{fontWeight:'500'}}>GIFT CARD</Link>
      </li>

      <li>
        <Link href="/shop" style={{fontWeight:'500'}}>PRE-ORDERS</Link>
      </li>

      <li>
        <Link href="/my-orders" style={{fontWeight:'500'}}>SALE</Link>
      </li>

      <li>
        <Link href="/contact" style={{fontWeight:'500'}}>CONTACT US</Link>
      </li>
    </ul>
  );
};

export default Menus;
