
import React, { useState } from 'react';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] =
 useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="bg-gray-700 text-white sticky"> 
      <nav className="p-4 sticky1"> 
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          <a href="/" className="text-blue-500 text-2xl font-bold">
            AnimeANJAYY 
          </a>

          <button 
            className="md:hidden text-white focus:outline-none" 
            onClick={toggleMobileMenu}
          >
            <svg 
              className={`w-6 h-6 ${isMobileMenuOpen ? 'hidden' : 'block'}`} 
              fill="none
" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16" 
              />
            </svg>
            <svg 
              className={`w-6 h-6 ${isMobileMenuOpen ? 'block' : 'hidden'}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            
</svg>
          </button>

          <div className={`w-full md:w-auto md:flex md:items-center ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
            <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 mt-4 md:mt-0">
              <li>
                <a href="" className="text-white hover:text-red-500 transition duration-300">
                  Home
                </a>
              </li>
              <li>
                <a href="" className="text-white hover:text-red-500 transition duration-300">
                  Popular
                </a>
              </li>
              <li>
                <a href="" className="text-white hover:text-red-500 transition duration-300">
                  Manga
                </a>
              </li>          
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
