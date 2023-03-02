import React, { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Searchbar extends Component {
  state = {
    pictureName: '',
        };

  handleNameChange = event => {
    this.setState({ pictureName: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { pictureName } = this.state;
    if (pictureName.trim() === '') {
      toast.warn('Введіть слово', {
        position: 'top-right',
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });

      this.setState({ pictureName: ''});
      return;
    }
    this.props.handleFormSubmit(pictureName);
    this.setState({ pictureName: ''});
  };

  render() {
    const { handleSubmit, handleNameChange, state } = this;
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={state.pictureName}
            onChange={handleNameChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
