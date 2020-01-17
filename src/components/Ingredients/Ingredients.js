import React, { useState, useEffect } from 'react';

import IngredientList from './IngredientList';
import IngredientForm from './IngredientForm';
import Search from './Search';

const Ingredients = () => {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    fetch('https://react-hooks-update-3e000.firebaseio.com/ingredients.json')
      .then(response => response.json())
      .then(data => {
        const loadedIngredients = [];
        for (const key in data) {
          loadedIngredients.push({ id: key, title: data[key].title, amount: data[key].amount });
        }
        setIngredients(loadedIngredients);
      });
  }, []);

  const addIngredientHandler = ingredient => {
    fetch('https://react-hooks-update-3e000.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        setIngredients(prevIngredients => [...prevIngredients, { id: data.name, ...ingredient }]);
      });
  };

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />
      <section>
        <Search />
        <IngredientList ingredients={ingredients} onRemoveIngredient={() => {}} />
      </section>
    </div>
  );
};

export default Ingredients;
