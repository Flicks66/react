import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Meals from './components/Meals';
import { FaUtensils } from 'react-icons/fa';

function App() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLetter, setSelectedLetter] = useState('a');
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

  useEffect(() => {
    const fetchMeals = async () => {
      if (!selectedLetter) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${selectedLetter}`);
        if (!response.ok) {
          throw new Error('Failed to fetch meals');
        }
        const data = await response.json();
        setMeals(data.meals || []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, [selectedLetter]);

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <div className="letter-filters">
          {alphabet.map((letter) => (
            <button
              key={letter}
              className={`letter-button ${selectedLetter === letter ? 'active' : ''}`}
              onClick={() => setSelectedLetter(letter)}
              aria-label={`Show meals starting with ${letter.toUpperCase()}`}
            >
              {letter.toUpperCase()}
            </button>
          ))}
        </div>
        
        <div className="current-letter">
          <h2>Meals starting with: <span className="highlight">{selectedLetter.toUpperCase()}</span></h2>
        </div>
        
        <Meals meals={meals} loading={loading} error={error} />
      </main>
      
      <footer className="footer">
        <p>© {new Date().getFullYear()} ABC Restaurant - All rights reserved</p>
      </footer>
    </div>
  );
}

export default App;