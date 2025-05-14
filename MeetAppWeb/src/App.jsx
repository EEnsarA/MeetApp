import { useState } from 'react'
import { Routes, Route } from "react-router-dom"
import './css/App.css'
import HomePage from './pages/HomePage'
import NavBar from './components/NavBar'
import LoginPage from './pages/LoginPage'
import Footer from './components/Footer'


function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<LoginPage />}></Route>
        <Route path='/accounts/:entry' element={<LoginPage />}></Route>
        <Route path='/home' element={<HomePage />}></Route>
      </Routes>
      {/* <Footer /> */}
    </>
  )
}

export default App
