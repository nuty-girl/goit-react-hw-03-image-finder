// eslint-disable-next-line import/prefer-default-export
export const fetchPhotoCards = (query = '', pageNumber = 1) => {
  return fetch(
    `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${query}&page=${pageNumber}&per_page=12&key=14273310-6e0402b05c4239754eef621ef`,
  )
    .then(res => res.json())
    .then(data => data.hits);
};
