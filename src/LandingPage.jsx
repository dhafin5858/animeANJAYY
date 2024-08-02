import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function LandingPage() {
  const [topAnime, setTopAnime] = useState([]);
  const [selectedAnime, setSelectedAnime] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const fetchTopAnime = async () => {
      try {
        const response = await axios.get('https://api.jikan.moe/v4/top/anime');
        setTopAnime(response.data.data.slice(0, 20));
      } catch (error) {
        console.error('Error fetching anime:', error);
      }
    };

    fetchTopAnime();
  }, []);

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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Top 20 Anime</h1>

      {/* Anime Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {topAnime.map(anime => (
          <div
            key={anime.mal_id}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300"
            onClick={() => openModal(anime)}
          >
            <img src={anime.images.jpg.image_url} alt={anime.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-bold mb-2 line-clamp-2">{anime.title}</h2>
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

export default LandingPage;
