import { useState } from 'react'
import { Routes, Route } from "react-router-dom"
import './css/App.css'
import HomePage from './pages/HomePage'
import NavBar from './components/NavBar'
import LoginPage from './pages/LoginPage'
import Footer from './components/Footer'
import EventDetail from './pages/EventDetail'
import EventPage from './pages/EventPage'
import CartPage from './pages/CartPage'


function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<LoginPage />}></Route>
        <Route path='/accounts/:entry' element={<LoginPage />}></Route>
        <Route path='/home' element={<HomePage />}></Route>
        <Route path='/events/:eventId' element={<EventDetail />}></Route>
        <Route path='/category/:catName/:catId' element={<EventPage />}></Route>
        <Route path='/user-cart' element={<CartPage />}></Route>
      </Routes>
      {/* <Footer /> */}
    </>
  )
}

export default App
