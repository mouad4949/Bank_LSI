import logo from './logo.svg';
import './App.css';
import ListCompte from './pages/ListCompte'
import Navbar from './Components/Navbar';
import { Routes , Route } from 'react-router-dom';
import Clients from './pages/Clients';
import Comptes from './pages/Comptes';
import Employes from './pages/Employes';
import Operations from './pages/Operations';
import Groups from './pages/Groups';

function App() {
  return (
   <>
   <Navbar/>
    <Routes>
      <Route path='/clients' element={<Clients/>}/>
      <Route path='/compts' element={<Comptes/>}/>
      <Route path='/employes' element={<Employes/>}/>
      <Route path='/operations' element={<Operations/>}/>
      <Route path='/groups' element={<Groups/>}/>


    </Routes>
   </>
  );
}

export default App;
