import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import NavbarE from '../Components/NavbarE';

const Clients = () => {
  const [data, setData] = useState([]);
  const [comptes, setComptes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAccountPopup, setShowAccountPopup] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [values, setValues] = useState({
    nomClient: "",
  });

  const fetchClients = async () => {
    const response = await axios.get('http://localhost:8080/api/client/get-all-clients');
    setData(response.data);
  };

  const fetchComptesofClient = async (clientId) => {
    const response = await axios.get(`http://localhost:8080/api/client/ConsulterComptes/${clientId}`);
    setComptes(response.data);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleOpenAccountPopup = async (client) => {
    setSelectedClient(client);
    await fetchComptesofClient(client.codeClient);
    setShowAccountPopup(true);
  };

  const handleClosePopup = () => {
    setShowAccountPopup(false);
    setSelectedClient(null);
    setComptes([]);
  };

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
        axios.delete(`http://localhost:8080/api/client/${clientId}`)
          .then(() => {
            Swal.fire('Supprimé!', 'Le client a été supprimé.', 'success');
            fetchClients();
          })
          .catch((error) => {
            console.error("Erreur lors de la suppression du client:", error);
            Swal.fire('Erreur', 'Impossible de supprimer le client.', 'error');
          });
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/client/add-client', values);
      setShowModal(false);
      fetchClients();
    } catch (error) {
      console.error('Unexpected error:', error);
      alert('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <>
    <NavbarE/>
      <div className="flex justify-end">
        <button
          className="p-2 my-12 mx-12 rounded-full text-white font-bold bg-blue-500 group transition-all duration-500 hover:bg-blue-600 flex items-center"
          onClick={() => setShowModal(true)}
        >
          <span className="mr-2">Ajouter un Client</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
              <h2 className="text-lg font-bold mb-4">Ajouter un Client</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">Nom de CLIENT</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-lg"
                    placeholder="Entrez le Nom du client"
                    onChange={e => setValues({...values , nomClient: e.target.value})}
                  />
                </div>
                <div className="flex justify-end">
                  <button type="button" className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg" onClick={() => setShowModal(false)}>Annuler</button>
                  <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Ajouter</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col w-[65%] mx-auto">
        <div className="overflow-x-auto">
          <div className="min-w-full inline-block align-middle">
            <div className="overflow-hidden border rounded-lg border-gray-300">
              <table className="min-w-full rounded-xl">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="p-5 text-left text-sm font-semibold capitalize">Code Client</th>
                    <th className="p-5 text-left text-sm font-semibold capitalize">Nom Client</th>
                    <th className="p-5 text-left text-sm font-semibold capitalize">Action</th>
                    <th className="p-5 text-left text-sm font-semibold capitalize flex items-center justify-center">Affecter Compte</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-300">
                  {data.map((client, index) => (
                    <tr key={index}>
                      <td className="p-5 text-sm text-gray-900">{client.codeClient}</td>
                      <td className="p-5 text-sm text-gray-900">{client.nomClient}</td>
                      <td className="p-5 text-sm text-gray-900 flex gap-2">
                        <button
                          onClick={() => handleDeleteClient(client.codeClient)}
                          className="p-2 rounded-full bg-white group transition-all duration-500 hover:bg-red-600 flex items-center"
                        >
                          <svg className="w-5 h-5 text-red-500 group-hover:text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6 7v10h8V7H6zm8-3V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v1H2v2h16V4h-4z" />
                          </svg>
                        </button>
                      </td>
                      <td>
                        <div className="flex justify-center">
                          <button
                            className="p-2 mx-12 rounded-full text-white font-bold bg-blue-500 group transition-all duration-500 hover:bg-blue-600 flex items-center"
                            onClick={() => handleOpenAccountPopup(client)}
                          >
                            Voir Comptes 
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {showAccountPopup && selectedClient && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                  <div className="bg-white p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-4">
                      Détails des Comptes pour {selectedClient.nomClient}
                    </h3>
                    <table className="min-w-full">
                      <thead>
                        <tr>
                          <th className="p-2 text-left text-sm font-semibold text-gray-900">Type de Compte</th>
                          <th className="p-2 text-left text-sm font-semibold text-gray-900">Solde</th>
                        </tr>
                      </thead>
                      <tbody>
                        {comptes.map((compte, index) => (
                          <tr key={index}>
                            <td className="p-2 text-sm text-gray-900">{compte.type}</td>
                            <td className="p-2 text-sm text-gray-900">{compte.solde} €</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <button className="mt-4 px-4 py-2 bg-gray-300 rounded" onClick={handleClosePopup}>
                      Fermer
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Clients;
