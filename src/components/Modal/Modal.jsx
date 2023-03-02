import { Component } from 'react';
import { createPortal } from 'react-dom';
const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleEscape);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscape);
  }

  handleEscape = e => {
    if (e.code === 'Escape') this.props.onClick();
  };

  handleBackdrop = e => {
    if (e.target === e.currentTarget) this.props.onClick();
  };

  render() {
    const { largeImg, tags } = this.props;
    const { handleBackdrop } = this;

    return createPortal(
      <div className="Overlay" onClick={handleBackdrop}>
        <div className="Modal">
          <img src={largeImg} alt={tags} />
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
