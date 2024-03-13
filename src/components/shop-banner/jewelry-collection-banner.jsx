import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
//internal
import thumb_bg from '@assets/img/product/collection/4/collection-1.jpg';
import side_text from '@assets/img/product/collection/4/side-text.png';
import collection_sm from '@assets/img/product/collection/4/collection-sm-1.jpg';
import { ArrowRightSm, PlusTwo } from '@/svg';
import { Carousel } from 'antd';
import profile1 from "@assets/img/carosel-profile1.jpg"
import profile2 from "@assets/img/carosel-profile2.jpg"
import profile3 from "@assets/img/carosel-profile3.jpg"
import actor1 from '@assets/img/collection-actor-1.jpg'
import actor2 from '@assets/img/collection-actor-2.jpg'
import actor3 from '@assets/img/collection-actor-3.jpg'
import actor4 from '@assets/img/collection-actor-4.jpg'
import actor5 from '@assets/img/collection-actor-5.jpg'
import actor6 from '@assets/img/collection-actor-6.jpg'


const JewelryCollectionBanner = () => {

  const contentStyle = {
    height: '400px',
    color: 'black',
    lineHeight: '400px',
    textAlign: 'center',
    background: '#f4f4f4',
  };

  const customDotStyle = {
    width: '10px',
    height: '10px',
    backgroundColor: 'black', // Set the background color to black
    borderRadius: '50%', // Make the dots circular
  };

  const settings = {
    customPaging: (i) => <div style={customDotStyle}></div>, // Customize the paging dots
    dots: true, // Show the paging dots
    autoplay: true, // Enable autoplay
  };

  return (
    <>
      <section className="tp-collection-area" style={{backgroundColor:"black"}}>
        <div className="container-fluid">
          <div className="tp-collection-inner-4 ">
            <div className="row gx-0" style={{ background: "black" }}>
              <div className="col-xl-6 col-lg-6 gx-0 gy-0">
                <div className="tp-collection-thumb-wrapper-4 p-relative fix z-index-1" >
                  <div >
                    <div className='carosel-outer'>
                      <Carousel  {...settings}>
                        <div className='profile-carosel'>
                          <div style={contentStyle}>
                            <h5 className='carosel-adisicing' >Adipisicing elit</h5>
                            <h3 className='carosel-title'>WHAT OUR CLIENTS SAY</h3>
                            <div className='profile-outer'>
                              <Image src={profile1} alt='profile-1' className='carosel-profileImg'/>
                            </div>
                            <p style={{marginBottom:"5px", color:"black"}}>Breakfast agreeable incommode departure it an. By ignorant at on wondered relation. Enough at tastes really so cousin am of. Extensive therefore supported by extremity of contented is pursuit compact</p>
                            <p style={{color:"black"}}><span style={{ fontWeight: "bold", color:"black" }}>Helen Signy</span> - Happy Customer</p>
                          </div>
                        </div>

                        <div className='profile-carosel'>
                          <div style={contentStyle}>
                            <h5 className='carosel-adisicing' >Adipisicing elit</h5>
                            <h3 className='carosel-title'>WHAT OUR CLIENTS SAY</h3>
                            <div className='profile-outer'>
                              <Image src={profile2} alt='profile-1'className='carosel-profileImg' />
                            </div>
                            <p  style={{marginBottom:"5px", color:"black"}}>Breakfast agreeable incommode departure it an. By ignorant at on wondered relation. Enough at tastes really so cousin am of. Extensive therefore supported by extremity of contented is pursuit compact</p>
                            <p style={{color:"black"}}><span style={{ fontWeight: "bold", color:"black" }}>Katell Oanez</span> - Happy Customer</p>
                          </div>
                        </div>

                        <div className='profile-carosel'>
                          <div style={contentStyle}>
                            <h5 className='carosel-adisicing' >Adipisicing elit</h5>
                            <h3 className='carosel-title'>WHAT OUR CLIENTS SAY</h3>
                            <div className='profile-outer'>
                              <Image src={profile3} alt='profile-1' className='carosel-profileImg'/>
                            </div>
                            <p  style={{marginBottom:"5px", color:"black"}}>Breakfast agreeable incommode departure it an. By ignorant at on wondered relation. Enough at tastes really so cousin am of. Extensive therefore supported by extremity of contented is pursuit compact</p>
                            <p style={{color:"black"}}><span style={{ fontWeight: "bold", color:"black" }}>Maelle Rozenn</span> - Happy Customer</p>
                          </div>
                        </div>

                      </Carousel>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 gx-0 gy-0 actors-outer">
                <div className='row'>
                  <div className='col-4 gx-1 gy-1'>
                      <Image src={actor1} alt='actor1' className='actor-img'/>
                  </div>
                  <div className='col-4 gx-1 gy-1'>
                      <Image src={actor2} alt='actor2' className='actor-img' />
                  </div>
                  <div className='col-4 gx-1 gy-1'>
                      <Image src={actor3} alt='actor3' className='actor-img' />
                  </div>
                </div>

                <div className='row'>
                  <div className='col-4 gx-1 gy-1'>
                      <Image src={actor4} alt='actor4' className='actor-img'/>
                  </div>
                  <div className='col-4 gx-1 gy-1'>
                      <Image src={actor5} alt='actor5' className='actor-img'/>
                  </div>
                  <div className='col-4 gx-1 gy-1'>
                      <Image src={actor6} alt='actor6' className='actor-img'/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default JewelryCollectionBanner;