import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
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
    isLoading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, pageNumber } = this.state;
    if (prevState.query !== query) {
      this.fetchPhotoCards();
    }
    if (prevState.pageNumber !== pageNumber) {
      window.scrollTo({
        top: pageNumber * 1450,
        behavior: 'smooth',
      });
    }
  }

  onSearch = query => {
    if (this.state.query === query) {
      return;
    }
    this.setState({ query, photoCards: [], pageNumber: 1 });
  };

  fetchPhotoCards = () => {
    const { query, pageNumber } = this.state;
    this.setState({ isLoading: true });

    photoCardAPI
      .fetchPhotoCards(query, pageNumber)
      .then(photoCards => {
        this.setState(state => ({
          photoCards: [...state.photoCards, ...photoCards],
          pageNumber: state.pageNumber + 1,
          isLoading: false,
        }));
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  reset = () => {
    this.setState({
      query: '',
    });
  };

  render() {
    const { photoCards, error, isLoading } = this.state;

    return (
      <div className={styles.App}>
        <SearchForm onSearch={this.onSearch} />
        {error && <ErrorNotification message={error.message} />}
        {isLoading && (
          <Loader type="ThreeDots" color="#grey" height={80} width={80} />
        )}
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
