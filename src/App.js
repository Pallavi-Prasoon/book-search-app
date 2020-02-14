import React, { useEffect, useState } from 'react';
import './App.css';
import SearchParams from './SearchParams';
import DisplayResult from './DisplayResult';
import { filterData } from './util';

import jsonData from './data/data.json';

const loadData = () => JSON.parse(JSON.stringify(jsonData));

function App() {
  const [bookResults, updatedBookResults] = useState([]);

  function selectedData({ id, summary, title, author }) {
    updatedBookResults([...bookResults, { id, summary, title, author }]);
  }

  useEffect(() => {
    const bookDetails = loadData();
    filterData(bookDetails);
  }, []);

  return (
    <div className='App'>
      <SearchParams selectedData={selectedData} />
      <DisplayResult resultsToshow={bookResults} />
    </div>
  );
}

export default App;
