import React, { useEffect } from 'react'
import NavBar from '../components/NavBar'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom';
import { getEventById } from '../redux/eventSlice';
import Container from '@mui/material/Container';
import { ThemeProvider } from "@mui/material";
import { customContainer, eventDetailContainer } from '../helpers/customWidgets';
import { FaLocationDot } from "react-icons/fa6";
import { FaRegCalendar } from "react-icons/fa6";
import { formatDateTimeTR } from '../helpers/stringHelpers';
import Ticket from '../components/Ticket';

function EventDetail() {

    const dispatch = useDispatch();
    const { event, loading, errMessage } = useSelector((store) => store.eventList);
    const params = useParams();
    const eventId = params.eventId;

    useEffect(() => {
        dispatch(getEventById(eventId));

    }, [])
    useEffect(() => {
        console.log(event);
    }, [event])


    return (
        <>
            <NavBar />
            <ThemeProvider theme={eventDetailContainer}>
                <Container maxWidth="xl">
                    <div style={{ padding: "2rem", marginTop: "4rem", display: "flex", flexDirection: "column", alignItems: "flex-start", borderLeft: "1px solid lightgray", borderRight: "1px solid lightgray" }}>
                        <span style={{ fontSize: "30px", fontWeight: "500", fontFamily: "'Funnel Display', sans-serif", }}>{event.eventName}</span>
                        <div style={{ display: "flex", alignItems: "center", marginTop: "1rem" }}>
                            <Link style={{ textDecoration: "none" }}>
                                <FaLocationDot size={12} /><span style={{ marginLeft: "4px", marginRight: "1rem", fontSize: "14px" }}>{event.location}</span>
                            </Link>
                            <FaRegCalendar size={12} /><span style={{ marginLeft: "4px", fontSize: "14px" }}>{formatDateTimeTR(event.startDate)} - {formatDateTimeTR(event.endDate)}</span>
                        </div>
                        <div style={{ maxWidth: "fit-content", height: "360px", borderRadius: "12px", marginTop: "1rem" }}>
                            <img src={`${import.meta.env.VITE_API_URL}${event.imageUrl}`} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "12px" }} />
                        </div>
                        <hr />
                        <div style={{ maxWidth: "1250px", marginTop: "1rem" }}>
                            <p style={{ fontSize: "16px", fontFamily: "'Funnel Display', sans-serif", lineHeight: "2rem" }}>{event.eventDescription}</p>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", maxWidth: "1250px", marginTop: "1rem" }}>
                            <p style={{ fontSize: "24px", fontWeight: "500", marginBottom: "1rem" }}>
                                Etkinlik Takvimi
                            </p>
                            <div>
                                <Ticket event={event} />
                            </div>
                        </div>
                        <div style={{ maxWidth: "1250px", marginTop: "1rem" }}>
                            <p style={{ fontSize: "24px", fontWeight: "500", marginBottom: "1rem" }}>
                                Etkinlik Kuralları
                            </p>
                            {event?.rules?.substring(1).split("-").map((rule, index) => (
                                <p style={{ fontSize: "16px", fontFamily: "'Funnel Display', sans-serif" }} key={index}>•  {rule.trim()}</p>
                            ))}
                        </div>
                    </div>
                </Container>
            </ThemeProvider>


        </>
    )
}

export default EventDetail