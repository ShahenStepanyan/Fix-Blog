import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from "./login/Login";
import Home from "./pages/Home/Home";
import Create from "./pages/Create/Create";
import Update from "./pages/Update/Update";
import Read from "./pages/Read/Read";
import Profile from "./pages/MyProfile/Profile";


function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/home' element={<Home />}></Route>
            <Route path='/create' element={<Create />}></Route>
            <Route path='/update/:id' element={<Update />}></Route>
            <Route path='/read/:id' element={<Read />}></Route>
            <Route path='/profile' element={<Profile/>}></Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App