import React from 'react';
import { FaUtensils, FaSearch, FaSadTear } from 'react-icons/fa';
import Dish from '../Dish';
import './styles.css';

function Meals({ meals = [], loading = false, error = null }) {
  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner">
          <FaUtensils className="spinner-icon" />
          <span>Loading delicious meals...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <FaSadTear className="error-icon" size={48} />
        <h3>Something went wrong</h3>
        <p>We couldn't load the meals. Please try again later.</p>
        <p className="error-details">{error.message || 'Unknown error occurred'}</p>
      </div>
    );
  }

  if (!meals || meals.length === 0) {
    return (
      <div className="no-meals">
        <FaSearch className="no-meals-icon" />
        <h3>No meals found</h3>
        <p>We couldn't find any meals starting with this letter.</p>
      </div>
    );
  }

  return (
    <section className="meals-container">
      {meals.map((meal) => (
        <Dish key={meal.idMeal} meal={meal} />
      ))}
    </section>
  );
}

export default Meals;
