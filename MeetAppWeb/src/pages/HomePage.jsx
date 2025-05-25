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
import Notice from '../components/Notice';
import { getNotices } from '../redux/authSlice';
import { FaLocationDot } from "react-icons/fa6";

function HomePage() {

  const dispatch = useDispatch();
  const { events, event, loading, errMessage } = useSelector((store) => store.eventList);
  const { notices } = useSelector((store) => store.authInfo)
  const [currentUser, setCurrentUser] = useState({});
  const [address, setAddress] = useState(null);

  useEffect(() => {


    const fetchData = async () => {
      try {
        const { address } = await getLocation();
        setAddress(address);

        // if (address?.locality) {
        //     const weatherData = await getWeather(address.locality);
        //     setWeather(weatherData);
        // }
      }
      catch (err) {
        console.log("Konum yada hava durumu alınamadı", err);
      }
    };
    fetchData();
    // console.log(weather.result[0]);
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

  }, [events])

  useEffect(() => {
    dispatch(getNotices())
  }, [])

  useEffect(() => {
    console.log(notices)
  }, [notices])


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
    return diffDays >= 0 && diffDays <= 10
  })



  return (
    <>
      <NavBar />
      <ThemeProvider theme={customContainer}>
        <Container maxWidth="xl">
          <div className='homeLeftDiv'>
            <div>
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
                {address &&
                  <div className='homeLocationDiv'>
                    <div className='homeLocationButton'>
                      <FaLocationDot className='homeLocationIcon' />
                      <span className='homeLocationSpan'>{address.locality} / {address.countryCode}</span>
                    </div>
                  </div>
                }
              </div>
              <div>
                <Notice notices={notices[0]} />
              </div>
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