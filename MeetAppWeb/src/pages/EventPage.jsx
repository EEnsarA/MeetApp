import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import Container from '@mui/material/Container';
import { Menu, ThemeProvider } from "@mui/material";
import { customContainer } from '../helpers/customWidgets';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { clearEvents, clearEventsByCat, getAllEvents, getEventsByCategoryId } from '../redux/eventSlice';
import EventCard from '../components/EventCard';
import { getAllCategories } from '../redux/categorySlice';
import { BiSolidCategory } from "react-icons/bi";
import { FaRegCalendar } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdSend } from "react-icons/io";
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import dayjs from 'dayjs';


function EventPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { events, eventsByCat, loading, errMessage } = useSelector((store) => store.eventList);

    const { categories } = useSelector((store) => store.categoryList)
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [selectedDate, setSelectedDate] = useState("Tüm Tarihler");
    const [selectedCity, setSelectedCity] = useState(0);
    const [filteredEvents, setFilteredEvents] = useState(null);

    const cities = [
        { id: 1, city: "Adana" },
        { id: 2, city: "Adıyaman" },
        { id: 3, city: "Afyonkarahisar" },
        { id: 4, city: "Ağrı" },
        { id: 5, city: "Amasya" },
        { id: 6, city: "Ankara" },
        { id: 7, city: "Antalya" },
        { id: 8, city: "Artvin" },
        { id: 9, city: "Aydın" },
        { id: 10, city: "Balıkesir" },
        { id: 11, city: "Bilecik" },
        { id: 12, city: "Bingöl" },
        { id: 13, city: "Bitlis" },
        { id: 14, city: "Bolu" },
        { id: 15, city: "Burdur" },
        { id: 16, city: "Bursa" },
        { id: 17, city: "Çanakkale" },
        { id: 18, city: "Çankırı" },
        { id: 19, city: "Çorum" },
        { id: 20, city: "Denizli" },
        { id: 21, city: "Diyarbakır" },
        { id: 22, city: "Edirne" },
        { id: 23, city: "Elazığ" },
        { id: 24, city: "Erzincan" },
        { id: 25, city: "Erzurum" },
        { id: 26, city: "Eskişehir" },
        { id: 27, city: "Gaziantep" },
        { id: 28, city: "Giresun" },
        { id: 29, city: "Gümüşhane" },
        { id: 30, city: "Hakkari" },
        { id: 31, city: "Hatay" },
        { id: 32, city: "Isparta" },
        { id: 33, city: "Mersin" },
        { id: 34, city: "İstanbul" },
        { id: 35, city: "İzmir" },
        { id: 36, city: "Kars" },
        { id: 37, city: "Kastamonu" },
        { id: 38, city: "Kayseri" },
        { id: 39, city: "Kırklareli" },
        { id: 40, city: "Kırşehir" },
        { id: 41, city: "Kocaeli" },
        { id: 42, city: "Konya" },
        { id: 43, city: "Kütahya" },
        { id: 44, city: "Malatya" },
        { id: 45, city: "Manisa" },
        { id: 46, city: "Kahramanmaraş" },
        { id: 47, city: "Mardin" },
        { id: 48, city: "Muğla" },
        { id: 49, city: "Muş" },
        { id: 50, city: "Nevşehir" },
        { id: 51, city: "Niğde" },
        { id: 52, city: "Ordu" },
        { id: 53, city: "Rize" },
        { id: 54, city: "Sakarya" },
        { id: 55, city: "Samsun" },
        { id: 56, city: "Siirt" },
        { id: 57, city: "Sinop" },
        { id: 58, city: "Sivas" },
        { id: 59, city: "Tekirdağ" },
        { id: 60, city: "Tokat" },
        { id: 61, city: "Trabzon" },
        { id: 62, city: "Tunceli" },
        { id: 63, city: "Şanlıurfa" },
        { id: 64, city: "Uşak" },
        { id: 65, city: "Van" },
        { id: 66, city: "Yozgat" },
        { id: 67, city: "Zonguldak" },
        { id: 68, city: "Aksaray" },
        { id: 69, city: "Bayburt" },
        { id: 70, city: "Karaman" },
        { id: 71, city: "Kırıkkale" },
        { id: 72, city: "Batman" },
        { id: 73, city: "Şırnak" },
        { id: 74, city: "Bartın" },
        { id: 75, city: "Ardahan" },
        { id: 76, city: "Iğdır" },
        { id: 77, city: "Yalova" },
        { id: 78, city: "Karabük" },
        { id: 79, city: "Kilis" },
        { id: 80, city: "Osmaniye" },
        { id: 81, city: "Düzce" }
    ];

    const menuPropsCat = {
        select: {
            MenuProps: {
                PaperProps: {
                    style: {
                        maxHeight: 300, // açılır menü yüksekliği
                    },
                },
            },
        },
        input: {
            startAdornment: (
                <InputAdornment position="start">
                    <BiSolidCategory />
                </InputAdornment>
            ),
        },
    }
    const menuPropsDate = {
        select: {
            MenuProps: {
                PaperProps: {
                    style: {
                        maxHeight: 300, // açılır menü yüksekliği
                    },
                },
            },
        },
        input: {
            startAdornment: (
                <InputAdornment position="start">
                    <FaRegCalendar />
                </InputAdornment>
            ),
        },
    }
    const menuPropsCity = {
        select: {
            MenuProps: {
                PaperProps: {
                    style: {
                        maxHeight: 300, // açılır menü yüksekliği
                    },
                },
            },
        },
        input: {
            startAdornment: (
                <InputAdornment position="start">
                    <FaLocationDot />
                </InputAdornment>
            ),
        },
    }

    const params = useParams();


    const catId = params.catId;
    const catName = params.catName;


    useEffect(() => {
        if (catId != 0)  // önceden kategori seçilmişse 
        {
            dispatch(clearEvents())
            dispatch(getEventsByCategoryId(catId));
        }
        else {
            dispatch(clearEventsByCat())
            dispatch(getAllEvents());
        }
        if (catName != "tüm-kategoriler") {
            setSelectedCategory(catId);
            console.log(selectedCategory);
        }
        dispatch(getAllCategories());
    }, [catId])




    useEffect(() => {
        console.log(events);
    }, [events])

    useEffect(() => {
        console.log(eventsByCat);
        console.log(filteredEvents);
    }, [eventsByCat])


    const filterEvents = async () => {

        let baseEvents = [];

        if (selectedCategory != 0) {

            let situatedCategory = categories.find((c) => c.id == selectedCategory);
            if (window.location.href != `/category/${situatedCategory.categoryName.replace(" ", "-").toLowerCase()}/${selectedCategory}`) {
                navigate(`/category/${situatedCategory.categoryName.replace(" ", "-").toLowerCase()}/${selectedCategory}`);
            }

            dispatch(clearEventsByCat());
            const resultAction = await dispatch(getEventsByCategoryId(selectedCategory));

            if (getEventsByCategoryId.fulfilled.match(resultAction)) {
                baseEvents = resultAction.payload;
            } else {
                console.error("Kategoriye göre etkinlik getirme başarısız.");
                return;
            }
        } else {
            navigate("/category/tüm-kategoriler/0");
            dispatch(clearEvents());
            const resultAction = await dispatch(getAllEvents());
            if (getAllEvents.fulfilled.match(resultAction)) {
                baseEvents = resultAction.payload;
            } else {
                console.error("Tüm etkinlikleri getirme başarısız.");
                return;
            }
        }

        let filtered = [...baseEvents];
        console.log("filtered başta :", filtered);
        // şehir filtresi
        if (selectedCity != 0) {
            const situatedCity = cities.find((c) => c.id == selectedCity);
            filtered = filtered.filter(e => e.city == situatedCity.city)
            console.log("filtered şehir filtresi sonunda :", filtered);
        }

        // tarih filtresi
        if (selectedDate != "Tüm Tarihler") {
            const now = dayjs();
            const today = dayjs();

            if (selectedDate === "Bu Hafta") {
                const endOfWeek = now.endOf('week');
                filtered = filtered.filter(e => {
                    const eventDate = dayjs(e.startDate);
                    return eventDate.isAfter(today.subtract(1, 'day')) && (eventDate.isBefore(endOfWeek) || eventDate.isSame(endOfWeek));
                });
            } else if (selectedDate === "Bu Ay") {
                const endOfMonth = now.endOf('month');
                filtered = filtered.filter(e => {
                    const eventDate = dayjs(e.startDate);
                    return eventDate.isAfter(today.subtract(1, 'day')) && (eventDate.isBefore(endOfMonth) || eventDate.isSame(endOfMonth));
                });
            } else if (selectedDate === "Önümüzdeki Ay") {
                const startOfNextMonth = now.add(1, 'month').startOf('month');
                const endOfNextMonth = now.add(1, 'month').endOf('month');
                filtered = filtered.filter(e => {
                    const eventDate = dayjs(e.startDate);
                    return (eventDate.isAfter(startOfNextMonth) || eventDate.isSame(startOfNextMonth)) &&
                        (eventDate.isBefore(endOfNextMonth) || eventDate.isSame(endOfNextMonth));
                });
            }
        }

        setFilteredEvents(filtered);
        // tüm kategoriler , tüm şehirler , tüm tarihler aratılırsa
        if (selectedCategory == 0 && selectedCity == 0 && selectedDate == "Tüm Tarihler") {
            setFilteredEvents(null);
            navigate("/category/tüm-kategoriler/0");
        }


    }


    return (
        <>
            <NavBar />
            <ThemeProvider theme={customContainer}>
                <Container maxWidth="xl">
                    <div style={{ marginTop: "2rem" }}>

                        {filteredEvents &&
                            <p>  {filteredEvents?.length} kadar sonuç bulundu.</p>
                        }
                        <div className='selectMainDiv'>
                            <div className='selectMiddleDiv'>
                                <div className='selectInnerDiv'>
                                    <TextField select sx={{ width: "200px" }}
                                        size='small'
                                        value={selectedCategory}
                                        defaultValue="Tüm Kategoriler"
                                        label="Kategoriler"
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        slotProps={menuPropsCat}

                                    >
                                        <MenuItem value={0}>Tüm Kategoriler</MenuItem>
                                        {categories?.map((c) => (
                                            <MenuItem key={c.id} value={c.id}>{c.categoryName}</MenuItem>
                                        ))}

                                    </TextField>
                                </div>
                                <div className='selectInnerDiv'>
                                    <TextField select sx={{ width: "200px" }}
                                        size='small'
                                        value={selectedDate}
                                        defaultValue="Tüm Tarihler"
                                        label="Tarihler"
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                        slotProps={menuPropsDate}
                                    >
                                        <MenuItem value={"Tüm Tarihler"}>Tüm Tarihler</MenuItem>
                                        <MenuItem value={"Bu Hafta"}>Bu Hafta</MenuItem>
                                        <MenuItem value={"Bu Ay"}>Bu Ay</MenuItem>
                                        <MenuItem value={"Önümüzdeki Ay"}>Önümüzdeki Ay</MenuItem>

                                    </TextField>
                                </div>
                                <div className='selectInnerDiv'>
                                    <TextField sx={{ width: "200px" }}
                                        size='small'
                                        select
                                        value={selectedCity}
                                        label="Şehirler"
                                        defaultValue={0}
                                        onChange={(e) => setSelectedCity(e.target.value)}
                                        slotProps={menuPropsCity}
                                    >
                                        <MenuItem value={0}>Tüm Şehirler</MenuItem>
                                        {cities.map((c) => (
                                            <MenuItem key={c.id} value={c.id}>{c.city}</MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                            </div>
                            <div>
                                <Button onClick={filterEvents} sx={{ backgroundColor: "#015c68", fontFamily: "'Funnel Display',  sans-serif" }} variant="contained" endIcon={<IoMdSend />}>Ara</Button>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className='categoryEventCardsDiv'>
                        {(filteredEvents ?? (eventsByCat.length > 0 ? eventsByCat : events))?.map((e) => (
                            <EventCard events={e} key={e.id} />
                        ))}
                    </div>
                </Container>
            </ThemeProvider>
        </>
    )
}

export default EventPage