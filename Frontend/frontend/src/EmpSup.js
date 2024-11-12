import './App.css';
import ListCompte from './pages/ListCompte'
import Navbar from './Components/Navbar';
import NavbarES from './Components/NavbarES'
import { Routes , Route } from 'react-router-dom';
import Clients from './pages/Clients';
import Comptes from './pages/Comptes';
import Employes from './pages/Employes';
import Operations from './pages/Operations';
import Groups from './pages/Groups';
import Login from './pages/Login';
function EmpSup() {
    return (
     <>
     <NavbarES/>
     
      <Routes>
        <Route path='/employes' element={<Employes/>}/>
        <Route path='/groups' element={<Groups/>}/>
      </Routes>
     </>
    );
  }
  
  export default EmpSup;
