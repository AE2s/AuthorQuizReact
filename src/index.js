import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import * as serviceWorker from './serviceWorker';
import { shuffle, sample } from 'underscore';
import { BrowserRouter, Route } from 'react-router-dom';
import AddAuthorForm from './AddAuthorForm';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';

const authors = [
  {
    name: 'Mark Twain',
    imageUrl: 'images/authors/marktwain.jpg',
    imageSource: 'Wikimedia Commons',
    books: ['The Adventures of Huckleberry Finn'],
  },
  {
    name: 'Joseph Conrad',
    imageUrl: 'images/authors/josephconrad.png',
    imageSource: 'Wikimedia Commons',
    books: ['Heart of Darkness'],
  },
  {
    name: 'J.K. Rowling',
    imageUrl: 'images/authors/jkrowling.jpg',
    imageSource: 'Wikimedia Commons',
    imageAttribution: 'Daniel Ogren',
    books: ['Harry Potter and the Sorcerers Stone'],
  },
  {
    name: 'Stephen King',
    imageUrl: 'images/authors/stephenking.jpg',
    imageSource: 'Wikimedia Commons',
    imageAttribution: 'Pinguino',
    books: ['The Shining', 'IT'],
  },
  {
    name: 'Charles Dickens',
    imageUrl: 'images/authors/charlesdickens.jpg',
    imageSource: 'Wikimedia Commons',
    books: ['David Copperfield', 'A Tale of Two Cities'],
  },
  {
    name: 'William Shakespeare',
    imageUrl: 'images/authors/williamshakespeare.jpg',
    imageSource: 'Wikimedia Commons',
    books: ['Hamlet', 'Macbeth', 'Romeo and Juliet'],
  },
];

function getTurnData(authors) {
  const allBooks = authors.reduce(function (p, c) {
    return p.concat(c.books);
  }, []);
  const fourRandomBooks = shuffle(allBooks).slice(0, 4);
  const answer = sample(fourRandomBooks);

  return {
    books: fourRandomBooks,
    author: authors.find((author) =>
      author.books.some((title) => title === answer)
    ),
  };
}

let initialState = {
  authors,
  turnData: getTurnData(authors),
  highlight: '',
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'ANSWER_SELECTED':
      const isCorrect = state.turnData.author.books.some(
        (book) => book === action.answer
      );
      return Object.assign({}, state, {
        highlight: isCorrect ? 'correct' : 'wrong',
      });
    case 'CONTINUE':
      console.log(state.authors);
      return Object.assign({}, state, {
        highlight: '',
        turnData: getTurnData(state.authors),
      });
    case 'ADD_AUTHOR':
      return Object.assign({}, state, {
        authors: [...state.authors, action.author],
      });
    default:
      return state;
  }
}

const store = Redux.createStore(
  reducer /* preloadedState, */,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function render() {
  ReactDOM.render(
    <BrowserRouter>
      <ReactRedux.Provider store={store}>
        <>
          <Route exact path="/" component={AuthorQuiz} />
          <Route path="/add" component={AddAuthorForm} />
        </>
      </ReactRedux.Provider>
    </BrowserRouter>,
    document.getElementById('root')
  );
}
render();
serviceWorker.unregister();
