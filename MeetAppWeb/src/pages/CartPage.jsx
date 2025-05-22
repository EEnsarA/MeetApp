import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import { ThemeProvider } from "@mui/material";
import Container from '@mui/material/Container';
import { eventDetailContainer } from '../helpers/customWidgets';
import { useDispatch, useSelector } from 'react-redux';
import { calculateCart, getUserCart, removeEventFromUserCart } from '../redux/cartSlice';
import Grid from '@mui/material/Grid';
import { FaLocationDot } from "react-icons/fa6";
import { FaRegCalendar } from "react-icons/fa6";
import { formatDateTimeTR } from '../helpers/stringHelpers';
import { Link, useParams } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function CartPage() {

    const dispatch = useDispatch();
    const { userCart, amountCart, cartRemovedMessage, cartAddedMessage, numberOfTicket } = useSelector((store) => store.userCart)

    useEffect(() => {
        if (sessionStorage.getItem("current_user")) {
            const sessionUser = JSON.parse(sessionStorage.getItem("current_user"));
            dispatch(getUserCart(sessionUser.nameid));
        }
    }, [])
    useEffect(() => {
        dispatch(calculateCart());
        console.log(userCart);
    }, [userCart])

    const [open, setOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };


    const deleteEventFromCart = (u) => {
        const sessionUser = JSON.parse(sessionStorage.getItem("current_user"));
        const removeInfo = {
            "userId": sessionUser.nameid,
            "eventId": u.id
        }
        dispatch(removeEventFromUserCart(removeInfo)).then(() => {
            dispatch(getUserCart(sessionUser.nameid));
        });

    }

    useEffect(() => {
        if (cartRemovedMessage) {
            setOpen(true);
            console.log(cartRemovedMessage);
        }
    }, [cartRemovedMessage]);

    return (
        <>
            <NavBar />
            <ThemeProvider theme={eventDetailContainer}>
                <Container maxWidth="xl">
                    <div className='cartMainDiv'>
                        <div className='cartMainDetailDiv'>
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 8, md: 8 }}>
                                    <div className='cartHeaderDiv'>
                                        <span className='cartHeader'>Sepetim</span>
                                        <span className='cartEventLengthSpan'>{numberOfTicket} bilet</span>
                                    </div>
                                    <hr />
                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                        {userCart?.map((u) => (
                                            <Link to={"/events/" + u.id} style={{ textDecoration: "none" }} key={u.id}>
                                                <div className='cartEventDiv'>
                                                    <button onClick={(e) => { e.preventDefault(); deleteEventFromCart(u); }} className='cartEventDeleteButton' >
                                                        <TiDeleteOutline className='deleteButton' />
                                                    </button>
                                                    <div>
                                                        <div className='cartEventImageDiv'>
                                                            <img src={`${import.meta.env.VITE_API_URL}${u.imageUrl}`} alt="" style={{ width: "100%", height: "100%", objectFit: "fill", borderRadius: "12px" }} />
                                                        </div>
                                                    </div>
                                                    <div className='cartEventInfoDiv'>
                                                        <div>
                                                            <span className='cartEventName'>{u.eventName}</span>
                                                        </div>
                                                        <div className='cartEventLocationDiv'>
                                                            <FaLocationDot size={14} /><span className='cartLocationSpan'>{u.city}/{u.country}</span>
                                                            <FaRegCalendar size={14} /><span className='cartDateSpan'>{formatDateTimeTR(u.startDate)}</span>
                                                        </div>
                                                        <div className='cartEventPriceDiv'>
                                                            <span className='cartEventPriceText'>{u.count} adet : </span>
                                                            <span className='cartEventPriceSpan'>₺{u.ticketPrice * u.count},00</span>
                                                        </div>
                                                    </div>
                                                    {/* <div className='cartEventPriceDiv'>
                                                            <span className='cartEventPriceSpan'>₺{u.ticketPrice * u.count},00</span>
                                                        </div> */}
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </Grid>
                                <Grid size={{ xs: 4, md: 4 }}>
                                    <div className='cartEventPayMainDiv'>
                                        <div style={{}}>
                                            <div className='cartEventPayUpDiv'>
                                                <div className='cartEventPayUpDotDiv'></div>
                                            </div>
                                        </div>
                                        <div style={{ marginTop: "2rem", padding: "16px" }}>
                                            <div className='cartEventPayHeaderDiv'>
                                                <span className='cartEventPayHeader'>Biletler {`(${numberOfTicket})`}</span>
                                            </div>
                                            <div>
                                                <span></span>
                                            </div>
                                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                                <div>
                                                    <span className='cartEventPriceText'>Toplam Tutar</span>
                                                </div>
                                                <div>
                                                    <span className='cartEventPriceSpan'>₺{amountCart},00</span>
                                                </div>
                                            </div>
                                            <div>
                                                <button className='cartEventBuyButton'>Sepeti Onayla</button>
                                            </div>

                                        </div>
                                    </div>
                                    <Snackbar
                                        open={open}
                                        onClose={handleClose}
                                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                                        autoHideDuration={4000}
                                        message={cartRemovedMessage.message}
                                    >
                                        <Alert
                                            onClose={handleClose}
                                            severity="error"
                                            variant="filled"
                                            sx={{ width: '100%' }}
                                        >
                                            {cartRemovedMessage.message}
                                        </Alert>
                                    </Snackbar>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </Container>
            </ThemeProvider>
        </>
    )
}

export default CartPage