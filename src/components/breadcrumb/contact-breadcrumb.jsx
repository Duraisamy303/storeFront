import React from "react";
import banner from "@assets/img/shop-banner.jpg";


const ContactBreadcrumb = () => {
  console.log("banner", banner)
  return (
    <section className="breadcrumb__area include-bg text-center pt-95 pb-50" style={{ backgroundImage: `url(${banner?.src})` }}>
      <div className="container">
        <div className="row">
          <div className="col-xxl-12">
            <div className="breadcrumb__content p-relative z-index-1" style={{color:"white"}}>
              <h3 className="breadcrumb__title" style={{color:"white", fontSize:"70px"}}>Keep In Touch with Us</h3>
              <div className="breadcrumb__list">
                <span>
                  <a href="#">Home</a>
                </span>
                <span>Contact</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactBreadcrumb;
