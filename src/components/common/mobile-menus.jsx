import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { mobile_menu } from "@/data/menu-data";
import { userLoggedOut } from "@/redux/features/auth/authSlice";
import { closeUserSidebar } from "@/redux/features/cartSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

const MobileMenus = () => {
  const [isActiveMenu, setIsActiveMenu] = useState("");
  const [token, setToken] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  // handleOpenSubMenu
  const handleOpenSubMenu = (title) => {
    if (title === isActiveMenu) {
      setIsActiveMenu("");
    } else {
      setIsActiveMenu(title);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  const closeCart = () => {
    console.log("closeCart");
    dispatch(userLoggedOut());
    dispatch(closeUserSidebar());
    router.push("/login");
  };

  return (
    <>
      <ul>
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

        <li>
          <Link href="/shop" style={{ fontWeight: "500" }}>
            PRE-ORDERS
          </Link>
        </li>

        <li>
          <Link href="/myOrders" style={{ fontWeight: "500" }}>
            SALE
          </Link>
        </li>

        <li>
          <Link href="/contact" style={{ fontWeight: "500" }}>
            CONTACT US
          </Link>
        </li>
        <li>
          <Link href="/wishlist" style={{ fontWeight: "500" }}>
            WISHLIST
          </Link>
        </li>

        <li>
          <Link href="/compare" style={{ fontWeight: "500" }}>
            COMPARE
          </Link>
        </li>

        <li>
          <Link href="/login" style={{ fontWeight: "500" }}>
            <button style={{ fontWeight: "500" }} onClick={() => closeCart()}>
              {token ? "LOGOUT" : `LOGIN / REGISTER`}
            </button>
          </Link>
        </li>
      </ul>
    </>
  );
};

export default MobileMenus;
