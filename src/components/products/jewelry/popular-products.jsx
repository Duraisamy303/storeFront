import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Scrollbar } from 'swiper';
// internal
import { useGetProductTypeQuery } from '@/redux/features/productApi';
import ProductSliderItem from './product-slider-item';
import ErrorMsg from '@/components/common/error-msg';
import { HomeTwoPopularPrdLoader } from '@/components/loader';
import LoginForm from '@/components/forms/login-form';


// slider setting 
const slider_setting = {
  slidesPerView: 5,
  spaceBetween: 25,
  pagination: {
    el: ".tp-category-slider-dot-4",
    clickable: true,
  },
  scrollbar: {
    el: '.tp-category-swiper-scrollbar',
    draggable: true,
    dragClass: 'tp-swiper-scrollbar-drag',
    snapOnRelease: true,
  },
  breakpoints: {
    '1400': {
      slidesPerView: 5,
    },
    '1200': {
      slidesPerView: 4,
    },
    '992': {
      slidesPerView: 3,
    },
    '768': {
      slidesPerView: 2,
    },
    '576': {
      slidesPerView: 2,
    },
    '0': {
      slidesPerView: 1,
    },
  }
}

const PopularProducts = () => {

  const { data: productsData, isError, isLoading } =
    useGetProductTypeQuery({ channel:"india-channel",first:19 });
  // decide what to render
  let content = null;
  const products = productsData?.data?.products?.edges;

  if (isLoading) {
    content = (
      <HomeTwoPopularPrdLoader loading={isLoading} />
    );
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isLoading && !isError && products?.length === 0) {
    content = <ErrorMsg msg="No Products found!" />;
  }
  if (!isLoading && !isError && products?.length > 0) {
    // const product_items = products.slice(0, 8);
    content = (
      <Swiper {...slider_setting} modules={[Scrollbar, Pagination]} className="tp-category-slider-active-4 swiper-container mb-70">
        {products.map(item => (
          <SwiperSlide key={item.id}>
            <ProductSliderItem product={item}  />
          </SwiperSlide>
        ))}
      </Swiper>
    )
  }
  return (
    <>
      <section className="tp-category-area pt-50 pb-105 tp-category-plr-85" style={{backgroundColor:`#EFF1F5`}}>
        <div className="container-fluid">
          <div className="row">
          <div className="col-xl-12">
              <div className="tp-section-title-wrapper-4 mb-60 text-center">
                <h5 className="popular-adipisicing">Adipisicing elit</h5>
                <h2 className="tp-section-title-4">FEATURED PRODUCTS</h2>
                <p style={{color:"black"}}>There are many variations of passages of lorem ipsum available.</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <div className="tp-category-slider-4">
                {content}
                <div className="tp-category-swiper-scrollbar tp-swiper-scrollbar"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    
    </>
  );
};

export default PopularProducts;