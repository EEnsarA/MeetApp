import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container';
import { useGSAP } from "@gsap/react"
import gsap from 'gsap';
import { getLocation } from '../hooks/getLocation'
import NavBar from '../components/NavBar';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from "react-router-dom"
import HomeImgSlider from '../components/HomeImgSlider';
import HomeCatSlider from '../components/HomeCatSlider';
import { useDispatch, useSelector } from 'react-redux';

function HomePage() {


  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    if (sessionStorage.getItem("current_user")) {
      const sessionUser = JSON.parse(sessionStorage.getItem("current_user"));
      const parsedUser = {
        id: sessionUser.nameid,
        fullName: sessionUser.unique_name,
        role: sessionUser.role
      }
      setCurrentUser(parsedUser);
    }
  }, [])


  useGSAP(() => {
    gsap.to("#homeSlogan", {
      x: -20,
      repeat: -1,
      yoyo: true,
      duration: 2,
      delay: 1,
      opacity: 1,
    })
  })


  return (
    <>
      <NavBar />
      <Container maxWidth="xl">
        <div style={{ marginTop: "2rem", padding: "10px", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <div className='homeSloganDiv'>
            {currentUser.role == "Admin" ?
              <span className='homeSlogan' id='homeSlogan'>
                Hoşgeldin Admin !
              </span>
              :
              <span className='homeSlogan' id='homeSlogan'>
                Hoşgeldin {currentUser.fullName} !
              </span>
            }

          </div>
          <HomeImgSlider />
        </div>
        <div className='homeCatDiv'>
          <div className='homeCatHeaderDiv'>
            <Link className='homeCatHeader'>
              <span>Tüm Etkinlikler</span>
            </Link>
          </div>
          <div>
            <HomeCatSlider />
          </div>
        </div>
        <div className='homeEventsDiv'>
          <Link className='homeCatHeader'>
            <span>Yakınlardaki Etkinlikler</span>
          </Link>
        </div>
      </Container>
    </>

  )
}

export default HomePage