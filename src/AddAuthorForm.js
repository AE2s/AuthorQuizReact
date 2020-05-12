import React from 'react';
import { connect } from 'react-redux';
import './AddAuthorForm.css';
import { withRouter } from 'react-router-dom';

class AuthorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      imageUrl: '',
      books: [],
      bookTemp: '',
      imageSource: 'Wikimedia',
    };

    this.onFieldChange = this.onFieldChange.bind(this);
    this.handleAddBook = this.handleAddBook.bind(this);
  }

  onFieldChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onAddAuthor(this.state);
  }

  handleAddBook(event) {
    if (this.state.bookTemp !== '') {
      this.setState({
        books: [...this.state.books, this.state.bookTemp],
        bookTemp: '',
      });
    }
  }

  render() {
    return (
      <form onSubmit={(event) => this.handleSubmit(event)}>
        <div className="AddAuthorForm__input">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.onFieldChange}
          />
        </div>

        <div className="AddAuthorForm__input">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={this.state.imageUrl}
            onChange={this.onFieldChange}
          />
        </div>
        <div className="AddAuthorForm__input">
          <label htmlFor="bookTemp">Books</label>
          {this.state.books.map((book) => (
            <p key={book}>{book}</p>
          ))}
          <input
            type="text"
            name="bookTemp"
            value={this.state.bookTemp}
            onChange={this.onFieldChange}
          />
          <input type="button" value="+" onClick={this.handleAddBook} />
        </div>
        <input type="submit" value="Add" />
      </form>
    );
  }
}
function AddAuthorForm({ match, onAddAuthor }) {
  return (
    <div className="AddAuthorForm">
      <h1>Add Author</h1>
      <AuthorForm onAddAuthor={onAddAuthor} />
    </div>
  );
}

const mapStateToProps = (state) => ({});

function mapDispatchToProps(dispatch, props) {
  return {
    onAddAuthor: (author) => {
      dispatch({ type: 'ADD_AUTHOR', author });
      props.history.push('/');
    },
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddAuthorForm)
);
