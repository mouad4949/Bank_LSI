import React from 'react';
import { useState ,useEffect} from "react";
import CompteInfoPopup from '../sous_pages/CompteInfoPopup'
import CompteEditPopup from '../sous_pages/CompteEditPopup'
import Swal from "sweetalert2";

const Employes = () => {
  // Données pour le tableau
  const data = [
    { company: 'Louis Vuitton', userId: '20010510', type: 'Customer', industry: 'Accessories', employe:'said',date:'20/11/2024',solde:1000},
    { company: 'Apple', userId: '20010511', type: 'Partner', industry: 'Electronics' , employe:'said',date:'20/11/2024',solde:1000},
    { company: 'Johnson', userId: '20010512', type: 'Customer', industry: 'Telecommunications', employe:'said',date:'20/11/2024' ,solde:1000},
    { company: 'Starbucks', userId: '20010513', type: 'Reseller', industry: 'Retail' , employe:'said',date:'20/11/2024',solde:1000},
  ];

  const [showCompte,setShowCompte]=useState(false);
  const [showModal, setShowModal] = useState(false);
  const [clients, setClients] = useState([]);
  const [Comptes, setComptes] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedCompte, setSelectedCompte] = useState("");
  const [solde, setSolde] = useState(0);
  const [decouvert, setDecouvert] = useState(0);
  const [taux, setTaux] = useState(0);
  // Fonction pour ouvrir et fermer le modal
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

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




