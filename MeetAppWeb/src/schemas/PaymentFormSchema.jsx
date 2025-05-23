import * as yup from "yup"

export const paymentFormSchema = yup.object().shape({
    cardName: yup.string()
        .required("Kart sahibi adı gerekli")
        .matches(/^[a-zA-ZğüşöçıİĞÜŞÖÇ\s]+$/, "Sadece harf kullanabilirsiniz"),

    cardNumber: yup.string()
        .required("Kart numarası gerekli")
        .matches(/^\d{16}$/, "16 haneli geçerli bir kart numarası girin"),

    expiryDate: yup
        .string()
        .required("Son kullanma tarihi gerekli")
        .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Tarih MM/YY formatında olmalı"),

    cvv: yup
        .string()
        .required("CVV gerekli")
        .matches(/^\d{3}$/, "3 haneli geçerli bir CVV girin"),
})