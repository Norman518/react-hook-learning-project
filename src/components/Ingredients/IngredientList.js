import React from 'react';

import './IngredientList.css';

const IngredientList = props => {
  return (
    <section className="ingredient-list">
      <h2>Loaded Ingredients</h2>
      <ul>
        {props.ingredients.map(ingredient => (
          <li key={ingredient.id} onClick={props.onRemoveIngredient.bind(this, ingredient.id)}>
            <span>{ingredient.amount}x</span>
            <span>{ingredient.title}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default IngredientList;
