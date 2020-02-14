import React from 'react';

const SearchParams = props => {
  return (
    <div className='card'>
      {props.resultsToshow.map(book => {
        return (
          <div className='card-items'>
            <div className='title'>{book.title}</div>
            <div className='summary'>{book.summary}</div>
            <hr />
            <div>{book.author}</div>
          </div>
        );
      })}
    </div>
  );
};

export default SearchParams;
