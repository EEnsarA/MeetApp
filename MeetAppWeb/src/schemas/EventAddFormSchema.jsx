import * as yup from "yup"

export const eventAddFormSchema = yup.object().shape({
    eventName: yup.string()
        .required('Etkinlik ismi zorunludur')
        .min(3, 'En az 3 karakter olmalı'),

    eventDescription: yup.string()
        .required('Açıklama zorunludur')
        .min(10, 'Açıklama en az 10 karakter olmalı'),

    city: yup.string()
        .required('Şehir seçimi zorunludur'),

    country: yup.string()
        .required('Ülke bilgisi zorunludur'),

    location: yup.string()
        .required('Lokasyon zorunludur'),

    startDate: yup.date()
        .required('Başlangıç tarihi zorunludur')
        .typeError('Geçerli bir tarih girin'),

    endDate: yup.date()
        .required('Bitiş tarihi zorunludur')
        .min(yup.ref('startDate'), 'Bitiş tarihi başlangıçtan sonra olmalıdır')
        .typeError('Geçerli bir tarih girin'),

    numberOfTickets: yup.number()
        .required('Bilet sayısı zorunludur')
        .min(1, 'En az 1 bilet olmalı'),

    ticketPrice: yup.number()
        .required('Bilet fiyatı zorunludur')
        .min(0, 'Bilet fiyatı negatif olamaz'),

    isOnSale: yup.boolean(),

    isOnBanner: yup.boolean(),

    rules: yup.string()
        .required('Kurallar kısmı zorunludur')
        .min(5, 'Kurallar en az 5 karakter olmalı'),

    image: yup.mixed()
        .required('Etkinlik görseli zorunludur')
        .test(
            'fileType',
            'Yalnızca resim dosyaları yüklenebilir',
            (value) => value && ['image/jpeg', 'image/png', 'image/webp'].includes(value.type)
        ),

    categoryIds: yup.array()
        .of(yup.number())
        .min(1, 'En az bir kategori seçilmelidir')
        .required('Kategori seçimi zorunludur'),
})
