import React from 'react';
import Image from 'next/image';
// internal
import insta_1 from '@assets/img/instagram/4/instagram-1.jpg';
import insta_2 from '@assets/img/instagram/4/instagram-2.jpg';
import insta_3 from '@assets/img/instagram/4/instagram-3.jpg';
import insta_4 from '@assets/img/instagram/4/instagram-4.jpg';
import insta_5 from '@assets/img/instagram/4/instagram-5.jpg';
import insta_6 from '@assets/img/instagram/4/instagram-6.jpg';

// instagram data 
const instagram_data = [
  { id: 1, link: 'https://www.instagram.com/', img: insta_1 },
  { id: 2, link: 'https://www.instagram.com/', img: insta_2 },
  { id: 3, link: 'https://www.instagram.com/', img: insta_3 },
  { id: 4, link: 'https://www.instagram.com/', img: insta_4 },
  { id: 5, link: 'https://www.instagram.com/', img: insta_5 },
  { id: 6, link: 'https://www.instagram.com/', img: insta_6 },
]

const InstagramAreaFour = () => {
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

          <div className='row'>
            <div className='col-md-4'>
              <div className='main-discount'><span className='discound-1'>DISCOUNT OF</span> <br/><span  className='discound'>20%</span><br/> <span className='discount-2'>ON ALL NECKLACES</span></div>
              <p style={{textAlign:"center", color:"black"}}>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
            </div>
            <div className='col-md-8'>
              <div className="row row-cols-lg-6 row-cols-md-3 row-cols-sm-2 row-cols-1 gx-1 gy-1 gy-lg-0">
                {instagram_data.map((item, i) => (
                  <div className="col" key={i}>
                    <div className="tp-instagram-item-2 w-img">
                      <Image src={item.img} alt="instagram img" className='actor-image' />
                      <div className="tp-instagram-icon-2">
                        <p className='actor-hov-para'>Necklace Yazhu</p>
                        <p  className='actor-hov-para'>Necklace, New Arivals</p>
                        <p className='actor-hov-para'>Price : $10,000</p>
                       <button type='button' className='actor-hover-btn'>Add To Card</button>
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