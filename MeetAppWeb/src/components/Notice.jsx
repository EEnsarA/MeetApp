import React from 'react'
import Grid from '@mui/material/Grid';

function Notice(props) {
    const notice = props.notices;
    return (
        <>
            <div className='noticeMainDiv'>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 6, md: 6 }}>
                        <div className='noticeTextDiv'>
                            <h1 className='noticeHeader'>{notice?.noticeHeader}</h1>
                            <div>
                                <p className='noticeSpan'>
                                    {notice?.noticeDetail}
                                </p>
                                <button onClick={() => { window.location.href = "/category/tüm-kategoriler/0"; }} className='bannerButton'>Etkinlik Bul</button>
                            </div>
                        </div>
                    </Grid>
                    <Grid size={{ xs: 6, md: 6 }}>
                        <div>
                            <div style={{ height: "100%" }}>
                                <img src="images/banner3.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderTopLeftRadius: "8px", borderBottomLeftRadius: "8px" }} />
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default Notice