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
    Typography
} from '@mui/material';
import dayjs from "dayjs";
import { useDispatch, useSelector } from 'react-redux';
import { approveUser, clearApprovedMessage, clearDeletedUser, deleteUser, getAllUsers } from '../redux/authSlice';
import { Checkbox } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function AdminUserPage() {
    const dispatch = useDispatch();
    const { users, approvedMessage, deletedUser } = useSelector((store) => store.authInfo);

    const [editedUsers, setEditedUsers] = useState([]);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [open, setOpen] = useState(false);


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    useEffect(() => {
        dispatch(getAllUsers());
    }, [])

    useEffect(() => {
        const nonAdminUsers = users.filter((u) => u.role != 1);
        setEditedUsers(nonAdminUsers);
    }, [users])

    const handleCheckboxChange = (userId, checked) => {
        setEditedUsers((prev) =>
            prev.map((u) =>
                u.id === userId ? { ...u, isApproved: checked } : u
            )
        );
    };

    const removeUser = (u) => {
        const userId = u.id;
        dispatch(deleteUser(userId));
    }

    const handleEditClick = async (user) => {
        const approveInfo = {
            "userId": user.id,
            "isApproved": user.isApproved
        };
        console.log(approveInfo);
        dispatch(approveUser(approveInfo));
    };

    useEffect(() => {
        if (approvedMessage) {
            setOpen(true);
            setSnackbarMessage(approvedMessage.message);
            dispatch(clearApprovedMessage());
        }
    }, [approvedMessage])

    useEffect(() => {
        if (deletedUser) {
            setOpen(true);
            setSnackbarMessage(`id : ${deletedUser.id} olan kullanıcı silindi`);
            dispatch(getAllUsers());
            dispatch(clearDeletedUser());
        }
    }, [deletedUser])

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
                                        { label: "Onay", width: 80 },
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
                                {editedUsers?.map((u) => (
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
                                            <Checkbox
                                                checked={u.isApproved}
                                                onChange={(e) => handleCheckboxChange(u.id, e.target.checked)}
                                                color="success"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <div style={{ display: 'flex', alignItems: "center", gap: "8px" }}>
                                                <button onClick={() => handleEditClick(u)} className='adminEditButton'>Kaydet</button>
                                                <button onClick={() => removeUser(u)} className='adminDeleteButton'>Delete</button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Snackbar
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                        autoHideDuration={3000}
                    >
                        <Alert
                            onClose={handleClose}
                            severity="info"
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

export default AdminUserPage