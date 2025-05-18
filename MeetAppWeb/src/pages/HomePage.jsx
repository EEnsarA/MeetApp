import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container';
import { useGSAP } from "@gsap/react"
import gsap from 'gsap';
import { getLocation } from '../hooks/getLocation'
import NavBar from '../components/NavBar';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link } from "react-router-dom"
import HomeImgSlider from '../components/HomeImgSlider';
import HomeCatSlider from '../components/HomeCatSlider';
import { useDispatch, useSelector } from 'react-redux';
import EventCard from '../components/EventCard';
import { createTheme, ThemeProvider } from "@mui/material";
import Banner from '../components/Banner';
import { getAllEvents } from '../redux/eventSlice';
import { customContainer } from '../helpers/customWidgets';

function HomePage() {

  const dispatch = useDispatch();
  const { events, event, loading, errMessage } = useSelector((store) => store.eventList);

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

    dispatch(getAllEvents());
  }, [])
  useEffect(() => {
    console.log(events);
  }, [events])



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

  const today = new Date();

  const nearEvents = events.filter(e => {
    const eventDate = new Date(e.startDate);
    const diffTime = eventDate - today;            // milisaniye cinsinden hesaplar !
    const diffDays = diffTime / (1000 * 60 * 60 * 24);  // 1000ms = 1s yani 1 gün  = 1000*60*60*24 ms dir !
    return diffDays >= 0 && diffDays <= 30
  })



  return (
    <>
      <NavBar />
      <ThemeProvider theme={customContainer}>
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
              <span>Yakın Tarihteki Etkinlikler</span>
            </Link>
            <div className='homeEventCardsDiv'>
              {nearEvents?.map((e) =>
                <EventCard events={e} key={e.id} />
              )}
            </div>
          </div>
          <div className='homeBannerDiv'>
            <Banner />
          </div>
          <div className='homeEventsDiv'>
            <Link className='homeCatHeader'>
              <span>Sevebileceğiniz Etkinlikler</span>
            </Link>
            <div className='homeEventCardsDiv'>
              {events?.map((e) =>
                <EventCard events={e} key={e.id} />
              )}
            </div>
          </div>
        </Container>
      </ThemeProvider>
    </>

  )
}

export default HomePage