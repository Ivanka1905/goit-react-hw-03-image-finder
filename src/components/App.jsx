import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar';
import ImageGalery from './ImageGallery';

class App extends Component {
  state = {
    pictureName: '',
  };

  handleFormSubmit = pictureName => {
    this.setState({ pictureName });
  };

  render() {
    return (
      <div>
        <ToastContainer autoClose={2000} />
        <Searchbar handleFormSubmit={this.handleFormSubmit} />
        <ImageGalery pictureName={this.state.pictureName} />
      </div>
    );
  }
}

export default App;
