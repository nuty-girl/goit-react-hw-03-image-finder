import React, { Component } from 'react';
import T from 'prop-types';
import styles from './PhotoCard.module.css';
import Modal from '../Modal/Modal';

export default class PhotoCard extends Component {
  static propTypes = {
    item: T.shape({
      id: T.number.isRequired,
      webformatURL: T.string.isRequired,
      largeImageURL: T.string.isRequired,
      likes: T.number.isRequired,
      views: T.number.isRequired,
      comments: T.number.isRequired,
      downloads: T.number.isRequired,
    }).isRequired,
  };

  state = {
    isModalOpen: false,
  };

  openModal = () => this.setState({ isModalOpen: true });

  closeModal = () => this.setState({ isModalOpen: false });

  render() {
    const { item } = this.props;
    const { isModalOpen } = this.state;

    return (
      <div className={styles.photo_card}>
        <img src={item.webformatURL} alt="" />
        <div className={styles.stats}>
          <p className={styles.stats_item}>
            <i className="material-icons">thumb_up</i>
            {item.likes}
          </p>
          <p className={styles.stats_item}>
            <i className="material-icons">visibility</i>
            {item.views}
          </p>
          <p className={styles.stats_item}>
            <i className="material-icons">comment</i>
            {item.comments}
          </p>
          <p className={styles.stats_item}>
            <i className="material-icons">cloud_download</i>
            {item.downloads}
          </p>
        </div>
        <button
          type="button"
          className={styles.fullscreen_button}
          onClick={this.openModal}
        >
          <i className="material-icons">zoom_out_map</i>
        </button>
        {isModalOpen && (
          <Modal onClose={this.closeModal}>
            <div className="overlay">
              <div className="modal">
                <img src={item.largeImageURL} alt="" />
              </div>
            </div>
          </Modal>
        )}
      </div>
    );
  }
}
