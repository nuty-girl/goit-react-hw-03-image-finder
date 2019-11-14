import React, { Component } from 'react';
import styles from './App.module.css';
import * as photoCardAPI from './services/photoCard-api';
import SearchForm from './SearchForm/SearchForm';
import Gallery from './Gallery/Gallery';
import ErrorNotification from './ErrorNotification';

export default class App extends Component {
  state = {
    photoCards: [],
    error: null,
    pageNumber: 1,
    query: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { query } = this.state;
    if (prevState.query !== query) {
      this.fetchPhotoCards();
    }
  }

  onSearch = query => {
    this.setState({ query, photoCards: [], pageNumber: 1 });
  };

  fetchPhotoCards = () => {
    const { query, pageNumber } = this.state;

    photoCardAPI
      .fetchPhotoCards(query, pageNumber)
      .then(photoCards => {
        this.setState(state => ({
          photoCards: [...state.photoCards, ...photoCards],
          pageNumber: state.pageNumber + 1,
        }));
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  render() {
    const { photoCards, error } = this.state;

    return (
      <div className={styles.App}>
        <SearchForm onSearch={this.onSearch} />

        {error && <ErrorNotification message={error.message} />}

        {photoCards.length > 0 && <Gallery photoCards={photoCards} />}

        {photoCards.length > 0 && (
          <button
            type="button"
            className={styles.button}
            onClick={this.fetchPhotoCards}
          >
            Load more
          </button>
        )}
      </div>
    );
  }
}
