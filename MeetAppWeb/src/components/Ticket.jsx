import React from 'react'
import { sliceDateTime } from '../helpers/stringHelpers';
import { FaRegClock } from "react-icons/fa";
import { Link } from 'react-router-dom';

function Ticket(props) {
    const event = props.event;
    console.log(event);
    const eventDate = sliceDateTime(event.startDate);
    console.log(eventDate);

    return (
        <>
            <Link style={{ textDecoration: "none" }}>
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
                </div>
            </Link>
        </>
    )
}

export default Ticket