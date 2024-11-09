import React from 'react';

const DataTable = () => {
  // Données pour le tableau
  const data = [
    { company: 'Louis Vuitton', userId: '20010510', type: 'Customer', industry: 'Accessories' },
    { company: 'Apple', userId: '20010511', type: 'Partner', industry: 'Electronics' },
    { company: 'Johnson', userId: '20010512', type: 'Customer', industry: 'Telecommunications' },
    { company: 'Starbucks', userId: '20010513', type: 'Reseller', industry: 'Retail' },
  ];

  return (
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
                      <button className="p-2 rounded-full bg-white group transition-all duration-500 hover:bg-blue-600 flex items-center">
                        <svg className="w-5 h-5 text-blue-500 group-hover:text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 3.5C5 3.5 1 10 1 10s4 6.5 9 6.5 9-6.5 9-6.5-4-6.5-9-6.5zm0 10a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z" />
                        </svg>
                      </button>
                      {/* Bouton Édition */}
                      <button className="p-2 rounded-full bg-white group transition-all duration-500 hover:bg-green-600 flex items-center">
                        <svg className="w-5 h-5 text-green-500 group-hover:text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M17.414 2.586a2 2 0 0 0-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 0 0 0-2.828zM5 14a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H5z" />
                        </svg>
                      </button>
                      {/* Bouton Suppression */}
                      <button className="p-2 rounded-full bg-white group transition-all duration-500 hover:bg-red-600 flex items-center">
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
        </div>
      </div>
    </div>
  );
};



export default DataTable;
