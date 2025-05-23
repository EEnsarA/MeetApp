import React, { useEffect, useState } from 'react'
import { sliceDateTime } from '../helpers/stringHelpers';
import { FaRegClock } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { IoMdSend } from "react-icons/io";
import { IoTicket } from "react-icons/io5";
import { BsTicket } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { addEventToUserCart, calculateCart, clearCartAddedMessage, getUserCart } from '../redux/cartSlice';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { FaCircleMinus } from "react-icons/fa6";
import { FaCirclePlus } from "react-icons/fa6";


function Ticket(props) {
    const event = props.event;

    const dispatch = useDispatch();
    const { cartAddedMessage, laoding } = useSelector((store) => store.userCart);

    const eventDate = sliceDateTime(event.startDate);

    const [currentUser, setCurrentUser] = useState();
    const [count, setCount] = useState(0);
    const [snackbarMessage, setSnackbarMessage] = useState("");


    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (sessionStorage.getItem("current_user")) {
            const sessionUser = JSON.parse(sessionStorage.getItem("current_user"));
            setCurrentUser(sessionUser);
        }
    }, [])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };



    const addEventToCart = () => {
        const eventId = event.id;
        const userId = currentUser.nameid;
        const addInfo = {
            "userId": userId,
            "eventId": eventId,
        }
        dispatch(addEventToUserCart(addInfo)).then(() => {
            dispatch(getUserCart(currentUser.nameid)).then(() => {
                dispatch(calculateCart());
            });
        });
    }

    useEffect(() => {
        if (cartAddedMessage) {
            setSnackbarMessage(cartAddedMessage)
            setOpen(true);
            dispatch(clearCartAddedMessage());
        }
    }, [cartAddedMessage])

    return (
        <>

            <div className='ticketMainDiv'>
                <div className='ticketInnerDiv'>
                    <span className="ticketInnerSpan">{eventDate.day}</span>
                    <span className="ticketInnerSpan">{eventDate.month}</span>
                </div>
                <div className='ticketHeaderDiv'>
                    <span className='ticketHeader'>{event.eventName} - {eventDate.month}</span>
                    <div>
                        <FaRegClock size={12} color='#5f5f5f' />
                        <span className='ticketHour'> {eventDate.hours} : {eventDate.minutes}</span>
                        <span className='ticketLocation'>{event.city} / {event.country}</span>
                    </div>
                </div>
                {event?.isOnSale &&
                    <div className='ticketOnSaleDiv'>
                        <span className='ticketOnSale'>Satışta</span>
                    </div>
                }
                <div className='addCartDiv'>
                    <Button onClick={addEventToCart} sx={{ backgroundColor: "#015c68", fontFamily: "'Funnel Display',  sans-serif" }} variant="contained" endIcon={<IoTicket />}>Sepete Ekle</Button>
                </div>
            </div>

            <Snackbar
                open={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                autoHideDuration={3000}
            >
                <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage || "Hata oluştu."}
                </Alert>
            </Snackbar>
        </>
    )
}

export default Ticket