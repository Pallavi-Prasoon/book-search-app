let filteredBooks;

/**
 * For Fetching the data from the server
 */
function fetchData() {
  fetch(`./data/data.json`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  }).then(response => response.json());
}

/**
 *
 * @param {*} bookDetails - This is the data fetched from the server
 * which includes all the available details about books
 * This function will return data in filtered format like below
 * [{
 * id: ',
 * title: '',
 * summary: '',
 * author: ''
 * }]
 */
function filterData(bookDetails) {
  filteredBooks = bookDetails.titles.map((title, index) => {
    return { id: index, title: title };
  });

  bookDetails.summaries.map(element => {
    filteredBooks[element.id]['summary'] = element.summary;
    return filteredBooks;
  });

  bookDetails.authors.map(element => {
    filteredBooks[element['book_id']]['author'] = element.author;
    return filteredBooks;
  });
  return filteredBooks;
  //searchBooks('the');
}

/**
 *
 * @param {*} query - This is the searched keywords
 * The function returns the matches of the keyword for each book
 */
function searchBooks(query, K = 1) {
  // Take the whole words
  let queries = query.split(' ');

  for (let detail of filteredBooks) {
    let matches = 0;
    for (let word of queries) {
      var regExp = new RegExp(word, 'gi');
      matches = matches + (detail.summary.match(regExp) || []).length;
    }
    // add the total number of matches found so that maximum can be shown at top
    detail.matches = matches;
  }
  // Get the sorted value as per the matches.

  let sortedBookDetails = sortBooks(
    filteredBooks.filter(book => book.matches > 0)
  );
  return sortedBookDetails.slice(0, K);
}

/**
 * This function will return a copy of the filteredBooks
 * with each obj of book with maximum matches at the top
 */
function sortBooks(data) {
  return data.slice().sort(function(a, b) {
    if (a.matches < b.matches) {
      return 1;
    }
    if (a.matches > b.matches) {
      return -1;
    }

    return 0;
  });
}

export { fetchData, filterData, searchBooks };
