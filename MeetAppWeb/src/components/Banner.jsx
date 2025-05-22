import React from 'react'
import Grid from '@mui/material/Grid';


function Banner() {
    return (
        <>

            <div style={{ padding: "2rem" }}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 6, md: 6 }}>
                        <div className='bannerTextDiv'>
                            <h1 className='bannerHeader'>İlgi alanlarını arkadaşlığa dönüştüren, insan odaklı platform</h1>
                            <div>
                                <p className='bannerSpan'>
                                    Hayatına yeni bir renk kat! Ortak ilgi alanlarına sahip insanlarla bağlantı kur, yeni arkadaşlar ve deneyimler edin , ve binlerce kullanıcıyla buluşma şansı yakala , eğlenceye katılmak için şimdi ilgi alanlarına göre etkinlik ara !
                                </p>
                                <button onClick={() => { window.location.href = "/category/tüm-kategoriler/0"; }} className='bannerButton'>Etkinlik Bul</button>
                            </div>
                        </div>
                    </Grid>
                    <Grid size={{ xs: 6, md: 6 }}>
                        <div>
                            <div style={{ height: "100%" }}>
                                <img src="images/banner1.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderTopLeftRadius: "8px", borderBottomLeftRadius: "8px" }} />
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default Banner