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
    <div className='mt-8'>
      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="mb-4 p-4">
        <input 
          type="text" 
          placeholder="Search anime..." 
          value={searchTerm} 
          onChange={handleSearchChange}
          className="border border-gray-400 rounded px-3 py-2 w-full md:w-1/2 lg:w-1/3 rounded-full"
        />
        <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2 rounded-full">
          Search
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
        {(searchResults.length > 0 ? searchResults : topAnime).map(anime => (
          <div 
            key={anime.mal_id} 
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300"
            onClick={() => openModal(anime)}
          >
            <img src={anime.images.jpg.image_url} alt={anime.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-bold mb-2 line-clamp-2">{anime.title}</h3> 
              <p className="text-gray-700 text-sm">Score: {anime.score}</p>
            </div>
          </div>
        ))}
      </div>

        {/* Modal */}
        {selectedAnime && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70" ref={modalRef}>
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-2/3 lg:w-1/2 relative">
            {/* Close Button */}
            <button
              className="absolute top-4 right-2 text-4xl font-bold text-black hover:text-red-500 focus:outline-none"
              onClick={closeModal}
            >
              &times;
            </button>

            {/* Anime Details */}
            <img src={selectedAnime.images.jpg.large_image_url} alt={selectedAnime.title} className="w-full h-64 object-cover mb-4" />
            <h2 className="text-2xl font-bold mb-2">{selectedAnime.title}</h2>
            <p className="text-gray-700 mb-2">Aired: {selectedAnime.aired.string}</p>
            <p className="text-gray-700 mb-2">Episodes: {selectedAnime.episodes}</p>
            <p className="text-gray-700 mb-2">Members: {selectedAnime.members}</p>
            {/* Add more details as needed (synopsis, genres, etc.) */}
          </div>
        </div>
      )}
    </div>
  );
}

export default AnimeCard;
