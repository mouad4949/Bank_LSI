import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Emp from "./Emp";
import EmpSup from "./EmpSup";
import Employes from "./pages/Employes"
import Groups from "./pages/Groups";
import Clients from "./pages/Clients";
import Comptes from "./pages/Comptes";
import Operations from "./pages/Operations";
function App() {
  return (
   
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/employe" element={<Emp />} />
        <Route path="/employe-superieur" element={<EmpSup />} />
        <Route path="/employes" element={<Employes/>}/>
        <Route path="/groups" element={<Groups/>}/>
        <Route path="/clients" element={<Clients/>}/>
        <Route path="/compts" element={<Comptes/>}/>
        <Route path="/operations" element={<Operations/>}/>
      </Routes>
    
  );
}

export default App;
