import React from 'react';

const PremiumSelect = ({ 
  label, 
  value, 
  onChange, 
  options, 
  helperText,
  name,
  placeholder = "Select an option" 
}) => {
  return (
    <div className="group relative">
      {/* Label with animated underline on hover */}
      <label className="block mb-2 text-sm font-medium text-gray-200 tracking-wide group-hover:text-white transition-colors duration-200">
        {label}
        <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-400 to-fuchsia-400 group-hover:w-12 transition-all duration-300"></div>
      </label>

      {/* Select Container */}
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          name={name}
          className="
            w-full px-5 py-4
            appearance-none
            bg-white/10 hover:bg-white/15
            backdrop-blur-lg
            border border-white/20
            rounded-xl
            text-white
            shadow-lg
            transition-all duration-300
            outline-none
            focus:ring-2 focus:ring-violet-500/50
            hover:shadow-violet-500/20 hover:shadow-xl
            cursor-pointer
            placeholder-gray-400
            font-medium
            
            /* Hover state animation */
            hover:scale-[1.01]
            hover:border-white/30
            
            /* Focus state */
            focus:border-violet-400
            focus:bg-white/15
            
            /* Custom scrollbar */
            scrollbar-thin scrollbar-thumb-violet-500 scrollbar-track-transparent
          "
        >
          <option value="" disabled hidden className="text-gray-400">
            {placeholder}
          </option>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="
                bg-gray-800
                text-white
                py-2
                hover:bg-violet-600
                transition-colors
                duration-150
              "
            >
              {option.label}
            </option>
          ))}
        </select>

        {/* Custom Dropdown Arrow */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-300 group-hover:translate-y-[-45%]">
          <div className="relative">
            {/* Glowing background */}
            <div className="absolute inset-0 bg-violet-500 blur-md opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
            {/* Arrow icon */}
            <svg
              className="w-5 h-5 text-violet-300 transform group-hover:text-violet-200 transition-all duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* Focus ring animation */}
        <div className="absolute inset-0 rounded-xl opacity-0 focus-within:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 blur-xl"></div>
        </div>
      </div>

      {/* Helper Text with Animation */}
      {helperText && (
        <p className="mt-2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {helperText}
        </p>
      )}
    </div>
  );
};

export default PremiumSelect; 