const handleSubmit = (e) => {
    e.preventDefault();
    const compteData = {
        clientId: selectedClient,
        typeCompte: selectedCompte,
        solde,
        decouvert: selectedCompte === "1" ? decouvert : null,
        taux: selectedCompte === "2" ? taux : null,
    };
    console.log("Compte ajouté :", compteData);
    handleCloseModal();
};

  return (
    <>
    <div className="flex justify-end">
            {/* Bouton pour ouvrir le modal */}
            <button
                className="p-2 my-12 mx-12 rounded-full text-white font-bold bg-blue-500 group transition-all duration-500 hover:bg-blue-600 flex items-center"
                onClick={handleOpenModal}
            >
                <span className="mr-2">Ajouter un Compte</span>
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

            {/* Modal */}
            {showModal && (
               <div className="flex justify-end">
               {/* Bouton pour ouvrir le modal */}
               <button
                   className="p-2 my-12 mx-12 rounded-full text-white font-bold bg-blue-500 group transition-all duration-500 hover:bg-blue-600 flex items-center"
                   onClick={handleOpenModal}
               >
                   <span className="mr-2">Ajouter un Compte</span>
                   <svg
                       xmlns="http://www.w3.org/2000/svg"
                       fill="none"
                       viewBox="0 0 24 24"
                       strokeWidth={2}
                       stroke="currentColor"
                       className="w-5 h-5"
                   >
                       <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                   </svg>
               </button>
   
               {/* Modal */}
               {showModal && (
                   <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                       <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
                           <h2 className="text-lg font-bold mb-4">Ajouter un Compte</h2>
                           <form onSubmit={handleSubmit}>
                               {/* Sélectionnez un client */}
                               <div className="mb-4">
                                   <label className="block text-gray-700 font-bold mb-2">
                                       Sélectionnez un Client
                                   </label>
                                   <select
                                       className="w-full p-2 border rounded-lg"
                                       value={selectedClient}
                                       onChange={(e) => setSelectedClient(e.target.value)}
                                   >
                                       <option value="">-- Choisissez un client --</option>
                                       {clients.map((client) => (
                                           <option key={client.id} value={client.id}>
                                               {client.nom}
                                           </option>
                                       ))}
                                   </select>
                               </div>
   
                               {/* Sélectionnez le type de compte */}
                               <div className="mb-4">
                                   <label className="block text-gray-700 font-bold mb-2">
                                       Type de compte
                                   </label>
                                   <select
                                       className="w-full p-2 border rounded-lg"
                                       value={selectedCompte}
                                       onChange={(e) => setSelectedCompte(e.target.value)}
                                   >
                                       <option value="">-- Choisissez un Type --</option>
                                       {Comptes.map((Compte) => (
                                           <option key={Compte.id} value={Compte.id.toString()}>
                                               {Compte.nom}
                                           </option>
                                       ))}
                                   </select>
                               </div>
   
                               {/* Champ spécifique pour le compte Courant */}
                               {selectedCompte === "1" && (
                                   <div className="mb-4">
                                       <label className="block text-gray-700 font-bold mb-2">
                                           Découvert
                                       </label>
                                       <input
                                           type="number"
                                           step="0.01"
                                           className="w-full p-2 border rounded-lg"
                                           placeholder="Entrez le découvert"
                                           value={decouvert}
                                           onChange={(e) => setDecouvert(parseFloat(e.target.value))}
                                       />
                                   </div>
                               )}
   
                               {/* Champ spécifique pour le compte Epargne */}
                               {selectedCompte === "2" && (
                                   <div className="mb-4">
                                       <label className="block text-gray-700 font-bold mb-2">
                                           Taux
                                       </label>
                                       <input
                                           type="number"
                                           step="0.01"
                                           className="w-full p-2 border rounded-lg"
                                           placeholder="Entrez le taux"
                                           value={taux}
                                           onChange={(e) => setTaux(parseFloat(e.target.value))}
                                       />
                                   </div>
                               )}
   
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
        </div>

    <div className="flex flex-col  w-[65%] mx-auto">
      <div className="overflow-x-auto">
        <div className="min-w-full inline-block align-middle">
          <div className="overflow-hidden border rounded-lg border-gray-300">
            <table className="min-w-full rounded-xl">
              <thead>
                <tr className="bg-gray-800 text-white">
                  
                  <th
                    scope="col"
                    className="p-5 text-left text-sm leading-6 font-semibold  capitalize"
                  >
                    Nom Client
                  </th>
                  <th
                    scope="col"
                    className="p-5 text-left text-sm leading-6 font-semibold  capitalize"
                  >
                    Nom Employé
                  </th>
                  <th
                    scope="col"
                    className="p-5 text-left text-sm leading-6 font-semibold  capitalize"
                  >
                    Date de creation
                  </th>
                  <th
                    scope="col"
                    className="p-5 text-left text-sm leading-6 font-semibold  capitalize"
                  >
                    Type Compte
                  </th>
                  <th
                    scope="col"
                    className="p-5 text-left text-sm leading-6 font-semibold  capitalize flex justify-center"
                  >
                    Action
                  </th>
                 
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {data.map((item, index) => (
                  <tr key={index}>
                    
                    <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                      {item.company}
                    </td>
                    
                    <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                      {item.employe}
                    </td>
                    <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                      {item.date}
                    </td>
                    <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                      {item.type}
                    </td>
                    <td className="p-5 flex gap-2 flex justify-center">
                                    <button
                                        className="p-2 rounded-full bg-white group transition-all duration-500 hover:bg-blue-600 flex items-center"
                                        onClick={() => handleOpenInfoPopup(item)}
                                    >
                                       <svg className="w-5 h-5 text-blue-500 group-hover:text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 3.5C5 3.5 1 10 1 10s4 6.5 9 6.5 9-6.5 9-6.5-4-6.5-9-6.5zm0 10a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z" />
                        </svg>
                                    </button>
                                    <button
                                        className="p-2 rounded-full bg-white group transition-all duration-500 hover:bg-green-600 flex items-center"
                                        onClick={() => handleOpenEditPopup(item)}
                                    >
                                         <svg className="w-5 h-5 text-green-500 group-hover:text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M17.414 2.586a2 2 0 0 0-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 0 0 0-2.828zM5 14a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H5z" />
                        </svg>
                                    </button>
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



export default Employes;
