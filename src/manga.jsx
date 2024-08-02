import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function Manga() {
  const [topManga, setTopManga] = useState([]);
  const [selectedManga, setSelectedManga] = useState(null);

  const modalRef = useRef(null);

  useEffect(() => {
    const fetchTopManga = async () => {
      try {
        const response = await axios.get('https://api.jikan.moe/v4/top/manga');
        setTopManga(response.data.data.slice(0, 20));
      } catch (error) {
        console.error('Error fetching manga:', error);
      }
    };

    fetchTopManga();
  }, []);

  const openModal = (manga) => {
    setSelectedManga(
manga);
  };

  const closeModal = () => {
    setSelectedManga(null);
  };

  // Handle clicks outside the modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (selectedManga) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectedManga]);

  return (
    <div className="bg-gray-700 min-h-screen text-white"> {/* Dark background */}
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Top 20 Manga</h1>

      {/* Manga Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {topManga.map(manga => (
          <div
            key={manga.mal_id}
            className="bg-gray-900 rounded-lg shadow-md overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300"
            onClick={() => openModal(manga)}
          >
            <img src={manga.images.jpg.image_url} alt={manga.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-bold mb-2 line-clamp-2">{manga.title}</h2>
              <p className="text-white text-sm">Score: {manga.score}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedManga && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70" ref={modalRef}>
          <div className="bg-gray-900 rounded-lg shadow-lg p-6 w-11/12 md:w-2/3 lg:w-1/2 relative">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-3xl text-white hover:text-red-500 focus:outline-none"
              onClick={closeModal}
            >
              &times;
            </button>

            {/* Manga Details */}
            <img src={selectedManga.images.jpg.large_image_url} alt={selectedManga.title} className="w-full h-64 object-cover mb-4" />
            <h2 className="text-2xl font-bold mb-2">{selectedManga.title}</h2>
            <p className="text-white mb-2">Published: {selectedManga.published.string}</p> 
            <p className="text-white mb-2">Chapters: {selectedManga.chapters}</p>
            <p className="text-white mb-2">Volumes: {selectedManga.volumes}</p>
            <p className="text-white mb-2">Score: {selectedManga.score}</p>
            {/* Add more details as needed (synopsis, genres, etc.) */}
          </div>
        </div>
        )}
    </div>
  </div>
  );
}

export default Manga;

