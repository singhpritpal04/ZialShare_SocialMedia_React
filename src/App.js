import Login from './components/Login';
import Home from "./container/Home";
import React from 'react'
import {BrowserRouter ,Routes, Route, useNavigate} from 'react-router-dom'
export default function App(){
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/*' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
    </BrowserRouter>
    
  );
}
