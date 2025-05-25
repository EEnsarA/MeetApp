import { useEffect, useState } from 'react'
import { Routes, Route } from "react-router-dom"
import './css/App.css'
import HomePage from './pages/HomePage'
import NavBar from './components/NavBar'
import LoginPage from './pages/LoginPage'
import Footer from './components/Footer'
import EventDetail from './pages/EventDetail'
import EventPage from './pages/EventPage'
import CartPage from './pages/CartPage'
import { useDispatch } from 'react-redux'
import { calculateCart, getUserCart } from './redux/cartSlice'
import AdminEventPage from './pages/AdminEventPage'
import AdminUserPage from './pages/AdminUserPage'
import AdminEventAddPage from './pages/AdminEventAddPage'
import AdminEventUpdatePage from './pages/AdminEventUpdatePage'



function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const sessionUser = sessionStorage.getItem("current_user");
    const currentUser = JSON.parse(sessionUser);
    console.log(currentUser);
    if (currentUser && currentUser.role != "Admin") {
      const userId = currentUser.nameid;
      dispatch(getUserCart(userId)).then(() => {
        dispatch(calculateCart());
      });
    }
  }, [])

  return (
    <>
      <div className='app-wrapper'>
        <div className='app-content'>
          <Routes>
            <Route path='/' element={<LoginPage />}></Route>
            <Route path='/accounts/:entry' element={<LoginPage />}></Route>
            <Route path='/home' element={<HomePage />}></Route>
            <Route path='/events/:eventId' element={<EventDetail />}></Route>
            <Route path='/category/:catName/:catId' element={<EventPage />}></Route>
            <Route path='/user-cart' element={<CartPage />}></Route>
            <Route path='/admin/events' element={<AdminEventPage />}></Route>
            <Route path='/admin/users' element={<AdminUserPage />}></Route>
            <Route path='/admin/events/add' element={<AdminEventAddPage />}></Route>
            <Route path='/admin/events/update/:eventId' element={<AdminEventUpdatePage />}></Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default App
