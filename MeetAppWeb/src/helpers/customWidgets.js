import { createTheme, ThemeProvider } from "@mui/material";

export const customContainer = createTheme({
    components: {
        MuiContainer: {
            styleOverrides: {
                root: {
                    "&.MuiContainer-maxWidthXl": {
                        maxWidth: "1800px",
                    }
                }
            }
        }
    }
});

export const eventDetailContainer = createTheme({
    components: {
        MuiContainer: {
            styleOverrides: {
                root: {
                    "&.MuiContainer-maxWidthXl": {
                        maxWidth: "1600px",
                    }
                }
            }
        }
    }
});


export const cities = [
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