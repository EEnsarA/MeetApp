import React, { useEffect } from 'react'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
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
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../redux/categorySlice';
import { FaMasksTheater } from "react-icons/fa6";
import { TbBuildingCircus } from "react-icons/tb";
import { IoSunnyOutline } from "react-icons/io5";
import { MdFestival } from "react-icons/md";
import { GiTRexSkull } from "react-icons/gi";
import { GiTheater } from "react-icons/gi";
import { Link } from 'react-router-dom';

function HomeCatSlider() {


  const dispatch = useDispatch();
  const { categories, loading, errMessage } = useSelector((store) => store.categoryList);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [])
  useEffect(() => {

  }, [categories])

  const categoryIcons = {
    "Yeni Etkinlikler": <IoPeopleSharp className='catSliderIcon' />,
    "Tiyatro": <FaMasksTheater className='catSliderIcon' />,
    "Dans": <IoMusicalNotes className='catSliderIcon' />,
    "Müzik": <IoMusicalNotes className='catSliderIcon' />,
    "Spor": <MdOutlineSportsSoccer className='catSliderIcon' />,
    "Sahne": <PiMicrophoneStageBold className='catSliderIcon' />,
    "Stand-Up": <PiMicrophoneStageBold className='catSliderIcon' />,
    "Sirk": <TbBuildingCircus className='catSliderIcon' />,
    "Eğitim": <GiOpenBook className='catSliderIcon' />,
    "Aile": <MdFamilyRestroom className='catSliderIcon' />,
    "Sosyal Etkinlikler": <IoIosPeople className='catSliderIcon' />,
    "İş": <MdBusinessCenter className='catSliderIcon' />,
    "Çevrimiçi": <FaLaptop className='catSliderIcon' />,
    "Açıkhava": <IoSunnyOutline className='catSliderIcon' />,
    "Festival": <MdFestival className='catSliderIcon' />,
    "Müze & Sergi": <GiTRexSkull className='catSliderIcon' />,
    "Komedi": <FaMasksTheater className='catSliderIcon' />,
    "Dram": <FaMasksTheater className='catSliderIcon' />,
    "Gösteri": <GiTheater className='catSliderIcon' />,
  };


  return (
    <div className='homeCatSliderDiv'>
      <button className="swiper-button-prev-custom"><FaCaretLeft fontSize={18} /></button>
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
        {categories?.map((cat) => (
          <SwiperSlide key={cat.id}>
            <Link to={"/category/" + cat.categoryName.replace(" ", "-").toLowerCase() + "/" + cat.id} style={{ textDecoration: "none" }}>
              <div className='catSliderSpanDiv' >
                {categoryIcons[cat.categoryName] || <IoPeopleSharp className='catSliderIcon' />}
                <span className='catSliderSpan'>{cat.categoryName}</span>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <button className="swiper-button-next-custom"><FaCaretRight fontSize={18} /></button>
    </div>
  )
}

export default HomeCatSlider