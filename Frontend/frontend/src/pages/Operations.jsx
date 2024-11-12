import React from 'react';
import { useState ,useEffect} from "react";
import CompteInfoPopup from '../sous_pages/CompteInfoPopup'
import CompteEditPopup from '../sous_pages/CompteEditPopup'
import Swal from "sweetalert2";
import axios from 'axios'
import Navbar from '../Components/Navbar';
import NavbarE from '../Components/NavbarE';

const Operations = () => {
  useEffect(()=>{
    loadUsers()
},[]);
const [ope,setOpe]=useState([])

const loadUsers=async()=>{
  const result=await axios.get("http://localhost:8080/api/oper");
  setOpe(result.data);
}


useEffect(()=>{
  loadAcc()
},[]);
const [acc,setAcc]=useState([])

const loadAcc=async()=>{
const result=await axios.get("http://localhost:8080/api/compte");
setAcc(result.data);
}








    




  const [showCompte,setShowCompte]=useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showRet,setShowRet]=useState(false);
  const [showVer,setShowVer]=useState(false);
  const [clients, setClients] = useState([]);
  const [Comptes, setComptes] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedCompte, setSelectedCompte] = useState("");
  const [solde, setSolde] = useState(0);
  const [decouvert, setDecouvert] = useState(0);
  const [taux, setTaux] = useState(0);
  // Fonction pour ouvrir et fermer le modal versement
  const handleOpenModelVer=()=>setShowVer(true);
  const handleCloseModelVer=()=>setShowVer(false);
  ////////////////////////////////////////
  // Fonction pour ouvrir et fermer le modal virement
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
////////////////////////////////////////////////////
// Fonction pour ouvrir et fermer le modal retrait
  const handleOpenModelRet=()=>setShowRet(true);
  const handleCloseModelRet=()=>setShowRet(false);
  // Fonction pour ouvrir et fermer la consultation compte
  const [showInfoPopup, setShowInfoPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);

  useEffect(() => {
    // Simuler une requête pour obtenir la liste des clients
    const fetchClients = async () => {
        const data = [
            { id: 1, nom: "Client 1" },
            { id: 2, nom: "Client 2" },
            { id: 3, nom: "Client 3" },
        ];
        setClients(data);
    };
    fetchClients();
}, []);

useEffect(() => {
    // Simuler une requête pour obtenir la liste des Comptes
    const fetchComptes = async () => {
        const data = [
            { id: 1, nom: "Courant" },
            { id: 2, nom: "Epargne" },
        ];
        setComptes(data);
    };
    fetchComptes();
}, []);


const handleOpenInfoPopup = (compte) => {
    setSelectedCompte(compte);
    setShowInfoPopup(true);
};

const handleOpenEditPopup = (compte) => {
    setSelectedCompte(compte);
    setShowEditPopup(true);
};

const handleSaveEdit = (updatedCompte) => {
    console.log("Compte mis à jour:", updatedCompte);
};

const handleDeleteCompte = (compteId) => {
    Swal.fire({
        title: "Êtes-vous sûr?",
        text: "Cette action est irréversible!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Oui, supprimer!",
    }).then((result) => {
        if (result.isConfirmed) {
            console.log("Compte supprimé:", compteId);
            Swal.fire("Supprimé!", "Le compte a été supprimé.", "success");
        }
    });
};




const handleSubmit = async (e) => {
  e.preventDefault();

  // Vérifie si tous les champs sont remplis
  if (!selectedClient || !selectedCompte || !solde) {
      Swal.fire({
          icon: 'warning',
          title: 'Erreur',
          text: 'Veuillez remplir tous les champs.',
      });
      return;
  }

  // Créer l'objet de transfert
  const transferData = {
      amount: solde,
      employeId: 1, // Remplace par l'ID de l'employé actuel
  };

  console.log("fromAccountId:", selectedClient);
  console.log("toAccountId:", selectedCompte);
  console.log("Data envoyé:", transferData);

  try {
      const response = await fetch(`http://localhost:8080/api/compte/${selectedClient}/transfer/${selectedCompte}`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(transferData),
      });

      if (response.ok) {
          const message = await response.text();
          Swal.fire({
              icon: 'success',
              title: 'Succès',
              text: "Transfert effectué : " + message,
          });
      } else {
          const errorMessage = await response.text();
          Swal.fire({
              icon: 'error',
              title: 'Erreur',
              text: "Erreur : " + errorMessage,
          });
      }
  } catch (error) {
      console.error("Erreur de connexion:", error);
      Swal.fire({
          icon: 'error',
          title: 'Erreur de connexion',
          text: "Erreur de connexion : " + error.message,
      });
  }
};

