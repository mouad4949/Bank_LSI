import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios'
import NavbarES from '../Components/NavbarES';
const Employes = () => {
  
  //// affichage des employes////////
  useEffect(()=>{
    loadUsers()
},[]);
const [users,setUsers]=useState([])

const loadUsers=async()=>{
  const result=await axios.get("http://localhost:8080/api/employe");
  setUsers(result.data);
}


/////affectation des groupes///////
      /////affichages des groupes////////

      const [showModalgr, setShowModalgr] = useState(false);
      const [groupes, setGroupes] = useState([]);
      const [selectedGroupe, setSelectedGroupe] = useState('');
      const [employeId, setEmployeId] = useState('');
    
      // Fetch les groupes depuis l'API
     
        const fetchGroupes = async () => {
          try {
            const response = await fetch('http://localhost:8080/api/Groupe');
            const data = await response.json();
            setGroupes(data);
          } catch (error) {
            console.error('Erreur lors du fetch des groupes:', error);
          }
        };
        useEffect(() => {
        fetchGroupes();
     
      }, []);
    
      // Soumettre le formulaire d'affectation
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!employeId || !selectedGroupe) {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Veuillez sélectionner un employé et un groupe.',
          });
          return;
        }
    
        // Créer l'objet à envoyer au backend
        const affecteEmployeRequest = {
          employeId: employeId,
          groupesIds: [selectedGroupe],
        };
    
        try {
          // Envoi de la requête POST
          const response = await axios.post('http://localhost:8080/api/Groupe/assign-groups', affecteEmployeRequest);
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: response.data,
          });
          setShowModalgr(false); // Ferme le modal après succès
        } catch (error) {
          console.error('Erreur lors de l\'affectation des groupes:', error);
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur s\'est produite lors de l\'affectation des groupes.',
          });
        }
      };
      //////////////////////////////////////////////////
  
////////////Ajout d'un employe////////////////

const [nomEmploye, setNomEmploye] = useState('');
const [emailEmploye, setEmailEmploye] = useState('');
const [passwordEmploye, setPasswordEmploye] = useState('');
const [employeSup, setEmployeSup] = useState('');


// Soumettre le formulaire
const handleSubmitadd = async (e) => {
  e.preventDefault();

  // Vérification des champs obligatoires
  if (!nomEmploye || !emailEmploye || !passwordEmploye) {
    Swal.fire({
      icon: 'error',
      title: 'Erreur',
      text: 'Tous les champs sont requis.',
    });
    return;
  }

  // Prépare les données à envoyer
  const employeData = {
    nomEmploye,
    email: emailEmploye,
    password: passwordEmploye,
    employeSup: employeSup ? parseInt(employeSup) : null, // Convertir en nombre
  };

  try {
    // Envoi de la requête POST
    const response = await axios.post('http://localhost:8080/api/employe', employeData);
    fetchGroupes();
    Swal.fire({
      icon: 'success',
      title: 'Employé ajouté',
      text: `L employé ${response.data.nomEmploye} a été ajouté avec succès.`
    });
    
    setShowModal(false); 
    
    // Ferme le modal après succès
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'employé:', error);
    Swal.fire({
      icon: 'error',
      title: 'Erreur',
      text: 'Une erreur s\'est produite lors de l\'ajout de l\'employé.',
    });
  }
};

///////////////////////////////////////////////



  const [showModal, setShowModal] = useState(false);
  const [showAccountPopup, setShowAccountPopup] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  

  const handleClosePopup = () => {
    setShowAccountPopup(false);
    setSelectedClient(null);
  };


/////////delete////////
const handleDeleteClient = async (clientId) => {
  Swal.fire({
    title: 'Êtes-vous sûr?',
    text: "Cette action est irréversible!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Oui, supprimer!',
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        // Appel à l'API pour supprimer l'employé
        const response = await axios.delete(`http://localhost:8080/api/employe/${employeId}`);
        console.log("Client supprimé:", clientId);
        Swal.fire('Supprimé!', response.data, 'success'); // Affiche le message de succès retourné par le backend
      } catch (error) {
        console.error("Erreur lors de la suppression du client:", error);
        Swal.fire('Erreur', 'Une erreur s\'est produite lors de la suppression du client.', 'error');
      }
    }
  });
};

  return (
    <>
    <NavbarES/> 
      <div className="flex justify-end">
        <button
          className="p-2 my-12 mx-12 rounded-full text-white font-bold bg-blue-500 group transition-all duration-500 hover:bg-blue-600 flex items-center"
          onClick={() => setShowModal(true)}
        >
          <span className="mr-2">Ajouter un Employe</span>
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
              <h2 className="text-lg font-bold mb-4">Ajouter un Employe</h2>
              <form onSubmit={handleSubmitadd}>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Nom d'Employé</label>
                <input
                  type="text"
                  value={nomEmploye}
                  onChange={(e) => setNomEmploye(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Entrez le nom de l'employé"
                  required
                />

                <label className="block text-gray-700 font-bold mb-2">Email de l'employé</label>
                <input
                  type="email"
                  value={emailEmploye}
                  onChange={(e) => setEmailEmploye(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Entrez l'email de l'employé"
                  required
                />

                <label className="block text-gray-700 font-bold mb-2">Mot de Passe</label>
                <input
                  type="password"
                  value={passwordEmploye}
                  onChange={(e) => setPasswordEmploye(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Entrez le mot de passe de l'employé"
                  required
                />

                <label className="block text-gray-700 font-bold mb-2">Supérieur de l'employé (optionnel)</label>
                <input
                  type="text"
                  value={employeSup}
                  onChange={(e) => setEmployeSup(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Entrez le nom du supérieur"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
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
                      Code Employe
                    </th>
                    <th className="p-5 text-left text-sm font-semibold capitalize">
                      Nom Employe
                    </th>
                    <th className="p-5 text-left text-sm font-semibold capitalize">
                      Action
                    </th>
                    <th className="p-5 text-left text-sm font-semibold capitalize flex items-center justify-center">
                      Affecter Groupe
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-300">
          {users.map((user, index) => (
            <tr key={index}>
              <td className="p-5 text-sm text-gray-900">{user.codeEmploye}</td>
              <td className="p-5 text-sm text-gray-900">{user.nomEmploye}</td>
              <td className="p-5 text-sm text-gray-900 flex gap-2">
                <button
                  onClick={() => handleDeleteClient(user.codeEmploye)}
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
                    onClick={() => {
                      setEmployeId(user.codeEmploye);  // Assign employeId when clicking 'Affecter'
                      setShowModalgr(true);
                    }}
                  >
                    Affecter
                  </button>

                  {showModalgr && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Sélectionner un Groupe</h2>
                        <form onSubmit={handleSubmit}>
                          <div className="mb-4">
                            <label htmlFor="groupe" className="block mb-2 font-semibold">
                              Choisir un Groupe
                            </label>
                            <select
                              id="groupe"
                              value={selectedGroupe}
                              onChange={(e) => setSelectedGroupe(e.target.value)}
                              className="w-full p-2 border rounded"
                              required
                            >
                              <option value="">-- Sélectionner un Groupe --</option>
                              {groupes.map((groupe) => (
                                <option key={groupe.codeGroupe} value={groupe.codeGroupe}>
                                  {groupe.nomGroup}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="flex justify-end">
                            <button
                              type="button"
                              onClick={() => setShowModalgr(false)}
                              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 mr-2"
                            >
                              Annuler
                            </button>
                            <button
                              type="submit"
                              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                              Valider
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
              </table>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Employes;
