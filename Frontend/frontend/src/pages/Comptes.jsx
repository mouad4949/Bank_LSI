import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import NavbarE from '../Components/NavbarE';
// import { Card, CardHeader, CardTitle } from '@/components/ui/card';

const Comptes = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [values, setValues] = useState({
    solde: 0,
    decouvert: 0,
    taux: 0,
    typeCompte: "",
    codeClient: "",
    codeEmploye: ""
  });

  const fetchComptes = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/compte');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching accounts:', error);
      Swal.fire('Error', 'Unable to fetch accounts', 'error');
    }
  };
  

  const fetchClients = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/client/get-all-clients');
      setClients(response.data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  useEffect(() => {
    fetchComptes();
    fetchClients();
  }, []);

  const handleDeleteCompte = (compteId) => {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Cette action est irréversible!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:8080/api/compte/${compteId}`)
          .then(() => {
            Swal.fire('Supprimé!', 'Le compte a été supprimé.', 'success');
            fetchComptes();
          })
          .catch((error) => {
            console.error("Error deleting account:", error);
            Swal.fire('Erreur', 'Impossible de supprimer le compte.', 'error');
          });
      }
    });
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const compteData = {
        compte: {
          dateCreation: new Date().toISOString(),
          solde: values.solde,
          type: values.typeCompte,
          decouvert: values.typeCompte === 'COURANT' ? values.decouvert : null,
          taux: values.typeCompte === 'EPARGNE' ? values.taux : null
        },
        clientId: values.codeClient,
        employeId: values.employeId = 6
      };
    try {
      await axios.post('http://localhost:8080/api/compte', compteData);
      setShowModal(false);
      fetchComptes();
      Swal.fire('Succès', 'Compte ajouté avec succès', 'success');
    } catch (error) {
      console.error('Error adding account:', error);
      Swal.fire('Erreur', 'Impossible d\'ajouter le compte', 'error');
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
      </div>

      <div className="flex flex-col w-[95%] mx-auto">
        <div className="overflow-x-auto">
          <div className="min-w-full inline-block align-middle">
            <div className="overflow-hidden border rounded-lg border-gray-300">
              <table className="min-w-full rounded-xl">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="p-5 text-left text-sm font-semibold">Code compte</th>
                    <th className="p-5 text-left text-sm font-semibold">Date de creation</th>
                    <th className="p-5 text-left text-sm font-semibold">Solde</th>
                    <th className="p-5 text-left text-sm font-semibold">Decouvert</th>
                    <th className="p-5 text-left text-sm font-semibold">Taux</th>
                    <th className="p-5 text-left text-sm font-semibold">Nom de client</th>
                    <th className="p-5 text-left text-sm font-semibold">Nom d'Employe</th>
                    <th className="p-5 text-left text-sm font-semibold">Type de Compte</th>
                    <th className="p-5 text-left text-sm font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-300">
                  {Array.isArray(data) && data.map((item, index) => (
                    <tr key={index}>
                      <td className="p-5 text-sm text-gray-900">{item.codeCompte}</td>
                      <td className="p-5 text-sm text-gray-900">{item.dateCreation}</td>
                      <td className="p-5 text-sm text-gray-900">{item.solde}</td>
                      <td className="p-5 text-sm text-gray-900">{item.decouvert}</td>
                      <td className="p-5 text-sm text-gray-900">{item.taux}</td>
                      <td className="p-5 text-sm text-gray-900">{item.client.nomClient}</td>
                      <td className="p-5 text-sm text-gray-900">{item.employe.nomEmploye}</td>
                      <td className="p-5 text-sm text-gray-900">{item.type}</td>
                      <td className="p-5 flex gap-2">
                        <button
                          onClick={() => handleDeleteCompte(item.codeCompte)}
                          className="p-2 rounded-full bg-white group transition-all duration-500 hover:bg-red-600 flex items-center"
                        >
                          <svg
                            className="w-5 h-5 text-red-500 group-hover:text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M6 7v10h8V7H6zm8-3V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v1H2v2h16V4h-4z" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-lg font-bold mb-4">Ajouter un Compte</h2>
            <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Client
        </label>
        <select
          className="w-full p-2 border rounded-lg"
          onChange={e => setValues({...values, codeClient: e.target.value})}
          required
        >
          <option value="">Sélectionner un client</option>
          {clients.map((client, index) => (
            <option key={index} value={client.codeClient}>
              {client.nomClient}
            </option>
          ))}
        </select>
      </div>

      {/* <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Employé
        </label>
        <select
          className="w-full p-2 border rounded-lg"
          onChange={e => setValues({...values, employeId: e.target.value})}
          required
        >
          <option value="">Sélectionner un employé</option>
          {employes.map((employe, index) => (
            <option key={index} value={employe.id}>
              {employe.nomEmploye}
            </option>
          ))}
        </select>
      </div> */}

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Type de Compte
        </label>
        <select
          className="w-full p-2 border rounded-lg"
          onChange={e => setValues({...values, typeCompte: e.target.value})}
          required
        >
          <option value="">Sélectionner le type</option>
          <option value="COURANT">Compte Courant</option>
          <option value="EPARGNE">Compte Épargne</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Solde Initial
        </label>
        <input
          type="number"
          className="w-full p-2 border rounded-lg"
          placeholder="Entrez le solde"
          onChange={e => setValues({...values, solde: parseFloat(e.target.value)})}
          required
        />
      </div>

      {values.typeCompte === 'COURANT' && (
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Découvert
          </label>
          <input
            type="number"
            className="w-full p-2 border rounded-lg"
            placeholder="Entrez le découvert"
            onChange={e => setValues({...values, decouvert: parseFloat(e.target.value)})}
          />
        </div>
      )}

      {values.typeCompte === 'EPARGNE' && (
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Taux
          </label>
          <input
            type="number"
            step="0.01"
            className="w-full p-2 border rounded-lg"
            placeholder="Entrez le taux"
            onChange={e => setValues({...values, taux: parseFloat(e.target.value)})}
          />
        </div>
      )}

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
    </>
  );
};

export default Comptes;