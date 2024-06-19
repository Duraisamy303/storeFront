import { useRouter } from "next/router";
import React from "react";

function SingleNav({ active = false, id, title, icon }) {
  const router = useRouter();
  const handleClick = () => {
    if (id === "wishlist") {
      router.push("/wishlist");
    }
  };
  return (
    <button
      className={`nav-link ${active ? "active" : ""}`}
      id={`nav-${id}-tab`}
      data-bs-toggle="tab"
      data-bs-target={`#nav-${id}`}
      type="button"
      role="tab"
      aria-controls={id}
      aria-selected={active ? "true" : "false"}
      onClick={handleClick}
    >
      <span>
        <i className={icon}></i>
      </span>
      {title}
    </button>
  );
}

const ProfileNavTab = () => {
  return (
    <nav>
      <div
        className="nav nav-tabs tp-tab-menu flex-column"
        id="profile-tab"
        role="tablist"
      >
        <SingleNav
          active={true}
          id="profile"
          title="Account Details"
          icon="fa-regular fa-circle-info"
        />
        {/* <SingleNav
          id="information"
          title="Account Details"
          icon="fa-regular fa-user-pen"
        /> */}
        <SingleNav
          id="address"
          title="Address"
          icon="fa-solid fa-location-dot"
        />
        <SingleNav id="wishlist" title="Wishlist" icon="fa-regular fa-heart" />

        <SingleNav
          id="order"
          title="My Orders"
          icon="fa-light fa-clipboard-list-check"
        />
        <SingleNav
          id="password"
          title="Change Password"
          icon="fa-regular fa-lock"
        />
      </div>
    </nav>
  );
};

export default ProfileNavTab;
