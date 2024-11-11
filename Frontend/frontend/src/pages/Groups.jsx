import react from 'react' ; 
import { useState ,useEffect} from "react";
import CompteInfoPopup from '../sous_pages/CompteInfoPopup'
import CompteEditPopup from '../sous_pages/CompteEditPopup'
import Swal from "sweetalert2";

const Groups = () =>{
    const data = [
        { code:1 , company: 'Louis Vuitton',  type: 'Customer', industry: 'Accessories', employe:'said',date:'20/11/2024',solde:1000},
        { code:2 , company: 'Apple',  type: 'Partner', industry: 'Electronics' , employe:'said',date:'20/11/2024',solde:1000},
        { code:3 , company: 'Johnson',  type: 'Customer', industry: 'Telecommunications', employe:'said',date:'20/11/2024',solde:1000},
        { code:4 , company: 'Starbucks',  type: 'Reseller', industry: 'Retail' , employe:'said',date:'20/11/2024',solde:1000},
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

    const handleSaveEdit = (updatedCompte) => {
        console.log("Compte mis à jour:", updatedCompte);
    };
    const handleOpenEditPopup = (compte) => {
        setSelectedCompte(compte);
        setShowEditPopup(true);
    };
    const handleOpenInfoPopup = (compte) => {
        setSelectedCompte(compte);
        setShowInfoPopup(true);
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
    
    return(
        <div>
            <div className="overflow-x-auto py-6">
  <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
    <thead>
      <tr className="bg-gray-800 text-white">
        <th className="px-6 py-4 text-left">Nom Client</th>
        <th className="px-6 py-4 text-left">Nom Employé</th>
        <th className="px-6 py-4 text-left">Date de Creation</th>
        <th className="px-6 py-4 text-left">Type Compte</th>
        <th className="px-6 py-4 text-center">Nombre de Comptes</th>
        <th className="px-6 py-4 text-center">Actions</th>
      </tr>
    </thead>
    <tbody>
      {data.map((item, index) => (
        <tr key={index} className="border-t">
          <td className="px-6 py-4">{item.company}</td>
          <td className="px-6 py-4">{item.employe}</td>
          <td className="px-6 py-4">{item.date}</td>
          <td className="px-6 py-4">{item.type}</td>
          <td className="px-6 py-4 text-center">{item.accountCount}</td>
          <td className="px-6 py-4 text-center space-x-4">
            <button
              className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md"
              onClick={() => handleOpenInfoPopup(item)}
            >
              View Info
            </button>
            <button
              className="px-4 py-2 text-white bg-yellow-500 hover:bg-yellow-600 rounded-md"
              onClick={() => handleOpenEditPopup(item)}
            >
              Update
            </button>
            <button
              className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-md"
              onClick={() => handleDeleteCompte(item.id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

        </div>
    );
}

export default Groups ;