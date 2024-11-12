import React from 'react'
import './App.css';
import ListCompte from './pages/ListCompte'
import NavbarE from './Components/NavbarE';
import { Routes , Route } from 'react-router-dom';
import Clients from './pages/Clients';
import Comptes from './pages/Comptes';
import Employes from './pages/Employes';
import Operations from './pages/Operations';
import Groups from './pages/Groups';
import Login from './pages/Login';
function Emp() {
  return (
    <>
    <NavbarE/>
    <Routes>
    <Route path='/clients' element={<Clients/>}/>
    <Route path='/compts' element={<Comptes/>}/>
    <Route path='/operations' element={<Operations/>}/>
  </Routes>
  </>
  )
  
}

export default Emp
