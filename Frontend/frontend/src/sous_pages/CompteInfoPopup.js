import React from "react";

const CompteInfoPopup = ({ compte, onClose }) => {
    if (!compte) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
                <h2 className="text-lg font-bold mb-4">Détails du Compte</h2>
                
                <div className="mb-2"><strong>Client :</strong> {compte.company}</div>
                <div className="mb-2"><strong>Employé :</strong> {compte.employe}</div>
                <div className="mb-2"><strong>Type :</strong> {compte.type}</div>
                <div className="mb-2"><strong>Solde</strong> {compte.solde} DH</div>
                <div className="mb-2"><strong>Date :</strong> {compte.date}</div>
                <button
                    className="px-4 py-2 mt-4 bg-red-500 text-white rounded-lg"
                    onClick={onClose}
                >
                    Fermer
                </button>
            </div>
        </div>
    );
};

export default CompteInfoPopup;
