import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './navbar';
import AnimeCard from './Search'; 
import './App.css';
import LandingPage from './LandingPage'; // Adjust the path if necessary
import Manga from './manga';
function App() {
  const [topAnime, setTopAnime] = useState([]);

  useEffect(() => {
    const fetchTopAnime = async () => {
      try {
        const response = await axios.get('https://api.jikan.moe/v4/top/anime');
        setTopAnime(response.data.data);
      } catch (error) {
        console.error('Error fetching anime:', error);
      }
    };

    fetchTopAnime();
  }, []);

  return (
    <div>
    <Navbar /> 
    <AnimeCard /> 
    <LandingPage />
  <Manga />
  </div>
       
     );
   }
   

export default App;
