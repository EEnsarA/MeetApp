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
                <Container maxWidth="xl" >
                    <div className='eventDetailMainDiv'>
                        <div className='eventDetailDiv'>
                            <div>
                                <span className='eventDetailEventName'>{event.eventName}</span>
                            </div>
                            <div className='eventDetailLocationDiv'>
                                <Link style={{ textDecoration: "none" }}>
                                    <FaLocationDot size={12} /><span className='eventDetailLocationSpan'>{event.location}</span>
                                </Link>
                                <FaRegCalendar size={12} /><span className='eventDetailDateSpanHead'>{formatDateTimeTR(event.startDate)} - {formatDateTimeTR(event.endDate)}</span>
                            </div>
                            <div className='eventDetailImageDiv'>
                                <img className='eventDetailImage' src={`${import.meta.env.VITE_API_URL}${event.imageUrl}`} alt="" />
                            </div>
                            <hr />
                            <div className='eventDetailDescDiv'>
                                <p className='eventDetailDescHeader'>
                                    Etkinliğe Dair
                                </p>
                                <p className='eventDetailDescSpan'>{event.eventDescription}</p>
                            </div>
                            <div className='eventDetailDateDiv'>
                                <p className='eventDetailDateSpan'>
                                    Etkinlik Takvimi
                                </p>
                                <div className='eventDetailTicketDiv'>
                                    <Ticket event={event} />
                                </div>
                            </div>
                            <div className='eventDetailRuleDiv'>
                                <p className='eventDetailRuleHeader'>
                                    Etkinlik Kuralları
                                </p>
                                {event?.rules?.substring(1).split("-").map((rule, index) => (
                                    <p className='eventDetailRule' key={index}>•  {rule.trim()}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </Container>
            </ThemeProvider>


        </>
    )
}

export default EventDetail