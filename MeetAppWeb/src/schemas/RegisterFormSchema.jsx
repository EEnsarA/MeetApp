import * as yup from "yup";

export const registerFormSchema = yup.object().shape({
    email: yup.string().email("Lütfen geçerli bir e-posta adresi giriniz.").required("Bu bilginin doldurulması zorunludur"),
    password: yup.string().required("Bu bilginin doldurulması zorunludur.").min(5, "Şifre en az 5 ve en fazla 20 karakter içermelidir").max(20, "Şifre en az 5 ve en fazla 20 karakter içermelidir"),
    confirmPassword: yup.string().required("Bu bilginin doldurulması zorunludur.").min(5, "Şifre en az 5 ve en fazla 20 karakter içermelidir").max(20, "Şifre en az 5 ve en fazla 20 karakter içermelidir")
        .oneOf([yup.ref('password', yup.password)], "Şifreler Eşleşmiyor."),
    firstName: yup.string().required("Bu bilginin doldurulması zorunludur"),
    lastName: yup.string().required("Bu bilginin doldurulması zorunludur"),
    userName: yup.string().required("Bu bilginin doldurulması zorunludur"),
    location: yup.string().required("Bu bilginin doldurulması zorunludur")
})
