import React, { useState, useEffect } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const { onLoadIngredients } = props;
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const query = filter.length === 0 ? '' : `?orderBy="title"&equalTo="${filter}"`;
    fetch(`https://react-hooks-update-3e000.firebaseio.com/ingredients.json${query}`)
      .then(response => response.json())
      .then(data => {
        const loadedIngredients = [];
        for (const key in data) {
          loadedIngredients.push({ id: key, title: data[key].title, amount: data[key].amount });
        }
        onLoadIngredients(loadedIngredients);
      });
  }, [filter, onLoadIngredients]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            type="text"
            value={filter}
            onChange={event => {
              setFilter(event.target.value);
            }}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
