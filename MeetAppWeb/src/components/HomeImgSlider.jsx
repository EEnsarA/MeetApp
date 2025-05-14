import React from 'react'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';


function HomeImgSlider() {
    return (

        <div style={{}}>
            <Swiper
                direction={'vertical'}
                effect={"coverflow"}
                centeredSlides={true}
                grabCursor={true}
                pagination={{
                    dynamicBullets: true,
                    clickable: true,
                    renderBullet: function (index, className) {
                        return "<span class='" + className + "'>'" + (index + 1) + "</span>";
                    }
                }}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                modules={[EffectCoverflow, Pagination, Autoplay]}
                className="homeSloganSlider"
            >
                <SwiperSlide><img className='sliderImg' src="../../images/etkinlik-1.jpg" alt="" /></SwiperSlide>
                <SwiperSlide><img className='sliderImg' src="../../images/etkinlik-2.jpg" alt="" /></SwiperSlide>
                <SwiperSlide><img className='sliderImg' src="../../images/etkinlik-3.jpg" alt="" /></SwiperSlide>
                <SwiperSlide><img className='sliderImg' src="../../images/etkinlik-4.png" alt="" /></SwiperSlide>
            </Swiper>
        </div>
    )
}

export default HomeImgSlider