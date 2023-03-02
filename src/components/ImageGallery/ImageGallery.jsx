import { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem';
import { ThreeDots } from 'react-loader-spinner';

class ImageGalery extends Component {
  state = {
    picture: {
      hits: [],
    },
    page: 1,
    perPage: 12,
    error: null,
    status: 'idle',
  };

  
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevProps.pictureName !== this.props.pictureName
    ) {
      this.setState({ status: 'pending' });
      fetch(
        `https://pixabay.com/api/?q=${this.props.pictureName}&page=${this.state.page}&key=30167206-9cd8436e9cf02f01e1d7e25e7&image_type=photo&orientation=horizontal&per_page=${this.state.perPage}`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(new Error('Nothing found'));
        })
        .then(picture => {
          if (picture.hits.length > 0) {
            return this.setState((prevState) => ({
              
              
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
    }
  };

    handleloadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      perPage: prevState.perPage + this.state.perPage,
      picture: {
                hits: [...prevState.picture.hits],
              },
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
          <ul className="ImageGallery">
            {picture.hits.map(({ id, webformatURL, largeImageURL, tags }) => (
              <ImageGalleryItem
                key={id}
                smallImg={webformatURL}
                largeImg={largeImageURL}
                tags={tags}
              />
            ))}
          </ul>
          <button type="button" onClick={this.handleloadMore} className="Button">
            Load more
          </button>
        </>
      );
    }
  }
}

export default ImageGalery;
