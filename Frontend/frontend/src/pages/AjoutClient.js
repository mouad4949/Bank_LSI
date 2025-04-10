import React from "react";

const AjoutClient = () => {
  return (
    <form className="w-[700px] mx-auto my-24 text-center">
      {/* First Name & Last Name */}
      

      {/* Email Address */}
      <div className="relative mb-6">
        <InputField label="Nom Client" id="Nom" type="text" />
      </div>

     

      {/* Submit Button */}
      <button
        type="submit"
        className="w-52 h-12 shadow-sm rounded-full bg-indigo-600 hover:bg-indigo-800 transition-all duration-700 text-white text-base font-semibold leading-7"
      >
        Ajouter le Client
      </button>
    </form>
  );
};

const InputField = ({ label, id, type }) => {
  return (
    <div className="w-full relative">
      <label
        htmlFor={id}
        className="flex items-center mb-2 text-gray-600 text-sm font-medium"
      >
        {label}
        <svg
          width="7"
          height="7"
          className="ml-1"
          viewBox="0 0 7 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z"
            fill="#EF4444"
          />
        </svg>
      </label>
      <input
        type={type}
        id={id}
        className="block w-full h-11 px-5 py-2.5 bg-white leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
        placeholder=""
        required
      />
    </div>
  );
};

export default AjoutClient;
