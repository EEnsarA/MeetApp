import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import Container from '@mui/material/Container';
import { cities, customContainer } from '../helpers/customWidgets';
import { ThemeProvider } from "@mui/material";
import { FaUpload } from 'react-icons/fa';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import { IoTicket } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FaRegMoneyBillAlt } from "react-icons/fa";
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel } from '@mui/material';
import { MdLibraryAdd } from "react-icons/md";
import { useFormik } from "formik";
import { eventAddFormSchema } from '../schemas/EventAddFormSchema';
import { RiErrorWarningFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../redux/categorySlice';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import {
    FormControl,
    InputLabel,
    OutlinedInput,
} from '@mui/material';
import { addEvent, getEventById, updateEvent } from '../redux/eventSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { getWeather } from '../hooks/getWeather';

function AdminEventAddPage() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { categories, loading, errMessage } = useSelector((store) => store.categoryList);
    const { addedEvent, event, updatedEvent } = useSelector((store) => store.eventList);
    const [allCategories, setAllCategories] = useState([]);
    const [weather, setWeather] = useState(null);

    const params = useParams();
    const eventId = params.eventId;

    const submit = (values, action) => {
        console.log("hello !")
        console.log(values.categoryIds);
        const eventInfo = {
            eventName: values.eventName,
            eventDescription: values.eventDescription,
            city: values.city,
            country: "Türkiye",
            location: values.location,
            startDate: values.startDate,
            endDate: values.endDate,
            numberOfTickets: values.numberOfTickets,
            ticketPrice: values.ticketPrice,
            isOnSale: values.isOnSale,
            isOnBanner: values.isOnBanner,
            rules: values.rules,
            image: values.image,
            categoryIds: values.categoryIds
        }

        console.log(eventInfo)
        dispatch(addEvent(eventInfo));
        action.resetForm();

    }



    useEffect(() => {
        if (addedEvent) {
            console.log(addedEvent);
            navigate("/admin/events");
        }
    }, [addedEvent])



    useEffect(() => {
        dispatch(getAllCategories());
    }, [])
    useEffect(() => {
        setAllCategories(categories);
    }, [categories])



    const { values, errors, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: {
            eventName: "",
            eventDescription: "",
            city: "",
            country: "Türkiye",
            location: "",
            startDate: dayjs().toISOString(),
            endDate: dayjs().toISOString(),
            numberOfTickets: 0,
            ticketPrice: 0,
            isOnSale: false,
            isOnBanner: false,
            rules: "",
            image: undefined,
            categoryIds: [],
        },
        validationSchema: eventAddFormSchema,
        onSubmit: submit
    });


    useEffect(() => {
        if (values.city) {

            const fetchWeather = async () => {
                try {
                    const weatherData = await getWeather(values.city);
                    console.log(weatherData)
                    setWeather(weatherData);
                } catch (err) {
                    console.error("Hava durumu alınamadı:", err);
                    setWeather(null);
                }
            };
            fetchWeather();
        }
    }, [values.city]);




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


    return (
        <>
            <NavBar />
            <ThemeProvider theme={customContainer}>
                <Container maxWidth="xl">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <div style={{ display: "flex", justifyContent: "space-between", maxHeight: "220px", padding: "12px" }}>
                                <div>
                                    <h2>Etkinlik Ekle</h2>
                                </div>
                                <div>
                                    {weather && weather.success && (
                                        <>
                                            <h3>{weather.city} için 5 günlük hava durumu böyle </h3>
                                            {weather && weather.success && (
                                                <div style={{ display: "flex", flexDirection: "row", gap: "1rem", marginTop: "1rem" }}>
                                                    {weather.result.slice(0, 5).map((day, index) => (
                                                        <div
                                                            key={index}
                                                            style={{
                                                                display: "flex",
                                                                alignItems: "center",
                                                                gap: "1rem",
                                                                padding: "1rem",
                                                                border: "1px solid #ddd",
                                                                borderRadius: "8px",
                                                                backgroundColor: "#f9f9f9"
                                                            }}
                                                        >
                                                            <img
                                                                src={day.icon}
                                                                alt={day.description}
                                                                style={{ width: 48, height: 48 }}
                                                            />
                                                            <div style={{ display: "flex", flexDirection: "column" }}>
                                                                <div><strong>{day.day} - {day.date}</strong></div>
                                                                <div>{day.description}</div>
                                                                <div><strong>{day.degree}°C</strong></div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                            <div style={{ padding: "1rem" }}>
                                <TextField
                                    label="Etkinlik İsmi"
                                    id='eventName'
                                    value={values.eventName}
                                    onChange={handleChange}
                                    fullWidth
                                    size="small"
                                />
                                {errors.eventName && <span className='registerError'><RiErrorWarningFill size={12} style={{ margin: "3px" }} />{errors.eventName}</span>}
                                <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "row" }}>
                                    <div>
                                        <TextField
                                            select
                                            id='city'
                                            name="city"
                                            label="Şehir"
                                            value={values.city || ""}
                                            onChange={handleChange}
                                            sx={{ width: "200px", marginRight: "1rem" }}
                                            size="small"
                                            slotProps={menuPropsCity}
                                        >
                                            {cities.map((c) => (
                                                <MenuItem key={c.id} value={c.city}>{c.city}</MenuItem>
                                            ))}
                                        </TextField>
                                        {errors.city && <span className='registerError'><RiErrorWarningFill size={12} style={{ margin: "3px" }} />{errors.city}</span>}
                                    </div>
                                    <div>
                                        <TextField
                                            id="location"
                                            label="Tam Lokasyon"
                                            value={values.location}
                                            onChange={handleChange}
                                            size="small"
                                            slotProps={{
                                                startAdornment: (
                                                    <InputAdornment position='start'>
                                                        <FaLocationDot />
                                                    </InputAdornment>
                                                ),

                                            }}
                                        />
                                        {errors.location && <span className='registerError'><RiErrorWarningFill size={12} style={{ margin: "3px" }} />{errors.location}</span>}
                                    </div>
                                    <div style={{ marginLeft: "1rem" }}>
                                        <FormControl sx={{ minWidth: 240 }} size="small">
                                            <InputLabel id="categoryIds-label">Kategoriler</InputLabel>
                                            <Select
                                                labelId="categoryIds-label"
                                                id="categoryIds"
                                                name="categoryIds"
                                                multiple
                                                value={values.categoryIds}
                                                onChange={(e) => {
                                                    const selected = typeof e.target.value === 'string'
                                                        ? e.target.value.split(',').map(Number)
                                                        : e.target.value.map(Number);
                                                    setFieldValue('categoryIds', selected);
                                                }}
                                                input={<OutlinedInput label="Kategoriler" />}
                                                renderValue={(selected) => (
                                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                                                        {selected.map((id) => {
                                                            const category = allCategories.find(c => c.id === id);
                                                            return (
                                                                <Chip key={id} label={category?.categoryName || id} />
                                                            );
                                                        })}
                                                    </div>
                                                )}
                                                MenuProps={{
                                                    PaperProps: {
                                                        style: {
                                                            maxHeight: 300, // Açılır menü yüksekliği
                                                        },
                                                    },
                                                }}
                                            >
                                                {allCategories?.map((category) => (
                                                    <MenuItem key={category.id} value={category.id}>
                                                        {category.categoryName}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        {errors.categoryIds && <span className='registerError'><RiErrorWarningFill size={12} style={{ margin: "3px" }} />{errors.categoryIds}</span>}
                                    </div>
                                </div>
                                <div style={{ marginTop: "1.5rem" }}>
                                    <TextField
                                        id="eventDescription"
                                        label="Etkinlik Açıklama"
                                        value={values.eventDescription}
                                        onChange={handleChange}
                                        multiline
                                        rows={3}
                                        fullWidth
                                    />
                                    {errors.eventDescription && <span className='registerError'><RiErrorWarningFill size={12} style={{ margin: "3px" }} />{errors.eventDescription}</span>}
                                </div>

                                <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "row" }}>
                                    <div>
                                        <TextField
                                            id="startDate"
                                            name="startDate"
                                            label="Başlangıç Tarihi"
                                            type="datetime-local"
                                            value={dayjs(values.startDate).format("YYYY-MM-DDTHH:mm")}
                                            onChange={(e) => setFieldValue("startDate", dayjs(e.target.value).toISOString())}
                                            slotProps={{ shrink: true }}
                                            size="small"
                                            sx={{ minWidth: 250 }}
                                        />
                                        {errors.startDate && <span className='registerError'><RiErrorWarningFill size={12} style={{ margin: "3px" }} />{errors.startDate}</span>}
                                    </div>
                                    <div style={{ marginLeft: "1rem" }}>
                                        <TextField
                                            id="endDate"
                                            name="endDate"
                                            label="Bitiş Tarihi"
                                            type="datetime-local"
                                            value={dayjs(values.endDate).format("YYYY-MM-DDTHH:mm")}
                                            onChange={(e) => setFieldValue("endDate", dayjs(e.target.value).toISOString())}
                                            slotProps={{ shrink: true }}
                                            size="small"
                                            sx={{ minWidth: 250 }}
                                        />
                                        {errors.endDate && <span className='registerError'><RiErrorWarningFill size={12} style={{ margin: "3px" }} />{errors.endDate}</span>}
                                    </div>
                                </div>
                                <div style={{ marginTop: "1.5rem" }}>
                                    <TextField
                                        id="rules"
                                        label="Etkinlik Kuralları"
                                        value={values.rules}
                                        onChange={handleChange}
                                        multiline
                                        rows={2}
                                        fullWidth
                                    />
                                    {errors.rules && <span className='registerError'><RiErrorWarningFill size={12} style={{ margin: "3px" }} />{errors.rules}</span>}
                                </div>
                                <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
                                    <div style={{ display: "flex", flexDirection: "row" }}>
                                        <div>
                                            <TextField
                                                id="numberOfTickets"
                                                label="Bilet Sayısı"
                                                type="number"
                                                value={values.numberOfTickets}
                                                onChange={handleChange}
                                                size="small"
                                                slotProps={{
                                                    startAdornment: (
                                                        <InputAdornment position='start'>
                                                            <IoTicket />
                                                        </InputAdornment>
                                                    )
                                                }}
                                            />
                                            {errors.numberOfTickets && <span className='registerError'><RiErrorWarningFill size={12} style={{ margin: "3px" }} />{errors.numberOfTickets}</span>}
                                        </div>
                                        <div>
                                            <TextField
                                                id="ticketPrice"
                                                label="Bilet Fiyatı ₺"
                                                type="number"
                                                value={values.ticketPrice}
                                                onChange={handleChange}
                                                sx={{ width: "200px", marginLeft: "1rem" }}
                                                size="small"
                                                slotProps={{
                                                    startAdornment: (
                                                        <InputAdornment position='start'>
                                                            <FaRegMoneyBillAlt />
                                                        </InputAdornment>
                                                    )
                                                }}
                                            />
                                            {errors.ticketPrice && <span className='registerError'><RiErrorWarningFill size={12} style={{ margin: "3px" }} />{errors.ticketPrice}</span>}
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <div>
                                            <span>Satışta</span>
                                            <Checkbox
                                                id='isOnSale'
                                                checked={values.isOnSale}
                                                onChange={handleChange}
                                                value={values.isOnSale}
                                            />
                                            {errors.isOnSale && <span className='registerError'><RiErrorWarningFill size={12} style={{ margin: "3px" }} />{errors.isOnSale}</span>}



                                            <span>Afişte</span>
                                            <Checkbox
                                                id='isOnBanner'
                                                checked={values.isOnBanner}
                                                onChange={handleChange}
                                                value={values.isOnBanner}
                                            />
                                            {errors.isOnBanner && <span className='registerError'><RiErrorWarningFill size={12} style={{ margin: "3px" }} />{errors.isOnBanner}</span>}
                                        </div>


                                    </div>
                                </div>
                                <div style={{ marginTop: "1.5rem" }}>
                                    <input
                                        id="image"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setFieldValue("image", e.currentTarget.files[0])}
                                    />
                                    {errors.image && <span className='registerError'><RiErrorWarningFill size={12} style={{ margin: "3px" }} />{errors.image}</span>}
                                </div>
                            </div>
                        </div>
                        <div style={{ marginTop: "1rem", display: "flex", justifyContent: "flex-end" }}>
                            <button type='submit' className='adminAddEventButton'><MdLibraryAdd size={18} style={{ marginRight: "8px" }} />Etkinliği Kaydet</button>
                        </div>
                    </form>
                </Container>
            </ThemeProvider>
        </>
    )
}

export default AdminEventAddPage