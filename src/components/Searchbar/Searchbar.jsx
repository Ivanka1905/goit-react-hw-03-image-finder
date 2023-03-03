import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './Searchbar.module.css';

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

      this.setState({ pictureName: '', page: 1 });
      return;
    }
    this.props.handleFormSubmit(pictureName);
    this.setState({ pictureName: '', page: 1 });
  };

  render() {
    const { handleSubmit, handleNameChange, state } = this;
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={handleSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={css.SearchFormInput}
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

Searchbar.propTypes = {
  handleFormSubmit: PropTypes.func,
}

export default Searchbar;
