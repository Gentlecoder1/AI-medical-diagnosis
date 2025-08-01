import React from 'react';

const SelectField = ({ 
  label, 
  name, 
  options, 
  placeholder = 'Select an option', 
  register, 
  error, 
  required = false,
  className = '' 
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-gray-800 mb-2"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <select
          id={name}
          {...register(name)}
          className={`
            w-full px-4 py-3 bg-white border-2 rounded-xl shadow-sm text-base transition-all duration-200 appearance-none
            focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 hover:border-gray-400
            ${error
              ? 'border-red-400 focus:ring-red-100 focus:border-red-500'
              : 'border-gray-200 focus:border-blue-500'
            }
            ${className}
          `}
        >
          <option value="" className="text-gray-500">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value} className="text-gray-900">
              {option.label}
            </option>
          ))}
        </select>

        {/* Custom dropdown arrow */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {error && (
        <div className="mt-2 flex items-center text-red-600">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span className="text-sm">{error.message}</span>
        </div>
      )}
    </div>
  );
};

export default SelectField;
