import React, { useState } from "react";

const CompteEditPopup = ({ compte, onClose, onSave }) => {
    const [editedData, setEditedData] = useState({ ...compte });

    const handleChange = (e) => {
        setEditedData({ ...editedData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        onSave(editedData);
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
                <h2 className="text-lg font-bold mb-4">Modifier le Compte</h2>
                <label className="text-sm text-gray-400">
                    Nom de Client
                </label>
                <input
                    className="w-full p-2 mb-4 border rounded-lg"
                    name="company"
                    value={editedData.company}
                    
                    onChange={handleChange}
                    placeholder="Nom Client"
                />
                <label className="text-sm text-gray-400">
                    Nom de l'employé
                </label>
                <input
                    className="w-full p-2 mb-4 border rounded-lg"
                    name="employe"
                    value={editedData.employe}
                    onChange={handleChange}
                    placeholder="Nom Employé"
                />

                <label className="text-sm text-gray-400">
                    Solde
                </label>
                <input
                    className="w-full p-2 mb-4 border rounded-lg"
                    name="employe"
                    value={editedData.solde}
                    onChange={handleChange}
                    placeholder=" Solde"
                />
                <button className="px-4 py-2 bg-green-500 text-white rounded-lg" onClick={handleSave}>
                    Enregistrer
                </button>
                <button className="px-4 py-2 ml-2 bg-gray-500 text-white rounded-lg" onClick={onClose}>
                    Annuler
                </button>
            </div>
        </div>
    );
};

export default CompteEditPopup;
