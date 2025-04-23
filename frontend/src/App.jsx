import { useState } from 'react'
import './App.css'
import RegisterForm from './Component/RegisterForm'
import Register from './page/Register'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './page/Login'
import Email from './page/Email'
import ToggleButton from './Component/ToggleButton'
// import AddProduct from './Component/AddProduct'
import Payment from './Component/Payment'
import PaymentCard from './Component/PaymentCard'
import Home from './Component/Home'
import Dashboard from './layout/Dashboard'
import OtpValidation from './Component/OtpValidation'
import DashboardCard from './Component/DashboardCard'
import HomeSlides from './Component/HomeSlides'

function App() {
  const [count, setCount] = useState(0)
  const showAllItems = true;

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Register />} path='/register' />
        <Route element={<Login />} path='/login' />
        <Route element={<ToggleButton />} path='/togglebutton' />
        <Route element={<Email />} path='/email' />
        {/* <Route element={<AddProduct />} path='/addproduct' /> */}
        <Route element={<Payment />} path='/payment' />
        <Route element={<PaymentCard />} path='/paymentcard' />
        <Route element={<Home />} path='/home' />


        <Route element={<DashboardCard />} path='/dashboardcard' />
        <Route element={<HomeSlides />} path='/homeslides' />


        <Route element={<Dashboard />} path='/dashboard' />
        <Route element={<OtpValidation />} path='/otpvalidation' />

      </Routes>
    </BrowserRouter>

  )
}

export default App
