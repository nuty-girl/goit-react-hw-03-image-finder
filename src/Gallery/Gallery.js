import React from 'react';
import T from 'prop-types';
import styles from './Gallery.module.css';
import PhotoCard from '../PhotoCard/PhotoCard';

const Gallery = ({ photoCards }) => (
  <ul className={styles.gallery}>
    {photoCards.map(photoCard => (
      <li className={styles.gallery_item} key={photoCard.id}>
        <PhotoCard item={photoCard} />
      </li>
    ))}
  </ul>
);

Gallery.propTypes = {
  photoCards: T.arrayOf(
    T.shape({
      id: T.number.isRequired,
      webformatURL: T.string.isRequired,
      largeImageURL: T.string.isRequired,
      likes: T.number.isRequired,
      views: T.number.isRequired,
      comments: T.number.isRequired,
      downloads: T.number.isRequired,
    }).isRequired,
  ).isRequired,
};
export default Gallery;
