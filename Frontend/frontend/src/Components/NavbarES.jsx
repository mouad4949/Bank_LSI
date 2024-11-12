import React from "react";
import {Link} from 'react-router-dom';

const NavbarES = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-semibold">
            <Link to="/">LSI BANK</Link>
        </div>
        <div className="hidden md:flex space-x-6">
        
          <Link to="/employes" className="text-white hover:text-gray-400">
            Employes
          </Link>
          
          <Link to="/groups" className="text-white hover:text-gray-400">
            Groups
          </Link>
          <Link to="/" className="bg-red-600 text-white font-semibold px-4 py-2 rounded-full hover:bg-red-700 hover:text-white transition duration-300">
            Logout
            </Link>
         
        </div>
        <div className="md:hidden">
          <button className="text-white focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavbarES;
