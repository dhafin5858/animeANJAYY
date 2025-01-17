import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function AnimeCard() {
  const [topAnime, setTopAnime] = useState([]);
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const modalRef = useRef(null); 

  useEffect(() => {
    const fetchTopAnime = async () => {
      // ... (Your existing fetchTopAnime function)
    };

    fetchTopAnime();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault(); // Prevent page refresh on form submit
    try {
      const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${searchTerm}`);
      setSearchResults(response.data.data);
    } catch (error) {
      console.error('Error searching anime:', error);
      setSearchResults([]); // Clear results on error
    }
  };

  // ... (Your existing openModal, closeModal, and handleClickOutside functions)
  const openModal = (anime) => {
    
    setSelectedAnime(anime);
      };
    
      const closeModal = () => {
        setSelectedAnime(null);
      };
    
      // Handle clicks outside the modal
      useEffect(() => {
        const handleClickOutside = (event) => {
          if (modalRef.current && !modalRef.current.contains(event.target)) {
            closeModal();
          }
        };
    
        if (selectedAnime) {
          document.addEventListener('mousedown', handleClickOutside);
        } else {
          document.removeEventListener('mousedown', handleClickOutside);
        }
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [selectedAnime]);
  return (
// Suggested code may be subject to a license. Learn more: ~LicenseLog:1679015099.
    <div className="  pt-8 mt-12  text-white transform xl:items-center justify-self-stretch"> {/* Dark background */}

    <div className=''>
      <div> {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="mb-4 p-4 text-black">
        
        <input 
        
          type="text" 
          placeholder="Search anime..." 
          value={searchTerm} 
          onChange={handleSearchChange}
          className="border border-gray-400 rounded px-3 py-2 w-full md:w-1/2 lg:w-1/3 rounded-xl"
        />
        
        <button type="submit" className="bg-blue-600 text-b px-4 text-white  py-2 rounded hover:bg-blue-800 ml-2  mt-4 rounded-full">
          Search
        </button>
      </form>
        
      </div>
     
      

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
        {(searchResults.length > 0 ? searchResults : topAnime).map(anime => (
          <div 
            key={anime.mal_id} 
            className="bg-gray-900 rounded-2xl shadow-md overflow-hiddenhover:scale-105 transition-transform duration-300 "
            onClick={() => openModal(anime)}
          >
            <img src={anime.images.jpg.image_url} alt={anime.title} className="relative inset-0 flex pt-12 pl-8" />
            <div className="p-4">
              <h3 className="text-lg font-bold mb-2 line-clamp-2">{anime.title}</h3> 
              <p className=" text-sm">Score: {anime.score}</p>
            </div>
          </div>
        ))}
      </div>

        {/* Modal */}
        {selectedAnime && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70" ref={modalRef}>
        <div className="bg-gray-900   rounded-lg shadow-lg p-6 w-4/6 md:w-2/3 lg:w-2/5 flex justify-center relative">
            {/* Close Button */}
            <button
              className="absolute top-4 right-2 text-4xl font-bold text-white hover:text-red-500 focus:outline-none"
              onClick={closeModal}
            >
              &times;
            </button>

            {/* Anime Details */}
            <div className='mb-4 sm:text-sm'>
              
            <img src={selectedAnime.images.jpg.large_image_url} alt={selectedAnime.title} className="" />

<h2 className="text-2xl font-bold mb-2">{selectedAnime.title}</h2>
<p className=" mb-2 text-xl">Aired: {selectedAnime.aired.string}</p>
<p className=" mb-2 text-xl">Episodes: {selectedAnime.episodes}</p>
<p className=" mb-2 text-xl">Status: {selectedAnime.status}</p>

{/* Add more details as needed (synopsis, genres, etc.) */}
            </div>
           
          </div>
        </div>
      )}
    </div>
    </div>
  );
}

export default AnimeCard;
