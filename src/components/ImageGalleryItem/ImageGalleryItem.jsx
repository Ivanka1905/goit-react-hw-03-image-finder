import PropTypes from 'prop-types'; 
import Modal from 'components/Modal';
import { Component } from 'react';
import css from './ImageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  toogleModal = () => {
    this.setState(({ isModalOpen }) => ({
      isModalOpen: !isModalOpen,
    })); 
  };

  render() {
    const { smallImg, tags, largeImg } = this.props;
    const { isModalOpen } = this.state;

    return (
      <li className={css.ImageGalleryItem}>
        <img
          src={smallImg}
          alt={tags}
          className={css.ImageGalleryItemImage}
          onClick={this.toogleModal}
        />
        {isModalOpen && <Modal largeImg={largeImg} tags={tags} onClick={this.toogleModal}/>}
      </li>
    );
  }
};

ImageGalleryItem.propTypes = {
  smallImg: PropTypes.string,
  tags: PropTypes.string,
  largeImg: PropTypes.string,
}

export default ImageGalleryItem;
