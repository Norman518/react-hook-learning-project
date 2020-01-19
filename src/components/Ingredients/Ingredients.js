import React, { useState, useEffect, useCallback } from 'react';

import IngredientList from './IngredientList';
import IngredientForm from './IngredientForm';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';

const Ingredients = () => {
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const addIngredientHandler = ingredient => {
    setIsLoading(true);
    fetch('https://react-hooks-update-3e000.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => {
        setIsLoading(false);
        return response.json();
      })
      .then(data => {
        setIngredients(prevIngredients => [...prevIngredients, { id: data.name, ...ingredient }]);
      });
  };

  const removeIngredientHandler = ingredientID => {
    setIsLoading(true);
    fetch(`https://react-hooks-update-3e000.firebaseio.com/ingredients/${ingredientID}.json`, {
      method: 'DELETE',
    })
      .then(() => {
        setIsLoading(false);
        setIngredients(prevIngredients =>
          prevIngredients.filter(ingredient => ingredient.id !== ingredientID),
        );
      })
      .catch(error => {
        setError(error.message);
        setIsLoading(false);
      });
  };

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    setIngredients(filteredIngredients);
  }, []);

  const clearError = () => {
    setError(null);
  };

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <IngredientForm onAddIngredient={addIngredientHandler} loading={isLoading} />
      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList ingredients={ingredients} onRemoveIngredient={removeIngredientHandler} />
      </section>
    </div>
  );
};

export default Ingredients;
