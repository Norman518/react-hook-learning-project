import React, { useReducer, useState, useCallback } from 'react';

import IngredientList from './IngredientList';
import IngredientForm from './IngredientForm';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';

const ingredientsReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return action.ingredients;
    case 'SET':
      return [...state, action.ingredient];
    case 'DELETE':
      return state.filter(ingredient => ingredient.id !== action.id);
    default:
      throw new Error('reducer failed');
  }
};

const Ingredients = () => {
  const [ingredients, dispatch] = useReducer(ingredientsReducer, []);
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
        dispatch({ type: 'ADD', id: data.name, ...ingredient });
      });
  };

  const removeIngredientHandler = ingredientID => {
    setIsLoading(true);
    fetch(`https://react-hooks-update-3e000.firebaseio.com/ingredients/${ingredientID}.json`, {
      method: 'DELETE',
    })
      .then(() => {
        setIsLoading(false);
        dispatch({ type: 'DELETE', id: ingredientID });
      })
      .catch(error => {
        setError(error.message);
        setIsLoading(false);
      });
  };

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    dispatch({ type: 'SET', ingredients: filteredIngredients });
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
