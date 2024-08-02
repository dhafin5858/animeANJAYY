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

  return (
    <div className='mt-8'>
      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="mb-4 p-4">
        <input 
          type="text" 
          placeholder="Search anime..." 
          value={searchTerm} 
          onChange={handleSearchChange}
          className="border border-gray-400 rounded px-3 py-2 w-full md:w-1/2 lg:w-1/3"
        />
        <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2">
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

      {/* ... (Your existing modal code) */}
    </div>
  );
}

export default AnimeCard;
