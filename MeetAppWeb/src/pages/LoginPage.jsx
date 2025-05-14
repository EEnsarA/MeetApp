import React, { useState, useEffect } from 'react'
import Container from '@mui/material/Container';
import { useGSAP } from "@gsap/react"
import gsap from 'gsap';
import Footer from '../components/Footer';
import Login from '../components/Login';
import Register from '../components/Register';
import { Link, useParams, useNavigate } from 'react-router-dom'
import { TbHexagonLetterM } from "react-icons/tb";

function LoginPage() {


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
        <Container maxWidth="sm">
          <div className='loginDiv'>
            <div className='loginSloganDiv'>
              <h5 className='loginSlogan' id=''>
                Meet App
              </h5>

              <div className='logoDiv'>
                <div className='loginLogo' id='loginLogo'>

                </div>
              </div>
            </div>
            {entry == "login" &&
              <>
                <Login />
                <div className='loginLinksDiv'>
                  <Link className='loginLinks'><span>Şifremi Unuttum</span></Link>
                  <Link className='loginLinks' onClick={() => { setEntry("register"), window.location.href = "/accounts/register"; }}><span>Kaydol</span></Link>
                </div>
              </>
            }
            {entry == "register" &&
              <>
                <Register />
                <div className='loginLinksDiv'>
                  <Link className='loginLinks' onClick={() => { setEntry("login"), window.location.href = "/accounts/login"; }}><span>Zaten Üye misiniz? Oturum Aç</span></Link>
                </div>
              </>
            }
          </div>
        </Container>
      </div>
    </>

  )
}

export default LoginPage