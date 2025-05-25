import React, { useEffect } from 'react'
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
    Typography
} from '@mui/material';
import dayjs from "dayjs";
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../redux/authSlice';

function AdminUserPage() {
    const dispatch = useDispatch();
    const { users } = useSelector((store) => store.authInfo);

    useEffect(() => {
        dispatch(getAllUsers());
    }, [])

    useEffect(() => {
        console.log(users)
    }, [users])

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
                                        { label: 'id', width: 80 },
                                        { label: 'Adı Soyadı', width: 150 },
                                        { label: 'Kullanıcı Adı', width: 100 },
                                        { label: 'E-posta adresi', width: 100 },
                                        { label: 'Konum', width: 120 },
                                        { label: 'Oluşturulduğu Tarih', width: 180 },
                                        { label: 'Role', width: 100 },
                                        { label: 'Ayarlar', width: 140 },
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
                                {users?.map((u) => (
                                    <TableRow
                                        key={u.id}
                                        sx={{
                                            backgroundColor: '#f9f9f9',
                                            '& > *': {
                                                py: 1,
                                                px: 1,
                                            }
                                        }}
                                    >
                                        <TableCell>{u.id}</TableCell>
                                        <TableCell>{u.fullName}</TableCell>
                                        <TableCell>{u.userName}</TableCell>
                                        <TableCell>{u.email}</TableCell>
                                        <TableCell>{u.location}</TableCell>
                                        <TableCell>{dayjs(u.createdTime).format("DD.MM.YYYY")}</TableCell>
                                        <TableCell>{u.role ? "Admin" : 'User'}</TableCell>
                                        <TableCell>
                                            <div style={{ display: 'flex', alignItems: "center", gap: "8px" }}>
                                                <button className='adminEditButton'>Edit</button>
                                                <button className='adminDeleteButton'>Delete</button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            </ThemeProvider>

        </>
    )
}

export default AdminUserPage