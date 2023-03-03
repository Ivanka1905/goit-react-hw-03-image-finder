import { Component } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import Button from 'components/Button';
import css from './ImageGallery.module.css';

class ImageGalery extends Component {
  state = {
    picture: {
      hits: [],
    },
    page: 1,
    error: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page && this.state.page !== 1) {
      this.setState({ status: 'pending' });
      fetch(
        `https://pixabay.com/api/?q=${this.props.pictureName}&page=${this.state.page}&key=30167206-9cd8436e9cf02f01e1d7e25e7&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(new Error('Nothing found'));
        })
        .then(picture => {
          if (picture.hits.length > 0) {
            return this.setState(prevState => ({
              picture: {
                hits: [...prevState.picture.hits, ...picture.hits],
              },
              status: 'resolve',
            }));
          } else {
            this.setState({ picture: null, status: 'rejected' });
          }
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    } else if (prevProps.pictureName !== this.props.pictureName) {
      this.setState({
        picture: {
          hits: [],
        },
        page: 1,
        status: 'pending',
      });
      fetch(
        `https://pixabay.com/api/?q=${this.props.pictureName}&page=1&key=30167206-9cd8436e9cf02f01e1d7e25e7&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(new Error('Nothing found'));
        })
        .then(picture => {
          if (picture.hits.length > 0) {
            return this.setState({
              picture: { hits: picture.hits },
              status: 'resolve',
              page: 1,
            });
          } else {
            this.setState({ picture: null, status: 'rejected' });
          }
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  handleloadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { status, picture } = this.state;

    if (status === 'idle') {
      return;
    }
    if (status === 'pending') {
      return (
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#ea3c12"
          ariaLabel="three-dots-loading"
          visible={true}
          wrapperStyle={{}}
        />
      );
    }
    if (status === 'rejected') {
      return <h1>Oops, nothing found</h1>;
    }
    if (status === 'resolve') {
      return (
        <>
          <ul className={css.ImageGallery}>
            {picture.hits.map(({ id, webformatURL, largeImageURL, tags }) => (
              <ImageGalleryItem
                key={id}
                smallImg={webformatURL}
                largeImg={largeImageURL}
                tags={tags}
              />
            ))}
          </ul>
          <Button onClick={this.handleloadMore} />
        </>
      );
    }
  }
}

ImageGalery.propTypes = {
  pictureName: PropTypes.string,
};

export default ImageGalery;
