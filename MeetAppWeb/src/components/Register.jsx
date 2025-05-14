import React, { useState } from 'react'
import { TbHexagonLetterM } from "react-icons/tb";
import { RiErrorWarningFill } from "react-icons/ri";
import { useFormik } from "formik";
import { registerFormSchema } from '../schemas/RegisterFormSchema';
import { useDispatch } from 'react-redux';
import { register } from '../redux/authSlice';
import { IoWarning } from "react-icons/io5";

function Register() {

  const dispatch = useDispatch();

  const [errMessage, setErrMessage] = useState();

  const submit = async (values, action) => {
    const user = {
      "firstName": values.firstName,
      "lastName": values.lastName,
      "email": values.email,
      "password": values.password,
      "confirmPassword": values.confirmPassword,
      "userName": values.userName,
      "location": values.location
    };

    try {
      const resultAction = await dispatch(register(user));

      if (register.fulfilled.match(resultAction)) {
        console.log("Kayıt Başarılı:", resultAction.payload);
        window.location.href = "/accounts/login";
      }
      else if (register.rejected.match(resultAction)) {
        console.log("Kayıt Hatası:", resultAction.payload);
        setErrMessage(resultAction.payload.message)
      }
      else if (register.pending.match(resultAction.payload)) {
        console.log("Veri Bekleniyor..")
      }

      action.resetForm();
    }
    catch (error) {
      console.log("Unexpected error :", error)
    }
  }



  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      userName: "",
      location: "",
    },
    validationSchema: registerFormSchema,
    onSubmit: submit
  })

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='loginComDiv'>
          {errMessage &&
            <div className='serverAlert'>
              <span style={{}}><IoWarning style={{ marginRight: "5px" }} size={18} color='#e64e41' />
              </span>
              {errMessage}
            </div>
          }
          <div className='emailDiv'>
            <label className='loginLabels'>E-posta</label>
            <div>
              <input className='loginInput' type='email' placeholder='E-posta adresiniz' id='email' value={values.email} onChange={handleChange} />
              {errors.email && <span className='registerError'><RiErrorWarningFill size={12} style={{ margin: "3px" }} />{errors.email}</span>}
            </div>
          </div>
          <div className='registerInputDiv'>
            <label className='loginLabels'>Şifre</label>
            <div>
              <input className='loginInput' type="password" placeholder='Şifrenizi giriniz' id='password' value={values.password} onChange={handleChange} />
              {errors.password && <span className='registerError'><RiErrorWarningFill size={12} style={{ margin: "3px" }} />{errors.password}</span>}
            </div>
          </div>
          <div className='registerInputDiv'>
            <label className='loginLabels'>Şifre Tekrarı</label>
            <div>
              <input className='loginInput' type="password" id='confirmPassword' placeholder='Şifrenizi tekrar giriniz' value={values.confirmPassword} onChange={handleChange} />
              {errors.confirmPassword && <span className='registerError'><RiErrorWarningFill size={12} style={{ margin: "3px" }} />{errors.confirmPassword}</span>}
            </div>
          </div>
          <div className='registerInputDiv'>
            <label className='loginLabels'>Ad</label>
            <div>
              <input className='loginInput' type="text" placeholder='Adınız' id='firstName' value={values.firstName} onChange={handleChange} />
              {errors.firstName && <span className='registerError'><RiErrorWarningFill size={12} style={{ margin: "3px" }} />{errors.firstName}</span>}
            </div>
          </div>
          <div className='registerInputDiv'>
            <label className='loginLabels'>Soyad</label>
            <div>
              <input className='loginInput' type="text" placeholder='Soyadınız' id='lastName' value={values.lastName} onChange={handleChange} />
              {errors.lastName && <span className='registerError'><RiErrorWarningFill size={12} style={{ margin: "3px" }} />{errors.lastName}</span>}
            </div>
          </div>
          <div className='registerInputDiv'>
            <label className='loginLabels'>Kullanıcı Adı</label>
            <div>
              <input className='loginInput' type="text" placeholder='Kullanıcı adı' id='userName' value={values.userName} onChange={handleChange} />
              {errors.userName && <span className='registerError'><RiErrorWarningFill size={12} style={{ margin: "3px" }} />{errors.userName}</span>}
            </div>
          </div>
          <div className='registerInputDiv'>
            <label className='loginLabels'>Konum</label>
            <div>
              <input className='loginInput' type="text" placeholder='Konum' id='location' value={values.location} onChange={handleChange} />
              {errors.location && <span className='registerError'><RiErrorWarningFill size={12} style={{ margin: "3px" }} />{errors.location}</span>}
            </div>
          </div>
        </div>
        <div className='loginButtonDiv'>
          <button type='submit' className='loginButton'>Kaydol</button>
        </div>
        <div className='loginHrDiv'>
          <hr className='loginHr' />
          <span><TbHexagonLetterM fontSize={18} /></span>
          <hr className='loginHr' />
        </div>
      </form>
    </div>
  )
}

export default Register