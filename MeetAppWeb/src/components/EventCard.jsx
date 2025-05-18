import React from 'react'
import Grid from '@mui/material/Grid';
import { createDescSummary, formatDateTimeTR } from '../helpers/stringHelpers';
import { FaRegCalendar } from "react-icons/fa6";
import { Link } from 'react-router-dom';

function EventCard(props) {

    const event = props.events;

    return (
        <>
            <Link to={"/events/" + event.id} style={{ textDecoration: "none" }}>
                <div className='eventCardDiv'>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 6, md: 6 }}>
                            <div style={{ height: "100%" }}>
                                <img src={`${import.meta.env.VITE_API_URL}${event.imageUrl}`} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderTopLeftRadius: "8px", borderBottomLeftRadius: "8px" }} />
                            </div>
                        </Grid>
                        <Grid size={{ xs: 6, md: 6 }}>
                            <div className='eventCardTextDiv'>
                                <span className='eventCardHeader'>{event.eventName}</span>
                                <p className='eventCardDesc'>
                                    {createDescSummary(event.eventDescription, 200)}
                                </p>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <FaRegCalendar className='eventCardTimeIcon' />
                                    <span className='eventCardTime'>{formatDateTimeTR(event.startDate)}</span>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </Link>
        </>
    )
}

export default EventCard