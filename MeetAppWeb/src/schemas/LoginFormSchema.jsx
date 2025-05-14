
import * as yup from "yup"

export const loginFormSchema = yup.object().shape({
    emailOrUserName: yup.string().required("E-posta ya da kullanıcı adınızı giriniz"),
    password: yup.string().required("Bu bilginin doldurulması zorunludur.").min(5, "Şifre en az 5 ve en fazla 20 karakter içermelidir").max(20, "Şifre en az 5 ve en fazla 20 karakter içermelidir"),
})