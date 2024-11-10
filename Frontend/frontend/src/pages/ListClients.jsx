import React from 'react';
import { useState ,useEffect} from "react";
import Swal from 'sweetalert2';
const ListClients = () => {
  // Données pour le tableau
  const data = [
    { company: 'Louis Vuitton', userId: '20010510', type: 'Customer', industry: 'Accessories' },
    { company: 'Apple', userId: '20010511', type: 'Partner', industry: 'Electronics' },
    { company: 'Johnson', userId: '20010512', type: 'Customer', industry: 'Telecommunications' },
    { company: 'Starbucks', userId: '20010513', type: 'Reseller', industry: 'Retail' },
  ];
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const [showModal, setShowModal] = useState(false);
  const [showInfoPopup, setShowInfoPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log("Compte ajouté :");
    handleCloseModal();
};



// Ouverture des pop-ups
const handleOpenInfoPopup = (client) => {
  setSelectedClient(client);
  setShowInfoPopup(true);
};

const handleOpenEditPopup = (client) => {
  setSelectedClient(client);
  setShowEditPopup(true);
};

// Gestion de la sauvegarde des modifications
const handleSaveEditClient = (updatedClient) => {
  console.log("Client mis à jour:", updatedClient);
  setShowEditPopup(false);
};

// Suppression avec SweetAlert
const handleDeleteClient = (clientId) => {
  Swal.fire({
    title: 'Êtes-vous sûr?',
    text: "Cette action est irréversible!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Oui, supprimer!',
  }).then((result) => {
    if (result.isConfirmed) {
      console.log("Client supprimé:", clientId);
      Swal.fire('Supprimé!', 'Le client a été supprimé.', 'success');
    }
  });
};


  return (<>
          <div className="flex justify-end">
                  <button
                    className="p-2 my-12 mx-12 rounded-full text-white font-bold bg-blue-500 group transition-all duration-500 hover:bg-blue-600 flex items-center"    
                    onClick={handleOpenModal}
                    >
                    <span className="mr-2">Ajouter un Client</span>
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
                           <h2 className="text-lg font-bold mb-4">Ajouter un Client</h2>
                           <form onSubmit={handleSubmit}>
                               {/* Sélectionnez un client */}
                               <div className="mb-4">
                                   <label className="block text-gray-700 font-bold mb-2">
                                       Nom de CLIENT
                                   </label>
                                   <input
                                           type="text"
                                           step="0.01"
                                           className="w-full p-2 border rounded-lg"
                                           placeholder="Entrez le Nomdu client"
                                               
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
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="min-w-full inline-block align-middle">
          <div className="overflow-hidden border rounded-lg border-gray-300">
            <table className="min-w-full rounded-xl">
              <thead>
                <tr className="bg-gray-50">
                  <th
                    scope="col"
                    className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
                  >
                    Code Client
                  </th>
                  <th
                    scope="col"
                    className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
                  >
                    Nom Client
                  </th>
                  <th
                    scope="col"
                    className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
                  >
                    Action
                  </th>
                  <th
                    scope="col"
                    className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
                  >
                    Affecter Compte
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {data.map((item, index) => (
                  <tr key={index}>
                    <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                      {item.userId}
                    </td>
                    <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                      {item.company}
                    </td>
                    <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 flex gap-2">
                      {/* Bouton Vue */}
                      <button onClick={() => handleOpenInfoPopup(item)} className="p-2 rounded-full bg-white group transition-all duration-500 hover:bg-blue-600 flex items-center">
                        <svg className="w-5 h-5 text-blue-500 group-hover:text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 3.5C5 3.5 1 10 1 10s4 6.5 9 6.5 9-6.5 9-6.5-4-6.5-9-6.5zm0 10a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z" />
                        </svg>
                      </button>
                      {/* Bouton Édition */}
                      <button onClick={() => handleOpenEditPopup(item)} className="p-2 rounded-full bg-white group transition-all duration-500 hover:bg-green-600 flex items-center"
                      >
                        <svg className="w-5 h-5 text-green-500 group-hover:text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M17.414 2.586a2 2 0 0 0-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 0 0 0-2.828zM5 14a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H5z" />
                        </svg>
                      </button>
                      {/* Bouton Suppression */}
                      <button onClick={() => handleDeleteClient(item.userId)} className="p-2 rounded-full bg-white group transition-all duration-500 hover:bg-red-600 flex items-center">
                        <svg className="w-5 h-5 text-red-500 group-hover:text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6 7v10h8V7H6zm8-3V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v1H2v2h16V4h-4z" />
                        </svg>
                      </button>
                    </td>
                    <td >
                      <div className='flex justify-center '>
                      <button className="p-2 mx-12 rounded-full text-white font-bold bg-blue-500 group transition-all duration-500 hover:bg-blue-600 flex items-center">
                        Compte Courant
                      </button>
                      <button className="p-2 rounded-full text-white font-bold  bg-green-500 group transition-all duration-500 hover:bg-green-600 flex items-center">
                        Compte Epargne
                      </button>
                      </div>
                   
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {showInfoPopup && selectedClient && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Informations du Client</h3>
            <p><strong>Nom :</strong> {selectedClient.company}</p>
            <p><strong>Code :</strong> {selectedClient.userId}</p>
            <button
              className="mt-4 px-4 py-2 bg-gray-300 rounded"
              onClick={() => setShowInfoPopup(false)}
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* Pop-up Édition */}
      {showEditPopup && selectedClient && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Modifier le Client</h3>
            <input
              type="text"
              defaultValue={selectedClient.company}
              className="w-full p-2 mb-4 border rounded"
            />
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => handleSaveEditClient(selectedClient)}
            >
              Sauvegarder
            </button>
            <button
              className="ml-2 px-4 py-2 bg-gray-300 rounded"
              onClick={() => setShowEditPopup(false)}
            >
              Annuler
            </button>
          </div>
        </div>
      )}
        </div>
      </div>
    </div>
    </>
  );
};



export default ListClients;
