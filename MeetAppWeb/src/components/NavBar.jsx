import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import Grid from '@mui/material/Grid'
import { FaShoppingCart } from "react-icons/fa";
import { IoMdLogIn } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { getLocation } from '../hooks/getLocation'
import { FaLocationDot } from "react-icons/fa6";
import { IoPersonCircle } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { getWeather } from '../hooks/getWeather';
import { FaUsers } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';
import { Badge, createTheme, ThemeProvider } from "@mui/material";
import Container from '@mui/material/Container';
import { customContainer } from '../helpers/customWidgets';

function NavBar() {

    const [weather, setWeather] = useState(null);
    const [currentUser, setCurrentUser] = useState({});
    const { numberOfTicket } = useSelector((store) => store.userCart);
    const [ticketCount, setTicketCount] = useState(0);

    const dispatch = useDispatch();
    const exit = () => {
        dispatch(logout());
        window.location.href = "/";
    }

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

    useEffect(() => {
        if (numberOfTicket) {
            setTicketCount(numberOfTicket);
        }

    }, [numberOfTicket])



    return (

        <div className='navBar'>
            <ThemeProvider theme={customContainer}>
                <Container maxWidth="xl" style={{ height: "40px" }}>
                    <Grid container spacing={0} sx={{ alignItems: "center" }}>
                        <Grid size={{ xs: 12, sm: 6, md: 8, lg: 8 }}>
                            <div className='navBarLeft'>
                                <Link to={"/home"} style={{ textDecoration: "none" }}>
                                    <div className='navbarLogo'>
                                        <h2 className='navbarAppHeader'>MeetApp</h2>
                                        {/* <img src="/images/logo97.png" alt="" width={128} height={64} /> */}
                                    </div>
                                </Link>
                                <div className='searchBarDiv'>
                                    <input className="searchBarInput" type="text" placeholder='Etkinlik arayın..' />
                                    <Link><IoSearch className='searchBarIcon' /></Link>
                                </div>
                            </div>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
                            <div className='navBarRight'>
                                {currentUser.role == "User" ?
                                    <>
                                        <Link className='navBarLinks' to={"/user-cart"}>
                                            <div className='navbarCartDiv'>
                                                <Badge
                                                    anchorOrigin={{
                                                        vertical: "top",
                                                        horizontal: "left"
                                                    }}
                                                    badgeContent={ticketCount} color='primary'>
                                                    <FaShoppingCart className='navbarCart' />
                                                </Badge>
                                                <span>Sepetim</span>
                                            </div>
                                        </Link>

                                        <Link className='navBarLinks'>
                                            <div className='navbarFavDiv'>
                                                <FaHeart className='navbarFav' />
                                                <span>Etkinliklerim</span>
                                            </div>
                                        </Link>

                                        <Link className='navBarLinks'>
                                            <div className='navbarProfileDiv'>
                                                <IoPersonCircle className='navbarProfile' />
                                                <span>Profil</span>
                                            </div>
                                        </Link>

                                        <Link className='navBarLinks' onClick={exit}>
                                            <div className='navbarLogOutDiv'>
                                                <FiLogOut className='navbarLogOut' />
                                            </div>
                                        </Link>
                                    </>
                                    :
                                    <>
                                        <Link to={"/admin/users"} className='navBarLinks'>
                                            <div className='navbarProfileDiv'>
                                                <FaUsers className='navbarProfile' />
                                                <span>Kullanıcılar</span>
                                            </div>
                                        </Link>
                                        <Link to={"/admin/events"} className='navBarLinks'>
                                            <div className='navbarFavDiv'>
                                                <IoMdSettings className='navbarFav' />
                                                <span>Etkinlikler</span>
                                            </div>
                                        </Link>
                                        <Link className='navBarLinks'>
                                            <div className='navbarProfileDiv'>
                                                <IoPersonCircle className='navbarProfile' />
                                                <span>Admin</span>
                                            </div>
                                        </Link>

                                        <Link className='navBarLinks' onClick={exit}>
                                            <div className='navbarLogOutDiv'>
                                                <FiLogOut className='navbarLogOut' />
                                            </div>
                                        </Link>
                                    </>
                                }
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </ThemeProvider>
        </div>


    )
}

export default NavBar