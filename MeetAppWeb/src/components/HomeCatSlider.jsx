import React from 'react'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation, Pagination,Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { FaCaretLeft } from "react-icons/fa";
import { FaCaretRight } from "react-icons/fa";
import { IoPeopleSharp } from "react-icons/io5";
import { IoMusicalNotes } from "react-icons/io5";
import { MdOutlineSportsSoccer } from "react-icons/md";
import { PiMicrophoneStageBold } from "react-icons/pi";
import { GiOpenBook } from "react-icons/gi";
import { MdFamilyRestroom } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import { MdBusinessCenter } from "react-icons/md";
import { FaL, FaLaptop } from "react-icons/fa6";

function HomeCatSlider() {
  return (
    <div className='homeCatSliderDiv'>
        <button className="swiper-button-prev-custom"><FaCaretLeft fontSize={18}/></button>
        <Swiper
            direction={'horizontal'}
            centeredSlides={false}
            slidesPerView={6}
            centeredSlidesBounds={false}
            spaceBetween={1}
            navigation={{
              prevEl: '.swiper-button-prev-custom',
              nextEl: '.swiper-button-next-custom',
            }}
            modules={[Navigation]}
            className="homeCatSlider"
        >   
            <SwiperSlide>
                <div className='catSliderSpanDiv'>
                  <IoPeopleSharp className='catSliderIcon'/>
                  <span className='catSliderSpan'>Yeni Etkinlikler</span>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='catSliderSpanDiv'>
                  <IoMusicalNotes className='catSliderIcon'/>
                  <span className='catSliderSpan'>Müzik</span>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='catSliderSpanDiv'>
                  <MdOutlineSportsSoccer className='catSliderIcon'/>
                  <span className='catSliderSpan'>Spor</span>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='catSliderSpanDiv'>
                  <PiMicrophoneStageBold className='catSliderIcon'/>
                  <span className='catSliderSpan'>Sahne</span>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='catSliderSpanDiv'>
                  <GiOpenBook className='catSliderIcon'/>
                  <span className='catSliderSpan'>Eğitim</span>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='catSliderSpanDiv'>
                  <MdFamilyRestroom className='catSliderIcon'/>
                  <span className='catSliderSpan'>Aile</span>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='catSliderSpanDiv'>
                  <IoIosPeople className='catSliderIcon'/>
                  <span className='catSliderSpan'>Sosyal Etkinlikler</span>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='catSliderSpanDiv'>
                  <MdBusinessCenter className='catSliderIcon'/>
                  <span className='catSliderSpan'>İş</span>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='catSliderSpanDiv'>
                  <FaLaptop className='catSliderIcon'/>
                  <span className='catSliderSpan'>Çevrimiçi</span>
                </div>
            </SwiperSlide>
        </Swiper>
        <button className="swiper-button-next-custom"><FaCaretRight  fontSize={18}/></button>
    </div>
  )
}

export default HomeCatSlider