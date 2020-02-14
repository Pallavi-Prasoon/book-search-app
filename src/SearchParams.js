import React, { useState } from 'react';
import { searchBooks } from './util';

const SearchParams = props => {
  const [keyword, updateKeyword] = useState('');
  const [searchedResult, updateSearchedResult] = useState([]);

  function showResults(searchedKeywords) {
    let searchedBooks = searchBooks(searchedKeywords, 10);
    updateSearchedResult(searchedBooks);
  }

  return (
    <div className='search-params'>
      <form
        autoComplete='off'
        onSubmit={e => {
          e.preventDefault();
          showResults(keyword);
        }}
      >
        <div>
          <label htmlFor='keyword'>Search For Books</label>
        </div>
        <div>
          <input
            id='keyword'
            value={keyword}
            placeholder='Search'
            onChange={e => {
              updateKeyword(e.target.value);
            }}
          />
          <button>Submit</button>
        </div>
        <div className='auto-complete'>
          <div className='autocomplete-items'>
            {searchedResult.map(element => {
              return (
                <div
                  onClick={function(e) {
                    props.selectedData(element);
                    updateSearchedResult([]);
                    updateKeyword('');
                  }}
                >
                  {element.title}
                </div>
              );
            })}
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchParams;
