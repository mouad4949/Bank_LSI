import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Clients = () => {
  const data = [
    { company: 'Louis Vuitton', userId: '20010510', type: 'Customer', industry: 'Accessories' },
    { company: 'Apple', userId: '20010511', type: 'Partner', industry: 'Electronics' },
    { company: 'Johnson', userId: '20010512', type: 'Customer', industry: 'Telecommunications' },
    { company: 'Starbucks', userId: '20010513', type: 'Reseller', industry: 'Retail' },
  ];

  const data2 = [
    {
      company: "Louis Vuitton",
      userId: "20010510",
      type: "Customer",
      industry: "Accessories",
      accounts: [
        { type: "Compte Courant", balance: 1000 },
        { type: "Compte Epargne", balance: 5000 },
      ],
    },
    {
      company: "Apple",
      userId: "20010511",
      type: "Partner",
      industry: "Electronics",
      accounts: [
        { type: "Compte Courant", balance: 2000 },
        { type: "Compte Epargne", balance: 10000 },
      ],
    },
    {
        company: "Apple",
        userId: "20010511",
        type: "Partner",
        industry: "Electronics",
        accounts: [
          { type: "Compte Courant", balance: 2000 },
          { type: "Compte Epargne", balance: 10000 },
        ],
      },
  ];

  const [showModal, setShowModal] = useState(false);
  const [showAccountPopup, setShowAccountPopup] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const handleOpenAccountPopup = (client) => {
    const clientData = data2.find(c => c.userId === client.userId);
    setSelectedClient(clientData);
    setShowAccountPopup(true);
  };

  const handleClosePopup = () => {
    setShowAccountPopup(false);
    setSelectedClient(null);
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
        console.log("Client supprimé:", clientId);
        Swal.fire('Supprimé!', 'Le client a été supprimé.', 'success');
      }
    });
  };

  return (
    <>
      <div className="flex justify-end">
        <button
          className="p-2 my-12 mx-12 rounded-full text-white font-bold bg-blue-500 group transition-all duration-500 hover:bg-blue-600 flex items-center"
          onClick={() => setShowModal(true)}
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
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
              <h2 className="text-lg font-bold mb-4">Ajouter un Client</h2>
              <form>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    Nom de CLIENT
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-lg"
                    placeholder="Entrez le Nom du client"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
                    onClick={() => setShowModal(false)}
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

      <div className="flex flex-col w-[65%] mx-auto">
        <div className="overflow-x-auto">
          <div className="min-w-full inline-block align-middle">
            <div className="overflow-hidden border rounded-lg border-gray-300">
              <table className="min-w-full rounded-xl">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="p-5 text-left text-sm font-semibold capitalize">
                      Code Client
                    </th>
                    <th className="p-5 text-left text-sm font-semibold capitalize">
                      Nom Client
                    </th>
                    <th className="p-5 text-left text-sm font-semibold capitalize">
                      Action
                    </th>
                    <th className="p-5 text-left text-sm font-semibold capitalize flex items-center justify-center">
                      Affecter Compte
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-300">
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td className="p-5 text-sm text-gray-900">{item.userId}</td>
                      <td className="p-5 text-sm text-gray-900">{item.company}</td>
                      <td className="p-5 text-sm text-gray-900 flex gap-2">
                        <button onClick={() => handleDeleteClient(item.userId)} className="p-2 rounded-full bg-white group transition-all duration-500 hover:bg-red-600 flex items-center">
                          <svg className="w-5 h-5 text-red-500 group-hover:text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6 7v10h8V7H6zm8-3V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v1H2v2h16V4h-4z" />
                          </svg>
                        </button>
                      </td>
                      <td>
                        <div className="flex justify-center">
                          <button
                            className="p-2 mx-12 rounded-full text-white font-bold bg-blue-500 group transition-all duration-500 hover:bg-blue-600 flex items-center"
                            onClick={() => handleOpenAccountPopup(item)}
                          >
                            Compte Courant
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
                      Détails des Comptes pour {selectedClient.company}
                    </h3>
                    <table className="min-w-full">
                      <thead>
                        <tr>
                          <th className="p-2 text-left text-sm font-semibold text-gray-900">
                            Type de Compte
                          </th>
                          <th className="p-2 text-left text-sm font-semibold text-gray-900">
                            Solde
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedClient.accounts.map((account, index) => (
                          <tr key={index}>
                            <td className="p-2 text-sm text-gray-900">{account.type}</td>
                            <td className="p-2 text-sm text-gray-900">{account.balance} €</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <button
                      className="mt-4 px-4 py-2 bg-gray-300 rounded"
                      onClick={handleClosePopup}
                    >
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
