import React, { useState, useEffect } from 'react'
import Container from '@mui/material/Container';
import { useGSAP } from "@gsap/react"
import gsap from 'gsap';
import Footer from '../components/Footer';
import Login from '../components/Login';
import Register from '../components/Register';
import { Link, useParams, useNavigate } from 'react-router-dom'
import { TbHexagonLetterM } from "react-icons/tb";
import Grid from '@mui/material/Grid';

function LoginPage() {

  const navigate = useNavigate();

  useGSAP(() => {
    gsap.to("#sloganSpan", {
      x: -60,
      delay: 1,
      duration: 1,
      opacity: 1,
    })
  })

  const [entry, setEntry] = useState("login");
  const params = useParams();

  useEffect(() => {
    if (params.entry != null) {
      setEntry(params.entry);
    }
  }, [])


  return (
    <>
      <div className='loginPage'>
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <div className='loginMainDiv'>
              <Grid size={{ xs: 6, md: 6 }}>
                <div className='loginDiv'>
                  <div className='bannerTextDiv'>
                    <h1 className='bannerHeader'>MeetApp</h1>
                  </div>
                  {entry == "login" &&
                    <>
                      <Login />
                      <div className='loginLinksDiv'>
                        <Link className='loginLinks'><span>Şifremi Unuttum</span></Link>
                        <Link className='loginLinks' onClick={() => { setEntry("register"), navigate("/accounts/login"); }}><span>Kaydol</span></Link>
                      </div>
                    </>
                  }
                  {entry == "register" &&
                    <>
                      <Register />
                      <div className='loginLinksDiv'>
                        <Link className='loginLinks' onClick={() => { setEntry("login"), navigate("/accounts/login") }}><span>Zaten Üye misiniz? Oturum Aç</span></Link>
                      </div>
                    </>
                  }
                </div>
              </Grid>
              <Grid size={{ xs: 6, md: 6 }}>
                <div>
                  <div className='loginRightSide' style={{ height: "100%" }}>
                    <img className='logoImg' src="/images/banner2.png" alt="" />
                  </div>
                </div>
              </Grid>
            </div>
          </Grid>
        </Container>
      </div>
    </>

  )
}

export default LoginPage