import React from 'react';
import Link from 'next/link';
// internal
import { ArrowRightLong } from '@/svg';
import banner_bg_1 from '@assets/img/category-1.jpg';
import banner_bg_2 from '@assets/img/category-2.png';
import banner_bg_3 from '@assets/img/category-3.png';
import banner_bg_4 from '@assets/img/category-4.jpg';
import banner_bg_5 from '@assets/img/category-5.png';
import banner_bg_6 from '@assets/img/category-6.png';



// BannerItem
function BannerItem({ cls, bg_clr, bg, content, title, isBtn = false }) {
  return (
    <div className={`tp-banner-item-4 tp-banner-height-4 fix p-relative z-index-1 ${cls}`}
      data-bg-color={`#${bg_clr}`}>
      <div className="tp-banner-thumb-4 include-bg black-bg transition-3"
        style={{ backgroundImage: `url(${bg?.src})` }}></div>
      <div className="tp-banner-content-4 first-card">
        <h3 className="tp-banner-title-4">
          <Link href="/shop">{title}</Link>
        </h3>
        <span>{content}</span>
        {isBtn && <div className="tp-banner-btn-4">
          <Link href="/shop" className="tp-btn tp-btn-border">
            VIEW PRODUCTS {" "} <ArrowRightLong />
          </Link>
        </div>}
      </div>
    </div>
  )
}


// BannerItem 2
function BannerItem2({ cls, bg_clr, content, title, img, isBtn = false }) {
  return (
    <div className={`tp-banner-item-4 tp-banner-height fix p-relative z-index-1 ${cls}`}
      data-bg-color={`${bg_clr}`}>
      <div className="tp-banner-thumb-4 include-bg black-bg transition-3"
       style={{ backgroundColor: `#${bg_clr}` }}></div>
      <div className="tp-banner-content-4 last-card">
        <div>
          <img src={img?.src} alt="category-product" />
        </div>
        <div className='last-card-body'>
          <h3 className="tp-banner-title-4">
            <Link href="/shop">{title}</Link>
          </h3>
          <span className='category-content'>{content}</span>

          {isBtn && <div className="tp-banner-btn-4">
            <Link href="/shop" className="tp-btn tp-btn-border">
              VIEW PRODUCTS {" "} <ArrowRightLong />
            </Link>
          </div>}
        </div>

      </div>
    </div>
  )
}

// BannerItem 3
function BannerItem3({ cls, bg_clr,  content, title, img, isBtn = false }) {
  return (
    <div className={`tp-banner-item-4 tp-banner-height-4 fix p-relative z-index-1 ${cls}`}
      data-bg-color={`${bg_clr}`}>
      <div className="tp-banner-thumb-4 include-bg black-bg transition-3"
        style={{ backgroundColor:`#${bg_clr}`}}></div>
      <div className="tp-banner-content-4" style={{ textAlign: "center" }}>
        <img src={img?.src} alt="category-product" />
        <h3 className="tp-banner-title-4">
          <Link href="/shop">{title}</Link>
        </h3>
        <span>{content}</span>
        {isBtn && <div className="tp-banner-btn-4">
          <Link href="/shop" className="tp-btn tp-btn-border">
            VIEW PRODUCTS {" "} <ArrowRightLong />
          </Link>
        </div>}
      </div>
    </div>
  )
}


const JewelryShopBanner = () => {
  return (
    <>
      <section className="tp-banner-area">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-6 col-lg-7 gx-0 gy-0">
              <div className="row">
                <div className="col-xl-12 gx-0 gy-0">
                  <BannerItem
                    bg_clr="F3F7FF"
                    bg={banner_bg_1}
                    title="NECKLACES"
                    content={
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing <br/> lacinia accumsan lorem sit amet.</p>
                    }
                    isBtn={true}
                  />
                </div>

                <div className="col-md-6 col-sm-6 gx-0 gy-0">
                  <BannerItem3 cls="has-green sm-banner" bg_clr="131418" content={
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing  lacinia accumsan lorem sit amet.</p>
                  }
                    img={banner_bg_2}
                    title="RINGS"
                    isBtn={true}
                  />
                </div>

                <div className="col-md-6 col-sm-6 gx-0 gy-0">
                  <BannerItem3 cls="has-brown sm-banner" bg_clr="090a0f" img={banner_bg_3} title="BRACELETS"
                    content={
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing  lacinia accumsan lorem sit amet.</p>
                    }
                    isBtn={true}
                  />
                </div>
              </div>
            </div>

            <div className="col-xl-6 col-lg-5 gx-0 gy-0">
              <div className="row">
                <div className="col-xl-12 gx-0 gy-0">
                  <BannerItem
                    bg_clr="F3F7FF"
                    bg={banner_bg_4}
                    title="JEWELLERY SET"
                    content={
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing<br/>  lacinia accumsan lorem sit amet.</p>
                    }
                    isBtn={true}
                  />
                </div>

                <div className="col-xl-12 gx-0 gy-0">
                  <BannerItem2 className="category-left-two"
                    bg_clr="090a0f"
                    img={banner_bg_5}
                    title="EARRINGS"
                    isBtn={true}
                    content={
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing  lacinia accumsan lorem sit amet.</p>
                    }
                  />
                </div>


                <div className="col-xl-12 gx-0 gy-0">
                  <BannerItem2 className="category-left-two"
                    bg_clr="131418"
                    img={banner_bg_6}
                    title="PENDANTS"
                    isBtn={true}
                    content={
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing  lacinia accumsan lorem sit amet.</p>
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default JewelryShopBanner;