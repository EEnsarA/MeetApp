import React, { useState } from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Grid,
    InputAdornment
} from '@mui/material';
import { FaCreditCard, FaLock, FaUser, FaCalendarAlt } from 'react-icons/fa';
import { useFormik } from "formik";
import { paymentFormSchema } from '../schemas/PaymentFormSchema';
import { RiErrorWarningFill } from 'react-icons/ri';

function PaymentModal({ open, onClose, confirmOrder }) {


    const submit = (values, action) => {
        console.log("submit");
        confirmOrder();
        action.resetForm();
    }


    const { values, errors, handleChange, handleSubmit } = useFormik({
        initialValues: {
            cardName: "",
            cardNumber: "",
            expiryDate: "",
            cvv: "",
        },
        validationSchema: paymentFormSchema,
        onSubmit: submit
    })

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="md"
            slotProps={{
                paper: {
                    sx: {
                        minHeight: '450px',
                        borderRadius: 3,
                        padding: 4,
                        boxShadow: 6,
                    }
                }
            }}
        >
            <DialogTitle className='cartEventPayHeader'>Ödeme Bilgileri</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent >
                    <Grid container sx={{ paddingTop: "1rem" }}>
                        <div style={{ paddingTop: "1rem" }}>
                            <TextField
                                sx={{ width: "800px" }}
                                fullWidth
                                label="İsim Soyisim"
                                size="small"
                                variant="outlined"
                                type='text'
                                id="cardName"
                                value={values.cardName}
                                onChange={handleChange}
                                slotProps={{
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
                                                <FaUser />
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                            />
                            {errors.cardName && <span className='registerError'><RiErrorWarningFill size={12} style={{ margin: "3px" }} />{errors.cardName}</span>}
                        </div>
                        <div style={{ paddingTop: "1rem" }}>
                            <TextField
                                sx={{ width: "800px" }}
                                fullWidth
                                label="Kart Numarası"
                                size="small"
                                variant="outlined"
                                id="cardNumber"
                                type="text"
                                value={values.cardNumber}
                                onChange={handleChange}
                                slotProps={{
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
                                                <FaCreditCard />
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                            />
                            {errors.cardNumber && <span className='registerError'><RiErrorWarningFill size={12} style={{ margin: "3px" }} />{errors.cardNumber}</span>}
                        </div>
                        <div style={{ paddingTop: "1rem" }}>
                            <TextField
                                fullWidth
                                label="Son Kullanma (AA/YY)"
                                size="small"
                                variant="outlined"
                                id="expiryDate"
                                type="text"
                                value={values.expiryDate}
                                onChange={handleChange}
                                slotProps={{
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
                                                <FaCalendarAlt />
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                            />
                            {errors.expiryDate && <span className='registerError'><RiErrorWarningFill size={12} style={{ margin: "3px" }} />{errors.expiryDate}</span>}
                        </div>
                        <div style={{ paddingTop: "1rem", marginLeft: "1rem" }}>
                            <TextField
                                fullWidth
                                label="CVV"
                                size="small"
                                variant="outlined"
                                id="cvv"
                                value={values.cvv}
                                onChange={handleChange}
                                slotProps={{
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
                                                <FaLock />
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                            />
                            {errors.cvv && <span className='registerError'><RiErrorWarningFill size={12} style={{ margin: "3px" }} />{errors.cvv}</span>}
                        </div>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ px: 2, pb: 2 }}>
                    <button className='buyCancelButton' onClick={onClose} >İptal</button>
                    <button type='submit' onSubmit={handleSubmit} className='bannerButton' >
                        Ödemeyi Onayla
                    </button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default PaymentModal;