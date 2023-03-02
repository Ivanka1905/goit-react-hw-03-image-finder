import Modal from 'components/Modal';
import { Component } from 'react';

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
      <li className="ImageGalleryItem">
        <img
          src={smallImg}
          alt={tags}
          className="ImageGalleryItem-image"
          onClick={this.toogleModal}
        />
        {isModalOpen && <Modal largeImg={largeImg} tags={tags} onClick={this.toogleModal}/>}
      </li>
    );
  }
}

//   ({ smallImg, largeImageURL, tags }) => {
//
// };

export default ImageGalleryItem;
