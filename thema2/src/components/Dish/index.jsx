import React, { useState } from 'react';
import './styles.css';
import { FaEdit, FaSave, FaUtensils, FaArrowRight } from 'react-icons/fa';

function Dish({ meal }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(meal.strMeal);
  const [editedTitle, setEditedTitle] = useState(meal.strMeal);

  const handleEditClick = (e) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleSaveClick = (e) => {
    e.stopPropagation();
    setTitle(editedTitle);
    setIsEditing(false);
  };

  const handleTitleChange = (e) => {
    setEditedTitle(e.target.value);
  };

  
  const formatInstructions = (text) => {
    if (!text) return '';
    return text
      .replace(/\r\n|\r|\n/g, ' ') 
      .replace(/\s+/g, ' ') 
      .trim();
  };

  return (
    <article className="dish">
      <div className="dish-image-container">
        <img 
          src={meal.strMealThumb} 
          alt={title} 
          className="dish-image"
          loading="lazy"
        />
      </div>
      
      <div className="dish-content">
        <span className="dish-category">
          <FaUtensils style={{ marginRight: '4px' }} />
          {meal.strCategory || 'Meal'}
        </span>
        
        <div className="dish-header">
          {isEditing ? (
            <input
              type="text"
              value={editedTitle}
              onChange={handleTitleChange}
              className="dish-title-edit"
              onClick={(e) => e.stopPropagation()}
              autoFocus
            />
          ) : (
            <h3>{title}</h3>
          )}
          <div className="dish-actions">
            {isEditing ? (
              <button 
                onClick={handleSaveClick} 
                className="icon-button" 
                aria-label="Save"
              >
                <FaSave className="icon" />
              </button>
            ) : (
              <button 
                onClick={handleEditClick} 
                className="icon-button" 
                aria-label="Edit"
              >
                <FaEdit className="icon" />
              </button>
            )}
          </div>
        </div>
        
        <p className="dish-description">
          {formatInstructions(meal.strInstructions).substring(0, 150)}...
        </p>
        
        <div className="dish-footer">
          <a 
            href={`https://www.themealdb.com/meal/${meal.idMeal}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="dish-instructions"
          >
            View Recipe <FaArrowRight style={{ fontSize: '0.8em' }} />
          </a>
          <span className="dish-area">
            {meal.strArea || 'International'}
          </span>
        </div>
      </div>
    </article>
  );
}

export default Dish;
