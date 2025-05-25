import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import { ThemeProvider } from "@mui/material";
import Container from '@mui/material/Container';
import { eventDetailContainer } from '../helpers/customWidgets';
import { useDispatch, useSelector } from 'react-redux';
import { calculateCart, clearCartRemovedMessage, clearUserCart, getUserCart, removeEventFromUserCart, updateEventTickets } from '../redux/cartSlice';
import Grid from '@mui/material/Grid';
import { FaLocationDot } from "react-icons/fa6";
import { FaRegCalendar } from "react-icons/fa6";
import { formatDateTimeTR } from '../helpers/stringHelpers';
import { Link, useNavigate } from 'react-router-dom';
import { TiDeleteOutline } from "react-icons/ti";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import PaymentModal from '../components/PaymentModel';

function CartPage() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userCart, amountCart, cartRemovedMessage, ticketUpdateMessage, numberOfTicket } = useSelector((store) => store.userCart)
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [paymentOpen, setPaymentOpen] = useState(false);
    const [confirmOrder, setConfirmOrder] = useState(false);

    useEffect(() => {
        if (sessionStorage.getItem("current_user")) {
            const sessionUser = JSON.parse(sessionStorage.getItem("current_user"));
            dispatch(getUserCart(sessionUser.nameid));
        }
    }, [])
    useEffect(() => {
        dispatch(calculateCart());

    }, [userCart])

    useEffect(() => {
        if (confirmOrder && userCart) {
            console.log("order finished !")
            const ticketsInfo = [];
            userCart?.map((u) => {
                const ticket = {
                    "eventId": u.id,
                    "ticketCount": u.count
                }
                ticketsInfo.push(ticket)
            })
            dispatch(updateEventTickets(ticketsInfo));
            setConfirmOrder(false);
        }
    }, [confirmOrder])

    useEffect(() => {

        if (ticketUpdateMessage) {
            const sessionUser = JSON.parse(sessionStorage.getItem("current_user"));
            console.log(ticketUpdateMessage);
            dispatch(clearUserCart(sessionUser.nameid));
            navigate(0)
        }

    }, [ticketUpdateMessage])

    const [open, setOpen] = useState(false);

    // payment modal 
    const handleConfirmOrder = () => {
        setPaymentOpen(true);
    };


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
        if (cartRemovedMessage && cartRemovedMessage.length > 0) {
            setSnackbarMessage(cartRemovedMessage);
            setOpen(true);
            dispatch(clearCartRemovedMessage());
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
                                                            <FaLocationDot size={14} color='#014d57' /><span className='cartLocationSpan'>{u.city}/{u.country}</span>
                                                            <FaRegCalendar size={14} /><span className='cartDateSpan'>{formatDateTimeTR(u.startDate)}</span>
                                                        </div>
                                                        <div className='cartEventPriceDiv'>
                                                            <span className='cartEventPriceText'>{u.count} adet : </span>
                                                            <span className='cartEventPriceSpan'>₺{u.ticketPrice * u.count},00</span>
                                                        </div>
                                                    </div>

                                                </div>
                                            </Link>
                                        ))}
                                        {userCart == null &&
                                            <>
                                                <div className='cartEventInfoDiv'>
                                                    <span className='cartEventName'>Sepetiniz boş</span>
                                                </div>
                                            </>

                                        }
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
                                            <div className='cartEventBuySummary'>
                                                {userCart?.map((item) => (
                                                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                                        <span style={{ fontSize: '0.85rem', color: '#333' }}>- {item.eventName} x{item.count}</span>
                                                        <span style={{ fontSize: '0.85rem', fontWeight: '500' }}>₺{item.ticketPrice * item.count},00</span>
                                                    </div>
                                                ))}
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                                    <span style={{ fontSize: '0.85rem', color: '#333', fontWeight: '600' }}>- Sipariş Bedeli</span>
                                                    <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>₺{numberOfTicket * 4},00</span>
                                                </div>
                                            </div>
                                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: "6rem" }}>
                                                <div>
                                                    <span className='cartEventPriceText'>Toplam Tutar</span>
                                                </div>
                                                <div>
                                                    <span className='cartEventPriceSpan'>₺{amountCart + (numberOfTicket * 4)},00</span>
                                                </div>
                                            </div>
                                            <div>
                                                <button onClick={handleConfirmOrder} className='cartEventBuyButton'>Sepeti Onayla</button>
                                            </div>
                                            <PaymentModal
                                                open={paymentOpen}
                                                onClose={() => setPaymentOpen(false)}
                                                confirmOrder={() => setConfirmOrder(true)}
                                            />
                                            <div>
                                                <button onClick={() => { window.location.href = "/category/tüm-kategoriler/0"; }} className='cartEventContinueButton'>Alışverişe Devam Et</button>
                                            </div>
                                        </div>
                                    </div>

                                    <Snackbar
                                        open={open}
                                        onClose={handleClose}
                                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                                        autoHideDuration={4000}
                                    >
                                        <Alert
                                            onClose={handleClose}
                                            severity="error"
                                            variant="filled"
                                            sx={{ width: '100%' }}
                                        >
                                            {snackbarMessage || "Hata oluştu."}
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