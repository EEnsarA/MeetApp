import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import Container from '@mui/material/Container';
import { ThemeProvider } from "@mui/material";
import { customContainer } from '../helpers/customWidgets';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getEventsByCategoryId } from '../redux/eventSlice';
import EventCard from '../components/EventCard';
import { getAllCategories } from '../redux/categorySlice';
import Form from 'react-bootstrap/Form';
import { BiSolidCategory } from "react-icons/bi";
import { FaRegCalendar } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";

function EventPage() {

    const dispatch = useDispatch();
    const { events, loading, errMessage } = useSelector((store) => store.eventList);

    const { categories } = useSelector((store) => store.categoryList)
    const [selectedCategory, setSelectedCategory] = useState("");



    const params = useParams();

    const catId = params.catId;
    console.log(catId);

    useEffect(() => {
        dispatch(getEventsByCategoryId(catId));
        dispatch(getAllCategories());
    }, [])

    useEffect(() => {
        console.log(events);
    }, [events])

    return (
        <>
            <NavBar />
            <ThemeProvider theme={customContainer}>
                <Container maxWidth="xl">
                    <div style={{ marginTop: "2rem" }}>
                        <p>{events?.length} kadar sonuç bulundu.</p>
                        <div className='selectMainDiv'>
                            <div className='selectInnerDiv'>
                                <BiSolidCategory className='selectInnerIcon' />
                                <Form.Select className='select'>
                                    <option>Tüm Kategoriler</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Select>
                            </div>
                            <div className='selectInnerDiv'>
                                <FaRegCalendar className='selectInnerIcon' />
                                <Form.Select className='select'>
                                    <option>Tüm Tarihler</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Select>
                            </div>
                            <div className='selectInnerDiv'>
                                <FaLocationDot className='selectInnerIcon' />
                                <Form.Select className='select'>
                                    <option>Tüm Türkiye</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Select>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className='categoryEventCardsDiv'>
                        {events?.map((e) => (
                            <EventCard events={e} key={e.id} />
                        ))}
                    </div>
                </Container>
            </ThemeProvider>
        </>
    )
}

export default EventPage