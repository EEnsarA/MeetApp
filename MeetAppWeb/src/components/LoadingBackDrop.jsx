import React from 'react'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux';

function LoadingBackDrop() {
    const authLoading = useSelector((state) => state.authInfo.loading);
    const eventLoading = useSelector((state) => state.eventList?.loading);
    const cartLoading = useSelector((state) => state.userCart?.loading);
    const categoryLoading = useSelector((state) => state.categoryList?.loading);


    const isLoading = authLoading || eventLoading || cartLoading || categoryLoading;

    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

export default LoadingBackDrop;