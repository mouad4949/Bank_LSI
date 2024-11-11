import React from "react";
import {Link} from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-semibold">
          <a href="#">MyBrank</a>
        </div>
        <div className="hidden md:flex space-x-6">
        <Link to="/clients" className="text-white hover:text-gray-400">
            Clients
        </Link>
          <Link to="/employes" className="text-white hover:text-gray-400">
            Employes
          </Link>
          <Link to="/operations" className="text-white hover:text-gray-400">
            Operations
          </Link>
          <Link to="/groups" className="text-white hover:text-gray-400">
            Groups
          </Link>
          <Link to="/compts" className="text-white hover:text-gray-400">
            Compts
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

export default Navbar;
