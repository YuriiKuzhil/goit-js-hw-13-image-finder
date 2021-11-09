import imagesGalleryTpl from '../templates/images-gallery.hbs';

const refs = {
  container: document.querySelector('.container'),
  searchForm: document.querySelector('#search-form'),
};

refs.searchForm.addEventListener('submit', onSearch);

function renderListGallery(images) {
  refs.container.insertAdjacentHTML('beforeend', imagesGalleryTpl(images));
}

function onSearch(e) {
  e.preventDefault();

  fetch(
    'https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=cat&key=19216489-5c3816338c51dfbca2dca2232',
  )
    .then(response => response.json())
    .then(renderListGallery);
}
