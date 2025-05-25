import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import Container from '@mui/material/Container';
import { customContainer } from '../helpers/customWidgets';
import { ThemeProvider } from "@mui/material";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import dayjs from "dayjs";
import { useDispatch, useSelector } from 'react-redux';
import { clearAddedEvent, clearRemovedEvent, clearUpdatedEvent, getAllEvents, removeEvent } from '../redux/eventSlice';
import { MdLibraryAdd } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function AdminEventPage() {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { events, loading, errMessage, removedEvent, addedEvent, updatedEvent } = useSelector((store) => store.eventList);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [open, setOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };


    useEffect(() => {
        dispatch(getAllEvents())
    }, [])

    useEffect(() => {
    }, [events])

    const deleteEvent = (eventId) => {
        dispatch(removeEvent(eventId));
        console.log(removedEvent);
    }
    useEffect(() => {
        if (removedEvent) {
            setOpen(true)
            setSnackbarMessage(`id:${removedEvent.id} olan etkinlik başarıyla silindi`)
            dispatch(getAllEvents())
            dispatch(clearRemovedEvent());
        }
    }, [removedEvent])

    useEffect(() => {
        if (addedEvent) {
            setOpen(true)
            setSnackbarMessage(`id:${addedEvent.id} olan etkinlik başarıyla eklendi`)
            dispatch(clearAddedEvent());
        }
    }, [addedEvent])

    useEffect(() => {
        if (updatedEvent) {
            setOpen(true)
            setSnackbarMessage(`id:${updatedEvent.id} olan etkinlik başarıyla güncellendi`)
            dispatch(clearUpdatedEvent());
        }
    }, [updatedEvent])

    return (
        <>
            <NavBar />
            <ThemeProvider theme={customContainer}>
                <Container maxWidth="xl">
                    <TableContainer component={Paper} sx={{ mt: 5, maxHeight: 900 }}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: '#2a2a2a' }}>
                                    {[
                                        { label: 'Görsel', width: 140 },
                                        { label: 'Etkinlik Adı', width: 150 },
                                        { label: 'Şehir', width: 100 },
                                        { label: 'Konum', width: 120 },
                                        { label: 'Tarih', width: 180 },
                                        { label: 'Bilet Sayısı', width: 100 },
                                        { label: 'Fiyat', width: 80 },
                                        { label: 'Satışta mı?', width: 100 },
                                        { label: 'Banner’da mı?', width: 120 },
                                        { label: 'Ayarlar', width: 140 }
                                    ].map((col) => (
                                        <TableCell
                                            key={col.label}
                                            sx={{
                                                minWidth: col.width,
                                                fontFamily: 'Funnel Display',
                                                fontWeight: 500,
                                                color: 'white', // burası önemli
                                                backgroundColor: '#2a2a2a' // her hücreye özel tekrar setle
                                            }}
                                        >
                                            {col.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {events?.map((event) => (
                                    <TableRow
                                        key={event.id}
                                        sx={{
                                            backgroundColor: '#f9f9f9',
                                            '& > *': {
                                                py: 1,
                                                px: 1,
                                            }
                                        }}
                                    >
                                        <TableCell>
                                            <img
                                                src={`${import.meta.env.VITE_API_URL}${event.imageUrl}`}
                                                alt={event.eventName}
                                                width="160"
                                                height="90"
                                                style={{ borderRadius: 4 }}
                                            />
                                        </TableCell>
                                        <TableCell>{event.eventName}</TableCell>
                                        <TableCell>{event.city}</TableCell>
                                        <TableCell>{event.location}</TableCell>
                                        <TableCell>
                                            {dayjs(event.startDate).format("DD.MM.YYYY")} - {dayjs(event.endDate).format("DD.MM.YYYY")}
                                        </TableCell>
                                        <TableCell>{event.numberOfTickets}</TableCell>
                                        <TableCell>{event.ticketPrice} ₺</TableCell>
                                        <TableCell>{event.isOnSale ? 'Evet' : 'Hayır'}</TableCell>
                                        <TableCell>{event.isOnBanner ? 'Evet' : 'Hayır'}</TableCell>
                                        <TableCell>
                                            <div style={{ display: 'flex', alignItems: "center", gap: "8px" }}>
                                                <button className='adminEditButton' onClick={() => { navigate(`/admin/events/update/${event.id}`) }}>Edit</button>
                                                <button onClick={() => { deleteEvent(event.id) }} className='adminDeleteButton'>Delete</button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div style={{ marginTop: "1rem", display: "flex", justifyContent: "flex-end" }}>

                        <button className='adminAddEventButton' onClick={() => { navigate("/admin/events/add") }}><MdLibraryAdd size={18} style={{ marginRight: "8px" }} />Yeni Etkinlik Ekle</button>
                    </div>
                    <Snackbar
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                        autoHideDuration={3000}
                    >
                        <Alert
                            onClose={handleClose}
                            severity={"info"}
                            variant="filled"
                            sx={{ width: '100%' }}
                        >
                            {snackbarMessage || "Hata oluştu."}
                        </Alert>
                    </Snackbar>
                </Container>
            </ThemeProvider>
        </>
    )
}

export default AdminEventPage