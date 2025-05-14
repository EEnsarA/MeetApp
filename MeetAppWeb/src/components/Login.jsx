import React, { useState } from 'react'
import { TbHexagonLetterM } from "react-icons/tb";
import { useFormik } from "formik";
import { RiErrorWarningFill } from "react-icons/ri";
import { loginFormSchema } from '../schemas/LoginFormSchema';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import { IoWarning } from "react-icons/io5";


function Login() {


  const dispatch = useDispatch();

  const [errMessage, setErrMessage] = useState();

  const submit = async (values, action) => {
    const user = {
      "emailOrUserName": values.emailOrUserName,
      "password": values.password,
    };

    try {
      const resultAction = await dispatch(login(user));

      if (login.fulfilled.match(resultAction)) {
        console.log("Giriş Yapıldı");
        window.location.href = "/home";

      }
      else if (login.rejected.match(resultAction)) {
        console.log("Giriş Hatası:", resultAction.payload);
        setErrMessage(resultAction.payload.message);
      }
      else if (login.pending.match(resultAction.payload)) {
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
      emailOrUserName: "",
      password: "",

    },
    validationSchema: loginFormSchema,
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
            <label className='loginLabels'>E-posta veya Kullanıcı Adı</label>
            <div>
              <input className='loginInput' type='text' placeholder='E-posta,Kullanıcı adı' id='emailOrUserName' onChange={handleChange} value={values.emailOrUserName} />
              {errors.emailOrUserName && <span className='registerError'><RiErrorWarningFill size={12} style={{ margin: "3px" }} />{errors.emailOrUserName}</span>}
            </div>
          </div>
          <div className='passwordDiv'>
            <label className='loginLabels'>Şifre</label>
            <div>
              <input className='loginInput' type="password" placeholder='Şifre' id='password' value={values.password} onChange={handleChange} />
              {errors.password && <span className='registerError'><RiErrorWarningFill size={12} style={{ margin: "3px" }} />{errors.password}</span>}
            </div>
          </div>
        </div>
        <div className='loginButtonDiv'>
          <button type='submit' className='loginButton' onSubmit={handleSubmit}>Giriş Yap</button>
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

export default Login