const handleSubmitVer = async (e) => {
  e.preventDefault();

  // Vérifier si les champs sont correctement remplis
  if (!selectedClient || !solde || solde <= 0) {
      Swal.fire({
          icon: 'warning',
          title: 'Erreur',
          text: 'Veuillez sélectionner un compte et entrer un montant de dépôt valide.',
      });
      return;
  }

  const depositData = {
      amount: solde,
      employeId: 1, // Utilise l'ID de l'employé actuel (ou remplace par l'ID dynamique si nécessaire)
  };

  try {
      const response = await fetch(`http://localhost:8080/api/compte/${selectedClient}/deposit`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(depositData),
      });

      if (response.ok) {
          const message = await response.text();
          Swal.fire({
              icon: 'success',
              title: 'Succès',
              text: "Dépôt effectué : " + message,
          });
      } else {
          const errorMessage = await response.text();
          Swal.fire({
              icon: 'error',
              title: 'Erreur',
              text: "Erreur : " + errorMessage,
          });
      }
  } catch (error) {
      console.error("Erreur de connexion:", error);
      Swal.fire({
          icon: 'error',
          title: 'Erreur de connexion',
          text: "Erreur de connexion : " + error.message,
      });
  }
};

const handleSubmitRet = async (e) => {
  e.preventDefault();

  // Vérifier si les champs sont correctement remplis
  if (!selectedClient || !solde || solde <= 0) {
      Swal.fire({
          icon: 'warning',
          title: 'Erreur',
          text: 'Veuillez sélectionner un compte et entrer un montant de retrait valide.',
      });
      return;
  }

  const withdrawData = {
      amount: solde,
      employeId: 1, // Utilise l'ID de l'employé actuel (ou remplace par l'ID dynamique si nécessaire)
  };

  try {
      const response = await fetch(`http://localhost:8080/api/compte/${selectedClient}/withdraw`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(withdrawData),
      });

      if (response.ok) {
          const message = await response.text();
          Swal.fire({
              icon: 'success',
              title: 'Succès',
              text: "Retrait effectué : " + message,
          });
      } else {
          const errorMessage = await response.text();
          Swal.fire({
              icon: 'error',
              title: 'Erreur',
              text: "Erreur : " + errorMessage,
          });
      }
  } catch (error) {
      console.error("Erreur de connexion:", error);
      Swal.fire({
          icon: 'error',
          title: 'Erreur de connexion',
          text: "Erreur de connexion : " + error.message,
      });
  }
};

  return (
    <>
    <NavbarE/>
    <div className="flex justify-end">
            {/* Bouton pour ouvrir le modal */}
            <button
                className="p-2 my-12 mx-12 rounded-full text-white font-bold bg-blue-500 group transition-all duration-500 hover:bg-blue-600 flex items-center"
                onClick={handleOpenModal}
            >
                <span className="mr-2">Realiser un virement</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                    />
                </svg>
            </button>
            <button
                className="p-2 my-12 mx-12 rounded-full text-white font-bold bg-blue-500 group transition-all duration-500 hover:bg-blue-600 flex items-center"
                onClick={handleOpenModelVer}
            >
                <span className="mr-2">Realiser un Versement</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                    />
                </svg>
            </button>
            <button
                className="p-2 my-12 mx-12 rounded-full text-white font-bold bg-blue-500 group transition-all duration-500 hover:bg-blue-600 flex items-center"
                onClick={handleOpenModelRet}
            >
                <span className="mr-2">Realiser un Retrait</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                    />
                </svg>
            </button>

            {showRet && (
               <div className="flex justify-end">
               {/* Bouton pour ouvrir le modal */}
               
   
               {/* Modal */}
               {showRet && (
                   <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                       <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
                           <h2 className="text-lg font-bold mb-4">Realiser un retrait</h2>
                           <form onSubmit={handleSubmitRet}>
                               {/* Sélectionnez un client */}
                               <div className="mb-4">
                                   <label className="block text-gray-700 font-bold mb-2">
                                       Sélectionnez un Compte
                                   </label>
                                   <select
                                       className="w-full p-2 border rounded-lg"
                                       value={selectedClient}
                                       onChange={(e) => setSelectedClient(e.target.value)}
                                   >
                                       <option value="">-- Choisissez un compte credit --</option>
                                       {acc.map((client) => (
                                           <option key={client.id} value={client.id}>
                                               {client.codeCompte}
                                           </option>
                                       ))}
                                   </select>
                               </div>
   
                               
                               {/* Champ pour le solde */}
                               <div className="mb-4">
                                   <label className="block text-gray-700 font-bold mb-2">
                                       Solde
                                   </label>
                                   <input
                                       type="number"
                                       step="0.01"
                                       className="w-full p-2 border rounded-lg"
                                       placeholder="Entrez le solde"
                                       value={solde}
                                       onChange={(e) => setSolde(parseFloat(e.target.value))}
                                   />
                               </div>
   
                               {/* Boutons du formulaire */}
                               <div className="flex justify-end">
                                   <button
                                       type="button"
                                       className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
                                       onClick={handleCloseModelRet}
                                   >
                                       Annuler
                                   </button>
                                   <button
                                       type="submit"
                                       className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                   >
                                       Ajouter
                                   </button>
                               </div>
                           </form>
                       </div>
                   </div>
               )}
           </div>
            )}
            {/* Modal */}
            {showModal && (
               <div className="flex justify-end">
               {/* Bouton pour ouvrir le modal */}
              
   
               {/* Modal */}
               {showModal && (
                   <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                       <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
                           <h2 className="text-lg font-bold mb-4">Realiser un Virement</h2>
                           <form onSubmit={handleSubmit}>
                               {/* Sélectionnez un client */}
                               <div className="mb-4">
                                   <label className="block text-gray-700 font-bold mb-2">
                                       Sélectionnez un Compte
                                   </label>
                                   <select
                                       className="w-full p-2 border rounded-lg"
                                       value={selectedClient}
                                       onChange={(e) => setSelectedClient(e.target.value)}
                                   >
                                       <option value="">-- Choisissez un compte credit --</option>
                                       {acc.map((client) => (
                                           <option key={client.id} value={client.id}>
                                               {client.codeCompte}
                                           </option>
                                       ))}
                                   </select>
                               </div>
   
                               {/* Sélectionnez le type de compte */}
                               <div className="mb-4">
                                   <label className="block text-gray-700 font-bold mb-2">
                                   Sélectionnez un Compte
                                   </label>
                                   <select
                                       className="w-full p-2 border rounded-lg"
                                       value={selectedCompte}
                                       onChange={(e) => setSelectedCompte(e.target.value)}
                                   >
                                       <option value="">-- Choisissez un compte debit --</option>
                                       {acc.map((client) => (
                                           <option key={client.id} value={client.id}>
                                               {client.codeCompte}
                                           </option>
                                       ))}
                                   </select>
                               </div>
                               {/* Champ pour le solde */}
                               <div className="mb-4">
                                   <label className="block text-gray-700 font-bold mb-2">
                                       Solde
                                   </label>
                                   <input
                                       type="number"
                                       step="0.01"
                                       className="w-full p-2 border rounded-lg"
                                       placeholder="Entrez le solde"
                                       value={solde}
                                       onChange={(e) => setSolde(parseFloat(e.target.value))}
                                   />
                               </div>
   
                               {/* Boutons du formulaire */}
                               <div className="flex justify-end">
                                   <button
                                       type="button"
                                       className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
                                       onClick={handleCloseModal}
                                   >
                                       Annuler
                                   </button>
                                   <button
                                       type="submit"
                                       className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                   >
                                       Ajouter
                                   </button>
                               </div>
                           </form>
                       </div>
                   </div>
               )}
           </div>
            )}

{showVer && (
               <div className="flex justify-end">
               {/* Bouton pour ouvrir le modal */}
             
   
               {/* Modal */}
               {showVer && (
                   <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                       <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
                           <h2 className="text-lg font-bold mb-4">Realiser un versement</h2>
                           <form onSubmit={handleSubmitVer}>
                               {/* Sélectionnez un client */}
                               <div className="mb-4">
                                   <label className="block text-gray-700 font-bold mb-2">
                                       Sélectionnez un Compte
                                   </label>
                                   <select
                                       className="w-full p-2 border rounded-lg"
                                       value={selectedClient}
                                       onChange={(e) => setSelectedClient(e.target.value)}
                                   >
                                       <option value="">-- Choisissez un compte credit --</option>
                                       {acc.map((client) => (
                                           <option key={client.id} value={client.id}>
                                               {client.codeCompte}
                                           </option>
                                       ))}
                                   </select>
                               </div>
   
                               
                               {/* Champ pour le solde */}
                               <div className="mb-4">
                                   <label className="block text-gray-700 font-bold mb-2">
                                       Solde
                                   </label>
                                   <input
                                       type="number"
                                       step="0.01"
                                       className="w-full p-2 border rounded-lg"
                                       placeholder="Entrez le solde"
                                       value={solde}
                                       onChange={(e) => setSolde(parseFloat(e.target.value))}
                                   />
                               </div>
   
                               {/* Boutons du formulaire */}
                               <div className="flex justify-end">
                                   <button
                                       type="button"
                                       className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
                                       onClick={handleCloseModelVer}
                                   >
                                       Annuler
                                   </button>
                                   <button
                                       type="submit"
                                       className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                   >
                                       Ajouter
                                   </button>
                               </div>
                           </form>
                       </div>
                   </div>
               )}
           </div>
            )}
        </div>

    <div className="flex flex-col  w-[85%] mx-auto">
      <div className="overflow-x-auto">
        <div className="min-w-full inline-block align-middle">
          <div className="overflow-hidden border rounded-lg border-gray-300">
            <table className="min-w-full rounded-xl">
              <thead>
                <tr className=" bg-gray-800 text-white">
                  
                  <th
                    scope="col"
                    className="p-5 text-left text-sm leading-6 font-semibold  capitalize"
                  >
                    Code d'operation
                  </th>
                  <th
                    scope="col"
                    className="p-5 text-left text-sm leading-6 font-semibold  capitalize"
                  >
                    date d'operation
                  </th>
                  <th
                    scope="col"
                    className="p-5 text-left text-sm leading-6 font-semibold  capitalize"
                  >
                    montant
                  </th>
                  <th
                    scope="col"
                    className="p-5 text-left text-sm leading-6 font-semibold  capitalize"
                  >
                    Nom d'employe
                  </th>
                  <th
                    scope="col"
                    className="p-5 text-left text-sm leading-6 font-semibold  capitalize"
                  >
                    type
                  </th>
                 
                  <th
                    scope="col"
                    className="p-5 text-left text-sm leading-6 font-semibold  capitalize"
                  >
                    Action
                  </th>
                 
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
  {ope.map((item, index) => (
    <tr key={index}>
      <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
        {item.numeroOperacion}
      </td>

      <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
        {/* Si item.employe est un objet, afficher une propriété spécifique */}
        {item.dateOperation}
      </td>

      <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
        {item.montant}
      </td>

      <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
      {item.employe ? item.employe.nomEmploye : 'N/A'}
      </td>
      <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
      {item.type}
      </td>
     
      <td className="p-5 flex gap-2">
        
        <button
          className="p-2 rounded-full bg-white group transition-all duration-500 hover:bg-red-600 flex items-center"
          onClick={() => handleDeleteCompte(item.id)}
        >
          <svg className="w-5 h-5 text-red-500 group-hover:text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M6 7v10h8V7H6zm8-3V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v1H2v2h16V4h-4z" />
          </svg>
        </button>
      </td>
    </tr>
  ))}
</tbody>
            </table>
          </div>
          {showInfoPopup && (
                <CompteInfoPopup compte={selectedCompte} onClose={() => setShowInfoPopup(false)} />
            )}

            {showEditPopup && (
                <CompteEditPopup
                    compte={selectedCompte}
                    onClose={() => setShowEditPopup(false)}
                    onSave={handleSaveEdit}
                />
            )}
        </div>
      </div>
    </div>
    </>
  );
};



export default Operations;
