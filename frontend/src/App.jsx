<<<<<<< HEAD
// Importing dependencies:
import React from 'react'
// React router dom:
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// Importing routes
import Login from './modules/authentication/Login/components/Login'
import Signup from './modules/authentication/Signup/components/Signup'
import Home from './modules/home/component/Home'
import NavBar from './modules/utils/navbar/NavBar'
import SubscriptionContainer from './modules/subscription/components/SubscriptionContainer'
=======
import { useState } from 'react'

// import './App.css'
<<<<<<< Updated upstream
>>>>>>> origin/main
=======
>>>>>>> 081d144c4c878dfd1a594f3e4f159c5c39e83e46
>>>>>>> Stashed changes

const App = () => {
  return (
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/subscription' element={<SubscriptionContainer/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App