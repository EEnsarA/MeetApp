import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getAllEvents } from '../redux/eventSlice';
import { Link } from 'react-router-dom';
import { createDescSummary } from '../helpers/stringHelpers';


function HomeImgSlider() {


    const dispatch = useDispatch();
    const { events, event, loading, errMessage } = useSelector((store) => store.eventList);
    const [descSummary, setDescSummary] = useState("");

    useEffect(() => {
        dispatch(getAllEvents());
    }, [])

    const bannerEvents = events.filter(e => {
        return e.isOnBanner == true;
    })
    return (

        <div>
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
                    disableOnInteraction: true,
                }}
                modules={[EffectCoverflow, Pagination, Autoplay]}
                className="homeSloganSlider"
            >
                {bannerEvents.map((e) => (
                    <SwiperSlide>
                        <div className="imgSliderDiv">
                            <div className='imgContainerDiv'>
                                <img style={{ objectFit: "fill", borderRadius: "12px", width: "100%", height: "100%" }} src={`${import.meta.env.VITE_API_URL}${e.imageUrl}`} alt="" />
                            </div>
                            <Link to={"/events/" + e.id} style={{ textDecoration: "none" }}>
                                <div className='imgSliderTextDiv'>
                                    <span className='imgSliderHeader'>{e.eventName}</span>
                                    <span className='imgSliderDesc'>{createDescSummary(e.eventDescription, 250)}</span>
                                </div>
                            </Link>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default HomeImgSlider